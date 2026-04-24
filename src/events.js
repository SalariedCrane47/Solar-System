import { INTERACTION } from './constants.js';
import { state, vectors } from './state.js';
import { getRootObject, calculateFocusPosition } from './utils/math.js';

export function createTouchState() {
  return {
    isActive: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    initialDistance: 0,
    isPinching: false,
  };
}

function getTouchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

export function setupTouchEvents(
  touchState,
  controls,
  mouse,
  raycaster,
  camera,
  clickableObjects,
  showInfocard
) {
  window.addEventListener(
    'touchstart',
    e => {
      if (!state.started) return;

      if (e.touches.length === 1) {
        touchState.isActive = true;
        touchState.startX = e.touches[0].clientX;
        touchState.startY = e.touches[0].clientY;
        touchState.lastX = touchState.startX;
        touchState.lastY = touchState.startY;
        touchState.isPinching = false;
      } else if (e.touches.length === 2) {
        touchState.isActive = true;
        touchState.initialDistance = getTouchDistance(e.touches);
        touchState.isPinching = true;
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'touchmove',
    e => {
      if (!state.started) return;

      if (e.touches.length === 1 && touchState.isActive && !touchState.isPinching) {
        const deltaX = e.touches[0].clientX - touchState.lastX;
        const deltaY = e.touches[0].clientY - touchState.lastY;

        controls.truck(deltaX * INTERACTION.TOUCH_SENSITIVITY, false);
        controls.dolly(-deltaY * INTERACTION.TOUCH_SENSITIVITY, true);

        touchState.lastX = e.touches[0].clientX;
        touchState.lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2 && touchState.isActive && touchState.isPinching) {
        const currentDistance = getTouchDistance(e.touches);
        const scale = currentDistance / touchState.initialDistance;

        if (scale > 1 + INTERACTION.PINCH_THRESHOLD) {
          controls.dolly(-INTERACTION.DOLLY_STEP, true);
          touchState.initialDistance = currentDistance;
        } else if (scale < 1 - INTERACTION.PINCH_THRESHOLD) {
          controls.dolly(INTERACTION.DOLLY_STEP, true);
          touchState.initialDistance = currentDistance;
        }
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'touchend',
    e => {
      if (e.touches.length === 0) {
        touchState.isActive = false;
        touchState.isPinching = false;

        const touch = e.changedTouches[0];
        if (
          Math.abs(touch.clientX - touchState.startX) < INTERACTION.TOUCH_SLOP &&
          Math.abs(touch.clientY - touchState.startY) < INTERACTION.TOUCH_SLOP
        ) {
          mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          const hits = raycaster.intersectObjects(clickableObjects, true);
          if (hits.length) {
            const objectToFocus = getRootObject(hits[0].object, clickableObjects);
            if (objectToFocus && objectToFocus.userData?.name) {
              focusOnPlanet(objectToFocus, camera, controls, showInfocard);
            }
          }
        }
      } else if (e.touches.length === 1) {
        touchState.isPinching = false;
        touchState.lastX = e.touches[0].clientX;
        touchState.lastY = e.touches[0].clientY;
      }
    },
    { passive: true }
  );
}

export function focusOnPlanet(object, camera, controls, showInfocard) {
  if (!object) return;

  state.focusObject = object;
  state.focusObject.getWorldPosition(vectors.targetPos);

  const newCamPos = calculateFocusPosition(
    camera,
    vectors.targetPos,
    INTERACTION.FOCUS_OFFSET_DISTANCE
  );

  state.isTransitioning = true;
  controls
    .setLookAt(
      newCamPos.x,
      newCamPos.y,
      newCamPos.z,
      vectors.targetPos.x,
      vectors.targetPos.y,
      vectors.targetPos.z,
      true
    )
    .then(() => {
      state.isTransitioning = false;
    });

  const name = object.userData?.name;
  if (name && showInfocard) {
    showInfocard(name, object);
  }

  return object;
}
