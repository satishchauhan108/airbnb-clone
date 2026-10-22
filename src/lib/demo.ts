/**
 * Demo mode enables a read-only listing UI without PostgreSQL.
 * It activates when DEMO_MODE=true or when DATABASE_URL is unset.
 * Production database paths are unchanged when DATABASE_URL is configured
 * and DEMO_MODE is not forced on.
 */
export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === "true") return true;
  if (process.env.DEMO_MODE === "false") return false;
  return !process.env.DATABASE_URL;
}
