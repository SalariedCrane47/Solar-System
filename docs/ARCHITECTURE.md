# Architecture Documentation

## Overview

Solar System Explorer is an interactive 3D visualization built with Three.js and Vite. The application renders a complete solar system with planets, moons, asteroid belt, and the Sun with atmospheric effects.

## Core Architecture

### Entry Point

`main.js` serves as the application entry point, orchestrating:

- Scene initialization
- Asset preloading
- Event listener setup
- Animation loop

### Module Responsibilities

| Module         | Responsibility                                    |
| -------------- | ------------------------------------------------- |
| `scene.js`     | Three.js scene, camera, renderer, post-processing |
| `controls.js`  | Camera controls configuration                     |
| `animation.js` | Main animation loop, raycasting                   |
| `events.js`    | Touch events, planet focus logic                  |
| `state.js`     | Global application state                          |
| `constants.js` | Configuration constants                           |

## State Management

State is centralized in `src/state.js`:

```javascript
export const state = {
  started: false, // Game started flag
  timeScale: 1.0, // Animation speed multiplier
  focusObject: null, // Currently focused planet
  isTransitioning: false, // Camera transition flag
  hoveredObject: null, // Currently hovered object
  sceneReady: false, // Assets loaded flag
};
```

### Pre-allocated Vectors

Animation performance is optimized by pre-allocating vectors in `vectors`:

```javascript
export const vectors = {
  targetPos: new THREE.Vector3(),
  oldTargetPos: new THREE.Vector3(),
  currentCamPos: new THREE.Vector3(),
  moveDelta: new THREE.Vector3(),
};
```

## Constants

All magic numbers are extracted to `src/constants.js`:

| Category         | Purpose                      |
| ---------------- | ---------------------------- |
| `CAMERA`         | FOV, near/far planes, speeds |
| `RENDERER`       | Tone mapping, antialiasing   |
| `POSTPROCESSING` | Bloom and outline settings   |
| `LIGHTING`       | Ambient and sun light values |
| `STARS`          | Star count and radius        |
| `ASTEROID_BELT`  | Asteroid count               |
| `INTERACTION`    | Touch/click sensitivities    |

## Rendering Pipeline

### Initialization Order

1. Create scene, camera, renderer
2. Setup post-processing (bloom, outline)
3. Add lighting
4. Create starfield and nebula
5. Generate planets and orbits
6. Create asteroid belt
7. Setup labels and UI
8. Preload textures
9. Start animation loop

### Animation Loop

```
┌─────────────────────────────────────┐
│  1. Calculate delta time            │
│  2. Animate stars (twinkle effect)  │
│  3. Update planet positions          │
│  4. Animate sun corona              │
│  5. Animate asteroids               │
│  6. Update Earth shader uniforms    │
│  7. Follow focused object (if any)  │
│  8. Update camera controls          │
│  9. Update planet labels            │
│  10. Render frame                   │
└─────────────────────────────────────┘
```

## Planet Configuration

Planets are configured in `src/data/orbitParam.js`:

```javascript
export const orbitalParameters = {
  mercury: {
    semiMajorAxis: 3.0,
    eccentricity: 0.205,
    theta: Math.random() * 2 * Math.PI,
    size: 0.3,
    tilt: (2 * Math.PI) / 180,
  },
  // ...
};
```

Orbital positions are calculated using elliptical orbit equations:

```
x = a * cos(θ) - c
z = b * sin(θ)
where c = a * e (focus offset)
      b = a * sqrt(1 - e²)
```

## Performance Optimizations

### 1. InstancedMesh for Asteroids

Instead of 2500 individual meshes, the asteroid belt uses a single `InstancedMesh`:

- Shared geometry
- Shared material
- Batch matrix updates

### 2. Throttled Raycasting

Mouse hover detection is throttled to 16ms (60fps max) to prevent unnecessary computation.

### 3. Pre-allocated Vectors

The animation loop reuses pre-allocated `Vector3` objects instead of creating new ones each frame.

### 4. LOD Utility

A Level of Detail utility (`src/utils/lod.js`) is available for reducing geometry complexity at distance.

## Memory Management

The `disposal.js` utility provides cleanup functions:

- `disposeObject()` - Recursively dispose geometry and materials
- `disposeMaterial()` - Handle all texture properties
- `disposeTextureCache()` - Clear Three.js texture cache

## Event Flow

### Click to Focus Planet

```
User clicks canvas
    ↓
Raycaster intersects objects
    ↓
Find root planet group
    ↓
focusOnPlanet(object, camera, controls)
    ↓
Show infocard
    ↓
Animate camera to position
    ↓
Start follow mode in animation loop
```

### Touch Controls

```
Touch start → Record initial position
    ↓
Touch move → Truck/dolly based on delta
    ↓
Touch end → Check for tap (vs drag)
    ↓
If tap → Raycast and focus planet
```

## Testing Strategy

### Unit Tests (Vitest)

Located in `tests/`:

- Orbital calculations
- State management
- Utility functions
- Validation helpers

### E2E Tests (Playwright)

Located in `tests-e2e/`:

- App loading verification
- UI element presence
- User interactions

## Dependencies

| Package         | Version  | Purpose         |
| --------------- | -------- | --------------- |
| three           | ^0.182.0 | 3D rendering    |
| camera-controls | ^3.1.2   | Camera movement |
| postprocessing  | ^6.38.2  | Visual effects  |
| vite            | ^7.3.1   | Build tool      |

## Dev Dependencies

| Package          | Purpose      |
| ---------------- | ------------ |
| vitest           | Unit testing |
| @playwright/test | E2E testing  |
| eslint           | Linting      |
| prettier         | Formatting   |
