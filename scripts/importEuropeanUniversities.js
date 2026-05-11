import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing env variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const COUNTRIES = [
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "BE", name: "Belgium" },
  { code: "AT", name: "Austria" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "NO", name: "Norway" },
  { code: "PT", name: "Portugal" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "HU", name: "Hungary" },
  { code: "RO", name: "Romania" },
  { code: "IE", name: "Ireland" },
  { code: "GR", name: "Greece" },
];

const ROR_PAGE_SIZE = 20; // ROR v1 max per page

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractRorId(rorUrl) {
  return String(rorUrl).replace("https://ror.org/", "");
}

function mapRorToRow(org, countryName) {
  const rorId = extractRorId(org.id);

  // ROR v2: name is in names[] array; prefer ror_display type
  const name =
    org.names?.find((n) => n.types?.includes("ror_display"))?.value ??
    org.names?.[0]?.value ??
    org.name ?? // v1 fallback
    null;

  // ROR v2: links is [{type, value}]; v1 was array of strings
  const websiteLink = org.links?.find((l) => l.type === "website");
  const website = websiteLink
    ? websiteLink.value
    : typeof org.links?.[0] === "string"
    ? org.links[0]
    : null;

  // ROR v2: location is in locations[].geonames_details; v1 was addresses[]
  const geo = org.locations?.[0]?.geonames_details;
  const address = Array.isArray(org.addresses) ? org.addresses[0] : null;

  return {
    scorecard_id: `ror-${rorId}`,
    slug: `${slugify(name)}-${rorId}`,
    name,
    country: countryName,
    city: geo?.name ?? address?.city ?? null,
    state: geo?.country_subdivision_name ?? address?.state ?? null,
    zip: address?.postcode ?? null,
    website,
    latitude: geo?.lat ?? address?.lat ?? null,
    longitude: geo?.lng ?? address?.lng ?? null,
    ownership: null,
    predominant_degree: null,
    school_type: null,
    acceptance_rate: null,
    sat_average: null,
    act_midpoint: null,
    tuition_in_state: null,
    tuition_out_of_state: null,
    total_cost: null,
    application_fee: null,
    student_size: null,
    completion_rate: null,
    median_earnings_10yrs: null,
    median_debt: null,
    raw: org,
    updated_at: new Date().toISOString(),
  };
}

async function fetchPage(countryCode, page) {
  const url =
    `https://api.ror.org/organizations` +
    `?filter=types:Education,country.country_code:${countryCode}` +
    `&page=${page}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "PlanUrFuture-importer/1.0" },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ROR API ${res.status} for ${countryCode}: ${text}`);
  }

  return res.json();
}

async function upsertBatch(rows) {
  const DRY_RUN = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";

  if (DRY_RUN) {
    console.log(`  DRY_RUN — would upsert ${rows.length} rows`);
    return;
  }

  const { error } = await supabase
    .from("universities")
    .upsert(rows, { onConflict: "scorecard_id" });

  if (error) throw error;
}

async function importCountry({ code, name }) {
  let page = 1;
  let total = 0;

  while (true) {
    console.log(`  [${code}] page ${page}...`);

    const data = await fetchPage(code, page);
    const rawItems = data.items ?? [];

    if (rawItems.length === 0) break;

    const rows = rawItems
      .filter(
        (org) =>
          org.status?.toLowerCase() === "active" &&
          Array.isArray(org.types) &&
          org.types.some((t) => t.toLowerCase() === "education")
      )
      .map((org) => mapRorToRow(org, name))
      .filter((row) => row.name);

    if (rows.length > 0) {
      await upsertBatch(rows);
      total += rows.length;
      console.log(`  [${code}] page ${page}: +${rows.length} (total ${total})`);
    }

    // Stop when API returns fewer than a full page — means we're on the last page
    if (rawItems.length < ROR_PAGE_SIZE) break;

    page++;
    await new Promise((r) => setTimeout(r, 250));
  }

  return total;
}

async function main() {
  let grandTotal = 0;

  for (const country of COUNTRIES) {
    console.log(`\nImporting ${country.name} (${country.code})...`);
    try {
      const count = await importCountry(country);
      grandTotal += count;
      console.log(`  => ${count} universities imported.`);
    } catch (err) {
      console.error(`  ERROR for ${country.name}: ${err.message}`);
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\nDone. Total imported/updated: ${grandTotal}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
