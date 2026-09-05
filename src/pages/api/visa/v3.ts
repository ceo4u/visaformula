// src/pages/api/visa/v3.ts
import type { APIRoute } from 'astro';
import { runV3VerificationEngine } from '../../../lib/visa-v3/engine';
import { runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const body = await request.json();
    const { fromCountry = 'India', toCountry, purpose = 'Tourism', forceRefresh = false } = body;

    if (!toCountry) {
      return new Response(JSON.stringify({
        success: false,
        message: 'toCountry (destination) is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await runV3VerificationEngine({
      fromCountry,
      toCountry,
      purpose,
      forceRefresh: Boolean(forceRefresh)
    });

    return new Response(JSON.stringify({
      success: true,
      ...result
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('[V3 API Error]:', err);
    return new Response(JSON.stringify({
      success: false,
      status: 'UNVERIFIED',
      message: err.message || 'V3 Verification Engine internal error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
