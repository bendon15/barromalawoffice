import { getPool } from "./db";
import type { ContactMessage, ContactMessageInput } from "./types";

// ─── Consultation requests (stored in the contact_messages table) ───────────

const COLUMNS = `id, name, email, phone, practice_area, consult_mode, preferred_date, preferred_time, message, read, created_at`;

export async function getMessages(): Promise<ContactMessage[]> {
  const pool = getPool();
  if (!pool) return [];
  const { rows } = await pool.query(
    `SELECT ${COLUMNS} FROM contact_messages ORDER BY created_at DESC`,
  );
  return rows.map(mapMessageRow);
}

export async function createMessage(
  input: ContactMessageInput,
): Promise<ContactMessage> {
  const pool = getPool();
  if (!pool) throw new Error("Database is not configured.");
  const { rows } = await pool.query(
    `INSERT INTO contact_messages (name, email, phone, practice_area, consult_mode, preferred_date, preferred_time, message)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ${COLUMNS}`,
    [
      input.name,
      input.email,
      input.phone,
      input.practiceArea,
      input.consultMode,
      input.preferredDate || null,
      input.preferredTime || null,
      input.message,
    ],
  );
  return mapMessageRow(rows[0]);
}

export async function setMessageRead(
  id: number,
  read: boolean,
): Promise<ContactMessage> {
  const pool = getPool();
  if (!pool) throw new Error("Database is not configured.");
  const { rows } = await pool.query(
    `UPDATE contact_messages SET read=$1 WHERE id=$2 RETURNING ${COLUMNS}`,
    [read, id],
  );
  if (!rows[0]) throw new Error("Request not found.");
  return mapMessageRow(rows[0]);
}

export async function deleteMessage(id: number): Promise<void> {
  const pool = getPool();
  if (!pool) throw new Error("Database is not configured.");
  await pool.query(`DELETE FROM contact_messages WHERE id=$1`, [id]);
}

function toDateString(v: unknown): string | undefined {
  if (!v) return undefined;
  if (v instanceof Date) {
    const p = (n: number) => String(n).padStart(2, "0");
    return `${v.getFullYear()}-${p(v.getMonth() + 1)}-${p(v.getDate())}`;
  }
  return String(v).slice(0, 10);
}

function mapMessageRow(r: Record<string, unknown>): ContactMessage {
  return {
    id: r.id as number,
    name: r.name as string,
    email: r.email as string,
    phone: (r.phone as string) ?? "",
    practiceArea: (r.practice_area as string) ?? "",
    consultMode: (r.consult_mode as string) ?? "",
    preferredDate: toDateString(r.preferred_date),
    preferredTime: (r.preferred_time as string) ?? undefined,
    message: r.message as string,
    read: r.read as boolean,
    createdAt: (r.created_at as Date).toISOString(),
  };
}
