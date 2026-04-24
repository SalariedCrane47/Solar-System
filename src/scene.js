import * as THREE from 'three';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, OutlineEffect } from 'postprocessing';
import { CAMERA, RENDERER, POSTPROCESSING, LIGHTING } from './constants.js';

/**
 * Creates and returns a new Three.js Scene.
 * @returns {THREE.Scene}
 */
export function createScene() {
  const scene = new THREE.Scene();
  return scene;
}

/**
 * Creates a PerspectiveCamera configured for the solar system view.
 * @returns {THREE.PerspectiveCamera}
 */
export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    CAMERA.FOV,
    window.innerWidth / window.innerHeight,
    CAMERA.NEAR,
    CAMERA.FAR
  );
  camera.position.set(
    CAMERA.INITIAL_POSITION.x,
    CAMERA.INITIAL_POSITION.y,
    CAMERA.INITIAL_POSITION.z
  );
  return camera;
}

/**
 * Creates a WebGLRenderer with configured tone mapping and antialiasing.
 * Attaches the canvas to the document body.
 * @returns {THREE.WebGLRenderer}
 */
export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: RENDERER.ANTIALIAS });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE[RENDERER.TONE_MAPPING];
  renderer.toneMappingExposure = RENDERER.TONE_MAPPING_EXPOSURE;
  renderer.domElement.id = 'three-canvas';
  renderer.domElement.style.pointerEvents = 'none';
  document.body.appendChild(renderer.domElement);
  return renderer;
}

/**
 * Creates post-processing pipeline with Bloom and Outline effects.
 * @param {THREE.Scene} scene
 * @param {THREE.Camera} camera
 * @param {THREE.WebGLRenderer} renderer
 * @returns {{ composer: EffectComposer, outlineEffect: OutlineEffect }}
 */
export function createPostProcessing(scene, camera, renderer) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomEffect = new BloomEffect({
    luminanceThreshold: POSTPROCESSING.BLOOM.LUMINANCE_THRESHOLD,
    luminanceSmoothing: POSTPROCESSING.BLOOM.LUMINANCE_SMOOTHING,
    intensity: POSTPROCESSING.BLOOM.INTENSITY,
    radius: POSTPROCESSING.BLOOM.RADIUS,
    mipmapBlur: true,
  });

  const outlineEffect = new OutlineEffect(scene, camera, {
    edgeStrength: POSTPROCESSING.OUTLINE.EDGE_STRENGTH,
    visibleEdgeColor: POSTPROCESSING.OUTLINE.VISIBLE_EDGE_COLOR,
    hiddenEdgeColor: POSTPROCESSING.OUTLINE.HIDDEN_EDGE_COLOR,
    blur: true,
    xRay: true,
  });

  composer.addPass(new EffectPass(camera, bloomEffect, outlineEffect));

  return { composer, outlineEffect };
}

/**
 * Sets up ambient lighting and sunlight for the scene.
 * @param {THREE.Scene} scene
 * @returns {{ ambient: THREE.AmbientLight, sunlight: THREE.PointLight }}
 */
export function createLighting(scene) {
  const ambient = new THREE.AmbientLight(LIGHTING.AMBIENT_COLOR, LIGHTING.AMBIENT_INTENSITY);
  scene.add(ambient);

  const sunlight = new THREE.PointLight(
    LIGHTING.SUN_LIGHT_COLOR,
    LIGHTING.SUN_LIGHT_INTENSITY,
    LIGHTING.SUN_LIGHT_DISTANCE,
    LIGHTING.SUN_LIGHT_DECAY
  );
  sunlight.position.set(0, 0, 0);
  sunlight.castShadow = true;
  scene.add(sunlight);

  return { ambient, sunlight };
}

/**
 * Updates camera aspect ratio and renderer size on window resize.
 * @param {THREE.PerspectiveCamera} camera
 * @param {THREE.WebGLRenderer} renderer
 * @param {EffectComposer} composer
 */
export function handleResize(camera, renderer, composer) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}
