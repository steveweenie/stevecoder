import Image from "next/image";
import type { ReactNode } from "react";
import { Icon, SectionHeader } from "../ui";
import {
  fmt,
  getGitHub,
  getNowPlaying,
  getSteam,
  getYouTube,
  type Feed,
  type GitHubData,
  type NowPlayingData,
  type SteamData,
  type YouTubeData,
} from "@/lib/feeds";
import { SITE } from "@/lib/site";

type W<T> = Feed<T> | { state: "loading" };

const tint = (pct: number) => `color-mix(in srgb, var(--signal) ${pct}%, transparent)`;
const HEAT = ["var(--hair)", tint(30), tint(55), tint(80), "var(--signal)"];
const DOT = { live: "var(--ok)", loading: "var(--dim)", offline: "var(--signal)" };

function Panel({ span, className = "", children }: { span: 2 | 3 | 4; className?: string; children: ReactNode }) {
  const spans = { 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4" };
  return <div className={`col-span-6 flex min-w-0 flex-col gap-4 bg-ink p-6 ${spans[span]} ${className}`}>{children}</div>;
}

function PanelHead({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <div className="meta flex items-center gap-2">
      <Icon name={icon} size={12} />
      {children}
    </div>
  );
}

function Loading({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[12px] text-dim">
      {children}
      <span className="animate-blink">_</span>
    </div>
  );
}

const Note = ({ children }: { children: ReactNode }) => <div className="font-mono text-[12px] text-dim">{children}</div>;

function Placeholder({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`flex flex-none items-center justify-center border border-dashed border-line text-center font-mono text-dim ${className}`} aria-hidden="true">
      {children}
    </div>
  );
}

function GitHub({ w }: { w: W<GitHubData> }) {
  return (
    <Panel span={4}>
      <PanelHead icon="github">
        <span>GitHub</span>
        <span className="ml-auto" style={{ color: DOT[w.state] }}>
          ● {w.state}
        </span>
      </PanelHead>
      {w.state === "live" && (
        <>
          <div className="grid grid-cols-[repeat(52,minmax(0,1fr))] gap-0.5" role="img" aria-label="Weekly contribution heatmap, last 52 weeks">
            {w.data.heat.map((h, i) => (
              <span key={i} className="aspect-square" style={{ background: HEAT[h] }} />
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-12">
            <div>
              <div className="font-pixel text-[2rem] leading-none">{fmt.int(w.data.total)}</div>
              <div className="meta mt-1.5">contributions</div>
            </div>
            {w.data.commit && (
              <a href={w.data.commit.url} target="_blank" rel="noopener noreferrer" className="min-w-0 font-mono text-[12px]">
                <span className="text-signal">{w.data.commit.sha}</span> {w.data.commit.message}
                <div className="mt-1 text-dim">
                  {w.data.commit.repo} · {w.data.commit.ago}
                </div>
              </a>
            )}
          </div>
        </>
      )}
      {w.state === "loading" && <Loading>Loading commits</Loading>}
      {w.state === "offline" && <Note>GitHub API unreachable. The code still exists, promise.</Note>}
    </Panel>
  );
}

function NowPlaying({ w }: { w: W<NowPlayingData> }) {
  const d = w.state === "live" ? w.data : null;
  return (
    <Panel span={2}>
      <PanelHead icon="lastdotfm">
        <span>Now playing</span>
      </PanelHead>
      {w.state === "loading" && <Loading>Loading tracks</Loading>}
      {w.state === "offline" && <Note>Last.fm is quiet. Silence is also a genre.</Note>}
      {d && (
        <a href={d.url ?? "#"} target={d.url ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4">
          {d.art ? (
            <Image src={d.art} alt={`${d.track} album art`} width={72} height={72} className="size-[72px] flex-none object-cover" />
          ) : (
            <Placeholder className="stripes-sm size-[72px] text-[9px]">album art</Placeholder>
          )}
          <div className="min-w-0">
            <div className="truncate font-medium">{d.track}</div>
            <div className="text-[14px] text-dim">{d.artist}</div>
            {d.nowPlaying ? (
              <div className="mt-2 flex h-4 items-end gap-[3px]" aria-label="Playing now">
                {["eq1 .6s", "eq2 .7s", "eq3 .5s", "eq1 .8s"].map((a) => (
                  <span key={a} className="w-1 bg-signal" style={{ animation: `${a} steps(3) infinite` }} />
                ))}
              </div>
            ) : (
              <div className="mt-2 font-mono text-[11px] text-dim">Last played {d.ago ?? "a while ago"}</div>
            )}
          </div>
        </a>
      )}
    </Panel>
  );
}

function YouTube({ w }: { w: W<YouTubeData> }) {
  const d = w.state === "live" ? w.data : null;
  return (
    <Panel span={3} className="!grid grid-cols-2">
      <div className="meta col-span-2 flex items-center gap-2">
        <Icon name="youtube" size={12} />
        <span>Guitar Gatekeeper</span>
        <a href={SITE.links.youtubeSubscribe} target="_blank" rel="noopener noreferrer" className="ml-auto text-signal">
          Subscribe →
        </a>
      </div>
      {w.state === "loading" && (
        <div className="col-span-2">
          <Loading>Loading videos</Loading>
        </div>
      )}
      {w.state === "offline" && (
        <div className="col-span-2">
          <Note>YouTube isn&apos;t answering. The riffs are still up there.</Note>
        </div>
      )}
      {d && (
        <>
          <a href={d.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch: ${d.title}`} className="relative block aspect-video">
            {d.thumb ? (
              <Image src={d.thumb} alt={`Thumbnail: ${d.title}`} fill sizes="(max-width: 767px) 50vw, 25vw" className="object-cover" />
            ) : (
              <Placeholder className="stripes-md size-full p-2 text-[10px] uppercase tracking-[.1em]">latest video thumbnail 1280x720</Placeholder>
            )}
          </a>
          <div className="flex flex-col justify-center gap-3">
            <div>
              <div className="font-pixel text-[1.5rem] leading-none">{fmt.int(d.subscribers)}</div>
              <div className="meta mt-1">subscribers</div>
            </div>
            <div>
              <div className="font-pixel text-[1.5rem] leading-none">{fmt.compact(d.views)}</div>
              <div className="meta mt-1">views</div>
            </div>
          </div>
          <a href={d.url} target="_blank" rel="noopener noreferrer" className="col-span-2 text-[14px]">
            {d.title}
          </a>
        </>
      )}
    </Panel>
  );
}

function Steam({ w }: { w: W<SteamData> }) {
  const d = w.state === "live" ? w.data : null;
  return (
    <Panel span={3}>
      <PanelHead icon="steam">
        <span>Steam</span>
        {d && <span className="ml-auto">{fmt.int(d.totalHours)} hrs total</span>}
      </PanelHead>
      {w.state === "loading" && <Loading>Loading library</Loading>}
      {w.state === "offline" && <Note>Steam is offline. So, probably, am I.</Note>}
      {d && (
        <>
          {d.current && (
            <div className="flex gap-4">
              {d.current.cover ? (
                <Image src={d.current.cover} alt={`${d.current.name} cover`} width={96} height={45} className="h-[45px] w-24 flex-none object-cover" />
              ) : (
                <Placeholder className="stripes-sm h-[45px] w-24 text-[9px]">cover</Placeholder>
              )}
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[.12em]" style={{ color: d.current.playing ? "var(--ok)" : "var(--dim)" }}>
                  {d.current.playing ? "Playing now" : "Last played"}
                </div>
                <div className="mt-1 font-medium">{d.current.name}</div>
              </div>
            </div>
          )}
          <div className="grid gap-1.5 font-mono text-[12px] text-dim">
            {d.recent.map((g) => (
              <div key={g.name} className="flex justify-between gap-4">
                <span>{g.name}</span>
                <span className="flex-none">{g.hours} h</span>
              </div>
            ))}
          </div>
        </>
      )}
    </Panel>
  );
}

export function SideQuestsView({
  github,
  np,
  yt,
  steam,
}: {
  github: W<GitHubData>;
  np: W<NowPlayingData>;
  yt: W<YouTubeData>;
  steam: W<SteamData>;
}) {
  const states = [github.state, np.state, yt.state, steam.state];
  const label = states.includes("loading") ? "loading" : states.includes("live") ? "live" : "offline";
  return (
    <section id="feeds" data-screen-label="Side Quests" className="mx-auto max-w-[1440px] scroll-mt-12 px-4 py-8 md:px-6 md:py-24">
      <SectionHeader num="07" title="SIDE QUESTS" meta={`live feeds · ${label}`} className="mb-6" />
      <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-6 gap-px border border-line bg-line">
        <GitHub w={github} />
        <NowPlaying w={np} />
        <YouTube w={yt} />
        <Steam w={steam} />
      </div>
    </section>
  );
}

export async function SideQuests() {
  const [github, np, yt, steam] = await Promise.all([getGitHub(), getNowPlaying(), getYouTube(), getSteam()]);
  return <SideQuestsView github={github} np={np} yt={yt} steam={steam} />;
}

export function SideQuestsLoading() {
  const l = { state: "loading" } as const;
  return <SideQuestsView github={l} np={l} yt={l} steam={l} />;
}
