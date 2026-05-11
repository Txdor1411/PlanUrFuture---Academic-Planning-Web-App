import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

// Fetches ARWU (Shanghai) rankings from OpenDataSoft public API — no API key needed.
// Usage: node importRankings.js [--dry-run]

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing env variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const DRY_RUN = process.argv.includes("--dry-run");

const API_BASE =
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/shanghai-world-university-ranking/records";

// ── helpers ────────────────────────────────────────────────────────────────

function normalizeName(name) {
  return String(name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\(.*?\)/g, "")        // strip "(MIT)", "(PKU)", etc.
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordSimilarity(a, b) {
  const aW = new Set(a.split(" ").filter((w) => w.length > 2));
  const bW = new Set(b.split(" ").filter((w) => w.length > 2));
  const inter = [...aW].filter((w) => bW.has(w)).length;
  const union = aW.size + bW.size - inter;
  return union === 0 ? 0 : inter / union;
}

// ── API fetch ─────────────────────────────────────────────────────────────

async function fetchLatestYear() {
  const url = `${API_BASE}?select=year&order_by=year+desc&limit=1`;
  const res = await fetch(url, { headers: { "User-Agent": "PlanUrFuture/1.0" } });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  return data.results?.[0]?.year ?? null;
}

async function fetchRankingsForYear(year) {
  const results = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const params = new URLSearchParams({
      select: "university_name,country,world_rank_int,total_score",
      refine: `year:${year}`,
      order_by: "world_rank_int asc",
      limit: String(limit),
      offset: String(offset),
    });

    const res = await fetch(`${API_BASE}?${params}`, {
      headers: { "User-Agent": "PlanUrFuture/1.0" },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error ${res.status} at offset ${offset}: ${text.slice(0, 200)}`);
    }
    const data = await res.json();

    const batch = data.results ?? [];
    results.push(...batch);

    if (batch.length < limit) break;
    offset += limit;
    await new Promise((r) => setTimeout(r, 150));
  }

  return results;
}

// ── DB matching ───────────────────────────────────────────────────────────

// Strip generic words that add noise ("university", "of", "the", "institute")
const STOPWORDS = new Set(["university", "universite", "universitat", "universidade",
  "universidad", "universita", "universite", "college", "institute", "school",
  "national", "federal", "state", "the", "and", "for", "of", "at", "in"]);

function significantWords(normalized) {
  return normalized.split(" ").filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

async function queryDB(pattern, country) {
  let qb = supabase
    .from("universities")
    .select("id, name, country")
    .ilike("name", pattern)
    .limit(20);
  if (country) qb = qb.eq("country", country);
  const { data } = await qb;
  return data ?? [];
}

async function findMatch(name, country) {
  const norm = normalizeName(name);
  const sigWords = significantWords(norm);
  const allWords = norm.split(" ").filter((w) => w.length > 3);

  if (allWords.length === 0) return null;

  // Build a list of search patterns from most-specific to least-specific
  const patterns = [];

  // 3-word chain (in order)
  if (allWords.length >= 3) patterns.push(`%${allWords.slice(0, 3).join("%")}%`);
  // 2-word chain
  if (allWords.length >= 2) patterns.push(`%${allWords.slice(0, 2).join("%")}%`);
  // 2 significant words (skipping stopwords)
  if (sigWords.length >= 2) patterns.push(`%${sigWords.slice(0, 2).join("%")}%`);
  // First significant word only (broadest)
  if (sigWords.length >= 1) patterns.push(`%${sigWords[0]}%`);

  for (const pattern of patterns) {
    // Try with country filter first, then without
    for (const c of [country, null]) {
      const candidates = await queryDB(pattern, c);
      if (candidates.length === 0) continue;

      const best = candidates
        .map((u) => ({ ...u, sim: wordSimilarity(normalizeName(u.name), norm) }))
        .sort((a, b) => b.sim - a.sim)[0];

      // Accept if similarity is good enough; be stricter for broad patterns
      const threshold = pattern.replace(/%/g, "").length < 6 ? 0.5 : 0.35;
      if (best.sim >= threshold) return best;
    }
  }

  return null;
}

// ── main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("Fetching latest year from ARWU API...");
  const year = await fetchLatestYear();
  if (!year) throw new Error("Could not determine latest ranking year.");
  console.log(`Latest year: ${year}\n`);

  console.log(`Fetching rankings for ${year}...`);
  const rankings = await fetchRankingsForYear(year);
  console.log(`Fetched ${rankings.length} ranked universities.\n`);

  if (DRY_RUN) console.log("DRY RUN — no DB writes\n");

  let matched = 0, unmatched = 0;

  for (const entry of rankings) {
    const rank = entry.world_rank_int;
    const name = entry.university_name?.trim();
    const country = entry.country?.trim() || null;
    const score = entry.total_score ? parseFloat(entry.total_score) : null;

    if (!name || !rank) continue;

    const match = await findMatch(name, country);

    if (!match) {
      console.log(`  UNMATCHED [#${rank}] "${name}" (${country ?? "?"})`);
      unmatched++;
      continue;
    }

    console.log(`  #${rank} "${name}" → "${match.name}" (sim ${match.sim.toFixed(2)})`);

    if (!DRY_RUN) {
      const { error } = await supabase
        .from("universities")
        .update({
          world_ranking: rank,
          ...(score !== null ? { world_ranking_score: score } : {}),
        })
        .eq("id", match.id);

      if (error) console.error(`    ERROR: ${error.message}`);
    }

    matched++;
    await new Promise((r) => setTimeout(r, 50));
  }

  console.log(`\nDone. Matched: ${matched} | Unmatched: ${unmatched}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
