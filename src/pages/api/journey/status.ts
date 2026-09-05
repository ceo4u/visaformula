// src/pages/api/journey/status.ts
import type { APIRoute } from 'astro';
import { getPool, runMigrations } from '../../../backend/db';

export const prerender = false;

function getCountryFlag(country: string): string {
  const c = (country || '').toLowerCase().trim();
  if (c.includes('greece')) return '🇬🇷';
  if (c.includes('united states') || c.includes('usa') || c.includes('us')) return '🇺🇸';
  if (c.includes('united kingdom') || c.includes('uk')) return '🇬🇧';
  if (c.includes('canada')) return '🇨🇦';
  if (c.includes('australia')) return '🇦🇺';
  if (c.includes('germany')) return '🇩🇪';
  if (c.includes('france')) return '🇫🇷';
  if (c.includes('italy')) return '🇮🇹';
  if (c.includes('spain')) return '🇪🇸';
  if (c.includes('japan')) return '🇯🇵';
  if (c.includes('singapore')) return '🇸🇬';
  if (c.includes('uae') || c.includes('dubai')) return '🇦🇪';
  if (c.includes('mauritius')) return '🇲🇺';
  if (c.includes('schengen')) return '🇪🇺';
  if (c.includes('india')) return '🇮🇳';
  return '🌍';
}

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

    const [journeyRes, selfAppRes] = await Promise.all([
      p.query('SELECT * FROM user_journey_checklists WHERE LOWER(user_email) = $1 LIMIT 1', [email]),
      p.query('SELECT * FROM self_applications WHERE LOWER(email) = $1 ORDER BY created_at DESC LIMIT 10', [email])
    ]);

    let applications: any[] = [];

    if (journeyRes.rows.length > 0) {
      const row = journeyRes.rows[0];

      // Check if user has explicit active_applications stored in DB
      let storedApps: any[] = [];
      try {
        if (row.active_applications) {
          storedApps = JSON.parse(row.active_applications);
        }
      } catch (e) {}

      if (Array.isArray(storedApps) && storedApps.length > 0) {
        applications = storedApps;
      } else if (row.destination) {
        // Synthesize application from the active journey
        const dest = row.destination;
        const pass = (row.passport_country || 'India').replace(/n$/, '');
        const purp = (row.purpose || 'tourism').toLowerCase();
        const code = dest.slice(0, 2).toUpperCase();
        const trackingId = `TT-${code}-2026-${row.id || '9824'}`;
        const flag = getCountryFlag(dest);
        const visaType = row.visa_type || (purp.includes('study') ? `${dest} Student Visa` : purp.includes('work') ? `${dest} Work Visa` : `${dest} Tourist Visa`);

        let uploadedDocs = {};
        try { uploadedDocs = JSON.parse(row.uploaded_documents || '{}'); } catch(e) {}
        const docCount = Object.keys(uploadedDocs).length;

        applications.push({
          id: `app_journey_${row.id}`,
          customName: `${dest} ${visaType.includes('Schengen') ? 'Schengen Visa' : 'Visa'}`,
          trackingId,
          destination: dest,
          destinationFlag: flag,
          visaType,
          purpose: purp,
          passport: pass,
          status: docCount > 0 ? 'Required Documents & AI Verified' : 'Requirements & Eligibility Active',
          stage: docCount > 0 ? 'Under AI Concierge Review' : 'Requirements & Document Collection',
          progress: docCount > 0 ? Math.min(35, 15 + docCount * 5) : 10,
          documentsCount: docCount,
          addonsCount: 0,
          submittedAt: row.updated_at ? new Date(row.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
          targetDate: '15 Working Days',
          createdAt: row.updated_at || new Date().toISOString()
        });
      }
    }

    // Merge any self_applications if not already in list
    if (selfAppRes.rows.length > 0) {
      selfAppRes.rows.forEach((sa: any) => {
        const saTracking = `TT-SA-2026-${sa.id}`;
        if (!applications.some((a: any) => a.trackingId === saTracking || a.id === `sa-${sa.id}`)) {
          const dest = sa.destination_country || 'Visa Destination';
          applications.push({
            id: `sa-${sa.id}`,
            customName: `${dest} Self Application`,
            trackingId: saTracking,
            destination: dest,
            destinationFlag: getCountryFlag(dest),
            visaType: sa.visa_type ? `${sa.visa_type} Visa` : 'Self-Filing Visa',
            purpose: 'tourism',
            passport: sa.nationality || 'Applicant',
            status: sa.status === 'in_progress' ? 'Application Under Review' : (sa.status || 'Active Application'),
            stage: 'Embassy Filing In Progress',
            progress: 45,
            documentsCount: 2,
            addonsCount: 0,
            submittedAt: sa.created_at ? new Date(sa.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
            targetDate: '10-15 Working Days',
            createdAt: sa.created_at || new Date().toISOString()
          });
        }
      });
    }

    if (journeyRes.rows.length === 0 && applications.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: null, applications: [] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const row = journeyRes.rows[0] || {};
    let conditions = [];
    let completedSteps = [];
    let customs = {};
    let settlement = {};
    let uploadedDocs = {};

    try { conditions = JSON.parse(row.visa_conditions || '[]'); } catch(e) {}
    try { completedSteps = JSON.parse(row.completed_steps || '[]'); } catch(e) {}
    try { customs = JSON.parse(row.customs_checklist || '{}'); } catch(e) {}
    try { settlement = JSON.parse(row.settlement_checklist || '{}'); } catch(e) {}
    try { uploadedDocs = JSON.parse(row.uploaded_documents || '{}'); } catch(e) {}

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: row.id || 0,
          user_email: email,
          passportCountry: row.passport_country || 'India',
          passport_country: row.passport_country || 'India',
          destination: row.destination || (applications[0]?.destination || 'United States'),
          purpose: row.purpose || 'tourism',
          visa_type: row.visa_type || (applications[0]?.visaType || ''),
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
          uploaded_documents: uploadedDocs,
          applications: applications,
          updatedAt: row.updated_at || new Date().toISOString()
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
