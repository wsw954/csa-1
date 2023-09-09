import NavBar from "/components/global/NavBar";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "/contexts/AuthContext";
import { verifyIdToken } from "/utils/firebaseAdmin";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login"); // Redirect to login page
    }
  }, [currentUser, router]);

  if (!currentUser) {
    // Redirect to login page or show a message
    return <div>Please login to access this page.</div>;
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Bizzle</h1>
        <p className={styles.description}>Buyer dashboard</p>
        <p className={styles.description}></p>
        <div></div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.session || ""; // Assuming the cookie's name is "session"

  const user = await verifyIdToken(token);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // your normal props here
  };
}
