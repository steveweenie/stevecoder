"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "../ui";
import { REVIEWS } from "@/lib/content";

const N = REVIEWS.length;
/** Most cards on screen at once (lg). The track repeats this many so it can loop seamlessly. */
const MAX_PER = 4;
const TRACK = [...REVIEWS, ...REVIEWS.slice(0, MAX_PER)];
const pad = (n: number) => String(n).padStart(2, "0");

/** Testimonial carousel: 1 / 2 / 4 cards visible, advances one card at a time and loops. */
export function Reviews() {
  const [i, setI] = useState(0);
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const next = () => {
    setAnim(true);
    setI((v) => v + 1);
  };
  const prev = () => {
    if (i > 0) {
      setAnim(true);
      setI(i - 1);
      return;
    }
    // Jump to the cloned copy of card 1 without animating, then step back into the last card.
    setAnim(false);
    setI(N);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnim(true);
        setI(N - 1);
      }),
    );
  };

  // Autoplay. Keyed on `i`, so any move (manual or automatic) restarts the wait.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, 4500);
    return () => clearTimeout(t);
  }, [paused, i]);

  return (
    <section id="reviews" data-screen-label="Player Reviews" className="mx-auto max-w-[1440px] scroll-mt-12 px-4 py-8 md:px-6 md:py-24">
      <SectionHeader num="05" title="PLAYER REVIEWS" meta={`${N} reviews · ★★★★★`} className="mb-6" />
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        className="overflow-hidden border border-line [--per:1] sm:[--per:2] lg:[--per:4]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        }}
      >
        <div
          className="flex w-[calc(100%+1px)]"
          style={{
            transform: `translateX(calc(-100% / var(--per) * ${i}))`,
            transition: anim ? "transform 480ms steps(6)" : "none",
          }}
          onTransitionEnd={() => {
            if (i >= N) {
              setAnim(false);
              setI(i - N);
            }
          }}
        >
          {TRACK.map((r, k) => (
            <figure
              key={k}
              aria-hidden={k >= N || undefined}
              className="m-0 flex shrink-0 basis-[calc(100%/var(--per))] flex-col gap-4 border-r border-line bg-ink p-5"
            >
              <span className="font-pixel text-[11px] tracking-[.2em] text-signal" aria-hidden="true">
                ★★★★★
              </span>
              <blockquote className="m-0 flex-1 text-[15px] leading-[1.55]">“{r.quote}”</blockquote>
              <figcaption className="flex items-center gap-3 border-t border-hair pt-4">
                <Image src={`/images/avatars/${r.avatar}`} alt="" width={40} height={40} className="size-10 shrink-0 border border-line object-cover" />
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium">{r.name}</span>
                  <span className="meta block truncate">{r.from}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.12em]">
        <button type="button" onClick={prev} aria-label="Previous review" className="border border-line px-3 py-2 hover:border-bone">
          ←
        </button>
        <button type="button" onClick={next} aria-label="Next review" className="border border-line px-3 py-2 hover:border-bone">
          →
        </button>
        <span className="text-dim" aria-live="polite">
          {pad((i % N) + 1)} / {pad(N)}
        </span>
        <div className="ml-auto hidden max-w-60 flex-1 gap-[3px] sm:flex" aria-hidden="true">
          {REVIEWS.map((_, k) => (
            <span key={k} className="h-1.5 flex-1" style={{ background: k === i % N ? "var(--signal)" : "var(--line)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
