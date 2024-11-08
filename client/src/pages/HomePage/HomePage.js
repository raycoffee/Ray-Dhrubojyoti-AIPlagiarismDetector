import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import UploadPopup from "../../components/UploadPopup/UploadPopup";
import "./HomePage.css";


const HomePage = () => {
  const [showUploadPopup, setShowUploadPopup] = useState(false)

  return (
    <>
    {showUploadPopup && <UploadPopup isOpen={showUploadPopup} onClose={() => setShowUploadPopup(false)}/>}
    <div className="homepage-container">
      <div className="homepage-content-wrapper">
        <img
          src="/images/homepage-hero-desktop.png"
          alt="Welcome Image"
          className="homepage-hero-image"
        />

        <div className="homepage-intro-text">
          <h1>Real-time AI-Powered Plagiarism Detection</h1>
          <p>
            Instantly analyze and identify potential plagiarism in academic work using advanced AI algorithms.
          </p>
        </div>

        <button className="homepage-get-started-btn" onClick={() => setShowUploadPopup(true)}>
          Upload Your Document
          <FontAwesomeIcon icon={faCloudArrowUp} className="homepage-upload-icon" />
        </button>
      </div>
    </div>
    </>
  );
};

export default HomePage;