// ============================================================
// src/emails/VerificationEmail.ts
// Premium light-themed OTP verification email matching TravlTik branding
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
  <title>Verify your TravlTik account</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.06);">
          
          <!-- Top Gradient Strip -->
          <tr>
            <td style="background: linear-gradient(135deg, #581c87 0%, #00a896 100%); height: 6px; line-height: 6px; font-size: 1px;">
              &nbsp;
            </td>
          </tr>

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 36px 40px 20px 40px;">
              <h2 style="margin: 0; font-size: 26px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px;">
                <span style="color: #581c87;">Travl</span><span style="color: #00a896;">Tik</span>
              </h2>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 0 40px 32px 40px; text-align: left;">
              <h1 style="color: #0f172a; font-size: 22px; font-weight: 800; margin: 0 0 12px 0; line-height: 30px; text-align: center; letter-spacing: -0.5px;">
                Verify your email address
              </h1>
              <p style="color: #64748b; font-size: 15px; margin: 0 0 28px 0; line-height: 24px; text-align: center;">
                Welcome! Please use the verification code below to confirm your email and complete your TravlTik account setup.
              </p>

              <!-- OTP Box (High Contrast) -->
              <div style="background-color: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 18px; padding: 28px; text-align: center; margin-bottom: 28px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b; letter-spacing: 2px; text-transform: uppercase; font-weight: 750;">Your Verification Code</p>
                <div style="font-family: 'Courier New', monospace; font-size: 44px; font-weight: 900; color: #00a896 !important; letter-spacing: 10px; line-height: 1.2; margin: 8px 0;">${otp}</div>
                <p style="margin: 12px 0 0 0; font-size: 13px; color: #64748b; font-weight: 600;">
                  ⏱️ Valid for <strong style="color: #0f172a;">${expiresInMinutes} minutes</strong>
                </p>
              </div>

              <!-- Security Notice -->
              <div style="background-color: #fef2f2; border-left: 3px solid #ef4444; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 13px; color: #991b1b; line-height: 1.5; font-weight: 500;">
                  🔒 <strong>Security Notice:</strong> Never share this OTP with anyone. TravlTik will never ask for your verification code.
                </p>
              </div>

              <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.6; text-align: center;">
                Didn't request this? No action is required — your account is safe.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 20px 40px; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #64748b;">
                Need help? Contact <a href="mailto:support@travltik.com" style="color: #00a896; text-decoration: none; font-weight: 600;">support@travltik.com</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                © ${new Date().getFullYear()} TravlTik. All rights reserved.
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
