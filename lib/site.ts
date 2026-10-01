export const SITE = {
  url: "https://stevecoder.com",
  name: "Abraham Steve Colina",
  description: "Software engineer. Game developer. Musician.",
  email: "stevetheprogramminglover@gmail.com",
  resume: "/resume.pdf",
  resumeDownloadName: "steve-colina-resume.pdf",
  links: {
    github: "https://github.com/steveweenie",
    linkedin: "https://www.linkedin.com/in/abrahamstevecolina/",
    youtube: "https://www.youtube.com/@guitargatekeeper",
    youtubeSubscribe: "https://www.youtube.com/@guitargatekeeper?sub_confirmation=1",
    steamGame: "https://store.steampowered.com/app/3517560/Undead_Presidents",
    steam: "https://store.steampowered.com/app/3517560/Undead_Presidents",
  },
  location: { label: "San Antonio, TX", lat: 29.4241, lon: -98.4936, tz: "America/Chicago" },
};

export const MENU: [label: string, id: string][] = [
  ["Continue", "continue"],
  ["Quest Log", "quests"],
  ["Level Select", "levels"],
  ["Achievements", "achievements"],
  ["Inventory", "inventory"],
  ["Side Quests", "feeds"],
  ["Guestbook", "guestbook"],
  ["Multiplayer", "contact"],
];

export const BOOT = [
  "STEVE OS v2026.09",
  "Checking save data... OK",
  "Loading player: ABRAHAM STEVE COLINA",
  "Loading quests: 5 found, 2 active",
  "Loading inventory: 15 languages",
  "Connecting to San Antonio, TX...",
  "Ready.",
];

export const QUIPS = [
  "Too hot to go outside. Shipping code instead.",
  "Perfect weather for a dark room and a compiler.",
  "The sun is a deadline. Stay indoors.",
];

/** Live status from America/Chicago time (behavior note 05). */
export function statusFor(date = new Date()) {
  const h = +new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: SITE.location.tz }).format(date);
  const wd = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: SITE.location.tz }).format(date);
  const weekday = !["Sat", "Sun"].includes(wd);
  if (h < 8) return "Probably asleep";
  if (weekday && h < 12) return "In class";
  if (weekday && h < 17) return "At work";
  if (h < 22) return "Probably coding";
  return "Probably making music";
}

/** Smooth-scroll to a section, offset by the 48px HUD. */
export function go(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 48, behavior: "smooth" });
  return true;
}

/** The Liveblocks room every homepage visitor joins for live cursors. */
export const CURSOR_ROOM = "stevecoder-home";
