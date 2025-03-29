import React from "react";
import Navbar from "./../Component/Navbar";
import About from "./../Component/About";
import BackgroundAnimation from "./../Component/BackgroundAnimation";
import styles from "./../Styles/Home.module.css";

export default function Home() {
  return (
    <>
      {/* Background Animation Stays Fixed */}
      <BackgroundAnimation />

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        <Navbar />
        <h1
          style={{
            color: "white",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            paddingTop: "2rem",
            fontSize: "3rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            marginTop: "16rem",
          }}
        >
          DATA STORAGE REIMAGINED
        </h1>
        <h2
          style={{
            color: "white",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            fontSize: "1.3rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            marginTop: "1rem",
          }}
        >
          "Blazing-fast, scalable, and secure. Start building with Tosbit today."
        </h2>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a
            href="https://github.com/Gourav-334/Tosbit/blob/gouravTest/docs/manual/Tosbit%20Manual.md"
            className="hover-button"
            style={{
              textDecoration: "none",
              zIndex: 1,
              position: "relative",
              color: "white",
              fontSize: "1.3rem",
              fontWeight: "bold",
              letterSpacing: "1px",
              padding: "10px 20px",
              borderRadius: "20px",
              border: "3px solid white",
              cursor: "pointer",
            }}
          >
            Get Started
          </a>
        </div>
        <About />
      </div>
    </>
  );
}
