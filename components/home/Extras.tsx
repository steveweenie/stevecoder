"use client";

import dynamic from "next/dynamic";
import { useGame } from "../game/GameProvider";
import { cx, Icon, SectionHeader, Slot } from "../ui";
import { SITE } from "@/lib/site";
import { SLOTS } from "@/lib/slots";

/** Other visitors' real cursors. Liveblocks only loads in the browser, after hydration. */
export const LiveCursors = dynamic(() => import("./LiveCursors"), { ssr: false });

export function DevRoom() {
  const { theme } = useGame();
  if (theme !== "devroom") return null;
  return (
    <section
      id="devroom"
      data-screen-label="Dev Room"
      className="mx-auto max-w-[1440px] scroll-mt-12 border-t-2 border-dashed border-signal px-4 py-8 md:px-6 md:py-24"
    >
      <SectionHeader num="??" title="DEV ROOM" meta="hidden · you found it" className="mb-6" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-px border border-line bg-line">
        {SLOTS.devRoom.map((s) => (
          <Slot key={s.src} slot={s} sizes="(max-width: 767px) 100vw, 25vw" className="flex aspect-[4/3] items-center justify-center bg-ink p-4 text-center">
            <span className="meta text-[10px]" aria-hidden="true">
              {s.label}
            </span>
          </Slot>
        ))}
      </div>
    </section>
  );
}

const SUN =
  "M6 0h1v2H6zM2 2h1v1H2zM10 2h1v1H10zM5 3h3v1H5zM4 4h5v1H4zM3 5h7v3H3zM0 6h2v1H0zM11 6h2v1H11zM4 8h5v1H4zM5 9h3v1H5zM2 10h1v1H2zM10 10h1v1H10zM6 11h1v2H6z";
const MOON = "M4 1h1v1H4zM3 2h2v1H3zM2 3h3v1H2zM1 4h4v3H1zM1 7h5v1H1zM1 8h7v1H1zM2 9h9v1H2zM3 10h7v1H3zM4 11h5v1H4z";
const EXIT =
  "M1 1h2v1H1zM10 1h2v1H10zM2 2h2v1H2zM9 2h2v1H9zM3 3h2v1H3zM8 3h2v1H8zM4 4h2v1H4zM7 4h2v1H7zM5 5h3v2H5zM4 7h2v1H4zM7 7h2v1H7zM3 8h2v1H3zM8 8h2v1H8zM2 9h2v1H2zM9 9h2v1H9zM1 10h2v1H1zM10 10h2v1H10z";

function PixelIcon({ d, className }: { d: string; className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 13 13" shapeRendering="crispEdges" aria-hidden="true" className={className}>
      <path d={d} fill="currentColor" />
    </svg>
  );
}

/** Sun in light mode, moon in dark, an X in the dev room; clicking wipes the next theme in from the button. */
function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useGame();
  const light = theme === "light";
  const dev = theme === "devroom";
  const label = dev ? "Exit dev room" : light ? "Switch to dark mode" : "Switch to light mode";
  const icon = "absolute transition-[opacity,rotate,scale] duration-500 ease-[var(--ease-out)]";
  const shown = "rotate-0 scale-100 opacity-100";
  return (
    <button
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={label}
      title={dev ? label : light ? "Dark mode" : "Light mode"}
      className={cx("relative grid size-11 place-items-center border border-line hover:border-signal hover:text-signal md:size-10", className)}
    >
      <PixelIcon d={SUN} className={cx(icon, light ? shown : "-rotate-90 scale-50 opacity-0")} />
      <PixelIcon d={MOON} className={cx(icon, !light && !dev ? shown : "rotate-90 scale-50 opacity-0")} />
      <PixelIcon d={EXIT} className={cx(icon, dev ? shown : "rotate-45 scale-50 opacity-0")} />
    </button>
  );
}

export function Footer() {
  const socials: [string, string, string][] = [
    ["GitHub", "github", SITE.links.github],
    ["LinkedIn", "linkedin", SITE.links.linkedin],
    ["YouTube", "youtube", SITE.links.youtube],
    ["Steam", "steam", SITE.links.steam],
  ];
  return (
    <footer className="mx-auto grid max-w-[1440px] items-end gap-6 border-t border-line px-4 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:px-6 md:py-12">
      <div>
        <div className="font-pixel text-[20px] leading-none md:text-[clamp(1.5rem,3vw,2.5rem)]">Thanks for playing.</div>
        <div className="meta mt-4">psst. try the Konami code</div>
      </div>
      <div className="grid gap-3 md:justify-items-end md:text-right">
        <div className="flex gap-4">
          {socials.map(([label, icon, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="max-md:p-3.5 max-md:first:-ml-3.5">
              <Icon name={icon} size={16} />
            </a>
          ))}
        </div>
        <ThemeToggle className="justify-self-start md:justify-self-end" />
        <div className="font-mono text-[11px] text-dim">Built with Next.js. Hosted on Vercel.</div>
      </div>
    </footer>
  );
}
