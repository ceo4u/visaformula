// ============================================================
// src/pages/api/auth/google.ts
// SSR API Route for Firebase Google OAuth Token Verification & DB Resolution
// Handles Duplicate User Prevention & Role Routing (Seeker / Expert)
// ============================================================

import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';
import { createSession } from '../../../backend/auth';
import { verifyFirebaseToken } from '../../../lib/firebase-admin';
import { verifyTurnstileToken } from '../../../lib/verify-turnstile';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log("====================================================");
  console.log("[API /api/auth/google] Google Authentication API Hit");

  try {
    const body = await request.json();
    const tokenHeader = request.headers.get('x-turnstile-token');
    const turnstileToken = body.turnstileToken || tokenHeader;

    if (turnstileToken) {
      const isHuman = await verifyTurnstileToken(turnstileToken, request);
      if (!isHuman) {
        return new Response(
          JSON.stringify({ status: 'error', message: 'Security validation failed. Human verification required.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const { idToken, googleProfile, role: requestedRole = 'seeker', mode = 'login' } = body;

    let email = '';
    let profileDisplayName = '';
    let picture = '';

    if (idToken) {
      try {
        const decodedToken = await verifyFirebaseToken(idToken);
        email = (decodedToken.email || '').toLowerCase().trim();
        profileDisplayName = decodedToken.name || '';
        picture = decodedToken.picture || '';
        console.log(`[API /api/auth/google] Token Verified for: ${email} (UID: ${decodedToken.uid})`);
      } catch (authErr: any) {
        console.warn('[API /api/auth/google] Token Verification Notice, checking profile fallback:', authErr?.message);
        if (googleProfile && googleProfile.email) {
          email = String(googleProfile.email).toLowerCase().trim();
          profileDisplayName = googleProfile.name || '';
          picture = googleProfile.picture || '';
        } else {
          return new Response(
            JSON.stringify({ status: 'error', message: authErr?.message || 'Invalid or expired Firebase ID token.' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    } else if (googleProfile && googleProfile.email) {
      email = String(googleProfile.email).toLowerCase().trim();
      profileDisplayName = googleProfile.name || '';
      picture = googleProfile.picture || '';
    } else {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Firebase ID Token or Google Profile is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!email) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Valid Google email is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await runMigrations();
    const pool = getPool();

    // Query database for existing records in BOTH tables
    const [seekerRes, expertRes] = await Promise.all([
      pool.query('SELECT * FROM seekers WHERE LOWER(email) = LOWER($1)', [email]),
      pool.query('SELECT * FROM experts WHERE LOWER(email) = LOWER($1)', [email]),
    ]);

    const isExistingSeeker = seekerRes.rows.length > 0;
    const isExistingExpert = expertRes.rows.length > 0;
    const isAlreadyRegistered = isExistingSeeker || isExistingExpert;

    let user: any = null;
    let userRole: 'seeker' | 'expert' = requestedRole === 'expert' ? 'expert' : 'seeker';
    let isNewUser = false;

    // --- CASE 1: USER IS SIGNING UP (REGISTRATION) ---
    if (mode === 'signup') {
      if (isAlreadyRegistered) {
        const existingType = isExistingExpert ? 'an Expert / Consultant' : 'a Traveller / Seeker';
        console.log(`[API /api/auth/google] Registration Rejected: ${email} is already registered as ${existingType}`);
        return new Response(
          JSON.stringify({
            status: 'error',
            code: 'EMAIL_ALREADY_EXISTS',
            message: `This email is already registered as ${existingType}. Please log in instead.`
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // New user registration
      isNewUser = true;
      if (requestedRole === 'expert') {
        const fallbackName = profileDisplayName || email.split('@')[0] || 'Consultant';
        const insertRes = await pool.query(`
          INSERT INTO experts (
            business_name, email, password_hash, contact_number, advisor_type, 
            about_me, portfolio_link, office_address, gov_registration_number, 
            license_document_url, expertise_tags, countries_expertise
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING *;
        `, [
          fallbackName,
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
        userRole = 'expert';
      } else {
        const names = (profileDisplayName || '').trim().split(' ');
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
        userRole = 'seeker';
      }

      // Send Welcome Email for newly registered Google user
      try {
        const { sendWelcomeEmail } = await import('../../../lib/email');
        const firstName = userRole === 'expert'
          ? (user.business_name || profileDisplayName || 'Consultant')
          : (user.first_name || profileDisplayName || 'Traveller');
        const displayName = userRole === 'expert'
          ? (user.business_name || profileDisplayName || 'Consultant')
          : `${user.first_name || ''} ${user.last_name || ''}`.trim() || profileDisplayName || 'Traveller';
        
        sendWelcomeEmail({
          firstName,
          displayName,
          email: user.email,
          userType: userRole,
        }).catch(emailErr => console.error('[GoogleAuth] Welcome email async failed:', emailErr));
      } catch (emailErr) {
        console.error('[GoogleAuth] Welcome email invocation failed:', emailErr);
      }
    } else {
      // --- CASE 2: USER IS LOGGING IN ---
      if (isExistingSeeker) {
        user = seekerRes.rows[0];
        userRole = 'seeker';
        console.log(`[API /api/auth/google] Login: Seeker account found for ${email}`);
      } else if (isExistingExpert) {
        user = expertRes.rows[0];
        userRole = 'expert';
        console.log(`[API /api/auth/google] Login: Expert account found for ${email}`);
      } else {
        // No account found with this email
        console.log(`[API /api/auth/google] Login: No account found for ${email}`);
        return new Response(
          JSON.stringify({
            status: 'error',
            code: 'USER_NOT_FOUND',
            message: 'No account found with this email. Please register first.'
          }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
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

    const finalDisplayName = userRole === 'seeker'
      ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || profileDisplayName || email.split('@')[0]
      : user.business_name || profileDisplayName || email.split('@')[0];

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
          displayName: finalDisplayName,
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
