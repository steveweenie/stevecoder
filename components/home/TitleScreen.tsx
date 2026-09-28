"use client";

import { useEffect, useState } from "react";
import { isTyping, useGame } from "../game/GameProvider";
import { cx, Slot, SlotLabel } from "../ui";
import { go, MENU } from "@/lib/site";
import { SLOTS } from "@/lib/slots";

function Cursor() {
  return (
    <svg width="10" height="14" viewBox="0 0 5 7" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M0 0h1v1h1v1h1v1h1v1H3v1H2v1H1v1H0z" fill="var(--signal)" />
    </svg>
  );
}

export function TitleScreen() {
  const { term, bootRef } = useGame();
  const [sel, setSel] = useState(0);

  // ↑↓ move, Enter confirms, only while scrollY < 200.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (bootRef.current || term || isTyping(document.activeElement) || window.scrollY >= 200) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((s) => (s + 1) % MENU.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((s) => (s + MENU.length - 1) % MENU.length);
      } else if (e.key === "Enter") {
        const tag = document.activeElement?.tagName;
        if (tag === "BUTTON" || tag === "A") return; // native activation handles it
        go(MENU[sel][1]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [term, bootRef, sel]);

  return (
    <section
      id="top"
      data-screen-label="Title screen"
      className="relative flex min-h-[calc(100svh-48px)] flex-col overflow-hidden md:grid md:min-h-[calc(100vh-48px)] md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 md:px-6 md:pb-6 md:pt-12"
    >
      {/* Full-bleed background media, darkened, with scanlines */}
      <Slot
        slot={SLOTS.hero}
        priority
        quality={50}
        className="scanlines absolute inset-0 z-0 flex items-start justify-end p-4 md:px-6 md:py-24"
        imgClassName="hero-media"
      >
        <SlotLabel className="max-md:px-2 max-md:py-1.5 max-md:text-[9px]">
          <span className="hidden md:inline">{SLOTS.hero.label}</span>
          <span className="md:hidden">{SLOTS.heroMobile.label}</span>
        </SlotLabel>
      </Slot>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "repeating-linear-gradient(0deg,transparent 0 2px,rgba(0,0,0,.35) 2px 3px)" }}
      />

      <div className="relative z-[1] flex min-w-0 flex-1 flex-col justify-end px-4 py-6 md:p-0">
        <div className="hero-in meta mb-4 text-[10px] md:mb-6 md:text-[11px]">
          <span className="hidden md:inline">Save file 01 / San Antonio, TX / v2026.09</span>
          <span className="md:hidden">Save file 01 / San Antonio</span>
        </div>
        <h1 style={{ "--d": 1 } as React.CSSProperties} className="hero-in font-pixel m-0 text-[44px] font-normal leading-[.95] md:text-[clamp(2.5rem,9vw,9rem)] md:leading-[.92] md:tracking-[-.02em] [text-wrap:balance]">
          ABRAHAM
          <br />
          STEVE
          <br />
          COLINA
        </h1>
        <p style={{ "--d": 2 } as React.CSSProperties} className="hero-in m-0 mt-4 max-w-[32ch] text-[15px] text-bone md:mt-6 md:text-[clamp(1rem,1.4vw,1.25rem)]">
          Software engineer. Game developer. Musician.
        </p>
        <div style={{ "--d": 3 } as React.CSSProperties} className="hero-in">
          <div className="font-pixel mt-6 animate-blink-slow text-[11px] tracking-[.1em] md:mt-12 md:text-[12px]">
            <span className="hidden md:inline">PRESS START</span>
            <span className="md:hidden">TAP START</span>
          </div>
        </div>
      </div>

      {/* Desktop: vertical menu with pixel cursor */}
      <nav aria-label="Game menu" style={{ "--d": 3 } as React.CSSProperties} className="hero-in relative z-[1] hidden min-w-60 flex-col gap-3 self-center md:flex">
        {MENU.map(([label, id], i) => (
          <button
            key={id}
            onClick={() => go(id)}
            onMouseEnter={() => setSel(i)}
            onFocus={() => setSel(i)}
            className={cx(
              "font-pixel flex items-center gap-3 py-1 text-left text-[clamp(14px,1.3vw,18px)] tracking-[.04em] transition-[color,translate] duration-200",
              i === sel && "translate-x-1.5",
            )}
            style={{ color: i === sel ? "var(--bone)" : "var(--dim)" }}
          >
            <span className="inline-flex w-3.5 justify-center">{i === sel && <Cursor />}</span>
            <span>{label}</span>
          </button>
        ))}
        <div className="meta mt-3 text-[10px]">↑↓ select · enter confirm · ` terminal</div>
      </nav>

      {/* Mobile: 2-col grid of 44px targets */}
      <nav aria-label="Game menu" style={{ "--d": 3 } as React.CSSProperties} className="hero-in relative z-[1] grid grid-cols-2 gap-px border-t border-line bg-line md:hidden">
        {MENU.map(([label, id], i) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              setSel(i);
              go(id);
            }}
            className="font-pixel flex min-h-11 items-center gap-2 bg-ink px-4 py-3.5 text-[12px]"
            style={{ color: i === sel ? "var(--bone)" : "var(--dim)" }}
          >
            {i === sel && (
              <span className="text-signal" aria-hidden="true">
                ▸
              </span>
            )}
            {label}
          </a>
        ))}
      </nav>
    </section>
  );
}
