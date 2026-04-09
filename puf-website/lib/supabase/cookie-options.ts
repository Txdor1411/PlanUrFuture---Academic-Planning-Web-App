export const supabaseCookieOptions = {
  lifetime: 60 * 60 * 24 * 30, // 30 days
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};
