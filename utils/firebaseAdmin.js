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

export const verifyIdToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return null;
  }
};

export default admin;
