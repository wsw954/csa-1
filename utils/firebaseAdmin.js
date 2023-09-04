import admin from "firebase-admin";

// Check if Firebase admin is already initialized
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // ... any other options you need
    });
  } catch (error) {
    console.error("Failed to initialize Firebase admin:", error);
  }
}

export default admin;
