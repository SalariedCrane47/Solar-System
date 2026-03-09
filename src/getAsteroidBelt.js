import * as THREE from 'three';

export default function createAsteroidBelt({ numAsteroids = 1000, innerRadius, outerRadius } = {}) {
    const asteroidBelt = new THREE.Group();

    for (let i = 0; i < numAsteroids; i++) {
        const asteroidGeometry = new THREE.IcosahedronGeometry(Math.random() * 0.05, 1); // Random small size
        const asteroidMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888, // gray colour
        })

        // Make asteroid
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

        // Random position in range
        const radius = THREE.MathUtils.lerp(innerRadius, outerRadius, Math.random());
        const theta = Math.random() * Math.PI * 2 // Rnadom azimuthal angle
        const inclination = (Math.random() - 0.5) * 0.1 // Slight inclination

        // Set the position
        asteroid.position.setFromSpherical(
            new THREE.Spherical(
                radius,
                inclination + Math.PI / 2,
                theta
            )
        );

        // Random rotation
        asteroid.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

        // Add the asteroid to the group
        asteroidBelt.add(asteroid);
    }

    // Function to animate the asteroids
    function animateAsteroids(timeScale = 1) {
        const step = 0.001 * timeScale;
        asteroidBelt.children.forEach(asteroid => {
            const spherical = new THREE.Spherical();
            spherical.setFromVector3(asteroid.position);
            spherical.theta += step;
            asteroid.position.setFromSpherical(spherical);
        });
    }

    return {
        asteroidBelt,
        animateAsteroids
    };
}