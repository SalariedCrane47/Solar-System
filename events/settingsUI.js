import { t, onLanguageChange } from '../src/i18n/index.js';
import { showDistanceCalculator } from './distanceCalculator.js';
import { showComparePanel } from './comparePanel.js';


export function init() {
  const settingsBtn = document.createElement('button');
  settingsBtn.id = 'settings-btn';
  settingsBtn.className = 'settings-btn game-ui-hidden';
  settingsBtn.innerHTML =
    '<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M365.6 864.7c-22.7-9.4-38.5-10.4-69.9-7.1-32.2 3.3-45.1 3.2-64.5-4.1-13.1-4.9-25.2-13-36.7-24.4-11.5-11.5-19.5-23.6-24.5-36.7-7.3-19.4-7.4-32.3-4.1-64.5 3.2-31.5 2.3-47.3-7.1-69.9-7.4-17.9-17-30.6-31.4-43.5-3-2.7-6.2-5.4-10.4-8.9 1.9 1.6-8.5-7-11.2-9.1-29.4-24.6-42.9-47-42.9-84.7s13.5-60.1 42.9-84.7c2.6-2.2 13.1-10.7 11.2-9.1 4.3-3.5 7.4-6.2 10.4-8.9 14.3-12.9 23.9-25.5 31.4-43.5 9.4-22.7 10.4-38.5 7.1-69.9-3.3-32.2-3.2-45.1 4.1-64.5 4.9-13.1 13-25.2 24.4-36.7C205.9 183 218 175 231.2 170c19.4-7.3 32.3-7.4 64.5-4.1 31.5 3.2 47.3 2.3 69.9-7.1 17.9-7.4 30.6-17 43.5-31.4 2.7-3 5.4-6.2 8.9-10.4-1.6 1.9 7-8.5 9.1-11.2 24.6-29.4 47-42.9 84.7-42.9s60.1 13.5 84.7 42.9c2.2 2.6 10.7 13.1 9.1 11.2 3.5 4.3 6.2 7.4 8.9 10.4C627.4 141.7 640 151.3 658 158.8c22.7 9.4 38.5 10.4 69.9 7.1 32.2-3.3 45.1-3.2 64.5 4.1 13.1 4.9 25.2 13 36.7 24.4 11.5 11.5 19.5 23.6 24.4 36.7 7.3 19.4 7.4 32.3 4.1 64.5-3.2 31.5-2.3 47.3 7.1 69.9 7.4 17.9 17 30.6 31.4 43.5 3 2.7 6.2 5.4 10.4 8.9-1.9-1.6 8.5 7 11.2 9.1 29.4 24.6 42.9 47 42.9 84.7s-13.5 60.1-42.9 84.7c-2.6 2.2-13.1 10.7-11.2 9.1-4.3 3.5-7.4 6.2-10.4 8.9-14.3 12.9-23.9 25.5-31.4 43.5-9.4 22.7-10.4 38.5-7.1 69.9 3.3 32.2 3.2 45.1-4.1 64.5-4.9 13.1-13 25.2-24.4 36.7-11.5 11.5-23.6 19.5-36.7 24.4-19.4 7.3-32.3 7.4-64.5 4.1-31.5-3.2-47.3-2.3-69.9 7.1-17.9 7.4-30.6 17-43.5 31.4-2.7 3-5.4 6.2-8.9 10.4 1.6-1.9-7 8.5-9.1 11.2-24.6 29.4-47 42.9-84.7 42.9s-60.1-13.5-84.7-42.9c-2.2-2.6-10.7-13.1-9.1-11.2-3.5-4.3-6.2-7.4-8.9-10.4-12.9-14.3-25.6-23.9-43.5-31.3z" fill="#5E676F"></path><path d="M376.3 838.8c74.4 30.8 67.7 93.7 135.4 93.7s61.1-62.9 135.4-93.7c74.4-30.8 114.1 18.4 162-29.5s-1.3-87.7 29.5-162c30.8-74.4 93.7-67.7 93.7-135.4s-62.9-61.1-93.7-135.4c-30.8-74.4 18.4-114.1-29.5-162s-87.7 1.3-162-29.5c-74.4-30.8-67.7-93.7-135.4-93.7s-61.1 62.9-135.4 93.7c-74.4 30.8-114.1-18.4-162 29.5s1.3 87.7-29.5 162c-30.8 74.4-93.7 67.7-93.7 135.4s62.9 61.1 93.7 135.4c30.8 74.4-18.4 114.1 29.5 162s87.7-1.3 162 29.5zM512 206.3c168.6 0 305.7 137.1 305.7 305.7S680.6 817.7 512 817.7 206.3 680.6 206.3 512 343.4 206.3 512 206.3z" fill="#BBBBBB"></path></svg>';
  settingsBtn.setAttribute('title', t('settings.title'));

  const panel = document.createElement('div');
  panel.id = 'settings-panel';
  panel.className = 'settings-panel hidden';

  const titleRow = document.createElement('div');
  titleRow.className = 'settings-title';
  titleRow.setAttribute('data-i18n', 'settings.title');
  titleRow.textContent = t('settings.title');
  panel.appendChild(titleRow);

  const labelRow = document.createElement('div');
  labelRow.className = 'settings-row';
  const labelCheckbox = document.createElement('input');
  labelCheckbox.type = 'checkbox';
  labelCheckbox.id = 'toggle-labels';
  labelCheckbox.checked = true;
  const labelText = document.createElement('label');
  labelText.htmlFor = 'toggle-labels';
  labelText.setAttribute('data-i18n', 'settings.showLabels');
  labelText.textContent = t('settings.showLabels');
  labelRow.appendChild(labelCheckbox);
  labelRow.appendChild(labelText);

  const timeRow = document.createElement('div');
  timeRow.className = 'settings-row';
  const timeCheckbox = document.createElement('input');
  timeCheckbox.type = 'checkbox';
  timeCheckbox.id = 'toggle-time';
  timeCheckbox.checked = true;
  const timeText = document.createElement('label');
  timeText.htmlFor = 'toggle-time';
  timeText.setAttribute('data-i18n', 'settings.showTimeControls');
  timeText.textContent = t('settings.showTimeControls');
  timeRow.appendChild(timeCheckbox);
  timeRow.appendChild(timeText);


  const distanceRow = document.createElement('div');
  distanceRow.className = 'settings-row';
  const distanceBtn = document.createElement('button');
  distanceBtn.className = 'settings-action-btn';
  distanceBtn.setAttribute('data-i18n', 'features.distanceCalculator');
  distanceBtn.textContent = t('features.distanceCalculator');
  distanceBtn.addEventListener('click', () => {
    panel.classList.add('hidden');
    showDistanceCalculator();
  });
  distanceRow.appendChild(distanceBtn);


  const compareRow = document.createElement('div');
  compareRow.className = 'settings-row';
  const compareBtn = document.createElement('button');
  compareBtn.className = 'settings-action-btn';
  compareBtn.setAttribute('data-i18n', 'features.planetCompare');
  compareBtn.textContent = t('features.planetCompare');
  compareBtn.addEventListener('click', () => {
    panel.classList.add('hidden');
    showComparePanel();
  });
  compareRow.appendChild(compareBtn);

  panel.appendChild(labelRow);
  panel.appendChild(timeRow);
  panel.appendChild(distanceRow);
  panel.appendChild(compareRow);

  document.body.appendChild(settingsBtn);
  document.body.appendChild(panel);

  settingsBtn.addEventListener('click', e => {
    e.stopPropagation();
    panel.classList.toggle('hidden');
  });

  window.addEventListener('click', e => {
    if (!panel.contains(e.target) && e.target !== settingsBtn) {
      panel.classList.add('hidden');
    }
  });

  labelCheckbox.addEventListener('change', e => {
    const labelsContainer = document.getElementById('planet-labels-container');
    if (labelsContainer) {
      labelsContainer.classList.toggle('settings-hidden', !e.target.checked);
    }
  });

  timeCheckbox.addEventListener('change', e => {
    const timePanel = document.getElementById('timecontrols');
    if (timePanel) {
      timePanel.classList.toggle('settings-hidden', !e.target.checked);
    }
  });


  onLanguageChange(() => {
    settingsBtn.setAttribute('title', t('settings.title'));
    titleRow.textContent = t('settings.title');
    labelText.textContent = t('settings.showLabels');
    timeText.textContent = t('settings.showTimeControls');
    distanceBtn.textContent = t('features.distanceCalculator');
  });

  return { btn: settingsBtn, panel };
}

export function toggleRings(planet, visible) {
  window.dispatchEvent(
    new CustomEvent('rings-visibility-change', {
      detail: { [planet]: visible },
    })
  );
}
