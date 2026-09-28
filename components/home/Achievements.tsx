import { SectionHeader, Segs } from "../ui";
import { ACHIEVEMENTS, GUILDS } from "@/lib/content";

export function Achievements() {
  const unlocked = ACHIEVEMENTS.filter(([t]) => t !== "???").length;
  return (
    <section id="achievements" data-screen-label="Achievements" className="mx-auto max-w-[1440px] scroll-mt-12 px-4 py-8 md:px-6 md:py-24">
      <SectionHeader num="04" title="ACHIEVEMENTS" meta={`${unlocked} unlocked`} className="mb-6" />
      <div className="grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <ul className="m-0 list-none p-0">
            {ACHIEVEMENTS.map(([title, date], i) => {
              const locked = title === "???";
              return (
                <li
                  key={i}
                  className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-4 border-b border-hair py-3"
                  style={{ color: locked ? "var(--dim)" : "var(--bone)" }}
                >
                  <span className="font-pixel text-[12px]" aria-hidden="true">
                    {locked ? "?" : "★"}
                  </span>
                  <span className="text-[15px]">{locked ? <span aria-label="Locked achievement">???</span> : title}</span>
                  <span className="font-mono text-[11px] text-dim">{date}</span>
                </li>
              );
            })}
          </ul>
          <div className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-4 pt-4">
            <span className="font-pixel text-[12px] text-signal" aria-hidden="true">
              …
            </span>
            <span className="text-[15px]">
              Ship a Steam Game
              <Segs n={8} total={12} className="mt-2 max-w-80" />
            </span>
            <span className="font-mono text-[11px] text-dim">in progress · 70%</span>
          </div>
        </div>
        <div>
          <div className="meta mb-3">Guilds</div>
          <div className="font-pixel flex flex-wrap gap-x-6 gap-y-2 text-[13px] leading-[1.8]">
            {GUILDS.map((g) => (
              <span key={g}>{g}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
