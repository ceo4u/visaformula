// src/pages/api/quotes.ts
// Handles seeker "Request a Quote" leads with intelligent provider matching
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../backend/db';
import { sendEmail } from '../../lib/resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();

    const {
      seekerName = '',
      seekerEmail = '',
      seekerPhone = '',
      seekerId = 0,
      expertId = 0,
      expertName = '',
      expertEmail = '',
      destinationCountry = '',
      visaCategory = '',
      specificPathway = '',
      budgetRange = '',
      preferredChannel = 'email',
      preferredTime = 'Anytime',
      message = ''
    } = body;

    // Strict input validation
    if (!seekerEmail || !destinationCountry || !visaCategory || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Please fill in all required fields (Email, Destination Country, Visa Category, and Message).' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(seekerEmail.trim())) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let targetExpertId = expertId;
    let targetExpertName = expertName;
    let targetExpertEmail = expertEmail;

    // Provider Matching Logic: If not assigned to a specific expert, match based on destination and category
    if (!targetExpertId && !targetExpertEmail) {
      const matchRes = await pool.query(
        `SELECT id, business_name, email, countries_expertise, expertise_tags 
         FROM experts 
         WHERE (countries_expertise ILIKE $1 OR expertise_tags ILIKE $2)
         ORDER BY is_verified DESC, id ASC 
         LIMIT 1`,
        [`%${destinationCountry}%`, `%${visaCategory}%`]
      );

      if (matchRes.rows.length > 0) {
        targetExpertId = matchRes.rows[0].id;
        targetExpertName = matchRes.rows[0].business_name;
        targetExpertEmail = matchRes.rows[0].email;
      }
    }

    // Insert quote record into database
    const insertRes = await pool.query(
      `INSERT INTO quotes (
        seeker_id,
        seeker_name,
        seeker_email,
        seeker_phone,
        expert_id,
        expert_name,
        expert_email,
        destination_country,
        visa_category,
        specific_pathway,
        budget_range,
        preferred_channel,
        preferred_time,
        message,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'new')
      RETURNING id, created_at`,
      [
        seekerId || 0,
        seekerName || 'Applicant',
        seekerEmail.trim().toLowerCase(),
        seekerPhone,
        targetExpertId || 0,
        targetExpertName || 'TravlTik Verified Partner',
        targetExpertEmail || 'support@travltik.com',
        destinationCountry,
        visaCategory,
        specificPathway,
        budgetRange,
        preferredChannel,
        preferredTime,
        message
      ]
    );

    const quoteId = insertRes.rows[0].id;

    // Trigger notification email via Resend to the matched expert or admin
    const notifyEmail = targetExpertEmail || 'support@travltik.com';
    try {
      await sendEmail({
        to: notifyEmail,
        subject: `💼 New Quote Request: ${destinationCountry} (${visaCategory}) - Lead #${quoteId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #481268 0%, #00a896 100%); color: white; padding: 18px 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">TravlTik — New Quote Request Lead</h2>
            </div>
            <div style="padding: 24px; color: #1e293b;">
              <p style="font-size: 16px; font-weight: bold;">Hello ${targetExpertName || 'Advisor'},</p>
              <p>A prospective client has submitted a customized quotation request on TravlTik.</p>
              
              <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 18px; margin: 16px 0;">
                <p style="margin: 6px 0;"><strong>👤 Client Name:</strong> ${seekerName || 'Not specified'}</p>
                <p style="margin: 6px 0;"><strong>📧 Email:</strong> <a href="mailto:${seekerEmail}">${seekerEmail}</a></p>
                <p style="margin: 6px 0;"><strong>📞 Phone / WhatsApp:</strong> ${seekerPhone || 'Not specified'}</p>
                <p style="margin: 6px 0;"><strong>🌍 Target Country:</strong> ${destinationCountry}</p>
                <p style="margin: 6px 0;"><strong>📋 Visa Category:</strong> ${visaCategory}</p>
                ${specificPathway ? `<p style="margin: 6px 0;"><strong>🎯 Specific Pathway:</strong> ${specificPathway}</p>` : ''}
                ${budgetRange ? `<p style="margin: 6px 0;"><strong>💰 Budget Range:</strong> ${budgetRange}</p>` : ''}
                <p style="margin: 6px 0;"><strong>📱 Preferred Channel:</strong> ${preferredChannel.toUpperCase()} (${preferredTime})</p>
                <p style="margin: 8px 0 0 0; padding-top: 8px; border-top: 1px dashed #cbd5e1;"><strong>📝 Requirements:</strong><br/>${message}</p>
              </div>

              <p style="font-size: 13px; color: #64748b;">Respond promptly to increase conversion. You can also view this request in your Consultant Dashboard.</p>
            </div>
          </div>
        `
      });
    } catch (mailErr) {
      console.warn('[quotes API] Resend email warning:', mailErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote request submitted successfully! Verified advisors will review your case.',
        quoteId
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/quotes POST] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to submit quote request. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
