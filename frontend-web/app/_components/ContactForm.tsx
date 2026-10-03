"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields | "form", string>>;

const EMPTY: Fields = { name: "", email: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email address.";
  if (f.message.trim().length < 20) e.message = "A little more detail helps (20 characters minimum).";
  return e;
}

export function ContactForm() {
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof Fields) => (ev: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    setErrors((e) => ({ ...e, [k]: undefined, form: undefined }));
  };

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) return setErrors(errs);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ form: `Couldn't send that. Email me directly at ${site.email}.` });
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
          maxLength={2000}
          placeholder="The role, team, or question"
          className={`resize-y px-3.5 py-3 leading-normal ${input(errors.message)}`}
        />
        <div className="flex justify-between gap-3">
          <span className="text-[13px] text-error">{errors.message}</span>
          <span className="font-mono text-xs text-ink-3">{form.message.length} / 2000</span>
        </div>
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
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
