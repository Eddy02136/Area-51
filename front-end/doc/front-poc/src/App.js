import React, { Suspense, useEffect, useRef } from "react";
import "./App.css";
import Mars from "./components/Mars/marsComponent.js";
import Earth from "./components/Earth/earthComponent";
import Neptune from "./components/Neptune/neptuneComponent.js";
import EarthMoon from "./components/EarthMoon/earthMoonComponent";

import "./stars.css";
import createStars from "./stars";

const App = () => {
    const starsContainerRef = useRef(null);

    useEffect(() => {
        createStars(starsContainerRef.current);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="title"> AREA-51</h1>
                <div
                    ref={starsContainerRef}
                    className="stars-container"
                ></div>{" "}
                <div className="planet-container">
                    <div className="neptune"><Neptune /></div>
                    <div className="mars"><Mars /></div>
                    <div className="earth"><Earth /></div>
                    <div className="earth-moon"><EarthMoon /></div>
                </div>
            </header>
        </div>
    );
};

export default App;
