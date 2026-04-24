/**
 * Disposes of a Three.js object and all its children, including geometries and materials.
 * @param {THREE.Object3D} object - The object to dispose
 */
export function disposeObject(object) {
  if (!object) return;

  object.traverse(child => {
    if (child.geometry) {
      child.geometry.dispose();
    }

    if (child.material) {
      disposeMaterial(child.material);
    }
  });
}

/**
 * Disposes of a material or array of materials.
 * @param {THREE.Material|THREE.Material[]} material
 */
export function disposeMaterial(material) {
  if (Array.isArray(material)) {
    material.forEach(disposeMaterial);
    return;
  }

  const mat = material;
  const textureProperties = [
    'map',
    'lightMap',
    'bumpMap',
    'normalMap',
    'specularMap',
    'envMap',
    'alphaMap',
    'aoMap',
    'displacementMap',
    'emissiveMap',
    'gradientMap',
    'metalnessMap',
    'roughnessMap',
    'clearcoatMap',
    'clearcoatNormalMap',
    'clearcoatRoughnessMap',
    'iridescenceMap',
    'iridescenceThicknessMap',
    'sheenColorMap',
    'sheenRoughnessMap',
    'specularMap',
    'specularColorMap',
    'specularIntensityMap',
    'tangentSpaceNormalMap',
    'thicknessMap',
    'transmissionMap',
    'opacityMap',
  ];

  textureProperties.forEach(prop => {
    if (mat[prop]) {
      mat[prop].dispose();
    }
  });

  if (mat.uniforms) {
    Object.values(mat.uniforms).forEach(uniform => {
      if (uniform.value instanceof THREE.Texture) {
        uniform.value.dispose();
      }
    });
  }

  mat.dispose();
}

/**
 * Disposes of all textures in a texture loader cache.
 */
export function disposeTextureCache() {
  if (THREE.Cache) {
    THREE.Cache.clear();
  }
}
