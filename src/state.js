import * as THREE from 'three';

export const state = {
  started: false,
  timeScale: 1.0,
  focusObject: null,
  isTransitioning: false,
  hoveredObject: null,
  sceneReady: false,
  previousFocusObject: null,
  focusedPlanetName: null,
  currentSimulationTime: new Date(),
};

export const vectors = {
  targetPos: new THREE.Vector3(),
  oldTargetPos: new THREE.Vector3(),
  currentCamPos: new THREE.Vector3(),
  moveDelta: new THREE.Vector3(),
};

export const performance = {
  frameCount: 0,
  lastFpsUpdate: 0,
  fps: 60,
  enableLOD: true,
  maxTextureQuality: 'high',
};

export function setTimeScale(scale) {
  state.timeScale = scale;
}

export function setFocusObject(obj, planetName = null) {
  state.previousFocusObject = state.focusObject;
  state.focusObject = obj;
  state.focusedPlanetName = planetName;
}

export function setTransitioning(value) {
  state.isTransitioning = value;
}

export function setHoveredObject(obj) {
  state.hoveredObject = obj;
}

export function setSceneReady(value) {
  state.sceneReady = value;
}

export function setSimulationTime(date) {
  state.currentSimulationTime = date;
}

export function getSimulationTime() {
  return state.currentSimulationTime;
}

export function resetState() {
  state.started = false;
  state.timeScale = 1.0;
  state.focusObject = null;
  state.previousFocusObject = null;
  state.focusedPlanetName = null;
  state.isTransitioning = false;
  state.hoveredObject = null;
  state.currentSimulationTime = new Date();
}
