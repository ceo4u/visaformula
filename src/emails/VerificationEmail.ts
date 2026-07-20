// ============================================================
// src/emails/VerificationEmail.ts
// Premium OTP verification email template
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
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your Visa Formula account</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#111111;border:1px solid #222222;border-radius:16px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:36px 40px;text-align:center;">
              <div style="display:inline-flex;align-items:center;gap:10px;">
                <span style="font-size:28px;font-weight:900;color:#FFFFFF;letter-spacing:-0.5px;">Visa</span>
                <span style="font-size:28px;font-weight:900;color:#4F7CFF;letter-spacing:-0.5px;">Formula</span>
              </div>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Email Verification</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#FFFFFF;">Verify your email address</h1>
              <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">
                Welcome! Use the verification code below to confirm your email and complete your Visa Formula account setup.
              </p>

              <!-- OTP Box -->
              <div style="background:linear-gradient(135deg,#1e1e3a,#1a2744);border:1px solid #4F7CFF;border-radius:16px;padding:32px;text-align:center;margin-bottom:28px;">
                <p style="margin:0 0 8px;font-size:12px;color:#64748b;letter-spacing:2px;text-transform:uppercase;">Your verification code</p>
                <div style="font-family:'Courier New',monospace;font-size:48px;font-weight:900;color:#FFFFFF;letter-spacing:14px;line-height:1.1;">${otp}</div>
                <p style="margin:16px 0 0;font-size:13px;color:#64748b;">
                  ⏱️ Expires in <strong style="color:#f59e0b;">${expiresInMinutes} minutes</strong>
                </p>
              </div>

              <!-- Security Note -->
              <div style="background:#1a1a1a;border-left:3px solid #ef4444;border-radius:8px;padding:16px 20px;margin-bottom:28px;">
                <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
                  🔒 <strong style="color:#FFFFFF;">Security notice:</strong> Never share this code with anyone. Visa Formula will never ask for your OTP. If you didn't request this, you can safely ignore this email.
                </p>
              </div>

              <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">
                Didn't request this? No action is needed — your account is safe.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d0d;border-top:1px solid #222222;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#64748b;">
                Need help? <a href="mailto:support@visaformula.com" style="color:#4F7CFF;text-decoration:none;font-weight:600;">support@visaformula.com</a>
              </p>
              <p style="margin:0;font-size:12px;color:#374151;">
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
