import type { APIRoute } from 'astro';
import { getVisaRequirements } from '../../../lib/visa-v3/orchestrator';
import { runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const body = await request.json();
    const fromCountry = body.fromCountry || 'India';
    const toCountry = body.toCountry || 'China';
    const purpose = body.purpose || 'Tourism';

    const cleanPurpose = purpose.toLowerCase().split(' ')[0];

    const result = await getVisaRequirements(fromCountry, toCountry, cleanPurpose);

    const response: any = {
      success: true,
      verification_status: result.verification_status,
      source: result.source,
      source_url: result.source_url || null,
      source_authority: result.source_authority || null,
      source_content_hash: result.source_content_hash || null,
      retrieved_at: result.retrieved_at || null,
      is_fresh: result.is_fresh,
      validation_errors: result.validation_errors || [],
      missing_critical_fields: result.missing_critical_fields || []
    };

    if (result.verification_status === 'verified' || 
        result.verification_status === 'partially_verified') {
      response.data = result.data;
    } else if (result.verification_status === 'needs_review') {
      response.data = result.data;
      response.message = 'This information is being verified by our team.';
    } else {
      response.data = null;
      response.message = 'Official source verification unavailable. Please check the official embassy website.';
      if (result.source_url) {
        response.official_embassy_url = result.source_url;
      }
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('[VisaAPI] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to retrieve visa requirements',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
