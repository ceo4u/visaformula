// src/pages/api/reviews.ts
// Handles client reviews, ratings, and server-side verified transaction enforcement
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../backend/db';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const url = new URL(request.url);
    const expertId = url.searchParams.get('expertId');

    if (!expertId) {
      return new Response(
        JSON.stringify({ success: false, error: 'expertId query parameter is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const reviewsRes = await pool.query(
      `SELECT id, expert_id, expert_name, seeker_name, rating, feedback, tags, is_verified_transaction, created_at 
       FROM reviews 
       WHERE expert_id = $1 
       ORDER BY created_at DESC`,
      [parseInt(expertId, 10)]
    );

    return new Response(
      JSON.stringify({ success: true, reviews: reviewsRes.rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/reviews GET] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch reviews.' }),
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
      expertId,
      expertName = '',
      seekerName = '',
      seekerEmail = '',
      rating = 5,
      feedback = '',
      tags = '',
      bookingId = 0
    } = body;

    // Validate inputs
    if (!expertId || !seekerEmail || !feedback.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Expert ID, seeker email, and feedback message are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const numRating = parseInt(rating, 10);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return new Response(
        JSON.stringify({ success: false, error: 'Rating must be an integer between 1 and 5.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // SERVER-SIDE VERIFIED TRANSACTION CHECK:
    // User cannot set is_verified_transaction manually. Backend validates booking existence.
    let isVerifiedTransaction = false;
    let validatedBookingId = 0;

    const bookingCheck = await pool.query(
      `SELECT id, status FROM bookings 
       WHERE expert_id = $1 AND LOWER(seeker_email) = LOWER($2) AND status IN ('completed', 'confirmed') 
       ORDER BY id DESC LIMIT 1`,
      [expertId, seekerEmail.trim().toLowerCase()]
    );

    if (bookingCheck.rows.length > 0) {
      isVerifiedTransaction = true;
      validatedBookingId = bookingCheck.rows[0].id;
    } else if (bookingId) {
      const explicitCheck = await pool.query(
        `SELECT id, status FROM bookings 
         WHERE id = $1 AND expert_id = $2 AND LOWER(seeker_email) = LOWER($3)`,
        [bookingId, expertId, seekerEmail.trim().toLowerCase()]
      );
      if (explicitCheck.rows.length > 0) {
        isVerifiedTransaction = true;
        validatedBookingId = explicitCheck.rows[0].id;
      }
    }

    // Insert review record
    const insertRes = await pool.query(
      `INSERT INTO reviews (
        expert_id,
        expert_name,
        seeker_name,
        seeker_email,
        rating,
        feedback,
        tags,
        is_verified_transaction,
        booking_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, created_at`,
      [
        expertId,
        expertName || 'Verified Expert',
        seekerName || 'Verified Client',
        seekerEmail.trim().toLowerCase(),
        numRating,
        feedback,
        tags,
        isVerifiedTransaction,
        validatedBookingId
      ]
    );

    // Recalculate and update expert's review metrics in experts table
    const statsRes = await pool.query(
      `SELECT COUNT(*) as count, AVG(rating) as avg_rating FROM reviews WHERE expert_id = $1`,
      [expertId]
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Review submitted successfully! Thank you for your feedback.',
        reviewId: insertRes.rows[0].id,
        isVerifiedTransaction,
        newReviewCount: parseInt(statsRes.rows[0]?.count || '1', 10),
        averageRating: parseFloat(statsRes.rows[0]?.avg_rating || numRating).toFixed(1)
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/reviews POST] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to submit review. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
