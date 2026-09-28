import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Progress } from "@/components/case/Progress";
import { Go } from "@/components/home/LevelSelect";
import { Segs, Slot } from "@/components/ui";
import { getLevel, LEVELS, nextLevel } from "@/lib/levels";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEVELS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/levels/[slug]">): Promise<Metadata> {
  const L = getLevel((await params).slug);
  if (!L) return {};
  return {
    title: L.title,
    description: L.caseStudy.lede,
    openGraph: { title: L.title, description: L.caseStudy.lede, url: `/levels/${L.slug}` },
  };
}

const CHAPTERS = [
  ["01", "The problem"],
  ["02", "Architecture"],
  ["03", "Boss fights"],
  ["04", "Gallery"],
  ["05", "Results"],
] as const;

function ChapterHead({ num, title, meta }: { num: string; title: string; meta?: string }) {
  return (
    <div className="font-pixel mb-6 flex gap-4 text-[12px] tracking-[.08em]">
      <span className="text-signal">{num}</span>
      <h2 className="m-0 text-[12px] font-normal tracking-[.1em]">{title}</h2>
      {meta && <span className="ml-auto font-mono text-[11px] tracking-[.12em] text-dim">{meta}</span>}
    </div>
  );
}

const tile = "flex items-center justify-center bg-ink p-4 text-center";
const tileLabel = (label: string) => (
  <span className="meta text-[10px]" aria-hidden="true">
    {label}
  </span>
);

export default async function CaseStudy({ params }: PageProps<"/levels/[slug]">) {
  const L = getLevel((await params).slug);
  if (!L) notFound();
  const cs = L.caseStudy;
  const next = nextLevel(L.slug);
  const index = LEVELS.indexOf(L) + 1;
  const hot = L.primary?.hot;
  const g = cs.gallery;

  return (
    <div className="min-h-screen bg-ink text-bone">
      <header className="sticky top-0 z-40 flex h-12 items-center gap-4 border-b border-line bg-ink px-4 font-mono text-[11px] uppercase tracking-[.08em] md:gap-6 md:px-6">
        <Link href="/" className="font-pixel text-[13px] normal-case tracking-normal max-md:hidden">
          STEVE.COLINA
        </Link>
        <Link href="/#levels" className="text-dim">
          ← Level Select
        </Link>
        <div className="ml-auto flex items-center gap-2 text-dim">
          <span>
            Level {String(index).padStart(2, "0")} / {String(LEVELS.length).padStart(2, "0")}
          </span>
          <Progress />
        </div>
      </header>

      <main>
        {/* LEVEL START */}
        <section data-screen-label="Level start" className="relative grid min-h-[80vh] content-end overflow-hidden px-4 pb-12 pt-24 md:px-6">
          <Slot
            slot={cs.hero}
            priority
            className="scanlines absolute inset-0 flex items-start justify-end p-4 md:p-6"
            imgClassName="hero-media-soft"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "repeating-linear-gradient(0deg,transparent 0 2px,rgba(0,0,0,.35) 2px 3px)" }}
          />
          <div className="relative mx-auto w-full max-w-[1440px]">
            <div className="font-pixel mb-6 flex gap-4 text-[12px] tracking-[.08em]">
              <span className="text-signal">{L.num}</span>
              <span className="text-dim">{L.rarity}</span>
              <span className="text-dim">{L.type.toUpperCase()}</span>
            </div>
            <h1 className="font-pixel m-0 text-[clamp(2.5rem,8vw,8rem)] font-normal leading-[.95] tracking-[-.02em] [overflow-wrap:anywhere]">
              {L.display.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="m-0 mt-6 max-w-[44ch] text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.4]">{cs.lede}</p>
            <dl className="m-0 mt-12 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6 border-t border-line pt-6 text-[15px]">
              {(
                [
                  ["Role", cs.meta.role],
                  ["Timeline", cs.meta.timeline],
                  ["Stack", cs.meta.stack],
                  ["Status", cs.meta.status],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <dt className="meta">{k}</dt>
                  <dd className="m-0 mt-1.5" style={k === "Status" && cs.meta.statusOk ? { color: "var(--ok)" } : undefined}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[.12em]">
              {L.primary && !L.primary.href.startsWith(`/levels/${L.slug}`) && (
                <Go
                  href={L.primary.href}
                  className="border px-4 py-3 hover:!border-bone hover:!bg-bone hover:!text-ink"
                  style={{
                    background: hot ? "var(--signal)" : "transparent",
                    color: hot ? "var(--ink)" : "var(--bone)",
                    borderColor: hot ? "var(--signal)" : "var(--bone)",
                  }}
                >
                  {L.primary.label}
                </Go>
              )}
              {L.source && (
                <Go href={L.source} className="border border-line px-4 py-3 hover:border-bone">
                  Source
                </Go>
              )}
            </div>
          </div>
        </section>

        {/* CHAPTERS */}
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:grid-cols-[200px_minmax(0,1fr)] md:px-6">
          <nav aria-label="Chapters" className="sticky top-[72px] hidden gap-3 self-start pt-24 font-mono text-[11px] uppercase tracking-[.12em] md:grid">
            {CHAPTERS.map(([num, label], i) => (
              <a key={num} href={`#c${i + 1}`} className="flex gap-3 text-dim">
                <span className="text-signal">{num}</span>
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <div className="min-w-0">
            <section id="c1" data-screen-label="Chapter 1" className="scroll-mt-12 border-b border-line pb-12 pt-16 md:pt-24">
              <ChapterHead num="01" title="THE PROBLEM" />
              <p className="m-0 max-w-[34ch] text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-[1.3] [text-wrap:pretty]">{cs.problem.lead}</p>
              <p className="m-0 mt-6 max-w-[60ch] text-[1.05rem] leading-[1.55] text-dim">{cs.problem.body}</p>
            </section>

            <section id="c2" data-screen-label="Chapter 2" className="scroll-mt-12 border-b border-line py-12">
              <ChapterHead num="02" title="ARCHITECTURE" />
              <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                <Slot
                  slot={cs.architecture.diagram}
                  sizes="(max-width: 767px) 100vw, 40vw"
                  className="stripes flex aspect-[4/3] items-center justify-center border border-dashed border-line p-4 text-center"
                  imgClassName="!object-contain"
                >
                  {tileLabel(cs.architecture.diagram.label)}
                </Slot>
                <div className="grid content-center gap-4 text-[15px] leading-[1.55]">
                  {cs.architecture.bullets.map((b) => (
                    <div key={b} className="flex gap-3">
                      <span className="font-mono text-signal" aria-hidden="true">
                        &gt;
                      </span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              {cs.architecture.code && (
                <pre className="m-0 mt-6 overflow-auto whitespace-pre-wrap border border-line px-5 py-4 font-mono text-[12px] leading-[1.7] text-dim">
                  <span className="text-signal">{cs.architecture.code.comment}</span>
                  {cs.architecture.code.line && (
                    <>
                      {"\n"}
                      {cs.architecture.code.line}
                    </>
                  )}
                </pre>
              )}
            </section>

            <section id="c3" data-screen-label="Chapter 3" className="scroll-mt-12 border-b border-line py-12">
              <ChapterHead num="03" title="BOSS FIGHTS" meta="hard problems" />
              {cs.bosses.map((b) => (
                <div key={b.name} className="grid gap-6 border-t border-hair py-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-pixel m-0 text-[14px] font-normal">{b.name}</h3>
                    <Segs n={b.hp} total={10} className="my-3 max-w-60" />
                    <div className="meta">{b.status}</div>
                  </div>
                  <div className="text-[15px] leading-[1.55]">{b.text}</div>
                </div>
              ))}
            </section>

            <section id="c4" data-screen-label="Chapter 4" className="scroll-mt-12 border-b border-line py-12">
              <ChapterHead num="04" title="GALLERY" />
              <div className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-6">
                <Slot slot={g[0]} sizes="(max-width: 767px) 100vw, 60vw" className={`${tile} col-span-2 aspect-video md:col-span-4`}>
                  {tileLabel(g[0].label)}
                </Slot>
                <Slot slot={g[1]} sizes="(max-width: 767px) 100vw, 30vw" className={`${tile} col-span-2 max-md:aspect-video`}>
                  {tileLabel(g[1].label)}
                </Slot>
                {g.slice(2).map((s, i) => (
                  <Slot
                    key={s.src}
                    slot={s}
                    sizes="(max-width: 767px) 50vw, 30vw"
                    className={`${tile} aspect-[4/3] md:col-span-2 ${i === 2 ? "max-md:col-span-2" : ""}`}
                  >
                    {tileLabel(s.label)}
                  </Slot>
                ))}
              </div>
            </section>

            <section id="c5" data-screen-label="Chapter 5" className="scroll-mt-12 pb-24 pt-12">
              <ChapterHead num="05" title="RESULTS" />
              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-6">
                {cs.results.map((r) => (
                  <div key={r.k}>
                    <div className="font-pixel text-[clamp(2rem,4vw,3.5rem)] leading-none" style={r.signal ? { color: "var(--signal)" } : undefined}>
                      {r.v}
                    </div>
                    <div className="meta mt-2">{r.k}</div>
                  </div>
                ))}
              </div>
              <p className="m-0 mt-12 max-w-[60ch] text-[1.05rem] leading-[1.55] text-dim">{cs.outro}</p>
            </section>
          </div>
        </div>

        {/* LEVEL COMPLETE */}
        <section data-screen-label="Level complete" className="border-t border-line px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto grid max-w-[1440px] items-end gap-12 md:grid-cols-2">
            <div>
              <div className="font-pixel text-[clamp(2rem,5vw,4rem)] leading-none">
                LEVEL
                <br />
                COMPLETE
              </div>
              <div className="meta mt-4">★ ★ ★ · all chapters read</div>
            </div>
            <Link href={`/levels/${next.slug}`} className="grid justify-items-start gap-3 border border-line p-6 hover:border-bone">
              <span className="meta">Next level →</span>
              <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-.02em]">{next.title}</span>
              <span className="font-pixel text-[11px] text-dim">
                {next.num} · {next.rarity}
              </span>
            </Link>
          </div>
        </section>
      </main>
      <footer className="meta border-t border-line p-6 text-center">Thanks for playing.</footer>
    </div>
  );
}
