import React, { useRef } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useFrame, useLoader } from "react-three-fiber";

const ESphere = () => {
  const planet = useRef();

  const { nodes } = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/earth.glb');

  useFrame(() => (planet.current.rotation.y += 0.002));

  const handleClick = () => {
    alert("Planet EARTH clicked!");
  }

  return (
    <mesh
      ref={planet}
      visible
      position={[0, 0, 0]}
      geometry={nodes.Cube001.geometry}
      material={nodes.Cube001.material}
      onClick={handleClick}
    />
  );
};

export default ESphere;
