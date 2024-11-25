"use client";

import React from "react";

export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    const response = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("RSVP submitted successfully!");
      e.target.reset();
    } else {
      alert("Failed to submit RSVP.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Wedding Invitation</h1>
        <p className="text-lg text-gray-600">
          Join us for the union of <br />
          <span className="font-semibold">Joahnna Marie Condino</span> and{" "}
          <span className="font-semibold">Nino Francisco Alamo</span>
        </p>
      </header>

      <main className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-700">RSVP</h2>
          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="border p-2 rounded"
              required
            />
            <textarea
              name="message"
              placeholder="Message (optional)"
              className="border p-2 rounded h-24"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit RSVP
            </button>
          </form>
        </section>
      </main>

      <footer className="mt-8 text-gray-500">
        <p>We look forward to celebrating with you!</p>
      </footer>
    </div>
  );
}
