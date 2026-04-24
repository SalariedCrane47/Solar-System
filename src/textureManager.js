const LOAD_PRIORITY = {
  sun: 10,
  earth: 9,
  moon: 8,
  mercury: 7,
  venus: 7,
  mars: 6,
  jupiter: 5,
  saturn: 4,
  uranus: 3,
  neptune: 3,
  pluto: 2,
  ceres: 2,
  makemake: 1,
  eris: 1,
};

class TextureManager {
  constructor() {
    this.loadedCount = 0;
    this.totalCount = 0;
    this.onProgress = null;
    this.textureCache = new Map();
    this.loadingPromises = new Map();
  }

  setProgressCallback(callback) {
    this.onProgress = callback;
  }

  loadTexture(url) {
    if (this.textureCache.has(url)) {
      return Promise.resolve(this.textureCache.get(url));
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url);
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.textureCache.set(url, img);
        this.loadingPromises.delete(url);
        resolve(img);
      };
      img.onerror = () => {
        this.loadingPromises.delete(url);
        reject(new Error(`Failed to load texture: ${url}`));
      };
      img.src = url;
    });

    this.loadingPromises.set(url, promise);
    return promise;
  }

  loadAll(imageSources, visiblePlanets = []) {
    const allUrls = [];

    for (const planet in imageSources) {
      const planetTextures = imageSources[planet];
      for (const key in planetTextures) {
        const url = planetTextures[key];
        if (url) {
          const priority = LOAD_PRIORITY[planet] ?? 0;
          allUrls.push({ planet, key, url, priority });
        }
      }
    }

    allUrls.sort((a, b) => b.priority - a.priority);

    this.totalCount = allUrls.length;
    this.loadedCount = 0;

    const promises = allUrls.map(({ planet, url }) => {
      return new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        const timeout = setTimeout(() => {
          this.loadedCount++;
          if (this.onProgress) {
            this.onProgress(this.loadedCount, this.totalCount, planet);
          }
          resolve({ status: 'timeout', url });
        }, 10000);

        img.onload = () => {
          clearTimeout(timeout);
          this.loadedCount++;
          this.textureCache.set(url, img);
          if (this.onProgress) {
            this.onProgress(this.loadedCount, this.totalCount, planet);
          }
          resolve({ status: 'fulfilled' });
        };

        img.onerror = () => {
          clearTimeout(timeout);
          this.loadedCount++;
          if (this.onProgress) {
            this.onProgress(this.loadedCount, this.totalCount, planet);
          }
          resolve({ status: 'rejected', url });
        };

        img.src = url;
      });
    });

    return Promise.all(promises).then(() => undefined);
  }

  preloadVisible(planetNames) {
    planetNames.forEach(name => {
      const lowerName = name.toLowerCase();
      if (LOAD_PRIORITY[lowerName]) {
        LOAD_PRIORITY[lowerName] = 10;
      }
    });
  }

  getLoadedCount() {
    return this.loadedCount;
  }

  getTotalCount() {
    return this.totalCount;
  }

  dispose() {
    this.textureCache.clear();
    this.loadingPromises.clear();
  }
}

export const textureManager = new TextureManager();
export { LOAD_PRIORITY };
