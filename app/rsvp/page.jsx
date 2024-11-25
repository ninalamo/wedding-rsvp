"use client";

import { useState } from "react";

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    is_attending: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      alert(result.message);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>RSVP Form</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        ></textarea>
      </div>
      <div>
        <label>Will you be attending?</label>
        <select
          name="is_attending"
          value={formData.is_attending}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        >
          <option value="">Select...</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <button type="submit">Submit RSVP</button>
    </form>
  );
}
