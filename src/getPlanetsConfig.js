import * as THREE from 'three';
import { imageSources } from './data/imageSources';
import { orbitalParameters, orbitColors } from './data/orbitParam';
import { speed } from './data/rotateAndRevolt';
import { getFresnelMat } from './getFresnel';
import { createAtmosphereShader } from './getAtmosphere';
import {
  createMoonGroup,
  createOrbitLine,
  createOrbitPlaneGroup,
  setEllipticalPosition,
  createPlanetGroup,
} from './planetHelpers.js';

const textureLoader = new THREE.TextureLoader();

const planetGroupsMap = {};

export function planetsConfig() {
  // Mercury
  const {
    orbitPlane: mercuryOrbitPlane,
    planetGroup: mercuryGroup,
    planet: mercury,
  } = createPlanetGroup({
    name: 'Mercury',
    color: orbitColors.mercury,
    size: orbitalParameters.mercury.size,
    textureUrl: imageSources.mercury.img,
    tilt: orbitalParameters.mercury.tilt,
    inclination: orbitalParameters.mercury.inclination,
    ascendingNode: orbitalParameters.mercury.ascendingNode,
    semiMajorAxis: orbitalParameters.mercury.semiMajorAxis,
    eccentricity: orbitalParameters.mercury.eccentricity,
    theta: orbitalParameters.mercury.theta,
  });

  // Venus
  const {
    orbitPlane: venusOrbitPlane,
    planetGroup: venusGroup,
    planet: venus,
    geometry: venusGeometry,
  } = createPlanetGroup({
    name: 'Venus',
    color: orbitColors.venus,
    size: orbitalParameters.venus.size,
    textureUrl: imageSources.venus.img,
    tilt: orbitalParameters.venus.tilt,
    inclination: orbitalParameters.venus.inclination,
    ascendingNode: orbitalParameters.venus.ascendingNode,
    semiMajorAxis: orbitalParameters.venus.semiMajorAxis,
    eccentricity: orbitalParameters.venus.eccentricity,
    theta: orbitalParameters.venus.theta,
  });

  // Venus thick atmosphere - yellow-orange sulfuric haze
  const venusAtmosphereMat = createAtmosphereShader({
    baseColor: 0xd4a574, // Yellowish
    edgeColor: 0x8b4513, // Dark orange
    opacity: 0.5,
    glowIntensity: 2.5,
  });
  const venusAtmosphereMesh = new THREE.Mesh(venusGeometry, venusAtmosphereMat);
  venusAtmosphereMesh.scale.setScalar(1.02);
  venusGroup.add(venusAtmosphereMesh);

  // Venus cloud layer with atmosphere texture
  const venusCloudMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(imageSources.venus.atmosphere),
    transparent: true,
    opacity: 0.4,
    blending: THREE.NormalBlending,
  });
  const venusCloudMesh = new THREE.Mesh(venusGeometry, venusCloudMat);
  venusCloudMesh.scale.setScalar(1.015);
  venusGroup.add(venusCloudMesh);

  // Earth
  const earthGeometry = new THREE.IcosahedronGeometry(orbitalParameters.earth.size, 6);

  const earthMaterial = new THREE.ShaderMaterial({
    uniforms: {
      dayTexture: { value: textureLoader.load(imageSources.earth.img) },
      nightTexture: { value: textureLoader.load(imageSources.earth.night) },
      sunPosition: { value: new THREE.Vector3() }, // update every frame
    },

    vertexShader: `
        precision highp float;

        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vPositionWorld;

        void main() {
        vUv = uv;

        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vPositionWorld = worldPos.xyz;

        vNormalWorld = normalize(mat3(modelMatrix) * normal);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        precision highp float;

        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform vec3 sunPosition;

        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vPositionWorld;

        void main() {
            vec3 lightDir = normalize(sunPosition - vPositionWorld);

            float light = max(dot(vNormalWorld, lightDir), 0.0);

            vec4 dayColor   = texture2D(dayTexture, vUv);
            vec4 nightColor = texture2D(nightTexture, vUv) * 0.25;

            gl_FragColor = mix(nightColor, dayColor, light);
            }
        `,
  });

  const {
    orbitPlane: earthOrbitPlane,
    planetGroup: earthGroup,
    planet: earth,
  } = createPlanetGroup({
    name: 'Earth',
    color: orbitColors.earth,
    size: orbitalParameters.earth.size,
    material: earthMaterial,
    tilt: orbitalParameters.earth.tilt,
    inclination: orbitalParameters.earth.inclination,
    ascendingNode: orbitalParameters.earth.ascendingNode,
    semiMajorAxis: orbitalParameters.earth.semiMajorAxis,
    eccentricity: orbitalParameters.earth.eccentricity,
    theta: orbitalParameters.earth.theta,
  });

  // ---- Clouds ----
  const earthCloudsMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(imageSources.earth.clouds),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.6,
  });
  const earthCloudsMesh = new THREE.Mesh(earthGeometry, earthCloudsMaterial);
  earthCloudsMesh.scale.setScalar(1.005);
  earthGroup.add(earthCloudsMesh);

  // ---- Fresnel glow ----
  const fresnelMat = getFresnelMat();
  const earthGlowMesh = new THREE.Mesh(earthGeometry, fresnelMat);
  earthGlowMesh.scale.setScalar(1.02);
  earthGroup.add(earthGlowMesh);
  // Moon
  const earthMoonData = orbitalParameters.earth.moons[0];
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(imageSources.moon.img),
  });

  const moonOrbit = new THREE.Group();
  moonOrbit.userData = { name: 'Moon' };
  moonOrbit.rotation.x = earthMoonData.tilt;
  const moonGroup = createMoonGroup(earthMoonData, moonMaterial, 6);
  moonOrbit.add(moonGroup);

  // Add moon orbit group to earth group
  earthGroup.add(moonOrbit);

  // Mars
  const {
    orbitPlane: marsOrbitPlane,
    planetGroup: marsGroup,
    planet: mars,
    geometry: marsGeometry,
  } = createPlanetGroup({
    name: 'Mars',
    color: orbitColors.mars,
    size: orbitalParameters.mars.size,
    textureUrl: imageSources.mars.img,
    tilt: orbitalParameters.mars.tilt,
    inclination: orbitalParameters.mars.inclination,
    ascendingNode: orbitalParameters.mars.ascendingNode,
    semiMajorAxis: orbitalParameters.mars.semiMajorAxis,
    eccentricity: orbitalParameters.mars.eccentricity,
    theta: orbitalParameters.mars.theta,
  });

  // Mars thin dusty atmosphere
  const marsAtmosphereMat = createAtmosphereShader({
    baseColor: 0xc4784a, // Dusty orange
    edgeColor: 0x4a2810, // Dark rust
    opacity: 0.15,
    glowIntensity: 3.0,
  });
  const marsAtmosphereMesh = new THREE.Mesh(marsGeometry, marsAtmosphereMat);
  marsAtmosphereMesh.scale.setScalar(1.01);
  marsGroup.add(marsAtmosphereMesh);

  // Mars moons
  const marsMoons = [];
  if (orbitalParameters.mars.moons) {
    const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xaa8866 });
    orbitalParameters.mars.moons.forEach(moonData => {
      const moonGroup = createMoonGroup(moonData, moonMaterial);
      marsGroup.add(moonGroup);
      marsMoons.push({ group: moonGroup, data: moonData });
    });
  }

  // Jupiter
  const {
    orbitPlane: jupiterOrbitPlane,
    planetGroup: jupiterGroup,
    planet: jupiter,
    geometry: jupiterGeometry,
  } = createPlanetGroup({
    name: 'Jupiter',
    color: orbitColors.jupiter,
    size: orbitalParameters.jupiter.size,
    textureUrl: imageSources.jupiter.img,
    tilt: orbitalParameters.jupiter.tilt,
    inclination: orbitalParameters.jupiter.inclination,
    ascendingNode: orbitalParameters.jupiter.ascendingNode,
    semiMajorAxis: orbitalParameters.jupiter.semiMajorAxis,
    eccentricity: orbitalParameters.jupiter.eccentricity,
    theta: orbitalParameters.jupiter.theta,
  });

  // Jupiter atmosphere - subtle orange/brown glow
  const jupiterAtmosphereMat = createAtmosphereShader({
    baseColor: 0xffa500,
    edgeColor: 0x8b4513,
    opacity: 0.15,
    glowIntensity: 2.5,
  });
  const jupiterAtmosphereMesh = new THREE.Mesh(jupiterGeometry, jupiterAtmosphereMat);
  jupiterAtmosphereMesh.scale.setScalar(1.02);
  jupiterGroup.add(jupiterAtmosphereMesh);

  // Jupiter moons
  const jupiterMoons = [];
  if (orbitalParameters.jupiter.moons) {
    const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xccaa88 });
    orbitalParameters.jupiter.moons.forEach(moonData => {
      const moonGroup = createMoonGroup(moonData, moonMaterial);
      jupiterGroup.add(moonGroup);
      jupiterMoons.push({ group: moonGroup, data: moonData });
    });
  }

  // Saturn
  const saturnOrbitPlane = createOrbitPlaneGroup(
    orbitalParameters.saturn.inclination,
    orbitalParameters.saturn.ascendingNode
  );
  const saturnGroup = new THREE.Group();
  saturnGroup.userData = { name: 'Saturn', color: orbitColors.saturn };
  const saturnGeometry = new THREE.IcosahedronGeometry(orbitalParameters.saturn.size, 6);

  const innerRadius = orbitalParameters.saturn.size * 1.4;
  const outerRadius = orbitalParameters.saturn.size * 2.4;

  const saturnMaterial = new THREE.ShaderMaterial({
    uniforms: {
      dayTexture: { value: textureLoader.load(imageSources.saturn.img) },
      sunPosition: { value: new THREE.Vector3() },
      u_ringNormal: { value: new THREE.Vector3(0, 1, 0) },
      u_position: { value: new THREE.Vector3() },
      u_radius1: { value: innerRadius },
      u_radius2: { value: outerRadius },
      u_alphaTexture: { value: textureLoader.load(imageSources.saturn.ring) },
      u_sunRadius: { value: 1.25 },
      u_sunRelPosition: { value: new THREE.Vector3() },
    },

    vertexShader: `
        precision highp float;

        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vPosition;

        void main() {
          vUv = uv;
          vPosition = position;

          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vNormalWorld = normalize(mat3(modelMatrix) * normal);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        precision highp float;

        uniform sampler2D dayTexture;
        uniform vec3 sunPosition;
        uniform vec3 u_ringNormal;
        uniform vec3 u_position;
        uniform float u_radius1;
        uniform float u_radius2;
        uniform sampler2D u_alphaTexture;
        uniform float u_sunRadius;
        uniform vec3 u_sunRelPosition;

        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vPosition;

        #define DIV 7

        #if DIV == 0
          #define INV_DIV 1. // prevent nan
        #else
          #define INV_DIV (1./float(DIV))
        #endif

        float eclipseByRings(vec3 surfacePosition, vec3 sunRadiusPerp) {
          float totalRingAlpha = 0.;
          for (int i = -DIV; i <= DIV; ++i) {
            vec3 sunRay = u_sunRelPosition + INV_DIV * float(i) * sunRadiusPerp;
            float weight = sqrt(1. - pow(float(i)*INV_DIV, 2.));
            float s = -dot(u_ringNormal, surfacePosition - u_position) / dot(u_ringNormal, sunRay);
            if (s > 0.) {
              vec3 point = surfacePosition + sunRay * s;
              float alphaRatio = (sqrt(dot(point - u_position, point - u_position)) - u_radius1) / (u_radius2 - u_radius1);
              if (alphaRatio > 0. && alphaRatio < 1.) {
                float ringAlpha = texture2D( u_alphaTexture, vec2(alphaRatio, 1.0) ).r;
                totalRingAlpha += ringAlpha * weight;
              }
            }
          }
          totalRingAlpha /= (2. * float(DIV) + 1.);
          return totalRingAlpha;
        }

        void main() {
          vec3 sunDir = normalize(u_sunRelPosition);
          vec3 surfacePosition = u_position + vPosition;
          vec3 sunRadiusPerp = u_ringNormal - dot(sunDir, u_ringNormal)/dot(sunDir, sunDir) * sunDir;
          sunRadiusPerp = normalize(sunRadiusPerp) * u_sunRadius / length(u_sunRelPosition);
          float ringAlpha = eclipseByRings(surfacePosition, sunRadiusPerp);
          float hemisphereLight = 1.0;
          vec3 lightDir = normalize(-u_sunRelPosition);
          float light = max(dot(vNormalWorld, lightDir), 0.0);
          light *= (1. - 0.8 * ringAlpha * hemisphereLight);
          vec4 dayColor = texture2D(dayTexture, vUv);
          vec3 color = mix(vec3(0.), dayColor.rgb, light);
          gl_FragColor = vec4(color, 1.0);
        }
    `,
  });

  const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
  saturnGroup.add(saturn);

  // Saturn atmosphere - subtle golden glow
  const saturnAtmosphereMat = createAtmosphereShader({
    baseColor: 0xdaa520,
    edgeColor: 0x8b6914,
    opacity: 0.15,
    glowIntensity: 2.5,
  });
  const saturnAtmosphereMesh = new THREE.Mesh(saturnGeometry, saturnAtmosphereMat);
  saturnAtmosphereMesh.scale.setScalar(1.02);
  saturnGroup.add(saturnAtmosphereMesh);

  // Add Saturn's rings

  const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);

  // Fix UVs based on radius
  const pos = ringGeometry.attributes.position;
  const uv = ringGeometry.attributes.uv;
  const v3 = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i);

    const radius = v3.length();
    const t = (radius - innerRadius) / (outerRadius - innerRadius);

    uv.setXY(i, t, 1);
  }

  uv.needsUpdate = true;

  // Enhanced ring material with slight glow
  const ringMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(imageSources.saturn.ring),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });

  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;
  ring.renderOrder = 1;

  saturnGroup.add(ring);

  saturnGroup.position.copy(
    setEllipticalPosition(
      orbitalParameters.saturn.semiMajorAxis,
      orbitalParameters.saturn.eccentricity,
      orbitalParameters.saturn.theta
    )
  );
  saturnGroup.rotation.z = orbitalParameters.saturn.tilt;
  saturnOrbitPlane.add(saturnGroup);

  // Saturn moons
  const saturnMoons = [];
  if (orbitalParameters.saturn.moons) {
    const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xddddcc });
    orbitalParameters.saturn.moons.forEach(moonData => {
      const moonGroup = createMoonGroup(moonData, moonMaterial);
      saturnGroup.add(moonGroup);
      saturnMoons.push({ group: moonGroup, data: moonData });
    });
  }

  // ---------------- URANUS ----------------
  const uranusOrbitPlane = createOrbitPlaneGroup(
    orbitalParameters.uranus.inclination,
    orbitalParameters.uranus.ascendingNode
  );
  const uranusGroup = new THREE.Group();
  uranusGroup.userData = { name: 'Uranus', color: orbitColors.uranus };

  // Planet
  const uranusGeometry = new THREE.IcosahedronGeometry(orbitalParameters.uranus.size, 6);

  const uranusMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(imageSources.uranus.img),
  });

  const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
  uranusGroup.add(uranus);

  // Uranus atmosphere - subtle cyan glow
  const uranusAtmosphereMat = createAtmosphereShader({
    baseColor: 0x40e0d0,
    edgeColor: 0x20b2aa,
    opacity: 0.2,
    glowIntensity: 3.0,
  });
  const uranusAtmosphereMesh = new THREE.Mesh(uranusGeometry, uranusAtmosphereMat);
  uranusAtmosphereMesh.scale.setScalar(1.02);
  uranusGroup.add(uranusAtmosphereMesh);

  // Position & tilt
  uranusGroup.position.copy(
    setEllipticalPosition(
      orbitalParameters.uranus.semiMajorAxis,
      orbitalParameters.uranus.eccentricity,
      orbitalParameters.uranus.theta
    )
  );

  // Uranus axial tilt (~98°)
  uranusGroup.rotation.z = orbitalParameters.uranus.tilt;
  uranusOrbitPlane.add(uranusGroup);

  // ---------------- URANUS RINGS ----------------
  const innerUranusRadius = orbitalParameters.uranus.size * 1.2;
  const outerUranusRadius = orbitalParameters.uranus.size * 1.4;

  const uranusRingGeometry = new THREE.RingGeometry(innerUranusRadius, outerUranusRadius, 64);

  // ---- FIX UVs (RADIAL MAPPING) ----
  const posi = uranusRingGeometry.attributes.position;
  const uvs = uranusRingGeometry.attributes.uv;
  const v3t = new THREE.Vector3();

  for (let i = 0; i < posi.count; i++) {
    v3t.fromBufferAttribute(posi, i);

    const radius = v3t.length();
    const t = (radius - innerUranusRadius) / (outerUranusRadius - innerUranusRadius);

    uvs.setXY(i, t, 0.5);
  }

  uvs.needsUpdate = true;

  // ---- TEXTURES ----
  const uranusRingColor = textureLoader.load(imageSources.uranus.ringColor);
  const uranusRingAlpha = textureLoader.load(imageSources.uranus.ringTrans);

  // Color space correctness
  uranusRingColor.colorSpace = THREE.SRGBColorSpace;
  uranusRingAlpha.colorSpace = THREE.NoColorSpace;

  // ---- MATERIAL ----
  const uranusRingMaterial = new THREE.MeshBasicMaterial({
    map: uranusRingColor,
    alphaMap: uranusRingAlpha,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  // ---- MESH ----
  const uranusRing = new THREE.Mesh(uranusRingGeometry, uranusRingMaterial);

  // Rings lie in planet equatorial plane
  uranusRing.rotation.x = Math.PI / 2;

  // Ensure correct draw order
  uranusRing.renderOrder = 1;

  uranusGroup.add(uranusRing);

  // Neptune
  const {
    orbitPlane: neptuneOrbitPlane,
    planetGroup: neptuneGroup,
    planet: neptune,
    geometry: neptuneGeometry,
  } = createPlanetGroup({
    name: 'Neptune',
    color: orbitColors.neptune,
    size: orbitalParameters.neptune.size,
    textureUrl: imageSources.neptune.img,
    tilt: orbitalParameters.neptune.tilt,
    inclination: orbitalParameters.neptune.inclination,
    ascendingNode: orbitalParameters.neptune.ascendingNode,
    semiMajorAxis: orbitalParameters.neptune.semiMajorAxis,
    eccentricity: orbitalParameters.neptune.eccentricity,
    theta: orbitalParameters.neptune.theta,
  });

  // Neptune atmosphere - subtle deep blue glow
  const neptuneAtmosphereMat = createAtmosphereShader({
    baseColor: 0x0066cc,
    edgeColor: 0x003366,
    opacity: 0.2,
    glowIntensity: 3.0,
  });
  const neptuneAtmosphereMesh = new THREE.Mesh(neptuneGeometry, neptuneAtmosphereMat);
  neptuneAtmosphereMesh.scale.setScalar(1.02);
  neptuneGroup.add(neptuneAtmosphereMesh);

  // Neptune moons
  const neptuneMoons = [];
  if (orbitalParameters.neptune.moons) {
    const moonMaterial = new THREE.MeshStandardMaterial({ color: 0x6688aa });
    orbitalParameters.neptune.moons.forEach(moonData => {
      const moonGroup = createMoonGroup(moonData, moonMaterial);
      neptuneGroup.add(moonGroup);
      neptuneMoons.push({ group: moonGroup, data: moonData });
    });
  }

  // ========== DWARF PLANETS ==========

  // Ceres (in asteroid belt)
  const ceresOrbitPlane = createOrbitPlaneGroup(
    orbitalParameters.ceres.inclination,
    orbitalParameters.ceres.ascendingNode
  );
  const ceresGroup = new THREE.Group();
  ceresGroup.userData = { name: 'Ceres', color: orbitColors.ceres };
  const ceresGeometry = new THREE.IcosahedronGeometry(orbitalParameters.ceres.size, 8);
  const ceresMaterial = new THREE.MeshStandardMaterial({
    map: imageSources.ceres?.img ? textureLoader.load(imageSources.ceres.img) : null,
    color: imageSources.ceres?.img ? 0xffffff : 0x888888,
  });
  const ceres = new THREE.Mesh(ceresGeometry, ceresMaterial);
  ceresGroup.add(ceres);
  ceresGroup.position.copy(
    setEllipticalPosition(
      orbitalParameters.ceres.semiMajorAxis,
      orbitalParameters.ceres.eccentricity,
      orbitalParameters.ceres.theta
    )
  );
  ceresGroup.rotation.z = orbitalParameters.ceres.tilt;
  ceresOrbitPlane.add(ceresGroup);

  // Pluto with Charon (binary system)
  const plutoOrbitPlane = createOrbitPlaneGroup(
    orbitalParameters.pluto.inclination,
    orbitalParameters.pluto.ascendingNode
  );
  const plutoSystemGroup = new THREE.Group();
  plutoSystemGroup.userData = { name: 'Pluto', color: orbitColors.pluto };

  const plutoGroup = new THREE.Group();
  plutoGroup.userData = { name: 'Pluto', color: orbitColors.pluto };
  const plutoGeometry = new THREE.IcosahedronGeometry(orbitalParameters.pluto.size, 8);
  const plutoMaterial = new THREE.MeshStandardMaterial({
    map: imageSources.pluto?.img ? textureLoader.load(imageSources.pluto.img) : null,
    color: imageSources.pluto?.img ? 0xffffff : 0xddaa77,
  });
  const pluto = new THREE.Mesh(plutoGeometry, plutoMaterial);
  plutoGroup.add(pluto);
  plutoSystemGroup.add(plutoGroup);

  // Charon (Pluto's moon - binary system)
  const plutoMoonData = orbitalParameters.pluto.moons[0];
  const charonMaterial = new THREE.MeshStandardMaterial({
    map: imageSources.charon?.img ? textureLoader.load(imageSources.charon.img) : null,
    color: imageSources.charon?.img ? 0xffffff : 0xaaaaaa,
  });
  const charonGroup = createMoonGroup(plutoMoonData, charonMaterial, 6);
  charonGroup.userData.color = 0xaaaaaa;
  plutoSystemGroup.add(charonGroup);

  plutoSystemGroup.position.copy(
    setEllipticalPosition(
      orbitalParameters.pluto.semiMajorAxis,
      orbitalParameters.pluto.eccentricity,
      orbitalParameters.pluto.theta
    )
  );
  plutoSystemGroup.rotation.z = orbitalParameters.pluto.tilt;
  plutoOrbitPlane.add(plutoSystemGroup);

  // Makemake
  const makemakeOrbitPlane = createOrbitPlaneGroup(
    orbitalParameters.makemake.inclination,
    orbitalParameters.makemake.ascendingNode
  );
  const makemakeGroup = new THREE.Group();
  makemakeGroup.userData = { name: 'Makemake', color: orbitColors.makemake };
  const makemakeGeometry = new THREE.IcosahedronGeometry(orbitalParameters.makemake.size, 8);
  const makemakeMaterial = new THREE.MeshStandardMaterial({
    map: imageSources.makemake?.img ? textureLoader.load(imageSources.makemake.img) : null,
    color: imageSources.makemake?.img ? 0xffffff : 0xcc8866,
  });
  const makemake = new THREE.Mesh(makemakeGeometry, makemakeMaterial);
  makemakeGroup.add(makemake);
  makemakeGroup.position.copy(
    setEllipticalPosition(
      orbitalParameters.makemake.semiMajorAxis,
      orbitalParameters.makemake.eccentricity,
      orbitalParameters.makemake.theta
    )
  );
  makemakeGroup.rotation.z = orbitalParameters.makemake.tilt;
  makemakeOrbitPlane.add(makemakeGroup);

  // Eris with Dysnomia
  const erisOrbitPlane = createOrbitPlaneGroup(
    orbitalParameters.eris.inclination,
    orbitalParameters.eris.ascendingNode
  );
  const erisSystemGroup = new THREE.Group();
  erisSystemGroup.userData = { name: 'Eris', color: orbitColors.eris };

  const erisGroup = new THREE.Group();
  erisGroup.userData = { name: 'Eris', color: orbitColors.eris };
  const erisGeometry = new THREE.IcosahedronGeometry(orbitalParameters.eris.size, 8);
  const erisMaterial = new THREE.MeshStandardMaterial({
    map: imageSources.eris?.img ? textureLoader.load(imageSources.eris.img) : null,
    color: imageSources.eris?.img ? 0xffffff : 0xeeeeee,
  });
  const eris = new THREE.Mesh(erisGeometry, erisMaterial);
  erisGroup.add(eris);

  // Dysnomia (Eris's moon)
  const erisMoonData = orbitalParameters.eris.moons[0];
  const dysnomiaMaterial = new THREE.MeshStandardMaterial({
    map: imageSources.dysnomia?.img ? textureLoader.load(imageSources.dysnomia.img) : null,
    color: imageSources.dysnomia?.img ? 0xffffff : 0xcccccc,
  });
  const dysnomiaGroup = createMoonGroup(erisMoonData, dysnomiaMaterial);
  dysnomiaGroup.userData.color = 0xcccccc;
  erisGroup.add(dysnomiaGroup);

  erisSystemGroup.add(erisGroup);

  erisSystemGroup.position.copy(
    setEllipticalPosition(
      orbitalParameters.eris.semiMajorAxis,
      orbitalParameters.eris.eccentricity,
      orbitalParameters.eris.theta
    )
  );
  erisOrbitPlane.add(erisSystemGroup);

  // Orbit lines (each wrapped in an inclined orbit-plane group)
  const mercuryOrbit = createOrbitLine(
    orbitalParameters.mercury.semiMajorAxis,
    orbitalParameters.mercury.eccentricity,
    orbitColors.mercury,
    orbitalParameters.mercury.inclination,
    orbitalParameters.mercury.ascendingNode
  );
  const venusOrbit = createOrbitLine(
    orbitalParameters.venus.semiMajorAxis,
    orbitalParameters.venus.eccentricity,
    orbitColors.venus,
    orbitalParameters.venus.inclination,
    orbitalParameters.venus.ascendingNode
  );
  const earthOrbit = createOrbitLine(
    orbitalParameters.earth.semiMajorAxis,
    orbitalParameters.earth.eccentricity,
    orbitColors.earth,
    orbitalParameters.earth.inclination,
    orbitalParameters.earth.ascendingNode
  );
  const marsOrbit = createOrbitLine(
    orbitalParameters.mars.semiMajorAxis,
    orbitalParameters.mars.eccentricity,
    orbitColors.mars,
    orbitalParameters.mars.inclination,
    orbitalParameters.mars.ascendingNode
  );
  const jupiterOrbit = createOrbitLine(
    orbitalParameters.jupiter.semiMajorAxis,
    orbitalParameters.jupiter.eccentricity,
    orbitColors.jupiter,
    orbitalParameters.jupiter.inclination,
    orbitalParameters.jupiter.ascendingNode
  );
  const saturnOrbit = createOrbitLine(
    orbitalParameters.saturn.semiMajorAxis,
    orbitalParameters.saturn.eccentricity,
    orbitColors.saturn,
    orbitalParameters.saturn.inclination,
    orbitalParameters.saturn.ascendingNode
  );
  const uranusOrbit = createOrbitLine(
    orbitalParameters.uranus.semiMajorAxis,
    orbitalParameters.uranus.eccentricity,
    orbitColors.uranus,
    orbitalParameters.uranus.inclination,
    orbitalParameters.uranus.ascendingNode
  );
  const neptuneOrbit = createOrbitLine(
    orbitalParameters.neptune.semiMajorAxis,
    orbitalParameters.neptune.eccentricity,
    orbitColors.neptune,
    orbitalParameters.neptune.inclination,
    orbitalParameters.neptune.ascendingNode
  );
  const ceresOrbit = createOrbitLine(
    orbitalParameters.ceres.semiMajorAxis,
    orbitalParameters.ceres.eccentricity,
    orbitColors.ceres,
    orbitalParameters.ceres.inclination,
    orbitalParameters.ceres.ascendingNode
  );
  const plutoOrbit = createOrbitLine(
    orbitalParameters.pluto.semiMajorAxis,
    orbitalParameters.pluto.eccentricity,
    orbitColors.pluto,
    orbitalParameters.pluto.inclination,
    orbitalParameters.pluto.ascendingNode
  );
  const makemakeOrbit = createOrbitLine(
    orbitalParameters.makemake.semiMajorAxis,
    orbitalParameters.makemake.eccentricity,
    orbitColors.makemake,
    orbitalParameters.makemake.inclination,
    orbitalParameters.makemake.ascendingNode
  );
  const erisOrbit = createOrbitLine(
    orbitalParameters.eris.semiMajorAxis,
    orbitalParameters.eris.eccentricity,
    orbitColors.eris,
    orbitalParameters.eris.inclination,
    orbitalParameters.eris.ascendingNode
  );

  const rotationBaseSpeed = 0.002;
  const revolutionBaseSpeed = 0.02;

  // Pre-allocated to avoid per-frame heap allocations
  const _sphericalCache = [];
  const _getSpherical = () => {
    const s = _sphericalCache.pop();
    if (s) return s;
    return new THREE.Spherical();
  };
  const _releaseSpherical = s => {
    if (_sphericalCache.length < 20) _sphericalCache.push(s);
  };

  function animatePlanets(timeScale = 1) {
    const r = rotationBaseSpeed * timeScale;
    const v = revolutionBaseSpeed * timeScale;

    // Mercury
    mercury.rotation.y += speed.rotationSpeeds.mercury * r;
    orbitalParameters.mercury.theta += speed.revolutionSpeeds.mercury * v;
    mercuryGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.mercury.semiMajorAxis,
        orbitalParameters.mercury.eccentricity,
        orbitalParameters.mercury.theta
      )
    );

    // Venus
    venus.rotation.y += speed.rotationSpeeds.venus * r;
    venusAtmosphereMesh.rotation.y += speed.rotationSpeeds.venus * r * 1.2;
    venusCloudMesh.rotation.y += speed.rotationSpeeds.venus * r * 1.3;
    orbitalParameters.venus.theta += speed.revolutionSpeeds.venus * v;
    venusGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.venus.semiMajorAxis,
        orbitalParameters.venus.eccentricity,
        orbitalParameters.venus.theta
      )
    );

    // Earth
    const earthRotationSpeed = speed.rotationSpeeds.earth * r;
    const cloudsSpeedMultiplier = 1.5;

    earth.rotation.y += earthRotationSpeed;
    earthCloudsMesh.rotation.y += cloudsSpeedMultiplier * earthRotationSpeed;
    earthGlowMesh.rotation.y += earthRotationSpeed;

    orbitalParameters.earth.theta += speed.revolutionSpeeds.earth * v;
    earthGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.earth.semiMajorAxis,
        orbitalParameters.earth.eccentricity,
        orbitalParameters.earth.theta
      )
    );

    // Moon rotation and revolution
    moonGroup.rotation.y += 0.5 * r;
    earthMoonData.theta += 0.5 * v;
    moonGroup.position.set(
      earthMoonData.radius * Math.cos(earthMoonData.theta),
      0,
      earthMoonData.radius * Math.sin(earthMoonData.theta)
    );

    // Mars
    mars.rotation.y += speed.rotationSpeeds.mars * r;
    orbitalParameters.mars.theta += speed.revolutionSpeeds.mars * v;
    marsGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.mars.semiMajorAxis,
        orbitalParameters.mars.eccentricity,
        orbitalParameters.mars.theta
      )
    );

    // Mars moons animation
    marsMoons.forEach(moon => {
      moon.data.theta += 0.8 * v;
      const s = _getSpherical().set(moon.data.radius, moon.data.phi, moon.data.theta);
      moon.group.position.setFromSpherical(s);
      _releaseSpherical(s);
    });

    // Jupiter
    jupiter.rotation.y += speed.rotationSpeeds.jupiter * r;
    jupiterAtmosphereMesh.rotation.y += speed.rotationSpeeds.jupiter * r * 0.8;
    orbitalParameters.jupiter.theta += speed.revolutionSpeeds.jupiter * v;
    jupiterGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.jupiter.semiMajorAxis,
        orbitalParameters.jupiter.eccentricity,
        orbitalParameters.jupiter.theta
      )
    );

    // Jupiter moons animation
    jupiterMoons.forEach(moon => {
      moon.data.theta += 0.6 * v;
      const s = _getSpherical().set(moon.data.radius, moon.data.phi, moon.data.theta);
      moon.group.position.setFromSpherical(s);
      _releaseSpherical(s);
    });

    // Saturn
    saturn.rotation.y += speed.rotationSpeeds.saturn * r;
    saturnAtmosphereMesh.rotation.y += speed.rotationSpeeds.saturn * r * 0.8;
    orbitalParameters.saturn.theta += speed.revolutionSpeeds.saturn * v;
    saturnGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.saturn.semiMajorAxis,
        orbitalParameters.saturn.eccentricity,
        orbitalParameters.saturn.theta
      )
    );

    // Saturn moons animation
    saturnMoons.forEach(moon => {
      moon.data.theta += 0.5 * v;
      const s = _getSpherical().set(moon.data.radius, moon.data.phi, moon.data.theta);
      moon.group.position.setFromSpherical(s);
      _releaseSpherical(s);
    });

    // Uranus
    uranus.rotation.y += speed.rotationSpeeds.uranus * r;
    uranusAtmosphereMesh.rotation.y += speed.rotationSpeeds.uranus * r * 0.8;
    orbitalParameters.uranus.theta += speed.revolutionSpeeds.uranus * v;
    uranusGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.uranus.semiMajorAxis,
        orbitalParameters.uranus.eccentricity,
        orbitalParameters.uranus.theta
      )
    );

    // Neptune
    neptune.rotation.y += speed.rotationSpeeds.neptune * r;
    neptuneAtmosphereMesh.rotation.y += speed.rotationSpeeds.neptune * r * 0.8;
    orbitalParameters.neptune.theta += speed.revolutionSpeeds.neptune * v;
    neptuneGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.neptune.semiMajorAxis,
        orbitalParameters.neptune.eccentricity,
        orbitalParameters.neptune.theta
      )
    );

    // Neptune moons animation
    neptuneMoons.forEach(moon => {
      moon.data.theta += 0.4 * v;
      const s = _getSpherical().set(moon.data.radius, moon.data.phi, moon.data.theta);
      moon.group.position.setFromSpherical(s);
      _releaseSpherical(s);
    });

    // Dwarf Planets Animation

    // Ceres
    ceres.rotation.y += speed.rotationSpeeds.ceres * r;
    orbitalParameters.ceres.theta += speed.revolutionSpeeds.ceres * v;
    ceresGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.ceres.semiMajorAxis,
        orbitalParameters.ceres.eccentricity,
        orbitalParameters.ceres.theta
      )
    );

    // Pluto (binary with Charon)
    pluto.rotation.y += speed.rotationSpeeds.pluto * r;
    orbitalParameters.pluto.theta += speed.revolutionSpeeds.pluto * v;
    plutoSystemGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.pluto.semiMajorAxis,
        orbitalParameters.pluto.eccentricity,
        orbitalParameters.pluto.theta
      )
    );

    // Charon orbits Pluto
    orbitalParameters.pluto.moons[0].theta += 0.3 * v;
    const charonSpherical = _getSpherical().set(
      orbitalParameters.pluto.moons[0].radius,
      orbitalParameters.pluto.moons[0].phi,
      orbitalParameters.pluto.moons[0].theta
    );
    charonGroup.position.setFromSpherical(charonSpherical);
    _releaseSpherical(charonSpherical);

    // Makemake
    makemake.rotation.y += speed.rotationSpeeds.makemake * r;
    orbitalParameters.makemake.theta += speed.revolutionSpeeds.makemake * v;
    makemakeGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.makemake.semiMajorAxis,
        orbitalParameters.makemake.eccentricity,
        orbitalParameters.makemake.theta
      )
    );

    // Eris (binary with Dysnomia)
    eris.rotation.y += speed.rotationSpeeds.eris * r;
    orbitalParameters.eris.theta += speed.revolutionSpeeds.eris * v;
    erisSystemGroup.position.copy(
      setEllipticalPosition(
        orbitalParameters.eris.semiMajorAxis,
        orbitalParameters.eris.eccentricity,
        orbitalParameters.eris.theta
      )
    );

    // Dysnomia orbits Eris
    orbitalParameters.eris.moons[0].theta += 0.2 * v;
    const dysnomiaSpherical = _getSpherical().set(
      orbitalParameters.eris.moons[0].radius,
      orbitalParameters.eris.moons[0].phi,
      orbitalParameters.eris.moons[0].theta
    );
    dysnomiaGroup.position.setFromSpherical(dysnomiaSpherical);
    _releaseSpherical(dysnomiaSpherical);
  }

  // Return all the planets group and moon (for click / infocard)
  // planetGroupsMap stores the actual planet groups (for raycasting / infocard)
  planetGroupsMap.mercury = mercuryGroup;
  planetGroupsMap.venus = venusGroup;
  planetGroupsMap.earth = earthGroup;
  planetGroupsMap.mars = marsGroup;
  planetGroupsMap.jupiter = jupiterGroup;
  planetGroupsMap.saturn = saturnGroup;
  planetGroupsMap.uranus = uranusGroup;
  planetGroupsMap.neptune = neptuneGroup;
  planetGroupsMap.ceres = ceresGroup;
  planetGroupsMap.pluto = plutoSystemGroup;
  planetGroupsMap.makemake = makemakeGroup;
  planetGroupsMap.eris = erisSystemGroup;

  return {
    // Return the orbit-plane groups (top-level scene objects) instead of bare planet groups
    orbitPlanes: [
      mercuryOrbitPlane,
      venusOrbitPlane,
      earthOrbitPlane,
      marsOrbitPlane,
      jupiterOrbitPlane,
      saturnOrbitPlane,
      uranusOrbitPlane,
      neptuneOrbitPlane,
      ceresOrbitPlane,
      plutoOrbitPlane,
      makemakeOrbitPlane,
      erisOrbitPlane,
    ],
    planets: [
      mercuryGroup,
      venusGroup,
      earthGroup,
      marsGroup,
      jupiterGroup,
      saturnGroup,
      uranusGroup,
      neptuneGroup,
      ceresGroup,
      plutoSystemGroup,
      makemakeGroup,
      erisSystemGroup,
    ],
    orbits: [
      mercuryOrbit,
      venusOrbit,
      earthOrbit,
      marsOrbit,
      jupiterOrbit,
      saturnOrbit,
      uranusOrbit,
      neptuneOrbit,
      ceresOrbit,
      plutoOrbit,
      makemakeOrbit,
      erisOrbit,
    ],
    animatePlanets,
    moons: [
      moonOrbit,
      ...marsMoons.map(m => m.group),
      ...jupiterMoons.map(m => m.group),
      ...saturnMoons.map(m => m.group),
      ...neptuneMoons.map(m => m.group),
      charonGroup,
      dysnomiaGroup,
    ],
    earthMaterial,
    saturnMaterial,
  };
}

export function getPlanetGroups() {
  return planetGroupsMap;
}
