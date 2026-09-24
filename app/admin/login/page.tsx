"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
      return;
    }
    const data = await res.json().catch(() => ({}));
    setError(data.error || "Login failed.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-deep px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-md border border-navy-line bg-navy-card p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          BarromaLaw
        </p>
        <h1 className="mt-2 font-display text-3xl uppercase text-white">
          Admin
        </h1>

        <div className="mt-8">
          <label
            htmlFor="password"
            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-steel"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-navy-line bg-navy-deep px-4 py-3 text-white focus:border-gold"
          />
        </div>

        {error && (
          <p className="mt-4 text-sm font-semibold text-gold">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-gold px-6 py-3 text-sm font-bold text-navy-deep transition-transform hover:scale-[1.01] hover:bg-gold disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
