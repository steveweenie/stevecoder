import "server-only";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Level } from "./levels";
import { LEVELS } from "./levels";

/** OG image templates (OG Images.dc.html), rendered by next/og. */
export const OG_SIZE = { width: 1200, height: 630 };

const asset = (p: string) => join(process.cwd(), "assets", p);

export async function ogFonts() {
  const [dep, sat4, sat7, jb] = await Promise.all(
    ["DepartureMono-Regular.otf", "Satoshi-Regular.otf", "Satoshi-Bold.otf", "JetBrainsMono-Regular.ttf"].map((f) => readFile(asset(`og-fonts/${f}`))),
  );
  return [
    { name: "Departure", data: dep, weight: 400 as const, style: "normal" as const },
    { name: "Satoshi", data: sat4, weight: 400 as const, style: "normal" as const },
    { name: "Satoshi", data: sat7, weight: 700 as const, style: "normal" as const },
    { name: "JetBrains", data: jb, weight: 400 as const, style: "normal" as const },
  ];
}

async function dataUri(p: string) {
  return `data:image/jpeg;base64,${(await readFile(p)).toString("base64")}`;
}

const C = { ink: "#0E0F0C", bone: "#ECE8DF", signal: "#39FF14", signalLight: "#167000", dim: "#8A877F" };
const mono = { fontFamily: "JetBrains", fontSize: 18, letterSpacing: 2.16, textTransform: "uppercase" as const };
const stripes = (c: string) => `repeating-linear-gradient(135deg, transparent 0px, transparent 12px, ${c} 12px, ${c} 13px)`;

export async function HomeCard({ light = false }: { light?: boolean }) {
  const ink = light ? C.bone : C.ink;
  const bone = light ? C.ink : C.bone;
  const dim = light ? "#5F5D57" : C.dim;
  const pfp = light ? null : await dataUri(asset("pfp-gray.jpg"));
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        position: "relative",
        background: ink,
        backgroundImage: stripes(light ? "rgba(14,15,12,.07)" : "rgba(236,232,223,.06)"),
        color: bone,
        fontFamily: "Satoshi",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", ...mono, color: dim }}>
        <span>stevecoder.com</span>
        <span>{light ? "Display settings: light" : "Save file 01 / San Antonio, TX"}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Departure", fontSize: 112, lineHeight: 0.92, letterSpacing: -2.24 }}>
          <span>ABRAHAM</span>
          <span>STEVE COLINA</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 32 }}>Software engineer. Game developer. Musician.</div>
      </div>
      <div style={{ display: "flex", fontFamily: "Departure", fontSize: 20, letterSpacing: 2, color: light ? C.signalLight : C.signal }}>PRESS START</div>
      {pfp && (
        <div style={{ position: "absolute", right: 64, bottom: 56, width: 180, height: 180, border: "1px solid rgba(236,232,223,.2)", display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pfp} width={180} height={180} alt="" style={{ objectFit: "cover" }} />
        </div>
      )}
    </div>
  );
}

export async function ProjectCard({ L }: { L: Level }) {
  const still = asset(`og/${L.slug}.jpg`);
  const img = existsSync(still) ? await dataUri(still) : null;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: C.ink, color: C.bone, fontFamily: "Satoshi" }}>
      <div style={{ width: 600, padding: 64, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 24, fontFamily: "Departure", fontSize: 20, letterSpacing: 1.6 }}>
          <span style={{ color: C.signal }}>{L.num}</span>
          <span style={{ color: C.dim }}>{L.rarity}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: L.title.length > 20 ? 64 : 84, fontWeight: 700, lineHeight: 0.95, letterSpacing: -2.5 }}>{L.title}</div>
          <div style={{ marginTop: 24, fontSize: 26, lineHeight: 1.35 }}>{L.ogPitch ?? L.pitch}</div>
        </div>
        <div style={{ display: "flex", ...mono, fontSize: 16, color: C.dim }}>stevecoder.com/levels/{L.slug}</div>
      </div>
      <div
        style={{
          width: 600,
          height: 630,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderLeft: "1px solid rgba(236,232,223,.16)",
          backgroundImage: stripes("rgba(236,232,223,.08)"),
          position: "relative",
        }}
      >
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} width={600} height={630} alt="" style={{ objectFit: "cover" }} />
        ) : (
          <div style={{ display: "flex", ...mono, fontSize: 16, color: C.dim, border: "1px dashed rgba(236,232,223,.3)", padding: "12px 16px" }}>
            insert: gameplay still, 600x630 crop
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,.4) 3px, rgba(0,0,0,.4) 4px)",
          }}
        />
      </div>
    </div>
  );
}

export function CaseStudyCard({ L }: { L: Level }) {
  const i = LEVELS.indexOf(L) + 1;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: C.ink,
        color: C.bone,
        fontFamily: "Satoshi",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...mono, color: C.dim }}>
        <span>Case study</span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span>
            Level {pad(i)} / {pad(LEVELS.length)}
          </span>
          <div style={{ display: "flex", width: 200, height: 6, background: "rgba(236,232,223,.16)" }}>
            <div style={{ width: `${Math.round((i / LEVELS.length) * 100)}%`, height: "100%", background: C.signal }} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", fontFamily: "Departure", fontSize: 96, lineHeight: 0.95, letterSpacing: -1.9, maxWidth: 1000 }}>
        {L.title.toUpperCase()}
      </div>
      <div style={{ display: "flex", gap: 64, borderTop: "1px solid rgba(236,232,223,.16)", paddingTop: 24 }}>
        {L.caseStudy.results.slice(0, 3).map((r) => (
          <div key={r.k} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Departure", fontSize: 48, lineHeight: 1 }}>{r.v}</div>
            <div style={{ ...mono, fontSize: 16, color: C.dim, marginTop: 8 }}>{r.k}</div>
          </div>
        ))}
        <div style={{ display: "flex", marginLeft: "auto", alignSelf: "flex-end", ...mono, color: C.dim }}>stevecoder.com</div>
      </div>
    </div>
  );
}
