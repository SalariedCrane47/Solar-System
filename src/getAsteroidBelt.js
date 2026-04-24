import * as THREE from 'three';

export default function createAsteroidBelt({ numAsteroids = 2000, innerRadius, outerRadius, color = 0x888888, sizeMultiplier = 1, thickness = 0.5, emissive = 0x000000, emissiveIntensity = 0 } = {}) {
  const asteroidBelt = new THREE.Group();

  const baseSize = 0.03;
  const baseGeometry = new THREE.IcosahedronGeometry(baseSize, 1);

  const positions = baseGeometry.attributes.position;
  const vertex = new THREE.Vector3();
  for (let j = 0; j < positions.count; j++) {
    vertex.fromBufferAttribute(positions, j);
    vertex.normalize();
    const distortion = baseSize * (0.7 + Math.random() * 0.6);
    vertex.multiplyScalar(distortion);
    positions.setXYZ(j, vertex.x, vertex.y, vertex.z);
  }
  baseGeometry.computeVertexNormals();

  const asteroidMaterial = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9,
    metalness: 0.1,
    emissive,
    emissiveIntensity,
  });

  const instancedMesh = new THREE.InstancedMesh(baseGeometry, asteroidMaterial, numAsteroids);

  const asteroidData = [];

  const dummy = new THREE.Object3D();

  for (let i = 0; i < numAsteroids; i++) {
    const radius = THREE.MathUtils.lerp(innerRadius, outerRadius, Math.random());
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * thickness;
    const size = (0.5 + Math.random() * 1.0) * sizeMultiplier;

    dummy.position.set(radius * Math.cos(theta), y, radius * Math.sin(theta));
    dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    dummy.scale.setScalar(size);
    dummy.updateMatrix();

    instancedMesh.setMatrixAt(i, dummy.matrix);

    asteroidData.push({
      radius,
      theta,
      y,
      size,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      },
    });
  }

  instancedMesh.instanceMatrix.needsUpdate = true;
  asteroidBelt.add(instancedMesh);

  function animateAsteroids(timeScale = 1) {
    const step = 0.0005 * timeScale;

    for (let i = 0; i < numAsteroids; i++) {
      const data = asteroidData[i];
      data.theta += step;

      dummy.position.set(
        data.radius * Math.cos(data.theta),
        data.y,
        data.radius * Math.sin(data.theta)
      );

      dummy.rotation.x += data.rotationSpeed.x * timeScale;
      dummy.rotation.y += data.rotationSpeed.y * timeScale;
      dummy.rotation.z += data.rotationSpeed.z * timeScale;

      dummy.scale.setScalar(data.size);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
  }

  return {
    asteroidBelt,
    animateAsteroids,
  };
}
