import * as THREE from 'three';

const celestialData = {
  Sun: {
    name: 'Matahari',
    type: 'Bintang',
    description: 'Bintang di pusat Tata Surya kita. Menyusun sekitar 99,86% massa sistem.',
    orbit: null,
    atmosphere: 'Tidak ada permukaan padat. "Atmosfer" terluar terdiri dari fotosfer (permukaan tampak, ~5.800 K), kromosfer, dan korona. Korona: plasma terionisasi tinggi (H, He, Fe); 1–3 MK; memanjang jutaan km ke angkasa sebagai angin surya.',
    layers: [
      { name: 'Inti', composition: 'Hidrogen (fusi menjadi helium), logam renik. ~15,7 MK, massa jenis ~150 g/cm³.' },
      { name: 'Zona radiatif', composition: 'Hidrogen, helium. Energi diangkut oleh radiasi. Massa jenis dan suhu menurun ke luar.' },
      { name: 'Zona konvektif', composition: 'Hidrogen, helium. Energi diangkut oleh konveksi (plasma naik/turun).' },
      { name: 'Fotosfer', composition: 'Permukaan tampak — lapisan plasma tipis, ~5.800 K. H, He, plus garis spektral logam.' },
      { name: 'Kromosfer', composition: 'Cahaya kemerahan di atas fotosfer. H, He; suhu naik hingga ~20.000 K.' },
      { name: 'Korona', composition: 'Atmosfer terluar — plasma terionisasi tinggi (H, He, Fe). 1–3 MK; memanjang jutaan km.' },
    ],
  },
  Mercury: {
    name: 'Merkurius',
    type: 'Planet kebumian',
    description: 'Planet terkecil dan paling dalam. Hampir tidak punya atmosfer; perbedaan suhu siang–malam ekstrem.',
    orbit: {
      semiMajorAxis: '0,39 SA',
      period: '88 hari Bumi',
      eccentricity: '0,21',
      inclination: '7,0°',
    },
    atmosphere: 'Hanya eksosfer sangat tipis. Jejak oksigen, natrium, hidrogen, helium, dan kalium (terlepas dari permukaan oleh angin surya dan mikrometeorit). Tekanan permukaan hampir nol; tidak ada cuaca atau erosi dari atmosfer.',
    layers: [
      { name: 'Kerak', composition: 'Silikat, regolit; banyak kawah. Kerak paling tipis di antara planet kebumian.' },
      { name: 'Mantel', composition: 'Silikat (olivin, piroksen). Mantel relatif tipis.' },
      { name: 'Inti', composition: 'Besi–nikel; inti luar cair besar dan inti dalam padat. Inti ~60% radius.' },
    ],
  },
  Venus: {
    name: 'Venus',
    type: 'Planet kebumian',
    description: 'Planet kedua dari Matahari. Atmosfer CO₂ padat dan efek rumah kaca tak terkendali; permukaan terpanas di Tata Surya.',
    orbit: {
      semiMajorAxis: '0,72 SA',
      period: '225 hari Bumi',
      eccentricity: '0,007',
      inclination: '3,4°',
    },
    atmosphere: 'CO₂ padat (~96,5%), N₂ (~3,5%); jejak SO₂, CO, uap air, argon. Tekanan permukaan ~92 bar (90× Bumi). Awan asam sulfat di atmosfer atas. Efek rumah kaca tak terkendali; suhu permukaan ~465 °C.',
    layers: [
      { name: 'Kerak', composition: 'Batuan basalt, silikat. Permukaan muda, vulkanisme.' },
      { name: 'Mantel', composition: 'Silikat (mirip mantel Bumi). Konvektif.' },
      { name: 'Inti', composition: 'Besi–nikel; kemungkinan sebagian cair. Tidak ada medan magnet global.' },
    ],
  },
  Earth: {
    name: 'Bumi',
    type: 'Planet kebumian',
    description: 'Rumah kita. Satu-satunya planet yang diketahui memiliki air cair dan kehidupan.',
    orbit: {
      semiMajorAxis: '1,00 SA',
      period: '365,25 hari',
      eccentricity: '0,017',
      inclination: '0°',
    },
    atmosphere: 'Nitrogen (~78%), oksigen (~21%), argon (~1%); jejak CO₂, uap air, neon. Tekanan permukaan ~1 bar. Lapisan ozon menyerap UV. Melindungi permukaan dan mendukung kehidupan; cuaca dan iklim digerakkan oleh pemanasan surya dan rotasi.',
    layers: [
      { name: 'Kerak', composition: 'Samudra: basalt (Fe, Mg, Si). Benua: granit (Si, Al, K, Na). Tebal 5–70 km.' },
      { name: 'Mantel', composition: 'Silikat (peridotit — olivin, piroksen). Padat tetapi berkonveksi dalam skala waktu panjang.' },
      { name: 'Inti luar', composition: 'Besi–nikel cair, ~10% unsur lebih ringan (S, O). Konveksi menggerakkan medan magnet.' },
      { name: 'Inti dalam', composition: 'Besi–nikel padat. Tumbuh perlahan seiring pendinginan planet.' },
    ],
  },
  Moon: {
    name: 'Bulan',
    type: 'Satelit alami',
    description: 'Satu-satunya satelit alami Bumi. Terkunci pasang-surut; sisi yang sama selalu menghadap Bumi. Terbentuk dari puing setelah tabrakan raksasa.',
    orbit: {
      semiMajorAxis: '~384.400 km (dari Bumi)',
      period: '27,3 hari Bumi',
      eccentricity: '0,055',
      inclination: '5,1° ke ekliptika',
    },
    atmosphere: 'Tidak ada atmosfer nyata. Eksosfer sangat tipis di permukaan: helium, neon, argon (dari angin surya dan peluruhan radioaktif). Total massa gas hanya beberapa ton; tekanan ~10⁻¹² bar. Tidak ada cuaca atau erosi dari udara.',
    layers: [
      { name: 'Kerak', composition: 'Silikat (dataran tinggi anortosit, maria basalt). Lebih tebal di sisi jauh.' },
      { name: 'Mantel', composition: 'Silikat (olivin, piroksen). Lapisan sebagian leleh mungkin (gempa bulan dalam).' },
      { name: 'Inti', composition: 'Inti dalam kaya besi kecil, inti luar fluida. Medan magnet global lemah atau tidak ada saat ini.' },
    ],
  },
  Mars: {
    name: 'Mars',
    type: 'Planet kebumian',
    description: 'Planet Merah. Berbatu, dengan tudung es kutub dan bukti air di masa lalu.',
    orbit: {
      semiMajorAxis: '1,52 SA',
      period: '687 hari Bumi',
      eccentricity: '0,09',
      inclination: '1,9°',
    },
    atmosphere: 'Atmosfer tipis: CO₂ (~95%), N₂ (~2,8%), Ar; jejak O₂, CO, uap air. Tekanan permukaan ~0,006 bar (0,6% Bumi). Badai debu, awan es air dan CO₂. Dingin dan kering; tidak ada air cair di permukaan saat ini.',
    layers: [
      { name: 'Kerak', composition: 'Batuan basalt, besi oksida (karat). Rata-rata lebih tebal dari Bumi.' },
      { name: 'Mantel', composition: 'Silikat (olivin, piroksen). Sebagian leleh di masa lalu.' },
      { name: 'Inti', composition: 'Besi dengan belerang signifikan; kemungkinan cair atau sebagian cair. Dinamo global lemah atau tidak ada.' },
    ],
  },
  Jupiter: {
    name: 'Yupiter',
    type: 'Raksasa gas',
    description: 'Planet terbesar. Tidak ada permukaan padat; didominasi hidrogen dan helium dengan inti batuan yang mungkin.',
    orbit: {
      semiMajorAxis: '5,2 SA',
      period: '~12 tahun',
      eccentricity: '0,05',
      inclination: '1,3°',
    },
    atmosphere: 'Tidak ada permukaan padat; atmosfer atas H₂ (~90%), He (~10%). Lapisan awan: amonia (NH₃), hidrosulfida amonium, uap air pada kedalaman berbeda. Sabuk kuat, aliran jet, Bintik Merah Besar. Tekanan dan suhu naik dengan kedalaman ke lapisan fluida.',
    layers: [
      { name: 'Atmosfer', composition: 'Hidrogen (~90%), helium (~10%). Lapisan awan: amonia (NH₃), hidrosulfida amonium, uap air.' },
      { name: 'Hidrogen cair', composition: 'Hidrogen molekuler (H₂). Beralih dari gas ke cair dengan kedalaman.' },
      { name: 'Hidrogen logam', composition: 'Hidrogen terionisasi (proton, elektron). Konduktif; menghasilkan medan magnet kuat.' },
      { name: 'Inti', composition: 'Batuan, es, dan logam (besi, silikat). Diperkirakan 10–20 massa Bumi.' },
    ],
  },
  Saturn: {
    name: 'Saturnus',
    type: 'Raksasa gas',
    description: 'Terkenal akan cincinnya. Massa jenis terendah di antara planet; akan mengapung di air.',
    orbit: {
      semiMajorAxis: '9,5 SA',
      period: '~29 tahun',
      eccentricity: '0,06',
      inclination: '2,5°',
    },
    atmosphere: 'Atmosfer atas: H₂ (~96%), He (~3%); amonia, metana. Struktur bersabuk dan badai (mis. jet heksagonal di kutub utara). Tidak ada permukaan padat; atmosfer berangsur mengental menjadi hidrogen cair dan logam dengan kedalaman.',
    layers: [
      { name: 'Atmosfer', composition: 'Hidrogen (~96%), helium (~3%). Amonia, metana; awan bersabuk.' },
      { name: 'Hidrogen cair', composition: 'Hidrogen molekuler. Lapisan tebal seiring naiknya tekanan.' },
      { name: 'Hidrogen logam', composition: 'Hidrogen terionisasi. Lebih tipis dari Yupiter; tetap menggerakkan medan magnet.' },
      { name: 'Inti', composition: 'Batuan dan es (air, amonia, metana). ~15–20 massa Bumi.' },
    ],
  },
  Uranus: {
    name: 'Uranus',
    type: 'Raksasa es',
    description: 'Mengorbit miring. Biru-hijau dari metana; es dan batuan mendominasi di bawah atmosfer.',
    orbit: {
      semiMajorAxis: '19,2 SA',
      period: '~84 tahun',
      eccentricity: '0,05',
      inclination: '0,8°',
    },
    atmosphere: 'H₂ (~83%), He (~15%), CH₄ (~2%). Metana menyerap cahaya merah, memberi warna biru-hijau. Relatif tanpa fitur; sedikit badai. Tidak ada permukaan padat; atmosfer beralih ke interior es/batuan.',
    layers: [
      { name: 'Atmosfer', composition: 'Hidrogen (~83%), helium (~15%), metana (~2%). Metana menyerap cahaya merah.' },
      { name: 'Mantel (lapisan es)', composition: 'Air (H₂O), amonia (NH₃), metana (CH₄) — "es" dalam bentuk fluida panas dan padat.' },
      { name: 'Inti', composition: 'Batuan (silikat, logam) dan es. Batas tidak jelas.' },
    ],
  },
  Neptune: {
    name: 'Neptunus',
    type: 'Raksasa es',
    description: 'Planet utama paling jauh. Berangin, biru; cuaca dinamis dan interior hangat.',
    orbit: {
      semiMajorAxis: '30,1 SA',
      period: '~165 tahun',
      eccentricity: '0,009',
      inclination: '1,8°',
    },
    atmosphere: 'H₂, He, CH₄. Metana memberi warna biru. Sangat berangin; angin tercepat di Tata Surya (~2.100 km/jam). Badai dinamis (Bintik Gelap Besar, dll.). Tidak ada permukaan padat; atmosfer berubah menjadi mantel/core fluida/es padat.',
    layers: [
      { name: 'Atmosfer', composition: 'Hidrogen, helium, metana. Angin dan badai kuat (mis. Bintik Gelap Besar).' },
      { name: 'Mantel (lapisan es)', composition: 'Es air, amonia, metana — fluida superkritis pada P dan T tinggi.' },
      { name: 'Inti', composition: 'Batuan dan logam. Mirip struktur Uranus tetapi lebih aktif secara internal.' },
    ],
  },
};

let cardEl = null;
let scene = null;
let camera = null;
let renderer = null;
let planetMesh = null;
let animationId = null;
let currentView = 'planet'; // 'planet' or 'layers'
let currentPlanetName = null;
let layersMesh = null;

function ensureCard() {
  if (cardEl) return cardEl;
  cardEl = document.createElement('div');
  cardEl.id = 'infocard';
  cardEl.setAttribute('aria-hidden', 'true');
  cardEl.innerHTML = `
    <button type="button" id="infocard-close" aria-label="Tutup infocard">&times;</button>
    <div class="infocard-header">
      <h2 id="infocard-title"></h2>
      <p id="infocard-type" class="infocard-type"></p>
      <p id="infocard-desc" class="infocard-desc"></p>
    </div>
    <div class="infocard-scroll-wrap">
      <div class="infocard-visual-container">
        <canvas id="infocard-canvas"></canvas>
        <!-- Layers toggle disabled for now
        <div class="infocard-view-toggle">
          <button class="toggle-btn active" data-view="planet">Planet</button>
          <button class="toggle-btn" data-view="layers">Layers</button>
        </div>
        -->
      </div>
      <div id="infocard-orbit" class="infocard-section"></div>
      <div id="infocard-atmosphere" class="infocard-section"></div>
      <div id="infocard-layers" class="infocard-section"></div>
    </div>
  `;
  document.body.appendChild(cardEl);

  const closeBtn = cardEl.querySelector('#infocard-close');
  closeBtn.addEventListener('click', hide);

  // Toggle buttons
  const toggleBtns = cardEl.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
    });
  });

  return cardEl;
}

function switchView(view) {
  if (view === currentView) return;

  currentView = view;
  const toggleBtns = cardEl.querySelectorAll('.toggle-btn');

  toggleBtns.forEach(btn => {
    if (btn.getAttribute('data-view') === view) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (view === 'layers') {
    // Hide planet, show layers
    if (planetMesh) planetMesh.visible = false;
    if (!layersMesh && currentPlanetName) {
      layersMesh = createLayersMesh(currentPlanetName);
      if (layersMesh) scene.add(layersMesh);
    } else if (layersMesh) {
      layersMesh.visible = true;
    }
  } else {
    // Show planet, hide layers
    if (planetMesh) planetMesh.visible = true;
    if (layersMesh) layersMesh.visible = false;
  }
}

function createLayersMesh(planetName) {
  const data = celestialData[planetName];
  if (!data || !data.layers || data.layers.length === 0) return null;

  const layersGroup = new THREE.Group();
  const numLayers = data.layers.length;

  // Color palette for layers
  const colors = [
    0xff6b6b, // Core - red
    0xffa500, // Mantle - orange
    0xffff00, // Outer layer - yellow
    0x4ecdc4, // Atmosphere - cyan
    0x95e1d3, // Upper atmosphere - light cyan
    0xc7ecee  // Outermost - very light cyan
  ];

  // Create hemisphere cross-section
  for (let i = 0; i < numLayers; i++) {
    const radius = 1 - (i / numLayers) * 0.9; // From 1.0 (core) to 0.1 (outer)
    const color = colors[numLayers - 1 - i] || 0x888888;

    const geometry = new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI); // Hemisphere
    const material = new THREE.MeshStandardMaterial({
      color: color,
      side: THREE.DoubleSide,
      metalness: 0.2,
      roughness: 0.7,
      transparent: false
    });

    const hemisphere = new THREE.Mesh(geometry, material);
    hemisphere.rotation.y = -Math.PI / 2; // Orient to show cross-section
    layersGroup.add(hemisphere);
  }

  return layersGroup;
}

function setupRenderer() {
  if (renderer) return; // Already set up

  const canvas = cardEl.querySelector('#infocard-canvas');
  const container = cardEl.querySelector('.infocard-visual-container');

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050508);

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight, // Match container aspect
    0.1,
    1000
  );
  camera.position.set(0, 0, 8);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true  // Enable alpha for transparent materials
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.sortObjects = true;  // Ensure transparent objects render correctly


  // Lighting - brighter setup for better planet visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Increased from 0.3
  scene.add(ambientLight);

  const mainLight = new THREE.PointLight(0xffffff, 2.0, 100); // Increased from 1.5
  mainLight.position.set(5, 3, 5);
  scene.add(mainLight);

  const fillLight = new THREE.PointLight(0x88ccff, 1.0, 100); // Increased from 0.5
  fillLight.position.set(-5, -3, -5);
  scene.add(fillLight);

  // Add rim light for better definition
  const rimLight = new THREE.PointLight(0xffffff, 1.5, 100);
  rimLight.position.set(0, 5, -5);
  scene.add(rimLight);
}

function clonePlanetMesh(original) {
  // Collect original materials in traversal order
  const originalMaterials = [];
  original.traverse((child) => {
    if (child.isMesh && child.material) {
      originalMaterials.push(child.material);
    }
  });

  // Clone the entire group
  const cloned = original.clone(true);

  // Restore materials in same traversal order
  let index = 0;
  cloned.traverse((child) => {
    if (child.isMesh && index < originalMaterials.length) {
      child.material = originalMaterials[index];
      index++;
    }
  });

  return cloned;
}



function renderPlanet(originalPlanet) {
  if (!renderer) setupRenderer();

  // Clear previous planet
  if (planetMesh) {
    scene.remove(planetMesh);
    planetMesh.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }

  // Clone and add new planet
  planetMesh = clonePlanetMesh(originalPlanet);
  planetMesh.position.set(0, 0, 0);

  scene.add(planetMesh);

  // Adjust camera distance based on planet size
  const box = new THREE.Box3().setFromObject(planetMesh);
  const size = box.getSize(new THREE.Vector3()).length();
  const distance = size * 2.5;
  camera.position.set(0, 0, distance);
  camera.lookAt(0, 0, 0);

  // Start animation
  startAnimation();
}

function startAnimation() {
  if (animationId) cancelAnimationFrame(animationId);

  function animate() {
    if (!renderer || !scene || !camera) return;

    // Rotate planet
    if (planetMesh) {
      planetMesh.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }

  animate();
}

function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function cleanupRenderer() {
  stopAnimation();

  if (planetMesh) {
    scene.remove(planetMesh);
    planetMesh.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
    planetMesh = null;
  }

  if (renderer) {
    renderer.dispose();
    renderer = null;
  }

  scene = null;
  camera = null;
}

function renderOrbit(container, orbit) {
  if (!orbit) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = `
    <h3 class="infocard-section-title">Orbit</h3>
    <dl class="infocard-dl">
      <dt>Sumbu semi-mayor</dt><dd>${orbit.semiMajorAxis}</dd>
      <dt>Periode orbit</dt><dd>${orbit.period}</dd>
      <dt>Eksentrisitas</dt><dd>${orbit.eccentricity}</dd>
      <dt>Inklinasi</dt><dd>${orbit.inclination}</dd>
    </dl>
  `;
}

function renderAtmosphere(container, atmosphere) {
  if (!atmosphere) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = `
    <h3 class="infocard-section-title">Atmosfer</h3>
    <p class="infocard-atmosphere-text">${atmosphere}</p>
  `;
}

function renderLayers(container, layers) {
  if (!layers || !layers.length) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = `
    <h3 class="infocard-section-title">Struktur internal & komposisi</h3>
    <div class="infocard-layers-list">
      ${layers.map((layer, i) => `
        <div class="infocard-layer" data-layer="${i}">
          <h4 class="infocard-layer-name">${layer.name}</h4>
          <p class="infocard-layer-composition">${layer.composition}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Tampilkan infocard untuk benda langit.
 * @param {string} name - Nama benda (mis. 'Earth', 'Sun'). Harus ada di celestialData.
 * @param {THREE.Object3D} planetObject - The planet mesh/group from the main scene
 */
export function show(name, planetObject) {
  const data = celestialData[name];
  if (!data) return;

  const el = ensureCard();
  currentPlanetName = name; // Store for layer generation

  el.querySelector('#infocard-title').textContent = data.name;
  el.querySelector('#infocard-type').textContent = data.type;
  el.querySelector('#infocard-desc').textContent = data.description;

  renderOrbit(el.querySelector('#infocard-orbit'), data.orbit);
  renderAtmosphere(el.querySelector('#infocard-atmosphere'), data.atmosphere);
  renderLayers(el.querySelector('#infocard-layers'), data.layers);

  // Render planet visual
  if (planetObject) {
    renderPlanet(planetObject);
  }

  // Reset to planet view
  currentView = 'planet';
  const toggleBtns = el.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === 'planet');
  });

  // Clean up old layers if switching planets
  if (layersMesh) {
    scene.remove(layersMesh);
    layersMesh.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
    layersMesh = null;
  }

  el.setAttribute('aria-hidden', 'false');
  el.classList.add('infocard-visible');

  // Notify main.js to adjust camera
  window.dispatchEvent(new CustomEvent('infocard-toggled', { detail: { visible: true } }));
}

/**
 * Sembunyikan infocard.
 */
export function hide() {
  if (!cardEl) return;
  cardEl.classList.remove('infocard-visible');
  cardEl.setAttribute('aria-hidden', 'true');

  // Cleanup Three.js resources
  cleanupRenderer();

  // Notify main.js to reset camera
  window.dispatchEvent(new CustomEvent('infocard-toggled', { detail: { visible: false } }));
}
