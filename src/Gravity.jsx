import { Canvas } from "@react-three/fiber";
import "./App.css";

export function GravityView({ onClose }) {
  return (
    <div className="detail-view">
      <div className="detail-left" style={{ width: "100%" }}>
        <Canvas camera={{ position: [0, 3, 8] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />

          {/* render mia mikrh sfera(gia testing)*/}
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#F527C8" wireframe />
          </mesh>
        </Canvas>
      </div>

      <button className="button_info-back" onClick={onClose}>
        Back
      </button>
    </div>
  );
}
