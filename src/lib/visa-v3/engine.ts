// src/lib/visa-v3/engine.ts
import crypto from 'crypto';
import type { 
  V3EngineResult, 
  V3VisaData, 
  SourceRegistryEntry 
} from './types';
import { 
  getSourcesForDestination, 
  isAllowedExactHostname,
  extractHostname
} from './registry';
import { 
  fetchAndSnapshot, 
  computeSha256 
} from './scraper';
import { extractEvidenceWithGemini } from './extractor';
import { 
  verifyEvidenceAnchors, 
  validateDeterministicRules 
} from './verifier';
import { computeStatusDecision } from './decision';
import { 
  checkVerifiedRecordCache, 
  writeVerifiedRecord, 
  enqueueForReview 
} from './cache';

export function generateRouteKey(from: string, to: string, purpose: string): { routeKey: string; routeHash: string } {
  const normFrom = (from || 'India').toUpperCase().trim();
  const normTo = (to || '').toUpperCase().trim();
  const normPurpose = (purpose || 'Tourism').toUpperCase().trim();
  const routeKey = `${normFrom}→${normTo}→${normPurpose}`;
  const routeHash = crypto.createHash('sha256').update(routeKey, 'utf8').digest('hex');
  return { routeKey, routeHash };
}

export async function runV3VerificationEngine(params: {
  fromCountry: string;
  toCountry: string;
  purpose: string;
  forceRefresh?: boolean;
}): Promise<V3EngineResult> {
  const { fromCountry, toCountry, purpose, forceRefresh } = params;
  const { routeKey, routeHash } = generateRouteKey(fromCountry, toCountry, purpose);

  // ── STEP 3: CACHE CHECK (Neon PostgreSQL) ──
  if (!forceRefresh) {
    const cached = await checkVerifiedRecordCache(routeKey);
    if (cached) {
      console.log(`[V3Engine] Cache HIT for route: ${routeKey} (${cached.verification_status})`);
      return {
        status: cached.verification_status,
        route_key: routeKey,
        route_hash: routeHash,
        data: cached.payload,
        source_url: cached.source_urls[0],
        source_authority: cached.source_authority,
        source_hash: cached.source_content_hash,
        source_snapshot: cached.source_snapshot,
        evidence_anchors: cached.evidence_anchors,
        field_applicability: cached.field_applicability,
        is_cached: true
      };
    }
  }

  // ── STEP 4: SOURCE DISCOVERY ──
  const registeredSources = getSourcesForDestination(toCountry);
  if (registeredSources.length === 0) {
    console.warn(`[V3Engine] No registered authoritative sources found for destination: ${toCountry}`);
    return {
      status: 'NOT_FOUND',
      route_key: routeKey,
      route_hash: routeHash,
      data: null,
      message: `No official authority registered for ${toCountry}`
    };
  }

  // Iterate over allowed sources in priority order
  for (const sourceEntry of registeredSources) {
    const targetUrl = sourceEntry.source_url + (sourceEntry.visa_path && sourceEntry.visa_path !== '/' ? sourceEntry.visa_path : '');
    const hostname = extractHostname(targetUrl);

    // Rule 3: Exact Hostname validation
    const hostnameCheck = isAllowedExactHostname(targetUrl, toCountry);
    if (!hostnameCheck.allowed) {
      console.warn(`[V3Engine] Hostname "${hostname}" rejected: not in strict allowlist for ${toCountry}`);
      continue;
    }

    // ── STEP 5: CONTENT RETRIEVAL + SNAPSHOT ──
    const snapshotResult = await fetchAndSnapshot(targetUrl);
    if (snapshotResult.status !== 'OK' || snapshotResult.cleaned_content.length < 500) {
      console.warn(`[V3Engine] Source fetch notice for ${targetUrl}: status = ${snapshotResult.status}`);
      continue; // Try next source
    }

    // ── STEP 6: EVIDENCE EXTRACTION (Gemini) ──
    const extractedData = await extractEvidenceWithGemini(
      snapshotResult.cleaned_content,
      targetUrl,
      snapshotResult.retrieved_at,
      fromCountry,
      toCountry,
      purpose
    );

    if (!extractedData) {
      console.warn(`[V3Engine] Extraction returned null for ${targetUrl}`);
      continue;
    }

    // ── STEP 7: EVIDENCE ANCHOR VERIFICATION (Deterministic) ──
    const { verifiedData, anchors } = verifyEvidenceAnchors(
      extractedData,
      snapshotResult.cleaned_content
    );

    // ── STEP 8: DETERMINISTIC VALIDATION ──
    const validationReport = validateDeterministicRules(
      verifiedData,
      fromCountry,
      toCountry,
      purpose,
      sourceEntry.source_type
    );

    // ── STEP 9: STATUS DECISION ──
    const decision = computeStatusDecision(
      validationReport,
      sourceEntry.source_type,
      true
    );

    // ── STEP 10: DATABASE WRITE ──
    if (decision.should_save_to_verified_records) {
      await writeVerifiedRecord({
        route_key: routeKey,
        route_hash: routeHash,
        passport_country: fromCountry,
        destination_country: toCountry,
        purpose,
        payload: verifiedData,
        field_applicability: validationReport.field_applicability,
        verification_status: decision.status,
        source_urls: [targetUrl],
        source_authority: sourceEntry.source_type,
        source_content_hash: snapshotResult.content_hash,
        source_snapshot: snapshotResult.content_snapshot,
        evidence_anchors: anchors,
        validation_errors: validationReport.errors,
        ttl_days: decision.cache_ttl_days
      });
    } else if (decision.should_enqueue_for_review) {
      await enqueueForReview({
        route_key: routeKey,
        passport_country: fromCountry,
        destination_country: toCountry,
        purpose,
        extracted_data: verifiedData,
        source_url: targetUrl,
        source_content_hash: snapshotResult.content_hash,
        source_snapshot: snapshotResult.content_snapshot,
        validation_errors: validationReport.errors,
        missing_applicable_fields: validationReport.missing_applicable_critical_fields,
        review_reason: decision.review_reason || 'Validation review required'
      });
    }

    // ── STEP 11: RESPONSE TO FRONTEND ──
    return {
      status: decision.status,
      route_key: routeKey,
      route_hash: routeHash,
      data: decision.should_display_to_user ? verifiedData : null,
      source_url: targetUrl,
      source_authority: sourceEntry.source_type,
      source_hash: snapshotResult.content_hash,
      source_snapshot: snapshotResult.content_snapshot,
      evidence_anchors: anchors,
      field_applicability: validationReport.field_applicability,
      validation_errors: validationReport.errors,
      message: decision.status === 'NEEDS_REVIEW' 
        ? 'Dossier is currently under consular review'
        : undefined,
      is_cached: false
    };
  }

  return {
    status: 'UNVERIFIED',
    route_key: routeKey,
    route_hash: routeHash,
    data: null,
    message: `Unable to verify requirements from registered official sources for ${toCountry}`
  };
}
