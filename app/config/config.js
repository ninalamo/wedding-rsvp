import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const config = {
  DATABASE_TYPE: process.env.DATABASE_TYPE,
  SQLITE_DB_PATH: process.env.SQLITE_DB_PATH,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
};

export default config;
