import * as THREE from 'three';

/**
 * Creates planet labels that track each planet's position in 3D space.
 * Labels are only visible when the planet is NOT focused.
 */
export function createPlanetLabels(planets, camera, getFocusObject, onLabelClick) {
    const labels = new Map();

    // Create label container
    const container = document.createElement('div');
    container.id = 'planet-labels-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
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
        label.style.pointerEvents = 'auto'; // Ensure pointer events are enabled
        label.innerHTML = `
            <span class="planet-label-name">${name}</span>
            <span class="planet-label-dot"></span>
        `;

        // Apply planet color if available
        if (planet.userData?.color) {
            const hexColor = '#' + planet.userData.color.toString(16).padStart(6, '0');
            const dot = label.querySelector('.planet-label-dot');
            dot.style.borderColor = hexColor;
            dot.style.boxShadow = `0 0 8px ${hexColor}`;
            // Optional: transparent background for the dot
            dot.style.background = `rgba(${parseInt(hexColor.slice(1, 3), 16)}, ${parseInt(hexColor.slice(3, 5), 16)}, ${parseInt(hexColor.slice(5, 7), 16)}, 0.6)`;
        }

        // Click handler
        label.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (onLabelClick) {
                onLabelClick(planet);
            }
        });

        // Initially hide labels
        label.style.opacity = '0';
        label.style.transition = 'opacity 0.3s ease';

        container.appendChild(label);
        labels.set(name, { element: label, planet });
    });

    // Temporary vector for calculations
    const tempV = new THREE.Vector3();

    // Cache viewport size — updated on resize to avoid reading window.innerWidth/Height per label per frame
    let vpWidth = window.innerWidth;
    let vpHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        vpWidth = window.innerWidth;
        vpHeight = window.innerHeight;
    });

    /**
     * Update label positions - call this in the animation loop
     */
    function updateLabels() {
        // Get current focus object
        const focusObject = getFocusObject();

        labels.forEach(({ element, planet }, name) => {
            // Hide ALL labels if ANY planet is focused
            if (focusObject) {
                element.style.opacity = '0';
                // Also disable pointer events so it doesn't block clicks when hidden
                element.style.pointerEvents = 'none';
                return;
            } else {
                element.style.pointerEvents = 'auto';
            }

            // Get planet's world position
            planet.getWorldPosition(tempV);

            // Project to screen coordinates
            tempV.project(camera);

            // Check if planet is in front of camera
            const isInFront = tempV.z < 1;

            // Check if planet is within screen bounds
            const x = (tempV.x * 0.5 + 0.5) * vpWidth;
            const y = (-(tempV.y * 0.5) + 0.5) * vpHeight;

            const margin = 50;
            const isOnScreen =
                x > -margin &&
                x < vpWidth + margin &&
                y > -margin &&
                y < vpHeight + margin;

            // Update position and visibility
            if (isInFront && isOnScreen) {
                // Center the label on the planet
                element.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
                element.style.opacity = '1';
            } else {
                element.style.opacity = '0';
            }
        });
    }

    /**
     * Clean up labels
     */
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
