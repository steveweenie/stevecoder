"use client";

import { useEffect, useState } from "react";

/** Reading progress for the case study HUD. */
export function Progress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(100, Math.round((h.scrollTop / max) * 100)) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="h-1 w-[120px] bg-line" role="progressbar" aria-label="Reading progress" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full bg-signal" style={{ width: `${p}%` }} />
    </div>
  );
}
