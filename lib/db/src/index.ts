import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const SUPABASE_URL =
  "postgresql://postgres.abscdjclrctysnorsagj:Hami3246+2557@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres";

const connectionString =
  process.env.SUPABASE_DATABASE_URL ||
  process.env.DATABASE_URL ||
  SUPABASE_URL;

const isSupabase =
  connectionString.includes("supabase.com") ||
  !!process.env.SUPABASE_DATABASE_URL;

export const pool = new Pool({
  connectionString,
  ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
});
export const db = drizzle(pool, { schema });

export * from "./schema";
