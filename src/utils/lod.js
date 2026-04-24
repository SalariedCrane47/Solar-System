import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export function createLOD(levels) {
  const lod = new THREE.LOD();

  levels.forEach(({ distance, geometry, material }) => {
    const mesh = new THREE.Mesh(geometry, material);
    lod.addLevel(mesh, distance);
  });

  return lod;
}

export function createLODFromTexture(textureUrl, size, levels = []) {
  const lod = new THREE.LOD();
  const texture = textureLoader.load(textureUrl);

  const baseMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.8,
    metalness: 0.1,
  });

  levels.forEach(({ detail, distance }) => {
    const geometry = new THREE.IcosahedronGeometry(size, detail);
    const mesh = new THREE.Mesh(geometry, baseMaterial);
    lod.addLevel(mesh, distance);
  });

  return lod;
}

const LOD_PRESETS = {
  giant: {
    distances: [0, 80, 200, 500],
    details: [5, 3, 2, 1],
  },
  medium: {
    distances: [0, 50, 120, 300],
    details: [5, 3, 2, 1],
  },
  small: {
    distances: [0, 30, 80, 150],
    details: [4, 2, 1, 0],
  },
  dwarf: {
    distances: [0, 20, 50, 100],
    details: [3, 2, 1, 0],
  },
};

export function createPlanetLOD({ size, textureUrl, preset = 'medium', texture = null }) {
  const lod = new THREE.LOD();
  const config = LOD_PRESETS[preset] || LOD_PRESETS.medium;
  const material = new THREE.MeshStandardMaterial({
    map: texture || (textureUrl ? textureLoader.load(textureUrl) : null),
    roughness: 0.8,
    metalness: 0.1,
  });

  config.distances.forEach((distance, index) => {
    const geometry = new THREE.IcosahedronGeometry(size, config.details[index]);
    const mesh = new THREE.Mesh(geometry, material);
    lod.addLevel(mesh, distance);
  });

  return lod;
}

export function createSimplifiedPlanet(geometry, material, scale = 1) {
  const simplifiedGeometry = new THREE.IcosahedronGeometry(
    geometry.parameters?.radius * scale || 1,
    1
  );
  return new THREE.Mesh(simplifiedGeometry, material);
}

export function updateLOD(lod, camera) {
  if (lod && lod.update) {
    lod.update(camera);
  }
}
