const Database = require("better-sqlite3");
const db = new Database("rsvp.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS rsvp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    is_attending TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

console.log("Database initialized successfully.");
db.close();