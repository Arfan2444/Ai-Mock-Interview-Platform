/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_NzPsE65vVhMt@ep-soft-sea-a4e5elrf-pooler.us-east-1.aws.neon.tech/ai%20interview%20mocker?sslmode=require&channel_binding=require',
  },
};
