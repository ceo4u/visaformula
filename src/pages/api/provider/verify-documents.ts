// src/pages/api/provider/verify-documents.ts
// Handles provider document verification submission and status retrieval
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const url = new URL(request.url);
    const email = url.searchParams.get('email')?.trim().toLowerCase();

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Provider email is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get expert record
    const expertRes = await pool.query(
      `SELECT id, business_name, email, is_verified, verification_status, verification_tier, gov_registration_number 
       FROM experts WHERE LOWER(email) = LOWER($1)`,
      [email]
    );

    if (expertRes.rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Expert profile not found.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const expert = expertRes.rows[0];

    // Fetch submitted verification documents (excluding raw binary data from output for safety)
    const docRes = await pool.query(
      `SELECT id, label, document_type, status, file_name, file_size, created_at 
       FROM documents 
       WHERE user_id = $1 AND user_type = 'expert' 
       ORDER BY created_at DESC`,
      [expert.id]
    );

    return new Response(
      JSON.stringify({
        success: true,
        expertId: expert.id,
        verificationStatus: expert.verification_status || 'pending',
        verificationTier: expert.verification_tier || (expert.is_verified ? 'travltik_trusted' : 'email_verified'),
        isVerified: expert.is_verified || false,
        govRegNumber: expert.gov_registration_number || '',
        documents: docRes.rows
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/provider/verify-documents GET] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to retrieve verification status.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();

    const {
      expertEmail = '',
      documentType = 'business_registration',
      fileName = '',
      fileSize = '',
      mimeType = '',
      fileData = '', // Secure encoded document payload
      notes = ''
    } = body;

    if (!expertEmail || !fileName) {
      return new Response(
        JSON.stringify({ success: false, error: 'Expert email and document file are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate expert existence
    const expertRes = await pool.query(
      `SELECT id, business_name, email FROM experts WHERE LOWER(email) = LOWER($1)`,
      [expertEmail.trim().toLowerCase()]
    );

    if (expertRes.rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Registered expert profile not found.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const expert = expertRes.rows[0];

    // Label based on document type
    const labelMap: Record<string, string> = {
      business_registration: 'Business Registration Proof',
      professional_license: 'Professional License / Bar / ICCRC Document',
      identity_document: 'Government Identity Document'
    };
    const docLabel = labelMap[documentType] || 'Verification Document';

    // Store in documents table with 'under_review' status
    const docResult = await pool.query(
      `INSERT INTO documents (
        user_id,
        user_type,
        label,
        document_type,
        status,
        file_name,
        file_size,
        mime_type,
        file_url,
        notes
      ) VALUES ($1, 'expert', $2, $3, 'under_review', $4, $5, $6, $7, $8)
      RETURNING id, label, document_type, status, file_name, file_size, created_at`,
      [
        expert.id,
        docLabel,
        documentType,
        fileName,
        fileSize,
        mimeType,
        fileData ? `secure://docs/${expert.id}/${documentType}_${Date.now()}` : null,
        notes
      ]
    );

    // Update expert verification status to 'under_review'
    await pool.query(
      `UPDATE experts 
       SET verification_status = 'under_review' 
       WHERE id = $1 AND verification_status != 'approved'`,
      [expert.id]
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Document submitted successfully for review.',
        document: docResult.rows[0],
        verificationStatus: 'under_review'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/provider/verify-documents POST] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process document verification request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
