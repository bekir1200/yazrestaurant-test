import { drizzle } from "drizzle-orm/d1";

// Database-backed features are intentionally unavailable in the Vercel demo.
// The production edition will use a Vercel-compatible managed database.
export function getDb(): ReturnType<typeof drizzle> {
  throw new Error("Database features are disabled in the Vercel demonstration");
}
