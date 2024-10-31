import React, { Suspense } from "react";
import "./EarthMoon.css";
import CameraControls from "./earth_moon_components/CameraControls.jsx";
import EMSphere from "./earth_moon_components/Sphere.jsx";
import { Canvas } from "react-three-fiber";

const EarthMoon = () => {
  return (
    <>
      <Canvas className="canvas">
        <CameraControls />
        <directionalLight intensity={1} />
        <ambientLight intensity={20} />
        <Suspense fallback="loading">
          <EMSphere />
        </Suspense>
      </Canvas>
    </>
  );
};

export default EarthMoon;
