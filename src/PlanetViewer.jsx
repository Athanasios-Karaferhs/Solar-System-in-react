import { Canvas, useFrame, useLoader } from "@react-three/fiber"; // 3D viewport provided by @react-three/fiber
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import "./App.css";

function CustomEarth() {
  const meshRef = useRef();
  // Loading external assets
  const texture = useLoader(
    THREE.TextureLoader,
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
  );

  // Executes on each frame render
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Rotation of the earth with a smooth spin effect
    }
  });

  return (
    // Container object in 3D space
    <mesh ref={meshRef} scale={1.8}>
      {/* A sphere with a radius of 1 unit, segmented into a grid of 64 horizontal and 64 vertical polygons*/}
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} roughness={0.7} metalness={0.1} />
    </mesh>
  );
}

function CustomStars({ count = 2000 }) {
  const points = useRef();

  //random positions for thousands of star particles
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 100; // X
      pos[i + 1] = (Math.random() - 0.5) * 100; // Y
      pos[i + 2] = (Math.random() - 0.5) * 100; // Z
    }
    return pos;
  }, [count]);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export function EarthDetailView({ onClose }) {
  return (
    <div className="detail-view">
      <div className="detail-left">
        {/*Canvas:3D Viewport */}
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.8} />
          {/* Soft lighting */}
          <directionalLight position={[5, 3, 5]} intensity={1.5} />
          {/* Simulates distant sunlight hitting the planet */}

          {/* Render the stars in the background */}
          <CustomStars count={3000} />

          <Suspense fallback={null}>
            <CustomEarth />
          </Suspense>
        </Canvas>
      </div>
      <div className="detail-right">
        <h1>Earth</h1>
        <p>Orbital period: 365 days</p>
        <p>Distance from Sun: 1 AU</p>
        <button className="button" onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
}
