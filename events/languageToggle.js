import { setLanguage, getLanguage, onLanguageChange } from '../src/i18n/index.js';

let languageBtn = null;
let isInitialized = false;

export function initLanguageToggle() {
  if (isInitialized) return;
  isInitialized = true;

  languageBtn = document.createElement('button');
  languageBtn.id = 'language-toggle';
  languageBtn.className = 'language-toggle game-ui-hidden';
  languageBtn.innerHTML = getLanguageFlag(getLanguage());
  languageBtn.title = 'Change Language';

  languageBtn.addEventListener('click', () => {
    const currentLang = getLanguage();
    const newLang = currentLang === 'en' ? 'id' : 'en';
    setLanguage(newLang);
  });

  document.body.appendChild(languageBtn);

  onLanguageChange(lang => {
    languageBtn.innerHTML = getLanguageFlag(lang);
  });

  return languageBtn;
}

function getLanguageFlag(lang) {
  if (lang === 'en') {
    return '<span class="lang-flag">🇺🇸</span>';
  }
  return '<span class="lang-flag">🇮🇩</span>';
}

export function showLanguageToggle() {
  if (languageBtn) {
    languageBtn.classList.remove('game-ui-hidden');
    languageBtn.classList.add('game-ui-visible');
  }
}

export function hideLanguageToggle() {
  if (languageBtn) {
    languageBtn.classList.remove('game-ui-visible');
    languageBtn.classList.add('game-ui-hidden');
  }
}
