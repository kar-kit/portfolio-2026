import { validateContact, type ContactFields } from "@/lib/contact";

// POST /api/contact — verifies the Turnstile token, then sends the message to
// Joey via Resend with reply-to set to the visitor, so replying goes straight back.

function fail(status: number, error: string) {
  return Response.json({ error }, { status });
}

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY ?? "", response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const { RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !TURNSTILE_SECRET_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    return fail(503, "Contact form isn't configured.");
  }

  let body: Partial<ContactFields & { token: string }>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request.");
  }
  const fields: ContactFields = {
    name: String(body.name ?? ""),
    email: String(body.email ?? "").trim(),
    message: String(body.message ?? ""),
  };
  if (Object.keys(validateContact(fields)).length) return fail(400, "Please check the form and try again.");

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (!body.token || !(await verifyTurnstile(String(body.token), ip))) {
    return fail(403, "Verification failed. Please try again.");
  }

  // Strip line breaks so a crafted name can't spill into other headers.
  const name = fields.name.trim().replace(/[\r\n]+/g, " ");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: fields.email,
      subject: `Portfolio message from ${name}`,
      text: `${fields.message.trim()}\n\n—\n${name} <${fields.email}>\nSent from the contact form on joeykarkitpang.co.uk`,
    }),
  });
  if (!res.ok) return fail(502, "Couldn't send right now.");

  return Response.json({ ok: true });
}
