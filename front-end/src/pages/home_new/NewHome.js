import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewHome.css";
import "./stars.css";
import Mars from "./planet_components/Mars/marsComponent.js";
import Earth from "./planet_components/src/components/Earth/earthComponent.js";
import Neptune from "./planet_components/Neptune/neptuneComponent.js";
import EarthMoon from "./planet_components/EarthMoon/earthMoonComponent";
import OpeningMenu from "./planet_components/OpeningMenu/OpeningMenu.js";

import createStars from "./stars";

const NewHomePage = () => {
    const starsContainerRef = useRef(null);
    const [isRadialMenuOpen, setIsRadialMenuOpen] = useState(false);

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
                        {isRadialMenuOpen && <OpeningMenu />}
                    </div>
                    <div className="earth" onClick={handleEarthClick}>
                        <Earth />
                    </div>
                    <div className="earth-moon" onClick={handleEarthMoonClick}>
                        <EarthMoon />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default NewHomePage;
