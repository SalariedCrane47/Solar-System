import { t } from '../src/i18n/index.js';
import { celestialData } from '../src/data/celestialData.js';

let isInitialized = false;
let panel = null;

// Map lowercase ids to the capitalized keys used in celestialData
const CELESTIAL_KEY_MAP = {
  mercury:  'Mercury',
  venus:    'Venus',
  earth:    'Earth',
  mars:     'Mars',
  jupiter:  'Jupiter',
  saturn:   'Saturn',
  uranus:   'Uranus',
  neptune:  'Neptune',
  pluto:    'Pluto',
  ceres:    'Ceres',
  makemake: 'Makemake',
  eris:     'Eris',
};

const PLANET_ORDER = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
  'ceres',
  'makemake',
  'eris',
];

export function initComparePanel() {
  if (isInitialized) return;
  isInitialized = true;

  panel = document.createElement('div');
  panel.id = 'compare-panel';
  panel.className = 'compare-panel hidden';

  const headerContainer = document.createElement('div');
  headerContainer.className = 'compare-header';

  const title = document.createElement('div');
  title.className = 'compare-title';
  title.textContent = t('features.planetCompare');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'compare-close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.title = 'Tutup';
  closeBtn.addEventListener('click', hideComparePanel);

  headerContainer.appendChild(title);
  headerContainer.appendChild(closeBtn);

  const scrollContainer = document.createElement('div');
  scrollContainer.className = 'compare-scroll';

  const table = document.createElement('table');
  table.className = 'compare-table';
  table.id = 'compare-table';

  panel.appendChild(headerContainer);
  panel.appendChild(scrollContainer);
  scrollContainer.appendChild(table);
  document.body.appendChild(panel);

  return panel;
}

function renderTable() {
  const table = document.getElementById('compare-table');
  if (!table) return;

  table.innerHTML = '';

  // Header row: planet names
  const headerRow = document.createElement('tr');
  const emptyTh = document.createElement('th');
  emptyTh.textContent = '';
  headerRow.appendChild(emptyTh);

  PLANET_ORDER.forEach(id => {
    const key = CELESTIAL_KEY_MAP[id];
    const data = celestialData[key];
    const th = document.createElement('th');
    th.textContent = data ? data.name : key;
    th.className = 'compare-planet-header';
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Data rows: use the actual string fields available in celestialData
  const rows = [
    { label: 'Sumbu semi-mayor', field: 'semiMajorAxis', source: 'orbit' },
    { label: 'Periode orbit',    field: 'period',         source: 'orbit' },
    { label: 'Eksentrisitas',    field: 'eccentricity',   source: 'orbit' },
    { label: 'Inklinasi',        field: 'inclination',    source: 'orbit' },
  ];

  rows.forEach(({ label, field, source }) => {
    const row = document.createElement('tr');
    const labelCell = document.createElement('td');
    labelCell.className = 'compare-property-label';
    labelCell.textContent = label;
    row.appendChild(labelCell);

    PLANET_ORDER.forEach(id => {
      const key = CELESTIAL_KEY_MAP[id];
      const data = celestialData[key];
      const valueCell = document.createElement('td');
      valueCell.className = 'compare-property-value';

      if (data && source === 'orbit' && data.orbit && data.orbit[field]) {
        valueCell.textContent = data.orbit[field];
      } else {
        valueCell.textContent = '—';
      }

      row.appendChild(valueCell);
    });

    table.appendChild(row);
  });
}

export function showComparePanel() {
  if (!panel) initComparePanel();
  renderTable();
  if (panel) {
    panel.classList.remove('hidden');
  }
}

export function hideComparePanel() {
  if (panel) {
    panel.classList.add('hidden');
  }
}
