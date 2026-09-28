import type { Slot } from "./levels";

const img = (file: string, label: string): Slot => ({ src: `/images/${file}`, label: `insert: ${label}` });

/** Home page image slots. Labels are verbatim from the design file. */
export const SLOTS = {
  hero: img(
    "undead-presidents-gameplay-loop-or-guitar-photo.jpg",
    "Undead Presidents gameplay loop or guitar photo, full-bleed, darkened",
  ),
  heroMobile: img("undead-presidents-gameplay-loop-or-guitar-photo.jpg", "gameplay loop"),
  avatarPixel: img("pixel-art-avatar-512x512.png", "pixel-art avatar, 512x512"),
  devRoom: [
    img("undead-presidents-build-0-1-2024.png", "Undead Presidents build 0.1, 2024"),
    img("netcode-bloopers-clip.png", "netcode bloopers clip"),
    img("guitar-clip-vertical-1080x1920.png", "guitar clip, vertical 1080x1920"),
    img("first-hackathon-whiteboard-photo.png", "first hackathon whiteboard photo"),
  ],
} satisfies Record<string, Slot | Slot[]>;
