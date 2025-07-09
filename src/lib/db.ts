// src/lib/db.ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: import.meta.env.NETLIFY_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}
