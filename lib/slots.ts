import type { Slot } from "./levels";

const img = (file: string, label: string): Slot => ({ src: `/images/${file}`, label: `insert: ${label}` });

/** Home page image slots. Labels are verbatim from the design file. */
export const SLOTS = {
  hero: img(
    "undead-presidents-gameplay-loop-or-guitar-photo.jpg",
    "Undead Presidents gameplay loop or guitar photo, full-bleed, darkened",
  ),
  heroMobile: img("undead-presidents-gameplay-loop-or-guitar-photo.jpg", "gameplay loop"),
  devRoom: [
    img("undead-presidents-hero-corridor-1920x1080.jpg", "Undead Presidents build 0.1, 2024"),
    img("undead-presidents-split-screen-4p-1920x1080.jpg", "netcode bloopers clip"),
    { src: "https://i.ytimg.com/vi/5KPhPEKmgEI/maxresdefault.jpg", label: "insert: Undead Presidents trailer" },
    img("tat-trick-war-room.jpg", "first hackathon whiteboard photo"),
  ],
} satisfies Record<string, Slot | Slot[]>;
