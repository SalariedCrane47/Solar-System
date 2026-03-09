import * as THREE from 'three';

const starVertexShader = `
  uniform float uSize;
  uniform float uScale;

  attribute float aPhase;
  varying float vPhase;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * (uScale / -mvPosition.z);
    vPhase = aPhase;
  }
`;

const starFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;

  varying float vPhase;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float alpha = 1.0 - smoothstep(0.4, 0.5, d);
    float twinkle = sin(uTime + vPhase) * 0.5 + 0.5;
    alpha *= 0.4 + 0.6 * twinkle;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export default function getStarfield({
  numStars = 8000,
  radius = 5000,
  size = 1,
  color = 0xffffff
} = {}) {

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(numStars * 3);
  const phases = new Float32Array(numStars);

  for (let i = 0; i < numStars; i++) {
    const r = radius * Math.cbrt(Math.random()); // uniform sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    phases[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

  const c = new THREE.Color(color);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSize: { value: size },
      uTime: { value: 0 },
      uScale: { value: 500 },
      uColor: { value: new THREE.Vector3(c.r, c.g, c.b) }
    },
    vertexShader: starVertexShader,
    fragmentShader: starFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const stars = new THREE.Points(geometry, material);
  stars.frustumCulled = false; // Ensure stars are always rendered

  // Accumulator for continuous time (independent of frame timing)
  let timeAccumulator = 0;

  function animateStars(delta = 0.016) {
    timeAccumulator += delta * 5.0; // Faster animation
    material.uniforms.uTime.value = timeAccumulator;
  }

  return { stars, animateStars };
}
