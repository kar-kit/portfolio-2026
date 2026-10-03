// Shared by the contact form (client) and /api/contact (server) so both
// enforce the same rules.

export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const LIMITS = { name: 100, email: 254, message: 2000, messageMin: 20 } as const;

export function validateContact(f: ContactFields): ContactErrors {
  const e: ContactErrors = {};
  const name = f.name.trim();
  if (!name) e.name = "Please add your name.";
  else if (name.length > LIMITS.name) e.name = `Keep it under ${LIMITS.name} characters.`;
  if (f.email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Enter a valid email address.";
  const message = f.message.trim();
  if (message.length < LIMITS.messageMin)
    e.message = `A little more detail helps (${LIMITS.messageMin} characters minimum).`;
  else if (message.length > LIMITS.message) e.message = `Keep it under ${LIMITS.message} characters.`;
  return e;
}
