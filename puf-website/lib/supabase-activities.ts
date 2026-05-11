export type ActivityCategory = "conference" | "project" | "volunteering" | "summer-camp";

export type SupabaseActivity = {
  id: number;
  slug: string;
  title: string;
  category: ActivityCategory;
  country: string;
  city: string | null;
  description: string;
  long_description: string | null;
  starts_at: string;
  ends_at: string;
  deadline: string | null;
  application_url: string | null;
  source_url: string | null;
  image_url: string | null;
  tags: string[];
  participants: string | null;
  age_requirement: string | null;
  cost_range: string | null;
  benefits: string[];
  target_audience: string[];
  created_at: string | null;
};

export type ActivityListItem = Pick<
  SupabaseActivity,
  | "id"
  | "slug"
  | "title"
  | "category"
  | "country"
  | "city"
  | "description"
  | "starts_at"
  | "ends_at"
  | "deadline"
  | "image_url"
  | "tags"
  | "participants"
>;

export const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  conference: "bg-sky-900/40 text-sky-300 border-sky-300/30",
  project: "bg-emerald-900/40 text-emerald-300 border-emerald-300/30",
  volunteering: "bg-amber-900/40 text-amber-300 border-amber-300/30",
  "summer-camp": "bg-fuchsia-900/40 text-fuchsia-300 border-fuchsia-300/30",
};

export const CATEGORY_COLORS_DETAIL: Record<
  ActivityCategory,
  { bg: string; text: string; border: string }
> = {
  conference: { bg: "bg-sky-900/20", text: "text-sky-300", border: "border-sky-300/30" },
  project: { bg: "bg-emerald-900/20", text: "text-emerald-300", border: "border-emerald-300/30" },
  volunteering: { bg: "bg-amber-900/20", text: "text-amber-300", border: "border-amber-300/30" },
  "summer-camp": { bg: "bg-fuchsia-900/20", text: "text-fuchsia-300", border: "border-fuchsia-300/30" },
};

export const CATEGORY_EMOJI: Record<ActivityCategory, string> = {
  conference: "🎤",
  project: "🚀",
  volunteering: "🤝",
  "summer-camp": "⛺",
};

export function categoryLabel(category: ActivityCategory): string {
  return category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");
}
