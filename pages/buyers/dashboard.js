import { useState, useEffect } from "react";
import NavBar from "/components/global/NavBar";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useAuth } from "/contexts/AuthContext";
import { signOut } from "/utils/auth";
import axios from "axios";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentUser) {
        try {
          // Get the ID token of the current user
          const token = await currentUser.getIdToken();

          // Include the token in the Authorization header
          const response = await axios.get(
            `/api/users?action=get-userInfo&email=${currentUser.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUserInfo(response.data);
        } catch (err) {
          setError(err.response?.data?.error || "An error occurred");
        }
      }
    };

    fetchUserInfo();
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
          {userInfo && (
            <p className={styles.description}>Username: {userInfo.username}</p>
          )}
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
