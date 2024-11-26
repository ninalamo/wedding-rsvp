// lib/validation.js

// Validate the input data
export async function validateInput(body) {
  const { name, email, is_attending } = body;
  if (!name || !email || (is_attending !== "yes" && is_attending !== "no")) {
    return { isValid: false, error: "Invalid or missing required fields" };
  }
  return { isValid: true };
}
