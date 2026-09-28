"use client";

import { useEffect, useState } from "react";
import { useGame } from "../game/GameProvider";
import { cx } from "../ui";
import { go, MENU, SITE, statusFor } from "@/lib/site";

const bar = "absolute left-0 h-0.5 w-4 bg-bone transition-[translate,rotate,opacity] duration-200";

export function Hud({ initialStatus }: { initialStatus: string }) {
  const { players, weather, setTerm } = useGame();
  const [status, setStatus] = useState(initialStatus);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const tick = () => setStatus(statusFor());
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink font-mono text-[11px] uppercase md:tracking-[.08em]">
      <div className="flex h-12 items-center gap-3 px-4 md:gap-6 md:px-6">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-pixel text-[12px] normal-case tracking-normal md:text-[13px]">
          STEVE.COLINA
        </a>
        <div className="flex items-center gap-1.5 text-[10px] text-dim md:gap-2 md:text-[11px]">
          <span className="inline-block size-1.5 bg-ok" aria-hidden="true" />
          <span>{status}</span>
        </div>
        {weather && (
          <div className="hidden items-center gap-2 text-dim xl:flex">
            San Antonio {weather.tempF}F {weather.desc}
          </div>
        )}
        <div className="ml-auto flex items-center gap-6">
          <span className="hidden text-dim md:inline">
            <span className="text-bone">{players}</span> online
          </span>
          <button
            onClick={() => setTerm((o) => !o)}
            aria-label="Open terminal"
            title="Terminal (`)"
            className="font-mono text-[12px] tracking-normal text-bone hover:text-signal max-md:min-h-11 max-md:px-1"
          >
            &gt;_
          </button>
          <a
            href={SITE.resume}
            download={SITE.resumeDownloadName}
            className="hidden border border-bone px-2.5 py-1.5 text-bone hover:bg-bone hover:text-ink md:inline-block"
          >
            Save File ↓
          </a>
        </div>
        <button
          onClick={() => setMenu((o) => !o)}
          aria-label="Menu"
          aria-expanded={menu}
          aria-controls="mobile-menu"
          className="-mr-3 grid size-11 place-items-center md:hidden"
        >
          <span className="relative block h-3 w-4" aria-hidden="true">
            <span className={cx(bar, "top-0", menu && "translate-y-[5px] rotate-45")} />
            <span className={cx(bar, "top-[5px]", menu && "opacity-0")} />
            <span className={cx(bar, "top-[10px]", menu && "-translate-y-[5px] -rotate-45")} />
          </span>
        </button>
      </div>
      {menu && (
        <nav
          id="mobile-menu"
          aria-label="Game menu"
          className="grid grid-cols-2 gap-px border-t border-line bg-line normal-case md:hidden"
          style={{ animation: "reveal .3s var(--ease-out) both" }}
        >
          {MENU.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                setMenu(false);
                go(id);
              }}
              className="font-pixel flex min-h-11 items-center bg-ink px-4 py-3.5 text-[12px]"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 -bottom-px h-px bg-signal" />
    </header>
  );
}
