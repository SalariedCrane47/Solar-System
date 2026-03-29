export function init() {
  const settingsBtn = document.createElement('button');
  settingsBtn.id = 'settings-btn';
  settingsBtn.className = 'settings-btn game-ui-hidden';
  settingsBtn.innerHTML = '⚙️';
  settingsBtn.setAttribute('title', 'Settings');
  
  const panel = document.createElement('div');
  panel.id = 'settings-panel';
  panel.className = 'settings-panel hidden';
  
  const titleRow = document.createElement('div');
  titleRow.className = 'settings-title';
  titleRow.textContent = 'Settings';
  panel.appendChild(titleRow);

  const labelRow = document.createElement('div');
  labelRow.className = 'settings-row';
  const labelCheckbox = document.createElement('input');
  labelCheckbox.type = 'checkbox';
  labelCheckbox.id = 'toggle-labels';
  labelCheckbox.checked = true;
  const labelText = document.createElement('label');
  labelText.htmlFor = 'toggle-labels';
  labelText.textContent = 'Show Planet Labels';
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
  timeText.textContent = 'Show Time Controls';
  timeRow.appendChild(timeCheckbox);
  timeRow.appendChild(timeText);
  
  panel.appendChild(labelRow);
  panel.appendChild(timeRow);

  document.body.appendChild(settingsBtn);
  document.body.appendChild(panel);

  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('hidden');
  });

  window.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== settingsBtn) {
      panel.classList.add('hidden');
    }
  });

  labelCheckbox.addEventListener('change', (e) => {
    const labelsContainer = document.getElementById('planet-labels-container');
    if (labelsContainer) {
      labelsContainer.classList.toggle('settings-hidden', !e.target.checked);
    }
  });

  timeCheckbox.addEventListener('change', (e) => {
    const timePanel = document.getElementById('timecontrols');
    if (timePanel) {
      timePanel.classList.toggle('settings-hidden', !e.target.checked);
    }
  });
  
  return { btn: settingsBtn, panel };
}
