import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettierConfig from "@vue/eslint-config-prettier";

export default defineConfig([
  // Base rules for files
  { files: ["**/*.{js,mjs,cjs,vue}"], languageOptions: { ecmaVersion: "latest", globals: globals.browser } },

  // Rules for Vue files
  {
    files: ["**/*.{vue,js,mjs,cjs}"],
    plugins: { vue: pluginVue },
    languageOptions: { parser: "vue-eslint-parser", parserOptions: { ecmaVersion: "latest" } },
    extends: ["plugin:vue/vue3-recommended", "eslint:recommended", prettierConfig],
  },

  // Rules for JavaScript files using CommonJS
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    plugins: { js },
    extends: ["js/recommended"],
  },

  // Additional settings for Prettier integration
  prettierConfig,
]);