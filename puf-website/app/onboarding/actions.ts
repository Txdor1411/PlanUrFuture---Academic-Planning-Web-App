"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function splitToArray(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getSelectedCountries(formData: FormData) {
  const selected = formData
    .getAll("preferredCountries")
    .map((value) => String(value).trim())
    .filter(Boolean);

  if (selected.length > 0) {
    return selected;
  }

  return splitToArray(formData.get("preferredCountries"));
}

function getSelectedPrograms(formData: FormData) {
  const selected = formData
    .getAll("targetPrograms")
    .map((value) => String(value).trim())
    .filter(Boolean);

  const custom = splitToArray(formData.get("targetProgramsCustom"));

  // Keep insertion order while removing duplicates.
  const merged = [...selected, ...custom];
  if (merged.length > 0) {
    return Array.from(new Set(merged));
  }

  // Backward compatibility for older form payloads.
  return splitToArray(formData.get("targetPrograms"));
}

export async function saveOnboarding(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const role = String(formData.get("role") ?? "student");
  const preferredCountries = getSelectedCountries(formData);
  const targetPrograms = getSelectedPrograms(formData);

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      full_name: fullName,
      bio,
      role,
      preferred_countries: preferredCountries,
      target_programs: targetPrograms,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    if (error.code === "42P01" || error.code === "PGRST205") {
      redirect("/onboarding?error=schema_missing");
    }

    redirect(`/onboarding?error=save_failed&code=${encodeURIComponent(error.code ?? "unknown")}`);
  }

  redirect("/dashboard");
}
