import * as THREE from 'three';
import { state, vectors } from './state.js';
import { getRootObject } from './utils/math.js';
import { getPlanetGroups } from './getPlanetsConfig.js';

export function animate({
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
  animateKuiperBelt,
  updateLabels,
}) {
  return function () {
    const delta = clock.getDelta();
    const time = performance.now() * 0.001;

    animateStars(camera);
    animatePlanets(state.timeScale);
    animateSunGroup(sun, time, camera);
    if (animateAsteroids) animateAsteroids(state.timeScale);
    if (animateKuiperBelt) animateKuiperBelt(state.timeScale);

    if (state.timeScale !== 0) {
      const daysPerFrame = 0.02 * state.timeScale; 
      const currentMs = state.currentSimulationTime.getTime();
      state.currentSimulationTime.setTime(currentMs + daysPerFrame * 24 * 60 * 60 * 1000);
      window.dispatchEvent(new CustomEvent('simulation-time-tick', { 
        detail: { date: state.currentSimulationTime } 
      }));
    }

    if (earthMaterial) {
      earthMaterial.uniforms.sunPosition.value.copy(sunlight.position);
    }

    if (saturnMaterial) {
      saturnMaterial.uniforms.sunPosition.value.copy(sunlight.position);
      const saturnGroup = getPlanetGroups().saturn;
      if (saturnGroup) {
        saturnMaterial.uniforms.u_position.value.copy(saturnGroup.position);
        saturnMaterial.uniforms.u_sunRelPosition.value.copy(sunlight.position).sub(saturnGroup.position);
      }
    }

    if (state.focusObject && !state.isTransitioning) {
      controls.getTarget(vectors.oldTargetPos);
      state.focusObject.getWorldPosition(vectors.targetPos);

      vectors.moveDelta.copy(vectors.targetPos).sub(vectors.oldTargetPos);
      controls.setTarget(vectors.targetPos.x, vectors.targetPos.y, vectors.targetPos.z, false);

      if (vectors.moveDelta.lengthSq() > 0) {
        controls.getPosition(vectors.currentCamPos);
        controls.setPosition(
          vectors.currentCamPos.x + vectors.moveDelta.x,
          vectors.currentCamPos.y + vectors.moveDelta.y,
          vectors.currentCamPos.z + vectors.moveDelta.z,
          false
        );
      }
    }

    controls.update(delta);
    updateLabels();
    composer.render(delta);
  };
}

export function createRaycaster() {
  return {
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
  };
}

function throttle(func, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export function handleHover({ mouse, camera, raycaster, clickableObjects, outlineEffect }) {
  const throttledRaycast = throttle(event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(clickableObjects, true);
    const next = hits.length ? getRootObject(hits[0].object, clickableObjects) : null;

    if (next !== state.hoveredObject) {
      state.hoveredObject = next;
      outlineEffect.setSelection(state.hoveredObject ? [state.hoveredObject] : []);
    }
  }, 16);

  return function (event) {
    if (!state.started) return;
    throttledRaycast(event);
  };
}
