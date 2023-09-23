import { useState, useEffect } from "react";
import NavBar from "/components/global/NavBar";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useAuth } from "/contexts/AuthContext";
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
        </main>
      </div>
    );
  }
}
