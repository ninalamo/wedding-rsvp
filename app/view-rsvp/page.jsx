import Database from "better-sqlite3";

async function fetchRSVPs() {
  const db = new Database("rsvp.db");
  try {
    return db.prepare("SELECT * FROM rsvp").all();
  } finally {
    db.close();
  }
}

export default async function ViewRSVP() {
  const rsvps = await fetchRSVPs();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>RSVP List</h1>
      {rsvps.length === 0 ? (
        <p style={styles.noData}>No RSVPs found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Message</th>
                <th style={styles.th}>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr key={rsvp.id} style={styles.row}>
                  <td style={styles.td}>{rsvp.id}</td>
                  <td style={styles.td}>{rsvp.name}</td>
                  <td style={styles.td}>{rsvp.email}</td>
                  <td style={styles.td}>{rsvp.message}</td>
                  <td style={styles.td}>
                    {new Date(rsvp.submitted_at).toLocaleString()}
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
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  noData: {
    fontSize: "1.2rem",
    color: "#888",
  },
  tableContainer: {
    overflowX: "auto",
    width: "100%",
    maxWidth: "800px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHead: {
    backgroundColor: "#333",
    color: "#fff",
  },
  th: {
    padding: "10px",
    textAlign: "left",
    fontSize: "0.9rem",
    textTransform: "uppercase",
  },
  row: {
    borderBottom: "1px solid #eee",
  },
  td: {
    padding: "10px",
    fontSize: "0.9rem",
    color: "#555",
  },
};
