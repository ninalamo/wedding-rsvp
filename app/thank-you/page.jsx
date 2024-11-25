import React from "react";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 relative">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          backgroundImage: "url('/images/rsvp.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)",
          zIndex: "-1", // Ensures the background is behind the content
        }}
      ></div>

      {/* Content Section */}
      <header className="text-center mb-8">
        <h1
          className="text-4xl font-bold"
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "#333",
          }}
        >
          Thank You!!!
        </h1>
        <small
          className="text-lg"
          style={{
            fontFamily: "'Merriweather', serif",
            fontSize: "1.2rem",
            color: "#555",
          }}
        >
          We are thrilled to have you celebrate with us on our special day!<br/> See you.
        </small>
      </header>
    </div>
  );
}
