import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewHome.css";
import "./stars.css";
import Mars from "./planet_components/Mars/marsComponent.js";
import Earth from "./planet_components/Earth/earthComponent.js";
import Neptune from "./planet_components/Neptune/neptuneComponent.js";
import EarthMoon from "./planet_components/EarthMoon/earthMoonComponent";
import HelpPopUp from "../../components/helpButton/HelpPopUp.js";

import createStars from "./stars";

const NewHomePage = () => {
    const starsContainerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        createStars(starsContainerRef.current);
    }, []);

    const handleMarsClick = () => {
        alert("Bienvenue sur Mars !");
    };

    const handleEarthClick = () => {
        alert("Bienvenue sur Terre !");
    };

    const handleNeptuneClick = () => {
        alert("Bienvenue sur Neptune !");
    };

    const handleEarthMoonClick = () => {
        alert("Bienvenue sur la Lune de la Terre !");
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="new-home-page">
            <header className="nh-header">
                <h1 className="nh-title"> AREA-51</h1>
  
                <div ref={starsContainerRef} className="stars-container"></div>
                <div className="planet-container">
                    <div className="neptune" onClick={handleNeptuneClick}>
                        <Neptune />
                    </div>
                    <div className="mars" onClick={handleMarsClick}>
                        <Mars />
                    </div>
                    <div className="earth" onClick={handleEarthClick}>
                        <Earth />
                    </div>
                    <div className="earth-moon" onClick={handleEarthMoonClick}>
                        <EarthMoon />
                    </div>
                    <div className="help">
                    <button onClick={togglePopup} className="help-button"> Aide </button>
                    <HelpPopUp isOpen={isOpen} togglePopup={togglePopup} />
                </div>
                </div>
            </header>
        </div>
    );
};

export default NewHomePage;
