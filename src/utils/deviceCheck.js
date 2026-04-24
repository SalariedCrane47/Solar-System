const REQUIREMENTS = {
  MIN_RAM_GB: 2,
  MIN_CORES: 2,
  MIN_WIDTH: 320,
  MIN_WEBGL_VERSION: 1,
};

export function checkDeviceCapabilities() {
  const result = {
    isSupported: true,
    warnings: [],
    isMobile: false,
    isLowEnd: false,
  };

  result.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (!checkWebGL()) {
    result.isSupported = false;
    result.warnings.push('WebGL is not supported in your browser');
  }

  if (!checkRAM(REQUIREMENTS.MIN_RAM_GB)) {
    result.warnings.push(
      `Minimum ${REQUIREMENTS.MIN_RAM_GB}GB RAM recommended (${getDeviceRAM() || 'unknown'})`
    );
  }

  if (!checkScreenWidth(REQUIREMENTS.MIN_WIDTH)) {
    result.warnings.push(`Minimum screen width: ${REQUIREMENTS.MIN_WIDTH}px`);
  }

  if (!checkHardwareConcurrency(REQUIREMENTS.MIN_CORES)) {
    result.warnings.push(
      `More CPU cores recommended (${navigator.hardwareConcurrency || 'unknown'} cores detected)`
    );
  }

  if (result.warnings.length > 0) {
    result.isLowEnd = true;
  }

  return result;
}

function checkWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

function getWebGLInfo() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return null;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return {
      renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown',
      version: gl.getParameter(gl.VERSION),
      vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
    };
  } catch {
    return null;
  }
}

function getDeviceRAM() {
  return navigator.deviceMemory ? `${navigator.deviceMemory}GB` : null;
}

function checkRAM(minGB) {
  if (!navigator.deviceMemory) return true;
  return navigator.deviceMemory >= minGB;
}

function checkScreenWidth(minWidth) {
  return window.innerWidth >= minWidth;
}

function checkHardwareConcurrency(minCores) {
  if (!navigator.hardwareConcurrency) return true;
  return navigator.hardwareConcurrency >= minCores;
}

export function getDeviceInfo() {
  const ram = getDeviceRAM();
  const glInfo = getWebGLInfo();

  return {
    screenWidth: `${window.innerWidth}x${window.innerHeight}`,
    devicePixelRatio: window.devicePixelRatio,
    cores: navigator.hardwareConcurrency || 'unknown',
    ram: ram || 'unknown',
    userAgent: navigator.userAgent,
    webgl: glInfo ? glInfo.renderer : 'Unknown',
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    isTouchSupported: 'ontouchstart' in window,
  };
}
