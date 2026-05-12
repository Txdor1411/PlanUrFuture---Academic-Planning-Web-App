import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const COLLEGE_SCORECARD_KEY = process.env.COLLEGE_SCORECARD_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !COLLEGE_SCORECARD_KEY) {
  console.error("Missing env variables.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";

const fields = [
  "id",
  "school.name",
  "school.city",
  "school.state",
  "school.zip",
  "school.school_url",
  "school.ownership",
  "school.degrees_awarded.predominant",
  "school.institutional_characteristics.level",
  "location.lat",
  "location.lon",

  "latest.admissions.admission_rate.overall",
  "latest.admissions.sat_scores.average.overall",
  "latest.admissions.act_scores.midpoint.cumulative",

  "latest.cost.tuition.in_state",
  "latest.cost.tuition.out_of_state",
  "latest.cost.attendance.academic_year",
  "latest.cost.application_fee",

  "latest.student.size",
  "latest.completion.completion_rate_4yr_150nt",
  "latest.earnings.10_yrs_after_entry.median",
  "latest.aid.median_debt.completers.overall"
];

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function get(obj, path) {
  if (obj == null) return undefined;

  // If the API returned flattened keys like 'school.name', the object may contain
  // the full dotted path as a single key. Prefer that first.
  if (Object.prototype.hasOwnProperty.call(obj, path)) return obj[path];

  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function cleanWebsite(url) {
  if (!url) return null;

  let website = String(url).trim();

  if (!website.startsWith("http://") && !website.startsWith("https://")) {
    website = `https://${website}`;
  }

  return website;
}

function ownershipLabel(value) {
  const map = {
    1: "Public",
    2: "Private nonprofit",
    3: "Private for-profit"
  };

  return map[value] || null;
}

function schoolTypeLabel(value) {
  const map = {
    1: "4-year",
    2: "2-year",
    3: "Less-than-2-year"
  };

  return map[value] || null;
}

function mapSchoolToRow(school) {
  const scorecardId = String(school.id);
  const name = get(school, "school.name");

  return {
    scorecard_id: scorecardId,
    slug: `${slugify(name)}-${scorecardId}`,

    name,
    country: "USA",
    city: get(school, "school.city"),
    state: get(school, "school.state"),
    zip: get(school, "school.zip"),
    website: cleanWebsite(get(school, "school.school_url")),

    latitude: get(school, "location.lat"),
    longitude: get(school, "location.lon"),

    ownership: ownershipLabel(get(school, "school.ownership")),
    predominant_degree: get(school, "school.degrees_awarded.predominant"),
    school_type: schoolTypeLabel(get(school, "school.institutional_characteristics.level")),

    acceptance_rate: get(school, "latest.admissions.admission_rate.overall"),
    sat_average: get(school, "latest.admissions.sat_scores.average.overall"),
    act_midpoint: get(school, "latest.admissions.act_scores.midpoint.cumulative"),

    tuition_in_state: get(school, "latest.cost.tuition.in_state"),
    tuition_out_of_state: get(school, "latest.cost.tuition.out_of_state"),
    total_cost: get(school, "latest.cost.attendance.academic_year"),
    application_fee: get(school, "latest.cost.application_fee"),

    student_size: get(school, "latest.student.size"),
    completion_rate: get(school, "latest.completion.completion_rate_4yr_150nt"),
    median_earnings_10yrs: get(school, "latest.earnings.10_yrs_after_entry.median"),
    median_debt: get(school, "latest.aid.median_debt.completers.overall"),

    raw: school,
    updated_at: new Date().toISOString()
  };
}

async function fetchPage(page) {
  const params = new URLSearchParams({
    api_key: COLLEGE_SCORECARD_KEY,
    "school.operating": "1",
    "school.degrees_awarded.predominant": "3",
    fields: fields.join(","),
    page: String(page),
    per_page: "100"
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`College Scorecard error ${response.status}: ${text}`);
  }

  return response.json();
}

async function upsertBatch(rows) {
  const DRY_RUN = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";

  if (DRY_RUN) {
    console.log(`DRY_RUN enabled — would upsert ${rows.length} rows`);
    return;
  }

  const { error } = await supabase
    .from("universities")
    .upsert(rows, {
      onConflict: "scorecard_id"
    });

  if (error) throw error;
}

async function importUniversities() {
  let page = 0;
  let totalImported = 0;

  while (true) {
    console.log(`Fetching page ${page}...`);

    const data = await fetchPage(page);
    const results = data.results || [];

    if (results.length === 0) break;

    const rows = results
      .map(mapSchoolToRow)
      .filter((row) => row.name && row.scorecard_id);

    await upsertBatch(rows);

    totalImported += rows.length;
    console.log(`Imported page ${page}: ${rows.length}. Total: ${totalImported}`);

    if (results.length < 100) break;

    page++;
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  console.log(`Done. Imported/updated ${totalImported} universities.`);
}

importUniversities().catch((error) => {
  console.error(error);
  process.exit(1);
});