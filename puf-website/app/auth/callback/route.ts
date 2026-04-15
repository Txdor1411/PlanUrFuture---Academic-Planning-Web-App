import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getAppBaseUrl } from "@/lib/supabase/env";

function getSafeNextPath(nextParam: string | null) {
  if (!nextParam) {
    return "/dashboard";
  }

  // Allow only internal paths to avoid open redirect issues.
  if (nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    return nextParam;
  }

  return "/dashboard";
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const appBaseUrl = getAppBaseUrl();
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const next = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (error) {
    const authUrl = new URL("/auth", appBaseUrl);
    authUrl.searchParams.set("error", errorDescription ?? error);
    return NextResponse.redirect(authUrl);
  }

  if (!code) {
    const authUrl = new URL("/auth", appBaseUrl);
    authUrl.searchParams.set("error", "Lipsește codul de autentificare Google.");
    return NextResponse.redirect(authUrl);
  }

  const supabase = await createServerSupabaseClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    const authUrl = new URL("/auth", appBaseUrl);
    authUrl.searchParams.set("error", exchangeError.message);
    return NextResponse.redirect(authUrl);
  }

  return NextResponse.redirect(new URL(next, appBaseUrl));
}
