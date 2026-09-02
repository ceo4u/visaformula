// src/pages/api/journey/status.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const emailParam = url.searchParams.get('email') || '';
    const email = emailParam.trim().toLowerCase();

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, data: null, message: 'No email provided' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await runMigrations();
    const p = getPool();

    const res = await p.query(
      'SELECT * FROM user_journey_checklists WHERE LOWER(user_email) = $1 LIMIT 1',
      [email]
    );

    if (res.rows.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: null }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const row = res.rows[0];
    let conditions = [];
    let completedSteps = [];
    let customs = {};
    let settlement = {};

    try { conditions = JSON.parse(row.visa_conditions || '[]'); } catch(e) {}
    try { completedSteps = JSON.parse(row.completed_steps || '[]'); } catch(e) {}
    try { customs = JSON.parse(row.customs_checklist || '{}'); } catch(e) {}
    try { settlement = JSON.parse(row.settlement_checklist || '{}'); } catch(e) {}

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: row.id,
          user_email: row.user_email,
          passportCountry: row.passport_country || 'India',
          passport_country: row.passport_country || 'India',
          destination: row.destination || 'United States',
          purpose: row.purpose || 'tourism',
          visa_type: row.visa_type || '',
          approvedVisaType: row.visa_type || '',
          approvalDate: row.visa_grant_date || '',
          validityDate: row.visa_expiry_date || '',
          ocrConditions: conditions,
          completedSteps: completedSteps,
          pickupFlightNum: row.airport_pickup_flight_no || '',
          pickupConfirmed: Boolean(row.airport_pickup_confirmed),
          transitChecked: Boolean(row.transit_checked),
          housingStatus: row.housing_status || 'exploring',
          peerNetworkJoined: Boolean(row.peer_network_joined),
          forexCardOrdered: Boolean(row.forex_ordered),
          customsChecklistDone: customs,
          settlementChecklistDone: settlement,
          updatedAt: row.updated_at
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('API /api/journey/status error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
