// lib/response.js

// Create a standardized response
export function createResponse(message, status) {
  return new Response(
    JSON.stringify({ message }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}
