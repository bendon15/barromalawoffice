"use client";

import { useState } from "react";
import type { ContactMessage } from "@/lib/types";

export default function MessagesPanel({
  initialMessages,
}: {
  initialMessages: ContactMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);

  async function toggleRead(msg: ContactMessage) {
    setBusyId(msg.id);
    setError("");
    const res = await fetch(`/api/admin/messages/${msg.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !msg.read }),
    });
    const data = await res.json();
    setBusyId(null);
    if (!res.ok) return setError(data.error || "Could not update request.");
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? data : m)));
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this request? This can't be undone.")) return;
    setBusyId(id);
    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setBusyId(null);
    if (res.ok) setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  if (messages.length === 0) {
    return (
      <p className="text-sm text-steel">
        No requests yet — submissions from the consultation form will show up
        here.
      </p>
    );
  }

  return (
    <div>
      {error && (
        <p className="mb-4 text-sm font-semibold text-gold">
          {error}
        </p>
      )}

      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-md border p-5 ${
              m.read
                ? "border-navy-line bg-navy-card"
                : "border-gold/50 bg-navy-card"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  {!m.read && (
                    <span className="h-2 w-2 rounded-full bg-gold" />
                  )}
                  <p className="font-bold text-white">{m.name}</p>
                </div>
                <a
                  href={`mailto:${m.email}`}
                  className="text-xs text-steel hover:text-gold"
                >
                  {m.email}
                </a>
                <p className="mt-1 text-sm font-semibold text-mist">
                  {m.practiceArea} · {m.consultMode || "mode not set"}
                </p>
                <p className="text-sm text-mist">
                  <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                    {m.phone}
                  </a>
                </p>
                <p className="mt-1 text-sm text-mist">
                  Preferred: {m.preferredDate || "any date"}, {m.preferredTime || "any time"}
                </p>
              </div>
              <p className="text-xs text-steel">
                {new Date(m.createdAt).toLocaleString()}
              </p>
            </div>

            <p className="mt-3 whitespace-pre-wrap text-sm text-mist">
              {m.message}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => toggleRead(m)}
                disabled={busyId === m.id}
                className="rounded-md border border-navy-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-mist hover:border-gold hover:text-gold disabled:opacity-60"
              >
                {m.read ? "Mark unread" : "Mark read"}
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                disabled={busyId === m.id}
                className="rounded-md border border-navy-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-mist hover:border-gold hover:text-gold disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
