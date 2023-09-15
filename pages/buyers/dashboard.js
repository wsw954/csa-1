import NavBar from "/components/global/NavBar";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "/contexts/AuthContext";
// import { verifyIdToken } from "/utils/firebaseAdmin";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();

  if (!currentUser) {
    // Redirect to login page or show a message
    return <div>Please login to access this page.</div>;
  } else {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <main className={styles.main}>
          <h1 className={styles.title}>Bizzle</h1>
          <p className={styles.description}>Buyer dashboard</p>
          <p className={styles.description}>Email: {currentUser.email}</p>
          <p className={styles.description}>UID: {currentUser.uid}</p>
          <p className={styles.description}></p>
          <div></div>
        </main>
      </div>
    );
  }
}
