// ============================================================
// src/emails/VerificationEmail.ts
// Premium light-themed OTP verification email matching VisaFormula branding
// ============================================================

export function generateVerificationEmailHtml(data: {
  otp: string;
  email: string;
  expiresInMinutes?: number;
}): string {
  const { otp, expiresInMinutes = 10 } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your Visa Formula account</title>
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
                Verify your email address
              </h1>
              <p style="color: #4b5563; font-size: 15px; margin: 0 0 32px 0; line-height: 24px; text-align: center;">
                Welcome! Please use the verification code below to confirm your email and complete your Visa Formula account setup.
              </p>

              <!-- OTP Box (High Contrast) -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; color: #6b7280; letter-spacing: 2px; text-transform: uppercase; font-weight: 750;">Your Verification Code</p>
                <div style="font-family: 'Courier New', monospace; font-size: 46px; font-weight: 900; color: #1e3a8a !important; letter-spacing: 12px; line-height: 1.2; margin: 8px 0;">${otp}</div>
                <p style="margin: 12px 0 0 0; font-size: 13px; color: #6b7280; font-weight: 500;">
                  ⏱️ Expires in <strong style="color: #d97706;">${expiresInMinutes} minutes</strong>
                </p>
              </div>

              <!-- Security Notice -->
              <div style="background-color: #fef2f2; border-left: 3px solid #ef4444; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 13px; color: #991b1b; line-height: 1.6; font-weight: 500;">
                  🔒 <strong>Security notice:</strong> Never share this code with anyone. Visa Formula will never ask for your OTP. If you didn't request this, you can safely ignore this email.
                </p>
              </div>

              <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.6; text-align: center;">
                Didn't request this? No action is required — your account is safe.
              </p>
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
