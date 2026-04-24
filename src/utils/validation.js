/**
 * Validates that an object is not null or undefined.
 * @param {*} obj - The object to validate
 * @param {string} [name='Object'] - Name for error messages
 * @returns {boolean}
 */
export function isValidObject(obj, name = 'Object') {
  if (obj === null || obj === undefined) {
    console.warn(`${name} is null or undefined`);
    return false;
  }
  return true;
}

/**
 * Validates that an array has elements.
 * @param {Array} arr - The array to validate
 * @param {string} [name='Array'] - Name for error messages
 * @returns {boolean}
 */
export function isNonEmptyArray(arr, name = 'Array') {
  if (!Array.isArray(arr) || arr.length === 0) {
    console.warn(`${name} must be a non-empty array`);
    return false;
  }
  return true;
}
