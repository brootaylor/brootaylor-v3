import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import importXPlugin from 'eslint-plugin-import-x';

export default [
  // Files never linted: dist/config are build output/tooling config, audits
  // is a generated Lighthouse report, .netlify is Netlify CLI's local dev
  // cache (vendored/bundled code, not our source).
  {
    ignores: ['dist/**', 'config/**', 'audits/**', '.netlify/**'],
  },

  // Base rules applied to every JS/MJS file in the repo.
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
      'import-x': importXPlugin,
    },
    rules: {
      // Turn off stylistic rules that would conflict with Prettier, then
      // report Prettier's own formatting diffs as lint errors.
      ...prettierConfig.rules,
      'prettier/prettier': 'error',

      // Catches unresolved imports, missing exports, import ordering, etc.
      ...importXPlugin.flatConfigs.recommended.rules,

      'no-unused-vars': 'warn',
      'no-console': 'off',
      'func-names': 'off',
      'no-undef': 'warn',
      'prefer-const': 'off',
    },
  },

  // Build-time / Node-context files (Eleventy config, data files, helpers).
  // These run under Node, so they get Node globals like `process`/`__dirname`.
  {
    files: [
      '.eleventy.js',
      'check-locklist-review.mjs',
      'scan-locks.mjs',
      'lib/**/*.js',
      'src/_data/**/*.js',
      'src/_content/**/*.11tydata.js',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Browser-context files: bundled by Rollup and shipped to the client, so
  // they get DOM globals like `window`/`document` instead of Node globals.
  {
    files: ['src/scripts/**/*.mjs', 'src/_includes/**/*.mjs'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Netlify Edge Functions run on Deno, not Node or a browser, so they need
  // their own global set (Web-standard APIs like `fetch`/`Request`/`Response`,
  // plus `process` which the code itself guards with a `typeof` check).
  {
    files: ['netlify/edge-functions/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.worker,
        process: 'readonly',
      },
    },
  },
];
