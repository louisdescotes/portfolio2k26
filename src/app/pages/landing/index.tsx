"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import "./style.scss";
import { useRef, useState } from "react";

function Box(props) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const Landing = () => {
  return (
    <>
      <h1>
        LOUIS <br />
        DESCOTES
      </h1>
      <p>
        Adipisicing laborum quis labore. Laboris occaecat consectetur veniam sit
        exercitation id irure ea culpa exercitation ullamco. Minim aliquip
        aliqua tempor exercitation dolore nostrud dolor. Id magna sint deserunt
        occaecat aliqua. Eiusmod adipisicing laborum adipisicing voluptate non
        officia commodo nisi tempor veniam nisi id laborum veniam.
      </p>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </>
  );
};

export default Landing;
