const sqlite3 = require("better-sqlite3");

// Path to your SQLite database file
const dbPath = "./rsvp.db";

function cleanDatabase() {
  let db;

  try {
    // Open the database
    db = sqlite3(dbPath);
    console.log("Connected to the SQLite database.");

    // Clear RSVPs table
    const deleteRSVPs = db.prepare("DELETE FROM rsvp");
    const resultRSVPs = deleteRSVPs.run();
    console.log(`Cleaned RSVPs table. Rows affected: ${resultRSVPs.changes}`);

    // Example: Add more cleanup queries if needed
    // const deleteOtherTable = db.prepare("DELETE FROM other_table");
    // const resultOther = deleteOtherTable.run();
    // console.log(`Cleaned other_table. Rows affected: ${resultOther.changes}`);

  } catch (err) {
    console.error("Database cleanup failed:", err.message);
  } finally {
    // Close the database connection
    if (db) {
      db.close();
      console.log("Disconnected from the SQLite database.");
    }
  }
}

cleanDatabase();
