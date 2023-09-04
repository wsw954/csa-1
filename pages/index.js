import NavBar from "/components/global/NavBar";
import styles from "@/styles/Home.module.css";
import app from "/utils/firebase";

export default function Home() {
  const handleSignUp = async () => {
    try {
      const userCredential = await app
        .auth()
        .createUserWithEmailAndPassword("test@example.com", "testPassword123");
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

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
        <div>
          <button onClick={handleSignUp}>Test Sign Up</button>
        </div>
      </main>
    </div>
  );
}
