// ============================================================
// src/pages/api/auth/google.ts
// SSR API Route for Firebase Google OAuth Token Verification & DB Resolution
// Handles Duplicate User Prevention & Role Routing (Seeker / Expert)
// ============================================================

import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';
import { createSession } from '../../../backend/auth';
import { verifyFirebaseToken } from '../../../lib/firebase-admin';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log("====================================================");
  console.log("[API /api/auth/google] Google Authentication API Hit");

  try {
    const body = await request.json();
    const { idToken, role: requestedRole = 'seeker' } = body;

    if (!idToken) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Firebase ID Token is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Step 3.1: Verify idToken via Firebase Admin SDK
    let decodedToken;
    try {
      decodedToken = await verifyFirebaseToken(idToken);
      console.log(`[API /api/auth/google] Token Verified for: ${decodedToken.email} (UID: ${decodedToken.uid})`);
    } catch (authErr: any) {
      console.error('[API /api/auth/google] Token Verification Failed:', authErr?.message);
      return new Response(
        JSON.stringify({ status: 'error', message: authErr?.message || 'Invalid or expired Firebase ID token.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const email = decodedToken.email.toLowerCase().trim();
    await runMigrations();
    const pool = getPool();

    // Step 3.2: Query PostgreSQL database for existing records
    const [seekerRes, expertRes] = await Promise.all([
      pool.query('SELECT * FROM seekers WHERE LOWER(email) = LOWER($1)', [email]),
      pool.query('SELECT * FROM experts WHERE LOWER(email) = LOWER($1)', [email]),
    ]);

    let user: any = null;
    let userRole: 'seeker' | 'expert' = requestedRole === 'expert' ? 'expert' : 'seeker';
    let isNewUser = false;

    // Case A: User Already Exists in Database (Duplicate Prevention)
    if (seekerRes.rows.length > 0) {
      user = seekerRes.rows[0];
      userRole = 'seeker';
      console.log(`[API /api/auth/google] Existing Seeker Account Found (ID: ${user.id})`);
    } else if (expertRes.rows.length > 0) {
      user = expertRes.rows[0];
      userRole = 'expert';
      console.log(`[API /api/auth/google] Existing Expert Account Found (ID: ${user.id})`);
    } else {
      // Case B: New User Registration
      isNewUser = true;
      console.log(`[API /api/auth/google] Creating New User Account (Role: ${userRole})`);

      if (userRole === 'expert') {
        // Expert Rule: Do NOT auto-populate or overwrite name/business from Gmail.
        // Set onboarding_completed = false so they manually complete details.
        const insertRes = await pool.query(`
          INSERT INTO experts (
            business_name, email, password_hash, contact_number, advisor_type, 
            about_me, portfolio_link, office_address, gov_registration_number, 
            license_document_url, expertise_tags, countries_expertise
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING *;
        `, [
          '', // Keep business_name blank so user manually fills it
          email,
          '',
          '',
          'Freelancer',
          '',
          '',
          '',
          '',
          '',
          '[]',
          '[]'
        ]);
        user = insertRes.rows[0];
      } else {
        // Seeker Registration
        const names = (decodedToken.name || '').trim().split(' ');
        const firstName = names[0] || email.split('@')[0] || 'User';
        const lastName = names.slice(1).join(' ') || '';

        const insertRes = await pool.query(`
          INSERT INTO seekers (
            first_name, last_name, email, password_hash, phone, passport_country, goals, destinations
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
        `, [
          firstName,
          lastName,
          email,
          '',
          '',
          '',
          '[]',
          '[]'
        ]);
        user = insertRes.rows[0];
      }
    }

    const token = await createSession(user.id, userRole);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Set-Cookie',
      `travltik_sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60};`
    );
    headers.append(
      'Set-Cookie',
      `travltik_sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60};`
    );

    const displayName = userRole === 'seeker'
      ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || email.split('@')[0]
      : user.business_name || email.split('@')[0];

    const redirectTarget = userRole === 'expert' ? '/consultant/dashboard' : '/dashboard';

    console.log(`[API /api/auth/google] Authentication Successful for ${email}. Session Created.`);

    return new Response(
      JSON.stringify({
        status: 'success',
        isNewUser,
        redirect: redirectTarget,
        user: {
          uid: `${userRole}_${user.id}`,
          email: user.email,
          displayName,
          type: userRole,
          rawUser: user,
        },
      }),
      { status: 200, headers }
    );
  } catch (err: any) {
    console.error('[API /api/auth/google] Internal Server Error:', err);
    return new Response(
      JSON.stringify({ status: 'error', message: err?.message || 'Server authentication error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
