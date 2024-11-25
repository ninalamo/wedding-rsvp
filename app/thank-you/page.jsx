// pages/thank-you.js
import React from "react";

export default function ThankYou() {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center py-10"
      style={{
        backgroundImage: "url('/images/rsvp.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "blur(8px)",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "-1",
      }}
    >
      <header className="text-center mb-8">
        <h1
          className="text-4xl font-bold"
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "#333",
          }}
        >
          Thank You for Your RSVP!
        </h1>
        <p
          className="text-lg"
          style={{
            fontFamily: "'Merriweather', serif",
            fontSize: "1.5rem",
            color: "#555",
          }}
        >
          We are thrilled to have you celebrate with us on our special day! See you soon!
        </p>
      </header>
    </div>
  );
}
