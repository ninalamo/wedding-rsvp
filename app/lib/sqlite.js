// lib/sqlite.js
import Database from "better-sqlite3";

// Open the SQLite database connection (should be done once per app lifecycle)
export function openSQLiteConnection() {
  try {
    const db = new Database("rsvp.db", { verbose: console.log }); // Log SQL queries for debugging
    return db;
  } catch (error) {
    console.error("Failed to open SQLite database:", error);
    throw new Error("SQLite database connection failed");
  }
}

// Fetch RSVPs from SQLite
export async function fetchRSVPsFromSQLite(db) {
  try {
    if (!db) {
      throw new Error("SQLite database connection is not open");
    }
    const rows = db.prepare("SELECT * FROM rsvp").all(); // Query all RSVPs
    return { success: true, data: rows };
  } catch (error) {
    console.error("Error fetching from SQLite:", error);
    return { success: false, error: "Failed to fetch from SQLite" };
  }
}

// Save RSVP to SQLite
export async function saveRSVPToSQLite(db, name, email, message, is_attending) {
  try {
    if (!db) {
      throw new Error("SQLite database connection is not open");
    }
    const stmt = db.prepare(
      "CREATE TABLE IF NOT EXISTS rsvp (id INTEGER PRIMARY KEY, name TEXT, email TEXT, message TEXT, is_attending BOOLEAN)"
    );
    stmt.run();

    const insertStmt = db.prepare(
      "INSERT INTO rsvp (name, email, message, is_attending) VALUES (?, ?, ?, ?)"
    );
    insertStmt.run(name, email, message, is_attending);

    return { success: true };
  } catch (error) {
    console.error("Error saving to SQLite:", error);
    return { success: false, error: "Failed to save to SQLite" };
  }
}
