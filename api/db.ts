import path from 'node:path';
import dotenv from 'dotenv';
import pkg from 'pg';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
}

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: process.env.DB_HOST?.includes('supabase.com') ? { rejectUnauthorized: false } : false,
});
