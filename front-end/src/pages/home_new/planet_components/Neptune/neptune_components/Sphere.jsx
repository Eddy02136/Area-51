import React, { useRef } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useFrame, useLoader } from "react-three-fiber";

const NSphere = () => {
  const planet = useRef();

  const { nodes } = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/neptune.glb');

  useFrame(() => (planet.current.rotation.y += 0.002));

  const handleClick = () => { 
    alert("Planet NEPTUNE clicked!"); 
  }

  return (
    <mesh
      ref={planet}
      visible
      position={[0, 0, 0]}
      geometry={nodes.Neptune.geometry}
      material={nodes.Neptune.material}
      // onClick={handleClick}
    />
  );
};

export default NSphere;
