import React, { Suspense } from "react";
import "./Neptune.css";
import CameraControls from "./neptune_components/CameraControls.jsx";
import NSphere from "./neptune_components/Sphere.jsx";
import { Canvas } from "react-three-fiber";

const Neptune = () => {
  return (
    <>
      <Canvas className="canvas">
        <CameraControls />
        <directionalLight intensity={0.1} />
        <ambientLight intensity={0.8} />
        <Suspense fallback="loading">
          <NSphere />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Neptune;
