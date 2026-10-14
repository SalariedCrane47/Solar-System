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
