"use client";

import { Canvas } from "@react-three/fiber";
import "./style.scss";
import PlaneImage from "@/src/components/planeImage";

const Landing = () => {
  return (
    <>
      <div className="landing grid-p">
        <h1>
          LOUIS <br />
          DESCOTES
        </h1>
        <p>
          Adipisicing laborum quis labore. Laboris occaecat consectetur veniam
          sit exercitation id irure ea culpa exercitation ullamco. Minim aliquip
          aliqua tempor exercitation dolore nostrud dolor. Id magna sint
          deserunt occaecat aliqua. Eiusmod adipisicing laborum adipisicing
          voluptate non officia commodo nisi tempor veniam nisi id laborum
          veniam.
        </p>
      </div>
      <div id="canvas-container">
        <Canvas>
          <PlaneImage />
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
        </Canvas>
      </div>
    </>
  );
};

export default Landing;
