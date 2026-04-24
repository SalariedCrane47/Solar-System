import { onLanguageChange } from '../src/i18n/index.js';

const SPEEDS = [-10, -5, -2, -1, 0, 1, 2, 5, 10];
let currentIdx = 5;
let setTimeScaleCallback = null;
const simulationDate = new Date();


function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function init(callback) {
  setTimeScaleCallback = callback;

  const panel = document.createElement('div');
  panel.id = 'timecontrols';
  panel.className = 'timecontrols-panel game-ui-hidden';
  panel.setAttribute('aria-label', 'Time speed controls');

  const topRow = document.createElement('div');
  topRow.className = 'timecontrols-top';

  const dateLabel = document.createElement('div');
  dateLabel.className = 'timecontrols-date';
  dateLabel.textContent = formatDate(simulationDate);

  const speedLabel = document.createElement('div');
  speedLabel.className = 'timecontrols-speed';

  const updateUI = () => {
    const speed = SPEEDS[currentIdx];
    speedLabel.textContent = speed === 0 ? 'Paused' : `${speed}×`;
    const slider = document.getElementById('timecontrols-slider');
    if (slider) {
      slider.value = currentIdx;
    }
    if (setTimeScaleCallback) {
      setTimeScaleCallback(speed);
    }
  };

  topRow.appendChild(dateLabel);
  topRow.appendChild(speedLabel);

  const sliderRow = document.createElement('div');
  sliderRow.className = 'timecontrols-timeline';

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.id = 'timecontrols-slider';
  slider.min = 0;
  slider.max = SPEEDS.length - 1;
  slider.value = currentIdx;
  slider.className = 'timecontrols-slider';

  slider.addEventListener('input', () => {
    currentIdx = parseInt(slider.value, 10);
    updateUI();
  });

  window.addEventListener('simulation-time-tick', (e) => {
    dateLabel.textContent = formatDate(e.detail.date);
  });

  sliderRow.appendChild(slider);

  panel.appendChild(topRow);
  panel.appendChild(sliderRow);
  document.body.appendChild(panel);

  onLanguageChange(() => {
    // Buttons are removed, nothing to update here anymore
  });

  updateUI();
}


