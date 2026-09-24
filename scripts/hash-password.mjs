// Hashes an admin password for use as ADMIN_PASSWORD_HASH.
// Usage: node scripts/hash-password.mjs "your-password-here"
//
// The output is base64-encoded on purpose: Next.js expands "$..." patterns
// in .env files (the same way a shell does), which silently corrupts a raw
// bcrypt hash like "$2a$10$...". Base64 avoids that entirely.

import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your-password-here"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
const encoded = Buffer.from(hash, "utf8").toString("base64");

console.log("\nADMIN_PASSWORD_HASH:");
console.log(encoded);
console.log(
  "\nPaste this into .env.local (for local dev) and into your Vercel project's",
  "\nEnvironment Variables (for production). Never commit the plain password.",
);
