import "server-only";
import { MOCK } from "./redis";
import { QUIPS, SITE } from "./site";

/**
 * Side Quests data. Every widget resolves to live or offline; loading is the
 * Suspense fallback while the page streams. Pages that use these revalidate
 * every 10 minutes (ISR). Set FEEDS_MODE=mock to serve the design's mock data.
 */
export type Feed<T> = { state: "live"; data: T } | { state: "offline" };

export type GitHubData = {
  total: number;
  heat: number[];
  commit?: { sha: string; message: string; repo: string; ago: string; url: string };
};
export type NowPlayingData = { track: string; artist: string; art?: string; nowPlaying: boolean; ago?: string; url?: string };
export type YouTubeData = { title: string; thumb?: string; url: string; subscribers: number; views: number };
export type SteamData = {
  totalHours: number;
  current?: { name: string; cover?: string; playing: boolean };
  recent: { name: string; hours: number }[];
};
export type WeatherIcon = "sun" | "moon" | "partly" | "cloud" | "fog" | "rain" | "snow" | "storm";
export type WeatherData = { tempF: number; desc: string; icon: WeatherIcon; quip: string };

const REVALIDATE = 600;
const opts = (init?: RequestInit): RequestInit & { next: { revalidate: number } } => ({
  ...init,
  signal: AbortSignal.timeout(6000),
  next: { revalidate: REVALIDATE },
});

async function json<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, opts(init));
  if (!res.ok) throw new Error(`${res.status} ${url.split("?")[0]}`);
  return res.json() as Promise<T>;
}

async function settle<T>(name: string, fn: () => Promise<T | null>): Promise<Feed<T>> {
  try {
    const data = await fn();
    return data ? { state: "live", data } : { state: "offline" };
  } catch (err) {
    console.warn(`[feeds] ${name} offline:`, (err as Error).message);
    return { state: "offline" };
  }
}

export function ago(ms: number) {
  const s = Math.max(0, (Date.now() - ms) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

/* ------------------------------------------------------------------ mocks */

const MOCK_HEAT = [0, 1, 0, 2, 3, 1, 0, 4, 2, 1, 3, 0, 1, 2, 4, 3, 1, 0, 2, 3, 4, 2, 1, 0, 1, 3, 2, 4, 1, 0, 2, 1, 3, 4, 2, 0, 1, 2, 3, 1, 4, 2, 0, 1, 3, 2, 4, 3, 1, 2, 0, 4];

const MOCKS = {
  github: {
    total: 1284,
    heat: MOCK_HEAT,
    commit: { sha: "a3f9c1", message: "fix: idempotent stripe webhook replay", repo: "aloha-tt", ago: "2h ago", url: SITE.links.github },
  } satisfies GitHubData,
  nowPlaying: { track: "Under the Bridge", artist: "Red Hot Chili Peppers", nowPlaying: true } satisfies NowPlayingData,
  youtube: {
    title: "Why every guitarist should learn one jazz standard",
    url: SITE.links.youtube,
    subscribers: 2140,
    views: 186000,
  } satisfies YouTubeData,
  steam: {
    totalHours: 412,
    current: { name: "Hades II", playing: true },
    recent: [
      { name: "Undead Presidents (dev build)", hours: 38 },
      { name: "Risk of Rain 2", hours: 12 },
      { name: "Balatro", hours: 9 },
    ],
  } satisfies SteamData,
  weather: { tempF: 98, desc: "clear", icon: "sun", quip: QUIPS[0] } satisfies WeatherData,
};

/* ----------------------------------------------------------------- GitHub */

export function getGitHub() {
  return settle<GitHubData>("github", async () => {
    if (MOCK) return MOCKS.github;
    const token = process.env.GITHUB_TOKEN;
    const login = process.env.GITHUB_USERNAME ?? "steveweenie";
    if (!token) return null;
    const headers = { Authorization: `Bearer ${token}`, "User-Agent": "stevecoder.com" };

    type Cal = {
      data: { user: { contributionsCollection: { contributionCalendar: { totalContributions: number; weeks: { contributionDays: { contributionCount: number }[] }[] } } } };
    };
    const cal = await json<Cal>("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{contributionCount}}}}}}`,
        variables: { login },
      }),
    });
    const c = cal.data.user.contributionsCollection.contributionCalendar;
    const weekly = c.weeks.slice(-52).map((w) => w.contributionDays.reduce((a, d) => a + d.contributionCount, 0));
    const max = Math.max(1, ...weekly);
    const heat = weekly.map((v) => (v === 0 ? 0 : Math.min(4, Math.ceil((v / max) * 4))));

    // Latest pushed commit: newest PushEvent, then look up its head commit.
    let commit: GitHubData["commit"];
    try {
      type Ev = { type: string; created_at: string; repo: { name: string }; payload: { head?: string } };
      const events = await json<Ev[]>(`https://api.github.com/users/${login}/events/public?per_page=30`, { headers });
      const push = events.find((e) => e.type === "PushEvent" && e.payload.head);
      if (push?.payload.head) {
        const detail = await json<{ sha: string; html_url: string; commit: { message: string } }>(
          `https://api.github.com/repos/${push.repo.name}/commits/${push.payload.head}`,
          { headers },
        );
        commit = {
          sha: detail.sha.slice(0, 6),
          message: detail.commit.message.split("\n")[0],
          repo: push.repo.name.split("/")[1],
          ago: ago(Date.parse(push.created_at)),
          url: detail.html_url,
        };
      }
    } catch (err) {
      console.warn("[feeds] github commit lookup failed:", (err as Error).message);
    }
    return { total: c.totalContributions, heat, commit };
  });
}

/* ---------------------------------------------------------------- Last.fm */

export function getNowPlaying() {
  return settle<NowPlayingData>("lastfm", async () => {
    if (MOCK) return MOCKS.nowPlaying;
    const key = process.env.LASTFM_API_KEY;
    const user = process.env.LASTFM_USERNAME;
    if (!key || !user) return null;
    type R = {
      recenttracks: {
        track: {
          name: string;
          url: string;
          artist: { "#text": string };
          image: { "#text": string; size: string }[];
          date?: { uts: string };
          "@attr"?: { nowplaying?: string };
        }[];
      };
    };
    const r = await json<R>(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${key}&format=json&limit=1`,
    );
    const t = r.recenttracks.track[0];
    if (!t) return null;
    const art = t.image.find((i) => i.size === "large")?.["#text"] || t.image.at(-1)?.["#text"];
    const nowPlaying = t["@attr"]?.nowplaying === "true";
    return {
      track: t.name,
      artist: t.artist["#text"],
      // Last.fm's grey star is its "no art" image.
      art: art && !art.includes("2a96cbd8b46e442fc41c2b86b821562f") ? art : undefined,
      nowPlaying,
      ago: !nowPlaying && t.date ? ago(+t.date.uts * 1000) : undefined,
      url: t.url,
    };
  });
}

/* ---------------------------------------------------------------- YouTube */

export function getYouTube() {
  return settle<YouTubeData>("youtube", async () => {
    if (MOCK) return MOCKS.youtube;
    const key = process.env.YOUTUBE_API_KEY;
    if (!key) return null;
    const id = process.env.YOUTUBE_CHANNEL_ID;
    const handle = process.env.YOUTUBE_HANDLE ?? "guitargatekeeper";
    type Ch = { items?: { statistics: { subscriberCount: string; viewCount: string }; contentDetails: { relatedPlaylists: { uploads: string } } }[] };
    const ch = await json<Ch>(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails&${id ? `id=${id}` : `forHandle=${encodeURIComponent("@" + handle)}`}&key=${key}`,
    );
    const c = ch.items?.[0];
    if (!c) return null;
    type Pl = { items?: { snippet: { title: string; resourceId: { videoId: string }; thumbnails: Record<string, { url: string }> } }[] };
    const pl = await json<Pl>(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${c.contentDetails.relatedPlaylists.uploads}&key=${key}`,
    );
    const v = pl.items?.[0]?.snippet;
    const th = v?.thumbnails;
    return {
      title: v?.title ?? "",
      thumb: th?.maxres?.url ?? th?.high?.url ?? th?.medium?.url,
      url: v ? `https://www.youtube.com/watch?v=${v.resourceId.videoId}` : SITE.links.youtube,
      subscribers: +c.statistics.subscriberCount,
      views: +c.statistics.viewCount,
    };
  });
}

/* ------------------------------------------------------------------ Steam */

const steamCover = (appid: string | number) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;

export function getSteam() {
  return settle<SteamData>("steam", async () => {
    if (MOCK) return MOCKS.steam;
    const key = process.env.STEAM_API_KEY;
    const sid = process.env.STEAM_ID;
    if (!key || !sid) return null;
    const base = "https://api.steampowered.com";
    type Sum = { response: { players: { gameextrainfo?: string; gameid?: string }[] } };
    type Games = { response: { total_count?: number; game_count?: number; games?: { appid: number; name?: string; playtime_forever: number }[] } };
    const [sum, recent, owned] = await Promise.all([
      json<Sum>(`${base}/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=${sid}`),
      json<Games>(`${base}/IPlayerService/GetRecentlyPlayedGames/v1/?key=${key}&steamid=${sid}&count=4`),
      json<Games>(`${base}/IPlayerService/GetOwnedGames/v1/?key=${key}&steamid=${sid}&include_played_free_games=1`),
    ]);
    const p = sum.response.players[0];
    const games = recent.response.games ?? [];
    const totalMin = (owned.response.games ?? []).reduce((a, g) => a + g.playtime_forever, 0);
    const playing = p?.gameextrainfo && p.gameid ? { name: p.gameextrainfo, cover: steamCover(p.gameid), playing: true } : undefined;
    const last = games[0] ? { name: games[0].name ?? "", cover: steamCover(games[0].appid), playing: false } : undefined;
    return {
      totalHours: Math.round(totalMin / 60),
      current: playing ?? last,
      recent: games
        .filter((g) => g.name !== playing?.name)
        .slice(0, 3)
        .map((g) => ({ name: g.name ?? `App ${g.appid}`, hours: Math.round(g.playtime_forever / 60) })),
    };
  });
}

/* ---------------------------------------------------------------- Weather */

function describe(code: number) {
  if (code === 0) return "clear";
  if (code <= 2) return "partly cloudy";
  if (code === 3) return "cloudy";
  if (code <= 48) return "fog";
  if (code <= 57) return "drizzle";
  if (code <= 67) return "rain";
  if (code <= 77) return "snow";
  if (code <= 82) return "showers";
  if (code <= 86) return "snow showers";
  return "storms";
}

function iconFor(code: number, day: boolean): WeatherIcon {
  if (code === 0) return day ? "sun" : "moon";
  if (code <= 2) return day ? "partly" : "moon";
  if (code === 3) return "cloud";
  if (code <= 48) return "fog";
  if (code <= 67 || (code >= 80 && code <= 82)) return "rain";
  if (code <= 77 || code === 85 || code === 86) return "snow";
  return "storm";
}

export function getWeather() {
  return settle<WeatherData>("weather", async () => {
    if (MOCK) return MOCKS.weather;
    const { lat, lon, tz } = SITE.location;
    type W = { current: { temperature_2m: number; weather_code: number; is_day: number } };
    const w = await json<W>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&temperature_unit=fahrenheit&timezone=${encodeURIComponent(tz)}`,
    );
    // Rotate the quip every 10 minutes (one per ISR window).
    const quip = QUIPS[Math.floor(Date.now() / (REVALIDATE * 1000)) % QUIPS.length];
    const { temperature_2m, weather_code, is_day } = w.current;
    return { tempF: Math.round(temperature_2m), desc: describe(weather_code), icon: iconFor(weather_code, is_day === 1), quip };
  });
}

export const fmt = {
  int: (n: number) => n.toLocaleString("en-US"),
  compact: (n: number) =>
    new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: n < 10000 && n >= 1000 ? 1 : 0 })
      .format(n)
      .toLowerCase(),
};
