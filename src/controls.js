import CameraControls from 'camera-controls';
import * as THREE from 'three';
import { CAMERA } from './constants.js';

/**
 * Creates and configures CameraControls for the scene.
 * @param {THREE.PerspectiveCamera} camera
 * @param {HTMLElement} domElement
 * @returns {CameraControls}
 */
export function createControls(camera, domElement) {
  CameraControls.install({ THREE });

  const controls = new CameraControls(camera, domElement);

  controls.dollySpeed = CAMERA.DOLLY_SPEED;
  controls.truckSpeed = CAMERA.TRUCK_SPEED;
  controls.azimuthRotateSpeed = CAMERA.AZIMUTH_ROTATE_SPEED;
  controls.polarRotateSpeed = CAMERA.POLAR_ROTATE_SPEED;
  controls.maxDistance = CAMERA.MAX_DISTANCE;

  controls.setLookAt(
    CAMERA.INITIAL_TARGET.x,
    CAMERA.INITIAL_TARGET.y,
    CAMERA.INITIAL_TARGET.z,
    0,
    0,
    0,
    false
  );
  controls.enabled = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = CAMERA.AUTO_ROTATE_SPEED;
  controls.update(0);

  return controls;
}

/**
 * Enables user camera controls and disables auto-rotation.
 * @param {CameraControls} controls
 */
export function enableControls(controls) {
  controls.autoRotate = false;
  controls.enabled = true;
}

/**
 * Disables user camera controls and enables auto-rotation.
 * @param {CameraControls} controls
 */
export function disableControls(controls) {
  controls.autoRotate = true;
  controls.enabled = false;
}

/**
 * Animates camera to zoom out to a solar system overview position.
 * @param {CameraControls} controls
 */
export function zoomToOverview(controls) {
  controls.setLookAt(0, 150, 700, 0, 0, 0, true);
}
