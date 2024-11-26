// lib/firebase.js

// Fetch RSVPs from Firebase
export async function fetchRSVPsFromFirebase(db) {
  try {
    const snapshot = await db.collection("rsvp").get();
    const rsvps = snapshot.docs.map(doc => doc.data());
    return { success: true, data: rsvps };
  } catch (error) {
    console.error("Error fetching from Firebase:", error);
    return { success: false, error: "Failed to fetch from Firebase" };
  }
}

// Save RSVP to Firebase
export async function saveRSVPToFirebase(db, name, email, message, is_attending) {
  try {
    const firestore = db; // Assuming Firestore instance is set
    await firestore.collection("rsvp").add({
      name,
      email,
      message,
      is_attending,
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving to Firebase:", error);
    return { success: false, error: "Failed to save to Firebase" };
  }
}
