const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const publicAppUrl = process.env.NEXT_PUBLIC_APP_URL;

function isLocalhostUrl(value: string) {
  try {
    const url = new URL(value);
    return url.hostname === "localhost" || url.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

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
  if (typeof window !== "undefined") {
    const currentOrigin = window.location.origin;

    if (publicAppUrl) {
      const envIsLocalhost = isLocalhostUrl(publicAppUrl);
      const originIsLocalhost = isLocalhostUrl(currentOrigin);

      // If production is live but env is still localhost, prefer the live origin.
      if (envIsLocalhost && !originIsLocalhost) {
        return currentOrigin;
      }

      return publicAppUrl;
    }

    return currentOrigin;
  }

  if (publicAppUrl) {
    return publicAppUrl;
  }

  return process.env.NODE_ENV === "production"
    ? "https://platform.puffeducation.org"
    : "http://localhost:3000";
}
