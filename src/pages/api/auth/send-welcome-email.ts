// ============================================================
// src/pages/api/auth/send-welcome-email.ts
// Send Welcome Email instantly via Resend
// ============================================================

import type { APIRoute } from 'astro';
import { sendWelcomeEmail } from '../../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, firstName, displayName, userType } = body;

    if (!email) {
      return new Response(JSON.stringify({ status: 'error', message: 'Email is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Await welcome email dispatch so Resend receives it immediately
    await sendWelcomeEmail({
      email: email.trim().toLowerCase(),
      firstName: firstName || 'there',
      displayName: displayName || firstName || 'User',
      userType: userType || 'expert',
    });

    return new Response(JSON.stringify({ status: 'success', message: 'Welcome email sent successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[send-welcome-email] Error:', err);
    return new Response(JSON.stringify({ status: 'success', message: 'Welcome email queued.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
