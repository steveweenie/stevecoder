import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Progress } from "@/components/case/Progress";
import { Go } from "@/components/home/LevelSelect";
import { Slot } from "@/components/ui";
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

function ChapterHead({ num, title, meta }: { num: string; title: string; meta?: string }) {
  return (
    <div className="font-pixel mb-6 flex gap-4 text-[12px] tracking-[.08em]">
      <span className="text-signal">{num}</span>
      <h2 className="m-0 text-[12px] font-normal tracking-[.1em]">{title}</h2>
      {meta && <span className="ml-auto font-mono text-[11px] tracking-[.12em] text-dim">{meta}</span>}
    </div>
  );
}

export default async function CaseStudy({ params }: PageProps<"/levels/[slug]">) {
  const L = getLevel((await params).slug);
  if (!L) notFound();
  const cs = L.caseStudy;
  const next = nextLevel(L.slug);
  const index = LEVELS.indexOf(L) + 1;
  const hot = L.primary?.hot;

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

        <div className="mx-auto grid max-w-[1440px] px-4 md:px-6">
          <section data-screen-label="Briefing" className="grid gap-12 border-b border-line pb-12 pt-16 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:pt-24">
            <div>
              <ChapterHead num="01" title="BRIEFING" />
              {cs.about.map((p, i) => (
                <p
                  key={i}
                  className={i === 0 ? "m-0 max-w-[40ch] text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-[1.35] [text-wrap:pretty]" : "m-0 mt-6 max-w-[60ch] text-[1.05rem] leading-[1.55] text-dim"}
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-2 content-start gap-x-6 gap-y-8 md:pt-12">
              {cs.results.map((r) => (
                <div key={r.k}>
                  <div className="font-pixel text-[clamp(2rem,4vw,3rem)] leading-none" style={r.signal ? { color: "var(--signal)" } : undefined}>
                    {r.v}
                  </div>
                  <div className="meta mt-2">{r.k}</div>
                </div>
              ))}
            </div>
          </section>

          {cs.videos && (
            <section data-screen-label="Footage" className="border-b border-line py-12">
              <ChapterHead num="02" title="FOOTAGE" meta={`${cs.videos.length} videos`} />
              <div className="grid gap-4 md:grid-cols-2">
                {cs.videos.map((v) => (
                  <iframe
                    key={v.id}
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="aspect-video w-full border border-line"
                  />
                ))}
              </div>
            </section>
          )}

          <section data-screen-label="Gallery" className="pb-24 pt-12">
            <ChapterHead num={cs.videos ? "03" : "02"} title="GALLERY" meta={`${cs.gallery.length} shots`} />
            <div className={cs.gallery.length > 1 ? "gap-4 md:columns-2" : undefined}>
              {cs.gallery.map((s) => (
                <figure key={s.src} className="m-0 mb-4 break-inside-avoid border border-line">
                  <Image src={s.src} alt={s.label} width={s.w} height={s.h} sizes="(max-width: 767px) 100vw, 50vw" className="block h-auto w-full" />
                  <figcaption className="meta border-t border-line px-3 py-2">{s.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
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
              <div className="meta mt-4">★ ★ ★ · level cleared</div>
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
