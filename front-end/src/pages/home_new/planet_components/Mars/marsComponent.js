import React, { Suspense } from "react";
import "./Mars.css";
import CameraControls from "./mars_components/CameraControls.jsx";
import Sphere from "./mars_components/Sphere.jsx";
import { Canvas } from "react-three-fiber";

const Mars = () => {
  return (
    <>
      <Canvas className="canvas">
        <CameraControls />
        <directionalLight intensity={0.1} />
        <ambientLight intensity={0.8} />
        <Suspense fallback="loading">
          <Sphere />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Mars;
