import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const projectId = process.env.FIREBASE_PROJECT_ID;

let adminAuth;

if (!getApps().length) {
  const firebaseAdminConfig = {
    credential: cert({
      clientEmail,
      privateKey,
      projectId,
    }),
  };

  const adminApp = initializeApp(firebaseAdminConfig);
  adminAuth = getAuth(adminApp);
}

export { adminAuth };
