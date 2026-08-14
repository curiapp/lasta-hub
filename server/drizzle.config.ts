import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db',
  dialect: 'postgresql',
  schemaFilter: [
    "public",
    "workflow"
  ],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
