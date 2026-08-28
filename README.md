# Solar System

An interactive 2D solar system simulation built with React — planets orbit the sun
in real time based on their actual relative orbital periods, with a 3D detail view
for exploring individual planets up close.

## Features

- 8 planets orbiting the sun, animated with `requestAnimationFrame`
- Orbital speeds scaled to real relative periods (Mercury moves fastest, Neptune slowest)
- Play/pause and adjustable simulation speed
- Click a planet to select it and see its name + orbital period
- "Info" button opens a detail view: a spinning 3D model on one side, planet info on the other
- Saturn rendered with rings

## Tech stack

- React + Vite
- `three` / `@react-three/fiber` for the 3D planet detail view
- Plain SVG for the orbit visualization
- Plain CSS (no framework)

## Getting started

```bash
git clone <repo-url>
cd solar-system
npm install
npm run dev
```

Visit 'localhost' using the linked generated on your terminal, or simiply by pressing O+Enter on your keyboard.