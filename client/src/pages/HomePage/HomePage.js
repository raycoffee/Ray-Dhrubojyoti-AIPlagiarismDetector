import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import UploadPopup from "../../components/UploadPopup/UploadPopup";
import "./HomePage.css";


const HomePage = () => {
  const [showUploadPopup, setShowUploadPopup] = useState(false)
  const [imageSource, setImageSource] = useState("/images/homepage-hero-desktop.png");
  const [mobileViewport, setMobileViewport] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImageSource("/images/learn-by-doing-mobile.png");
        setMobileViewport(true)

      } else {
        setImageSource("/images/homepage-hero-desktop.png");
      }
    };


    handleResize();


    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <>
      {showUploadPopup && <UploadPopup isOpen={showUploadPopup} onClose={() => setShowUploadPopup(false)} />}
      <div className="homepage-container">

        <div className="homepage-hero-section">
          <img
            src={imageSource}
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
          <div className="homepage-purpose">
            <div className="homepage-purpose-icons">
              <div>
                <img
                  src="/images/essays.png"
                  alt="Welcome Image"
                  className="homepage-purpose-icons-img"
                />
                <p>Essays</p>
              </div>
              <div>
                <img
                  src="/images/articles.png"

                  className="homepage-purpose-icons-img"
                />
                <p>Articles</p> </div>
              <div>
                <img
                  src="/images/research.png"

                  className="homepage-purpose-icons-img"
                />
                <p>Research</p></div>
              {!mobileViewport && (
                <>
                  <div>
                    <img
                      src="/images/homework.png"

                      className="homepage-purpose-icons-img"
                    />
                    <p>Homework</p></div>

                  <div>
                    <img
                      src="/images/assignment.png"

                      className="homepage-purpose-icons-img"
                    />
                    <p>Assignments</p> </div>
                </>
              )}

            </div>

          </div>
        </div>
        <div
          className="homepage-social-proof"
          style={{
            backgroundImage: "url('/images/hero-social-proof.png')"
          }}
        >
          <h2>Join over 1 million academians worldwide</h2>
          <div className="homepage-social-proof-elements" >
            <div className="homepage-social-proof-stars">
              <svg viewBox="0 0 156 28" focusable="false" className="homepage-social-proof-stars-svg">
                <path d="M15.2092 0.109375L19.0989 9.57724L28.7731 10.5832L21.5029 17.4407L23.5922 27.5303L15.2092 22.3005L6.82625 27.5303L8.91555 17.4407L1.64529 10.5832L11.3195 9.57724L15.2092 0.109375Z" fill="white"></path>
                <path d="M46.6037 0.109375L50.4934 9.57724L60.1676 10.5832L52.8974 17.4407L54.9867 27.5303L46.6037 22.3005L38.2208 27.5303L40.3101 17.4407L33.0398 10.5832L42.714 9.57724L46.6037 0.109375Z" fill="white"></path>
                <path d="M78.0002 0.109375L81.8899 9.57724L91.5641 10.5832L84.2939 17.4407L86.3832 27.5303L78.0002 22.3005L69.6173 27.5303L71.7066 17.4407L64.4363 10.5832L74.1105 9.57724L78.0002 0.109375Z" fill="white"></path>
                <path d="M109.395 0.109375L113.284 9.57724L122.959 10.5832L115.688 17.4407L117.778 27.5303L109.395 22.3005L101.012 27.5303L103.101 17.4407L95.8308 10.5832L105.505 9.57724L109.395 0.109375Z" fill="white"></path>
                <path d="M140.791 0.109375L144.681 9.57724L154.355 10.5832L147.085 17.4407L149.174 27.5303L140.791 22.3005L132.408 27.5303L134.498 17.4407L127.227 10.5832L136.902 9.57724L140.791 0.109375Z" fill="white"></path>
              </svg>
              <p className="homepage-social-proof-stars-txt">Over 50,000 5-star app reviews</p>
            </div>

            <div className="homepage-social-proof-news">
              <img src="/images/new-york-times.png" />
              <img src="/images/the-atlantic-long.png" />

            </div>

            <div className="homepage-social-proof-editors">
              <img src="/images/app-of-the-day.png" />
              <svg viewBox="0 0 137 56" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fff" d="M66.021 26.31V15.186h5.23c2.361 0 3.627 1.065 3.627 3.024 0 1.065-.463 2.052-1.636 2.438 1.296.293 1.929 1.265 1.929 2.515 0 2.02-1.28 3.147-3.873 3.147h-5.277Zm2.438-2.052h2.469c1.234 0 1.774-.416 1.774-1.265 0-.88-.478-1.28-1.728-1.28H68.46v2.545Zm0-4.551h2.438c1.142 0 1.543-.463 1.543-1.265 0-.787-.37-1.204-1.574-1.204H68.46v2.469Zm12.286 6.773c-2.345 0-3.857-1.45-3.857-4.15s1.697-4.182 3.996-4.182c2.206 0 3.672 1.389 3.672 3.92a5.1 5.1 0 0 1-.046.786h-5.416c.093 1.204.787 1.805 1.713 1.805.864 0 1.311-.447 1.512-.987l2.037.37c-.37 1.265-1.45 2.438-3.61 2.438Zm-1.605-5.076h3.256c-.093-.833-.602-1.481-1.543-1.481-.88 0-1.512.524-1.712 1.48ZM89.6 26.48c-2.021 0-3.317-.864-3.564-2.376l2.114-.417c.154.664.663 1.05 1.512 1.05.91 0 1.296-.263 1.296-.71 0-.417-.216-.587-1.142-.772l-1.11-.216c-1.559-.308-2.438-.926-2.438-2.33 0-1.681 1.419-2.56 3.425-2.56 1.851 0 3.194.863 3.44 2.33l-2.052.416c-.123-.587-.54-1.019-1.434-1.019-.818 0-1.22.278-1.22.695 0 .416.278.57 1.065.71l1.018.184c1.636.294 2.623.942 2.623 2.377 0 1.589-1.218 2.638-3.533 2.638Zm9.07-.17c-2.191 0-3.07-.817-3.07-3.101v-2.885h-1.204v-2.021h1.203v-1.975h2.346v1.975h2.175v2.02h-2.175v2.84c0 .848.37 1.11 1.095 1.11h1.095v2.037H98.67Zm-33.62 16 4.073-11.124h3.24L76.45 42.31h-2.623l-.895-2.561H68.49l-.895 2.561H65.05Zm4.196-4.752h2.916l-1.45-4.197-1.466 4.197Zm8.932 7.93V34.303h2.3v.956c.462-.694 1.357-1.11 2.422-1.11 1.897 0 3.363 1.403 3.363 4.072 0 2.809-1.574 4.259-3.657 4.259-.863 0-1.573-.262-2.082-.74v3.748h-2.346Zm2.346-6.557c0 .926.663 1.59 1.681 1.59 1.05 0 1.698-.818 1.698-2.238 0-1.404-.633-2.206-1.698-2.206-1.002 0-1.681.679-1.681 1.682v1.172Zm7.768 6.558V34.303h2.299v.956c.463-.694 1.358-1.11 2.422-1.11 1.898 0 3.364 1.403 3.364 4.072 0 2.809-1.574 4.259-3.657 4.259-.864 0-1.574-.262-2.083-.74v3.748h-2.345Zm2.345-6.558c0 .926.664 1.59 1.682 1.59 1.05 0 1.697-.818 1.697-2.238 0-1.404-.633-2.206-1.697-2.206-1.003 0-1.682.679-1.682 1.682v1.172ZM21.181 47.059c2.35 1.176 4.233 4.941 4.706 7.53C23.061 55.764 20.944 56 17.885 56c2.259-1.882 5.176-2.275 6.353-2.118-2.04-2.51-2.588-4.706-3.057-6.823Z"></path><path fill="#fff" d="M16.744 44.127c1.977 1.732 2.848 5.85 2.651 8.474-3.031.424-5.14.117-8.1-.656 2.662-1.25 5.584-.893 6.683-.444-1.34-2.943-1.316-5.207-1.234-7.374ZM13.571 40.526c1.21 2.333.52 6.485-.618 8.857-2.978-.709-4.83-1.763-7.304-3.561 2.934-.195 5.525 1.202 6.384 2.02-.174-3.228.672-5.328 1.538-7.316Z"></path><path fill="#fff" d="M11.273 35.904c.648 2.548-.967 6.435-2.614 8.486-2.739-1.367-4.303-2.814-6.304-5.127 2.901.476 5.107 2.426 5.758 3.418.563-3.184 1.865-5.037 3.16-6.777ZM9.366 30.123c.197 2.62-2.067 6.17-4.045 7.904-2.46-1.82-3.75-3.517-5.32-6.142 2.775.972 4.61 3.274 5.079 4.364 1.106-3.038 2.709-4.637 4.286-6.126ZM9.473 24.847c-.576 2.564-3.777 5.297-6.176 6.38-1.822-2.46-2.56-4.46-3.296-7.428 2.37 1.739 3.454 4.477 3.584 5.656 1.946-2.583 3.945-3.644 5.888-4.608Z"></path><path fill="#fff" d="M10.925 19.964c-1.228 2.324-5.034 4.123-7.632 4.538-1.113-2.851-1.302-4.973-1.234-8.031 1.832 2.3 2.16 5.225 1.976 6.398 2.555-1.983 4.763-2.483 6.89-2.905Z"></path><path fill="#fff" d="M13.643 15.465c-1.765 1.947-5.898 2.746-8.518 2.504-.372-3.038-.028-5.14.795-8.087 1.205 2.683.797 5.598.329 6.689 2.966-1.288 5.229-1.226 7.394-1.106Z"></path><path fill="#fff" d="M17.16 11.474c-2.174 1.478-6.379 1.285-8.869.436.352-3.041 1.18-5.005 2.671-7.675.542 2.89-.54 5.629-1.25 6.579 3.186-.556 5.37.036 7.448.66ZM21.921 8.604c-2.483.86-6.492-.422-8.675-1.89C14.377 3.868 15.688 2.188 17.824 0c-.23 2.931-1.987 5.764-2.921 6.496 3.22.294 5.176.964 7.018 2.108Z"></path><path fill="#fff" d="M24.236 1.176c-2.824 0-5.647 1.647-6.588 3.53 2.588-.236 5.176-1.647 6.588-3.53ZM115.246 47.059c-2.35 1.176-4.233 4.941-4.706 7.53 2.826 1.176 4.944 1.411 8.003 1.411-2.259-1.882-5.177-2.275-6.353-2.118 2.039-2.51 2.588-4.706 3.056-6.823Z"></path><path fill="#fff" d="M119.682 44.127c-1.977 1.732-2.847 5.85-2.651 8.474 3.032.424 5.14.117 8.1-.656-2.661-1.25-5.583-.893-6.682-.444 1.339-2.943 1.315-5.207 1.233-7.374ZM122.856 40.526c-1.211 2.333-.521 6.485.618 8.857 2.978-.709 4.829-1.763 7.304-3.561-2.934-.195-5.525 1.202-6.384 2.02.174-3.228-.672-5.328-1.538-7.316Z"></path><path fill="#fff" d="M125.153 35.904c-.648 2.547.966 6.434 2.614 8.486 2.739-1.367 4.303-2.814 6.304-5.127-2.901.476-5.107 2.426-5.758 3.418-.564-3.185-1.865-5.037-3.16-6.777ZM127.06 30.123c-.197 2.62 2.067 6.17 4.045 7.904 2.46-1.82 3.75-3.517 5.32-6.142-2.775.972-4.609 3.274-5.079 4.364-1.106-3.038-2.709-4.637-4.286-6.126ZM126.955 24.846c.576 2.565 3.777 5.298 6.176 6.38 1.821-2.46 2.559-4.459 3.296-7.428-2.371 1.74-3.454 4.478-3.585 5.657-1.945-2.583-3.944-3.644-5.887-4.608Z"></path><path fill="#fff" d="M125.5 19.964c1.228 2.324 5.033 4.123 7.632 4.538 1.113-2.85 1.301-4.973 1.234-8.031-1.832 2.3-2.16 5.225-1.977 6.398-2.554-1.983-4.762-2.483-6.889-2.905Z"></path><path fill="#fff" d="M122.782 15.465c1.766 1.947 5.899 2.746 8.519 2.504.372-3.038.028-5.14-.796-8.087-1.204 2.683-.796 5.598-.328 6.689-2.966-1.288-5.229-1.226-7.395-1.106Z"></path><path fill="#fff" d="M119.266 11.474c2.174 1.478 6.378 1.285 8.869.436-.352-3.041-1.179-5.005-2.671-7.675-.542 2.89.539 5.629 1.25 6.579-3.186-.556-5.371.036-7.448.66ZM114.503 8.604c2.484.86 6.493-.422 8.676-1.89-1.132-2.845-2.442-4.525-4.578-6.714.23 2.931 1.987 5.764 2.921 6.496-3.221.294-5.176.964-7.019 2.108Z"></path><path fill="#fff" d="M112.189 1.176c2.824 0 5.647 1.647 6.588 3.53-2.588-.236-5.176-1.647-6.588-3.53ZM31.688 16.497c-.277.283-.438.725-.438 1.297v20.413c0 .572.16 1.014.438 1.297l.069.063 11.715-11.434v-.27L31.757 16.43l-.069.067ZM51.631 31.946l-3.9-3.813v-.27l3.905-3.813.087.05 4.626 2.569c1.32.729 1.32 1.929 0 2.662l-4.626 2.565-.092.05ZM49.59 34.026l-3.993-3.898-11.784 11.506c.439.45 1.154.504 1.967.054l13.81-7.662M49.59 21.97l-13.81-7.662c-.813-.446-1.528-.392-1.967.058l11.784 11.502 3.993-3.898Z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="homepage-features-section-container">
          <div className="homepage-features-section">
            <img src="/images/compass.png" />
            <div className="homepage-features-section-desc">
              <h3>Measurable probability</h3>
              <p>Get insights into probability of AI generated text, for each sentence.</p>
            </div>
          </div>
          <div className="homepage-features-section" >
            <img src="/images/openai-doc.png" style={{ width: "35%" }} />
            <div className="homepage-features-section-desc">
              <h3>Powered by OpenAI</h3>
              <p>Documents, PDFs, Text files are analyzed by OpenAI GPT-4o.</p>
            </div>
          </div>
        </div>
        <div className="homepage-footer">
          <div className="homepage-footer-content">
            <div className="homepage-footer-brand">
              <h3>AnswersAi</h3>
              <p>Detect AI & Plagiarized content with confidence</p>
            </div>

            <div className="homepage-footer-links">
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>

          <div className="homepage-footer-bottom">
            <p>&copy; 2024-25 Assignment for AnswersAi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;