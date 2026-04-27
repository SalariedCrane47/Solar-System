import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let gltfLoader = null;

const textureLoader = new THREE.TextureLoader();

export function setEllipticalPosition(semiMajorAxis, eccentricity, theta) {
  const a = semiMajorAxis;
  const e = eccentricity;
  const b = a * Math.sqrt(Math.max(0, 1 - e * e));
  const c = a * e;

  return new THREE.Vector3(a * Math.cos(theta) - c, 0, b * Math.sin(theta));
}

export function createOrbitPlaneGroup(inclination, ascendingNode) {
  const group = new THREE.Group();
  group.rotation.order = 'YXZ';
  group.rotation.y = ascendingNode;
  group.rotation.x = inclination;
  return group;
}

export function createOrbitLine(
  semiMajorAxis,
  eccentricity,
  color,
  inclination = 0,
  ascendingNode = 0
) {
  const a = semiMajorAxis;
  const e = eccentricity;
  const b = a * Math.sqrt(Math.max(0, 1 - e * e));
  const c = a * e;
  const dashSize = Math.max(0.1, a * 0.001);
  const segments = 128;
  const vertices = new Float32Array((segments + 1) * 3);

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;
    const x = a * Math.cos(theta) - c;
    const z = b * Math.sin(theta);
    const idx = i * 3;

    vertices[idx] = x;
    vertices[idx + 1] = 0;
    vertices[idx + 2] = z;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  const material = new THREE.LineDashedMaterial({
    color,
    dashSize,
    gapSize: dashSize,
  });

  const line = new THREE.LineLoop(geometry, material);
  line.computeLineDistances();

  const orbitPlane = createOrbitPlaneGroup(inclination, ascendingNode);
  orbitPlane.add(line);
  return orbitPlane;
}

export function createPlanetGroup({
  name,
  color,
  size,
  textureUrl,
  modelUrl,
  material,
  detail = 6,
  tilt = 0,
  inclination = 0,
  ascendingNode = 0,
  semiMajorAxis,
  eccentricity,
  theta = 0,
}) {
  const orbitPlane = createOrbitPlaneGroup(inclination, ascendingNode);
  const planetGroup = new THREE.Group();
  planetGroup.userData = { name, color };

  let planet;
  let geometry;
  let planetMaterial;

  if (modelUrl) {
    if (!gltfLoader) {
      gltfLoader = new GLTFLoader();
    }
    planet = new THREE.Group(); // Placeholder until model loads
    gltfLoader.load(modelUrl, (gltf) => {
      const model = gltf.scene;
      
      const box = new THREE.Box3().setFromObject(model);
      const mSize = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(mSize.x, mSize.y, mSize.z);
      
      const targetDiameter = 2 * size;
      const scaleFactor = targetDiameter / maxDim;
      model.scale.setScalar(scaleFactor);
      
      const scaledBox = new THREE.Box3().setFromObject(model);
      const center = scaledBox.getCenter(new THREE.Vector3());
      model.position.sub(center);

      planet.add(model);
    });
  } else {
    geometry = new THREE.IcosahedronGeometry(size, detail);
    planetMaterial =
      material ||
      new THREE.MeshStandardMaterial({
        map: textureUrl ? textureLoader.load(textureUrl) : null,
      });
    planet = new THREE.Mesh(geometry, planetMaterial);
  }

  planetGroup.add(planet);
  planetGroup.position.copy(setEllipticalPosition(semiMajorAxis, eccentricity, theta));
  planetGroup.rotation.z = tilt;
  orbitPlane.add(planetGroup);

  return {
    orbitPlane,
    planetGroup,
    planet,
    geometry,
    material: planetMaterial,
  };
}

export function createMoonGroup(moonData, material, detail = 4) {
  const moonGroup = new THREE.Group();
  moonGroup.userData = { name: moonData.name };
  moonGroup.position.setFromSpherical(
    new THREE.Spherical(moonData.radius, moonData.phi, moonData.theta)
  );
  moonGroup.rotation.z = moonData.tilt;

  if (moonData.modelUrl) {
    if (!gltfLoader) {
      gltfLoader = new GLTFLoader();
    }
    gltfLoader.load(moonData.modelUrl, (gltf) => {
      const model = gltf.scene;
      
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      const targetDiameter = 2 * moonData.size;
      const scaleFactor = targetDiameter / maxDim;
      model.scale.setScalar(scaleFactor);
      
      const scaledBox = new THREE.Box3().setFromObject(model);
      const center = scaledBox.getCenter(new THREE.Vector3());
      model.position.sub(center);

      moonGroup.add(model);
    });
  } else {
    const moonGeometry = new THREE.IcosahedronGeometry(moonData.size, detail);
    const moonMesh = new THREE.Mesh(moonGeometry, material);
    moonGroup.add(moonMesh);
  }

  return moonGroup;
}
