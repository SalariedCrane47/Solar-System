// Base unit (Mercury's distance from Sun)
const BASE_DISTANCE = 3.0;

export const degToRad = deg => (deg * Math.PI) / 180;

// Orbital inclination: angle of orbit plane relative to the ecliptic (Earth's plane)
// Longitude of ascending node (Ω): angle along ecliptic to where the orbit rises above it
export const orbitalParameters = {
  sun: {
    semiMajorAxis: 0,
  },
  mercury: {
    semiMajorAxis: BASE_DISTANCE * 1,
    eccentricity: 0.205,
    theta: Math.random() * 2 * Math.PI,
    size: 0.3,
    tilt: degToRad(2),
    inclination: degToRad(7.0), // real: 7.0° to ecliptic
    ascendingNode: degToRad(48.3), // real: 48.3°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
  },
  venus: {
    semiMajorAxis: BASE_DISTANCE * 1.868,
    eccentricity: 0.007,
    theta: Math.random() * 2 * Math.PI,
    size: 0.4,
    tilt: degToRad(177.3),
    inclination: degToRad(3.4), // real: 3.4°
    ascendingNode: degToRad(76.7), // real: 76.7°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
  },
  earth: {
    semiMajorAxis: BASE_DISTANCE * 2.584,
    eccentricity: 0.017,
    theta: Math.random() * 2 * Math.PI,
    size: 0.42,
    tilt: degToRad(23.4),
    inclination: degToRad(0.0), // Earth defines the ecliptic plane
    ascendingNode: degToRad(0.0),
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
    moons: [
      {
        name: 'Moon',
        radius: 0.8,
        size: 0.12,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: degToRad(5.1),
      },
    ],
  },
  mars: {
    semiMajorAxis: BASE_DISTANCE * 3.939,
    eccentricity: 0.093,
    theta: Math.random() * 2 * Math.PI,
    size: 0.35,
    tilt: degToRad(25.2),
    inclination: degToRad(1.85), // real: 1.85°
    ascendingNode: degToRad(49.6), // real: 49.6°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
    moons: [
      {
        name: 'Phobos',
        radius: 0.5,
        size: 0.02,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: 0,
        modelUrl: '/3D assets/Mars Moon/24878_Phobos_1_1000.glb',
      },
      {
        name: 'Deimos',
        radius: 0.7,
        size: 0.015,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: 0,
        modelUrl: '/3D assets/Mars Moon/24879_Deimos_1_1000.glb',
      },
    ],
  },
  asteroidBelt: {
    innerRadius: BASE_DISTANCE * 5.45,
    outerRadius: BASE_DISTANCE * 8.6,
  },
  kuiperBelt: {
    innerRadius: BASE_DISTANCE * 80.0,
    outerRadius: BASE_DISTANCE * 145.0,
  },
  jupiter: {
    semiMajorAxis: BASE_DISTANCE * 13.444,
    eccentricity: 0.049,
    theta: Math.random() * 2 * Math.PI,
    size: 1.2,
    tilt: degToRad(3.1),
    inclination: degToRad(1.3), // real: 1.3°
    ascendingNode: degToRad(100.5), // real: 100.5°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
    moons: [
      {
        name: 'Io',
        radius: 1.6,
        size: 0.05,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: 0,
        modelUrl: '/3D assets/Jupiter Moon/Io_1_3643.glb',
      },
      {
        name: 'Europa',
        radius: 1.9,
        size: 0.045,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: 0,
        modelUrl: '/3D assets/Jupiter Moon/Europa_1_3138.glb',
      },
      {
        name: 'Ganymede',
        radius: 2.2,
        size: 0.07,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: 0,
        modelUrl: '/3D assets/Jupiter Moon/Ganymede_1_5268.glb',
      },
      {
        name: 'Callisto',
        radius: 2.6,
        size: 0.065,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: 0,
        modelUrl: '/3D assets/Jupiter Moon/Callisto_1_4821.glb',
      },
    ],
  },
  saturn: {
    semiMajorAxis: BASE_DISTANCE * 24.644,
    eccentricity: 0.057,
    theta: Math.random() * 2 * Math.PI,
    size: 1.0,
    tilt: degToRad(26.7),
    inclination: degToRad(2.49), // real: 2.49°
    ascendingNode: degToRad(113.7), // real: 113.7°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
    moons: [
      {
        name: 'Enceladus',
        radius: 3.2,
        size: 0.025,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: 0,
        modelUrl: '/3D assets/Saturn Moon/Enceladus_1_504.glb',
      },
      {
        name: 'Dione',
        radius: 3.0,
        size: 0.03,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: 0,
        modelUrl: '/3D assets/Saturn Moon/Dione_1_1123.glb',
      },
    ],
  },
  uranus: {
    semiMajorAxis: BASE_DISTANCE * 49.586,
    eccentricity: 0.046,
    theta: Math.random() * 2 * Math.PI,
    size: 0.7,
    tilt: degToRad(97.8),
    inclination: degToRad(0.77), // real: 0.77°
    ascendingNode: degToRad(74.0), // real: 74.0°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
  },
  neptune: {
    semiMajorAxis: BASE_DISTANCE * 77.701,
    eccentricity: 0.01,
    theta: Math.random() * 2 * Math.PI,
    size: 0.6,
    tilt: degToRad(28.3),
    inclination: degToRad(1.77), // real: 1.77°
    ascendingNode: degToRad(131.8), // real: 131.8°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
    // Neptune's placeholder Triton removed
  },
  // Dwarf Planets
  ceres: {
    semiMajorAxis: BASE_DISTANCE * 7.095,
    eccentricity: 0.076,
    theta: Math.random() * 2 * Math.PI,
    size: 0.03,
    tilt: degToRad(11),
    inclination: degToRad(10.6), // real: 10.6°
    ascendingNode: degToRad(80.3), // real: 80.3°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
  },
  pluto: {
    semiMajorAxis: BASE_DISTANCE * 118.5,
    eccentricity: 0.249,
    theta: Math.random() * 2 * Math.PI,
    size: 0.1,
    tilt: degToRad(122.5),
    inclination: degToRad(17.1), // real: 17.1° — very distinct!
    ascendingNode: degToRad(110.3), // real: 110.3°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
    moons: [
      {
        name: 'Charon',
        radius: 0.83,
        size: 0.03,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: 0,
      },
    ],
  },
  makemake: {
    semiMajorAxis: BASE_DISTANCE * 137.1,
    eccentricity: 0.159,
    theta: Math.random() * 2 * Math.PI,
    size: 0.06,
    tilt: degToRad(30),
    inclination: degToRad(28.96), // real: 28.96°
    ascendingNode: degToRad(79.3), // real: 79.3°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
  },
  eris: {
    semiMajorAxis: BASE_DISTANCE * 203.4,
    eccentricity: 0.44,
    theta: Math.random() * 2 * Math.PI,
    size: 0.1,
    tilt: 0,
    inclination: degToRad(44.04), // real: 44.04° — most inclined!
    ascendingNode: degToRad(35.9), // real: 35.9°
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
    moons: [
      {
        name: 'Dysnomia',
        radius: 0.5,
        size: 0.02,
        theta: Math.random() * 2 * Math.PI,
        phi: Math.PI / 2,
        tilt: 0,
      },
    ],
  },
  haumea: {
    semiMajorAxis: BASE_DISTANCE * 129.348, // 43.116 * 3 to match the custom scaling of Pluto/Makemake
    eccentricity: 0.19642,
    theta: Math.random() * 2 * Math.PI,
    size: 0.06, // 1/7 of Earth (0.42)
    tilt: degToRad(28),
    inclination: degToRad(28.2137),
    ascendingNode: degToRad(122.167),
    get radius() {
      return this.semiMajorAxis * (1 - this.eccentricity * Math.cos(this.theta));
    },
  },
};

export const orbitColors = {
  mercury: 0x9c9c9c,
  venus: 0xe6b800,
  earth: 0x4169e1,
  mars: 0xde3232,
  jupiter: 0xffa500,
  saturn: 0xdaa520,
  uranus: 0x40e0d0,
  neptune: 0x0066cc,
  ceres: 0x888888,
  pluto: 0xddaa77,
  makemake: 0xcc8866,
  eris: 0xeeeeee,
  haumea: 0xaaddff,
};

// Spawn Haumea near Makemake as requested (with a slight offset)
orbitalParameters.haumea.theta = orbitalParameters.makemake.theta - 0.15;

