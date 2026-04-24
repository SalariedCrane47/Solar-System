import * as THREE from 'three';

const starVertexShader = `
  uniform float uSize;
  uniform vec2 uVelocity;
  uniform float uSpeed;

  attribute float aPhase;
  varying float vPhase;
  varying vec2 vVelocity;

  void main() {
    vec3 pos = position;
    pos.x += uVelocity.x * 0.5;
    pos.y += uVelocity.y * 0.5;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float dist = length(mvPosition.xyz);
    gl_PointSize = uSize * (1.0 + dist * 0.0001);
    vPhase = aPhase;
    vVelocity = uVelocity;
  }
`;

const starFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uSpeed;

  varying float vPhase;
  varying vec2 vVelocity;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    
    float angle = atan(vVelocity.y, vVelocity.x);
    float speed = length(vVelocity);
    float c = cos(angle);
    float s = sin(angle);
    uv = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
    
    float stretch = 1.0 + speed * 2.0;
    uv.x /= stretch;
    
    float d = length(uv) * 2.0;
    float alpha = 1.0 - smoothstep(0.3, 0.5, d);
    float twinkle = sin(uTime * 3.0 + vPhase) * 0.5 + 0.5;
    alpha *= 0.5 + 0.5 * twinkle;
    alpha *= 0.7 + 0.3 * (1.0 - min(speed * 0.5, 0.8));
    
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

// Nebula shaders - optimized with minimal noise passes
const nebulaVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }
  
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 3; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Slow drift animation
    vec2 drift = vec2(uTime * 0.01, uTime * 0.005);
    vec2 noiseCoord = uv * 3.0 + drift;
    
    float n = fbm(noiseCoord);
    float n2 = fbm(noiseCoord * 2.0 + vec2(100.0));
    
    // Nebula colors
    vec3 purple = vec3(0.16, 0.1, 0.29);   // Deep purple
    vec3 blue = vec3(0.1, 0.16, 0.29);    // Deep blue
    vec3 pink = vec3(0.29, 0.16, 0.23);    // Dusty pink
    vec3 teal = vec3(0.1, 0.2, 0.25);      // Dark teal
    
    // Mix colors based on noise
    vec3 color = mix(purple, blue, n);
    color = mix(color, pink, n2 * 0.5);
    color = mix(color, teal, fbm(noiseCoord * 0.5) * 0.3);
    
    // Fade edges
    vec2 center = uv - 0.5;
    float edgeFade = 1.0 - smoothstep(0.3, 0.5, length(center));
    
    float alpha = pow(n, 1.5) * 0.25 * edgeFade;
    alpha = clamp(alpha, 0.0, 1.0);
    
    if (alpha < 0.005) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function getStarfield({
  numStars = 8000,
  radius = 5000,
  size = 1,
  color = 0xffffff
} = {}) {
  // Nebula sphere - positioned behind stars
  const nebulaGeometry = new THREE.SphereGeometry(radius * 1.2, 32, 32);
  const nebulaMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: nebulaVertexShader,
    fragmentShader: nebulaFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  });
  const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
  nebula.frustumCulled = false;

  // Stars
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(numStars * 3);
  const phases = new Float32Array(numStars);

  for (let i = 0; i < numStars; i++) {
    const r = radius * Math.cbrt(Math.random());
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
      uVelocity: { value: new THREE.Vector2(0, 0) },
      uSpeed: { value: 0 },
      uColor: { value: new THREE.Vector3(c.r, c.g, c.b) }
    },
    vertexShader: starVertexShader,
    fragmentShader: starFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const stars = new THREE.Points(geometry, material);
  stars.frustumCulled = false;

  const prevCamPos = new THREE.Vector3();
  const smoothedVelocity = new THREE.Vector2(0, 0);

  function animateStars(camera) {
    const time = performance.now() * 0.001;
    material.uniforms.uTime.value = time;
    nebulaMaterial.uniforms.uTime.value = time;

    if (camera) {
      const currentPos = camera.position.clone();
      const rawVelocity = new THREE.Vector2(
        currentPos.x - prevCamPos.x,
        currentPos.z - prevCamPos.z
      );

      smoothedVelocity.lerp(rawVelocity, 0.1);

      material.uniforms.uVelocity.value.copy(smoothedVelocity);
      material.uniforms.uSpeed.value = smoothedVelocity.length() * 100;

      prevCamPos.copy(currentPos);
    }
  }

  return { stars, animateStars, nebula };
}
