import Database from "better-sqlite3";

export async function POST(req) {
  const db = new Database("rsvp.db");
  const body = await req.json();

  try {
    const { name, email, message, is_attending } = body;

    if (!name || !email || !is_attending) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    db.prepare(`
      INSERT INTO rsvp (name, email, message, is_attending)
      VALUES (?, ?, ?, ?)
    `).run(name, email, message || "", is_attending);

    return new Response(JSON.stringify({ message: "RSVP saved successfully!" }), { status: 201 });
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  } finally {
    db.close();
  }
}
