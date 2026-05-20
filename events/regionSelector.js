/**
 * regionSelector.js
 * A dropdown button that lists solar system regions.
 * When a region is selected it gets highlighted and a rich infocard appears.
 */
import { hide as hideInfocard } from './infocard.js';

const REGIONS = [
  {
    id: 'inner-planets',
    label: 'Planet Dalam',
    color: '#ff9944',
    gradient: 'linear-gradient(135deg, rgba(255,153,68,0.18) 0%, rgba(255,80,30,0.08) 100%)',
    borderColor: 'rgba(255,153,68,0.5)',
    accentColor: '#ff9944',
    description:
      'Wilayah tata surya bagian dalam terdiri dari empat planet berbatu: Merkurius, Venus, Bumi, dan Mars. Planet-planet ini mengorbit relatif dekat dengan Matahari, memiliki permukaan padat, serta kepadatan tinggi dibanding planet luar.',
    stats: [
      { label: 'Jumlah planet', value: '4' },
      { label: 'Jarak dari Matahari', value: '0.39 – 1.52 AU' },
      { label: 'Tipe dominan', value: 'Planet terestrial (berbatu)' },
      { label: 'Suhu permukaan', value: '-88°C hingga +465°C' },
    ],
    members: ['Merkurius', 'Venus', 'Bumi', 'Mars'],
    highlights: [
      'Memiliki permukaan padat dengan kawah, gunung, dan lembah',
      'Aktivitas vulkanik dan tektonik membentuk banyak wilayah permukaan',
      'Bumi menjadi satu-satunya planet yang diketahui mendukung kehidupan',
      'Terpapar radiasi dan angin Matahari yang lebih kuat dibanding planet luar',
    ],
    funFact:
      'Gabungan massa seluruh planet dalam masih jauh lebih kecil dibanding massa Jupiter.',
  },
  {
    id: 'asteroid-belt',
    label: 'Sabuk Asteroid',
    color: '#aabbcc',
    gradient: 'linear-gradient(135deg, rgba(170,187,204,0.18) 0%, rgba(100,120,140,0.08) 100%)',
    borderColor: 'rgba(170,187,204,0.5)',
    accentColor: '#aabbcc',
    description:
      'Sabuk Asteroid berada di antara orbit Mars dan Jupiter. Wilayah ini dipenuhi jutaan objek berbatu dan logam yang merupakan sisa pembentukan awal tata surya, termasuk planet kerdil Ceres.',
    stats: [
      { label: 'Lokasi', value: '2.2 – 3.2 AU' },
      { label: 'Objek terbesar', value: 'Ceres' },
      { label: 'Total massa', value: '~4% massa Bulan' },
      { label: 'Objek teridentifikasi', value: 'Jutaan asteroid' },
    ],
    members: ['Ceres', 'Vesta', 'Pallas', 'Hygiea', '+ jutaan lainnya'],
    highlights: [
      'Menjadi rumah bagi planet kerdil Ceres',
      'Berisi asteroid kaya karbon, silikat, dan logam',
      'Sebagian besar meteorit yang jatuh ke Bumi berasal dari wilayah ini',
      'Gravitasi Jupiter menghambat pembentukan planet baru di area sabuk',
    ],
    funFact:
      'Jika seluruh asteroid di sabuk ini digabungkan, massanya tetap lebih kecil dari Bulan Bumi.',
  },
  {
    id: 'outer-planets',
    label: 'Planet Luar',
    color: '#88ccff',
    gradient: 'linear-gradient(135deg, rgba(136,204,255,0.18) 0%, rgba(50,100,200,0.08) 100%)',
    borderColor: 'rgba(136,204,255,0.5)',
    accentColor: '#88ccff',
    description:
      'Di luar Sabuk Asteroid terdapat empat planet raksasa: Jupiter, Saturnus, Uranus, dan Neptunus. Jupiter dan Saturnus tergolong raksasa gas, sedangkan Uranus dan Neptunus dikenal sebagai raksasa es.',
    stats: [
      { label: 'Jumlah planet', value: '4' },
      { label: 'Jarak dari Matahari', value: '5.2 – 30 AU' },
      { label: 'Jenis utama', value: 'Raksasa gas & raksasa es' },
      { label: 'Satelit alami diketahui', value: '200+' },
    ],
    members: ['Jupiter', 'Saturnus', 'Uranus', 'Neptunus'],
    highlights: [
      'Menyimpan sebagian besar massa planet di tata surya',
      'Memiliki sistem cincin yang kompleks',
      'Beberapa bulan es diperkirakan memiliki lautan bawah permukaan',
      'Badai raksasa dapat berlangsung selama puluhan hingga ratusan tahun',
    ],
    funFact:
      'Medan magnet Jupiter termasuk yang paling kuat di tata surya dan sekitar 20.000 kali lebih kuat daripada Bumi.',
  },
  {
    id: 'kuiper-belt',
    label: 'Sabuk Kuiper',
    color: '#77eeff',
    gradient: 'linear-gradient(135deg, rgba(119,238,255,0.18) 0%, rgba(30,100,150,0.08) 100%)',
    borderColor: 'rgba(119,238,255,0.5)',
    accentColor: '#77eeff',
    description:
      'Sabuk Kuiper adalah wilayah luas di luar orbit Neptunus yang dipenuhi objek es sisa pembentukan tata surya awal. Wilayah ini menjadi tempat berbagai planet kerdil, termasuk Pluto, Haumea, dan Makemake.',
    stats: [
      { label: 'Lokasi', value: '30 – 50 AU' },
      { label: 'Objek penting', value: 'Pluto, Haumea, Makemake, Eris' },
      { label: 'Perkiraan objek besar', value: '100.000+' },
      { label: 'Suhu rata-rata', value: '~-220°C' },
    ],
    members: ['Pluto', 'Makemake', 'Haumea', 'Eris', '+ banyak objek Kuiper'],
    highlights: [
      'Dipenuhi objek es purba dari masa awal tata surya',
      'Menjadi sumber utama komet periode pendek',
      'Pluto dipelajari langsung oleh pesawat ruang angkasa New Horizons pada tahun 2015',
      'Diduga masih menyimpan objek besar yang belum terdeteksi',
    ],
    funFact:
      'Sabuk Kuiper jauh lebih luas dan diperkirakan jauh lebih masif dibanding Sabuk Asteroid.',
  },
];

let wrapperEl = null;
let dropdownEl = null;
let infocardEl = null;
let activeRegionId = null;
let isDropdownOpen = false;

// ─── Helper: convert hex color to rgba() string ──────────────────────────────
function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ─── Build region infocard ────────────────────────────────────────────────────
function buildInfocard(region) {
  return `
    <div class="region-infocard-inner" style="--region-accent:${region.accentColor}; --region-border:${region.borderColor};">
      <button class="region-infocard-close" id="region-infocard-close" aria-label="Tutup info wilayah">×</button>

      <div class="region-infocard-header">
        <h2 class="region-infocard-title">${region.label}</h2>
        <p class="region-infocard-subtitle">Wilayah Tata Surya</p>
      </div>

      <div class="region-infocard-scroll-wrap">
        <p class="region-infocard-desc">${region.description}</p>

        <div class="region-stat-grid">
          ${region.stats
            .map(
              s => `
            <div class="region-stat-card">
              <span class="region-stat-label">${s.label}</span>
              <span class="region-stat-value">${s.value}</span>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="region-section">
          <h3 class="region-section-title">Sorotan Utama</h3>
          <ul class="region-highlights-list">
            ${region.highlights.map(h => `<li class="region-highlight-item">${h}</li>`).join('')}
          </ul>
        </div>

        <div class="region-section">
          <h3 class="region-section-title">Anggota</h3>
          <div class="region-members-row">
            ${region.members.map(m => `<span class="region-member-tag">${m}</span>`).join('')}
          </div>
        </div>

        <div class="region-funfact">
          <span class="region-funfact-label">Fun Fact</span>
          <p class="region-funfact-text">${region.funFact}</p>
        </div>
      </div>
    </div>
  `;
}

// ─── Show region infocard ─────────────────────────────────────────────────────
function showRegionInfocard(region) {
  if (!infocardEl) return;

  // Hide planet infocard if open
  hideInfocard();

  infocardEl.innerHTML = buildInfocard(region);
  infocardEl.classList.add('region-infocard-visible');

  const closeBtn = infocardEl.querySelector('#region-infocard-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideRegionInfocard);
  }

  // Notify system (e.g. for hiding other UI elements)
  window.dispatchEvent(new CustomEvent('infocard-toggled', { detail: { visible: true } }));
}

export function hideRegionInfocard() {
  if (!infocardEl) return;
  infocardEl.classList.remove('region-infocard-visible');
  activeRegionId = null;

  // Notify system
  window.dispatchEvent(new CustomEvent('infocard-toggled', { detail: { visible: false } }));

  // Remove highlight from all items using their stored removeActive fn
  if (dropdownEl) {
    dropdownEl.querySelectorAll('.region-dropdown-item').forEach(item => {
      if (item._removeActive) item._removeActive();
      else {
        item.classList.remove('region-item-active');
        item.style.background = '';
        item.style.color = '';
        item.style.borderColor = '';
      }
    });
  }
}

// ─── Build dropdown items ─────────────────────────────────────────────────────
function buildDropdown() {
  // Don't wipe the label — only append item buttons after it
  REGIONS.forEach(region => {
    const item = document.createElement('button');
    item.className = 'region-dropdown-item';
    item.dataset.regionId = region.id;
    item.innerHTML = `
      <span class="region-item-label">${region.label}</span>
      <span class="region-item-arrow">›</span>
    `;

    function applyActive() {
      item.classList.add('region-item-active');
      item.style.background = `linear-gradient(135deg, ${hexToRgba(region.accentColor, 0.2)} 0%, ${hexToRgba(region.accentColor, 0.08)} 100%)`;
      item.style.color = region.accentColor;
      item.style.borderColor = hexToRgba(region.accentColor, 0.4);
    }

    function removeActive() {
      item.classList.remove('region-item-active');
      item.style.background = '';
      item.style.color = '';
      item.style.borderColor = '';
    }

    item.addEventListener('click', e => {
      e.stopPropagation();

      const alreadyActive = activeRegionId === region.id;

      // Reset all items
      dropdownEl.querySelectorAll('.region-dropdown-item').forEach(el => {
        el.classList.remove('region-item-active');
        el.style.background = '';
        el.style.color = '';
        el.style.borderColor = '';
      });

      if (alreadyActive) {
        activeRegionId = null;
        hideRegionInfocard();
      } else {
        activeRegionId = region.id;
        applyActive();
        showRegionInfocard(region);
        closeDropdown();
      }
    });

    // Re-apply active state when dropdown reopens (if this region is selected)
    item._applyActive = applyActive;
    item._removeActive = removeActive;
    item._regionId = region.id;

    dropdownEl.appendChild(item);
  });
}

// ─── Dropdown open / close ────────────────────────────────────────────────────
function openDropdown() {
  isDropdownOpen = true;
  dropdownEl.classList.remove('region-dropdown-hidden');
  dropdownEl.classList.add('region-dropdown-open');
  wrapperEl.querySelector('#region-selector-btn').classList.add('region-btn-active');
  // Re-apply active highlight on the previously selected item
  dropdownEl.querySelectorAll('.region-dropdown-item').forEach(item => {
    if (item._regionId === activeRegionId && item._applyActive) {
      item._applyActive();
    }
  });
}

function closeDropdown() {
  isDropdownOpen = false;
  dropdownEl.classList.remove('region-dropdown-open');
  dropdownEl.classList.add('region-dropdown-hidden');
  wrapperEl.querySelector('#region-selector-btn').classList.remove('region-btn-active');
}

function toggleDropdown(e) {
  e.stopPropagation();
  if (isDropdownOpen) {
    closeDropdown();
  } else {
    openDropdown();
  }
}

// ─── Public init ──────────────────────────────────────────────────────────────
export function initRegionSelector() {
  // Wrapper
  wrapperEl = document.createElement('div');
  wrapperEl.id = 'region-selector-wrapper';
  wrapperEl.className = 'region-selector-wrapper game-ui-hidden';

  // Trigger button
  const btn = document.createElement('button');
  btn.id = 'region-selector-btn';
  btn.className = 'region-selector-btn';
  btn.setAttribute('aria-label', 'Jelajahi Wilayah Tata Surya');
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
    <span class="region-btn-text">Wilayah</span>
    <svg class="region-btn-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `;

  // Dropdown
  dropdownEl = document.createElement('div');
  dropdownEl.id = 'region-dropdown';
  dropdownEl.className = 'region-dropdown region-dropdown-hidden';
  dropdownEl.innerHTML = `<div class="region-dropdown-label">Wilayah Tata Surya</div>`;

  buildDropdown();

  wrapperEl.appendChild(btn);
  wrapperEl.appendChild(dropdownEl);
  document.body.appendChild(wrapperEl);

  // Region infocard (separate to avoid dropdown overlap)
  infocardEl = document.createElement('div');
  infocardEl.id = 'region-infocard';
  infocardEl.className = 'region-infocard';
  document.body.appendChild(infocardEl);

  // Events
  btn.addEventListener('click', toggleDropdown);

  window.addEventListener('click', e => {
    if (!wrapperEl.contains(e.target)) {
      closeDropdown();
    }
  });

  // Hide the region button whenever the planet infocard is open
  window.addEventListener('infocard-toggled', e => {
    if (e.detail.visible) {
      closeDropdown();
      wrapperEl.classList.add('region-selector-hidden');
    } else {
      wrapperEl.classList.remove('region-selector-hidden');
    }
  });

  return { wrapper: wrapperEl, infocard: infocardEl };
}
