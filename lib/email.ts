import { Resend } from "resend";
import type { ConsultationValues } from "./validation";

// Sends an email notification when someone submits the consultation form.
// Gracefully no-ops if Resend isn't configured yet — the request is still
// saved to the database and visible in /admin either way.
export async function sendContactNotification(
  input: ConsultationValues,
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  if (!apiKey || !to) {
    return { sent: false, reason: "not configured" };
  }

  const from =
    process.env.CONTACT_FROM_EMAIL || "BarromaLaw <onboarding@resend.dev>";

  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Mobile: ${input.phone}`,
    `Needs help with: ${input.practiceArea}`,
    `Consultation: ${input.consultMode}`,
    `Preferred date: ${input.preferredDate || "No preference"}`,
    `Preferred time: ${input.preferredTime || "No preference"}`,
    "",
    input.message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject: `[BarromaLaw] Consultation request from ${input.name.replace(/[\r\n]+/g, " ")}`,
      text,
    });
    return { sent: true };
  } catch (err) {
    console.error("[email] Failed to send consultation notification:", err);
    return { sent: false, reason: (err as Error).message };
  }
}
