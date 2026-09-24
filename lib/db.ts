import { Pool } from "pg";

// Reuse a single pool across hot invocations (Next.js dev/serverless).
// Returns null if no database is configured yet, so the site can still
// render (with empty content) before /admin has been set up.
let pool: Pool | null | undefined;

export function getPool(): Pool | null {
  if (pool !== undefined) return pool;

  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

  if (!connectionString) {
    console.warn(
      "[db] No DATABASE_URL/POSTGRES_URL set — content sections will render empty until a database is connected.",
    );
    pool = null;
    return pool;
  }

  pool = new Pool({
    connectionString,
    ssl: connectionString.includes("sslmode=disable")
      ? undefined
      : { rejectUnauthorized: false },
    max: 3,
  });

  return pool;
}
