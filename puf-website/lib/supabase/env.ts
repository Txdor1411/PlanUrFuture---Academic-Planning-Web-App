const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const publicAppUrl = process.env.NEXT_PUBLIC_APP_URL;

export function hasSupabaseEnv() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseEnv() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  };
}

export function hasServiceRoleEnv() {
  return Boolean(supabaseServiceRoleKey);
}

export function getServiceRoleKey() {
  if (!supabaseServiceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing. Set it in .env.local for secure server-side writes."
    );
  }

  return supabaseServiceRoleKey;
}

export function getAppBaseUrl() {
  if (publicAppUrl) {
    return publicAppUrl;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return process.env.NODE_ENV === "production"
    ? "https://platform.puffeducation.org"
    : "http://localhost:3000";
}
