import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { subject, query, email, name } = body;

    if (!subject || !query) {
      return new Response(
        JSON.stringify({ error: 'Subject and query description are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ticketId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticketRecord = {
      id: ticketId,
      subject: subject.trim(),
      query: query.trim(),
      email: email || "consultant@travltik.com",
      name: name || "Registered Expert",
      status: "Open",
      createdAt: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    return new Response(
      JSON.stringify({
        success: true,
        message: `Support ticket ${ticketId} created successfully! Our team will respond shortly.`,
        ticket: ticketRecord
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to process support ticket', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
