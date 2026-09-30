export type Quest = {
  dates: string;
  role: string;
  /** Shorter role for the 390px layout. */
  roleShort?: string;
  org: string;
  orgShort?: string;
  active?: boolean;
  /** Listed under "Earlier quests": the work that led here. */
  early?: boolean;
  tags: string[];
  bullets: string[];
  /** Full toolkit, grouped, for roles where the tags can't cover it. */
  stack?: [group: string, items: string][];
};

export const QUESTS: Quest[] = [
  {
    dates: "Sep 2026 – Now",
    role: "IT Application Developer / Support Engineer",
    roleShort: "IT Application Developer",
    org: "Y&L Consulting (NSSA-NSCA)",
    orgShort: "Y&L Consulting",
    active: true,
    tags: ["VB.NET", "C#", "PHP", "T-SQL", "Azure", "Azure DevOps"],
    bullets: [
      "Develops and maintains VB.NET, C#, and PHP apps for the National Skeet Shooting Association and National Sporting Clays Association (NSSA-NSCA), a nonprofit serving 15,000 members and 700+ clubs.",
      "Writes the T-SQL stored procedures behind national competition results.",
      "Supports the Azure modernization of a legacy PHP and WordPress platform, with work tracked in Azure DevOps.",
      "Also covers IT support across Microsoft 365, Entra, and Windows Server.",
    ],
    stack: [
      ["Languages", "VB.NET, C#, PHP, T-SQL, PowerShell, JavaScript / jQuery, HTML / CSS"],
      ["Frameworks", ".NET Framework, ASP.NET, WordPress, Joomla, Bootstrap"],
      ["Data", "Microsoft SQL Server, SSMS, Excel"],
      ["Azure", "Azure DevOps, Entra ID, Key Vault, Azure Identity, Microsoft Graph"],
      ["Microsoft 365", "Exchange, Teams, SharePoint, OneDrive, Office"],
      ["Tools", "Visual Studio, VS Code, NuGet, Windows Server, Freshworks"],
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
    role: "Associate Software Engineer Intern",
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
    dates: "May 2025 – Now",
    role: "Co-Founder & Software Developer",
    roleShort: "Co-Founder & Developer",
    org: "The CRVL",
    active: true,
    tags: ["JavaScript", "React Native", "Tailwind", "Shopify"],
    bullets: [
      "Co-founded a marketing agency that pairs creative strategy with software.",
      "Built client sites and apps, including maluhialove.com.",
    ],
  },
  {
    dates: "Aug – Dec 2025",
    role: "ServiceNow IT Intern",
    org: "University Tech Solutions, UTSA",
    orgShort: "UTSA Tech Solutions",
    early: true,
    tags: ["ServiceNow", "ITSM"],
    bullets: [
      "Gave Tier 1 support to students, faculty, and staff: walk-in, remote, and ticketed.",
      "Tracked and escalated requests in ServiceNow, cutting wait times by 30%.",
      "Taught faculty and staff basic troubleshooting so they could fix issues themselves.",
    ],
  },
  {
    dates: "Jul – Aug 2025",
    role: "Contract Web Developer",
    org: "Servco Toyota Leeward",
    early: true,
    tags: ["Shopify", "Liquid", "HTML", "CSS"],
    bullets: [
      "Built the Servco Leeward merch store on Shopify. Site traffic rose 40% and conversions 22%.",
      "Made reusable Liquid components for title cards, collection menus, and product displays, so marketing could update content without code.",
    ],
  },
  {
    dates: "May – Aug 2025",
    role: "Web Software Developer Intern",
    roleShort: "Web Developer Intern",
    org: "TLT, Tomorrow's Leaders Today",
    orgShort: "TLT",
    early: true,
    tags: ["HTML", "CSS", "JavaScript", "Git"],
    bullets: [
      "Shipped features and bug fixes with a team of 4 interns in biweekly sprints.",
      "Reworked the Mentoring at TLT page for clearer navigation.",
      "Worked with the cybersecurity team so every update met security standards.",
    ],
  },
  {
    dates: "Feb – Apr 2025",
    role: "Web Developer",
    org: "Byrna Leeward",
    early: true,
    tags: ["Shopify", "Liquid", "HTML", "CSS"],
    bullets: ["Built and styled the Shopify theme for byrnaleeward.com in Liquid, HTML, and CSS."],
  },
  {
    dates: "Feb – Apr 2025",
    role: "Web Developer",
    org: "MCAV Tarpaulin Printing",
    orgShort: "MCAV Printing",
    early: true,
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Go"],
    bullets: [
      "Built and deployed mcavtarpaulinprinting.com, a responsive Bootstrap site.",
      "Wrote Go scripts that email clients when they submit a form, backed by Google Sheets and Apps Script.",
    ],
  },
  {
    dates: "Aug 2022 – Jun 2023",
    role: "Chief Marketing Officer",
    org: "Virtual Enterprises International (PARA Protection)",
    orgShort: "Virtual Enterprises",
    early: true,
    tags: ["Marketing", "Leadership"],
    bullets: [
      "Led marketing for PARA Protection, a student-run virtual bulletproof backpack company.",
      "Built the brand strategy and ran the customer data analysis behind it.",
      "Placed 2nd in the 2022-2023 National Business Plan Competition in Florida.",
    ],
  },
  {
    dates: "Jul – Dec 2022",
    role: "Cashier, Customer Service",
    org: "Walmart",
    early: true,
    tags: ["Customer Service"],
    bullets: ["Worked checkout while juggling several tasks at once, and learned to de-escalate with upset customers."],
  },
];

export const STATS = [
  { value: "3.79", label: "GPA", fill: 9, mobile: 4 },
  { value: "DL", label: "Dean's List", fill: 10 },
  { value: "2", label: "Hackathon wins", fill: 2, mobile: 1 },
  { value: "15", label: "Languages", fill: 10 },
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
    ["C#", "csharp", "Enterprise duty.", "Y&L Consulting", 60],
    ["JavaScript", "javascript", "Equipped daily.", "Everywhere", 95],
    ["SQL", "postgresql", "38 tables and counting.", "Aloha TT, Y&L, Thrivent", 85],
    ["PHP", "php", "Legacy slayer.", "Y&L Consulting", 60],
    ["Java", "openjdk", "Coursework and ICPC.", "UTSA", 70],
    ["C++", "cplusplus", "ICPC weapon.", "Competitive programming", 65],
    ["HTML/CSS", "html5", "Since forever.", "Everything with a browser", 97],
    ["GDScript", "godotengine", "Main hand for games.", "Undead Presidents", 88],
    ["Bash", "gnubash", "Scripts and deploys.", "All the servers", 72],
    ["VB.NET", "dotnet", "Acquired Sep 2026.", "Y&L Consulting", 45],
    ["PowerShell", "powershell", "Admin scripts.", "Y&L Consulting", 50],
    ["Liquid", "shopify", "Shopify themes.", "Servco, Byrna Leeward", 70],
    ["Go", "go", "Form-to-email scripts.", "MCAV Printing", 40],
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
    ["ASP.NET", "dotnet", ".NET Framework duty.", "Y&L Consulting", 50],
    ["jQuery", "jquery", "Legacy front ends.", "Y&L, MCAV", 65],
    ["Bootstrap", "bootstrap", "Fast responsive layouts.", "Y&L, MCAV", 70],
    ["WordPress", "wordpress", "Legacy CMS wrangler.", "Y&L Consulting", 55],
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
    ["Azure DevOps", "azuredevops", "Where the work lives.", "Y&L Consulting", 55],
    ["Visual Studio", "visualstudio", "VB.NET home base.", "Y&L Consulting", 60],
    ["Microsoft 365", "microsoftteams", "Entra, Exchange, Teams.", "Y&L Consulting", 65],
    ["Shopify", "shopify", "Merch stores shipped.", "Servco, Byrna Leeward", 75],
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

/** Guestbook avatars as [icon, label], in picker order. Entries store the index, so only append. */
export const GB_ICONS = [
  ["playstation", "PlayStation"],
  ["fortnite", "Fortnite"],
  ["leagueoflegends", "League of Legends"],
  ["valorant", "Valorant"],
  ["counterstrike", "Counter-Strike"],
  ["dota2", "Dota 2"],
  ["undertale", "Undertale"],
  ["roblox", "Roblox"],
  ["xbox", "Xbox"],
  ["nintendoswitch", "Nintendo Switch"],
  ["nintendogamecube", "GameCube"],
  ["sega", "Sega"],
  ["atari", "Atari"],
  ["pubg", "PUBG"],
  ["osu", "osu!"],
  ["steamdeck", "Steam Deck"],
  ["retroarch", "RetroArch"],
] as const;

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

/** Testimonials, carried over from the old site. Avatars live in /public/images/avatars. */
export const REVIEWS: { name: string; from: string; avatar: string; quote: string }[] = [
  {
    name: "Huey Ho",
    from: "Byrna Leeward",
    avatar: "avatar-1.jpg",
    quote: "Working together was a smooth experience, clear communication and a consistently supportive attitude made it enjoyable.",
  },
  {
    name: "John Paul Toñacao",
    from: "MCAV Tarpaulin Printing Services",
    avatar: "avatar-2.jpg",
    quote: "He's dependable, quick to respond, and delivers high-quality results. He also offered valuable insights, some of which we ended up using, adding extra value to the project.",
  },
  {
    name: "Brad Herbert",
    from: "NSITE Principal",
    avatar: "avatar-5.jpg",
    quote: "His proactive approach to learning, insightful questions, and dedication to academic excellence make him a standout individual who will undoubtedly succeed in any endeavor.",
  },
  {
    name: "Samuel Ang",
    from: "CS Professor @ UTSA",
    avatar: "avatar-6.jpg",
    quote: "Steve is an exceptionally proactive student who consistently excelled through his eagerness to learn and his thoughtful, engaging questions.",
  },
  {
    name: "Veronica Herrera",
    from: "NSITE Counselor",
    avatar: "avatar-7.jpg",
    quote: "Steve is a very studious and intelligent person. He has worked very hard to be at the top of his class. He is always eager to learn and takes the initiative!",
  },
  {
    name: "Chad Hoggard",
    from: "CodeQuantum '25 Hackathon",
    avatar: "avatar-8.jpg",
    quote: "Steve's React skills created an engaging, user-friendly experience, it made our project stand out! He was also a great team player and brought us to victory!",
  },
  {
    name: "Christian Hockley",
    from: "SilvesBro",
    avatar: "avatar-3.jpg",
    quote: "Great to work with and we finished the project in a timely manner. He was not afraid to help out with other tasks and was a great team player.",
  },
  {
    name: "Frank Podraza",
    from: "Developer of Castle Wars",
    avatar: "avatar-4.jpg",
    quote: "A highly skilled and innovative game developer, I participated in an 'Undead Presidents' playtest and was impressed by the level of detail.",
  },
];
