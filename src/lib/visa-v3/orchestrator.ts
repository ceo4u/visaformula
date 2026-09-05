// src/lib/visa-v3/orchestrator.ts
import { getCachedRecord, saveVerifiedRecord, addToReviewQueue } from './cache';
import { discoverOfficialSource } from './source-discoverer';
import { fetchSourceContent, detectSourceChange } from './content-retriever';
import { extractWithEvidence } from './extractor';
import { validateVisaData } from './validator';
import type { VisaData, VisaResult, VerificationStatus, SourceAuthority } from './types';
import { getSourceAuthority, getSourcePriority } from './registry';

export async function getVisaRequirements(
  fromCountry: string,
  toCountry: string,
  purpose: string
): Promise<VisaResult> {
  const routeKey = `${fromCountry}→${toCountry}→${purpose}`;
  const startTime = Date.now();

  console.log(`[Orchestrator] Starting: ${routeKey}`);

  // ── STEP 1: CHECK CACHE ──
  const cached = await getCachedRecord(routeKey);

  if (cached) {
    if (cached.verification_status === 'verified' || cached.verification_status === 'partially_verified') {
      try {
        const freshContent = await fetchSourceContent(
          cached.source_urls[0],
          undefined
        );

        if (freshContent && detectSourceChange(cached.source_content_hash, freshContent.contentHash)) {
          console.log(`[Orchestrator] Source changed for ${routeKey}, refreshing...`);
        } else {
          console.log(`[Orchestrator] Cache hit (fresh): ${routeKey}`);
          return {
            data: cached.payload,
            source: 'cache',
            verification_status: cached.verification_status as VerificationStatus,
            source_url: cached.source_urls[0],
            source_authority: cached.source_authority as SourceAuthority,
            source_content_hash: cached.source_content_hash,
            retrieved_at: cached.last_verified_at,
            is_fresh: true
          };
        }
      } catch (error) {
        console.warn(`[Orchestrator] Stale check failed for ${routeKey}, using cache`);
        return {
          data: cached.payload,
          source: 'cache',
          verification_status: cached.verification_status as VerificationStatus,
          source_url: cached.source_urls[0],
          source_authority: cached.source_authority as SourceAuthority,
          source_content_hash: cached.source_content_hash,
          retrieved_at: cached.last_verified_at,
          is_fresh: true
        };
      }
    } else {
      console.log(`[Orchestrator] Cache hit: ${routeKey} (${cached.verification_status})`);
      return {
        data: cached.payload,
        source: 'cache',
        verification_status: cached.verification_status as VerificationStatus,
        source_url: cached.source_urls[0],
        source_authority: cached.source_authority as SourceAuthority,
        source_content_hash: cached.source_content_hash,
        retrieved_at: cached.last_verified_at,
        is_fresh: true
      };
    }
  }

  console.log(`[Orchestrator] Cache miss/stale: ${routeKey}`);

  // ── STEP 2: DISCOVER OFFICIAL SOURCE ──
  const source = await discoverOfficialSource(fromCountry, toCountry, purpose);
  if (!source) {
    console.log(`[Orchestrator] No source found: ${routeKey}`);
    return {
      data: null,
      source: 'fallback',
      verification_status: 'not_found',
      is_fresh: true
    };
  }

  console.log(`[Orchestrator] Source found: ${source.url} (${source.authority})`);

  // ── STEP 3: FETCH CONTENT ──
  const content = await fetchSourceContent(source.url, source.visaPath);
  if (!content) {
    console.log(`[Orchestrator] Failed to fetch content: ${source.url}`);
    return {
      data: null,
      source: 'fallback',
      verification_status: 'not_found',
      source_url: source.url,
      source_authority: source.authority,
      is_fresh: true
    };
  }

  // ── STEP 4: EXTRACT WITH EVIDENCE ──
  const extracted = await extractWithEvidence(
    content.content,
    content.url,
    fromCountry,
    toCountry,
    purpose
  );

  if (!extracted) {
    console.log(`[Orchestrator] Extraction failed: ${routeKey}`);
    await addToReviewQueue({
      route_key: routeKey,
      passport_country: fromCountry,
      destination_country: toCountry,
      purpose,
      source_url: source.url,
      source_authority: source.authority,
      validation_errors: ['Extraction failed - no structured data returned'],
      review_reason: 'Gemini extraction returned null'
    });

    return {
      data: null,
      source: 'gemini',
      verification_status: 'needs_review',
      source_url: source.url,
      source_authority: source.authority,
      source_content_hash: content.contentHash,
      is_fresh: true
    };
  }

  extracted.source_url = source.url;
  extracted.source_authority = source.authority;
  extracted.source_content_hash = content.contentHash;
  extracted.source_snapshot = content.snapshot;
  extracted.last_verified_at = new Date().toISOString();

  // ── STEP 5: VALIDATE ──
  const validation = validateVisaData(
    extracted,
    fromCountry,
    toCountry,
    purpose,
    source.authority,
    content.content
  );

  console.log(`[Orchestrator] Validation: ${validation.status}`);
  console.log(`[Orchestrator] Errors: ${validation.errors.length}`);
  console.log(`[Orchestrator] Missing applicable: ${validation.missing_applicable_fields.length}`);

  // ── STEP 6: SAVE ──
  if (validation.status === 'verified' || validation.status === 'partially_verified') {
    await saveVerifiedRecord({
      route_key: routeKey,
      passport_country: fromCountry,
      destination_country: toCountry,
      purpose,
      payload: extracted,
      verification_status: validation.status,
      source_urls: [source.url],
      source_authority: source.authority,
      source_content_hash: content.contentHash,
      last_verified_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + (validation.status === 'verified' ? 7 : 3) * 24 * 60 * 60 * 1000).toISOString(),
      validation_errors: validation.errors
    });
  } else if (validation.status === 'needs_review') {
    await addToReviewQueue({
      route_key: routeKey,
      passport_country: fromCountry,
      destination_country: toCountry,
      purpose,
      extracted_data: extracted,
      source_url: source.url,
      source_authority: source.authority,
      validation_errors: validation.errors,
      missing_critical_fields: validation.missing_applicable_fields,
      review_reason: validation.errors.length > 0 
        ? validation.errors.join('; ') 
        : 'Some applicable fields missing evidence',
      priority: validation.missing_applicable_fields.length > 0 ? 'high' : 'normal'
    });
  }

  // ── STEP 7: RETURN ──
  console.log(`[Orchestrator] Completed: ${routeKey} (${Date.now() - startTime}ms)`);

  return {
    data: validation.status !== 'unverified' ? extracted : null,
    source: 'html',
    verification_status: validation.status,
    source_url: source.url,
    source_authority: source.authority,
    source_content_hash: content.contentHash,
    retrieved_at: new Date().toISOString(),
    is_fresh: true,
    validation_errors: validation.errors,
    missing_critical_fields: validation.missing_applicable_fields
  };
}
