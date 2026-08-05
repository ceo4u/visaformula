import React from "react";

interface WelcomeEmailProps {
    firstName: string;
    displayName: string;
}

export function generateWelcomeHtml({ firstName, displayName }: WelcomeEmailProps): string {
    const greetingName = firstName || displayName || "there";

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Visa Formula</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; padding: 40px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);">
                    
                    <!-- Decorative Top Header Gradient Strip -->
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
                    
                    <!-- Main Body Content -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: left;">
                            <h1 style="color: #111827; font-size: 26px; font-weight: 800; margin: 0 0 12px 0; line-height: 36px; text-align: center; letter-spacing: -0.5px;">
                                Welcome to Visa Formula 👋
                            </h1>
                            <p style="color: #4b5563; font-size: 16px; font-weight: 500; margin: 0 0 36px 0; line-height: 24px; text-align: center;">
                                Your immigration portal is ready. Let's make your visa journey stress-free.
                            </p>
                            
                            <p style="color: #1f2937; font-size: 15px; margin: 0 0 24px 0; line-height: 24px; font-weight: 600;">
                                Hello ${greetingName},
                            </p>
                            
                            <p style="color: #4b5563; font-size: 15px; margin: 0 0 24px 0; line-height: 24px;">
                                We're thrilled to help you navigate your immigration path. Here is what you can now explore on the platform:
                            </p>
                            
                            <!-- Features checklist (Card format) -->
                            <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; border: 1px solid #f3f4f6; margin-bottom: 36px;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td valign="top" style="padding: 8px 0; width: 28px;">
                                            <div style="color: #2563eb; font-weight: bold; font-size: 18px; line-height: 20px;">✓</div>
                                        </td>
                                        <td style="padding: 8px 0; color: #1f2937; font-size: 15px; line-height: 22px; font-weight: 600;">
                                            Verified Visa Experts
                                            <div style="color: #6b7280; font-size: 13px; font-weight: 400; margin-top: 2px;">Consult directly with top registered immigration attorneys.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" style="padding: 16px 0 8px 0; width: 28px;">
                                            <div style="color: #2563eb; font-weight: bold; font-size: 18px; line-height: 20px;">✓</div>
                                        </td>
                                        <td style="padding: 16px 0 8px 0; color: #1f2937; font-size: 15px; line-height: 22px; font-weight: 600;">
                                            Secure Document Manager
                                            <div style="color: #6b7280; font-size: 13px; font-weight: 400; margin-top: 2px;">Keep your passport, transcripts and files safe in one encrypted vault.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" style="padding: 16px 0 8px 0; width: 28px;">
                                            <div style="color: #2563eb; font-weight: bold; font-size: 18px; line-height: 20px;">✓</div>
                                        </td>
                                        <td style="padding: 16px 0 8px 0; color: #1f2937; font-size: 15px; line-height: 22px; font-weight: 600;">
                                            Real-time Case Tracking
                                            <div style="color: #6b7280; font-size: 13px; font-weight: 400; margin-top: 2px;">Track your application milestones and upcoming deadlines.</div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Call to Action Buttons -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 0 36px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://visaformula.com/dashboard" style="background-color: #2563eb; color: #ffffff; padding: 16px 36px; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 10px; display: inline-block; box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.3); border: 1px solid #1d4ed8; text-align: center; width: 80%; max-width: 320px;">
                                            Complete Your Profile
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 20px;">
                                        <a href="https://visaformula.com/find-experts" style="color: #2563eb; font-size: 14px; font-weight: 700; text-decoration: none; border-bottom: 2px solid #dbeafe; padding-bottom: 2px;">
                                            Find Verified Visa Experts &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 36px 0;" />
                            
                            <!-- Support Section -->
                            <p style="color: #6b7280; font-size: 13px; line-height: 20px; margin: 0; text-align: center; font-weight: 500;">
                                Have questions? We're here to help. Reach out to <a href="mailto:support@visaformula.com" style="color: #2563eb; text-decoration: none; font-weight: 700;">support@visaformula.com</a>
                            </p>
                            
                            <!-- Footer Details -->
                            <p style="color: #9ca3af; font-size: 12px; line-height: 18px; margin: 16px 0 0 0; text-align: center;">
                                &copy; {new Date().getFullYear()} Logiqall Technologies. All rights reserved.
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

export default function WelcomeEmail({ firstName, displayName }: WelcomeEmailProps) {
    return null;
}
