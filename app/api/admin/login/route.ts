import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed } = await checkRateLimit(`login:${ip}`, {
    limit: 8,
    windowSeconds: 15 * 60, // 8 attempts per 15 minutes per IP
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many login attempts — please try again in a few minutes." },
      { status: 429 },
    );
  }

  const encodedHash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!encodedHash || !secret) {
    return NextResponse.json(
      {
        error:
          "Admin login isn't configured yet — set ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET.",
      },
      { status: 500 },
    );
  }

  // ADMIN_PASSWORD_HASH is stored base64-encoded (see scripts/hash-password.mjs)
  // because Next.js expands "$..." patterns in .env files, which would
  // otherwise corrupt a raw bcrypt hash.
  const hash = Buffer.from(encodedHash, "base64").toString("utf8");

  const body = await req.json().catch(() => null);
  const password = body?.password;

  if (typeof password !== "string" || !(await bcrypt.compare(password, hash))) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSessionToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
