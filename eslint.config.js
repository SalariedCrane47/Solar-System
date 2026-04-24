import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  eslintConfigPrettier,
  {
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        THREE: 'readonly',
        CameraControls: 'readonly',
        EffectComposer: 'readonly',
        RenderPass: 'readonly',
        EffectPass: 'readonly',
        BloomEffect: 'readonly',
        OutlineEffect: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'warn',
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],
    },
  },
];
