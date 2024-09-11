import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-primary-100': 'var(--color-primary-100)',
        'color-primary-200': 'var(--color-primary-200)',
        'color-primary-300': 'var(--color-primary-300)',
        'color-primary-400': 'var(--color-primary-400)',
        'color-primary-500': 'var(--color-primary-500)',
        'color-primary-600': 'var(--color-primary-600)',
        'color-primary-700': 'var(--color-primary-700)',
        'color-primary-800': 'var(--color-primary-800)',
        'color-primary-900': 'var(--color-primary-900)',
        'color-gray-00': 'var(--color-gray-00)',
        'color-gray-100': 'var(--color-gray-100)',
        'color-gray-200': 'var(--color-gray-200)',
        'color-gray-300': 'var(--color-gray-300)',
        'color-gray-400': 'var(--color-gray-400)',
        'color-gray-500': 'var(--color-gray-500)',
        'color-gray-600': 'var(--color-gray-600)',
        'color-gray-700': 'var(--color-gray-700)',
        'color-gray-800': 'var(--color-gray-800)',
        'color-gray-900': 'var(--color-gray-900)',
        'color-red-100': 'var(--color-red-100)',
        'color-red-200': 'var(--color-red-200)',
        'color-red-300': 'var(--color-red-300)',
        'color-red-400': 'var(--color-red-400)',
        'color-red-500': 'var(--color-red-500)',
        'color-red-600': 'var(--color-red-600)',
        'color-red-700': 'var(--color-red-700)',
        'color-red-800': 'var(--color-red-800)',
        'color-red-900': 'var(--color-red-900)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
