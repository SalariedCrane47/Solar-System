import * as THREE from 'three';
import { imageSources } from './data/imageSources';
import { orbitalParameters, orbitColors } from './data/orbitParam';
import { speed } from './data/rotateAndRevolt';
import { getFresnelMat } from './getFresnel';

const textureLoader = new THREE.TextureLoader();
export function planetsConfig() {
    // Mercury
    const mercuryGroup = new THREE.Group();
    mercuryGroup.userData = { name: 'Mercury', color: orbitColors.mercury };
    const mercuryGeometry = new THREE.IcosahedronGeometry(orbitalParameters.mercury.size, 12);
    const mercuryMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(imageSources.mercury.img)
    })
    const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    mercuryGroup.add(mercury);
    mercuryGroup.position.setFromSpherical(
        new THREE.Spherical(
            orbitalParameters.mercury.radius,
            orbitalParameters.mercury.phi,
            orbitalParameters.mercury.theta
        )
    );
    mercuryGroup.rotation.z = orbitalParameters.mercury.tilt;

    // Venus
    const venusGroup = new THREE.Group();
    venusGroup.userData = { name: 'Venus', color: orbitColors.venus };
    const venusGeometry = new THREE.IcosahedronGeometry(orbitalParameters.venus.size, 12);
    const venusMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(imageSources.venus.img)
    });
    const venus = new THREE.Mesh(venusGeometry, venusMaterial);
    venusGroup.add(venus);

    const venusAtmosphere = new THREE.MeshStandardMaterial({
        opacity: 0.6,
        map: textureLoader.load(imageSources.venus.atmosphere),
        blending: THREE.AdditiveBlending,
    })
    const venusAtmosphereMesh = new THREE.Mesh(venusGeometry, venusAtmosphere);
    venusGroup.add(venusAtmosphereMesh);
    venusGroup.position.setFromSpherical(
        new THREE.Spherical(
            orbitalParameters.venus.radius,
            orbitalParameters.venus.phi,
            orbitalParameters.venus.theta
        )
    );
    venusGroup.rotation.z = orbitalParameters.venus.tilt;

    // Earth
    const earthGroup = new THREE.Group();
    earthGroup.userData = { name: 'Earth', color: orbitColors.earth };
    const earthGeometry = new THREE.IcosahedronGeometry(
        orbitalParameters.earth.size,
        12
    );

    const earthMaterial = new THREE.ShaderMaterial({
        uniforms: {
            dayTexture: { value: textureLoader.load(imageSources.earth.img) },
            nightTexture: { value: textureLoader.load(imageSources.earth.night) },
            sunPosition: { value: new THREE.Vector3() } // update every frame
        },

        vertexShader: `
        precision highp float;

        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vPositionWorld;

        void main() {
        vUv = uv;

        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vPositionWorld = worldPos.xyz;

        vNormalWorld = normalize(mat3(modelMatrix) * normal);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,


        fragmentShader: `
        precision highp float;

        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform vec3 sunPosition;

        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vPositionWorld;

        void main() {
            vec3 lightDir = normalize(sunPosition - vPositionWorld);

            float light = max(dot(vNormalWorld, lightDir), 0.0);

            vec4 dayColor   = texture2D(dayTexture, vUv);
            vec4 nightColor = texture2D(nightTexture, vUv) * 0.25;

            gl_FragColor = mix(nightColor, dayColor, light);
            }
        `
    });



    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earth);


    // ---- Clouds ----
    const earthCloudsMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(imageSources.earth.clouds),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.6
    });
    const earthCloudsMesh = new THREE.Mesh(earthGeometry, earthCloudsMaterial);
    earthCloudsMesh.scale.setScalar(1.005);
    earthGroup.add(earthCloudsMesh);

    // ---- Fresnel glow ----
    const fresnelMat = getFresnelMat();
    const earthGlowMesh = new THREE.Mesh(earthGeometry, fresnelMat);
    earthGlowMesh.scale.setScalar(1.02);
    earthGroup.add(earthGlowMesh);

    // ---- Position & tilt ----
    earthGroup.position.setFromSpherical(
        new THREE.Spherical(
            orbitalParameters.earth.radius,
            orbitalParameters.earth.phi,
            orbitalParameters.earth.theta
        )
    );
    earthGroup.rotation.z = orbitalParameters.earth.tilt;
    // Moon
    const moonGeometry = new THREE.IcosahedronGeometry(orbitalParameters.earth.moon.size, 12);
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(imageSources.moon.img)
    });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

    // Create a separate group for moon to handle its revolution
    const moonGroup = new THREE.Group();
    moonGroup.userData = { name: 'Moon' };
    moonGroup.add(moonMesh);

    // Position moon relative to earth
    moonGroup.position.setFromSpherical(
        new THREE.Spherical(
            orbitalParameters.earth.moon.radius,
            orbitalParameters.earth.moon.phi,
            orbitalParameters.earth.moon.theta
        )
    );

    // Add moon group to earth group
    earthGroup.add(moonGroup);
    moonGroup.rotation.z = orbitalParameters.earth.moon.tilt;

    // Mars
    const marsGroup = new THREE.Group();
    marsGroup.userData = { name: 'Mars', color: orbitColors.mars };
    const marsGeometry = new THREE.IcosahedronGeometry(orbitalParameters.mars.size, 12);
    const marsMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(imageSources.mars.img)
    });
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    marsGroup.add(mars);
    marsGroup.position.setFromSpherical(
        new THREE.Spherical(
            orbitalParameters.mars.radius,
            orbitalParameters.mars.phi,
            orbitalParameters.mars.theta
        )
    );
    marsGroup.rotation.z = orbitalParameters.mars.tilt;

    // Jupiter
    const jupiterGroup = new THREE.Group();
    jupiterGroup.userData = { name: 'Jupiter', color: orbitColors.jupiter };
    const jupiterGeometry = new THREE.IcosahedronGeometry(orbitalParameters.jupiter.size, 12);
    const jupiterMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(imageSources.jupiter.img),
    })
    const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    jupiterGroup.add(jupiter);
    jupiterGroup.position.setFromSpherical(
        new THREE.Spherical(
            orbitalParameters.jupiter.radius,
            orbitalParameters.jupiter.phi,
            orbitalParameters.jupiter.theta
        )
    )
    jupiterGroup.rotation.z = orbitalParameters.jupiter.tilt;

    // Saturn 
    const saturnGroup = new THREE.Group();
    saturnGroup.userData = { name: 'Saturn', color: orbitColors.saturn };
    const saturnGeometry = new THREE.IcosahedronGeometry(orbitalParameters.saturn.size, 12);
    const saturnMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(imageSources.saturn.img),
    })
    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
    saturnGroup.add(saturn);

    // Add Saturn's rings
    // Saturn Ring with radial UV correction
    const innerRadius = orbitalParameters.saturn.size * 1.4;
    const outerRadius = orbitalParameters.saturn.size * 2.4;

    const ringGeometry = new THREE.RingGeometry(
        innerRadius,
        outerRadius,
        64
    );

    // ---- Fix UVs based on radius ----
    const pos = ringGeometry.attributes.position;
    const uv = ringGeometry.attributes.uv;
    const v3 = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
        v3.fromBufferAttribute(pos, i);

        const radius = v3.length();
        const t = (radius - innerRadius) / (outerRadius - innerRadius);

        uv.setXY(i, t, 1);
    }

    uv.needsUpdate = true;

    // ---- Material ----
    const ringMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load(imageSources.saturn.ring),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        depthWrite: false
    });

    // ---- Mesh ----
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.renderOrder = 1;

    saturnGroup.add(ring);
    saturnGroup.position.setFromSpherical(
        new THREE.Spherical(
            orbitalParameters.saturn.radius,
            orbitalParameters.saturn.phi,
            orbitalParameters.saturn.theta,
        )
    )
    saturnGroup.rotation.z = orbitalParameters.saturn.tilt;

    // ---------------- URANUS ----------------
    const uranusGroup = new THREE.Group();
    uranusGroup.userData = { name: 'Uranus', color: orbitColors.uranus };

    // Planet
    const uranusGeometry = new THREE.IcosahedronGeometry(
        orbitalParameters.uranus.size,
        12
    );

    const uranusMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(imageSources.uranus.img),
    });

    const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
    uranusGroup.add(uranus);

    // Position & tilt
    uranusGroup.position.setFromSpherical(
        new THREE.Spherical(
            orbitalParameters.uranus.radius,
            orbitalParameters.uranus.phi,
            orbitalParameters.uranus.theta
        )
    );

    // Uranus axial tilt (~98°)
    uranusGroup.rotation.z = orbitalParameters.uranus.tilt;


    // ---------------- URANUS RINGS ----------------
    const innerUranusRadius = orbitalParameters.uranus.size * 1.2;
    const outerUranusRadius = orbitalParameters.uranus.size * 1.4;

    const uranusRingGeometry = new THREE.RingGeometry(
        innerUranusRadius,
        outerUranusRadius,
        64
    );

    // ---- FIX UVs (RADIAL MAPPING) ----
    const posi = uranusRingGeometry.attributes.position;
    const uvs = uranusRingGeometry.attributes.uv;
    const v3t = new THREE.Vector3();

    for (let i = 0; i < posi.count; i++) {
        v3t.fromBufferAttribute(posi, i);

        const radius = v3t.length();
        const t = (radius - innerUranusRadius) / (outerUranusRadius - innerUranusRadius);

        uvs.setXY(i, t, 0.5);
    }

    uvs.needsUpdate = true;


    // ---- TEXTURES ----
    const uranusRingColor = textureLoader.load(imageSources.uranus.ringColor);
    const uranusRingAlpha = textureLoader.load(imageSources.uranus.ringTrans);

    // Color space correctness
    uranusRingColor.colorSpace = THREE.SRGBColorSpace;
    uranusRingAlpha.colorSpace = THREE.NoColorSpace;


    // ---- MATERIAL ----
    const uranusRingMaterial = new THREE.MeshBasicMaterial({
        map: uranusRingColor,
        alphaMap: uranusRingAlpha,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });


    // ---- MESH ----
    const uranusRing = new THREE.Mesh(uranusRingGeometry, uranusRingMaterial);

    // Rings lie in planet equatorial plane
    uranusRing.rotation.x = Math.PI / 2;

    // Ensure correct draw order
    uranusRing.renderOrder = 1;

    uranusGroup.add(uranusRing);

    // Neptune
    const neptuneGroup = new THREE.Group();
    neptuneGroup.userData = { name: 'Neptune', color: orbitColors.neptune };
    const neptuneGeometry = new THREE.IcosahedronGeometry(orbitalParameters.neptune.size, 12);
    const neptuneMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(imageSources.neptune.img),
    })
    const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
    neptuneGroup.add(neptune);
    neptuneGroup.position.setFromSpherical(
        new THREE.Spherical(
            orbitalParameters.neptune.radius,
            orbitalParameters.neptune.phi,
            orbitalParameters.neptune.theta,
        )
    )
    neptuneGroup.rotation.z = orbitalParameters.neptune.tilt;

    const mercuryOrbit = addRevolutionLine(orbitalParameters.mercury.radius, orbitColors.mercury);
    const venusOrbit = addRevolutionLine(orbitalParameters.venus.radius, orbitColors.venus);
    const earthOrbit = addRevolutionLine(orbitalParameters.earth.radius, orbitColors.earth);
    const marsOrbit = addRevolutionLine(orbitalParameters.mars.radius, orbitColors.mars);
    const jupiterOrbit = addRevolutionLine(orbitalParameters.jupiter.radius, orbitColors.jupiter);
    const saturnOrbit = addRevolutionLine(orbitalParameters.saturn.radius, orbitColors.saturn);
    const uranusOrbit = addRevolutionLine(orbitalParameters.uranus.radius, orbitColors.uranus);
    const neptuneOrbit = addRevolutionLine(orbitalParameters.neptune.radius, orbitColors.uranus);

    const rotationBaseSpeed = 0.002;
    const revolutionBaseSpeed = 0.02;

    // Pre-allocated Spherical to avoid per-frame heap allocations
    const _spherical = new THREE.Spherical();

    function animatePlanets(timeScale = 1) {
        const r = rotationBaseSpeed * timeScale;
        const v = revolutionBaseSpeed * timeScale;

        // Mercury
        mercury.rotation.y += speed.rotationSpeeds.mercury * r;
        orbitalParameters.mercury.theta += speed.revolutionSpeeds.mercury * v;
        mercuryGroup.position.setFromSpherical(
            _spherical.set(orbitalParameters.mercury.radius, orbitalParameters.mercury.phi, orbitalParameters.mercury.theta)
        );

        // Venus
        venus.rotation.y += speed.rotationSpeeds.venus * r;
        venusAtmosphereMesh.rotation.y += speed.rotationSpeeds.venus * r;
        orbitalParameters.venus.theta += speed.revolutionSpeeds.venus * v;
        venusGroup.position.setFromSpherical(
            _spherical.set(orbitalParameters.venus.radius, orbitalParameters.venus.phi, orbitalParameters.venus.theta)
        );

        // Earth
        const earthRotationSpeed = speed.rotationSpeeds.earth * r;
        const cloudsSpeedMultiplier = 1.5;

        // Rotate day/night maps
        earth.rotation.y += earthRotationSpeed;

        // Rotate clouds slightly faster
        earthCloudsMesh.rotation.y += cloudsSpeedMultiplier * earthRotationSpeed;

        // Rotate Fresnel glow with Earth
        earthGlowMesh.rotation.y += earthRotationSpeed;

        // Update orbital position
        orbitalParameters.earth.theta += speed.revolutionSpeeds.earth * v;
        earthGroup.position.setFromSpherical(
            _spherical.set(orbitalParameters.earth.radius, orbitalParameters.earth.phi, orbitalParameters.earth.theta)
        );

        // Moon rotation and revolution
        moonMesh.rotation.y += 0.5 * r; // Moon's rotation (tidally locked)
        orbitalParameters.earth.moon.theta += 0.5 * v;
        moonGroup.position.setFromSpherical(
            _spherical.set(orbitalParameters.earth.moon.radius, orbitalParameters.earth.moon.phi, orbitalParameters.earth.moon.theta)
        );

        // Mars
        mars.rotation.y += speed.rotationSpeeds.mars * r;
        orbitalParameters.mars.theta += speed.revolutionSpeeds.mars * v;
        marsGroup.position.setFromSpherical(
            _spherical.set(orbitalParameters.mars.radius, orbitalParameters.mars.phi, orbitalParameters.mars.theta)
        );

        // Jupiter
        jupiter.rotation.y += speed.rotationSpeeds.jupiter * r;
        orbitalParameters.jupiter.theta += speed.revolutionSpeeds.jupiter * v;
        jupiterGroup.position.setFromSpherical(
            _spherical.set(orbitalParameters.jupiter.radius, orbitalParameters.jupiter.phi, orbitalParameters.jupiter.theta)
        );

        // Saturn
        saturn.rotation.y += speed.rotationSpeeds.saturn * r;
        orbitalParameters.saturn.theta += speed.revolutionSpeeds.saturn * v;
        saturnGroup.position.setFromSpherical(
            _spherical.set(orbitalParameters.saturn.radius, orbitalParameters.saturn.phi, orbitalParameters.saturn.theta)
        );

        // Uranus
        uranus.rotation.y += speed.rotationSpeeds.uranus * r;
        orbitalParameters.uranus.theta += speed.revolutionSpeeds.uranus * v; // Fixed: was incorrectly using saturn speed
        uranusGroup.position.setFromSpherical(
            _spherical.set(orbitalParameters.uranus.radius, orbitalParameters.uranus.phi, orbitalParameters.uranus.theta)
        );

        // Neptune
        neptune.rotation.y += speed.rotationSpeeds.neptune * r;
        orbitalParameters.neptune.theta += speed.revolutionSpeeds.neptune * v;
        neptuneGroup.position.setFromSpherical(
            _spherical.set(orbitalParameters.neptune.radius, orbitalParameters.neptune.phi, orbitalParameters.neptune.theta)
        );
    }

    // Return all the planets group and moon (for click / infocard)
    return {
        planets: [mercuryGroup, venusGroup, earthGroup, marsGroup, jupiterGroup, saturnGroup, uranusGroup, neptuneGroup],
        orbits: [mercuryOrbit, venusOrbit, earthOrbit, marsOrbit, jupiterOrbit, saturnOrbit, uranusOrbit, neptuneOrbit],
        animatePlanets,
        moons: [moonGroup]
    }
}


function addRevolutionLine(radius, color) {
    const material = new THREE.LineDashedMaterial({
        color: color,
        dashSize: 0.03,
        gapSize: 0.03,
    });
    const segments = 128;
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * 2 * Math.PI;  // Will distribute the line points following the theta angle as in spehrical coordinate system.
        vertices.push(radius * Math.cos(theta), 0, radius * Math.sin(theta)); // Convert from spehrical to catesian
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices.flat(), 3))
    const line = new THREE.LineLoop(geometry, material);
    line.computeLineDistances();
    return line;
}