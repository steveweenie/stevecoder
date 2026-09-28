"use client";

import { useCallback, useEffect, useState } from "react";
import { useGame } from "../game/GameProvider";
import { BOOT } from "@/lib/site";
import { useHtmlAttr } from "@/lib/hooks";

/** Boot sequence: once per session (sessionStorage), any key or click skips. */
export function Boot() {
  const { bootRef } = useGame();
  const booted = useHtmlAttr("data-booted") !== null;
  const [step, setStep] = useState(0);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem("booted", "1");
    } catch {}
    document.documentElement.setAttribute("data-booted", "");
    bootRef.current = null;
  }, [bootRef]);

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-booted")) return;
    bootRef.current = finish;
    let n = 0;
    const t = setInterval(() => {
      n++;
      if (n > BOOT.length) {
        clearInterval(t);
        finish();
      } else setStep(n);
    }, 300);
    return () => {
      clearInterval(t);
      bootRef.current = null;
    };
  }, [bootRef, finish]);

  if (booted) return null;
  return (
    <div
      data-boot
      aria-hidden="true"
      onClick={finish}
      className="fixed inset-0 z-[100] cursor-pointer bg-ink p-6 font-mono text-[13px] leading-[1.7] text-dim md:p-12"
    >
      {BOOT.slice(0, step).map((l, i) => (
        <div key={i} style={{ color: i === BOOT.length - 1 ? "var(--signal)" : "var(--dim)" }}>
          {l}
        </div>
      ))}
      <span className="inline-block h-3.5 w-2 animate-blink bg-signal align-[-2px]" />
      <div className="absolute bottom-6 left-6 text-[11px] uppercase tracking-[.12em] md:bottom-12 md:left-12">press any key to skip</div>
    </div>
  );
}
