"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { m, LazyMotion, domAnimation, MotionConfig } from "motion/react";
import { useGame } from "./GameProvider";
import { go, QUIPS, SITE, statusFor } from "@/lib/site";
import { LEVEL_ALIASES } from "@/lib/levels";
import { stepped, useIsMobile } from "@/lib/hooks";

type Line = { text: string; color: string };

const INTRO: Line[] = [{ text: 'STEVE OS v2026.09. Type "help" to begin.', color: "var(--dim)" }];
let saved: Line[] = INTRO; // survives close/reopen within the page session

export function Terminal({ onClose }: { onClose: () => void }) {
  const { weather } = useGame();
  const router = useRouter();
  const path = usePathname();
  const mobile = useIsMobile();
  const [out, setOut] = useState<Line[]>(saved);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useRef<string[]>([]);
  const hIdx = useRef(-1);

  useEffect(() => {
    saved = out;
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [out]);

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.activeElement as HTMLElement | null;
    return () => prev?.focus?.();
  }, []);

  /** Scroll to a home section, navigating home first when on a case study. */
  const goHome = (id: string) => {
    if (path === "/") go(id);
    else router.push(`/#${id}`);
  };

  const run = (cmd: string) => {
    const next = [...out, { text: "> " + cmd, color: "var(--bone)" }];
    const say = (text: string, color = "var(--dim)") => next.push({ text, color });
    const [c = "", ...rest] = cmd.trim().split(/\s+/);
    const arg = rest.join(" ").toLowerCase().replace(/\/$/, "");
    if (cmd.trim()) history.current.unshift(cmd);
    hIdx.current = -1;

    switch (c.toLowerCase()) {
      case "help":
        say("help  whoami  ls projects  open <project>  resume  contact  weather  status  wishlist  konami  clear  exit");
        break;
      case "whoami":
        say('Abraham Steve Colina. CS @ UTSA \'27. Full stack by day, multiplayer games by night. Music in between.');
        break;
      case "ls":
        say("undead-presidents/  aloha-tt/  tat-trick/  mad-hatters-whisper/  emptyshellcasing/  silvesbro/");
        break;
      case "open": {
        if (!arg) {
          say("usage: open <project>");
          break;
        }
        const slug = LEVEL_ALIASES[arg];
        if (slug) {
          say("Loading level: " + arg + "...");
          setTimeout(() => {
            onClose();
            router.push(`/levels/${slug}`);
          }, 400);
        } else {
          say("level not found: " + arg + '. try "ls projects".', "var(--signal)");
        }
        break;
      }
      case "resume": {
        say("Downloading save file: " + SITE.resumeDownloadName, "var(--signal)");
        const a = document.createElement("a");
        a.href = SITE.resume;
        a.download = SITE.resumeDownloadName;
        a.click();
        break;
      }
      case "contact":
        say(SITE.email);
        setTimeout(() => {
          onClose();
          goHome("contact");
        }, 300);
        break;
      case "weather":
        say(
          weather
            ? `San Antonio, TX: ${weather.tempF}F, ${weather.desc}. ${weather.quip}`
            : `San Antonio, TX: weather offline. ${QUIPS[1]}`,
        );
        break;
      case "status":
        say(statusFor());
        break;
      case "wishlist":
        say("Opening Steam: Undead Presidents. Thank you, seriously.", "var(--signal)");
        window.open(SITE.links.steamGame, "_blank", "noopener");
        break;
      case "konami":
        say("up up down down left right left right B A. You know what to do.");
        break;
      case "clear":
        setOut([]);
        setInput("");
        return;
      case "exit":
        setInput("");
        onClose();
        return;
      case "":
        break;
      default:
        say("command not found: " + c + '. try "help".', "var(--signal)");
    }
    setOut(next);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") run(input);
    else if (e.key === "Escape" || e.key === "`") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const h = history.current;
      hIdx.current = Math.max(-1, Math.min(h.length - 1, hIdx.current + (e.key === "ArrowUp" ? 1 : -1)));
      setInput(hIdx.current < 0 ? "" : h[hIdx.current]);
    }
  };

  const prompt = (
    <div className={mobile ? "flex gap-2 border-t border-line p-3" : "flex gap-2"}>
      <span className="text-signal" aria-hidden="true">
        &gt;
      </span>
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        aria-label="Terminal input"
        className="flex-1 border-0 bg-transparent text-bone caret-signal outline-none focus-visible:outline-none"
      />
    </div>
  );

  return (
    <MotionConfig reducedMotion="never">
    <LazyMotion features={domAnimation}>
      <div
        className="fixed inset-0 z-[80] flex items-end justify-center bg-[rgba(14,15,12,.85)] md:p-6"
        onClick={onClose}
      >
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label="Terminal"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.15, ease: stepped(4) }}
          className="flex h-[52%] w-full flex-col border-t border-bone bg-ink font-mono text-[12px] leading-[1.6] md:h-[min(60vh,520px)] md:max-w-[880px] md:border md:text-[13px]"
        >
          <div className="meta flex items-center gap-3 border-b border-line px-3 py-2 max-md:text-[10px]">
            <span>steve@stevecoder.com</span>
            <button onClick={onClose} className="ml-auto uppercase" aria-label="Close terminal">
              <span className="hidden md:inline">esc to close</span>
              <span className="md:hidden">✕</span>
            </button>
          </div>
          <div ref={scroller} className="flex-1 overflow-auto whitespace-pre-wrap p-3" onClick={() => inputRef.current?.focus()}>
            <div aria-live="polite">
              {out.map((l, i) => (
                <div key={i} style={{ color: l.color }}>
                  {l.text}
                </div>
              ))}
            </div>
            {!mobile && prompt}
          </div>
          {mobile && prompt}
        </m.div>
      </div>
    </LazyMotion>
    </MotionConfig>
  );
}
