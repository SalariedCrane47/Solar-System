# Solar System Explorer

An interactive 3D visualization of our solar system built with Three.js, featuring accurate orbital mechanics, atmospheric effects, and comprehensive planetary data.

![Three.js](https://img.shields.io/badge/Three.js-r182-000000?style=flat-square&logo=three.js)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

### Core Features

- **8 Major Planets + Dwarf Planets** - Mercury through Neptune, plus Pluto, Ceres, Eris, and Makemake
- **Planetary Moons** - Earth's Moon, Mars moons (Phobos, Deimos), Jupiter moons (Io, Europa, Ganymede, Callisto), Saturn moons (Dione, Enceladus), Pluto's Charon
- **Asteroid Belt** - 2,500 procedurally placed asteroids between Mars and Jupiter
- **Elliptical Orbits** - Accurate orbital mechanics with proper eccentricity and inclination

### Visual Effects

- **Atmospheric Shaders** - Custom GLSL shaders for realistic planet atmospheres (Venus sulfuric haze, Mars dust storms)
- **Fresnel Glow** - Earth's atmospheric glow effect
- **Sun Corona** - Animated corona effect on the Sun
- **Starfield Background** - 10,000 stars with nebula overlay
- **Post-processing** - Bloom and outline effects for enhanced visuals

### Interactive Features

- **Planet Info Cards** - Detailed information panels with orbital data, atmosphere, and internal structure
- **Search Functionality** - Quick navigation to any planet
- **Time Controls** - Play, pause, forward, and reverse time with adjustable speed
- **Time Slider** - Scrub to any date in a 100-year range
- **Distance Calculator** - Calculate distances between any two celestial bodies in AU or kilometers
- **Ring Toggle** - Show/hide planetary rings (Saturn, Uranus)
- **Screenshot Export** - Capture current view as PNG image
- **Mobile Touch Controls** - Joystick-based navigation optimized for touch devices

### Technical Features

- **Priority Texture Loading** - Visible planets load first for faster initial experience
- **Level of Detail (LOD)** - Adaptive mesh simplification based on camera distance
- **Throttled Raycasting** - Optimized hover detection (60fps max)
- **Pre-allocated Vectors** - Zero garbage collection in animation loop
- **InstancedMesh** - Efficient asteroid belt rendering with single draw call

### Project Structure

```
project-kk/
├── src/
│   ├── constants.js       # Magic numbers extracted
│   ├── state.js           # Centralized state management
│   ├── scene.js           # Scene, camera, renderer setup
│   ├── controls.js        # Camera controls
│   ├── animation.js       # Animation loop
│   ├── events.js          # Event handlers
│   ├── textureManager.js  # Texture loading with priorities
│   ├── data/              # Planet configuration data
│   │   ├── celestialData.js    # Planet descriptions
│   │   ├── orbitParam.js       # Orbital parameters
│   │   ├── rotateAndRevolt.js  # Rotation speeds
│   │   └── imageSources.js     # Texture paths
│   ├── i18n/              # Internationalization
│   │   ├── en.json        # English translations
│   │   └── id.json        # Indonesian translations
│   ├── utils/             # Utility functions
│   │   ├── math.js        # Math helpers
│   │   ├── disposal.js    # Memory cleanup
│   │   ├── validation.js  # Input validation
│   │   └── lod.js         # Level of detail
│   └── get*.js            # Three.js mesh generators
├── events/                # UI event handlers
│   ├── infocard.js        # Planet detail panel
│   ├── searchUI.js        # Planet search
│   ├── settingsUI.js      # Settings panel
│   ├── timecontrols.js    # Time speed controls & slider
│   ├── distanceCalculator.js # Distance measurement
│   └── mobileControls.js  # Touch controls
├── tests/                 # Unit tests (Vitest)
├── tests-e2e/             # E2E tests (Playwright)
├── docs/                  # Documentation
└── public/assets/         # Textures and images
```

### Architecture

The codebase follows a modular architecture:

- **State Management**: Single source of truth in `src/state.js`
- **Constants**: All magic numbers extracted to `src/constants.js`
- **Utilities**: Shared functions in `src/utils/`
- **Event Handlers**: UI logic separated into `events/` folder
- **i18n**: Full internationalization support for English and Indonesian

### Performance Optimizations

| Optimization    | Implementation                                   |
| --------------- | ------------------------------------------------ |
| Asteroid Belt   | InstancedMesh with single draw call              |
| Hover Detection | Throttled raycasting (16ms)                      |
| Animation Loop  | Pre-allocated vectors, no GC                     |
| Texture Loading | Priority-based loading                           |
| Distant Objects | LOD system for planet meshes                     |
| Memory          | Proper disposal of geometries/materials/textures |

### Keyboard Shortcuts

| Key      | Action            |
| -------- | ----------------- |
| `Space`  | Pause/Resume time |
| `←/→`    | Adjust time speed |
| `Escape` | Close panels      |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
