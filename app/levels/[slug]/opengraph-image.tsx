import { ImageResponse } from "next/og";
import { CaseStudyCard, OG_SIZE, ogFonts, ProjectCard } from "@/lib/og";
import { getLevel, LEVELS } from "@/lib/levels";

export const contentType = "image/png";

export function generateStaticParams() {
  return LEVELS.map((l) => ({ slug: l.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const { slug } = await params;
  const L = getLevel(slug);
  const alt = L ? `${L.title}: ${L.pitch}` : "stevecoder.com";
  return [
    { id: "project", alt, size: OG_SIZE, contentType },
    { id: "case-study", alt, size: OG_SIZE, contentType },
  ];
}

export default async function Image({ params, id }: { params: Promise<{ slug: string }>; id: Promise<string> }) {
  const [{ slug }, variant] = await Promise.all([params, id]);
  const L = getLevel(slug) ?? LEVELS[0];
  const card = variant === "case-study" ? CaseStudyCard({ L }) : await ProjectCard({ L });
  return new ImageResponse(card, { ...OG_SIZE, fonts: await ogFonts() });
}
