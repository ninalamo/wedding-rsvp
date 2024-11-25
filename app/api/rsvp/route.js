import Database from "better-sqlite3";

const db = new Database("rsvp.db");

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and email are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stmt = db.prepare("INSERT INTO rsvp (name, email, message) VALUES (?, ?, ?)");
    stmt.run(name, email, message || null);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return new Response(JSON.stringify({ error: "Failed to save RSVP." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
