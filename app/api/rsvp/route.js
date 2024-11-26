// app/api/rsvp/route.js

import { openSQLiteConnection, fetchRSVPsFromSQLite } from "../../lib/sqlite"; // Import updated SQLite functions
import { saveRSVPToSQLite } from "../../lib/sqlite"; // Import save function
import { saveRSVPToFirebase, fetchRSVPsFromFirebase } from "../../lib/firebase"; // Import Firebase functions
import { createResponse } from "../../lib/response"; // Import response creation function
import { validateInput } from "../../lib/validation"; // Import validation function

// POST method for saving RSVP
export async function POST(req) {
  const db = openSQLiteConnection(); // Open the SQLite connection
  try {
    const body = await req.json();
    const { name, email, message = "", is_attending } = body;

    // Validate input
    const validation = validateInput(body);
    if (!validation.isValid) {
      return createResponse(validation.error, 400);
    }

    const sanitizedMessage = message.trim(); // Ensure message is sanitized

    let result;
    if (process.env.DATABASE_TYPE === "sqlite") {
      result = await saveRSVPToSQLite(db, name, email, sanitizedMessage, is_attending);
    } else if (process.env.DATABASE_TYPE === "firebase") {
      result = await saveRSVPToFirebase(db, name, email, sanitizedMessage, is_attending);
    } else {
      throw new Error("Unsupported DATABASE_TYPE");
    }

    if (result.success) {
      return createResponse("RSVP saved successfully!", 201);
    } else {
      return createResponse(result.error || "Failed to save RSVP", 500);
    }
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return createResponse("Failed to save RSVP. Please try again later.", 500);
  } finally {
    db.close(); // Close the SQLite connection if necessary
  }
}

// app/api/rsvp/route.js
export async function GET(req) {
  const db = openSQLiteConnection(); // Open the SQLite connection
  try {
    let result;
    if (process.env.DATABASE_TYPE === "sqlite") {
      result = await fetchRSVPsFromSQLite(db); // Fetch RSVPs from SQLite
    } else if (process.env.DATABASE_TYPE === "firebase") {
      result = await fetchRSVPsFromFirebase(db); // Fetch RSVPs from Firebase
    } else {
      throw new Error("Unsupported DATABASE_TYPE");
    }

   // Ensure the result contains valid data before attempting to map over it

    if (result.success && Array.isArray(result.data)) {
      // You can now safely map over the result.data (RSVPs)
      console.log('result in GET', result);

      const rsvps = result.data.map(rsvp => {
        return {
          name: rsvp.name,
          email: rsvp.email,
          message: rsvp.message,
          is_attending: rsvp.is_attending,
        };
      });

      return new Response(JSON.stringify({ rsvps }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return createResponse(result.error || "No RSVPs found", 404);
    }
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return createResponse("Failed to fetch RSVPs. Please try again later.", 500);
  } finally {
    db.close(); // Close the SQLite connection if necessary
  }
}
