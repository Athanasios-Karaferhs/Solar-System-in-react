import { Canvas, useFrame, useLoader } from "@react-three/fiber"; // 3D viewport provided by @react-three/fiber
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import "./App.css";

// Database of planet textures & information(the information is testing)
const PLANET_DATA = {
  Earth: {
    texture: "/assets/textures/earth_atmos_2048.jpg",
    period: "365 days",
    distance: "1 AU",
  },
  Mars: {
    texture: "/assets/textures/2k_mars.jpg",
    period: "687 days",
    distance: "1.52 AU",
  },
  Mercury: {
    texture: "/assets/textures/2k_mercury.jpg",
    period: "88 days",
    distance: "0.39 AU",
  },
  Venus: {
    texture: "/assets/textures/2k_venus_surface.jpg",
    period: "225 days",
    distance: "0.72 AU",
  },
  Jupiter: {
    texture: "/assets/textures/2k_jupiter.jpg",
    period: "4,333 days",
    distance: "5.20 AU",
  },
  Saturn: {
    texture: "/assets/textures/2k_saturn.jpg",
    period: "10,759 days",
    distance: "9.58 AU",
  },
  Uranus: {
    texture: "/assets/textures/2k_uranus.jpg",
    period: "30,687 days",
    distance: "19.22 AU",
  },
  Neptune: {
    texture: "/assets/textures/2k_neptune.jpg",
    period: "60,190 days",
    distance: "30.05 AU",
  },
};

function CustomPlanet({ texturePath }) {
  const meshRef = useRef();
  // Loading external assets
  const texture = useLoader(THREE.TextureLoader, texturePath);

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

  // positions for star particles
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

export function EarthDetailView({ planetName = "Earth", onClose }) {
  // Get info for the requested planet (Earth if not found)
  const info = PLANET_DATA[planetName] || PLANET_DATA.Earth;

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
            <CustomPlanet texturePath={info.texture} />
          </Suspense>
        </Canvas>
      </div>
      <div className="detail-right">
        <h1>{planetName}</h1>
        <p>Orbital period: {info.period}</p>
        <p>Distance from Sun: {info.distance}</p>
        <button
          className={`button_info-${planetName?.toLowerCase()}`}
          onClick={onClose}
        >
          Back
        </button>
      </div>
    </div>
  );
}
