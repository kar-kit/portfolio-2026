"use client";

import { useState, type FormEvent } from "react";
import { LIMITS, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";
import { site } from "@/lib/site";
import { Turnstile } from "./Turnstile";

type Fields = ContactFields;
type Errors = ContactErrors & { form?: string };

const EMPTY: Fields = { name: "", email: "", message: "" };
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [token, setToken] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);

  const set = (k: keyof Fields) => (ev: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    setErrors((e) => ({ ...e, [k]: undefined, form: undefined }));
  };

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    const errs = validateContact(form);
    if (Object.keys(errs).length) return setErrors(errs);
    if (!token) return setErrors({ form: "Please complete the verification check." });
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ form: `Couldn't send that. Try again, or email me directly at ${site.email}.` });
      setResetSignal((n) => n + 1); // Turnstile tokens are single-use
    }
  }

  const input = (bad?: string) =>
    `rounded-control border bg-surface text-[15px] text-ink ${bad ? "border-error" : "border-line"}`;

  if (status === "sent") {
    return (
      <div className="rounded-card border border-line bg-surface p-7">
        <div className="flex items-center gap-2.5 font-mono text-[13px]">
          <span className="size-2 rounded-full bg-accent" />
          Message sent
        </div>
        <p className="mt-3">
          Thanks, {form.name.trim().split(" ")[0]}. I&apos;ll reply to {form.email} within two working days.
        </p>
        <button
          onClick={() => {
            setForm(EMPTY);
            setToken(null);
            setStatus("idle");
          }}
          className="mt-5 h-10 cursor-pointer rounded-control border border-line px-4 text-sm hover:bg-raised"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-[18px]">
      <div className="flex flex-wrap gap-[18px]">
        <label className="flex flex-[1_1_220px] flex-col gap-1.5">
          <span className="font-mono text-xs text-ink-2">Name</span>
          <input
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            autoComplete="name"
            className={`h-12 px-3.5 ${input(errors.name)}`}
          />
          {errors.name && <span className="text-[13px] text-error">{errors.name}</span>}
        </label>
        <label className="flex flex-[1_1_220px] flex-col gap-1.5">
          <span className="font-mono text-xs text-ink-2">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@company.com"
            autoComplete="email"
            className={`h-12 px-3.5 ${input(errors.email)}`}
          />
          {errors.email && <span className="text-[13px] text-error">{errors.email}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-xs text-ink-2">Message</span>
        <textarea
          value={form.message}
          onChange={set("message")}
          rows={7}
          maxLength={LIMITS.message}
          placeholder="The role, team, or question"
          className={`resize-y px-3.5 py-3 leading-normal ${input(errors.message)}`}
        />
        <div className="flex justify-between gap-3">
          <span className="text-[13px] text-error">{errors.message}</span>
          <span className="font-mono text-xs text-ink-3">{form.message.length} / {LIMITS.message}</span>
        </div>
      </label>
      {SITE_KEY && <Turnstile siteKey={SITE_KEY} onToken={setToken} resetSignal={resetSignal} />}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending" || !token}
          className="h-12 cursor-pointer rounded-control bg-accent px-6 text-[15px] font-medium text-ink hover:bg-accent-strong disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <span className="text-[13px] text-ink-3">No mailing list. Your details are only used to reply.</span>
      </div>
      {errors.form && <p className="text-[13px] text-error">{errors.form}</p>}
    </form>
  );
}
