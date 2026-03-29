import { celestialData } from './infocard.js';

export function init(clickableObjects, focusOnPlanet) {
  const container = document.createElement('div');
  container.id = 'search-container';
  container.className = 'search-container game-ui-hidden';

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'search-toggle-btn';
  toggleBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `;

  const searchPanel = document.createElement('div');
  searchPanel.className = 'search-panel hidden';

  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'search-input-wrapper';

  const searchIcon = document.createElement('span');
  searchIcon.className = 'search-icon';
  searchIcon.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `;

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Cari tata surya...';
  input.className = 'search-input';
  input.autocomplete = 'off';

  inputWrapper.appendChild(searchIcon);
  inputWrapper.appendChild(input);

  const resultsDropdown = document.createElement('ul');
  resultsDropdown.className = 'search-results hidden';

  searchPanel.appendChild(inputWrapper);
  searchPanel.appendChild(resultsDropdown);

  container.appendChild(toggleBtn);
  container.appendChild(searchPanel);
  document.body.appendChild(container);

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    searchPanel.classList.toggle('hidden');
    if (!searchPanel.classList.contains('hidden')) {
      input.focus();
    }
  });

  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase().trim();
    resultsDropdown.innerHTML = '';
    
    if (!val) {
      resultsDropdown.classList.add('hidden');
      return;
    }

    const matches = clickableObjects.filter(obj => {
      const idStr = obj.userData?.name;
      if (!idStr) return false;
      const data = celestialData[idStr];
      const matchId = idStr.toLowerCase().includes(val);
      const matchName = data ? data.name.toLowerCase().includes(val) : false;
      return matchId || matchName;
    });

    if (matches.length > 0) {
      matches.forEach(obj => {
        const idStr = obj.userData.name;
        const data = celestialData[idStr];
        const displayName = data ? data.name : idStr;
        const typeName = data ? data.type : '';
        
        const li = document.createElement('li');
        li.className = 'search-result-item';
        li.innerHTML = `
          <div class="search-result-info">
            <span class="search-result-name">${displayName}</span>
            <span class="search-result-type">${typeName}</span>
          </div>
        `;
        
        li.addEventListener('click', () => {
          focusOnPlanet(obj);
          input.value = '';
          resultsDropdown.classList.add('hidden');
          searchPanel.classList.add('hidden');
        });
        
        resultsDropdown.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'Tidak ditemukan';
      li.className = 'search-result-none';
      resultsDropdown.appendChild(li);
    }
    
    resultsDropdown.classList.remove('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      searchPanel.classList.add('hidden');
      resultsDropdown.classList.add('hidden');
    }
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length > 0) {
      resultsDropdown.classList.remove('hidden');
    }
  });

  return container;
}
