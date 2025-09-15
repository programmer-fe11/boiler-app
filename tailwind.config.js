/** @type {import('tailwindcss').Config} */
import Colors from '@fewangsit/wangsvue-presets/fixedasset/colors.config.json';

export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ...Colors },
    },
  },
  plugins: [],
};
