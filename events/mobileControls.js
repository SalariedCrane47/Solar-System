import { MOBILE } from '../src/constants.js';

export function initMobileControls(controls, gameStartedCallback) {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 1024;

  if (!isMobile) return;

  const container = document.createElement('div');
  container.id = 'mobile-controls';
  container.className = 'mobile-controls game-ui-hidden';

  const joystickContainer = document.createElement('div');
  joystickContainer.className = 'joystick-container';

  const joystickKnob = document.createElement('div');
  joystickKnob.className = 'joystick-knob';
  joystickContainer.appendChild(joystickKnob);

  container.appendChild(joystickContainer);

  const zoomControls = document.createElement('div');
  zoomControls.className = 'zoom-controls';

  const zoomInBtn = document.createElement('button');
  zoomInBtn.className = 'zoom-btn';
  zoomInBtn.innerHTML = '+';
  zoomInBtn.addEventListener('click', () => {
    if (gameStartedCallback && !gameStartedCallback()) return;
    controls.dolly(5, true);
  });

  const zoomOutBtn = document.createElement('button');
  zoomOutBtn.className = 'zoom-btn';
  zoomOutBtn.innerHTML = '−';
  zoomOutBtn.addEventListener('click', () => {
    if (gameStartedCallback && !gameStartedCallback()) return;
    controls.dolly(-5, true);
  });

  zoomControls.appendChild(zoomInBtn);
  zoomControls.appendChild(zoomOutBtn);
  container.appendChild(zoomControls);

  document.body.appendChild(container);

  let joystickActive = false;
  let joystickData = { x: 0, y: 0 };
  let lastEnabledState = false;

  const maxDistance = MOBILE.MAX_CAMERA_DISTANCE;
  let centerX, centerY;

  function initJoystickPosition() {
    const rect = joystickContainer.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
  }

  setTimeout(initJoystickPosition, 200);
  window.addEventListener('resize', initJoystickPosition);

  joystickContainer.addEventListener(
    'touchstart',
    e => {
      e.preventDefault();
      e.stopPropagation();

      if (gameStartedCallback && !gameStartedCallback()) return;

      lastEnabledState = controls.enabled;
      controls.enabled = true;
      joystickActive = true;
      const touch = e.touches[0];
      const rect = joystickContainer.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
      updateJoystick(touch.clientX, touch.clientY);
    },
    { passive: false }
  );

  joystickContainer.addEventListener(
    'touchmove',
    e => {
      e.preventDefault();
      if (!joystickActive) return;
      const touch = e.touches[0];
      updateJoystick(touch.clientX, touch.clientY);
    },
    { passive: false }
  );

  joystickContainer.addEventListener('touchend', e => {
    e.preventDefault();
    joystickActive = false;
    joystickData = { x: 0, y: 0 };
    joystickKnob.style.transform = 'translate(-50%, -50%)';
    if (!lastEnabledState) {
      controls.enabled = false;
    }
  });

  function updateJoystick(clientX, clientY) {
    let dx = clientX - centerX;
    let dy = clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxDistance) {
      dx = (dx / distance) * maxDistance;
      dy = (dy / distance) * maxDistance;
    }

    joystickData = {
      x: dx / maxDistance,
      y: dy / maxDistance,
    };

    joystickKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  }

  function updateJoystickMovement() {
    if (
      joystickActive &&
      (Math.abs(joystickData.x) > MOBILE.JOYSTICK_DEAD_ZONE ||
        Math.abs(joystickData.y) > MOBILE.JOYSTICK_DEAD_ZONE)
    ) {
      controls.update(0.016);
      controls.truck(joystickData.x * MOBILE.JOYSTICK_SPEED_MULTIPLIER, false);
      controls.azimuthRotate(joystickData.y * MOBILE.JOYSTICK_ROTATION_MULTIPLIER, false);
    }
    requestAnimationFrame(updateJoystickMovement);
  }

  updateJoystickMovement();

  return container;
}
