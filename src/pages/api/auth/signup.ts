import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    // 1. Validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password details are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. User Payload Creation & Database Response
    const newUser = {
      id: "user_" + Date.now(),
      email: email.trim().toLowerCase(),
      role: role || 'seeker',
      type: role || 'seeker',
      createdAt: new Date().toISOString()
    };

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User registered successfully!',
        user: newUser,
        redirectUrl: role === 'expert' ? '/signup/expert' : '/onboarding'
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Server Error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
