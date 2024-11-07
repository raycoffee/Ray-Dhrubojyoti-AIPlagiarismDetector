import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <img
          src="/images/homepage-hero-desktop.png"
          alt="Welcome Image"
          className="hero-image"
        />

        <div className="intro-text">
          <h1>Real-time AI-Powered Plagiarism Detection</h1>
          <p>
          Instantly analyze and identify potential plagiarism in academic work using advanced AI algorithms.
          </p>
        </div>

        <button className="get-started-btn">Upload Your Document</button>
      </div>
    </div>
  );
};

export default HomePage;
