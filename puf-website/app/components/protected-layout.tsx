"use client";

import { redirect } from "next/navigation";
import Sidebar from "@/app/components/sidebar";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ReactNode } from "react";

async function signOut() {
  "use server";
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/auth");
}

export function ProtectedLayout({
  children,
  user,
}: {
  children: ReactNode;
  user?: { email?: string; full_name?: string };
}) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <Sidebar 
        user={user}
        onSignOut={async () => {
          "use server";
          await signOut();
        }}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
