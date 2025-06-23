import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#006633',
          light: '#A2D95B',
          red: '#D32F2F',
          gray: '#E5E5E5',
          black: '#000000',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};

export default config;
