import React, { useState } from "react";
import styles from "/styles/components/utils/SimpleDropdown.module.css";

const SimpleDropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.simpleDropdown}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={styles.simpleDropdownToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <div className={styles.simpleDropdownMenu}>{children}</div>}
    </div>
  );
};

export default SimpleDropdown;
