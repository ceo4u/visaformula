// src/lib/visa-v3/cache.ts
import { getPool } from '../../backend/db';
import type { 
  V3VisaData, 
  V3VerificationStatus, 
  SourceAuthorityType 
} from './types';

export interface CachedVerifiedRecord {
  route_key: string;
  route_hash: string;
  passport_country: string;
  destination_country: string;
  purpose: string;
  payload: V3VisaData;
  field_applicability: Record<string, boolean>;
  verification_status: V3VerificationStatus;
  source_urls: string[];
  source_authority: SourceAuthorityType;
  source_content_hash: string;
  source_snapshot: string;
  evidence_anchors: Record<string, string>;
  expires_at: string;
}

export async function checkVerifiedRecordCache(
  routeKey: string
): Promise<CachedVerifiedRecord | null> {
  try {
    const pool = getPool();
    const res = await pool.query(
      `SELECT * FROM visa_verified_records 
       WHERE route_key = $1 AND expires_at > NOW() 
       LIMIT 1`,
      [routeKey]
    );

    if (res.rows.length === 0) return null;

    const row = res.rows[0];
    return {
      route_key: row.route_key,
      route_hash: row.route_hash,
      passport_country: row.passport_country,
      destination_country: row.destination_country,
      purpose: row.purpose,
      payload: row.payload_json,
      field_applicability: row.field_applicability || {},
      verification_status: row.verification_status,
      source_urls: row.source_urls || [],
      source_authority: row.source_authority,
      source_content_hash: row.source_content_hash,
      source_snapshot: row.source_snapshot || '',
      evidence_anchors: row.evidence_anchors || {},
      expires_at: row.expires_at
    };
  } catch (err) {
    console.warn('[V3Cache] Cache check notice (non-fatal):', err);
    return null;
  }
}

export async function writeVerifiedRecord(params: {
  route_key: string;
  route_hash: string;
  passport_country: string;
  destination_country: string;
  purpose: string;
  payload: V3VisaData;
  field_applicability: Record<string, boolean>;
  verification_status: V3VerificationStatus;
  source_urls: string[];
  source_authority: SourceAuthorityType;
  source_content_hash: string;
  source_snapshot: string;
  evidence_anchors: Record<string, string>;
  validation_errors: string[];
  ttl_days: number;
}): Promise<void> {
  try {
    const pool = getPool();
    const expiresAt = new Date(Date.now() + params.ttl_days * 24 * 60 * 60 * 1000);

    await pool.query(
      `INSERT INTO visa_verified_records 
        (route_key, route_hash, passport_country, destination_country, purpose,
         payload_json, field_applicability, verification_status, source_urls,
         source_authority, source_content_hash, source_snapshot, evidence_anchors,
         validation_errors, last_verified_at, expires_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), $15, NOW())
       ON CONFLICT (route_key) DO UPDATE SET
         payload_json = EXCLUDED.payload_json,
         field_applicability = EXCLUDED.field_applicability,
         verification_status = EXCLUDED.verification_status,
         source_urls = EXCLUDED.source_urls,
         source_authority = EXCLUDED.source_authority,
         source_content_hash = EXCLUDED.source_content_hash,
         source_snapshot = EXCLUDED.source_snapshot,
         evidence_anchors = EXCLUDED.evidence_anchors,
         validation_errors = EXCLUDED.validation_errors,
         last_verified_at = NOW(),
         expires_at = EXCLUDED.expires_at,
         updated_at = NOW()`,
      [
        params.route_key,
        params.route_hash,
        params.passport_country,
        params.destination_country,
        params.purpose,
        JSON.stringify(params.payload),
        JSON.stringify(params.field_applicability),
        params.verification_status,
        params.source_urls,
        params.source_authority,
        params.source_content_hash,
        params.source_snapshot,
        JSON.stringify(params.evidence_anchors),
        params.validation_errors,
        expiresAt
      ]
    );
  } catch (err) {
    console.warn('[V3Cache] Failed to write verified record:', err);
  }
}

export async function enqueueForReview(params: {
  route_key: string;
  passport_country: string;
  destination_country: string;
  purpose: string;
  extracted_data: any;
  source_url: string;
  source_content_hash: string;
  source_snapshot: string;
  validation_errors: string[];
  missing_applicable_fields: string[];
  review_reason: string;
  priority?: 'high' | 'normal' | 'low';
}): Promise<void> {
  try {
    const pool = getPool();
    const priority = params.priority || (params.missing_applicable_fields.length > 0 ? 'high' : 'normal');

    await pool.query(
      `INSERT INTO visa_review_queue
        (route_key, passport_country, destination_country, purpose, extracted_data,
         source_url, source_content_hash, source_snapshot, validation_errors,
         missing_applicable_fields, review_reason, priority, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'pending_review', NOW(), NOW())`,
      [
        params.route_key,
        params.passport_country,
        params.destination_country,
        params.purpose,
        JSON.stringify(params.extracted_data || {}),
        params.source_url,
        params.source_content_hash,
        params.source_snapshot,
        params.validation_errors,
        params.missing_applicable_fields,
        params.review_reason,
        priority
      ]
    );
  } catch (err) {
    console.warn('[V3Cache] Failed to enqueue record for review:', err);
  }
}
