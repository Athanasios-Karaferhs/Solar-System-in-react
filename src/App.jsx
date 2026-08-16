import React, { useEffect, useRef, useState } from "react";
<<<<<<< HEAD
import "./App.css";

const PLANETS = [
  { name: "Mercury", color: "#b1adad", radius: 4, distance: 60, period: 88 },
  { name: "Venus", color: "#e6c27a", radius: 7, distance: 85, period: 225 },
  { name: "Earth", color: "#4d90fe", radius: 7.5, distance: 115, period: 365 },
  { name: "Mars", color: "#c1440e", radius: 5.5, distance: 145, period: 687 },
=======

const PLANETS = [
  {
    name: "Mercury",
    color: "#b1adad",
    radius: 4,
    distance: 60,
    period: 88,
    tilt: 0,
  },
  {
    name: "Venus",
    color: "#e6c27a",
    radius: 7,
    distance: 85,
    period: 225,
    tilt: 0,
  },
  {
    name: "Earth",
    color: "#4d90fe",
    radius: 7.5,
    distance: 115,
    period: 365,
    tilt: 0,
  },
  {
    name: "Mars",
    color: "#c1440e",
    radius: 5.5,
    distance: 145,
    period: 687,
    tilt: 0,
  },
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
  {
    name: "Jupiter",
    color: "#d8a15c",
    radius: 16,
    distance: 195,
    period: 4333,
<<<<<<< HEAD
=======
    tilt: 0,
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
  },
  {
    name: "Saturn",
    color: "#e0c48c",
    radius: 14,
    distance: 245,
    period: 10759,
<<<<<<< HEAD
=======
    tilt: 0,
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
    ring: true,
  },
  {
    name: "Uranus",
    color: "#9fd6e0",
    radius: 10,
    distance: 285,
    period: 30687,
<<<<<<< HEAD
=======
    tilt: 0,
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
  },
  {
    name: "Neptune",
    color: "#4d6fe0",
    radius: 10,
    distance: 320,
    period: 60190,
<<<<<<< HEAD
  },
];

// window size and center
=======
    tilt: 0,
  },
];
//window size and center
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
const view = 990;
const CENTER = view / 2;

export default function SolarSystem() {
<<<<<<< HEAD
  // running toggles on/off, angles = each planet's current position around the Sun (0 to 2π)
=======
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(4);
  const [selected, setSelected] = useState(null);
  const [angles, setAngles] = useState(() =>
    PLANETS.map(() => Math.random() * Math.PI * 2),
  );
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    function tick(now) {
      if (lastRef.current == null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;

      if (running) {
        setAngles((prev) =>
          prev.map((a, i) => {
            const p = PLANETS[i];
            const angularSpeed = (2 * Math.PI) / p.period;
            const daysPerSecond = speed * 20;
            return a + angularSpeed * daysPerSecond * dt;
          }),
        );
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, speed]);

<<<<<<< HEAD
  const selectedPlanet = PLANETS.find((p) => p.name === selected) || null;

  return (
    <div className="solar-system">
      <div className="controls">
        <button className="button" onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Play"}
        </button>
        <label className="speed-label">
=======
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#05070d",
        borderRadius: 12,
        padding: "1.5rem",
        color: "#e8e8e8",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => setRunning((r) => !r)}
          style={{
            background: "#1c2333",
            color: "#e8e8e8",
            border: "1px solid #333c50",
            borderRadius: 8,
            padding: "6px 14px",
            cursor: "pointer",
          }}
        >
          {running ? "Pause" : "Play"}
        </button>
        <label
          style={{
            fontSize: 13,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
          Speed
          <input
            type="range"
            min="0.2"
            max="15"
            step="0.2"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
<<<<<<< HEAD
          <span className="speed-value">{speed.toFixed(1)}x</span>
=======
          <span style={{ minWidth: 32 }}>{speed.toFixed(1)}x</span>
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
        </label>
      </div>

      <svg
        width={view}
        height={view}
        viewBox={`0 0 ${view} ${view}`}
<<<<<<< HEAD
        className="canvas"
=======
        style={{
          background: "radial-gradient(circle, #0a0e1a 0%, #05070d 80%)",
          borderRadius: 8,
        }}
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
      >
        {/* background stars */}
        {Array.from({ length: 120 }).map((_, i) => {
          const x = (i * 37.13) % view;
          const y = (i * 91.7) % view;
          const r = (i % 3) * 0.4 + 0.4;
          return (
            <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" opacity={0.5} />
          );
        })}

        {/* orbit paths */}
        {PLANETS.map((p) => (
          <circle
            key={p.name + "-orbit"}
            cx={CENTER}
            cy={CENTER}
            r={p.distance}
            fill="none"
            stroke="#2a324a"
            strokeWidth={1}
          />
        ))}

        {/* sun */}
        <circle cx={CENTER} cy={CENTER} r={22} fill="#ffcf5c" />
        <circle cx={CENTER} cy={CENTER} r={30} fill="#ffcf5c" opacity={0.15} />

        {/* planets */}
        {PLANETS.map((p, i) => {
          const a = angles[i];
          const x = CENTER + p.distance * Math.cos(a);
          const y = CENTER + p.distance * Math.sin(a);
          const isSelected = selected === p.name;
          return (
            <g
              key={p.name}
<<<<<<< HEAD
              className="planet-group"
              onClick={() => setSelected(isSelected ? null : p.name)}
=======
              onClick={() => setSelected(isSelected ? null : p.name)}
              style={{ cursor: "pointer" }}
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
            >
              {p.ring && (
                <ellipse
                  cx={x}
                  cy={y}
                  rx={p.radius * 1.9}
                  ry={p.radius * 0.6}
                  fill="none"
                  stroke="#c9b27a"
                  strokeWidth={2}
                  opacity={0.8}
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={p.radius}
                fill={p.color}
                stroke={isSelected ? "#ffffff" : "none"}
                strokeWidth={2}
              />
              {isSelected && (
                <text
                  x={x}
                  y={y - p.radius - 10}
                  fill="#ffffff"
                  fontSize={12}
                  textAnchor="middle"
                >
                  {p.name} ({p.period}d)
                </text>
              )}
            </g>
          );
        })}
      </svg>

<<<<<<< HEAD
      {selectedPlanet && (
        <div className="info-panel">
          <p>hello world</p>
          <p>{selectedPlanet.name}</p>
        </div>
      )}

      <p className="caption">
=======
      <p
        style={{
          fontSize: 12,
          color: "#8a93ab",
          marginTop: 10,
          textAlign: "center",
        }}
      >
>>>>>>> d7c1d954ed23c4008e4fd8737d8c418ca4a126b8
        distances and sizes are adjusted for visibility. Click a planet for its
        name and year length.
      </p>
    </div>
  );
}
