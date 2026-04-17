import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { bookingId, reason } = await request.json();

        if (!bookingId || !reason) {
            return NextResponse.json({ error: "Missing bookingId or reason" }, { status: 400 });
        }

        // In production: Freeze escrow and create dispute in Firestore
        // await db.collection('escrow').doc(bookingId).update({ status: 'disputed', disputeReason: reason });
        // await db.collection('bookings').doc(bookingId).update({ status: 'disputed', escrowStatus: 'disputed' });
        // Send admin notification email

        return NextResponse.json({
            success: true,
            bookingId,
            escrowStatus: "disputed",
            message: "Dispute raised. Escrow frozen. Our team will review within 48 hours.",
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to raise dispute" }, { status: 500 });
    }
}
