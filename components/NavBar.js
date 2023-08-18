import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/buyers">Buyers</Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/dealers">Dealers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
