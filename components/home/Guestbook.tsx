"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cx, Icon, SectionHeader } from "../ui";
import { GB_ICONS, type GuestEntry } from "@/lib/content";

type State = "idle" | "submitting" | "submitted" | "profane" | "error";

const date = (ms: number) => {
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}.${p(d.getDate())}.${String(d.getFullYear()).slice(2)}`;
};

const label = "grid gap-1.5 font-mono text-[11px] uppercase tracking-[.12em] text-dim";

export function Guestbook({ entries }: { entries: GuestEntry[] }) {
  const [state, setState] = useState<State>("idle");
  const [icon, setIcon] = useState(0);
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setState("submitting");
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tag: f.get("tag"), msg: f.get("msg"), icon, botcheck: f.get("botcheck") }),
      });
      if (res.status === 422) return setState("profane");
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("submitted");
      router.refresh();
    } catch {
      setState("error");
    }
  };

  const msg =
    state === "submitted"
      ? "Score saved. You're on the board."
      : state === "profane"
        ? "Foul play detected. Keep it clean and try again."
        : state === "error"
        ? "Save failed. The arcade ate your quarter. Try again."
        : state === "submitting"
          ? "Writing to leaderboard..."
          : "";

  return (
    <section id="guestbook" data-screen-label="Guestbook" className="mx-auto max-w-[1440px] scroll-mt-12 px-4 py-8 md:px-6 md:py-24">
      <SectionHeader num="08" title="HIGH SCORES" meta="guestbook" className="mb-6" />
      <div className="grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]">
        <ol className="m-0 list-none p-0 font-mono text-[13px]">
          {entries.length === 0 && <li className="py-3 text-dim">No scores yet. Be player one.</li>}
          {entries.map((s, i) => (
            <li
              key={s.id}
              className="grid grid-cols-[28px_16px_minmax(0,auto)_minmax(0,1fr)] items-center gap-3 border-b border-hair py-3 md:grid-cols-[40px_28px_140px_minmax(0,1fr)_auto] md:gap-4"
            >
              <span className="font-pixel" style={{ color: i === 0 ? "var(--signal)" : "var(--dim)" }}>
                {i + 1}
              </span>
              <Icon name={(GB_ICONS[s.icon] ?? GB_ICONS[0])[0]} size={16} className={i === 0 ? "text-signal" : "text-bone"} />
              <span className="font-pixel text-[12px]">{s.tag}</span>
              <span className="min-w-0 truncate font-sans text-[15px]">{s.msg}</span>
              <span className="hidden text-[11px] text-dim md:inline">{date(s.createdAt)}</span>
            </li>
          ))}
        </ol>
        <form onSubmit={submit} className="relative grid content-start gap-4">
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] opacity-0" />
          <label className={label}>
            Enter tag
            <input
              name="tag"
              required
              minLength={3}
              maxLength={12}
              pattern="[A-Za-z0-9 _.\-]{3,12}"
              placeholder="AAA"
              autoComplete="off"
              onChange={() => state !== "submitting" && setState("idle")}
              className="font-pixel border border-line bg-transparent p-3 text-[16px] uppercase text-bone"
            />
          </label>
          <label className={label}>
            Message
            <input
              name="msg"
              required
              maxLength={80}
              placeholder="gg"
              autoComplete="off"
              onChange={() => state !== "submitting" && setState("idle")}
              className="border border-line bg-transparent p-3 font-sans text-[15px] normal-case tracking-normal text-bone"
            />
          </label>
          <div className={label}>
            <span id="gb-icon">Pick icon</span>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="gb-icon">
              {GB_ICONS.map(([name, game], i) => (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={icon === i}
                  aria-label={game}
                  title={game}
                  onClick={() => setIcon(i)}
                  className={cx(
                    "grid size-7 place-items-center border max-md:size-9",
                    icon === i ? "border-signal text-signal" : "border-line text-dim hover:text-bone",
                  )}
                >
                  <Icon name={name} size={16} />
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={state === "submitting"}
            className="font-pixel border border-bone p-3 text-[12px] tracking-[.08em] hover:bg-bone hover:text-ink"
          >
            {state === "submitting" ? "SAVING..." : state === "submitted" ? "SUBMITTED" : "ENTER INITIALS"}
          </button>
          <div
            role="status"
            className="min-h-[18px] font-mono text-[12px]"
            style={{ color: state === "error" || state === "profane" ? "var(--signal)" : "var(--dim)" }}
          >
            {msg}
          </div>
        </form>
      </div>
    </section>
  );
}
