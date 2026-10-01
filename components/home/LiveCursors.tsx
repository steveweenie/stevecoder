"use client";

import { useEffect } from "react";
import { LiveblocksProvider, RoomProvider, useOthersMapped, useUpdateMyPresence } from "@liveblocks/react";
import { CURSOR_ROOM } from "@/lib/site";
import { playerId } from "../game/GameProvider";

/**
 * Cursor position in document space: x is the offset from the page's horizontal
 * center (the layout is centered, so this lines up across window widths), y is pageY.
 */
type Cursor = { x: number; y: number } | null;

declare global {
  interface Liveblocks {
    Presence: { cursor: Cursor };
  }
}

const MAX_SHOWN = 8;

/** Tokens come from /api/liveblocks-auth. A 4xx (no secret set, rate limited) stops retries. */
async function auth(room?: string) {
  try {
    const res = await fetch("/api/liveblocks-auth", { method: "POST", body: JSON.stringify({ room, id: playerId() }) });
    if (res.ok) return await res.json();
    return { error: res.status < 500 ? "forbidden" : "server", reason: `auth ${res.status}` };
  } catch {
    return { error: "network", reason: "auth request failed" };
  }
}

/** Other visitors' real mouse cursors, shared over Liveblocks presence. */
export default function LiveCursors() {
  return (
    <LiveblocksProvider authEndpoint={auth} throttle={50}>
      <RoomProvider id={CURSOR_ROOM} initialPresence={{ cursor: null }}>
        <Cursors />
      </RoomProvider>
    </LiveblocksProvider>
  );
}

function Cursors() {
  const update = useUpdateMyPresence();
  const others = useOthersMapped((o) => o.presence.cursor);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      update({ cursor: { x: Math.round(e.pageX - innerWidth / 2), y: Math.round(e.pageY) } });
    };
    const hide = () => update({ cursor: null });
    const onOut = (e: PointerEvent) => !e.relatedTarget && hide();
    const onVis = () => document.visibilityState !== "visible" && hide();
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("blur", hide);
    };
  }, [update]);

  // Players are numbered by join order, so a tag sticks with the same visitor.
  const shown = others
    .map(([id, cursor], i) => ({ id, cursor, tag: `P${i + 2}` }))
    .filter((o) => o.cursor)
    .slice(0, MAX_SHOWN);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 z-[5] hidden md:block">
      {shown.map(({ id, cursor, tag }) => (
        <div
          key={id}
          className="absolute top-0 left-0 flex items-start gap-1 transition-transform duration-75 ease-linear"
          style={{ transform: `translate(${cursor!.x}px, ${cursor!.y}px)` }}
        >
          <svg width="14" height="18" viewBox="0 0 7 9" shapeRendering="crispEdges">
            <path d="M0 0h1v1h1v1h1v1h1v1h1v1h1v1H4v1h1v1H3V7H2V6H1V5H0z" fill="var(--bone)" />
          </svg>
          <span className="mt-2.5 bg-signal px-1 py-px font-mono text-[10px] text-ink">{tag}</span>
        </div>
      ))}
    </div>
  );
}
