"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function saveProfile(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const fullName = String(formData.get("fullName") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const role = String(formData.get("role") ?? "student");
  const goals = String(formData.get("goals") ?? "").trim();
  const classYear = String(formData.get("classYear") ?? "").trim();
  const satScore = formData.get("satScore")
    ? parseInt(String(formData.get("satScore")), 10)
    : null;

  const preferredCountries = formData
    .getAll("preferredCountries")
    .map((v) => String(v).trim())
    .filter(Boolean);

  const selectedPrograms = formData
    .getAll("targetPrograms")
    .map((v) => String(v).trim())
    .filter(Boolean);

  const customPrograms = String(formData.get("targetProgramsCustom") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const targetPrograms = Array.from(new Set([...selectedPrograms, ...customPrograms]));

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      full_name: fullName,
      bio,
      role,
      goals,
      class_year: classYear,
      sat_score: isNaN(satScore as number) ? null : satScore,
      preferred_countries: preferredCountries,
      target_programs: targetPrograms,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    redirect(`/profile?error=save_failed&code=${encodeURIComponent(error.code ?? "unknown")}`);
  }

  redirect("/profile?saved=1");
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/auth");
}
