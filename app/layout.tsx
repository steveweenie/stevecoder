import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GameProvider } from "@/components/game/GameProvider";
import { getWeather } from "@/lib/feeds";
import { SITE } from "@/lib/site";
import "./globals.css";

// Departure Mono replaces the Silkscreen stand-in used in the design files.
const departure = localFont({
  src: "../public/fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure",
  display: "swap",
});
const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});
const jetbrains = localFont({
  src: "../public/fonts/JetBrainsMono-Regular.woff2",
  weight: "400",
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { type: "website", siteName: "stevecoder.com", title: SITE.name, description: SITE.description, url: SITE.url },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0E0F0C", colorScheme: "dark light" };

// Runs before paint: stored theme, and skip the boot overlay if it already ran this session.
const PRE_PAINT = `(function(){try{var d=document.documentElement,t=localStorage.getItem('theme');if(t==='light'||t==='devroom')d.dataset.theme=t;if(sessionStorage.getItem('booted'))d.setAttribute('data-booted','')}catch(e){}})()`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const weather = await getWeather();
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${departure.variable} ${satoshi.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
      </head>
      <body>
        <GameProvider weather={weather.state === "live" ? weather.data : null}>{children}</GameProvider>
      </body>
    </html>
  );
}
