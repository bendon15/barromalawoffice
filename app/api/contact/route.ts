import { NextRequest, NextResponse } from "next/server";
import { createMessage } from "@/lib/queries";
import { sendContactNotification } from "@/lib/email";
import { validateConsultationRequest } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed } = await checkRateLimit(`contact:${ip}`, {
      limit: 5,
      windowSeconds: 10 * 60, // 5 submissions per 10 minutes per IP
    });
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests sent — please try again in a few minutes." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => ({}));

    // Honeypot: real visitors never see or fill this hidden field, bots do.
    // Pretend it worked so the bot gets no signal, but save and send nothing.
    if (typeof body.contact_website === "string" && body.contact_website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }
    const { valid, errors, values } = validateConsultationRequest(body as Record<string, unknown>);

    if (!valid) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }

    const saved = await createMessage(values);
    const emailResult = await sendContactNotification(values);

    return NextResponse.json({ ok: true, id: saved.id, emailed: emailResult.sent });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
