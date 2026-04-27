import * as THREE from 'three';
import {
  createScene,
  createCamera,
  createRenderer,
  createPostProcessing,
  createLighting,
  handleResize,
} from './src/scene.js';
import { createControls, enableControls, zoomToOverview } from './src/controls.js';
import { animate, createRaycaster, handleHover } from './src/animation.js';
import { setupTouchEvents, createTouchState, focusOnPlanet } from './src/events.js';
import { state, setTimeScale } from './src/state.js';
import * as timecontrols from './events/timecontrols.js';
import * as settingsUI from './events/settingsUI.js';
import * as searchUI from './events/searchUI.js';
import { initDistanceCalculator } from './events/distanceCalculator.js';
import * as infocard from './events/infocard.js';
import { initScaleIndicator, showScaleIndicator } from './events/scaleIndicator.js';
import { initRegionSelector } from './events/regionSelector.js';
import { t, onLanguageChange, setLanguage } from './src/i18n/index.js';
import getStarfield from './src/getStars.js';
import { getSun, animateSunGroup } from './src/getSun.js';
import { planetsConfig, getPlanetGroups } from './src/getPlanetsConfig.js';
import createAsteroidBelt from './src/getAsteroidBelt.js';
import { createPlanetLabels } from './src/getPlanetLabels.js';
import { orbitalParameters } from './src/data/orbitParam.js';
import { ASTEROID_BELT } from './src/constants.js';
import { imageSources } from './src/data/imageSources.js';
import { textureManager } from './src/textureManager.js';

let saturnRing = null;
let uranusRing = null;

if (window.__INITIAL_LANG__) {
  setLanguage(window.__INITIAL_LANG__);
}

function updateI18nText() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}

const loadingScreen = document.getElementById('loading-screen');
const startMenu = document.getElementById('start-menu');

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
const { composer, outlineEffect } = createPostProcessing(scene, camera, renderer);
const { sunlight } = createLighting(scene);

const controls = createControls(camera, renderer.domElement);
const clock = new THREE.Clock();
const { raycaster, mouse } = createRaycaster();
const touchState = createTouchState();

async function preloadAssets() {
  const loadingCount = document.getElementById('loading-count');
  const loadingTotal = document.getElementById('loading-total');
  const loadingText = document.querySelector('.loading-text');

  loadingTotal.textContent = '...';
  loadingText.textContent = 'Loading textures...';

  const planetGroups = getPlanetGroups();
  textureManager.setProgressCallback((loaded, total, planet) => {
    loadingCount.textContent = loaded;
    loadingTotal.textContent = total;
    loadingText.textContent = `Loading ${planet}...`;

    if (planetGroups[planet]) {
      planetGroups[planet].visible = true;
    }
  });

  try {
    await textureManager.loadAll(imageSources);
  } catch (error) {
    console.error('Texture preload failed', error);
  } finally {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      loadingScreen.style.display = 'none';
      loadingScreen.style.visibility = 'hidden';
    }
    if (startMenu) {
      startMenu.classList.remove('hidden');
    }
    state.sceneReady = true;
  }
}

function setGameUIVisible(visible) {
  const labelsContainer = document.getElementById('planet-labels-container');
  const timeControls = document.querySelector('.timecontrols-panel');
  const settingsBtn = document.getElementById('settings-btn');
  const searchContainer = document.getElementById('search-container');
  const infocardEl = document.getElementById('infocard');
  const regionSelectorWrapper = document.getElementById('region-selector-wrapper');
  const uiElements = [
    labelsContainer,
    timeControls,
    infocardEl,
    settingsBtn,
    searchContainer,
    regionSelectorWrapper,
  ];

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

const playButton = document.getElementById('play-button');

playButton.addEventListener('click', e => {
  e.stopPropagation();

  state.started = true;
  renderer.domElement.style.pointerEvents = 'auto';
  startMenu.classList.add('hidden');
  setGameUIVisible(true);
  enableControls(controls);
  zoomToOverview(controls);
});

const {
  stars: starfield,
  animateStars,
  nebula,
} = getStarfield({
  numStars: 10000,
  radius: 6000,
});
scene.add(nebula);
scene.add(starfield);

const sun = getSun();
scene.add(sun);

const {
  orbitPlanes,
  planets,
  orbits,
  animatePlanets,
  moons = [],
  earthMaterial,
  saturnMaterial,
} = planetsConfig();
orbitPlanes.forEach(p => scene.add(p));
orbits.forEach(o => scene.add(o));

const planetGroups = getPlanetGroups();
if (planetGroups.saturn) {
  planetGroups.saturn.traverse(child => {
    if (child.isMesh && child.geometry?.type === 'RingGeometry') {
      saturnRing = child;
    }
  });
}
if (planetGroups.uranus) {
  planetGroups.uranus.traverse(child => {
    if (child.isMesh && child.geometry?.type === 'RingGeometry') {
      uranusRing = child;
    }
  });
}

const { asteroidBelt, animateAsteroids } = createAsteroidBelt({
  innerRadius: orbitalParameters.asteroidBelt.innerRadius,
  outerRadius: orbitalParameters.asteroidBelt.outerRadius,
  numAsteroids: ASTEROID_BELT.NUM_ASTEROIDS,
});
scene.add(asteroidBelt);

const clickableObjects = [...planets, ...moons, sun];

const { updateLabels } = createPlanetLabels(
  planets,
  moons,
  camera,
  () => state.focusObject,
  () => clickableObjects,
  obj => focusOnPlanet(obj, camera, controls, infocard.show)
);

setGameUIVisible(false);

searchUI.init(clickableObjects, obj => focusOnPlanet(obj, camera, controls, infocard.show));

window.addEventListener(
  'mousemove',
  handleHover({
    mouse,
    camera,
    raycaster,
    clickableObjects,
    outlineEffect,
  })
);

setupTouchEvents(touchState, controls, mouse, raycaster, camera, clickableObjects, infocard.show);

window.addEventListener('click', () => {
  if (!state.started) return;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(clickableObjects, true);
  if (!hits.length) return;

  const objectToFocus = hits[0].object;
  let obj = objectToFocus;
  while (obj.parent && !clickableObjects.includes(obj)) {
    obj = obj.parent;
  }
  if (obj && obj.userData?.name) {
    focusOnPlanet(obj, camera, controls, infocard.show);
  }
});

controls.addEventListener('controlstart', () => {
  state.focusObject = null;
  state.isTransitioning = false;
});

window.addEventListener('resize', () => {
  handleResize(camera, renderer, composer);

  const infocardEl = document.getElementById('infocard');
  if (infocardEl && infocardEl.classList.contains('infocard-visible')) {
    updateCameraOffset(true);
  }
});

function updateCameraOffset(active) {
  if (active) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.setViewOffset(width, height, -width * 0.25, 0, width, height);
  } else {
    camera.clearViewOffset();
  }
}

window.addEventListener('infocard-toggled', e => {
  updateCameraOffset(e.detail.visible);
});

window.addEventListener('rings-visibility-change', e => {
  if (e.detail.saturn !== undefined && saturnRing) {
    saturnRing.visible = e.detail.saturn;
  }
  if (e.detail.uranus !== undefined && uranusRing) {
    uranusRing.visible = e.detail.uranus;
  }
});

window.addEventListener('take-screenshot', () => {
  renderer.render(scene, camera);
  const dataURL = renderer.domElement.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `solar-system-${Date.now()}.png`;
  link.href = dataURL;
  link.click();
});

const doAnimate = animate({
  clock,
  controls,
  camera,
  composer,
  sun,
  sunlight,
  earthMaterial,
  saturnMaterial,
  animateStars,
  animatePlanets,
  animateSunGroup,
  animateAsteroids,
  updateLabels,
});

renderer.setAnimationLoop(doAnimate);

async function init() {
  await preloadAssets();
  updateI18nText();
  onLanguageChange(updateI18nText);
  initDistanceCalculator();
  initScaleIndicator();
  showScaleIndicator();
  initRegionSelector();
  timecontrols.init(scale => {
    setTimeScale(scale);
  });
  settingsUI.init();
}

init();
