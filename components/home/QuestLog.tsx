"use client";

import { Fragment, useState } from "react";
import { SectionHeader } from "../ui";
import { QUESTS, type Quest } from "@/lib/content";

function Bullets({ items, mobile }: { items: string[]; mobile?: boolean }) {
  return (
    <ul className={mobile ? "m-0 mt-3 grid list-none gap-1.5 p-0 text-[13px] leading-normal" : "m-0 grid max-w-[64ch] list-none gap-2 p-0 text-[15px] leading-normal"}>
      {items.map((b) => (
        <li key={b} className={mobile ? "flex gap-2" : "flex gap-3"}>
          <span className="font-mono text-signal" aria-hidden="true">
            &gt;
          </span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function Stack({ stack, mobile }: { stack: NonNullable<Quest["stack"]>; mobile?: boolean }) {
  return (
    <dl
      className={
        mobile
          ? "m-0 mt-4 grid gap-2 border-t border-line pt-3 text-[12px] leading-normal"
          : "m-0 mt-5 grid max-w-[64ch] grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-1.5 border-t border-line pt-4 text-[13px] leading-normal"
      }
    >
      {stack.map(([group, items]) => (
        <div key={group} className={mobile ? undefined : "contents"}>
          <dt className={mobile ? "meta text-[10px]" : "meta pt-[2px]"}>{group}</dt>
          <dd className={mobile ? "m-0 mt-0.5 text-dim" : "m-0 text-dim"}>{items}</dd>
        </div>
      ))}
    </dl>
  );
}

export function QuestLog() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="quests" data-screen-label="Quest Log" className="mx-auto max-w-[1440px] scroll-mt-12 px-4 pb-8 pt-4 md:px-6 md:py-24">
      <SectionHeader num="02" title="QUEST LOG" meta="experience · click a row" />
      <div>
        {QUESTS.map((q, i) => {
          const isOpen = open === i;
          const toggle = () => setOpen(isOpen ? null : i);
          const badge = q.active ? "ACTIVE" : "✓ DONE";
          const badgeColor = q.active ? "var(--signal)" : "var(--dim)";
          const panel = `quest-${i}`;
          const firstEarly = q.early && !QUESTS[i - 1]?.early;
          return (
            <Fragment key={q.org}>
              {firstEarly && (
                <div className="flex items-baseline gap-3 border-b border-line pb-3 pt-10 font-mono text-[10px] uppercase tracking-[.12em] text-dim md:gap-4 md:pb-4 md:pt-16 md:text-[11px]">
                  <span className="font-pixel text-signal">Earlier quests</span>
                  <span>2022 to 2025 · where it started</span>
                </div>
              )}
              <div className="border-b border-line">
                {/* Desktop row */}
                <button
                  onClick={toggle}
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  className="hidden w-full grid-cols-[160px_minmax(0,1fr)_auto] items-baseline gap-6 py-6 text-left hover:text-signal md:grid"
                >
                  <span className="font-mono text-[12px] text-dim">{q.dates}</span>
                  <span className="min-w-0">
                    <span className="block text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-[1.15]">{q.role}</span>
                    <span className="mt-1 block text-[15px] text-dim">{q.org}</span>
                  </span>
                  <span className="font-pixel text-[11px] tracking-[.08em]" style={{ color: badgeColor }}>
                    {badge}
                  </span>
                </button>
                {/* Mobile row */}
                <button onClick={toggle} aria-expanded={isOpen} aria-controls={panel} className="block w-full py-4 text-left md:hidden">
                  <span className="flex justify-between font-mono text-[10px] text-dim">
                    <span>{q.dates}</span>
                    <span className="font-pixel" style={{ color: q.active ? "var(--signal)" : undefined }}>
                      {badge}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[17px] font-medium leading-[1.2]">{q.roleShort ?? q.role}</span>
                  <span className="mt-0.5 block text-[13px] text-dim">{q.orgShort ?? q.org}</span>
                </button>
                {isOpen && (
                  <div id={panel} style={{ animation: "reveal .3s var(--ease-out) both" }}>
                    <div className="hidden grid-cols-[160px_minmax(0,1fr)] gap-6 pb-6 md:grid">
                      <div className="flex flex-wrap content-start gap-1.5">
                        {q.tags.map((t) => (
                          <span key={t} className="border border-line px-1.5 py-0.5 font-mono text-[11px] text-dim">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div>
                        <Bullets items={q.bullets} />
                        {q.stack && <Stack stack={q.stack} />}
                      </div>
                    </div>
                    <div className="-mt-1 pb-4 md:hidden">
                      <Bullets items={q.bullets} mobile />
                      {q.stack && <Stack stack={q.stack} mobile />}
                    </div>
                  </div>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
