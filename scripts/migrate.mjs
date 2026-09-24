// Creates (or upgrades) the consultation request and rate-limit tables.
// Usage: npm run db:migrate
// Reads DATABASE_URL (or POSTGRES_URL) from .env.local if present.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

function loadEnvLocal() {
  const path = fileURLToPath(new URL("../.env.local", import.meta.url));
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error(
    "Set DATABASE_URL (or POSTGRES_URL) in .env.local before running this script.\n" +
      "Copy .env.example to .env.local and paste in your database connection string.",
  );
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const schemaPath = fileURLToPath(new URL("../lib/schema.sql", import.meta.url));
const schema = readFileSync(schemaPath, "utf8");

try {
  await pool.query(schema);
  console.log("✓ Database schema is up to date.");
} catch (err) {
  console.error("Migration failed:", err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
