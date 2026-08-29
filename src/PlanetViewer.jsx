import { Canvas, useFrame, useLoader } from "@react-three/fiber"; // 3D viewport provided by @react-three/fiber
import { useRef, useMemo, useState, useEffect, Suspense } from "react"; //useState k useEffect
import * as THREE from "three";
import "./App.css";
import PLANET_DATA from "./data/planets.json";

function CustomPlanet({ texturePath, onLoaded }) {
  const meshRef = useRef();
  // on load prop on custom planet, react pauses rendering custom planet unti downloading is done for the planet
  const texture = useLoader(THREE.TextureLoader, texturePath);

  // useLoader suspends until the texture is ready, so by the time this
  // component body runs, loading is done — let the parent know
  useEffect(() => {
    onLoaded();
  }, [texture, onLoaded]);

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
        size={0.1}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export function EarthDetailView({ planetName = "Earth", onClose }) {
  // Get info for the requested planet (Earth if not found)
  const info = PLANET_DATA[planetName] || PLANET_DATA.Earth;

  // Tracks whether the 3D texture is still loading, so we can show a
  // spinner instead of a blank canvas while it fetches
  const [isLoading, setIsLoading] = useState(true);

  // Reset the loading state whenever the selected planet changes,
  // so switching planets shows the spinner again for the new texture
  useEffect(() => {
    setIsLoading(true);
  }, [planetName]);

  return (
    <div className="detail-view">
      <div className="detail-left">
        {/* Loading overlay shown until CustomPlanet's texture finishes loading */}
        {isLoading && (
          <div className="planet-loading">
            <div className="spinner" />
            <p>Loading planet...</p>
          </div>
        )}

        {/*Canvas:3D Viewport */}
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.8} />
          {/* Soft lighting */}
          <directionalLight position={[5, 3, 5]} intensity={1.5} />
          {/* Simulates distant sunlight hitting the planet */}

          {/* Render the stars in the background */}
          <CustomStars count={7000} />

          <Suspense fallback={null}>
            <CustomPlanet
              texturePath={info.texture}
              onLoaded={() => setIsLoading(false)}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="detail-right">
        <h1 className="text">{planetName}</h1>

        {/*info about each plannet from the planets.json*/}
        <p className="text">{info.intro}</p>

        {info.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text">{section.heading}</h2>
            <p className="text">{section.text}</p>
          </div>
        ))}

        <button
          className={`button_info button_info-${planetName?.toLowerCase()}`}
          onClick={onClose}
        >
          Back
        </button>
      </div>
    </div>
  );
}
