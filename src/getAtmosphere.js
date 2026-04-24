import * as THREE from 'three';

export function createAtmosphereShader({
  baseColor = 0xffffff,
  edgeColor = 0x000000,
  opacity = 0.5,
  glowIntensity = 2.0
} = {}) {
  const atmosphereVertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vPosition = mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const atmosphereFragmentShader = `
    uniform vec3 baseColor;
    uniform vec3 edgeColor;
    uniform float opacity;
    uniform float glowIntensity;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vec3 viewDir = normalize(-vPosition);
      float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
      fresnel = pow(fresnel, ${glowIntensity.toFixed(1)});
      
      vec3 color = mix(baseColor, edgeColor, fresnel);
      float alpha = fresnel * opacity;
      
      if (alpha < 0.01) discard;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms: {
      baseColor: { value: new THREE.Color(baseColor) },
      edgeColor: { value: new THREE.Color(edgeColor) },
      opacity: { value: opacity },
      glowIntensity: { value: glowIntensity }
    },
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide
  });
}

export function createCloudShader({
  texture = null,
  rotationSpeed = 1.0,
  opacity = 0.6
} = {}) {
  const cloudVertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const cloudFragmentShader = `
    uniform sampler2D uTexture;
    uniform float uOpacity;
    uniform float uTime;
    uniform float uRotationSpeed;
    
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      float alpha = texture2D(uTexture, uv).r;
      alpha *= uOpacity;
      
      if (alpha < 0.01) discard;
      gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uOpacity: { value: opacity },
      uTime: { value: 0 },
      uRotationSpeed: { value: rotationSpeed }
    },
    vertexShader: cloudVertexShader,
    fragmentShader: cloudFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending
  });
}
