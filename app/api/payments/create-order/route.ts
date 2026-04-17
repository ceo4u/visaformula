import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { amount, bookingId, type } = await request.json();

        if (!amount || !bookingId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // In production, this would create a real Razorpay order
        // const Razorpay = require('razorpay');
        // const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
        // const order = await instance.orders.create({ amount: amount * 100, currency: 'INR', receipt: bookingId });

        const mockOrder = {
            orderId: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
            amount: amount * 100,
            currency: "INR",
            bookingId,
            type: type || "consultation",
        };

        return NextResponse.json(mockOrder, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
