"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  // Set the default RSVP state to "yes"
  const [isAttending, setIsAttending] = useState("yes");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      is_attending: isAttending,
    };

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true);
    } else {
      alert("Failed to submit RSVP.");
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      // Navigate to the thank you page only on the client-side
      window.location.href = "/thank-you";
    }
  }, [isSubmitted]);

  const formContainerStyle = {
    backgroundImage: "url('/images/rsvp.png')", // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <header className="text-center mb-8">
        <h1
          className="text-4xl font-bold"
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "#333",
          }}
        >
          Finally - this is it!
        </h1>
        <span
          className="text-lg"
          style={{
            fontFamily: "'Merriweather', serif",
            fontSize: "1.5rem",
            color: "#555",
          }}
        >
          <small> We invite you to the wedding of </small>
          <br />
          <span className="font-semibold">Joahnna Marie Condino</span> and{" "}
          <span className="font-semibold">Nino Francisco Alamo</span>
          <br />
         {/* Date, Time, and Location */}
         <p className="mt-4 text-lg" style={{ color: "#555" }}>
            <span className="font-semibold">Date & Time:</span> January 4, 2025, 10:00 AM<br />
            <span className="font-semibold">Location:</span> <a
              href="https://www.google.com/maps?q=Parish+of+The+Holy+Family,+Imus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Parish of The Holy Family, Imus
            </a>
          </p>
          <p className="text-lg" style={{ color: "#555" }}>
            <span className="font-semibold">Reception:</span> <a
              href="https://www.contis.ph/tools/locations/locations/conti-s-bakeshop-restaurant-with-drive-thru-kawit-cavite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Conti&apos;s - Kawit, Cavite
            </a>
          </p>
        </span>
      </header>

      <main
        className="w-full max-w-4xl shadow-md rounded-lg p-6"
        style={formContainerStyle}
      >
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">RSVP</h2>
          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border p-2 rounded text-gray-900"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="border p-2 rounded text-gray-900"
              required
            />
            <textarea
              name="message"
              placeholder="Message (optional)"
              className="border p-2 rounded h-24 text-gray-900"
            ></textarea>

            {/* Yes/No RSVP Selection */}
            <div className="flex gap-4 mt-4">
              <label className="text-gray-800">
                <input
                  type="radio"
                  name="isAttending"
                  value="yes"
                  checked={isAttending === "yes"}
                  onChange={() => setIsAttending("yes")}
                  required
                />
                <span className="ml-2">Yes, I will attend</span>
              </label>
              <label className="text-gray-800">
                <input
                  type="radio"
                  name="isAttending"
                  value="no"
                  checked={isAttending === "no"}
                  onChange={() => setIsAttending("no")}
                  required
                />
                <span className="ml-2">No, I will not attend</span>
              </label>
            </div>

            <button
  type="submit"
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-full font-semibold text-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none"
>
  Submit RSVP
</button>

          </form>
        </section>
      </main>

      <footer className="mt-8 text-gray-700">
      <p> It&apos;s about time we made it official! We look forward to celebrating with you!</p>
      </footer>
    </div>
  );
}
