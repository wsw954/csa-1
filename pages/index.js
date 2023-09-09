import NavBar from "/components/global/NavBar";
import styles from "@/styles/Home.module.css";

export default function Home() {
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
        <div></div>
      </main>
    </div>
  );
}
