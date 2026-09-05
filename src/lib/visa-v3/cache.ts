// src/lib/visa-v3/cache.ts
import crypto from 'crypto';
import { getPool } from '../../backend/db';
import type { 
  VisaData, 
  VerificationStatus, 
  SourceAuthority,
  V3VisaData, 
  V3VerificationStatus, 
  SourceAuthorityType 
} from './types';

export interface CacheRecord {
  route_key: string;
  passport_country: string;
  destination_country: string;
  purpose: string;
  payload: VisaData;
  verification_status: VerificationStatus;
  source_urls: string[];
  source_authority: SourceAuthority;
  source_content_hash: string;
  last_verified_at: string;
  expires_at: string;
  validation_errors: string[];
}

export async function getCachedRecord(routeKey: string): Promise<CacheRecord | null> {
  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT * FROM visa_verified_records 
       WHERE route_key = $1 AND expires_at > NOW()`,
      [routeKey]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      route_key: row.route_key,
      passport_country: row.passport_country,
      destination_country: row.destination_country,
      purpose: row.purpose,
      payload: row.payload_json,
      verification_status: row.verification_status,
      source_urls: row.source_urls || [],
      source_authority: row.source_authority,
      source_content_hash: row.source_content_hash,
      last_verified_at: row.last_verified_at,
      expires_at: row.expires_at,
      validation_errors: row.validation_errors || []
    };
  } catch (error) {
    console.error('[Cache] Error:', error);
    return null;
  }
}

export async function saveVerifiedRecord(record: {
  route_key: string;
  passport_country: string;
  destination_country: string;
  purpose: string;
  payload: VisaData;
  verification_status: VerificationStatus;
  source_urls: string[];
  source_authority: SourceAuthority;
  source_content_hash: string;
  last_verified_at: string;
  expires_at: string;
  validation_errors: string[];
}): Promise<void> {
  try {
    const pool = getPool();
    const routeHash = crypto.createHash('sha256').update(record.route_key, 'utf8').digest('hex');
    await pool.query(
      `INSERT INTO visa_verified_records (
        route_key, route_hash, passport_country, destination_country, purpose,
        payload_json, verification_status, source_urls, source_authority,
        source_content_hash, last_verified_at, expires_at, validation_errors, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
      ON CONFLICT (route_key) DO UPDATE SET
        passport_country = EXCLUDED.passport_country,
        destination_country = EXCLUDED.destination_country,
        purpose = EXCLUDED.purpose,
        payload_json = EXCLUDED.payload_json,
        verification_status = EXCLUDED.verification_status,
        source_urls = EXCLUDED.source_urls,
        source_authority = EXCLUDED.source_authority,
        source_content_hash = EXCLUDED.source_content_hash,
        last_verified_at = EXCLUDED.last_verified_at,
        expires_at = EXCLUDED.expires_at,
        validation_errors = EXCLUDED.validation_errors,
        updated_at = NOW()`,
      [
        record.route_key,
        routeHash,
        record.passport_country,
        record.destination_country,
        record.purpose,
        JSON.stringify(record.payload),
        record.verification_status,
        record.source_urls,
        record.source_authority,
        record.source_content_hash,
        record.last_verified_at,
        record.expires_at,
        record.validation_errors
      ]
    );
  } catch (error) {
    console.error('[Cache] Save error:', error);
  }
}

export async function addToReviewQueue(input: {
  route_key: string;
  passport_country: string;
  destination_country: string;
  purpose: string;
  extracted_data?: any;
  source_url?: string;
  source_authority?: string;
  validation_errors: string[];
  missing_critical_fields?: string[];
  review_reason: string;
  priority?: 'high' | 'normal' | 'low';
}): Promise<void> {
  try {
    const pool = getPool();
    await pool.query(
      `INSERT INTO visa_review_queue (
        route_key, passport_country, destination_country, purpose,
        extracted_data, source_url, source_authority,
        validation_errors, missing_applicable_fields, review_reason, priority,
        status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending', NOW(), NOW())`,
      [
        input.route_key,
        input.passport_country,
        input.destination_country,
        input.purpose,
        input.extracted_data ? JSON.stringify(input.extracted_data) : null,
        input.source_url || null,
        input.source_authority || null,
        input.validation_errors,
        input.missing_critical_fields || [],
        input.review_reason,
        input.priority || 'normal'
      ]
    );
  } catch (error) {
    console.error('[Cache] Review queue error:', error);
  }
}

// ── BACKWARD COMPATIBILITY HELPERS ──
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
      route_hash: row.route_hash || '',
      passport_country: row.passport_country,
      destination_country: row.destination_country,
      purpose: row.purpose,
      payload: row.payload_json,
      field_applicability: row.field_applicability || {},
      verification_status: (row.verification_status || 'unverified').toUpperCase() as V3VerificationStatus,
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

export async function writeVerifiedRecord(record: {
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
  ttl_days?: number;
}): Promise<void> {
  try {
    const pool = getPool();
    const ttl = record.ttl_days || (record.verification_status === 'VERIFIED' ? 7 : 3);
    const expiresAt = new Date(Date.now() + ttl * 24 * 60 * 60 * 1000);

    await pool.query(
      `INSERT INTO visa_verified_records 
        (route_key, route_hash, passport_country, destination_country, purpose,
         payload_json, field_applicability, verification_status, source_urls,
         source_authority, source_content_hash, source_snapshot, evidence_anchors,
         validation_errors, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
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
         expires_at = EXCLUDED.expires_at,
         last_verified_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP`,
      [
        record.route_key,
        record.route_hash,
        record.passport_country,
        record.destination_country,
        record.purpose,
        JSON.stringify(record.payload),
        JSON.stringify(record.field_applicability),
        record.verification_status.toLowerCase(),
        record.source_urls,
        record.source_authority,
        record.source_content_hash,
        record.source_snapshot,
        JSON.stringify(record.evidence_anchors),
        record.validation_errors,
        expiresAt
      ]
    );
  } catch (err) {
    console.error('[V3Cache] Write error:', err);
  }
}

export async function enqueueForReview(entry: {
  route_key: string;
  passport_country: string;
  destination_country: string;
  purpose: string;
  extracted_data: V3VisaData;
  source_url: string;
  source_content_hash: string;
  source_snapshot: string;
  validation_errors: string[];
  missing_applicable_fields: string[];
  review_reason: string;
  priority?: 'high' | 'normal' | 'low';
}): Promise<void> {
  return addToReviewQueue({
    route_key: entry.route_key,
    passport_country: entry.passport_country,
    destination_country: entry.destination_country,
    purpose: entry.purpose,
    extracted_data: entry.extracted_data,
    source_url: entry.source_url,
    validation_errors: entry.validation_errors,
    missing_critical_fields: entry.missing_applicable_fields,
    review_reason: entry.review_reason,
    priority: entry.priority
  });
}
