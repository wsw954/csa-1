import React from "react";
import Link from "next/link";
import SimpleDropdown from "../utils/SimpleDropdown";
import styles from "@/styles/Home.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navbarItem}>
          <SimpleDropdown title="Buyers">
            <Link href="/buyers/login">Log In</Link>
            <Link href="/buyers/new">Create Buyer Account</Link>
          </SimpleDropdown>
        </li>
        <li className={styles.navbarItem}>
          <SimpleDropdown title="Dealers">
            <Link href="/dealers/login">Log In</Link>
            <Link href="/dealers/new">Create Dealer Account</Link>
          </SimpleDropdown>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
