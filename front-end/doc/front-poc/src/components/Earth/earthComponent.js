import React, { Suspense } from "react";
import "./Earth.css";
import CameraControls from "./earth_components/CameraControls.jsx";
import ESphere from "./earth_components/Sphere.jsx";
import { Canvas } from "react-three-fiber";

const Earth = () => {
  return (
    <>
      <Canvas className="canvas">
        <CameraControls />
        <directionalLight intensity={1} />
        <ambientLight intensity={20} />
        <Suspense fallback="loading">
          <ESphere />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Earth;
