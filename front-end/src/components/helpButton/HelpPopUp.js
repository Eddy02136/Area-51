// src/HelpPopUp.js
import React from "react";
import "./HelpPopUp.css";

function HelpPopUp({ isOpen, togglePopup }) {
  if (!isOpen) return null;

  const items = [
    { imgSrc: process.env.PUBLIC_URL + "/earth_area.jpg", description: "Page de profile", hover_desc: "Terre" },
    { imgSrc: process.env.PUBLIC_URL + "/moon_area.jpg", description: "Liste des API", hover_desc: "Lune" },
    { imgSrc: process.env.PUBLIC_URL + "/marss_area.jpg", description: "Liste des A-REA", hover_desc: "Mars" },
    { imgSrc: process.env.PUBLIC_URL + "/neptune_area.jpg", description: "Création d'une A-REA", hover_desc: "Neptune" },
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
                {/* Afficher le texte de survol */}
                <div className="hover-description">{item.hover_desc}</div>
              </div>
              <p className="description">{item.description}</p>
            </div>
          ))}
        </div>
        </div>

        <button onClick={togglePopup} className="close-popup-button">
          Fermer
        </button>
      </div>
    </div>
  );
}

export default HelpPopUp;
