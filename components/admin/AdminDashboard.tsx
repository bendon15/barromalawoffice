"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactMessage } from "@/lib/types";
import MessagesPanel from "./MessagesPanel";

export default function AdminDashboard({
  initialMessages,
}: {
  initialMessages: ContactMessage[];
}) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const unread = initialMessages.filter((m) => !m.read).length;

  return (
    <main className="min-h-screen bg-navy-deep px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] text-gold">BARROMALAW</p>
            <h1 className="font-display text-4xl font-bold text-white">
              Consultation requests
            </h1>
            <p className="mt-1 text-sm text-mist">
              {initialMessages.length} total, {unread} unread
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-md border border-navy-line px-5 py-2.5 text-sm font-semibold text-mist transition-colors hover:border-gold hover:text-gold"
          >
            {loggingOut ? "Signing out..." : "Log out"}
          </button>
        </div>

        <div className="mt-8 pb-16">
          <MessagesPanel initialMessages={initialMessages} />
        </div>
      </div>
    </main>
  );
}
