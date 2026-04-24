import { t, onLanguageChange } from '../src/i18n/index.js';
import { celestialData } from '../src/data/celestialData.js';
import { orbitalParameters } from '../src/data/orbitParam.js';

let isInitialized = false;

const AU_IN_KM = 149597870.7;

export function initDistanceCalculator() {
  if (isInitialized) return;
  isInitialized = true;

  const panel = document.createElement('div');
  panel.id = 'distance-calculator';
  panel.className = 'distance-calculator hidden';

  const headerContainer = document.createElement('div');
  headerContainer.className = 'dc-header';

  const title = document.createElement('div');
  title.className = 'dc-title';
  title.setAttribute('data-i18n', 'features.distanceCalculator');
  title.textContent = t('features.distanceCalculator');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'dc-close-btn';
  closeBtn.innerHTML = '&times;';
  closeBtn.title = 'Close Calculator';
  closeBtn.addEventListener('click', hideDistanceCalculator);

  headerContainer.appendChild(title);
  headerContainer.appendChild(closeBtn);

  const selectContainer = document.createElement('div');
  selectContainer.className = 'dc-select-container';

  const select1 = document.createElement('select');
  select1.id = 'dc-planet-1';
  select1.className = 'dc-select';

  const select2 = document.createElement('select');
  select2.id = 'dc-planet-2';
  select2.className = 'dc-select';

  populateSelect(select1);
  populateSelect(select2);

  const swapBtn = document.createElement('button');
  swapBtn.className = 'dc-swap-btn';
  swapBtn.innerHTML = '&#8646;';
  swapBtn.title = 'Swap planets';

  swapBtn.addEventListener('click', () => {
    const temp = select1.value;
    select1.value = select2.value;
    select2.value = temp;
    calculateDistance();
  });

  selectContainer.appendChild(select1);
  selectContainer.appendChild(swapBtn);
  selectContainer.appendChild(select2);

  const resultContainer = document.createElement('div');
  resultContainer.className = 'dc-result';
  resultContainer.id = 'dc-result';

  panel.appendChild(headerContainer);
  panel.appendChild(selectContainer);
  panel.appendChild(resultContainer);
  document.body.appendChild(panel);

  select1.addEventListener('change', calculateDistance);
  select2.addEventListener('change', calculateDistance);

  onLanguageChange(() => {
    title.textContent = t('features.distanceCalculator');
    calculateDistance();
  });

  return panel;
}

function populateSelect(select) {
  const planets = [
    'sun',
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

  planets.forEach(planet => {
    const option = document.createElement('option');
    option.value = planet;
    const data = celestialData[planet];
    option.textContent = data ? data.name : planet;
    select.appendChild(option);
  });
}

function calculateDistance() {
  const select1 = document.getElementById('dc-planet-1');
  const select2 = document.getElementById('dc-planet-2');
  const resultContainer = document.getElementById('dc-result');

  if (!select1 || !select2 || !resultContainer) return;

  const planet1 = select1.value;
  const planet2 = select2.value;

  const param1 = orbitalParameters[planet1];
  const param2 = orbitalParameters[planet2];

  if (!param1 || !param2) {
    resultContainer.innerHTML = '';
    return;
  }

  const dist1 = param1.radius || param1.semiMajorAxis;
  const dist2 = param2.radius || param2.semiMajorAxis;

  const distanceAU = Math.abs(dist1 - dist2);
  const distanceKM = distanceAU * AU_IN_KM;

  resultContainer.innerHTML = `
    <div class="dc-distance-label">${t('features.distance')}</div>
    <div class="dc-distance-value">${formatNumber(distanceAU.toFixed(3))} ${t('features.au')}</div>
    <div class="dc-distance-km">${formatNumber(distanceKM.toFixed(0))} ${t('features.km')}</div>
  `;
}

function formatNumber(numStr) {
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function showDistanceCalculator(preselectedPlanet) {
  const panel = document.getElementById('distance-calculator');
  if (panel) {
    if (preselectedPlanet) {
      const select1 = document.getElementById('dc-planet-1');
      if (select1) {
        const option = select1.querySelector(`option[value="${preselectedPlanet}"]`);
        if (option) {
          select1.insertBefore(option, select1.firstChild);
          select1.value = preselectedPlanet;
        }
      }
      calculateDistance();
    }
    panel.classList.remove('hidden');
  }
}

export function hideDistanceCalculator() {
  const panel = document.getElementById('distance-calculator');
  if (panel) {
    panel.classList.add('hidden');
  }
}
