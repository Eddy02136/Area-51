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
import backgroundmusic from "../../assets/background.mp3";
import createStars from "./stars";

const NewHomePage = () => {
    const starsContainerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState("linear-gradient(-45deg, #010930, #0f0e22, #070735, #0f0330, #01082b, #0f0d30, #000000)");
    const navigate = useNavigate();

    useEffect(() => {
        createStars(starsContainerRef.current);
    }, []);

    const openPlanetCentering = (planet) => {
        setSelectedPlanet(planet);
        switch (planet) {
            case "mars":
                setBackgroundColor("linear-gradient(-45deg, #410a0a, #732201, #29170f, #5c1800)");
                break;
            case "earth":
                setBackgroundColor("linear-gradient(-45deg, #3d4f7a, #030e20, #071036, #00106a, #010500)");
                break;
            case "neptune":
                setBackgroundColor("linear-gradient(-45deg, #253f4d, #000d22, #001b2b, #004567, #002021)");
                break;
            case "earthMoon":
                setBackgroundColor("linear-gradient(-45deg, #222c30, #444444, #1f1f1f, #111111, #6e6e6e, #212121)");
                break;
            default:
                setBackgroundColor("linear-gradient(-45deg, #010930, #0f0e22, #070735, #0f0330, #01082b, #0f0d30, #000000)");
        }
    };

    const closePlanet = () => {
        setSelectedPlanet(null);
        setBackgroundColor("linear-gradient(-45deg, #010930, #0f0e22, #070735, #0f0330, #01082b, #0f0d30, #000000)");
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.reload();
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="new-home-page">
            <header className="nh-header" style={{ background: backgroundColor }}>
                <audio src={backgroundmusic} autoPlay loop />
                <h1 className="nh-title">AREA51</h1>

                <div ref={starsContainerRef} className="stars-container"></div>
                <div className="planet-container">
                    <div
                        className={`neptune ${selectedPlanet === "neptune" ? "centered" : "animated"} ${selectedPlanet && selectedPlanet !== "neptune" ? "disabled" : ""}`}
                        onClick={() => !selectedPlanet && openPlanetCentering("neptune")}
                    >
                        <Neptune />
                        {selectedPlanet === "neptune" && (
                            <button className="close-button" onClick={closePlanet}>   </button>
                        )}
                        <NeptuneCircle type="apis" className={selectedPlanet === "neptune" ? "visible" : ""} />
                    </div>

                    <div
                        className={`mars ${selectedPlanet === "mars" ? "centered" : "animated"} ${selectedPlanet && selectedPlanet !== "mars" ? "disabled" : ""}`}
                        onClick={() => !selectedPlanet && openPlanetCentering("mars")}
                    >
                        <Mars />
                        {selectedPlanet === "mars" && (
                            <button className="close-button" onClick={closePlanet}>   </button>
                        )}
                        <MarsCircle type="apis" className={selectedPlanet === "mars" ? "visible" : ""} />
                    </div>

                    <div
                        className={`earth ${selectedPlanet === "earth" ? "centered" : "animated"} ${selectedPlanet && selectedPlanet !== "earth" ? "disabled" : ""}`}
                        onClick={() => !selectedPlanet && openPlanetCentering("earth")}
                    >
                        <Earth />
                        {selectedPlanet === "earth" && (
                            <button className="close-button" onClick={closePlanet}>   </button>
                        )}
                        <EarthCircle type="apis" className={selectedPlanet === "earth" ? "visible" : ""} />
                    </div>

                    <div
                        className={`earth-moon ${selectedPlanet === "earthMoon" ? "centered" : "animated"} ${selectedPlanet && selectedPlanet !== "earthMoon" ? "disabled" : ""}`}
                        onClick={() => !selectedPlanet && openPlanetCentering("earthMoon")}
                    >
                        <EarthMoon />
                        {selectedPlanet === "earthMoon" && (
                            <button className="close-button" onClick={closePlanet}>   </button>
                        )}
                        <MoonCircle type="apis" className={selectedPlanet === "earthMoon" ? "visible" : ""} />
                    </div>

                    <div className="help">
                        <button onClick={handleLogout} className="disconnect-button">Disconnect</button>
                        <button 
                            onClick={togglePopup} 
                            className={`help-button ${selectedPlanet ? "disabled" : ""}`}
                            disabled={!!selectedPlanet}
                        > 
                            Help 
                        </button>
                        <HelpPopUp isOpen={isOpen} togglePopup={togglePopup} />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default NewHomePage;
