import { useState, useEffect, useRef } from "react";
import NavBar from "/components/global/NavBar";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useAuth } from "/contexts/AuthContext";
import { useUserData } from "/contexts/UserDataContext";
import { signOut } from "/utils/auth";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { mongoDBUser, fetchUserData } = useUserData();
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      // Get the token from Firebase
      currentUser
        .getIdToken(true)
        .then((token) => {
          fetchUserData(currentUser.uid, token);
        })
        .catch((error) => {
          console.error("Error getting token:", error);
        });
    }
  }, [currentUser]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/"); // Redirect to the home page or login page after sign-out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!currentUser) {
    // Redirect to login page or show a message
    return <div>Please login to access this page.</div>;
  } else {
    console.log(mongoDBUser);
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <main className={styles.main}>
          <h1 className={styles.title}>Bizzle</h1>
          <p className={styles.description}>Buyer dashboard</p>
          <p className={styles.description}>
            <br></br>
            {mongoDBUser.firstName && (
              <p className={styles.description}>
                First Name:{mongoDBUser.firstName}
              </p>
            )}
            <br></br>
            Firebase Email: {currentUser.email}
            <br></br>
            Firebase UID: {currentUser.uid}
          </p>
          {error && <p className={styles.error}>Error: {error}</p>}
          <p className={styles.description}></p>
          <br></br>
          <div>
            <Link href="/requests">Check On Your Request</Link>
          </div>
          <br></br>
          <div>
            <Link href="/vehicles">Click Here to See Your Saved Vehicles</Link>
          </div>
          <br></br>
          <div>
            <Link href="/vehicles/new">Create a New Vehicle</Link>
          </div>
          <br></br>
          <div>
            <Link href={`/buyers/${currentUser.uid}`}>Account Settings</Link>
          </div>
          <br></br>
          <button onClick={handleSignOut}>Sign Out</button>
        </main>
      </div>
    );
  }
}
