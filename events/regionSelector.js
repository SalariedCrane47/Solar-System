/**
 * regionSelector.js
 * A dropdown button that lists solar system regions.
 * When a region is selected it gets highlighted and a rich infocard appears.
 */

const REGIONS = [
  {
    id: 'inner-planets',
    label: 'Inner Planets',
    color: '#ff9944',
    gradient: 'linear-gradient(135deg, rgba(255,153,68,0.18) 0%, rgba(255,80,30,0.08) 100%)',
    borderColor: 'rgba(255,153,68,0.5)',
    accentColor: '#ff9944',
    description:
      'The inner solar system contains four rocky, terrestrial planets — Mercury, Venus, Earth, and Mars — orbiting close to the Sun. These worlds are denser and smaller than the outer gas giants, shaped by intense solar radiation and volcanic forces over billions of years.',
    stats: [
      { label: 'Planets', value: '4' },
      { label: 'Distance from Sun', value: '0.39 – 1.52 AU' },
      { label: 'Dominant type', value: 'Terrestrial (Rocky)' },
      { label: 'Avg. surface temp.', value: '-88°C to +465°C' },
    ],
    members: ['Mercury', 'Venus', 'Earth', 'Mars'],
    highlights: [
      'Volcanic activity & tectonic forces',
      'Only region known to host liquid water',
      'Diverse terrain: plains, craters, valleys',
      'Intense solar wind exposure',
    ],
    funFact:
      "All four inner planets combined are less massive than 1% of Jupiter's mass.",
  },
  {
    id: 'asteroid-belt',
    label: 'Asteroid Belt',
    color: '#aabbcc',
    gradient: 'linear-gradient(135deg, rgba(170,187,204,0.18) 0%, rgba(100,120,140,0.08) 100%)',
    borderColor: 'rgba(170,187,204,0.5)',
    accentColor: '#aabbcc',
    description:
      'Located between Mars and Jupiter, the Main Asteroid Belt is a vast torus of rocky and metallic debris left over from the early solar system. It contains dwarf planet Ceres and millions of asteroids of varying compositions, but is much emptier than sci-fi suggests.',
    stats: [
      { label: 'Location', value: '2.2 – 3.2 AU' },
      { label: 'Notable body', value: 'Ceres (dwarf planet)' },
      { label: 'Total mass', value: '~4% of the Moon' },
      { label: 'Asteroid count', value: '~2,000,000 known' },
    ],
    members: ['Ceres', 'Vesta', 'Pallas', 'Hygiea', '+ millions more'],
    highlights: [
      'Home to dwarf planet Ceres',
      'Rich mix of C-, S-, and M-type asteroids',
      'Source of most meteorites reaching Earth',
      "Jupiter's gravity prevents planet formation here",
    ],
    funFact:
      "If all asteroids in the Belt were combined, they'd form a body smaller than our Moon.",
  },
  {
    id: 'outer-planets',
    label: 'Outer Planets',
    color: '#88ccff',
    gradient: 'linear-gradient(135deg, rgba(136,204,255,0.18) 0%, rgba(50,100,200,0.08) 100%)',
    borderColor: 'rgba(136,204,255,0.5)',
    accentColor: '#88ccff',
    description:
      'Beyond the asteroid belt lie the four giant planets: Jupiter, Saturn, Uranus, and Neptune. They are divided into gas giants (Jupiter & Saturn) and ice giants (Uranus & Neptune). Together they account for over 99% of the mass orbiting the Sun (excluding the Sun itself).',
    stats: [
      { label: 'Planets', value: '4' },
      { label: 'Distance from Sun', value: '5.2 – 30 AU' },
      { label: 'Types', value: 'Gas & Ice Giants' },
      { label: 'Combined moons', value: '200+' },
    ],
    members: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    highlights: [
      'Massive ring systems (Saturn, Uranus)',
      'Potential subsurface oceans on icy moons',
      'Violent storms larger than planet Earth',
      'Rich moon systems with 200+ natural satellites',
    ],
    funFact:
      "Jupiter's magnetic field is 20,000 times stronger than Earth's.",
  },
  {
    id: 'kuiper-belt',
    label: 'Kuiper Belt',
    color: '#77eeff',
    gradient: 'linear-gradient(135deg, rgba(119,238,255,0.18) 0%, rgba(30,100,150,0.08) 100%)',
    borderColor: 'rgba(119,238,255,0.5)',
    accentColor: '#77eeff',
    description:
      "The Kuiper Belt extends from Neptune's orbit outward to roughly 50 AU from the Sun. It is a vast reservoir of icy bodies — remnants of the early solar system — including dwarf planets like Pluto, Makemake, and Haumea. It is the source of short-period comets.",
    stats: [
      { label: 'Location', value: '30 – 50 AU' },
      { label: 'Notable bodies', value: 'Pluto, Makemake, Haumea, Eris' },
      { label: 'Objects', value: '100,000+ known' },
      { label: 'Temperature', value: '~-220°C' },
    ],
    members: ['Pluto', 'Makemake', 'Haumea', 'Eris', '+ many KBOs'],
    highlights: [
      'Vast reservoir of frozen primordial material',
      'Explored by NASA New Horizons (Pluto 2015)',
      'Origin of short-period comets',
      'May contain undiscovered large bodies',
    ],
    funFact:
      "The Kuiper Belt is 20 times wider and 20–200 times more massive than the asteroid belt.",
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
    <div class="region-infocard-inner" style="--region-accent:${region.accentColor}; --region-border:${region.borderColor}; background:${region.gradient}">
      <button class="region-infocard-close" id="region-infocard-close" aria-label="Close region info">×</button>

      <div class="region-infocard-header">
        <div>
          <h2 class="region-infocard-title">${region.label}</h2>
          <p class="region-infocard-subtitle">Solar System Region</p>
        </div>
      </div>

      <p class="region-infocard-desc">${region.description}</p>

      <div class="region-stat-grid">
        ${region.stats.map(s => `
          <div class="region-stat-card">
            <span class="region-stat-label">${s.label}</span>
            <span class="region-stat-value">${s.value}</span>
          </div>
        `).join('')}
      </div>

      <div class="region-section">
        <h3 class="region-section-title">Key Highlights</h3>
        <ul class="region-highlights-list">
          ${region.highlights.map(h => `<li class="region-highlight-item">${h}</li>`).join('')}
        </ul>
      </div>

      <div class="region-section">
        <h3 class="region-section-title">Members</h3>
        <div class="region-members-row">
          ${region.members.map(m => `<span class="region-member-tag">${m}</span>`).join('')}
        </div>
      </div>

      <div class="region-funfact">
        <span class="region-funfact-label">Fun Fact</span>
        <p class="region-funfact-text">${region.funFact}</p>
      </div>
    </div>
  `;
}

// ─── Show region infocard ─────────────────────────────────────────────────────
function showRegionInfocard(region) {
  if (!infocardEl) return;
  infocardEl.innerHTML = buildInfocard(region);
  infocardEl.classList.add('region-infocard-visible');

  const closeBtn = infocardEl.querySelector('#region-infocard-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideRegionInfocard);
  }
}

function hideRegionInfocard() {
  if (!infocardEl) return;
  infocardEl.classList.remove('region-infocard-visible');
  activeRegionId = null;
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
  btn.setAttribute('aria-label', 'Explore Solar System Regions');
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
    <span class="region-btn-text">Regions</span>
    <svg class="region-btn-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `;

  // Dropdown
  dropdownEl = document.createElement('div');
  dropdownEl.id = 'region-dropdown';
  dropdownEl.className = 'region-dropdown region-dropdown-hidden';
  dropdownEl.innerHTML = `<div class="region-dropdown-label">Solar System Regions</div>`;

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
