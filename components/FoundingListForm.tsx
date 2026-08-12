"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Mail } from "lucide-react";
import {
  captureFoundingListEvent,
  getFoundingListAttribution,
} from "@/lib/founding-list";
import type { FoundingListSource } from "@/lib/founding-list";

type FoundingListFormProps = {
  source: FoundingListSource;
  tone?: "dark" | "light";
};

type FormStatus = "idle" | "loading" | "success" | "error";

export default function FoundingListForm({
  source,
  tone = "light",
}: FoundingListFormProps) {
  const id = useId();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const hasStarted = useRef(false);

  const isDark = tone === "dark";
  const labelClass = `text-sm font-medium ${isDark ? "text-white/85" : "text-gray-800"}`;
  const inputClass = isDark
    ? "border-white/20 bg-white/10 text-white placeholder:text-white/45 focus:border-white focus:ring-white/30"
    : "border-gray-300 bg-white text-gray-950 placeholder:text-gray-400 focus:border-teal-700 focus:ring-teal-100";

  const trackStart = () => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;
    captureFoundingListEvent(
      "founding_list_form_started",
      getFoundingListAttribution(source)
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const attribution = getFoundingListAttribution(source);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: firstName,
          email,
          ...attribution,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to join the Founding List");
      }

      captureFoundingListEvent("founding_list_joined", attribution);
      captureFoundingListEvent("headphones_waitlist_signup", attribution);
      setStatus("success");
      setMessage(data.message || "You're on the Just Summit Founding List.");
      setFirstName("");
      setEmail("");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to join the Founding List";

      captureFoundingListEvent("founding_list_failed", {
        ...attribution,
        error_message: errorMessage,
      });
      setStatus("error");
      setMessage(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={trackStart}
      className="space-y-4"
      data-testid={`founding-list-form-${source}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClass} htmlFor={`${id}-first-name`}>
            First name <span className={isDark ? "text-white/50" : "text-gray-500"}>(optional)</span>
          </label>
          <input
            id={`${id}-first-name`}
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            autoComplete="given-name"
            className={`min-h-12 w-full rounded-md border px-4 outline-none transition focus:ring-4 ${inputClass}`}
            disabled={status === "loading"}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass} htmlFor={`${id}-email`}>
            Email address
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className={`min-h-12 w-full rounded-md border px-4 outline-none transition focus:ring-4 ${inputClass}`}
            required
            disabled={status === "loading"}
          />
        </div>
      </div>
      <button
        type="submit"
        className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${
          isDark
            ? "bg-white text-gray-950 hover:bg-gray-100 focus:ring-white/30"
            : "bg-gray-950 text-white hover:bg-gray-800 focus:ring-gray-300"
        }`}
        disabled={status === "loading"}
        data-testid={`founding-list-submit-${source}`}
      >
        {status === "loading" ? "Joining..." : "Join the Founding List"}
        <Mail className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className={`text-xs leading-5 ${isDark ? "text-white/55" : "text-gray-500"}`}>
        By joining, you agree to receive occasional Just Summit product and launch updates. You can unsubscribe at any time. Read our{" "}
        <Link
          href="/privacy"
          className={`underline underline-offset-2 ${isDark ? "hover:text-white" : "hover:text-gray-950"}`}
        >
          privacy policy
        </Link>
        .
      </p>
      <div aria-live="polite" aria-atomic="true">
        {status !== "idle" && status !== "loading" ? (
          <p
            className={`text-sm ${
              status === "error"
                ? isDark
                  ? "text-red-200"
                  : "text-red-700"
                : isDark
                  ? "text-emerald-200"
                  : "text-emerald-800"
            }`}
            role={status === "error" ? "alert" : "status"}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
