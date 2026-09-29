/**
 * Level Select + case study data.
 *
 * Case studies are deliberately short: a lede, a paragraph or two, a few
 * photos, and the headline numbers. Every `src` points at /public/images;
 * `label` doubles as the image's alt text.
 */

export type Slot = { src: string; label: string };
/** Gallery image with intrinsic size, so the masonry grid keeps its aspect. */
export type Shot = Slot & { w: number; h: number };
export type LevelType = "Web" | "Mobile" | "Games" | "Design";

export type Level = {
  slug: string;
  num: string;
  rarity: string;
  title: string;
  /** Title as it breaks on the case study hero. */
  display: string[];
  type: LevelType;
  year: string;
  featured: boolean;
  pitch: string;
  /** Short line used in the level list. */
  desc: string;
  /** 390px layout overrides. */
  mobileTitle?: string;
  mobilePitch?: string;
  /** OG image pitch, when the template's copy differs. */
  ogPitch?: string;
  stats: { v: string; k: string }[];
  stack: string;
  primary?: { label: string; mobileLabel?: string; href: string; hot?: boolean };
  source?: string;
  media: Slot;
  mobileMedia?: Slot;
  caseStudy: CaseStudy;
};

export type CaseStudy = {
  lede: string;
  meta: { role: string; timeline: string; stack: string; status: string; statusOk?: boolean };
  hero: Slot;
  about: string[];
  /** YouTube video IDs. */
  videos?: { id: string; title: string }[];
  gallery: Shot[];
  results: { v: string; k: string; signal?: boolean }[];
};

const img = (file: string, label: string): Slot => ({ src: `/images/${file}`, label });
const shot = (file: string, label: string, w: number, h: number): Shot => ({ ...img(file, label), w, h });

export const LEVELS: Level[] = [
  {
    slug: "undead-presidents",
    num: "LEVEL 01",
    rarity: "LEGENDARY",
    title: "Undead Presidents",
    display: ["UNDEAD", "PRESIDENTS"],
    type: "Games",
    year: "2024",
    featured: true,
    pitch: "A networked split-screen multiplayer survival shooter coming to Steam.",
    ogPitch: "Networked split-screen multiplayer survival shooter. Coming to Steam.",
    desc: "A networked split-screen multiplayer survival shooter coming to Steam.",
    stats: [
      { v: "8P", k: "P2P multiplayer" },
      { v: "44k+", k: "social impressions" },
    ],
    stack: "Godot · GDScript · Python",
    primary: {
      label: "Wishlist on Steam",
      mobileLabel: "Wishlist",
      href: "https://store.steampowered.com/app/3517560/Undead_Presidents",
      hot: true,
    },
    media: img("undead-presidents-card-split-screen-1920x1080.jpg", "Undead Presidents four-player split-screen gameplay"),
    mobileMedia: img("undead-presidents-card-mobile-wave-1-1920x1080.jpg", "Undead Presidents gameplay, wave 1"),
    caseStudy: {
      lede: "A networked split-screen multiplayer survival shooter, coming to Steam.",
      meta: {
        role: "Solo dev, design, netcode, art direction",
        timeline: "2024 to present",
        stack: "Godot · GDScript · Python",
        status: "Wishlist live",
        statusOk: true,
      },
      hero: img("undead-presidents-hero-corridor-1920x1080.jpg", "Undead Presidents corridor gameplay"),
      about: [
        "Couch co-op is fun until someone's friend lives two states away. Most split-screen games force a choice: local or online. I wanted both at once.",
        "Two players on one screen can join two more on another machine, with no dedicated server. Up to 8 players over Steam P2P, with host migration when someone drops.",
      ],
      gallery: [
        shot("undead-presidents-trailer-meanwhile-1920x1080.jpg", "Trailer title card: meanwhile at a classified government facility", 1920, 1080),
        shot("undead-presidents-split-screen-4p-1920x1080.jpg", "Four-player split-screen", 1920, 1080),
        shot("undead-presidents-card-mobile-wave-1-1920x1080.jpg", "Wave 1", 1920, 1080),
        shot("undead-presidents-gameplay-loop-or-guitar-photo.jpg", "Split-screen title screen", 1210, 680),
      ],
      results: [
        { v: "8P", k: "P2P multiplayer" },
        { v: "44k+", k: "social impressions" },
        { v: "<1s", k: "host migration" },
        { v: "???", k: "wishlists (live count)", signal: true },
      ],
    },
  },
  {
    slug: "aloha-table-tennis",
    num: "LEVEL 02",
    rarity: "EPIC",
    title: "Aloha Table Tennis Platform",
    display: ["ALOHA TABLE", "TENNIS PLATFORM"],
    type: "Web",
    year: "2026",
    featured: true,
    pitch: "A full-stack club platform with booking, tournaments, Stripe billing, and 16 languages.",
    desc: "A full-stack club platform with booking, tournaments, Stripe billing, and 16 languages.",
    mobileTitle: "Aloha Table Tennis",
    mobilePitch: "43 pages, 69 API routes, Stripe billing, 16 languages.",
    stats: [
      { v: "43", k: "pages" },
      { v: "69", k: "API routes" },
    ],
    stack: "Next.js · TypeScript · Supabase · Stripe · Clerk · Vercel",
    primary: { label: "Play (live site)", mobileLabel: "Live site", href: "https://alohatabletennis.org" },
    media: img("aloha-table-tennis-landing-hero.jpg", "alohatabletennis.org homepage"),
    caseStudy: {
      lede: "A full-stack club platform with booking, tournaments, Stripe billing, and 16 languages.",
      meta: {
        role: "Head of Technology",
        timeline: "Jan 2026 to present",
        stack: "Next.js · TypeScript · Supabase · Stripe · Clerk · Vercel",
        status: "Live",
        statusOk: true,
      },
      hero: img("aloha-table-tennis-hero-photo.jpg", "Open play at the Aloha Table Tennis club"),
      about: [
        "A 501(c)(3) club in Honolulu with 200+ users and 50 to 70 paying monthly members needed one place for booking, tournaments, and billing. It had to take real money and never double-book a table or a coaching slot.",
        "I built it on Next.js and Supabase: 43 pages, 69 API routes, Stripe billing with idempotent webhooks, and a 16-language PWA.",
      ],
      gallery: [
        shot("aloha-table-tennis-member-dashboard.jpg", "Member dashboard: sign-in sheet, door access, refreshments, and player directory", 1440, 1242),
        shot("aloha-table-tennis-landing-show-up.jpg", "Homepage stats and club story", 1417, 720),
        shot("aloha-table-tennis-landing-players.jpg", "Player directory on the homepage", 1417, 800),
      ],
      results: [
        { v: "43", k: "pages" },
        { v: "69", k: "API routes" },
        { v: "16", k: "languages" },
        { v: "200+", k: "users" },
      ],
    },
  },
  {
    slug: "tat-trick",
    num: "LEVEL 03",
    rarity: "EPIC",
    title: "TAT Trick",
    display: ["TAT", "TRICK"],
    type: "Web",
    year: "2026",
    featured: true,
    pitch: "1st of 26 teams at Thrivent Hackapalooza '26: an event heatmap, an AI chatbot, and gamified rewards for Thrivent Action Teams.",
    desc: "1st of 26 teams at Thrivent Hackapalooza '26.",
    stats: [
      { v: "1st", k: "of 26 teams" },
      { v: "13", k: "person team" },
    ],
    stack: "Figma · Leaflet · AWS Bedrock · iMovie",
    media: img("tat-trick-group.jpg", "Hackapalooza '26 participants"),
    caseStudy: {
      lede: "1st of 26 teams at Thrivent Hackapalooza '26: three ways to get more members leading Thrivent Action Teams.",
      meta: {
        role: "Gamification team, demo video editor",
        timeline: "Jun to Jul 2026",
        stack: "Figma · Leaflet · AWS Bedrock · iMovie",
        status: "1st of 26 teams",
        statusOk: true,
      },
      hero: img("tat-trick-stage.jpg", "The team on the main stage"),
      about: [
        "Thirteen interns, one idea: make Thrivent Action Teams easier to start and more fun to keep doing. We split into three sub-teams and built all three at once: a national heatmap of events, a RAG chatbot on AWS Bedrock that recommends events, and a gamification layer. Three features, one goal: a hat trick.",
        "I was on gamification, designing badges and an Action Points rewards store in Figma, mocked to look native to the real site. I also acted in the opening skit and cut the demo video in iMovie, which got a perfect score in preliminary judging and put us in the top 5. We took 1st on the main stage.",
      ],
      gallery: [
        shot("tat-trick-group.jpg", "Hackapalooza '26 participants", 2400, 1800),
        shot("tat-trick-skit.jpg", "Filming the opening skit for our demo video", 1800, 2400),
        shot("tat-trick-pitch.jpg", "Presenting in the final round", 800, 1066),
        shot("tat-trick-build-room.jpg", "Build day in the conference room", 800, 598),
        shot("tat-trick-war-room.jpg", "Heads down on build day", 800, 1068),
      ],
      results: [
        { v: "1st", k: "of 26 teams" },
        { v: "122", k: "participants" },
        { v: "3", k: "features shipped" },
        { v: "100%", k: "prelim video score" },
      ],
    },
  },
  {
    slug: "mad-hatters-whisper",
    num: "LEVEL 04",
    rarity: "RARE",
    title: "Mad Hatter's Whisper",
    display: ["MAD HATTER'S", "WHISPER"],
    type: "Mobile",
    year: "2025",
    featured: false,
    pitch: "1st Place at CodeQuantum 2025. Predicts which Alice in Wonderland character is speaking from a line of dialogue.",
    desc: "1st Place at CodeQuantum 2025. Predicts which character is speaking from dialogue.",
    stats: [
      { v: "1st", k: "CodeQuantum 2025" },
      { v: "51%", k: "SVM accuracy" },
    ],
    stack: "React · Flask · scikit-learn · NLP",
    primary: { label: "Devpost", href: "https://devpost.com/software/mad-hatter-s-whisper" },
    source: "https://github.com/steveweenie/mad-hatters-whisper-nlp-ml",
    media: img("mad-hatters-whisper-title-slide.jpg", "Mad Hatter's Whisper title slide"),
    caseStudy: {
      lede: "1st Place at CodeQuantum 2025. An app that guesses which Alice in Wonderland character is speaking from a line of dialogue.",
      meta: {
        role: "Frontend, React",
        timeline: "Mar 2025 · 10 hours",
        stack: "React · Flask · Python · scikit-learn · Pandas · BeautifulSoup",
        status: "1st Place",
        statusOk: true,
      },
      hero: img("mad-hatters-whisper-code-quantum-team.jpg", "The team at CodeQuantum 2025"),
      about: [
        "CodeQuantum '25 at UTSA had an Alice in Wonderland theme. Every character talks in a wildly different way, so we asked: could a model tell who's speaking?",
        "We scraped the dialogue with BeautifulSoup, tested SVM, Naive Bayes, and Logistic Regression in scikit-learn behind a Flask API, and I built the React frontend. SVM won at 51% accuracy, and so did we.",
      ],
      gallery: [
        shot("mad-hatters-whisper-on-stage.jpg", "Presenting at CodeQuantum 2025", 800, 599),
        shot("mad-hatters-whisper-app.jpg", "The app: type a line, predict the character", 389, 845),
        shot("mad-hatters-whisper-dialogue.jpg", "Sample training dialogue", 1370, 422),
        shot("mad-hatters-whisper-title-slide.jpg", "Title slide from our pitch deck", 1920, 1083),
      ],
      results: [
        { v: "1st", k: "CodeQuantum 2025" },
        { v: "51%", k: "SVM accuracy" },
        { v: "3", k: "models tested" },
        { v: "10h", k: "build time" },
      ],
    },
  },
  {
    slug: "emptyshellcasing",
    num: "LEVEL 05",
    rarity: "RARE",
    title: "emptyshellcasing.com",
    display: ["EMPTY", "SHELL", "CASING"],
    type: "Design",
    year: "2026",
    featured: false,
    pitch: "An Atlantic Records artist site and design system.",
    desc: "An Atlantic Records artist site and design system.",
    stats: [
      { v: "60", k: "tokens" },
      { v: "135", k: "components" },
    ],
    stack: "Figma · 60 tokens · 135 components",
    primary: { label: "Visit site", href: "https://emptyshellcasing.com" },
    media: img("emptyshellcasing-homepage.jpg", "emptyshellcasing.com homepage"),
    caseStudy: {
      lede: "The official site for an Atlantic Records artist, and the design system behind it.",
      meta: {
        role: "Contract Web Designer, Atlantic Records",
        timeline: "Aug to Sep 2026",
        stack: "Figma · Variables · Variants · Auto Layout · Dev Mode",
        status: "Live",
        statusOk: true,
      },
      hero: img("emptyshellcasing-homepage.jpg", "emptyshellcasing.com homepage"),
      about: [
        "I owned visual direction for Empty Shell Casing's official site, handed off in Figma to Atlantic's in-house dev team across 24 versioned releases.",
        "Underneath is a 60-token design system that maps 1:1 to CSS variables, plus 135 components across 3 breakpoints.",
      ],
      gallery: [
        shot("emptyshellcasing-catalog.jpg", "Merch catalog", 2000, 1250),
        shot("emptyshellcasing-interview.jpg", "Interview page", 2000, 1150),
        shot("emptyshellcasing-gallery.jpg", "Photo gallery lightbox", 1334, 889),
        shot("emptyshellcasing-gallery-2.jpg", "Photo gallery lightbox", 1334, 889),
      ],
      results: [
        { v: "60", k: "tokens" },
        { v: "135", k: "components" },
        { v: "24", k: "versioned releases" },
        { v: "3", k: "breakpoints" },
      ],
    },
  },
  {
    slug: "silvesbro",
    num: "LEVEL 06",
    rarity: "UNCOMMON",
    title: "SilvesBro",
    display: ["SILVES", "BRO"],
    type: "Mobile",
    year: "2024",
    featured: false,
    pitch: "A study-buddy mobile game starring our professor, with a pomodoro timer, to-do list, happiness meter, and a wardrobe of hats.",
    desc: "A study-buddy mobile game starring our professor.",
    stats: [
      { v: "4", k: "features" },
      { v: "2", k: "devlogs" },
    ],
    stack: "Java · Android Studio · XML",
    primary: { label: "Watch devlog", href: "https://youtu.be/0Co-MnAy-rE" },
    media: img("silvesbro-devlog-thumbnail.jpg", "SilvesBro running on a phone"),
    caseStudy: {
      lede: "His tests were too hard, so we put him in a mobile game.",
      meta: {
        role: "Developer and programmer",
        timeline: "One semester",
        stack: "Java · Android Studio · XML · Photoshop · Premiere Pro · Adobe XD",
        status: "Shipped",
        statusOk: true,
      },
      hero: img("silvesbro-devlog-thumbnail.jpg", "SilvesBro running on a phone"),
      about: [
        "A semester-long team project: a study buddy you keep happy by actually studying. I built a dynamic UI with custom animations and sound effects, plus the pomodoro timer, happiness meter, to-do list, and wardrobe.",
      ],
      videos: [
        { id: "0Co-MnAy-rE", title: "It Took A Whole Semester To Make This" },
        { id: "sz1D9qEB0E4", title: "His Tests Are TOO HARD, So We Put Him In a Mobile Game" },
      ],
      gallery: [shot("silvesbro-screens.jpg", "Main, settings, wardrobe, timer, and to-do list screens", 1920, 1280)],
      results: [
        { v: "4", k: "features" },
        { v: "2", k: "devlogs" },
        { v: "1", k: "semester" },
      ],
    },
  },
];

export const FILTERS = ["All", "Web", "Mobile", "Games", "Design"] as const;

export function getLevel(slug: string) {
  return LEVELS.find((l) => l.slug === slug);
}

export function nextLevel(slug: string) {
  const i = LEVELS.findIndex((l) => l.slug === slug);
  return LEVELS[(i + 1) % LEVELS.length];
}

/** Terminal `ls` output names (short aliases accepted by `open`). */
export const LEVEL_ALIASES: Record<string, string> = {
  "undead-presidents": "undead-presidents",
  "aloha-tt": "aloha-table-tennis",
  "aloha-table-tennis": "aloha-table-tennis",
  "tat-trick": "tat-trick",
  "mad-hatters-whisper": "mad-hatters-whisper",
  emptyshellcasing: "emptyshellcasing",
  silvesbro: "silvesbro",
};
