import SQLiteStrategy from "./strategies/sqliteStrategy";
import FirebaseStrategy from "./strategies/firebaseStrategy";

export default function DatabaseFactory(config) {
  switch (config.DATABASE_TYPE) {
    case "sqlite":
      return new SQLiteStrategy(config);
    case "firebase":
      return new FirebaseStrategy(config);
    default:
      throw new Error(`Unsupported database type: ${config.DATABASE_TYPE}`);
  }
}
