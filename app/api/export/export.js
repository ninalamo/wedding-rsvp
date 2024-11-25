import Database from "better-sqlite3";
import * as XLSX from "xlsx";

const db = new Database("rsvp.db");

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const rows = db.prepare("SELECT * FROM rsvp").all();

      if (rows.length === 0) {
        return res.status(404).json({ error: "No RSVP data available" });
      }

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "RSVPs");

      const excelBuffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      });

      res.setHeader("Content-Disposition", "attachment; filename=rsvp-data.xlsx");
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.status(200).send(excelBuffer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to export data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
