import "dotenv/config";

export default {
  schema: "./db/schema.ts", // lub ./src/db/schema.ts
  out: "./drizzle",
  driver: "pg", // np. pg, sqlite, mysql
};
