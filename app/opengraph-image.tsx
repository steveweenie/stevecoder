import { ImageResponse } from "next/og";
import { HomeCard, OG_SIZE, ogFonts } from "@/lib/og";

export const alt = 'Abraham Steve Colina. Software engineer. Game developer. Musician.';
export const contentType = "image/png";

export function generateImageMetadata() {
  return [
    { id: "dark", alt, size: OG_SIZE, contentType },
    { id: "light", alt, size: OG_SIZE, contentType },
  ];
}

export default async function Image({ id }: { id: Promise<string> }) {
  const variant = await id;
  return new ImageResponse(await HomeCard({ light: variant === "light" }), { ...OG_SIZE, fonts: await ogFonts() });
}
