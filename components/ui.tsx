import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Slot as SlotData } from "@/lib/levels";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/**
 * Image slot. Renders the design's labeled placeholder underneath and the
 * next/image on top; placeholder files are transparent, so the label shows
 * until a real image replaces the file.
 */
export function Slot({
  slot,
  className,
  style,
  imgClassName,
  imgStyle,
  sizes = "100vw",
  priority,
  quality,
  children,
}: {
  slot: SlotData;
  className?: string;
  style?: CSSProperties;
  imgClassName?: string;
  imgStyle?: CSSProperties;
  sizes?: string;
  /** Preload with high fetch priority (LCP images). */
  priority?: boolean;
  quality?: number;
  children?: ReactNode;
}) {
  return (
    <div className={cx(!/\b(absolute|fixed)\b/.test(className ?? "") && "relative", "overflow-hidden", className)} style={style}>
      {children ?? <SlotLabel>{slot.label}</SlotLabel>}
      <Image
        src={slot.src}
        alt={slot.label}
        fill
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : undefined}
        quality={quality}
        className={cx("object-cover", imgClassName)}
        style={imgStyle}
      />
    </div>
  );
}

/** Dashed "insert: …" label. */
export function SlotLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx("meta border border-dashed border-line px-3 py-2 text-center", className)} aria-hidden="true">
      {children}
    </span>
  );
}

/** Monochrome brand icon from /public/icons, tinted with currentColor. */
export function Icon({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("icon-mask", className)}
      style={{ width: size, height: size, ["--icon" as string]: `url(/icons/${name}.svg)` }}
    />
  );
}

/** Segmented stat bar: fill = signal, empty = line. */
export function Segs({ n, total, h = 6, gap = 3, className }: { n: number; total: number; h?: number; gap?: number; className?: string }) {
  return (
    <div className={cx("flex", className)} style={{ gap }} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className="flex-1" style={{ height: h, background: i < n ? "var(--signal)" : "var(--line)" }} />
      ))}
    </div>
  );
}

/** Numbered section header: "02 QUEST LOG ........ meta". */
export function SectionHeader({
  num,
  title,
  meta,
  className,
  children,
}: {
  num: string;
  title: string;
  meta?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex items-baseline gap-3 border-b border-line pb-2 md:gap-4 md:pb-3",
        className,
      )}
    >
      <span className="font-pixel text-[11px] text-signal md:text-[12px]">{num}</span>
      <h2 className="font-pixel m-0 text-[11px] font-normal md:text-[14px] md:tracking-[.1em]">{title}</h2>
      {meta && <span className="meta ml-auto hidden md:inline">{meta}</span>}
      {children}
    </div>
  );
}

/** Corner brackets used on featured frames and panels. */
export function Brackets({ size = 12, weight = 2, offset = 0, color = "var(--bone)", corners = "all" }: { size?: number; weight?: number; offset?: number; color?: string; corners?: "all" | "diag" }) {
  const b = `${weight}px solid ${color}`;
  const s = { position: "absolute", width: size, height: size } as const;
  return (
    <>
      <span aria-hidden="true" style={{ ...s, top: -offset, left: -offset, borderTop: b, borderLeft: b }} />
      {corners === "all" && <span aria-hidden="true" style={{ ...s, top: -offset, right: -offset, borderTop: b, borderRight: b }} />}
      {corners === "all" && <span aria-hidden="true" style={{ ...s, bottom: -offset, left: -offset, borderBottom: b, borderLeft: b }} />}
      <span aria-hidden="true" style={{ ...s, bottom: -offset, right: -offset, borderBottom: b, borderRight: b }} />
    </>
  );
}
