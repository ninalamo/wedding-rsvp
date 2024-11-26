import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export default class FirebaseStrategy {
  constructor(config) {
    this.config = config;
    this.db = null;
  }

  connect() {
    if (!this.db) {
      const app = initializeApp({
        credential: applicationDefault(),
        projectId: this.config.FIREBASE_PROJECT_ID,
      });
      this.db = getFirestore(app);
    }
  }

  async query(collection) {
    if (!this.db) {
      this.connect();
    }
    const snapshot = await this.db.collection(collection).get();
    return snapshot.docs.map((doc) => doc.data());
  }
}
