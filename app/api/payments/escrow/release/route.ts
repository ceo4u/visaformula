import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { bookingId } = await request.json();

        if (!bookingId) {
            return NextResponse.json({ error: "Missing bookingId" }, { status: 400 });
        }

        // In production: Update escrow in Firestore
        // await db.collection('escrow').doc(bookingId).update({ status: 'released', resolvedAt: new Date() });
        // await db.collection('bookings').doc(bookingId).update({ status: 'completed', escrowStatus: 'released' });

        return NextResponse.json({
            success: true,
            bookingId,
            escrowStatus: "released",
            message: "Escrow released. Expert has been paid.",
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to release escrow" }, { status: 500 });
    }
}
