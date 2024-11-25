"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import XLSX to avoid issues with SSR
const XLSX = dynamic(() => import("xlsx"), { ssr: false });

function exportToExcel(rsvps) {
  const ws = XLSX.utils.json_to_sheet(rsvps);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "RSVPs");
  XLSX.writeFile(wb, "RSVPs.xlsx");
}

export default function ViewRSVP() {
  const [rsvps, setRsvps] = useState([]);

  useEffect(() => {
    async function fetchRSVPs() {
      const response = await fetch("/api/rsvp");
      const data = await response.json();
      setRsvps(data);
    }
    fetchRSVPs();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>RSVP List</h1>
      <button style={styles.exportButton} onClick={() => exportToExcel(rsvps)}>
        Export to Excel
      </button>
      {rsvps.length === 0 ? (
        <p style={styles.noData}>No RSVPs found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Message</th>
                <th style={styles.th}>Is Attending</th>
                <th style={styles.th}>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr key={rsvp.id} style={styles.row}>
                  <td style={styles.td}>{rsvp.id}</td>
                  <td style={styles.td}>{rsvp.name}</td>
                  <td style={styles.td}>{rsvp.email}</td>
                  <td style={styles.td}>{rsvp.message || "—"}</td>
                  <td style={styles.td}>{rsvp.is_attending ?? "—"}</td>
                  <td style={styles.td}>
                    {rsvp.submitted_at ? new Date(rsvp.submitted_at).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    padding: "40px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  noData: {
    fontSize: "1.2rem",
    color: "#888",
    marginTop: "20px",
  },
  exportButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  tableContainer: {
    overflowX: "auto",
    width: "100%",
    maxWidth: "1000px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHead: {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    fontSize: "1rem",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  row: {
    borderBottom: "1px solid #eee",
    transition: "background-color 0.2s ease",
  },
  td: {
    padding: "12px",
    fontSize: "0.95rem",
    color: "#333",
    textAlign: "left",
  },
};
