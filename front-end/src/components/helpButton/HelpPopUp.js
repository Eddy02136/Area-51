import React from "react";
import "./HelpPopUp.css";

function HelpPopUp({ isOpen, togglePopup }) {
  if (!isOpen) return null;

  const items = [
    { imgSrc: process.env.PUBLIC_URL + "/earth_area.jpg", description: "Your profile page", hover_desc: "Earth" },
    { imgSrc: process.env.PUBLIC_URL + "/moon_area.jpg", description: "Your A-REA", hover_desc: "Moon" },
    { imgSrc: process.env.PUBLIC_URL + "/marss_area.jpg", description: "Your connected services", hover_desc: "Mars" },
    { imgSrc: process.env.PUBLIC_URL + "/neptune_area.jpg", description: "Create an AREA", hover_desc: "Neptune" },
  ];

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="image-list">
        <div className="image-list">
          {items.map((item, index) => (
            <div className="image-item" key={index}>
              <div className="image-container">
                <img src={item.imgSrc} alt={`Image ${index + 1}`} className="image" />
                <div className="hover-description">{item.hover_desc}</div>
              </div>
              <p className="description">{item.description}</p>
            </div>
          ))}
        </div>
        </div>
        <a
          href="./AREA-51-UserGuide.pdf"
          download
          className="download-button"
        >
          Download User Guide
        </a>

        <button onClick={togglePopup} className="close-popup-button">
          Close
        </button>
      </div>
    </div>
  );
}

export default HelpPopUp;
