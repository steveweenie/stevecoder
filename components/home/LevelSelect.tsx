"use client";

import Link from "next/link";
import { useState } from "react";
import { cx, SectionHeader, Slot, SlotLabel } from "../ui";
import { FILTERS, LEVELS, type Level } from "@/lib/levels";
import { useFinePointer } from "@/lib/hooks";

type Filter = (typeof FILTERS)[number];

/** Internal routes use <Link>; everything else opens in a new tab. */
export function Go({ href, className, style, children }: { href: string; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {children}
    </a>
  );
}

const btn = "border px-4 py-3";

function Featured({ L, i }: { L: Level; i: number }) {
  const hot = L.primary?.hot;
  return (
    <article className="border-t border-line md:grid md:min-h-[70vh] md:grid-cols-2 md:border-t-0 md:border-b">
      <Slot
        slot={L.media}
        sizes="(max-width: 767px) 100vw, 50vw"
        className="stripes flex items-center justify-center p-4 max-md:hidden md:min-h-80 md:border-r md:border-line md:p-6"
        style={{ order: i % 2 }}
      />
      <Slot
        slot={L.mobileMedia ?? L.media}
        sizes="100vw"
        className="stripes flex aspect-[16/10] items-center justify-center p-4 md:hidden"
      >
        <span className="meta text-center text-[9px]" aria-hidden="true">
          {(L.mobileMedia ?? L.media).label}
        </span>
      </Slot>

      {/* Desktop text */}
      <div className="hidden min-w-0 flex-col justify-center gap-6 px-6 py-12 md:flex" style={{ order: (i + 1) % 2 }}>
        <div className="font-pixel flex gap-4 text-[12px] tracking-[.08em]">
          <span className="text-signal">{L.num}</span>
          <span className="text-dim">{L.rarity}</span>
        </div>
        <h3 className="m-0 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-[-.02em]">{L.title}</h3>
        <p className="m-0 max-w-[44ch] text-[1.1rem] leading-[1.45] text-bone">{L.pitch}</p>
        <div className="flex flex-wrap gap-12">
          {L.stats.map((s) => (
            <div key={s.k}>
              <div className="font-pixel text-[2rem] leading-none">{s.v}</div>
              <div className="meta mt-1.5">{s.k}</div>
            </div>
          ))}
        </div>
        <div className="font-mono text-[12px] text-dim">{L.stack}</div>
        <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[.12em]">
          {L.primary && (
            <Go
              href={L.primary.href}
              className={cx(btn, "hover:!border-bone hover:!bg-bone hover:!text-ink")}
              style={{
                background: hot ? "var(--signal)" : "transparent",
                color: hot ? "var(--ink)" : "var(--bone)",
                borderColor: hot ? "var(--signal)" : "var(--bone)",
              }}
            >
              {L.primary.label}
            </Go>
          )}
          {L.source && (
            <Go href={L.source} className={cx(btn, "border-line hover:border-bone")}>
              Source
            </Go>
          )}
          <Link href={`/levels/${L.slug}`} className={cx(btn, "border-line hover:border-bone")}>
            Case Study
          </Link>
        </div>
      </div>

      {/* Mobile text */}
      <div className="grid gap-3 p-4 md:hidden">
        <div className="font-pixel flex gap-3 text-[10px]">
          <span className="text-signal">{L.num}</span>
          <span className="text-dim">{L.rarity}</span>
        </div>
        <h3 className="m-0 text-[28px] font-bold leading-none tracking-[-.02em]">{L.mobileTitle ?? L.title}</h3>
        <p className="m-0 text-[14px] leading-[1.45]">{L.mobilePitch ?? L.pitch}</p>
        <div className="flex gap-2 font-mono text-[10px] uppercase tracking-[.1em]">
          {L.primary && (
            <Go
              href={L.primary.href}
              className="border px-3.5 py-[13px]"
              style={{
                background: hot ? "var(--signal)" : "transparent",
                color: hot ? "var(--ink)" : "var(--bone)",
                borderColor: hot ? "var(--signal)" : "var(--bone)",
              }}
            >
              {L.primary.mobileLabel ?? L.primary.label}
            </Go>
          )}
          <Link href={`/levels/${L.slug}`} className="border border-line px-3.5 py-[13px]">
            Case study
          </Link>
        </div>
      </div>
    </article>
  );
}

export function LevelSelect() {
  const [filter, setFilter] = useState<Filter>("All");
  const [hover, setHover] = useState<Level | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const fine = useFinePointer();

  const match = (L: Level) => filter === "All" || L.type === filter;
  const featured = LEVELS.filter((L) => L.featured && match(L));
  const list = LEVELS.filter((L) => !L.featured && match(L));

  return (
    <section id="levels" data-screen-label="Level Select" className="scroll-mt-12 py-8 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6">
        <SectionHeader num="03" title="LEVEL SELECT" className="mb-3 flex-wrap md:mb-0">
          <div className="ml-auto hidden gap-4 font-mono text-[11px] uppercase tracking-[.12em] md:flex" role="group" aria-label="Filter levels">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className="underline-offset-4"
                style={{ color: filter === f ? "var(--bone)" : "var(--dim)", textDecoration: filter === f ? "underline" : "none" }}
              >
                {f}
              </button>
            ))}
          </div>
        </SectionHeader>
      </div>
      <div className="flex gap-2 overflow-auto px-4 pb-4 font-mono text-[10px] uppercase tracking-[.1em] md:hidden" role="group" aria-label="Filter levels">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className="whitespace-nowrap border px-2.5 py-2"
            style={{ borderColor: filter === f ? "var(--bone)" : "var(--line)", color: filter === f ? "var(--bone)" : "var(--dim)" }}
          >
            {f}
          </button>
        ))}
      </div>

      {featured.map((L, i) => (
        <Featured key={L.slug} L={L} i={i} />
      ))}

      <div
        className="mx-auto max-w-[1440px] px-4 md:px-6"
        onMouseMove={(e) => fine && setPos({ x: e.clientX + 24, y: e.clientY + 24 })}
        onMouseLeave={() => setHover(null)}
      >
        {list.length > 0 && (
          <div className="meta hidden grid-cols-[minmax(0,2fr)_64px_100px_minmax(0,2fr)] gap-6 pb-2 pt-6 md:grid" aria-hidden="true">
            <span>Level</span>
            <span>Year</span>
            <span>Type</span>
            <span>Stack</span>
          </div>
        )}
        {list.map((r) => (
          <Link
            key={r.slug}
            href={`/levels/${r.slug}`}
            onMouseEnter={() => fine && setHover(r)}
            className="grid items-baseline gap-1 border-t border-line py-4 text-[15px] hover:text-signal md:grid-cols-[minmax(0,2fr)_64px_100px_minmax(0,2fr)] md:gap-6"
          >
            <span className="min-w-0">
              <span className="block text-[1.1rem] font-medium">{r.title}</span>
              <span className="mt-0.5 block text-[14px] text-dim">{r.desc}</span>
            </span>
            <span className="font-mono text-[12px] text-dim max-md:hidden">{r.year}</span>
            <span className="font-pixel text-[11px] max-md:hidden">{r.type}</span>
            <span className="font-mono text-[12px] text-dim max-md:hidden">{r.stack}</span>
            <span className="font-mono text-[11px] text-dim md:hidden">
              {r.year} · {r.type} · {r.stack}
            </span>
          </Link>
        ))}
      </div>

      {hover && fine && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-30 aspect-[16/10] w-[280px] border border-bone bg-ink"
          style={{ left: pos.x, top: pos.y }}
        >
          <Slot slot={hover.media} sizes="280px" className="flex size-full items-center justify-center p-4 text-center">
            <SlotLabel className="border-0 p-0 text-[10px]">{hover.media.label}</SlotLabel>
          </Slot>
        </div>
      )}
    </section>
  );
}
