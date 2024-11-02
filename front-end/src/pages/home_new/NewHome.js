import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewHome.css";
import "./stars.css";
import Mars from "./planet_components/Mars/marsComponent.js";
import MarsCircle from "./planet_components/Mars/mars_components/MarsCircle.js";
import MoonCircle from "./planet_components/EarthMoon/earth_moon_components/MoonCircle.js";
import NeptuneCircle from "./planet_components/Neptune/neptune_components/NeptuneCircle.js";
import EarthCircle from "./planet_components/Earth/earth_components/EarthCircle.js";
import Earth from "./planet_components/Earth/earthComponent.js";
import Neptune from "./planet_components/Neptune/neptuneComponent.js";
import EarthMoon from "./planet_components/EarthMoon/earthMoonComponent";
import HelpPopUp from "../../components/helpButton/HelpPopUp.js";

import createStars from "./stars";

const NewHomePage = () => {
    const starsContainerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("linear-gradient(-45deg, #010930, #0f0e22, #070735, #0f0330, #01082b, #0f0d30, #000000)");

    useEffect(() => {
        createStars(starsContainerRef.current);
    }, []);

    const togglePlanetCentering = (planet) => {
        if (selectedPlanet === planet) {
            setSelectedPlanet(null);
            setBackgroundColor("linear-gradient(-45deg, #010930, #0f0e22, #070735, #0f0330, #01082b, #0f0d30, #000000)"); // couleur par défaut
        } else {
            setSelectedPlanet(planet);
            switch (planet) {
                case "mars":
                    setBackgroundColor("linear-gradient(-45deg, #410a0a, #732201, #29170f, #5c1800)"); // orange pour Mars
                    break;
                case "earth":
                    setBackgroundColor("linear-gradient(-45deg, #3d4f7a, #030e20, #071036, #00106a, #010521)"); // bleu pour Terre
                    break;
                case "neptune":
                    setBackgroundColor("linear-gradient(-45deg, #253f4d, #000d22, #001b2b, #004567, #002021)"); // bleu pour Neptune
                    break;
                case "earthMoon":
                    setBackgroundColor("linear-gradient(-45deg, #222c30, #444444, #1f1f1f, #111111, #6e6e6e, #212121)"); // gris pour la Lune
                    break;
                default:
                    setBackgroundColor("linear-gradient(-45deg, #010930, #0f0e22, #070735, #0f0330, #01082b, #0f0d30, #000000)"); // couleur par défaut
            }
        }
    };

    const [planetAnimationStates, setPlanetAnimationStates] = useState({
        mars: false,
        earth: false,
        neptune: false,
        earthMoon: false,
    });

    const handleClick = (planet) => {
        togglePlanetCentering(planet);
        setIsClicked(!isClicked);
        setPlanetAnimationStates((prevStates) => ({
            ...prevStates,
            [planet]: false, // Réinitialise l'animation pour la planète cliquée
        }));
    };

    const handleAnimationEnd = (planet) => {
        setPlanetAnimationStates((prevStates) => ({
            ...prevStates,
            [planet]: true, // Marque l'animation comme terminée pour la planète
        }));
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="new-home-page">
            <header className="nh-header" style={{background: backgroundColor}}>
            {/* <header className="nh-header"> */}
            <h1 className="nh-title"> AREA-51</h1>
  
                <div ref={starsContainerRef} className="stars-container"></div>
                <div className="planet-container">
                    <div
                        className={`neptune ${selectedPlanet === "neptune" ? "centered" : "animated"} ${selectedPlanet && selectedPlanet !== "neptune" ? "disabled" : ""}`}
                        onClick={() => (!selectedPlanet || selectedPlanet === "neptune") && handleClick("neptune")}
                        onAnimationEnd={() => handleAnimationEnd("neptune")}

                    >
                        <Neptune />
                        <NeptuneCircle type="apis" className={planetAnimationStates.neptune ? "visible" : ""} />
                    </div>
                    <div
                        className={`mars ${selectedPlanet === "mars" ? "centered" : "animated"} ${selectedPlanet && selectedPlanet !== "mars" ? "disabled" : ""}`}
                        onClick={() => (!selectedPlanet || selectedPlanet === "mars") && handleClick("mars")}
                        onAnimationEnd={() => handleAnimationEnd("mars")}
                    >
                        <Mars />
                        <MarsCircle type="apis" className={planetAnimationStates.mars ? "visible" : ""} />
                    </div>
                    <div
                        className={`earth ${selectedPlanet === "earth" ? "centered" : "animated"} ${selectedPlanet && selectedPlanet !== "earth" ? "disabled" : ""}`}
                        onClick={() => (!selectedPlanet || selectedPlanet === "earth") && handleClick("earth")}
                        onAnimationEnd={() => handleAnimationEnd("earth")}
                    >
                        <Earth />
                        <EarthCircle type="apis" className={planetAnimationStates.earth ? "visible" : ""} />
                    </div>
                    <div
                        className={`earth-moon ${selectedPlanet === "earthMoon" ? "centered" : "animated"} ${selectedPlanet && selectedPlanet !== "earthMoon" ? "disabled" : ""}`}
                        onClick={() => (!selectedPlanet || selectedPlanet === "earthMoon") && handleClick("earthMoon")}
                        onAnimationEnd={() => handleAnimationEnd("earthMoon")}
                    >
                        <EarthMoon />
                        <MoonCircle type="apis" className={planetAnimationStates.earthMoon ? "visible" : ""} />
                    </div>
                    <div className="help">
                        <button 
                            onClick={togglePopup} 
                            className={`help-button ${selectedPlanet ? "disabled" : ""}`}
                            disabled={!!selectedPlanet}
                        > 
                            Aide 
                        </button>
                        <HelpPopUp isOpen={isOpen} togglePopup={togglePopup} />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default NewHomePage;
