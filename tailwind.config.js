/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'light-primary': 'var(--color-light-primary)',
        'primary': {
          DEFAULT: 'rgb(var(--color-primary))',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          950: 'var(--color-primary-950)',
        },
        'main': 'rgb(var(--color-background))',
        'dark' : {
          'main' : 'rgb(var(--color-dark-main))',
          'depth1': 'rgb(var(--color-dark-depth1))'
        },
        'grey': 'rgb(var(--color-text-dark))',
        'yellow-logo': 'rgb(var(--color-yellow-logo))',
        'red-logo': 'rgb(var(--color-red-logo))',
      },
    },
  },
  plugins: [],
}
