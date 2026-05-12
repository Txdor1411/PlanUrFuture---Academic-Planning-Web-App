"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface SupabaseUserInfo {
  email?: string;
  full_name?: string;
}

export function useSupabaseUser(): SupabaseUserInfo | undefined {
  const [user, setUser] = useState<SupabaseUserInfo | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data: { user: authUser } }) => {
      if (!mounted || !authUser) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", authUser.id)
        .maybeSingle();
      if (mounted) {
        setUser({
          email: authUser.email ?? undefined,
          full_name: profile?.full_name ?? undefined,
        });
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return user;
}
