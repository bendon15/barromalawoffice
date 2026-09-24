// Shared between the consultation form (client-side UX) and /api/contact
// (server-side, the actual security boundary — the client checks are only
// a courtesy, never trust them alone).

export const CONTACT_LIMITS = {
  name: 100,
  email: 254, // RFC 5321 max
  phone: 25,
  message: 3000,
};

export const PRACTICE_AREA_OPTIONS = [
  "Legal consultation",
  "Drafting or notarization of documents",
  "Labor case",
  "Civil case",
  "Criminal case",
  "Administrative case",
  "Retainership or external counsel",
  "Other legal service",
];

export const CONSULT_MODE_OPTIONS = ["Onsite at the office", "Online (virtual)"];

export const TIME_OPTIONS = [
  "Morning (from 8:30 AM)",
  "Afternoon (until 5:30 PM)",
  "Weekend or holiday (by appointment)",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d][\d\s\-().+]{5,}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export type ConsultationValues = {
  name: string;
  email: string;
  phone: string;
  practiceArea: string;
  consultMode: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// For single-line fields (name, email, phone): line breaks are never valid and
// are collapsed so they can never end up in an email subject or header.
function line(v: unknown): string {
  return str(v).replace(/[\r\n\u2028\u2029]+/g, " ");
}

export function validateConsultationRequest(input: Record<string, unknown>): {
  valid: boolean;
  errors: string[];
  values: ConsultationValues;
} {
  const errors: string[] = [];

  const values: ConsultationValues = {
    name: line(input.name),
    email: line(input.email),
    phone: line(input.phone),
    practiceArea: str(input.practiceArea),
    consultMode: str(input.consultMode),
    preferredDate: str(input.preferredDate),
    preferredTime: str(input.preferredTime),
    message: str(input.message),
  };

  if (!values.name) errors.push("Name is required.");
  else if (values.name.length > CONTACT_LIMITS.name)
    errors.push(`Name must be under ${CONTACT_LIMITS.name} characters.`);

  if (!values.email) errors.push("Email is required.");
  else if (values.email.length > CONTACT_LIMITS.email)
    errors.push(`Email must be under ${CONTACT_LIMITS.email} characters.`);
  else if (!EMAIL_REGEX.test(values.email))
    errors.push("Enter a valid email address.");

  if (!values.phone) errors.push("Mobile number is required.");
  else if (
    values.phone.length > CONTACT_LIMITS.phone ||
    !PHONE_REGEX.test(values.phone)
  )
    errors.push("Enter a valid mobile number.");

  if (!PRACTICE_AREA_OPTIONS.includes(values.practiceArea))
    errors.push("Choose what you need help with.");

  if (!CONSULT_MODE_OPTIONS.includes(values.consultMode))
    errors.push("Choose onsite or online consultation.");

  if (values.preferredDate) {
    const parsed = new Date(`${values.preferredDate}T00:00:00`);
    if (!DATE_REGEX.test(values.preferredDate) || Number.isNaN(parsed.getTime()))
      errors.push("Enter a valid preferred date.");
  }

  if (values.preferredTime && !TIME_OPTIONS.includes(values.preferredTime))
    errors.push("Choose one of the listed preferred times.");

  if (!values.message) errors.push("Describe your matter briefly.");
  else if (values.message.length > CONTACT_LIMITS.message)
    errors.push(`Message must be under ${CONTACT_LIMITS.message} characters.`);

  const consent = input.consent;
  if (!(consent === "on" || consent === true || consent === "true"))
    errors.push("Please agree to the use of your details to continue.");

  return { valid: errors.length === 0, errors, values };
}
