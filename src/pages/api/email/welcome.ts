import type { APIRoute } from "astro";
import { z } from "zod";
import { sendEmailWithRetry } from "../../../lib/mail";
import { generateWelcomeHtml } from "../../../emails/WelcomeEmail";

export const prerender = false;

// Simple in-memory rate limiter to prevent spam attacks
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_MINUTE = 5;

const WelcomeSchema = z.object({
    email: z.string().email(),
    firstName: z.string().optional().default(""),
    displayName: z.string().optional().default("Google User"),
    uid: z.string()
});

export const POST: APIRoute = async ({ request, clientAddress }) => {
    try {
        // 1. IP Rate Limiting
        const ip = clientAddress || "unknown-ip";
        const now = Date.now();
        const rateRecord = rateLimitMap.get(ip);
        
        if (rateRecord && (now - rateRecord < RATE_LIMIT_WINDOW)) {
            return new Response(JSON.stringify({ status: "error", message: "Too many requests. Please try again in a minute." }), {
                status: 429,
                headers: { "Content-Type": "application/json" }
            });
        }
        rateLimitMap.set(ip, now);

        // 2. Body Validation
        const body = await request.json().catch(() => ({}));
        const validation = WelcomeSchema.safeParse(body);

        if (!validation.success) {
            return new Response(JSON.stringify({ status: "error", message: "Invalid payload input.", errors: validation.error.format() }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { email, firstName, displayName } = validation.data;

        // Escape helper to prevent HTML injection in emails
        const escapeHtml = (text: string) => {
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        const safeFirstName = escapeHtml(firstName);
        const safeDisplayName = escapeHtml(displayName);

        // 3. Generate template html and send email via SMTP transporter
        const html = generateWelcomeHtml({ firstName: safeFirstName, displayName: safeDisplayName });

        const info = await sendEmailWithRetry({
            from: `"Tavltik" <noreply@travltik.com>`,
            to: email,
            subject: `Welcome to Tavltik 👋`,
            html: html
        });

        return new Response(JSON.stringify({
            success: true,
            messageId: info.messageId || "SMTP_SUCCESS",
            status: "Email Sent"
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error: any) {
        console.error("[Welcome Email API error]:", error);
        return new Response(JSON.stringify({ status: "error", message: error.message || "Failed to deliver welcome email." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
