"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  | { kind: "done"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) return setStatus({ kind: "error", message: "Please enter your email address." });
    if (!EMAIL_PATTERN.test(value)) return setStatus({ kind: "error", message: "Please enter a valid email address." });

    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await response.json()) as { ok: boolean; message: string };
      if (!response.ok || !data.ok) return setStatus({ kind: "error", message: data.message });
      setEmail("");
      setStatus({ kind: "done", message: data.message });
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again in a moment." });
    }
  }

  const describedBy = status.kind === "error" || status.kind === "done" ? "newsletter-status" : undefined;

  return (
    <form className="relative mt-10 flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (status.kind === "error") setStatus({ kind: "idle" });
        }}
        aria-invalid={status.kind === "error"}
        aria-describedby={describedBy}
        className={`h-10 w-full border-b bg-transparent px-3 text-[12px] text-surface outline-none placeholder:text-cream focus-visible:border-cream ${
          status.kind === "error" ? "border-[#d98c7a]" : "border-cream-muted"
        }`}
      />
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="type-label h-10 w-full rounded-lg bg-accent text-cream transition-opacity duration-300 hover:opacity-85 disabled:opacity-60"
      >
        {status.kind === "sending" ? "Joining…" : "Join"}
      </button>
      <p id="newsletter-status" role="status" aria-live="polite" className="type-small absolute inset-x-0 top-full mt-2 text-cream-muted">
        {status.kind === "error" || status.kind === "done" ? status.message : ""}
      </p>
    </form>
  );
}
