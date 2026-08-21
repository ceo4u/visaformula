// src/pages/api/journey/update-step.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      user_email,
      passport_country = 'India',
      destination = 'Canada',
      purpose = 'study',
      visa_type = '',
      visa_grant_date = '',
      visa_expiry_date = '',
      visa_conditions = [],
      completed_steps = [],
      airport_pickup_flight_no = '',
      airport_pickup_confirmed = false,
      transit_checked = false,
      housing_status = 'exploring',
      peer_network_joined = false,
      forex_ordered = false,
      customs_checklist = {},
      settlement_checklist = {}
    } = body;

    const email = (user_email || '').trim().toLowerCase();
    if (!email) {
      return new Response(
        JSON.stringify({ success: true, message: 'Saved locally (guest state)' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await runMigrations();
    const p = getPool();

    const visaConditionsStr = JSON.stringify(Array.isArray(visa_conditions) ? visa_conditions : []);
    const completedStepsStr = JSON.stringify(Array.isArray(completed_steps) ? completed_steps : []);
    const customsChecklistStr = JSON.stringify(typeof customs_checklist === 'object' ? customs_checklist : {});
    const settlementChecklistStr = JSON.stringify(typeof settlement_checklist === 'object' ? settlement_checklist : {});

    await p.query(
      `INSERT INTO user_journey_checklists (
        user_email,
        passport_country,
        destination,
        purpose,
        visa_type,
        visa_grant_date,
        visa_expiry_date,
        visa_conditions,
        completed_steps,
        airport_pickup_flight_no,
        airport_pickup_confirmed,
        transit_checked,
        housing_status,
        peer_network_joined,
        forex_ordered,
        customs_checklist,
        settlement_checklist,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, CURRENT_TIMESTAMP)
      ON CONFLICT (user_email) DO UPDATE SET
        passport_country = EXCLUDED.passport_country,
        destination = EXCLUDED.destination,
        purpose = EXCLUDED.purpose,
        visa_type = EXCLUDED.visa_type,
        visa_grant_date = EXCLUDED.visa_grant_date,
        visa_expiry_date = EXCLUDED.visa_expiry_date,
        visa_conditions = EXCLUDED.visa_conditions,
        completed_steps = EXCLUDED.completed_steps,
        airport_pickup_flight_no = EXCLUDED.airport_pickup_flight_no,
        airport_pickup_confirmed = EXCLUDED.airport_pickup_confirmed,
        transit_checked = EXCLUDED.transit_checked,
        housing_status = EXCLUDED.housing_status,
        peer_network_joined = EXCLUDED.peer_network_joined,
        forex_ordered = EXCLUDED.forex_ordered,
        customs_checklist = EXCLUDED.customs_checklist,
        settlement_checklist = EXCLUDED.settlement_checklist,
        updated_at = CURRENT_TIMESTAMP`,
      [
        email,
        passport_country,
        destination,
        purpose,
        visa_type,
        visa_grant_date,
        visa_expiry_date,
        visaConditionsStr,
        completedStepsStr,
        airport_pickup_flight_no,
        Boolean(airport_pickup_confirmed),
        Boolean(transit_checked),
        housing_status,
        Boolean(peer_network_joined),
        Boolean(forex_ordered),
        customsChecklistStr,
        settlementChecklistStr
      ]
    );

    return new Response(
      JSON.stringify({ success: true, savedAt: new Date().toISOString() }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('API /api/journey/update-step error:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
