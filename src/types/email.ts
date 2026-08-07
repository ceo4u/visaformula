// ============================================================
// src/types/email.ts
// All TypeScript types for the email system
// ============================================================

export type EmailType =
  | 'otp_verification'
  | 'welcome'
  | 'password_reset'
  | 'login_alert'
  | 'visa_notification'
  | 'appointment_reminder'
  | 'marketing';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface OtpRecord {
  email: string;
  otpHash: string;
  expiresAt: Date;
  attempts: number;
  resendCount: number;
  lastResendAt: Date | null;
  verified: boolean;
  createdAt: Date;
}

export interface EmailLogEntry {
  email: string;
  type: EmailType;
  status: 'sent' | 'failed' | 'retried';
  provider: 'resend';
  providerId?: string;
  errorMessage?: string;
  createdAt: Date;
}

export interface VerificationEmailData {
  otp: string;
  email: string;
  expiresInMinutes?: number;
}

export interface WelcomeEmailData {
  firstName: string;
  displayName: string;
  email: string;
  userType?: 'seeker' | 'expert';
}

export interface PasswordResetEmailData {
  resetToken: string;
  email: string;
  firstName?: string;
  expiresInMinutes?: number;
}

export interface LoginAlertEmailData {
  email: string;
  firstName?: string;
  loginTime: string;
  ipAddress?: string;
  device?: string;
}
