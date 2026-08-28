import { Canvas, useFrame, useLoader } from "@react-three/fiber"; // 3D viewport provided by @react-three/fiber
import { useRef, useMemo, useState, Suspense } from "react";
import * as THREE from "three";
import "./App.css";
import PLANET_DATA from "./data/planets.json";
// Database of planet textures & information(the information is testing)
/*const PLANET_DATA = {
  Earth: {
    texture: "/assets/textures/earth_atmos_2048.jpg",
    period: "365 days",
    distance: "1 AU",
    diameter: "12,742 km",
    moons: 1,
    funFact: "Earth is the only known planet with liquid water on its surface.",
  },
  Mars: {
    texture: "/assets/textures/2k_mars.jpg",
    period: "687 days",
    distance: "1.52 AU",
    diameter: "6,779 km",
    moons: 2,
    funFact:
      "Mars is home to Olympus Mons, the largest volcano in the solar system.",
  },
  Mercury: {
    texture: "/assets/textures/2k_mercury.jpg",
    period: "88 days",
    distance: "0.39 AU",
    diameter: "4,879 km",
    moons: 0,
    funFact:
      "Mercury has almost no atmosphere, so temperatures swing wildly between day and night.",
  },
  Venus: {
    texture: "/assets/textures/2k_venus_surface.jpg",
    period: "225 days",
    distance: "0.72 AU",
    diameter: "12,104 km",
    moons: 0,
    funFact:
      "Venus rotates backwards, and a day there is longer than its year.",
  },
  Jupiter: {
    texture: "/assets/textures/2k_jupiter.jpg",
    period: "4,333 days",
    distance: "5.20 AU",
    diameter: "139,820 km",
    moons: 95,
    funFact:
      "Jupiter's Great Red Spot is a storm that has raged for over 350 years.",
  },
  Saturn: {
    texture: "/assets/textures/2k_saturn.jpg",
    period: "10,759 days",
    distance: "9.58 AU",
    diameter: "116,460 km",
    moons: 146,
    funFact: "Saturn's rings are made almost entirely of ice particles.",
  },
  Uranus: {
    texture: "/assets/textures/2k_uranus.jpg",
    period: "30,687 days",
    distance: "19.22 AU",
    diameter: "50,724 km",
    moons: 27,
    funFact:
      "Uranus rotates on its side, likely from a massive early collision.",
  },
  Neptune: {
    texture: "/assets/textures/2k_neptune.jpg",
    period: "60,190 days",
    distance: "30.05 AU",
    diameter: "49,244 km",
    moons: 14,
    funFact:
      "Neptune has the strongest winds in the solar system, over 2,000 km/h.",
  },
};*/

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

// Collapsible section — click the header to toggle the arrow + reveal content
function p({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="expandable">
      <button
        className="expandable-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span className={`arrow ${isOpen ? "arrow-open" : ""}`}>▼</span>
      </button>

      {isOpen && <div className="expandable-content">{children}</div>}
    </div>
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
          <CustomStars count={4000} />

          <Suspense fallback={null}>
            <CustomPlanet texturePath={info.texture} />
          </Suspense>
        </Canvas>
      </div>
      <div className="detail-right">
        <h1 className="text">{planetName}</h1>
        {/*info about each plannet from the planets.json*/}
        {info.sections.map((section) => (
          <div key={section.heading}>
            <p className="text">{info.intro}</p>
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
