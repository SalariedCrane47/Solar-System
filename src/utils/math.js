import { INTERACTION } from '../constants.js';

export function getRootObject(obj, clickableObjects) {
  while (obj.parent && !clickableObjects.includes(obj)) {
    obj = obj.parent;
  }
  return obj;
}

export function calculateFocusPosition(camera, worldPos, offsetDistance) {
  const viewDir = camera.position.clone().sub(worldPos).normalize();
  if (viewDir.lengthSq() < INTERACTION.CAMERA_FOLLOW_THRESHOLD) {
    viewDir.set(0, 0, 1);
  }
  return worldPos.clone().add(viewDir.multiplyScalar(offsetDistance));
}
