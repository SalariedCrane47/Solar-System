import * as THREE from 'three';
import { imageSources } from './data/imageSources';

const textureLoader = new THREE.TextureLoader();

const sunVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const sunFragmentShader = `
  uniform float uTime;
  uniform sampler2D uTexture;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  vec3 hash33(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453123);
  }
  
  float snoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float n = mix(
      mix(
        mix(dot(hash33(i + vec3(0,0,0)) * 2.0 - 1.0, f - vec3(0,0,0)),
            dot(hash33(i + vec3(1,0,0)) * 2.0 - 1.0, f - vec3(1,0,0)), f.x),
        mix(dot(hash33(i + vec3(0,1,0)) * 2.0 - 1.0, f - vec3(0,1,0)),
            dot(hash33(i + vec3(1,1,0)) * 2.0 - 1.0, f - vec3(1,1,0)), f.x), f.y),
      mix(
        mix(dot(hash33(i + vec3(0,0,1)) * 2.0 - 1.0, f - vec3(0,0,1)),
            dot(hash33(i + vec3(1,0,1)) * 2.0 - 1.0, f - vec3(1,0,1)), f.x),
        mix(dot(hash33(i + vec3(0,1,1)) * 2.0 - 1.0, f - vec3(0,1,1)),
            dot(hash33(i + vec3(1,1,1)) * 2.0 - 1.0, f - vec3(1,1,1)), f.x), f.y),
      f.z);
    return n;
  }
  
  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Animated noise for solar surface activity
    float n = snoise(vec3(vUv * 8.0, uTime * 0.3)) * 0.5 + 0.5;
    n += snoise(vec3(vUv * 16.0, uTime * 0.5)) * 0.25;
    
    // Solar flares - bright spots that pulse
    float flare1 = snoise(vec3(vUv * 3.0 + vec2(uTime * 0.2, 0.0), uTime * 0.15));
    float flare2 = snoise(vec3(vUv * 5.0 + vec2(0.0, uTime * 0.25), uTime * 0.1));
    float flareMask = smoothstep(0.6, 0.9, flare1) + smoothstep(0.65, 0.85, flare2);
    flareMask *= (sin(uTime * 3.0) * 0.3 + 0.7); // Pulse animation
    
    // Fresnel for edge glow effect
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = 1.0 - max(dot(vNormal, viewDir), 0.0);
    fresnel = pow(fresnel, 2.0);
    
    // Brighten active areas, add flares, and add edge glow
    vec3 color = texColor.rgb * (0.9 + n * 0.3);
    color += vec3(1.0, 0.9, 0.5) * flareMask * 0.5; // Add flare brightness
    color += vec3(1.0, 0.8, 0.4) * fresnel * 0.4;
    
    gl_FragColor = vec4(color, texColor.a * 0.95);
  }
`;

const coronaVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const coronaFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vec3 viewDir = normalize(vViewPosition);
    // Since this is rendered on the BackSide, vNormal points away from camera.
    // facingRatio is 1 at the center (behind the sun) and 0 at the sphere edge.
    float facingRatio = max(0.0, -dot(viewDir, vNormal));
    
    // Smooth falloff to accurately mimic spherical volume thickness
    float fresnel = pow(facingRatio, 2.5);
    
    // Dynamic pulsing based on time
    float pulse = sin(uTime * 2.0) * 0.15 + 0.85;
    float wave = sin(uTime * 0.7) * 0.05;
    
    vec3 color = uColor * fresnel * uIntensity * pulse;
    color += uColor * wave * fresnel; // Add subtle wave effect
    
    float alpha = fresnel * uIntensity * pulse;
    
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function getSun() {
  const sunGroup = new THREE.Group();
  sunGroup.userData = { name: 'Sun' };

  const sunGeometry = new THREE.IcosahedronGeometry(1.25, 12);
  const sunMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: textureLoader.load(imageSources.sun.img) }
    },
    vertexShader: sunVertexShader,
    fragmentShader: sunFragmentShader,
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sunGroup.add(sun);

  // Inner corona - warm yellow glow with dynamic pulse
  const innerCoronaGeo = new THREE.SphereGeometry(1.8, 32, 32);
  const innerCoronaMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Vector3(1.0, 0.95, 0.7) },
      uIntensity: { value: 0.9 },
      uTime: { value: 0 }
    },
    vertexShader: coronaVertexShader,
    fragmentShader: coronaFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  });
  const innerCorona = new THREE.Mesh(innerCoronaGeo, innerCoronaMat);
  sunGroup.add(innerCorona);

  // Mid corona - orange glow with color shift
  const midCoronaGeo = new THREE.SphereGeometry(2.2, 32, 32);
  const midCoronaMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Vector3(1.0, 0.6, 0.2) },
      uIntensity: { value: 0.6 },
      uTime: { value: 0 }
    },
    vertexShader: coronaVertexShader,
    fragmentShader: coronaFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  });
  const midCorona = new THREE.Mesh(midCoronaGeo, midCoronaMat);
  sunGroup.add(midCorona);

  // Outer corona - faint red/orange glow
  const outerCoronaGeo = new THREE.SphereGeometry(3.0, 32, 32);
  const outerCoronaMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Vector3(1.0, 0.4, 0.15) },
      uIntensity: { value: 0.35 },
      uTime: { value: 0 }
    },
    vertexShader: coronaVertexShader,
    fragmentShader: coronaFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  });
  const outerCorona = new THREE.Mesh(outerCoronaGeo, outerCoronaMat);
  sunGroup.add(outerCorona);

  sunGroup.position.setFromSpherical(new THREE.Spherical(0, 0, 0));

  function animateSun(time) {
    sunMaterial.uniforms.uTime.value = time;
    innerCoronaMat.uniforms.uTime.value = time;
    midCoronaMat.uniforms.uTime.value = time;
    outerCoronaMat.uniforms.uTime.value = time;
  }

  sunGroup.userData.animate = animateSun;

  return sunGroup;
}

export function animateSunGroup(sunGroup, time, cam) {
  if (sunGroup.userData.animate) {
    sunGroup.userData.animate(time, cam);
  }
}
