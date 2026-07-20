// ============================================================
// src/emails/PasswordResetEmail.ts
// Premium light-themed password reset email matching VisaFormula branding
// ============================================================

export function generatePasswordResetEmailHtml(data: {
  resetToken: string;
  email: string;
  firstName?: string;
  expiresInMinutes?: number;
}): string {
  const { resetToken, firstName = 'there', expiresInMinutes = 30 } = data;
  const appUrl = import.meta.env.APP_URL || process.env.APP_URL || 'https://visaformula.com';
  const resetLink = `${appUrl}/reset-password?token=${resetToken}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your Visa Formula password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);">
          
          <!-- Top Gradient Strip -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); height: 8px; line-height: 8px; font-size: 1px;">
              &nbsp;
            </td>
          </tr>

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 40px 40px 24px 40px;">
              <img src="https://visaformula.com/logo.png" alt="Visa Formula Logo" style="height: 64px; width: auto; max-width: 100%; display: block;" />
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 0 40px 32px 40px; text-align: left;">
              <h1 style="color: #111827; font-size: 22px; font-weight: 800; margin: 0 0 12px 0; line-height: 30px; text-align: center; letter-spacing: -0.5px;">
                Reset your password
              </h1>
              <p style="color: #4b5563; font-size: 15px; margin: 0 0 28px 0; line-height: 24px; text-align: center;">
                Hi ${firstName}, we received a request to reset your password. Use the secure 6-digit verification code below to verify your request.
              </p>

              <!-- OTP Code Display -->
              <div style="text-align: center; margin: 36px 0;">
                <div style="display: inline-block; background-color: #f9fafb; border: 2px dashed #1e3a8a; color: #111827; font-size: 32px; font-weight: 800; padding: 18px 48px; border-radius: 16px; letter-spacing: 8px; font-family: Courier, monospace; box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);">
                  ${resetToken}
                </div>
              </div>

              <!-- Expiry + Security -->
              <div style="background-color: #fffbeb; border-left: 3px solid #d97706; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 13px; color: #b45309; line-height: 1.6; font-weight: 500;">
                  ⏱️ This link expires in <strong style="color: #d97706;">${expiresInMinutes} minutes</strong>.<br />
                  🔒 If you didn't request a password reset, <strong>ignore this email</strong> — your password won't change.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px 40px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #4b5563;">
                Need help? Contact <a href="mailto:support@visaformula.com" style="color: #3b82f6; text-decoration: none; font-weight: 600;">support@visaformula.com</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                © ${new Date().getFullYear()} Visa Formula. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
