import NavBar from "/components/global/NavBar";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react"; //Test DB Code
import connectDB from "../utils/db"; //Test DB code

export default function Home() {
  const [dbStatus, setDbStatus] = useState("");
  useEffect(() => {
    (async () => {
      try {
        await connectDB();
        setDbStatus("Connected to MongoDB Atlas");
      } catch (error) {
        setDbStatus("Error connecting to MongoDB Atlas: " + error.message);
      }
    })();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <main className={styles.main}>
        <h1 className={styles.title}>Bizzle</h1>
        <p className={styles.description}>
          Your go-to platform for connecting vehicle buyers and dealers. Build,
          request, offer - all in one place.
        </p>
        <p className={styles.description}></p>
      </main>
    </div>
  );
}
