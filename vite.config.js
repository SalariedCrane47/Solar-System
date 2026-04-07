import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Silence the warning — Three.js vendor chunk will intentionally exceed 500 kB
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('three'))          return 'vendor-three';
          if (id.includes('postprocessing')) return 'vendor-fx';
          if (id.includes('camera-controls')) return 'vendor-fx';

          return 'vendor';
        },
      },
    },
  },
});
