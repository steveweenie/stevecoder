import Image from "next/image";
import { Brackets, SectionHeader, Segs } from "../ui";
import { STATS } from "@/lib/content";

const photoStyle = { filter: "grayscale(1) contrast(1.1)" };

export function Continue() {
  return (
    <section id="continue" data-screen-label="Continue" className="mx-auto max-w-[1440px] scroll-mt-12 px-4 py-8 md:px-6 md:py-24">
      <SectionHeader num="01" title="CONTINUE" meta="player profile" className="mb-6 md:mb-12" />

      {/* Desktop */}
      <div className="hidden grid-cols-[minmax(240px,2fr)_minmax(0,3fr)] gap-12 md:grid">
        <div>
          <div className="relative aspect-square max-w-[420px] overflow-hidden border border-line bg-ink">
            <Image src="/images/pfp.jpg" alt="Steve Colina headshot" fill sizes="420px" className="object-cover" style={photoStyle} />
            <Brackets />
          </div>
        </div>
        <div className="min-w-0">
          <dl className="m-0 grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-3 text-[15px]">
            <dt className="meta pt-[3px]">Class</dt>
            <dd className="m-0">Full Stack Dev / Game Dev</dd>
            <dt className="meta pt-[3px]">Home</dt>
            <dd className="m-0">San Antonio, TX</dd>
            <dt className="meta pt-[3px]">Guild</dt>
            <dd className="m-0">UTSA, B.S. Computer Science, class of 2027</dd>
          </dl>
          <div className="my-12 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6 border-t border-line pt-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-pixel text-[clamp(1.75rem,3vw,2.5rem)] leading-none text-bone">{s.value}</div>
                <div className="meta my-2">{s.label}</div>
                <Segs n={s.fill} total={10} />
              </div>
            ))}
          </div>
          <p className="m-0 max-w-[52ch] text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.45] [text-wrap:pretty]">
            I build full stack apps by day, multiplayer games by night, and make music somewhere in between. Right now I&apos;m
            shipping software at Y&amp;L Consulting and running tech for Aloha Table Tennis.
          </p>
        </div>
      </div>

      {/* Mobile (390px layout) */}
      <div className="md:hidden">
        <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4">
          <div className="relative aspect-square overflow-hidden border border-line">
            <Image src="/images/pfp.jpg" alt="Steve Colina headshot" fill sizes="120px" className="object-cover" style={photoStyle} />
          </div>
          <dl className="m-0 grid content-center gap-2 text-[13px]">
            <div>
              <dt className="meta text-[10px]">Class</dt>
              <dd className="m-0 mt-0.5">Full Stack / Game Dev</dd>
            </div>
            <div>
              <dt className="meta text-[10px]">Guild</dt>
              <dd className="m-0 mt-0.5">UTSA CS &apos;27</dd>
            </div>
          </dl>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {STATS.filter((s) => s.mobile).map((s) => (
            <div key={s.label}>
              <div className="font-pixel text-[24px]">{s.value}</div>
              <div className="meta mb-1.5 mt-1 text-[10px]">{s.label}</div>
              <Segs n={s.mobile!} total={5} h={5} gap={2} />
            </div>
          ))}
        </div>
        <p className="m-0 mt-6 text-[16px] leading-[1.45]">
          I build full stack apps by day, multiplayer games by night, and make music somewhere in between.
        </p>
      </div>
    </section>
  );
}
