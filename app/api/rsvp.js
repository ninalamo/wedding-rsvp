import Database from "better-sqlite3";

const db = new Database("rsvp.db");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    try {
      const stmt = db.prepare("INSERT INTO rsvp (name, email, message) VALUES (?, ?, ?)");
      stmt.run(name, email, message || "");

      return res.status(201).json({ message: "RSVP submitted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to submit RSVP" });
    }
  }

  if (req.method === "GET") {
    try {
      const rows = db.prepare("SELECT * FROM rsvp").all();
      return res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch RSVPs" });
    }
  }

  res.setHeader("Allow", ["POST", "GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
