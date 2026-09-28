/**
 * Level Select + case study data.
 *
 * Undead Presidents copy is final (from the design file). Everything else is
 * pulled from the Quest Log, Level Select, and resume. Any copy that was
 * invented is prefixed with "TODO:" so it is impossible to miss before launch.
 *
 * Image slots: every `src` points at /public/images. Placeholder files are
 * transparent PNGs, so the labeled dashed box underneath shows through.
 * Drop a real image at the same path (or change `src`) and it takes over.
 */

export type Slot = { src: string; label: string };
export type LevelType = "Web" | "Mobile" | "Games" | "Data" | "Design";

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

export type Boss = { name: string; hp: number; status: string; text: string };

export type CaseStudy = {
  lede: string;
  meta: { role: string; timeline: string; stack: string; status: string; statusOk?: boolean };
  hero: Slot;
  problem: { lead: string; body: string };
  architecture: { diagram: Slot; bullets: string[]; code?: { comment: string; line?: string } };
  bosses: Boss[];
  gallery: Slot[];
  results: { v: string; k: string; signal?: boolean }[];
  outro: string;
};

const img = (file: string, label: string): Slot => ({ src: `/images/${file}`, label: `insert: ${label}` });

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
    // TODO: Source link. Pointing at your GitHub profile until you pick a repo.
    source: "https://github.com/steveweenie",
    media: img(
      "undead-presidents-gameplay-clip-or-trailer-1920x1080.jpg",
      "gameplay clip or trailer 1920x1080 + Steam capsule art 616x353",
    ),
    mobileMedia: img("undead-presidents-gameplay-1920x1080.jpg", "Undead Presidents gameplay 1920x1080"),
    caseStudy: {
      lede: "A networked split-screen multiplayer survival shooter, coming to Steam.",
      meta: {
        role: "Solo dev, design, netcode, art direction",
        timeline: "2024 to present",
        stack: "Godot · GDScript · Python",
        status: "Wishlist live",
        statusOk: true,
      },
      hero: img(
        "undead-presidents-hero-gameplay-still-1920x1080.jpg",
        "hero gameplay still or looping clip, 1920x1080, darkened 40%",
      ),
      problem: {
        lead: "Couch co-op is fun until someone's friend lives two states away. Most split-screen games force a choice: local or online. I wanted both at once.",
        body: "Two players on one screen should be able to join two more on another machine, and nobody should need a dedicated server. That means peer-to-peer, host migration, and a lot of edge cases.",
      },
      architecture: {
        diagram: img(
          "undead-presidents-netcode-diagram.png",
          "netcode diagram (host, peers, local split-screen inputs)",
        ),
        bullets: [
          "Steamworks P2P transport with one host authority and deterministic client prediction for movement.",
          "Local split-screen players are multiplexed as sub-clients, so the host sees 8 logical players from up to 4 machines.",
          "Host migration snapshots the world state every 2 seconds. A dropped host costs under a second of rollback.",
        ],
        code: {
          comment: "# insert: short GDScript snippet, e.g. input multiplexing or snapshot serialization",
        },
      },
      bosses: [
        {
          name: "DESYNC DRAGON",
          hp: 0,
          status: "defeated",
          text: "Physics diverged across peers after ~40 seconds. Fixed by moving to fixed-timestep simulation and quantizing input floats to int16 before send.",
        },
        {
          name: "THE HOST MIGRATOR",
          hp: 2,
          status: "defeated · 2 retries",
          text: "When the host quit mid-wave, clients froze. Periodic world snapshots plus a leader election by lowest Steam ID made handoff automatic.",
        },
        {
          name: "SPLIT-SCREEN INPUT HYDRA",
          hp: 6,
          status: "in progress",
          text: "Four local controllers plus remote peers meant device IDs collided. A seat-based input map now owns the mapping; hot-plug is still flaky.",
        },
      ],
      gallery: [
        img("undead-presidents-4-player-split-screen-1920x1080.jpg", "4-player split-screen screenshot 1920x1080"),
        img("undead-presidents-steam-capsule-616x353.jpg", "Steam capsule 616x353"),
        img("undead-presidents-character-sprite-sheet.png", "character sprite sheet"),
        img("undead-presidents-boss-encounter.png", "boss encounter gif"),
        img("undead-presidents-showcase-booth-photo.png", "showcase booth photo"),
      ],
      results: [
        { v: "8P", k: "P2P multiplayer" },
        { v: "44k+", k: "social impressions" },
        { v: "<1s", k: "host migration" },
        { v: "???", k: "wishlists (live count)", signal: true },
      ],
      outro:
        "Next up: Steam Next Fest demo build, controller remapping, and a proper trailer. Wishlisting helps more than you'd think.",
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
    // TODO: Source link (repo may be private). Pointing at your GitHub profile for now.
    source: "https://github.com/steveweenie",
    media: img(
      "alohatabletennis-org-homepage-desktop-1600x1000.png",
      "screenshot, alohatabletennis.org homepage, desktop, 1600x1000",
    ),
    mobileMedia: img("alohatabletennis-org-mobile-screenshot.png", "alohatabletennis.org mobile screenshot"),
    caseStudy: {
      lede: "A full-stack club platform with booking, tournaments, Stripe billing, and 16 languages.",
      meta: {
        role: "Head of Technology",
        timeline: "Jan 2026 to present",
        stack: "Next.js · TypeScript · Supabase · Stripe · Clerk · Vercel",
        status: "Live",
        statusOk: true,
      },
      hero: img("aloha-table-tennis-hero-1920x1080.png", "alohatabletennis.org hero screenshot, 1920x1080, darkened 40%"),
      problem: {
        lead: "TODO: One or two sentences on what the club was running on before this, and why it broke.",
        body: "A 501(c)(3) club with 200+ users and 50 to 70 paying monthly members needed one platform for booking, tournaments, and billing. It had to take real money and never double-book a table or a coaching slot.",
      },
      architecture: {
        diagram: img("aloha-table-tennis-system-diagram.png", "system diagram (Next.js, Supabase, Stripe, Clerk)"),
        bullets: [
          "Next.js App Router on Vercel: 43 pages and 69 API route handlers, gated by CI on every push.",
          "A 38-table Postgres schema on Supabase across 93 migrations, with default-deny row-level security.",
          "Clerk for accounts, Stripe for billing, and a 16-language PWA with web push and offline support.",
        ],
        code: { comment: "// insert: short TypeScript snippet, e.g. the idempotent Stripe webhook handler" },
      },
      bosses: [
        {
          name: "TODO: THE DOUBLE BOOKER",
          hp: 0,
          status: "defeated",
          text: "Two members could grab the last tournament seat or coaching slot at the same moment. Postgres advisory locks now serialize those writes, so a seat is only sold once.",
        },
        {
          name: "TODO: WEBHOOK REPLAY WRAITH",
          hp: 0,
          status: "defeated",
          text: "Stripe retries events, and a replayed payment could charge a member twice. Idempotency keys across all 10 webhook event types make every replay a no-op.",
        },
        {
          name: "TODO: THE LEDGER LICH",
          hp: 0,
          status: "defeated",
          text: "Money records can't be edited after the fact. Append-only financial ledgers plus default-deny row-level security mean nothing is readable or writable unless a policy says so.",
        },
      ],
      gallery: [
        img("aloha-table-tennis-homepage-1920x1080.png", "alohatabletennis.org homepage, desktop 1920x1080"),
        img("aloha-table-tennis-pwa-mobile.png", "PWA on mobile"),
        img("aloha-table-tennis-booking-flow.png", "booking flow"),
        img("aloha-table-tennis-tournament-bracket.png", "tournament bracket"),
        img("aloha-table-tennis-billing.png", "membership billing screen"),
      ],
      results: [
        { v: "43", k: "pages" },
        { v: "69", k: "API routes" },
        { v: "16", k: "languages" },
        { v: "200+", k: "users" },
      ],
      outro: "TODO: What's next for the platform, in one or two sentences.",
    },
  },
  {
    slug: "tat-trick",
    num: "LEVEL 03",
    rarity: "EPIC",
    title: "TAT Trick",
    display: ["TAT", "TRICK"],
    type: "Data",
    year: "2026",
    featured: true,
    pitch: "1st of 26 teams at Thrivent Hackapalooza '26: a gamified leaderboard, impact metrics, and a RAG chatbot.",
    desc: "1st of 26 teams at Thrivent Hackapalooza '26.",
    stats: [
      { v: "1st", k: "of 26 teams" },
      { v: "24h", k: "build time" },
    ],
    stack: "React · FastAPI · AWS",
    // TODO: Demo link. No public demo URL yet, so this points at the case study.
    primary: { label: "Play demo", mobileLabel: "Demo", href: "/levels/tat-trick" },
    // TODO: Source link.
    source: "https://github.com/steveweenie",
    media: img("tat-trick-leaderboard-1600x1000.png", "screenshot, TAT Trick leaderboard, 1600x1000"),
    caseStudy: {
      lede: "1st of 26 teams at Thrivent Hackapalooza '26: a gamified leaderboard, impact metrics, and a RAG chatbot.",
      meta: {
        role: "Frontend, React and TypeScript",
        timeline: "Jul 2026",
        stack: "React · TypeScript · FastAPI · AWS",
        status: "1st of 26 teams",
        statusOk: true,
      },
      hero: img("tat-trick-hero-1920x1080.png", "TAT Trick leaderboard hero, 1920x1080, darkened 40%"),
      problem: {
        lead: "TODO: The problem statement the hackathon handed you, in your voice.",
        body: "Hackapalooza '26 was Thrivent's internal hackathon: 26 teams and 122 participants. We advanced from the top 5 and took 1st.",
      },
      architecture: {
        diagram: img("tat-trick-architecture-diagram.png", "architecture diagram (React, FastAPI, RAG chatbot, AWS)"),
        bullets: [
          "A React and TypeScript frontend for the gamified leaderboard and the impact metrics page.",
          "Live Action Teams data wired in through a Python and FastAPI layer.",
          "A RAG-based AI chatbot served through the same FastAPI layer.",
        ],
        code: { comment: "// insert: short snippet, e.g. the leaderboard scoring or the chatbot fetch" },
      },
      bosses: [
        {
          name: "TODO: THE CLOCK",
          hp: 0,
          status: "defeated",
          text: "TODO: The hardest problem you hit during the build and how you beat it.",
        },
        {
          name: "TODO: THE DEMO GOD",
          hp: 0,
          status: "defeated",
          text: "TODO: What almost broke during judging, and how you kept it running.",
        },
      ],
      gallery: [
        img("tat-trick-leaderboard-1920x1080.png", "leaderboard screenshot 1920x1080"),
        img("tat-trick-chatbot.png", "RAG chatbot screenshot"),
        img("tat-trick-impact-metrics.png", "impact metrics page"),
        img("tat-trick-team-photo.png", "team photo at Hackapalooza"),
        img("tat-trick-winners-slide.png", "winners announcement"),
      ],
      results: [
        { v: "1st", k: "of 26 teams" },
        { v: "122", k: "participants" },
        { v: "24h", k: "build time" },
        { v: "Top 5", k: "finalist round" },
      ],
      outro: "TODO: What happened to TAT Trick after the win.",
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
    pitch: "1st Place at Code Quantum 2025. Predicts which character is speaking from dialogue.",
    desc: "1st Place at Code Quantum 2025. Predicts which character is speaking from dialogue.",
    stats: [
      { v: "1st", k: "Code Quantum 2025" },
      { v: "4", k: "person team" },
    ],
    stack: "React Native · Python · NLP",
    primary: { label: "Devpost", href: "https://devpost.com/software/mad-hatter-s-whisper" },
    media: img("mad-hatters-whisper-app-screen-1170x2532.png", "Mad Hatter's Whisper app screen 1170x2532"),
    caseStudy: {
      lede: "1st Place at Code Quantum 2025. A mobile app that predicts which character is speaking from dialogue.",
      meta: {
        role: "TODO: Your role on the 4-person team",
        timeline: "Mar 2025",
        stack: "React Native · Expo · Flask · SVM · Naive Bayes · TF-IDF",
        status: "1st Place",
        statusOk: true,
      },
      hero: img("mad-hatters-whisper-hero-1920x1080.png", "Mad Hatter's Whisper hero, 1920x1080, darkened 40%"),
      problem: {
        lead: "TODO: The hook. Why guess who's talking from a line of dialogue?",
        body: "Built in 12 hours at Code Quantum 2025 at UTSA with a 4-person cross-functional team. We took 1st place.",
      },
      architecture: {
        diagram: img("mad-hatters-whisper-model-diagram.png", "model pipeline diagram (dialogue, TF-IDF, SVM + Naive Bayes, app)"),
        bullets: [
          "A React Native and Expo app that returns character predictions in real time.",
          "A Flask API serving SVM and Naive Bayes classifiers.",
          "TF-IDF features over dialogue lines feed both models.",
        ],
        code: { comment: "# insert: short Python snippet, e.g. the TF-IDF + SVM pipeline" },
      },
      bosses: [
        {
          name: "TODO: THE CHESHIRE CLASSIFIER",
          hp: 0,
          status: "defeated",
          text: "TODO: The hardest modeling or app problem and how the team beat it.",
        },
      ],
      gallery: [
        img("mad-hatters-whisper-app-1170x2532.png", "app screen 1170x2532"),
        img("mad-hatters-whisper-code-quantum-team.jpg", "Code Quantum 2025 team photo"),
        img("mad-hatters-whisper-prediction.png", "prediction result screen"),
        img("mad-hatters-whisper-model-accuracy.png", "model accuracy chart"),
        img("mad-hatters-whisper-demo.png", "demo on stage"),
      ],
      results: [
        { v: "1st", k: "Code Quantum 2025" },
        { v: "2", k: "models (SVM, NB)" },
        { v: "4", k: "person team" },
      ],
      outro: "TODO: One closing line.",
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
    media: img("emptyshellcasing-homepage-1600x1000.png", "emptyshellcasing.com homepage 1600x1000"),
    caseStudy: {
      lede: "The official site for an Atlantic Records artist, and the design system behind it.",
      meta: {
        role: "Contract Web Designer, Atlantic Records",
        timeline: "Aug to Sep 2026",
        stack: "Figma · Variables · Variants · Auto Layout · Dev Mode",
        status: "Shipped",
        statusOk: true,
      },
      hero: img("emptyshellcasing-hero-1920x1080.png", "emptyshellcasing.com hero, 1920x1080, darkened 40%"),
      problem: {
        lead: "TODO: The brief from Atlantic, in one or two sentences.",
        body: "I owned visual direction through a Figma handoff consumed by Atlantic's in-house dev team, across 24 versioned releases.",
      },
      architecture: {
        diagram: img("emptyshellcasing-token-map.png", "token map (primitives to semantic tokens to CSS variables)"),
        bullets: [
          "A two-layer, 60-token design system authored as Figma variables.",
          "Every token maps 1:1 to a CSS custom property, so Dev Mode output matched the stylesheet exactly.",
          "135 root components with states as variants, and 15 frames across 3 breakpoints.",
        ],
        code: { comment: "/* insert: a few lines of the generated CSS variables */" },
      },
      bosses: [
        {
          name: "TODO: THE DRIFT",
          hp: 0,
          status: "defeated",
          text: "TODO: Where design and code started to drift apart, and how the 1:1 token mapping fixed it.",
        },
      ],
      gallery: [
        img("emptyshellcasing-homepage-1920x1080.png", "homepage desktop 1920x1080"),
        img("emptyshellcasing-mobile.png", "mobile breakpoint"),
        img("emptyshellcasing-tokens.png", "Figma variables panel"),
        img("emptyshellcasing-components.png", "component sheet"),
        img("emptyshellcasing-breakpoints.png", "3 breakpoints side by side"),
      ],
      results: [
        { v: "60", k: "tokens" },
        { v: "135", k: "components" },
        { v: "24", k: "versioned releases" },
        { v: "3", k: "breakpoints" },
      ],
      outro: "TODO: One closing line.",
    },
  },
  {
    slug: "edp-job-monitor",
    num: "LEVEL 06",
    rarity: "RARE",
    title: "EDP Job Monitor",
    display: ["EDP JOB", "MONITOR"],
    type: "Data",
    year: "2026",
    featured: false,
    pitch: "A Thrivent internal tool. Shown blurred.",
    desc: "A Thrivent internal tool. Shown blurred.",
    stats: [
      { v: "2wk", k: "to MVP" },
      { v: "30+", k: "users" },
    ],
    stack: "Databricks · Dash · Python",
    media: img("edp-job-monitor-abstract-or-blurred-dashboard.png", "abstract or blurred dashboard visual"),
    caseStudy: {
      lede: "A Thrivent internal tool. Shown blurred.",
      meta: {
        role: "Associate Software Engineer Intern, Thrivent",
        timeline: "May to Aug 2026",
        stack: "Python · SQL · Databricks · Dash · DAX Studio",
        status: "In use internally",
        statusOk: true,
      },
      hero: img("edp-job-monitor-hero-blurred.png", "abstract or blurred dashboard visual, 1920x1080"),
      problem: {
        lead: "TODO: Why the old Power BI job monitor wasn't cutting it.",
        body: "The legacy EDP job monitoring dashboard lived in Power BI. I migrated it to a custom Databricks Dash app.",
      },
      architecture: {
        diagram: img("edp-job-monitor-diagram.png", "abstract pipeline diagram, no internal names"),
        bullets: [
          "Reverse-engineered the existing SQL with DAX Studio before rewriting anything.",
          "Rebuilt the dashboard as a Databricks Dash application.",
          "Shipped the MVP in 2 weeks, then iterated to 30+ users across every DEME team.",
        ],
      },
      bosses: [
        {
          name: "TODO: THE BLACK BOX",
          hp: 0,
          status: "defeated",
          text: "The old dashboard's logic lived inside Power BI. Reverse-engineering its SQL with DAX Studio made the rewrite possible.",
        },
      ],
      gallery: [
        img("edp-job-monitor-blurred-1.png", "blurred dashboard view"),
        img("edp-job-monitor-blurred-2.png", "blurred job detail"),
        img("edp-job-monitor-abstract-1.png", "abstract visual"),
        img("edp-job-monitor-abstract-2.png", "abstract visual"),
        img("edp-job-monitor-abstract-3.png", "abstract visual"),
      ],
      results: [
        { v: "2wk", k: "to MVP" },
        { v: "30+", k: "users" },
      ],
      outro: "TODO: One closing line.",
    },
  },
];

export const FILTERS = ["All", "Web", "Mobile", "Games", "Data", "Design"] as const;

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
  "edp-job-monitor": "edp-job-monitor",
};
