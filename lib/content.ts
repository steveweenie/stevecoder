export type Quest = {
  dates: string;
  role: string;
  /** Shorter role for the 390px layout. */
  roleShort?: string;
  org: string;
  orgShort?: string;
  active?: boolean;
  tags: string[];
  bullets: string[];
};

export const QUESTS: Quest[] = [
  {
    dates: "Sep 2026 – Now",
    role: "IT Application Developer / Support Engineer",
    roleShort: "IT Application Developer",
    org: "Y&L Consulting (NSSA-NSCA)",
    orgShort: "Y&L Consulting",
    active: true,
    tags: ["VB.NET", "C#", "PHP", "SQL Server", "Azure"],
    bullets: [
      "Maintains apps for a nonprofit serving 15,000 members and 700+ clubs.",
      "Writes the SQL Server procedures behind national competition results.",
      "Supports the Azure modernization of a legacy PHP and WordPress platform.",
    ],
  },
  {
    dates: "Jan 2026 – Now",
    role: "Head of Technology",
    org: "Aloha Table Tennis Association",
    active: true,
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "Clerk", "Vercel"],
    bullets: [
      "Built alohatabletennis.org for 200+ users and 50 to 70 paying members: 43 pages and 69 API routes.",
      "Designed a 38-table Postgres schema with row-level security.",
      "Built Stripe billing across 10 webhook events, with idempotency.",
      "Shipped it as a 16-language PWA.",
    ],
  },
  {
    dates: "Aug – Sep 2026",
    role: "Contract Web Designer",
    org: "Atlantic Records",
    tags: ["Figma"],
    bullets: [
      "Designed the official site for an Atlantic artist, emptyshellcasing.com.",
      "Built a 60-token design system mapped 1:1 to CSS variables.",
      "Made 135 components across 24 versioned releases.",
    ],
  },
  {
    dates: "May – Aug 2026",
    role: "Associate Software Developer Intern",
    org: "Thrivent Financial",
    tags: ["Python", "SQL", "Databricks", "Airflow", "Power BI"],
    bullets: [
      "Rebuilt the EDP job monitoring dashboard as a Databricks Dash app. The MVP shipped in 2 weeks and grew to 30+ users.",
      "Built a Datadog to Databricks ingestion path.",
      "Automated ingestion of AUM data covering hundreds of millions in assets.",
    ],
  },
  {
    dates: "Jan – Apr 2026",
    role: "Software Developer Intern",
    org: "AssetWorks, Inc.",
    tags: ["React Native", "TypeScript", "SQL"],
    bullets: [
      "Shipped features on Go: Work Management and Go: Asset Management, used by 150+ universities.",
      "Built a Grainger API ordering integration.",
    ],
  },
];

export const STATS = [
  { value: "3.79", label: "GPA", fill: 9, mobile: 4 },
  { value: "DL", label: "Dean's List", fill: 10 },
  { value: "2", label: "Hackathon wins", fill: 2, mobile: 1 },
  { value: "12", label: "Languages", fill: 10 },
];

export const ACHIEVEMENTS: [title: string, date: string][] = [
  ["1st Place Hackapalooza '26", "Jul 2026"],
  ["1st Place Code Quantum 2025", "Mar 2025"],
  ["Dean's List", "2024 to 2026"],
  ["Built a 15k Member Platform", "Sep 2026"],
  ["ESB Certification", "2023"],
  ["PCSB Certification", "2023"],
  ["Microsoft Office Specialist", "2022"],
  ["IC3 Digital Literacy", "2022"],
  ["HackerRank Python", "2024"],
  ["???", ""],
  ["???", ""],
];

export const GUILDS = ["ACM", "ICPC", "Rowdy Creators", "UTSA Bold Scholars", "SHPE", "VOICES"];

/** [name, icon, rank, usedIn, level]. Icons live in /public/icons (Simple Icons, monochrome). */
export type InvItem = [name: string, icon: string, rank: string, usedIn: string, lvl: number];

export const INVENTORY: Record<string, InvItem[]> = {
  Languages: [
    ["TypeScript", "typescript", "Equipped daily.", "Aloha TT, AssetWorks, TAT Trick", 99],
    ["Python", "python", "Equipped daily.", "Thrivent, TAT Trick, Mad Hatter", 92],
    ["C#", "csharp", "TODO: Enterprise duty.", "Y&L Consulting", 60],
    ["JavaScript", "javascript", "Equipped daily.", "Everywhere", 95],
    ["SQL", "postgresql", "38 tables and counting.", "Aloha TT, Y&L, Thrivent", 85],
    ["PHP", "php", "Legacy slayer.", "Y&L Consulting", 60],
    ["Java", "openjdk", "Coursework and ICPC.", "UTSA", 70],
    ["C++", "cplusplus", "ICPC weapon.", "Competitive programming", 65],
    ["HTML/CSS", "html5", "Since forever.", "Everything with a browser", 97],
    ["GDScript", "godotengine", "Main hand for games.", "Undead Presidents", 88],
    ["Bash", "gnubash", "Scripts and deploys.", "All the servers", 72],
    ["VB.NET", "dotnet", "Acquired Sep 2026.", "Y&L Consulting", 45],
  ],
  Frameworks: [
    ["Next.js", "nextdotjs", "App Router believer.", "Aloha TT, this site", 95],
    ["React", "react", "Equipped daily.", "TAT Trick, AssetWorks", 95],
    ["React Native", "react", "Ships to 150+ universities.", "AssetWorks, Mad Hatter", 80],
    ["Godot", "godotengine", "8-player netcode survivor.", "Undead Presidents", 85],
    ["FastAPI", "fastapi", "Hackathon favorite.", "TAT Trick", 75],
    ["Tailwind", "tailwindcss", "Strict spacing scale.", "Aloha TT, this site", 90],
    ["Node.js", "nodedotjs", "69 API routes worth.", "Aloha TT", 88],
    ["Dash", "plotly", "Dashboards in 2 weeks.", "Thrivent EDP", 70],
  ],
  Tools: [
    ["Git", "git", "Commits daily.", "Everything", 95],
    ["Vercel", "vercel", "Home of stevecoder.com.", "Aloha TT, this site", 90],
    ["Supabase", "supabase", "RLS enjoyer.", "Aloha TT", 85],
    ["Stripe", "stripe", "10 webhooks, idempotent.", "Aloha TT", 80],
    ["Figma", "figma", "135 components deep.", "Atlantic Records", 85],
    ["Docker", "docker", "Containers when needed.", "Y&L, Thrivent", 60],
    ["Azure", "microsoftazure", "Modernizing legacy.", "Y&L Consulting", 55],
    ["AWS", "amazonaws", "Hackathon infra.", "TAT Trick", 60],
  ],
  Data: [
    ["Databricks", "databricks", "Dash apps and pipelines.", "Thrivent", 80],
    ["Airflow", "apacheairflow", "Scheduled ingestion.", "Thrivent", 65],
    ["Power BI", "powerbi", "Reporting layer.", "Thrivent", 60],
    ["PostgreSQL", "postgresql", "38-table schema.", "Aloha TT", 85],
    ["SQL Server", "microsoftsqlserver", "National results procs.", "Y&L Consulting", 70],
    ["Datadog", "datadog", "Metrics to lakehouse.", "Thrivent", 55],
  ],
};

/** Guestbook icon swatches, in picker order. */
export const GB_ICONS = [
  "var(--signal)",
  "var(--bone)",
  "var(--dim)",
  "#0E0F0C",
  "var(--signal)",
  "var(--bone)",
  "var(--dim)",
  "#0E0F0C",
];

export type GuestEntry = { id: string; tag: string; msg: string; icon: number; createdAt: number };

/** Seed board shown in mock mode (from the design file). */
export const MOCK_SCORES: GuestEntry[] = [
  ["STV", "Built this thing. Be nice.", "2026-09-25", 0],
  ["RWDY", "Go Runners!", "2026-09-24", 3],
  ["CJ", "saw Undead Presidents at the showcase, sick", "2026-09-22", 5],
  ["LEN", "hire this man", "2026-09-21", 1],
  ["P2", "I was here.", "2026-09-20", 6],
].map(([tag, msg, d, icon], i) => ({
  id: `mock-${i}`,
  tag: tag as string,
  msg: msg as string,
  icon: icon as number,
  createdAt: Date.parse(`${d}T12:00:00-05:00`),
}));
