// Minimal signed-cookie session for the single admin account.
// Uses Web Crypto (crypto.subtle) so it works in both the Edge middleware
// runtime and normal Node route handlers without extra dependencies.

export const SESSION_COOKIE_NAME = "admin_session";

const encoder = new TextEncoder();

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(
  secret: string,
  ttlSeconds = 60 * 60 * 24 * 7, // 7 days
): Promise<string> {
  const expires = Date.now() + ttlSeconds * 1000;
  const payload = `admin.${expires}`;
  const key = await getKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  return `${payload}.${toHex(signature)}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, expiresStr, signatureHex] = parts;
  if (role !== "admin") return false;

  const expires = Number(expiresStr);
  if (!expires || Date.now() > expires) return false;

  const key = await getKey(secret);
  const expectedSignature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${role}.${expiresStr}`),
  );
  return timingSafeEqual(toHex(expectedSignature), signatureHex);
}
