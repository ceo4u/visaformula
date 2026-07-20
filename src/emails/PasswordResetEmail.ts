// ============================================================
// src/emails/PasswordResetEmail.ts
// Premium password reset email template
// ============================================================

export function generatePasswordResetEmailHtml(data: {
  resetToken: string;
  email: string;
  firstName?: string;
  expiresInMinutes?: number;
}): string {
  const { resetToken, firstName = 'there', expiresInMinutes = 30 } = data;
  const appUrl = process.env.APP_URL || 'https://visaformula.com';
  const resetLink = `${appUrl}/reset-password?token=${resetToken}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your Visa Formula password</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#111111;border:1px solid #222222;border-radius:16px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:36px 40px;text-align:center;">
              <div>
                <span style="font-size:28px;font-weight:900;color:#FFFFFF;">Visa</span>
                <span style="font-size:28px;font-weight:900;color:#4F7CFF;">Formula</span>
              </div>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Password Reset</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#FFFFFF;">Reset your password</h1>
              <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6;">
                Hi ${firstName}, we received a request to reset your password. Click the button below to choose a new one.
              </p>

              <!-- Reset Button -->
              <div style="text-align:center;margin:32px 0;">
                <a href="${resetLink}" 
                   style="display:inline-block;background:linear-gradient(135deg,#4F7CFF,#2563eb);color:#FFFFFF;font-size:16px;font-weight:700;padding:16px 40px;border-radius:12px;text-decoration:none;letter-spacing:0.3px;">
                  Reset Password
                </a>
              </div>

              <p style="margin:0 0 12px;font-size:13px;color:#64748b;">Or copy this link into your browser:</p>
              <div style="background:#1a1a1a;border:1px solid #222;border-radius:8px;padding:12px 16px;word-break:break-all;margin-bottom:28px;">
                <a href="${resetLink}" style="color:#4F7CFF;font-size:12px;text-decoration:none;">${resetLink}</a>
              </div>

              <!-- Expiry + Security -->
              <div style="background:#1a1a1a;border-left:3px solid #f59e0b;border-radius:8px;padding:16px 20px;margin-bottom:28px;">
                <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
                  ⏱️ This link expires in <strong style="color:#f59e0b;">${expiresInMinutes} minutes</strong>.<br />
                  🔒 If you didn't request a password reset, <strong style="color:#FFFFFF;">ignore this email</strong> — your password won't change.
                </p>
              </div>
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
