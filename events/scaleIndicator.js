import { t } from '../src/i18n/index.js';

let container = null;
let distanceValue = null;
let scaleLabel = null;

// Scale breakpoints based on actual orbit distances (BASE_DISTANCE = 3.0)
// Earth orbit ≈ 7.75, Asteroid belt ≈ 16-25, Jupiter ≈ 40, Saturn ≈ 74, Neptune ≈ 233
const SCALE_BREAKPOINTS = [
  { maxDist: 15, label: '1 : 1M', title: 'Close Up' },
  { maxDist: 30, label: '1 : 10M', title: 'Inner Planet' },
  { maxDist: 50, label: '1 : 50M', title: 'Asteroid Belt' },
  { maxDist: 400, label: '1 : 10B', title: 'Outer Planet' },
  { maxDist: Infinity, label: '1 : 100B', title: 'Full Solar System' },
];

const AU_PER_UNIT = 1 / 7.752;
const KM_PER_UNIT = AU_PER_UNIT * 149600000;

function getScaleInfo(distance) {
  for (const bp of SCALE_BREAKPOINTS) {
    if (distance < bp.maxDist) return bp;
  }
  return SCALE_BREAKPOINTS[SCALE_BREAKPOINTS.length - 1];
}

function formatDistance(d) {
  const au = d * AU_PER_UNIT;
  if (au < 1) {
    const km = d * KM_PER_UNIT;
    if (km < 1000) return `${km.toFixed(1)} km`;
    if (km < 1000000) return `${Math.round(km).toLocaleString()} km`;
    return `${(km / 1000000).toFixed(1)} Mkm`;
  }
  return `${au.toFixed(2)} AU`;
}

export function initScaleIndicator() {
  container = document.createElement('div');
  container.id = 'scale-indicator';
  container.className = 'scale-indicator game-ui-hidden';
  container.innerHTML = `
    <div class="scale-indicator-inner">
      <span class="scale-label">${t('features.scale') || 'SCALE'}</span>
      <span class="scale-value" id="scale-value">—</span>
    </div>
  `;
  document.body.appendChild(container);

  distanceValue = container.querySelector('#scale-value');
  scaleLabel = container.querySelector('.scale-label');

  return container;
}

export function updateScaleIndicator(cameraDistance) {
  if (!container || !distanceValue || !scaleLabel) return;

  const info = getScaleInfo(cameraDistance);
  distanceValue.textContent = formatDistance(cameraDistance);
  scaleLabel.textContent = info.title;
}

export function showScaleIndicator() {
  if (container) {
    container.classList.remove('game-ui-hidden');
    container.classList.add('game-ui-visible');
  }
}

export function hideScaleIndicator() {
  if (container) {
    container.classList.add('game-ui-hidden');
    container.classList.remove('game-ui-visible');
  }
}
