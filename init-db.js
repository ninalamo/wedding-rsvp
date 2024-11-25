const Database = require("better-sqlite3");
const db = new Database("rsvp.db");

// Create the RSVP table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS rsvp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    submitted_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("Database initialized!");
db.close();
