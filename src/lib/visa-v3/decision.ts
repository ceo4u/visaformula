// src/lib/visa-v3/decision.ts
import type { 
  V3VerificationStatus, 
  SourceAuthorityType, 
  ValidationReport 
} from './types';

export interface DecisionResult {
  status: V3VerificationStatus;
  cache_ttl_days: number;
  should_display_to_user: boolean;
  should_save_to_verified_records: boolean;
  should_enqueue_for_review: boolean;
  user_badge_text: string;
  user_badge_color: 'green' | 'amber' | 'orange' | 'gray';
  review_reason?: string;
}

export function computeStatusDecision(
  report: ValidationReport,
  sourceAuthority?: SourceAuthorityType,
  hasSource = true
): DecisionResult {
  if (!hasSource) {
    return {
      status: 'NOT_FOUND',
      cache_ttl_days: 0,
      should_display_to_user: false,
      should_save_to_verified_records: false,
      should_enqueue_for_review: false,
      user_badge_text: '📭 No Official Source',
      user_badge_color: 'gray'
    };
  }

  // Check if critical validation failures occurred
  const hasCriticalErrors = 
    report.errors.length > 0 || 
    report.cross_contamination_detected || 
    report.placeholders_detected || 
    report.missing_applicable_critical_fields.length > 0;

  if (hasCriticalErrors) {
    const reasons = [
      ...report.errors,
      report.missing_applicable_critical_fields.length > 0
        ? `Missing evidence for critical fields: ${report.missing_applicable_critical_fields.join(', ')}`
        : ''
    ].filter(Boolean).join('; ');

    return {
      status: 'NEEDS_REVIEW',
      cache_ttl_days: 0,
      should_display_to_user: false, // DO NOT show extracted data to user
      should_save_to_verified_records: false,
      should_enqueue_for_review: true,
      user_badge_text: '⏳ Under Review',
      user_badge_color: 'orange',
      review_reason: reasons || 'Applicable critical fields missing verified evidence anchors'
    };
  }

  // If all applicable critical fields are verified with evidence anchors:
  const isDirectAuthority = 
    sourceAuthority === 'government' || 
    sourceAuthority === 'embassy' || 
    sourceAuthority === 'evisa';

  if (isDirectAuthority) {
    return {
      status: 'VERIFIED',
      cache_ttl_days: 7, // 7 days cache
      should_display_to_user: true,
      should_save_to_verified_records: true,
      should_enqueue_for_review: false,
      user_badge_text: '✅ Verified from Official Source',
      user_badge_color: 'green'
    };
  }

  if (sourceAuthority === 'vac') {
    return {
      status: 'PARTIALLY_VERIFIED',
      cache_ttl_days: 3, // 3 days cache
      should_display_to_user: true,
      should_save_to_verified_records: true,
      should_enqueue_for_review: false,
      user_badge_text: '⚠️ Partially Verified (VAC Source)',
      user_badge_color: 'amber'
    };
  }

  return {
    status: 'UNVERIFIED',
    cache_ttl_days: 0,
    should_display_to_user: false,
    should_save_to_verified_records: false,
    should_enqueue_for_review: false,
    user_badge_text: '❌ Unverified',
    user_badge_color: 'gray'
  };
}
