import { nextui } from "@nextui-org/react";

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    "node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  daisyui: {
    themes: ['corporate', 'black'],
  },
  darkMode: "class",
  plugins: [require('@tailwindcss/typography'), require('daisyui'), nextui()],
};
