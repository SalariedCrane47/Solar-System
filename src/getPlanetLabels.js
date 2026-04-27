import * as THREE from 'three';

/**
 * Creates planet labels with pill-shaped design.
 * Labels are hidden when the planet is behind another object or too close to other labels.
 * When focused on a planet, moon labels appear for its satellites.
 */
export function createPlanetLabels(
  planets,
  moons,
  camera,
  getFocusObject,
  getOccluders,
  onLabelClick
) {
  const labels = new Map();
  const raycaster = new THREE.Raycaster();

  const container = document.createElement('div');
  container.id = 'planet-labels-container';
  container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 40;
        overflow: hidden;
    `;
  document.body.appendChild(container);

  // Create label for each planet
  planets.forEach(planet => {
    const name = planet.userData?.name;
    if (!name) return;

    const label = document.createElement('div');
    label.className = 'planet-label';
    label.dataset.planet = name;
    label.style.pointerEvents = 'auto';
    label.innerHTML = `<span class="planet-label-dot"></span><span class="planet-label-name">${name}</span>`;

    if (planet.userData?.color) {
      const hexColor = '#' + planet.userData.color.toString(16).padStart(6, '0');
      const dot = label.querySelector('.planet-label-dot');
      dot.style.color = hexColor;
    }

    label.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if (onLabelClick) {
        onLabelClick(planet);
      }
    });

    container.appendChild(label);
    labels.set(name, { element: label, planet, screenX: 0, screenY: 0, isVisible: false });
  });

  // Create moon labels map
  const moonLabels = new Map();
  const planetMoons = new Map(); // planet name -> array of moons

  // Group moons by their parent planet
  moons.forEach(moon => {
    const moonName = moon.userData?.name;
    if (!moonName) return;

    // Find the parent planet by traversing up the scene graph
    let parent = moon.parent;
    while (parent && !parent.userData?.name) {
      parent = parent.parent;
    }
    const planetName = parent?.userData?.name;

    if (planetName) {
      if (!planetMoons.has(planetName)) {
        planetMoons.set(planetName, []);
      }
      planetMoons.get(planetName).push(moon);
    }

    // Create moon label
    const label = document.createElement('div');
    label.className = 'moon-label';
    label.dataset.moon = moonName;
    label.style.pointerEvents = 'auto';
    label.innerHTML = `<span class="moon-label-dot"></span><span class="moon-label-name">${moonName}</span>`;

    // Use a default color for moons or try to get from moon data
    const dot = label.querySelector('.moon-label-dot');
    dot.style.color = '#cccccc'; // Light gray for moons

    label.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if (onLabelClick) {
        onLabelClick(moon);
      }
    });

    container.appendChild(label);
    moonLabels.set(moonName, { element: label, moon, screenX: 0, screenY: 0, isVisible: false });
  });

  let vpWidth = window.innerWidth;
  let vpHeight = window.innerHeight;
  window.addEventListener('resize', () => {
    vpWidth = window.innerWidth;
    vpHeight = window.innerHeight;
  });

  function updateLabels() {
    const focusObject = getFocusObject();
    const occluders = getOccluders ? getOccluders() : [];

    // Force camera matrix updates
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    // First pass: calculate screen positions and occlusion for planets
    labels.forEach(({ element, planet }, name) => {
      if (focusObject && focusObject !== planet) {
        element.style.opacity = '0';
        element.style.pointerEvents = 'none';
        labels.set(name, { element, planet, screenX: 0, screenY: 0, isVisible: false });
        return;
      }

      element.style.pointerEvents = 'auto';

      // Get world position and project to screen
      const worldPos = new THREE.Vector3();
      planet.getWorldPosition(worldPos);
      worldPos.project(camera);

      const isInFront = worldPos.z < 1;
      const x = (worldPos.x * 0.5 + 0.5) * vpWidth;
      const y = (-worldPos.y * 0.5 + 0.5) * vpHeight;

      const margin = 50;
      const onScreen = x > -margin && x < vpWidth + margin && y > -margin && y < vpHeight + margin;

      // Check occlusion
      let occluded = false;
      if (isInFront && onScreen && occluders.length > 0) {
        const planetPos = new THREE.Vector3();
        planet.getWorldPosition(planetPos);
        const planetDist = camera.position.distanceTo(planetPos);

        const cameraToPlanet = planetPos.clone().sub(camera.position).normalize();
        raycaster.set(camera.position, cameraToPlanet);

        for (const occluder of occluders) {
          if (occluder === planet) continue;

          const occluderPos = new THREE.Vector3();
          if (occluder.getWorldPosition) {
            occluder.getWorldPosition(occluderPos);
          } else {
            occluderPos.copy(occluder.position);
          }

          const occluderDist = camera.position.distanceTo(occluderPos);

          if (occluderDist < planetDist) {
            const hits = raycaster.intersectObject(occluder, true);
            if (hits.length > 0 && hits[0].distance < planetDist - 0.5) {
              occluded = true;
              break;
            }
          }
        }
      }

      labels.set(name, {
        element,
        planet,
        screenX: x,
        screenY: y,
        isVisible: isInFront && onScreen && !occluded,
      });
    });

    // Second pass: hide labels that are too close to others
    const cameraDistance = camera.position.length();
    const minDist = Math.max(25, cameraDistance * 0.015);

    labels.forEach(({ element, screenX, screenY, isVisible }, name) => {
      if (!isVisible) {
        element.style.opacity = '0';
        return;
      }

      // Check distance to all other labels
      let tooClose = false;
      labels.forEach(({ screenX: ox, screenY: oy, isVisible: oVisible }, otherName) => {
        if (name === otherName || !oVisible) return;

        const dx = screenX - ox;
        const dy = screenY - oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDist) {
          tooClose = true;
        }
      });

      if (tooClose) {
        element.style.opacity = '0';
      } else {
        element.style.left = `${screenX}px`;
        element.style.top = `${screenY}px`;
        element.style.transform = 'translate(-50%, -50%)';
        element.style.opacity = '1';
      }
    });

    // Process moon labels
    let focusPlanetName = null;
    if (focusObject) {
      // If focused on a planet, use its name directly
      if (planets.includes(focusObject)) {
        focusPlanetName = focusObject.userData?.name;
      } else {
        // If focused on a moon, find its parent planet
        let parent = focusObject.parent;
        while (parent && !parent.userData?.name) {
          parent = parent.parent;
        }
        focusPlanetName = parent?.userData?.name;
      }
    }
    const moonsToShow = focusPlanetName ? planetMoons.get(focusPlanetName) || [] : [];

    moonLabels.forEach(({ element, moon }, moonName) => {
      const shouldShow = moonsToShow.includes(moon);

      if (!shouldShow) {
        element.style.opacity = '0';
        element.style.pointerEvents = 'none';
        moonLabels.set(moonName, { element, moon, screenX: 0, screenY: 0, isVisible: false });
        return;
      }

      element.style.pointerEvents = 'auto';

      // Get world position and project to screen
      const worldPos = new THREE.Vector3();
      moon.getWorldPosition(worldPos);
      worldPos.project(camera);

      const isInFront = worldPos.z < 1;
      const x = (worldPos.x * 0.5 + 0.5) * vpWidth;
      const y = (-worldPos.y * 0.5 + 0.5) * vpHeight;

      const margin = 30; // Smaller margin for moons
      const onScreen = x > -margin && x < vpWidth + margin && y > -margin && y < vpHeight + margin;

      // Check occlusion for moons (simplified)
      let occluded = false;
      if (isInFront && onScreen && occluders.length > 0) {
        const moonPos = new THREE.Vector3();
        moon.getWorldPosition(moonPos);
        const moonDist = camera.position.distanceTo(moonPos);

        const cameraToMoon = moonPos.clone().sub(camera.position).normalize();
        raycaster.set(camera.position, cameraToMoon);

        for (const occluder of occluders) {
          if (occluder === moon || occluder === focusObject) continue;

          const occluderPos = new THREE.Vector3();
          if (occluder.getWorldPosition) {
            occluder.getWorldPosition(occluderPos);
          } else {
            occluderPos.copy(occluder.position);
          }

          const occluderDist = camera.position.distanceTo(occluderPos);

          if (occluderDist < moonDist) {
            const hits = raycaster.intersectObject(occluder, true);
            if (hits.length > 0 && hits[0].distance < moonDist - 0.1) {
              occluded = true;
              break;
            }
          }
        }
      }

      const isVisible = isInFront && onScreen && !occluded;
      moonLabels.set(moonName, { element, moon, screenX: x, screenY: y, isVisible });

      if (isVisible) {
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.transform = 'translate(-50%, -50%)';
        element.style.opacity = '1';
      } else {
        element.style.opacity = '0';
      }
    });
  }

  function dispose() {
    labels.forEach(({ element }) => element.remove());
    moonLabels.forEach(({ element }) => element.remove());
    container.remove();
  }

  return {
    container,
    labels,
    moonLabels,
    updateLabels,
    dispose,
  };
}
