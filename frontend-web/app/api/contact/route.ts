// Placeholder until a mail provider and spam filtering are chosen (open item on the
// Portfolio Website 2026 Notion page). Returning an error makes the form fall back to
// showing the email address, rather than pretending a message was delivered.
export async function POST() {
  return Response.json({ error: "Contact form not connected yet." }, { status: 501 });
}
