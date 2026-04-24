import id from './id.json';

const translations = id;

// Indonesian is the only language
// eslint-disable-next-line no-unused-vars
export function setLanguage(_lang) {
  // no-op: only Indonesian is supported
}

export function getLanguage() {
  return 'id';
}

export function t(key) {
  const keys = key.split('.');
  let value = translations;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

const listeners = [];

export function onLanguageChange(callback) {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}
