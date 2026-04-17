import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const { orderId, paymentId, signature, bookingId } = await request.json();

        if (!orderId || !paymentId || !signature || !bookingId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Verify Razorpay signature
        const secret = process.env.RAZORPAY_KEY_SECRET || "";
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(`${orderId}|${paymentId}`)
            .digest("hex");

        const isValid = expectedSignature === signature;

        if (!isValid) {
            return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
        }

        // In production: Update booking in Firestore
        // await db.collection('bookings').doc(bookingId).update({ status: 'confirmed', escrowStatus: 'held', razorpayOrderId: orderId, razorpayPaymentId: paymentId });

        return NextResponse.json({
            success: true,
            bookingId,
            status: "confirmed",
            escrowStatus: "held",
            message: "Payment verified. Funds held in escrow.",
        });
    } catch (error) {
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}
