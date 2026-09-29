"use client";

import { useState } from "react";
import { Brackets, Icon, SectionHeader } from "../ui";
import { INVENTORY } from "@/lib/content";

const TABS = Object.keys(INVENTORY);

export function Inventory() {
  const [tab, setTab] = useState(TABS[0]);
  const [sel, setSel] = useState(0);
  const items = INVENTORY[tab];
  const [name, , rank, usedIn, lvl] = items[Math.min(sel, items.length - 1)];

  const tabs = (className: string) => (
    <div role="tablist" aria-label="Inventory" className={`font-mono uppercase ${className}`}>
      {TABS.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={tab === t}
          onClick={() => {
            setTab(t);
            setSel(0);
          }}
          className="underline-offset-4"
          style={{ color: tab === t ? "var(--bone)" : "var(--dim)", textDecoration: tab === t ? "underline" : "none" }}
        >
          {t}
        </button>
      ))}
    </div>
  );

  return (
    <section id="inventory" data-screen-label="Inventory" className="mx-auto max-w-[1440px] scroll-mt-12 px-4 py-8 md:px-6 md:py-24">
      <SectionHeader num="06" title="INVENTORY" className="mb-4 flex-wrap md:mb-6">
        {tabs("ml-auto hidden gap-4 text-[11px] tracking-[.12em] md:flex")}
      </SectionHeader>
      {tabs("mb-4 flex gap-4 text-[10px] tracking-[.1em] md:hidden")}
      <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_320px] md:gap-12">
        <div role="tabpanel" className="grid grid-cols-4 gap-px border border-line bg-line md:grid-cols-[repeat(auto-fill,minmax(72px,1fr))]">
          {items.map(([n, icon, , , l], i) => {
            const on = i === sel;
            return (
              <button
                key={n}
                onMouseEnter={() => setSel(i)}
                onFocus={() => setSel(i)}
                onClick={() => setSel(i)}
                aria-label={`${n}, level ${l}`}
                aria-pressed={on}
                className="group relative flex aspect-square items-center justify-center"
                style={{ background: on ? "var(--signal)" : "var(--ink)", color: on ? "var(--ink)" : "var(--bone)" }}
              >
                <Icon name={icon} size={28} className="max-md:!size-[30px]" />
                <span
                  className="font-pixel absolute bottom-1 right-1.5 text-[9px] md:bottom-0.5 md:right-1"
                  style={{ color: on ? "var(--ink)" : "var(--dim)" }}
                >
                  {l}
                </span>
              </button>
            );
          })}
        </div>
        <div className="relative border border-line p-4 md:min-h-[180px] md:p-6" aria-live="polite">
          <Brackets size={10} weight={2} offset={1} color="var(--signal)" corners="diag" />
          <div className="font-pixel text-[13px] md:text-[14px]">{name}</div>
          <div className="mb-2.5 mt-1.5 font-mono text-[10px] uppercase tracking-[.12em] text-signal md:mb-4 md:mt-2 md:text-[11px]">
            {rank} Lv.{lvl}
          </div>
          <div className="text-[13px] leading-normal text-bone md:text-[14px]">Used in: {usedIn}</div>
        </div>
      </div>
    </section>
  );
}
