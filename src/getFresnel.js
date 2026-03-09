import * as THREE from 'three';

// Ring generation
export function getFresnelMat({
  rimHex = 0x0088ff,
  facingHex = 0x000000
} = {}) {

  return new THREE.ShaderMaterial({

    uniforms: {
      color1: { type: 'c', value: new THREE.Color(rimHex) },
      color2: { type: 'c', value: new THREE.Color(facingHex) },
      fresnelBias:  { type: 'f', value: 0.05 },
      fresnelScale: { type: 'f', value: 1.0 },
      fresnelPower: { type: 'f', value: 3.0 }
    },

    vertexShader: [
    'varying vec3 vNormal;',
    'varying vec3 vPosition;',

    'void main() {',
      'vNormal = normalize( normalMatrix * normal );',

      // view-space position
      'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
      'vPosition = mvPosition.xyz;',

      'gl_Position = projectionMatrix * mvPosition;',
    '}'
    ].join('\n'),

    fragmentShader: [
    'uniform vec3 color1;',        // rim color
    'uniform vec3 color2;',        // facing color
    'uniform float fresnelBias;',
    'uniform float fresnelScale;',
    'uniform float fresnelPower;',

    'varying vec3 vNormal;',
    'varying vec3 vPosition;',

    'void main() {',

    // view direction (old-school)
    'vec3 viewDir = normalize( -vPosition );',

    // Fresnel term
    'float fresnel = fresnelBias + fresnelScale *',
      'pow( 1.0 - dot( viewDir, vNormal ), fresnelPower );',
    'fresnel = clamp( fresnel, 0.0, 1.0 );',

    // Simple fake light (DAT.Globe style)
    'vec3 lightPosition = vec3( -10.0, 10.0, 0.0 );',
    'vec3 lightDir = normalize( lightPosition - vPosition );',
    'float dotNL = clamp( dot( lightDir, vNormal ), 0.0, 1.0 );',

    // Rim-facing color blend
    'vec3 color = mix( color2, color1, fresnel );',

    // Final output
    'gl_FragColor = vec4( color * dotNL, fresnel );',
  '}'
    ].join('\n'),

    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
}


// Starts generation
export function createStarfield({ numStars = 500 } = {}) {

  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );
  }

  const verts = [];
  const colors = [];

  for (let i = 0; i < numStars; i++) {
    const p = randomSpherePoint();
    const c = new THREE.Color().setHSL(0.6, 0.2, Math.random());

    verts.push(p.x, p.y, p.z);
    colors.push(c.r, c.g, c.b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.25,
    vertexColors: true,
    depthWrite: false
  });

  return new THREE.Points(geo, mat);
}
