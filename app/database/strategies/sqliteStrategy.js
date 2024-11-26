import Database from "better-sqlite3";

export default class SQLiteStrategy {
  constructor(config) {
    this.config = config;
    this.db = null;
  }

  connect() {
    if (!this.db) {
      this.db = new Database(this.config.SQLITE_DB_PATH, { verbose: console.log });
    }
  }

  query(sql, params = []) {
    if (!this.db) {
      this.connect();
    }
    const statement = this.db.prepare(sql);
    return statement.all(...params);
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null; // Ensure it's marked as closed
    }
  }
}
