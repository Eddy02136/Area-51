import React, { useRef } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useFrame, useLoader } from "react-three-fiber";

const Sphere = () => {
  const planet = useRef();

  const { nodes } = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/mars.glb');

  useFrame(() => (planet.current.rotation.y += 0.002));

  const handleClick = () => {
    alert("Planet MARS clicked!");
  };

  return (
    <mesh
      ref={planet}
      visible
      position={[0, 0, 0]}
      geometry={nodes.Cube008.geometry}
      material={nodes.Cube008.material}
    />
  );
};

export default Sphere;
