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
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); overflow: hidden;">
                    <!-- Logo Header -->
                    <tr>
                        <td align="center" style="padding: 40px 40px 20px 40px;">
                            <img src="https://visaformula.com/logo.png" alt="Visa Formula Logo" style="height: 56px; width: auto; max-width: 100%; display: block;" />
                        </td>
                    </tr>
                    
                    <!-- Content Body -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: left;">
                            <h1 style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 8px 0; line-height: 32px; text-align: center;">
                                Welcome to Visa Formula 👋
                            </h1>
                            <p style="color: #64748b; font-size: 16px; font-weight: 500; margin: 0 0 32px 0; line-height: 24px; text-align: center;">
                                Your account has been successfully created.
                            </p>
                            
                            <p style="color: #334155; font-size: 15px; margin: 0 0 24px 0; line-height: 24px;">
                                Hello ${greetingName},
                            </p>
                            
                            <p style="color: #334155; font-size: 15px; margin: 0 0 24px 0; line-height: 24px;">
                                You now have access to:
                            </p>
                            
                            <!-- Features checklist -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 0 32px 0;">
                                <tr>
                                    <td style="padding: 8px 0; color: #334155; font-size: 15px; line-height: 20px; font-weight: 500;">
                                        <span style="color: #3b82f6; font-weight: bold; margin-right: 8px;">✓</span> Verified Visa Experts
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #334155; font-size: 15px; line-height: 20px; font-weight: 500;">
                                        <span style="color: #3b82f6; font-weight: bold; margin-right: 8px;">✓</span> Secure Document Management
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #334155; font-size: 15px; line-height: 20px; font-weight: 500;">
                                        <span style="color: #3b82f6; font-weight: bold; margin-right: 8px;">✓</span> Application Tracking
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #334155; font-size: 15px; line-height: 20px; font-weight: 500;">
                                        <span style="color: #3b82f6; font-weight: bold; margin-right: 8px;">✓</span> Immigration Support
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Call to Action Buttons -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 0 0 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://visaformula.com/dashboard" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 8px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">
                                            Complete Your Profile
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 16px;">
                                        <a href="https://visaformula.com/find-expert" style="color: #2563eb; font-size: 14px; font-weight: 600; text-decoration: none;">
                                            Find Visa Experts &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 32px 0;" />
                            
                            <!-- Footer Details -->
                            <p style="color: #64748b; font-size: 13px; line-height: 20px; margin: 0; text-align: center;">
                                Need help? Reach out at <a href="mailto:support@visaformula.com" style="color: #2563eb; text-decoration: none;">support@visaformula.com</a>
                            </p>
                            <p style="color: #94a3b8; font-size: 12px; line-height: 18px; margin: 12px 0 0 0; text-align: center;">
                                &copy; 2026 Visa Formula. All rights reserved.
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
    return null; // Empty placeholder React component if used in imports, HTML is primary
}
