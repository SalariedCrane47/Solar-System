import { celestialData } from '../src/data/celestialData.js';
import { t, onLanguageChange } from '../src/i18n/index.js';

export function init(clickableObjects, focusOnPlanet) {
  const container = document.createElement('div');
  container.id = 'search-container';
  container.className = 'search-container game-ui-hidden';

  const input = document.createElement('input');
  input.type = 'text';
  input.setAttribute('data-i18n-placeholder', 'search.placeholder');
  input.placeholder = t('search.placeholder');
  input.className = 'search-input';

  const iconBtn = document.createElement('button');
  iconBtn.className = 'search-icon';
  iconBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `;

  const clearBtn = document.createElement('button');
  clearBtn.className = 'search-clear hidden';
  clearBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;

  const results = document.createElement('ul');
  results.className = 'search-results hidden';

  container.appendChild(input);
  container.appendChild(iconBtn);
  container.appendChild(clearBtn);
  container.appendChild(results);
  document.body.appendChild(container);

  function updateResults() {
    const val = input.value.toLowerCase().trim();
    results.innerHTML = '';

    if (!val) {
      results.classList.add('hidden');
      clearBtn.classList.add('hidden');
      return;
    }

    clearBtn.classList.remove('hidden');

    const matches = clickableObjects.filter(obj => {
      const idStr = obj.userData?.name;
      if (!idStr) return false;
      const data = celestialData[idStr];
      const matchId = idStr.toLowerCase().includes(val);
      const matchName = data ? data.name.toLowerCase().includes(val) : false;
      return matchId || matchName;
    });

    if (matches.length > 0) {
      matches.slice(0, 8).forEach(obj => {
        const idStr = obj.userData.name;
        const data = celestialData[idStr];
        const displayName = data ? data.name : idStr;
        const typeName = data ? data.type : '';
        const color = obj.userData?.color
          ? '#' + obj.userData.color.toString(16).padStart(6, '0')
          : '#88ccff';

        const li = document.createElement('li');
        li.className = 'search-result-item';
        li.innerHTML = `
          <span class="result-dot" style="background:${color}"></span>
          <span class="result-name">${displayName}</span>
          <span class="result-type">${typeName}</span>
        `;

        li.addEventListener('click', () => {
          focusOnPlanet(obj);
          input.value = '';
          results.classList.add('hidden');
          clearBtn.classList.add('hidden');
        });

        results.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.className = 'search-result-none';
      li.setAttribute('data-i18n', 'search.noResults');
      li.textContent = t('search.noResults');
      results.appendChild(li);
    }

    results.classList.remove('hidden');
  }

  input.addEventListener('input', updateResults);

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      input.value = '';
      results.classList.add('hidden');
      clearBtn.classList.add('hidden');
      input.blur();
    }
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    results.classList.add('hidden');
    clearBtn.classList.add('hidden');
    input.focus();
  });

  document.addEventListener('click', e => {
    if (!container.contains(e.target)) {
      if (input.value === '') {
        results.classList.add('hidden');
        clearBtn.classList.add('hidden');
      }
    }
  });

  onLanguageChange(() => {
    input.placeholder = t('search.placeholder');
    document.querySelectorAll('[data-i18n="search.noResults"]').forEach(el => {
      el.textContent = t('search.noResults');
    });
  });

  return container;
}
