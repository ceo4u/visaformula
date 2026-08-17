// src/pages/api/bookings/create-order.ts
// Creates server-side payment order for consultation bookings
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';
import crypto from 'crypto';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();

    const {
      bookingId,
      expertId,
      expertName = '',
      expertEmail = '',
      seekerName = '',
      seekerEmail = '',
      seekerPhone = '',
      amount = 49.00,
      currency = 'INR',
      visaCategory = 'General Consultation',
      bookingDate = new Date().toISOString()
    } = body;

    if (!seekerEmail || !expertId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Seeker email and Expert ID are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let actualBookingId = bookingId;

    // 1. Create or get pending booking in database
    if (!actualBookingId) {
      const bookRes = await pool.query(
        `INSERT INTO bookings (
          seeker_name,
          seeker_email,
          seeker_phone,
          expert_id,
          expert_name,
          expert_email,
          visa_category,
          booking_date,
          status,
          details
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', $9)
        RETURNING id`,
        [
          seekerName || 'Consultation Client',
          seekerEmail.trim().toLowerCase(),
          seekerPhone || '',
          expertId,
          expertName || 'Advisor',
          expertEmail || '',
          visaCategory,
          bookingDate,
          `Consultation fee: ${amount} ${currency}`
        ]
      );
      actualBookingId = bookRes.rows[0].id;
    }

    // 2. Generate unique server-side Order ID
    const orderId = `order_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const numAmount = parseFloat(amount) || 49.00;

    // 3. Register payment order record in database
    await pool.query(
      `INSERT INTO payment_orders (
        order_id,
        booking_id,
        amount,
        currency,
        provider,
        status
      ) VALUES ($1, $2, $3, $4, 'razorpay', 'created')`,
      [orderId, actualBookingId, numAmount, currency]
    );

    const razorpayKeyId = import.meta?.env?.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_test_travltik_live';

    return new Response(
      JSON.stringify({
        success: true,
        orderId,
        bookingId: actualBookingId,
        amount: numAmount,
        currency,
        keyId: razorpayKeyId,
        expertName,
        seekerName,
        seekerEmail,
        seekerPhone
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/bookings/create-order POST] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to initialize payment order.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
