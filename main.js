import * as THREE from 'three';
import CameraControls from 'camera-controls';
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  OutlineEffect,
} from 'postprocessing';
import getStarfield from '/src/getStars.js';
import { getSun } from '/src/getSun.js';
import { planetsConfig } from '/src/getPlanetsConfig.js';
import createAsteroidBelt from '/src/getAsteroidBelt.js';
import { createPlanetLabels } from '/src/getPlanetLabels.js';
import { orbitalParameters } from './src/data/orbitParam';
import * as infocard from './events/infocard.js';
import * as timecontrols from './events/timecontrols.js';
import * as settingsUI from './events/settingsUI.js';
import * as searchUI from './events/searchUI.js';


/* Scene / Camera / Renderer*/


const scene = new THREE.Scene();
let timeScale = 1.0;
timecontrols.init((scale) => { timeScale = scale; });
settingsUI.init();

CameraControls.install({ THREE });

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1e9
);
camera.position.set(0, 10, 45);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;
document.body.appendChild(renderer.domElement);

/* Post-processing: Bloom + Outline */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomEffect = new BloomEffect({
  luminanceThreshold: 0.4,
  luminanceSmoothing: 0.6,
  intensity: 1.2,
  radius: 0.85,
  mipmapBlur: true,
});

const outlineEffect = new OutlineEffect(scene, camera, {
  edgeStrength: 1.8,
  visibleEdgeColor: 0x88ccff,
  hiddenEdgeColor: 0x223344,
  blur: true,
  xRay: true,
});

composer.addPass(new EffectPass(camera, bloomEffect, outlineEffect));

/* Controls */

const controls = new CameraControls(camera, renderer.domElement);

controls.dollySpeed = 0.5;
controls.truckSpeed = 2.0;
controls.azimuthRotateSpeed = 0.5;
controls.polarRotateSpeed = 0.5;
controls.maxDistance = 200;

// Game State
const gameState = {
  started: false
};

// Initial state: Close to Sun, rotating
controls.setLookAt(0, 2, 4, 0, 0, 0, false);
controls.enabled = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

controls.update(0);

// UI References
const startMenu = document.getElementById('start-menu');
const playButton = document.getElementById('play-button');

// Helper: Toggle Game UI
function setGameUIVisible(visible) {
  const labelsContainer = document.getElementById('planet-labels-container');
  const timeControls = document.querySelector('.timecontrols-panel');
  const settingsBtn = document.getElementById('settings-btn');
  const searchContainer = document.getElementById('search-container');
  const infocardEl = document.getElementById('infocard'); // Lazy lookup — element is created on first show()
  const uiElements = [labelsContainer, timeControls, infocardEl, settingsBtn, searchContainer];

  uiElements.forEach(el => {
    if (!el) return;
    if (visible) {
      el.classList.remove('game-ui-hidden');
      el.classList.add('game-ui-visible');
    } else {
      el.classList.add('game-ui-hidden');
      el.classList.remove('game-ui-visible');
    }
  });
}

// Initialize UI as hidden
// We need to wait for elements to exist (labels are created dynamically)
// But we can just set the class on creation or loop here if they exist.
// Since labels are created below, we will call this function AFTER creation.

// Play Button Logic
playButton.addEventListener('click', (e) => {
  e.stopPropagation();

  gameState.started = true;

  // Hide menu
  startMenu.classList.add('hidden');

  // Show Game UI
  setGameUIVisible(true);

  // Stop rotation
  controls.autoRotate = false;

  // Enable controls
  controls.enabled = true;

  // Smoothly zoom out to overview
  controls.setLookAt(
    0, 20, 60, // Position
    0, 0, 0,   // Target
    true       // Transition
  );
});

/* Starfield*/

const { stars: starfield, animateStars } = getStarfield({
  numStars: 10000,
  radius: 6000
});
scene.add(starfield);

/* Lighting*/

scene.add(new THREE.AmbientLight(0xffffff, 0.15));

const sun = getSun({ size: 20, useGlow: true });
scene.add(sun);

const sunlight = new THREE.PointLight(0xffffff, 10, 1000, 0.6);
sunlight.position.set(0, 0, 0);
sunlight.castShadow = true;
scene.add(sunlight);

/* Planets*/

const { planets, orbits, animatePlanets, moons = [] } = planetsConfig();
planets.forEach(p => scene.add(p));
orbits.forEach(o => scene.add(o));

/* Asteroid Belt*/

const { asteroidBelt, animateAsteroids } = createAsteroidBelt({
  innerRadius: orbitalParameters.asteroidBelt.innerRadius,
  outerRadius: orbitalParameters.asteroidBelt.outerRadius,
  numAsteroids: 2500
});
scene.add(asteroidBelt);

/* Planet Labels*/

/* helper: find planet root */
function getRootObject(obj) {
  while (obj.parent && !clickableObjects.includes(obj)) {
    obj = obj.parent;
  }
  return obj;
}

/* Helper: Focus on a specific planet/object */
function focusOnPlanet(object) {
  if (!object) return;

  focusObject = object;
  focusObject.getWorldPosition(targetPos);

  const name = focusObject.userData?.name;
  if (name) infocard.show(name, focusObject);

  // Zoom in logic:
  const offsetDistance = 5;
  const viewDir = camera.position.clone().sub(targetPos).normalize();
  if (viewDir.lengthSq() < 0.0001) viewDir.set(0, 0, 1);
  const newCamPos = targetPos.clone().add(viewDir.multiplyScalar(offsetDistance));

  isTransitioning = true;
  controls.setLookAt(
    newCamPos.x,
    newCamPos.y,
    newCamPos.z,
    targetPos.x,
    targetPos.y,
    targetPos.z,
    true
  ).then(() => {
    isTransitioning = false;
  });
}

// Pass the focus function to the labels creator
const { updateLabels, dispose: disposeLabels } = createPlanetLabels(planets, camera, () => focusObject, focusOnPlanet);

// Ensure UI is hidden initially
setGameUIVisible(false);

/* Raycasting / Interaction*/

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const clickableObjects = [...planets, ...moons, sun];

searchUI.init(clickableObjects, focusOnPlanet);

let focusObject = null;
let isTransitioning = false;
const targetPos = new THREE.Vector3();

// Pre-allocated vectors to avoid per-frame heap allocations in the focus-follow block
const _oldTargetPos = new THREE.Vector3();
const _currentCamPos = new THREE.Vector3();
const _moveDelta = new THREE.Vector3();

/* mouse move for hover outline */
let hoveredObject = null;
window.addEventListener('mousemove', e => {
  if (!gameState.started) return;

  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(clickableObjects, true);
  const next = hits.length ? getRootObject(hits[0].object) : null;
  if (next !== hoveredObject) {
    hoveredObject = next;
    outlineEffect.setSelection(hoveredObject ? [hoveredObject] : []);
  }
});

/* click to focus */
window.addEventListener('click', () => {
  if (!gameState.started) return;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(clickableObjects, true);
  if (!hits.length) return;

  const objectToFocus = getRootObject(hits[0].object);
  focusOnPlanet(objectToFocus);
});

/* cancel follow when user moves camera */
controls.addEventListener('controlstart', () => {
  focusObject = null;
  isTransitioning = false;
});

/* Resize*/

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);

  // Update offset if infocard is open (query lazily — element is created on first show)
  const infocardEl = document.getElementById('infocard');
  if (infocardEl && infocardEl.classList.contains('infocard-visible')) {
    updateCameraOffset(true);
  }
});

/* Camera Offset Logic (Infocard) */
function updateCameraOffset(active) {
  if (active) {
    // Shift center to the right (3/4 of screen)
    // Offset x = -width * 0.25 (negative moves the "window" left, so content moves right)
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.setViewOffset(width, height, -width * 0.25, 0, width, height);
  } else {
    camera.clearViewOffset();
  }
}

window.addEventListener('infocard-toggled', (e) => {
  updateCameraOffset(e.detail.visible);

  // Also, when infocard opens, we might want to ensure the target is still valid or adjust controls?
  // CameraControls should respect the projection offset automatically.
});

/* Animation Loop */
const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();

  animateStars(delta);
  animatePlanets(timeScale);
  if (animateAsteroids) animateAsteroids(timeScale);

  // Update planet labels
  updateLabels();

  if (focusObject && !isTransitioning) {
    controls.getTarget(_oldTargetPos);
    focusObject.getWorldPosition(targetPos);

    // Calculate movement delta (reuse pre-allocated vector)
    _moveDelta.copy(targetPos).sub(_oldTargetPos);

    // Move controls pivot
    controls.setTarget(targetPos.x, targetPos.y, targetPos.z, false);

    // Move camera by same delta to "follow" the object (keeping relative position)
    if (_moveDelta.lengthSq() > 0) {
      controls.getPosition(_currentCamPos);
      controls.setPosition(
        _currentCamPos.x + _moveDelta.x,
        _currentCamPos.y + _moveDelta.y,
        _currentCamPos.z + _moveDelta.z,
        false // no transition for this per-frame update
      );
    }
  }

  controls.update(delta);
  composer.render(delta);
}

renderer.setAnimationLoop(animate);
