import Database from "better-sqlite3";
import admin from "firebase-admin";

let firebaseApp;

// Initialize Firebase if needed
if (process.env.DATABASE_TYPE === "firebase") {
  if (!firebaseApp) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
    console.log("Firebase initialized.");
  }
}

let sqliteInstance; // Cache SQLite connection

export function getDatabase() {
  if (process.env.DATABASE_TYPE === "sqlite") {
    if (!sqliteInstance) {
      console.log("Using SQLite (better-sqlite3) for local development.");
      sqliteInstance = new Database(process.env.SQLITE_DB_PATH || "rsvp.db", {
        verbose: console.log, // Logs SQL queries for debugging
      });

      // Ensure schema is set up
      initializeSchema(sqliteInstance);
    }
    return sqliteInstance;
  } else if (process.env.DATABASE_TYPE === "firebase") {
    console.log("Using Firebase for production.");
    return admin.firestore();
  }
  throw new Error("Unsupported database type");
}

// Schema initialization for SQLite
function initializeSchema(db) {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS rsvp (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      attending BOOLEAN NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.exec(createTableSQL); // Creates the table if it doesn't exist
  console.log("SQLite schema initialized.");
}

// Expose a method to close SQLite connection
export function closeDatabase() {
  if (sqliteInstance) {
    sqliteInstance.close();
    sqliteInstance = null;
    console.log("SQLite connection closed.");
  }
}
