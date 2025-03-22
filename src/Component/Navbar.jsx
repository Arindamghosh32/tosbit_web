import React, { useState } from "react";
import styles from "../styles/Navbar.module.css"; // Import CSS module

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Tosbit</div>

      {/* Desktop Menu */}
      <ul className={`${styles.menu} ${isOpen ? styles.hidden : ""}`}>
        {["About", "Docs", "Links", "Reviews"].map((item) => (
          <li key={item} className={styles.menuItem}>{item}</li>
        ))}
      </ul>

      {/* Hamburger Menu */}
      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          {["About", "Docs", "Links", "Reviews"].map((item) => (
            <div key={item} className={styles.mobileMenuItem}>{item}</div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

