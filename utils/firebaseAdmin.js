import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const projectId = process.env.FIREBASE_PROJECT_ID;

const firebaseAdminConfig = {
  credential: cert({
    clientEmail,
    privateKey,
    projectId,
  }),
};

const adminApp = initializeApp(firebaseAdminConfig);
const adminAuth = getAuth(adminApp);

export { adminAuth };
