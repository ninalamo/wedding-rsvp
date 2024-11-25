// app/api/rsvp/route.js (Server-Side API)
import Database from "better-sqlite3";

// Helper function to fetch all RSVPs
async function fetchRSVPs() {
  const db = new Database("rsvp.db");
  try {
    const rows = db.prepare("SELECT * FROM rsvp").all();
    return rows;
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    throw new Error("Failed to fetch RSVPs");
  } finally {
    db.close();
  }
}

// Function to check if the email already exists in the database
async function isEmailExists(email) {
  const db = new Database("rsvp.db");
  try {
    const row = db.prepare("SELECT * FROM rsvp WHERE email = ?").get(email);
    return row ? true : false; // Returns true if the email exists, false otherwise
  } catch (error) {
    console.error("Error checking email:", error);
    throw new Error("Failed to check email");
  } finally {
    db.close();
  }
}

// API to handle POST requests
export async function POST(req) {
  let db;

  try {
    db = new Database("rsvp.db");
    const body = await req.json();

    const { name, email, message, is_attending } = body;

    // Validate required fields
    if (!name || !email || typeof is_attending === "undefined") {
      console.error("Missing required fields:", { name, email, is_attending });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    // Check if the email already exists
    const emailExists = await isEmailExists(email);
    if (emailExists) {
      return new Response(
        JSON.stringify({ error: "This email has already been used for RSVP." }),
        { status: 400 }
      );
    }

    // Insert the RSVP into the database
    db.prepare(
      `
      INSERT INTO rsvp (name, email, message, is_attending)
      VALUES (?, ?, ?, ?)
    `
    ).run(name, email, message || "", is_attending);

    console.log("RSVP saved:", { name, email, message, is_attending });
    return new Response(
      JSON.stringify({ message: "RSVP saved successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  } finally {
    if (db) db.close();
  }
}

// API to handle GET requests
export async function GET(req) {
  try {
    const rsvps = await fetchRSVPs();
    return new Response(JSON.stringify(rsvps), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch RSVPs" }),
      { status: 500 }
    );
  }
}
