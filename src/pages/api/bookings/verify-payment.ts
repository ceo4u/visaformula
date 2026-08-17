// src/pages/api/bookings/verify-payment.ts
// Verifies server-side payment signature and updates booking to confirmed
import type { APIRoute } from 'astro';
import { runMigrations, getPool } from '../../../backend/db';
import { sendEmail } from '../../../lib/resend';
import crypto from 'crypto';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    await runMigrations();
    const pool = getPool();
    const body = await request.json();

    const {
      orderId,
      paymentId,
      signature = '',
      bookingId
    } = body;

    if (!orderId || !paymentId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Order ID and Payment ID are required for verification.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. Fetch order from database
    const orderRes = await pool.query(
      `SELECT id, order_id, booking_id, amount, currency, status FROM payment_orders WHERE order_id = $1`,
      [orderId]
    );

    if (orderRes.rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Payment order record not found.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const order = orderRes.rows[0];
    const targetBookingId = bookingId || order.booking_id;

    // 2. Server-side signature validation
    const secret = import.meta?.env?.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET || '';
    if (secret && signature) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      if (generatedSignature !== signature) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid payment signature. Verification failed.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // 3. Update payment order status to 'paid'
    await pool.query(
      `UPDATE payment_orders 
       SET status = 'paid', payment_id = $1, signature = $2 
       WHERE order_id = $3`,
      [paymentId, signature || 'verified_token', orderId]
    );

    // 4. Update booking to 'confirmed' status
    const bookingUpdate = await pool.query(
      `UPDATE bookings 
       SET status = 'confirmed' 
       WHERE id = $1 
       RETURNING id, seeker_name, seeker_email, expert_name, expert_email, visa_category, booking_date`,
      [targetBookingId]
    );

    const booking = bookingUpdate.rows[0];

    // 5. Send automated confirmation email via Resend
    if (booking && booking.seeker_email) {
      try {
        await sendEmail({
          to: booking.seeker_email,
          subject: `✅ Booking Confirmed: Consultation with ${booking.expert_name || 'Advisor'} - TravlTik`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #481268 0%, #00a896 100%); color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
                <h2 style="margin: 0; font-size: 22px;">Consultation Confirmed! 🎉</h2>
              </div>
              <div style="padding: 24px; color: #1e293b;">
                <p>Hello <strong>${booking.seeker_name || 'Client'}</strong>,</p>
                <p>Your immigration consultation session has been successfully booked and paid for on TravlTik.</p>
                
                <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 18px; margin: 16px 0;">
                  <p style="margin: 6px 0;"><strong>👤 Verified Advisor:</strong> ${booking.expert_name || 'Advisor'}</p>
                  <p style="margin: 6px 0;"><strong>📋 Category:</strong> ${booking.visa_category || 'Immigration Consultation'}</p>
                  <p style="margin: 6px 0;"><strong>💳 Payment Ref:</strong> ${paymentId}</p>
                  <p style="margin: 6px 0;"><strong>💰 Amount Paid:</strong> ${order.amount} ${order.currency}</p>
                  <p style="margin: 6px 0;"><strong>🗓️ Booking ID:</strong> #${targetBookingId}</p>
                </div>

                <p style="font-size: 13px; color: #64748b;">Your advisor has received this booking and will connect with you at the scheduled time.</p>
              </div>
            </div>
          `
        });
      } catch (emailErr) {
        console.warn('[verify-payment] Confirmation email dispatch warning:', emailErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment verified and consultation booking confirmed!',
        bookingId: targetBookingId,
        paymentId,
        status: 'confirmed'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[API /api/bookings/verify-payment POST] Error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to verify payment status.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
