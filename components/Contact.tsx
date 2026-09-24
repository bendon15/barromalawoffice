"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { contactEmail, firm } from "@/lib/data";
import {
  CONSULT_MODE_OPTIONS,
  CONTACT_LIMITS,
  PRACTICE_AREA_OPTIONS,
  TIME_OPTIONS,
  validateConsultationRequest,
} from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-md border border-navy/20 bg-paper-white px-4 py-3 text-navy placeholder:text-navy/40 focus:border-gold-deep";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setMinDate(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Client-side check is a courtesy; /api/contact repeats it server-side.
    const { valid, errors } = validateConsultationRequest(data);
    if (!valid) {
      setStatus("error");
      setErrorMsg(errors.join(" "));
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setMessageLength(0);
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong.");
    }
  }

  return (
    <section id="book" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div>
          <h2 className="font-display text-4xl font-bold text-navy sm:text-5xl">
            Book a consultation
          </h2>
          <p className="mt-4 max-w-xl text-lg text-navy/70">
            Open for onsite and online legal consultations. Tell us about your
            matter and when you are free, and the office will confirm your
            appointment by phone or email.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Honeypot: hidden from people and screen readers, bots fill it in. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="contact_website">Leave this field empty</label>
              <input id="contact_website" name="contact_website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" name="name" type="text" required maxLength={CONTACT_LIMITS.name} />
              <Field label="Mobile number" name="phone" type="tel" required maxLength={CONTACT_LIMITS.phone} />
            </div>
            <Field label="Email" name="email" type="email" required maxLength={CONTACT_LIMITS.email} />

            <div>
              <Label htmlFor="practiceArea">What do you need help with?</Label>
              <select id="practiceArea" name="practiceArea" required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select a service or case type
                </option>
                {PRACTICE_AREA_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="consultMode">How would you like to meet?</Label>
              <select id="consultMode" name="consultMode" required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Onsite or online
                </option>
                {CONSULT_MODE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="preferredDate">Preferred date</Label>
                <input id="preferredDate" name="preferredDate" type="date" min={minDate} className={inputClass} />
              </div>
              <div>
                <Label htmlFor="preferredTime">Preferred time</Label>
                <select id="preferredTime" name="preferredTime" defaultValue="" className={inputClass}>
                  <option value="">No preference</option>
                  {TIME_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <Label htmlFor="message" className="mb-0">
                  Briefly describe your matter
                </Label>
                <span className="text-xs text-navy/50">
                  {messageLength}/{CONTACT_LIMITS.message}
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                maxLength={CONTACT_LIMITS.message}
                onChange={(e) => setMessageLength(e.target.value.length)}
                className={inputClass}
                placeholder="Share only what you are comfortable putting in writing."
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-navy/75">
              <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#b98a2c]" />
              <span>
                I agree that {firm.name} may use these details to respond to my
                request.
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-md bg-navy px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy-card disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Request consultation"}
            </button>

            <div aria-live="polite">
              {status === "sent" && (
                <p className="text-sm font-semibold text-navy">
                  Request received. The office will contact you to confirm your
                  appointment.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-semibold text-red-700">
                  {errorMsg || `Email ${contactEmail} directly instead.`}
                </p>
              )}
            </div>
          </form>
        </div>

        <aside>
          <Image
            src={firm.scheduleImage}
            alt={`${firm.name} office schedule: ${firm.weekdayHours}. ${firm.weekendHours}. ${firm.address}.`}
            width={1024}
            height={1536}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full rounded-2xl border border-navy/10 shadow-xl shadow-navy/10"
          />
        </aside>
      </div>
    </section>
  );
}

function Label({
  htmlFor,
  children,
  className = "mb-2",
}: {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-semibold text-navy ${className}`}>
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type,
  required,
  maxLength,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <input id={name} name={name} type={type} required={required} maxLength={maxLength} className={inputClass} />
    </div>
  );
}
