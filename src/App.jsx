import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { EarthDetailView } from "./PlanetViewer.jsx";

const PLANETS = [
  { name: "Mercury", color: "#b1adad", radius: 4, distance: 60, period: 88 },
  { name: "Venus", color: "#e6c27a", radius: 7, distance: 85, period: 225 },
  { name: "Earth", color: "#4d90fe", radius: 7.5, distance: 115, period: 365 },
  { name: "Mars", color: "#c1440e", radius: 5.5, distance: 145, period: 687 },
  {
    name: "Jupiter",
    color: "#d8a15c",
    radius: 16,
    distance: 195,
    period: 4333,
  },
  {
    name: "Saturn",
    color: "#e0c48c",
    radius: 14,
    distance: 245,
    period: 10759,
    ring: true,
  },
  {
    name: "Uranus",
    color: "#9fd6e0",
    radius: 10,
    distance: 285,
    period: 30687,
  },
  {
    name: "Neptune",
    color: "#4d6fe0",
    radius: 10,
    distance: 320,
    period: 60190,
  },
];

// window size and center
const view = 990;
const CENTER = view / 2;

export default function SolarSystem() {
  // running toggles on/off, angles = each planet's current position around the Sun (0 to 2π)
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(4);
  const [selected, setSelected] = useState(null);
  const [angles, setAngles] = useState(() =>
    PLANETS.map(() => Math.random() * Math.PI * 2),
  );
  const [detailPlanet, setDetailPlanet] = useState(null); // e.g. "Earth" or null

  function handle_open_planet(selectedPlanetName) {
    setDetailPlanet(selectedPlanetName);
  }

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

  // look up the full planet object for whatever name is currently selected
  const selectedPlanet = PLANETS.find((p) => p.name === selected) || null;

  if (detailPlanet) {
    return (
      <EarthDetailView
        planetName={detailPlanet}
        onClose={() => setDetailPlanet(null)}
      />
    );
  }

  return (
    <div className="solar-system">
      <div className="controls">
        <button className="button" onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Play"}
        </button>
        <label className="speed-label">
          Speed
          <input
            type="range"
            min="0.2"
            max="15"
            step="0.2"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
          <span className="speed-value">{speed.toFixed(1)}x</span>
        </label>
      </div>
      {/* info about the planets */}
      {selected !== null && (
        <button
          className={`button_info button_info-${selected?.toLowerCase()}`}
          onClick={() => handle_open_planet(selected)}
        >
          <p>info for {selected}</p>
        </button>
      )}
      <svg
        viewBox={`0 0 ${view} ${view}`}
        className="canvas"
        preserveAspectRatio="xMidYMid meet"
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
              className="planet-group"
              onClick={() => setSelected(isSelected ? null : p.name)}
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
      <p className="caption">
        distances and sizes are adjusted for visibility. Click a planet for its
        name and year length.
      </p>
    </div>
  );
}
