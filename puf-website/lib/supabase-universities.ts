export type SupabaseUniversity = {
  id: number;
  scorecard_id: string;
  slug: string;
  name: string;
  country: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  website: string | null;
  ownership: string | null;
  school_type: string | null;
  acceptance_rate: number | null;
  sat_average: number | null;
  act_midpoint: number | null;
  tuition_in_state: number | null;
  tuition_out_of_state: number | null;
  total_cost: number | null;
  application_fee: number | null;
  student_size: number | null;
  completion_rate: number | null;
  median_earnings_10yrs: number | null;
  median_debt: number | null;
  world_ranking: number | null;
  world_ranking_score: number | null;
  overview: string | null;
  admission_tips: string | null;
  financial_aid_notes: string | null;
  application_steps: string[] | null;
};

export type UniversityListItem = Pick<
  SupabaseUniversity,
  | "id"
  | "slug"
  | "name"
  | "city"
  | "state"
  | "country"
  | "website"
  | "acceptance_rate"
  | "tuition_out_of_state"
  | "world_ranking"
  | "world_ranking_score"
  | "ownership"
  | "school_type"
>;

export const PAGE_SIZE = 24;

export function formatAcceptanceRate(rate: number | null): string {
  if (rate === null) return "N/A";
  return `${(rate * 100).toFixed(1)}%`;
}

export function formatCurrency(amount: number | null, suffix = "/year"): string {
  if (amount === null) return "N/A";
  return `$${amount.toLocaleString("en-US")}${suffix}`;
}

export function formatLocation(city: string | null, state: string | null): string {
  if (city && state) return `${city}, ${state}`;
  if (city) return city;
  if (state) return state;
  return "";
}
