"use client";

import { useEffect, useRef, useState } from "react";
import { Brackets, Icon, SectionHeader, Segs } from "../ui";
import { SITE } from "@/lib/site";

type State = "idle" | "sending" | "success" | "error";
const SUBJECTS = ["Job opportunity", "Freelance", "Collab", "Just saying hi"];

const label = "grid gap-1.5 font-mono text-[10px] uppercase tracking-[.12em] text-dim md:text-[11px]";
const field = "border-0 border-b border-line bg-transparent py-2 font-sans text-[16px] normal-case tracking-normal text-bone max-md:min-h-11";

export function Contact() {
  const [state, setState] = useState<State>("idle");
  const [fill, setFill] = useState(1);
  const [v, setValues] = useState<Record<string, string>>({ subject: SUBJECTS[0] });
  const headRef = useRef<HTMLDivElement>(null);

  // Segmented loading bar fills in steps while the request is in flight.
  useEffect(() => {
    if (state !== "sending") return;
    const t = setInterval(() => setFill((n) => Math.min(11, n + 1)), 150);
    return () => clearInterval(t);
  }, [state]);

  useEffect(() => {
    if (state === "success" || state === "error") headRef.current?.focus();
  }, [state]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const values = Object.fromEntries(["name", "email", "subject", "message"].map((k) => [k, String(f.get(k) ?? "")]));
    setValues(values);
    setFill(1);
    setState("sending");
    const started = Date.now();
    let ok = false;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, botcheck: f.get("botcheck") }),
      });
      ok = res.ok;
    } catch {}
    // Let the bar play for at least a beat.
    await new Promise((r) => setTimeout(r, Math.max(0, 900 - (Date.now() - started))));
    if (ok) setValues({ subject: SUBJECTS[0] });
    setState(ok ? "success" : "error");
  };

  return (
    <section id="contact" data-screen-label="Multiplayer" className="mx-auto max-w-[1440px] scroll-mt-12 px-4 py-8 md:px-6 md:py-24">
      <SectionHeader num="08" title="MULTIPLAYER" meta="contact" className="mb-6 md:mb-12" />
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)] md:gap-12">
        <form onSubmit={submit} className="relative grid gap-5 border border-bone p-5 md:p-8" noValidate={false}>
          <span className="max-md:hidden">
            <Brackets size={14} weight={3} offset={2} />
          </span>
          <span className="md:hidden">
            <Brackets size={12} weight={3} offset={2} />
          </span>
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] opacity-0" />

          {state === "idle" && (
            <>
              <div className="font-pixel text-[12px] md:text-[13px]">&gt; A new challenger approaches.</div>
              <div className="grid gap-5 md:grid-cols-2">
                <label className={label}>
                  Name
                  <input name="name" required autoComplete="name" defaultValue={v.name} className={field} />
                </label>
                <label className={label}>
                  Email
                  <input name="email" type="email" required autoComplete="email" defaultValue={v.email} className={field} />
                </label>
              </div>
              <label className={label}>
                Subject
                <select name="subject" defaultValue={v.subject} className={`${field} bg-ink`}>
                  {SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className={label}>
                Message
                <textarea name="message" required rows={5} defaultValue={v.message} className={`${field} resize-y max-md:min-h-24`} />
              </label>
              <button
                type="submit"
                className="font-pixel bg-signal px-5 py-3 text-[12px] tracking-[.08em] text-ink hover:bg-bone max-md:p-3.5 md:justify-self-start"
              >
                SEND ▸
              </button>
            </>
          )}

          {state === "sending" && (
            <div role="status" className="grid gap-5">
              <div className="font-pixel text-[13px]">&gt; Connecting to host...</div>
              <Segs n={fill} total={12} h={10} gap={4} className="max-w-[360px]" />
            </div>
          )}

          {state === "success" && (
            <>
              <div ref={headRef} tabIndex={-1} role="status" className="font-pixel text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.2] outline-none">
                Message delivered.
              </div>
              <div className="flex items-center gap-3 justify-self-start border border-signal px-4 py-3">
                <span className="font-pixel text-[12px] text-signal" aria-hidden="true">
                  ★
                </span>
                <span className="font-mono text-[12px]">Achievement unlocked: Networking</span>
              </div>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="justify-self-start font-mono text-[11px] uppercase tracking-[.12em] text-dim underline underline-offset-4"
              >
                Send another
              </button>
            </>
          )}

          {state === "error" && (
            <>
              <div ref={headRef} tabIndex={-1} role="alert" className="font-pixel text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.2] text-signal outline-none">
                Connection lost.
              </div>
              <div className="max-w-[44ch] text-[15px]">
                The form didn&apos;t go through. Email me directly at {SITE.email} or try again.
              </div>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="font-pixel justify-self-start border border-bone px-5 py-3 text-[12px] hover:bg-bone hover:text-ink"
              >
                RETRY
              </button>
            </>
          )}
        </form>

        <div className="grid gap-3 md:gap-6">
          <a
            href={`mailto:${SITE.email}`}
            className="hidden break-all border-b border-line pb-3 font-mono text-[14px] md:block"
          >
            {SITE.email}
          </a>
          <div className="grid gap-3 font-mono text-[11px] uppercase tracking-[.1em] md:text-[12px] md:tracking-[.12em]">
            <a href={SITE.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 max-md:min-h-11">
              <Icon name="linkedin" size={14} />
              LinkedIn <span className="md:text-dim">→</span>
            </a>
            <a href={SITE.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 max-md:min-h-11">
              <Icon name="github" size={14} />
              GitHub <span className="md:text-dim">→</span>
            </a>
          </div>
          <a
            href={SITE.resume}
            download={SITE.resumeDownloadName}
            className="font-pixel block border border-bone p-4 text-[13px] leading-[1.3] hover:bg-bone hover:text-ink md:p-6 md:text-[clamp(1rem,1.6vw,1.25rem)]"
          >
            <span className="md:hidden">DOWNLOAD SAVE FILE ↓</span>
            <span className="hidden md:inline">
              DOWNLOAD
              <br />
              SAVE FILE ↓
            </span>
            <span className="mt-3 hidden font-mono text-[11px] tracking-[.12em] text-dim md:block">resume.pdf · 1 page</span>
          </a>
        </div>
      </div>
    </section>
  );
}
