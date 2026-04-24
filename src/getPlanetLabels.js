import * as THREE from 'three';

/**
 * Creates planet labels with pill-shaped design.
 * Labels are hidden when the planet is behind another object or too close to other labels.
 */
export function createPlanetLabels(planets, camera, getFocusObject, getOccluders, onLabelClick) {
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
    planets.forEach((planet) => {
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

        label.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onLabelClick) {
                onLabelClick(planet);
            }
        });

        container.appendChild(label);
        labels.set(name, { element: label, planet, screenX: 0, screenY: 0, isVisible: false });
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

        // First pass: calculate screen positions and occlusion
        labels.forEach(({ element, planet }, name) => {
            if (focusObject) {
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
            const onScreen =
                x > -margin &&
                x < vpWidth + margin &&
                y > -margin &&
                y < vpHeight + margin;

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

            labels.set(name, { element, planet, screenX: x, screenY: y, isVisible: isInFront && onScreen && !occluded });
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
    }

    function dispose() {
        labels.forEach(({ element }) => element.remove());
        container.remove();
    }

    return {
        container,
        labels,
        updateLabels,
        dispose
    };
}
