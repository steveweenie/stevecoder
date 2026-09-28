"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { WeatherData } from "@/lib/feeds";
import { useHtmlAttr } from "@/lib/hooks";
import { ScrollFx } from "../ScrollFx";

export type Theme = "dark" | "light" | "devroom";

type Game = {
  theme: Theme;
  /** Pass the toggle's center to wipe the new theme out from it. */
  toggleTheme: (from?: { x: number; y: number }) => void;
  term: boolean;
  setTerm: (open: boolean | ((o: boolean) => boolean)) => void;
  players: number;
  weather: WeatherData | null;
  /** Home page registers its boot state so the first key press only skips the boot. */
  bootRef: React.RefObject<(() => void) | null>;
};

// The terminal (and Motion) only load the first time it opens.
const Terminal = dynamic(() => import("./Terminal").then((m) => m.Terminal), { ssr: false });

const Ctx = createContext<Game | null>(null);
export const useGame = () => {
  const g = useContext(Ctx);
  if (!g) throw new Error("useGame outside GameProvider");
  return g;
};

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function isTyping(el: Element | null) {
  return !!el && (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) || (el as HTMLElement).isContentEditable);
}

export function GameProvider({ weather, children }: { weather: WeatherData | null; children: React.ReactNode }) {
  // The inline script in <head> applies the stored theme before paint; <html data-theme> is the source of truth.
  const theme = (useHtmlAttr("data-theme") ?? "dark") as Theme;
  const [term, setTerm] = useState(false);
  const [cheat, setCheat] = useState(false);
  const [players, setPlayers] = useState(1);
  const bootRef = useRef<(() => void) | null>(null);
  const keys = useRef<string[]>([]);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t;
    store("theme", t);
  }, []);

  const toggleTheme = useCallback(
    (from?: { x: number; y: number }) => {
      const next = theme === "dark" ? "light" : "dark";
      if (!from || !document.startViewTransition) return setTheme(next);
      const s = document.documentElement.style;
      s.setProperty("--vt-x", `${from.x}px`);
      s.setProperty("--vt-y", `${from.y}px`);
      s.setProperty("--vt-r", `${Math.hypot(Math.max(from.x, innerWidth - from.x), Math.max(from.y, innerHeight - from.y))}px`);
      document.startViewTransition(() => setTheme(next));
    },
    [theme, setTheme],
  );

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      if (bootRef.current) {
        bootRef.current();
        return;
      }
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keys.current = [...keys.current, k].slice(-KONAMI.length);
      if (keys.current.join() === KONAMI.join()) {
        keys.current = [];
        setTheme("devroom");
        setCheat(true);
        clearTimeout(t);
        t = setTimeout(() => setCheat(false), 3300);
        return;
      }
      if (e.key === "Escape") setTerm(false);
      if (e.key === "`" && !isTyping(document.activeElement)) {
        e.preventDefault();
        setTerm((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [setTheme]);

  // Players online: heartbeat every 30s while the tab is visible.
  useEffect(() => {
    let id: string;
    try {
      id = sessionStorage.getItem("pid") ?? crypto.randomUUID();
      sessionStorage.setItem("pid", id);
    } catch {
      id = crypto.randomUUID();
    }
    const ping = () => {
      if (document.visibilityState !== "visible") return;
      fetch("/api/presence", { method: "POST", body: JSON.stringify({ id }) })
        .then((r) => r.json())
        .then((d) => typeof d.players === "number" && setPlayers(d.players))
        .catch(() => {});
    };
    ping();
    const iv = setInterval(ping, 30_000);
    document.addEventListener("visibilitychange", ping);
    return () => {
      clearInterval(iv);
      document.removeEventListener("visibilitychange", ping);
    };
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, term, setTerm, players, weather, bootRef }),
    [theme, toggleTheme, term, players, weather],
  );

  return (
    <Ctx.Provider value={value}>
        {cheat && (
          <div
            role="status"
            className="font-pixel fixed inset-x-0 top-0 z-[90] bg-signal p-3 text-center text-[14px] tracking-[.1em] text-ink"
            style={{ animation: "flashin 3.2s steps(12) forwards" }}
          >
            CHEAT ACTIVATED: DEV ROOM UNLOCKED
          </div>
        )}
        <ScrollFx />
        {children}
        {term && <Terminal onClose={() => setTerm(false)} />}
    </Ctx.Provider>
  );
}
