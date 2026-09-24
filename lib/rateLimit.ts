import { NextRequest } from "next/server";
import { getPool } from "./db";

// Simple sliding-window rate limiter backed by the same Postgres database —
// no separate Redis/KV service to set up. Fine for this site's traffic;
// if it ever needs to scale further, swap this for Vercel KV or similar
// without changing any call sites.
export async function checkRateLimit(
  key: string,
  { limit, windowSeconds }: { limit: number; windowSeconds: number },
): Promise<{ allowed: boolean }> {
  const pool = getPool();
  if (!pool) return { allowed: true }; // no DB configured — don't block locally

  const windowStart = new Date(Date.now() - windowSeconds * 1000);

  // Opportunistic cleanup of this key's old rows (cheap: indexed).
  await pool.query(
    `DELETE FROM rate_limit_events WHERE key = $1 AND created_at < $2`,
    [key, windowStart],
  );

  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS count FROM rate_limit_events WHERE key = $1 AND created_at >= $2`,
    [key, windowStart],
  );
  const count = rows[0]?.count ?? 0;

  if (count >= limit) {
    return { allowed: false };
  }

  await pool.query(`INSERT INTO rate_limit_events (key) VALUES ($1)`, [key]);
  return { allowed: true };
}

// Best-effort client IP extraction from the headers Vercel's proxy sets.
// Falls back to "unknown" for local dev without a proxy in front.
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
