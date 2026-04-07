import * as THREE from 'three';
import { celestialData } from '../src/data/celestialData.js';
export { celestialData };

let cardEl = null;
let scene = null;
let camera = null;
let renderer = null;
let planetMesh = null;
let animationId = null;
let currentView = 'planet'; // 'planet' or 'layers'
let currentPlanetName = null;
let layersMesh = null;

function ensureCard() {
  if (cardEl) return cardEl;
  cardEl = document.createElement('div');
  cardEl.id = 'infocard';
  cardEl.setAttribute('aria-hidden', 'true');
  cardEl.innerHTML = `
    <button type="button" id="infocard-close" aria-label="Tutup infocard">&times;</button>
    <div class="infocard-header">
      <h2 id="infocard-title"></h2>
      <p id="infocard-type" class="infocard-type"></p>
      <p id="infocard-desc" class="infocard-desc"></p>
    </div>
    <div class="infocard-scroll-wrap">
      <div class="infocard-visual-container">
        <canvas id="infocard-canvas"></canvas>
        <!-- Layers toggle disabled for now
        <div class="infocard-view-toggle">
          <button class="toggle-btn active" data-view="planet">Planet</button>
          <button class="toggle-btn" data-view="layers">Layers</button>
        </div>
        -->
      </div>
      <div id="infocard-orbit" class="infocard-section"></div>
      <div id="infocard-atmosphere" class="infocard-section"></div>
      <div id="infocard-layers" class="infocard-section"></div>
    </div>
  `;
  document.body.appendChild(cardEl);

  const closeBtn = cardEl.querySelector('#infocard-close');
  closeBtn.addEventListener('click', hide);

  // Toggle buttons
  const toggleBtns = cardEl.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
    });
  });

  return cardEl;
}

function switchView(view) {
  if (view === currentView) return;

  currentView = view;
  const toggleBtns = cardEl.querySelectorAll('.toggle-btn');

  toggleBtns.forEach(btn => {
    if (btn.getAttribute('data-view') === view) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (view === 'layers') {
    // Hide planet, show layers
    if (planetMesh) planetMesh.visible = false;
    if (!layersMesh && currentPlanetName) {
      layersMesh = createLayersMesh(currentPlanetName);
      if (layersMesh) scene.add(layersMesh);
    } else if (layersMesh) {
      layersMesh.visible = true;
    }
  } else {
    // Show planet, hide layers
    if (planetMesh) planetMesh.visible = true;
    if (layersMesh) layersMesh.visible = false;
  }
}

function createLayersMesh(planetName) {
  const data = celestialData[planetName];
  if (!data || !data.layers || data.layers.length === 0) return null;

  const layersGroup = new THREE.Group();
  const numLayers = data.layers.length;

  // Color palette for layers
  const colors = [
    0xff6b6b, // Core - red
    0xffa500, // Mantle - orange
    0xffff00, // Outer layer - yellow
    0x4ecdc4, // Atmosphere - cyan
    0x95e1d3, // Upper atmosphere - light cyan
    0xc7ecee  // Outermost - very light cyan
  ];

  // Create hemisphere cross-section
  for (let i = 0; i < numLayers; i++) {
    const radius = 1 - (i / numLayers) * 0.9; // From 1.0 (core) to 0.1 (outer)
    const color = colors[numLayers - 1 - i] || 0x888888;

    const geometry = new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI); // Hemisphere
    const material = new THREE.MeshStandardMaterial({
      color: color,
      side: THREE.DoubleSide,
      metalness: 0.2,
      roughness: 0.7,
      transparent: false
    });

    const hemisphere = new THREE.Mesh(geometry, material);
    hemisphere.rotation.y = -Math.PI / 2; // Orient to show cross-section
    layersGroup.add(hemisphere);
  }

  return layersGroup;
}

function setupRenderer() {
  if (renderer) return; // Already set up

  const canvas = cardEl.querySelector('#infocard-canvas');
  const container = cardEl.querySelector('.infocard-visual-container');

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050508);

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight, // Match container aspect
    0.1,
    1000
  );
  camera.position.set(0, 0, 8);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true  // Enable alpha for transparent materials
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.sortObjects = true;  // Ensure transparent objects render correctly


  // Lighting - brighter setup for better planet visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Increased from 0.3
  scene.add(ambientLight);

  const mainLight = new THREE.PointLight(0xffffff, 2.0, 100); // Increased from 1.5
  mainLight.position.set(5, 3, 5);
  scene.add(mainLight);

  const fillLight = new THREE.PointLight(0x88ccff, 1.0, 100); // Increased from 0.5
  fillLight.position.set(-5, -3, -5);
  scene.add(fillLight);

  // Add rim light for better definition
  const rimLight = new THREE.PointLight(0xffffff, 1.5, 100);
  rimLight.position.set(0, 5, -5);
  scene.add(rimLight);
}

function clonePlanetMesh(original) {
  // Collect original materials in traversal order
  const originalMaterials = [];
  original.traverse((child) => {
    if (child.isMesh && child.material) {
      originalMaterials.push(child.material);
    }
  });

  // Clone the entire group
  const cloned = original.clone(true);

  // Restore materials in same traversal order
  let index = 0;
  cloned.traverse((child) => {
    if (child.isMesh && index < originalMaterials.length) {
      const origMat = originalMaterials[index];

      // Handle Earth's custom shader material specifically to adjust its sun position
      if (origMat.isShaderMaterial && origMat.uniforms && origMat.uniforms.sunPosition) {
        child.material = origMat.clone();
        // Clone uniforms object to avoid referencing the main scene's uniforms
        child.material.uniforms = Object.assign({}, origMat.uniforms);
        // Point the sun position to the infocard's main light
        child.material.uniforms.sunPosition = { value: new THREE.Vector3(5, 3, 5) };
      } else {
        child.material = origMat;
      }

      index++;
    }
  });

  return cloned;
}

// Shared helper — dispose a mesh and all its children's geometry/materials
function disposeMesh(mesh) {
  mesh.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => m.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
}

function renderPlanet(originalPlanet) {
  if (!renderer) setupRenderer();

  // Clear previous planet
  if (planetMesh) {
    scene.remove(planetMesh);
    disposeMesh(planetMesh);
  }

  // Clone and add new planet
  planetMesh = clonePlanetMesh(originalPlanet);
  planetMesh.position.set(0, 0, 0);

  scene.add(planetMesh);

  // Adjust camera distance based on planet size
  const box = new THREE.Box3().setFromObject(planetMesh);
  const size = box.getSize(new THREE.Vector3()).length();
  const distance = size * 2.5;
  camera.position.set(0, 0, distance);
  camera.lookAt(0, 0, 0);

  // Start animation
  startAnimation();
}

function startAnimation() {
  if (animationId) cancelAnimationFrame(animationId);

  function animate() {
    if (!renderer || !scene || !camera) return;

    // Rotate planet
    if (planetMesh) {
      planetMesh.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }

  animate();
}

function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function cleanupRenderer() {
  stopAnimation();

  if (planetMesh) {
    scene.remove(planetMesh);
    disposeMesh(planetMesh);
    planetMesh = null;
  }

  if (renderer) {
    renderer.dispose();
    renderer = null;
  }

  scene = null;
  camera = null;
}

function renderOrbit(container, orbit) {
  if (!orbit) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = `
    <h3 class="infocard-section-title">Orbit</h3>
    <div class="metric-grid">
      <div class="metric-card">
        <span class="metric-label">Sumbu semi-mayor</span>
        <span class="metric-value">${orbit.semiMajorAxis}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Periode orbit</span>
        <span class="metric-value">${orbit.period}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Eksentrisitas</span>
        <span class="metric-value">${orbit.eccentricity}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Inklinasi</span>
        <span class="metric-value">${orbit.inclination}</span>
      </div>
    </div>
  `;
}

function renderAtmosphere(container, atmosphere) {
  if (!atmosphere) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = `
    <h3 class="infocard-section-title">Atmosfer</h3>
    <p class="infocard-atmosphere-text">${atmosphere}</p>
  `;
}

function renderLayers(container, layers) {
  if (!layers || !layers.length) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = `
    <h3 class="infocard-section-title">Struktur internal &amp; komposisi</h3>
    <div class="infocard-layers-list">
      ${layers.map((layer, i) => `
        <div class="infocard-layer" data-layer="${i}">
          <h4 class="infocard-layer-name">${layer.name}</h4>
          <p class="infocard-layer-composition">${layer.composition}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Tampilkan infocard untuk benda langit.
 * @param {string} name - Nama benda (mis. 'Earth', 'Sun'). Harus ada di celestialData.
 * @param {THREE.Object3D} planetObject - The planet mesh/group from the main scene
 */
export function show(name, planetObject) {
  const data = celestialData[name];
  if (!data) return;

  const el = ensureCard();
  currentPlanetName = name; // Store for layer generation

  el.querySelector('#infocard-title').textContent = data.name;
  el.querySelector('#infocard-type').textContent = data.type;
  el.querySelector('#infocard-desc').textContent = data.description;

  renderOrbit(el.querySelector('#infocard-orbit'), data.orbit);
  renderAtmosphere(el.querySelector('#infocard-atmosphere'), data.atmosphere);
  renderLayers(el.querySelector('#infocard-layers'), data.layers);

  // Render planet visual
  if (planetObject) {
    renderPlanet(planetObject);
  }

  // Reset to planet view
  currentView = 'planet';

  // Clean up old layers mesh if switching planets (uses disposeMesh helper)
  if (layersMesh) {
    scene.remove(layersMesh);
    disposeMesh(layersMesh);
    layersMesh = null;
  }

  el.setAttribute('aria-hidden', 'false');
  el.classList.add('infocard-visible');

  // Notify main.js to adjust camera
  window.dispatchEvent(new CustomEvent('infocard-toggled', { detail: { visible: true } }));
}

/**
 * Sembunyikan infocard.
 */
export function hide() {
  if (!cardEl) return;
  cardEl.classList.remove('infocard-visible');
  cardEl.setAttribute('aria-hidden', 'true');

  // Cleanup Three.js resources
  cleanupRenderer();

  // Notify main.js to reset camera
  window.dispatchEvent(new CustomEvent('infocard-toggled', { detail: { visible: false } }));
}
