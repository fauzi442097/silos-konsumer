/** @type {import('tailwindcss').Config} */

// const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      width: {
        "modal-sm": "300px",
        "modal-lg": "800px",
        "modal-xl": "1140px",
        "modal-base": "500px"
      },
      screens: {
        lg: '991px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'border-light': 'var(--color-border-light)',
        'border-dark': 'var(--color-border-dark)',
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
          'depth1': 'rgb(var(--color-dark-depth1))',
          'depth2': 'rgb(var(--color-dark-depth2))',
          'depth3': 'var(--color-dark-depth3)'
        },
        'grey': 'rgb(var(--color-text-dark))',
        'muted' : 'var(--color-text-muted)',
        'light': 'var(--color-text-light)',
        'yellow-logo': 'rgb(var(--color-yellow-logo))',
        'red-logo': 'rgb(var(--color-red-logo))',
        'dark-blue-logo' : 'rgb(var(--color-dark-blue-logo))'
      },
      backgroundColor: {
        "form-read-only": "3c413fba",
        "form-check-disabled" : "#f2f3f5",
        "dark-form-check-disabled": "#2c302f",
      },
      fontFamily: {
        "inter-thin": ['var(--font-inter-thin)'],
        "inter-extralight": ['var(--font-inter-extralight)'],
        "inter-light": ['var(--font-inter-light)'],
        "inter": ['var(--font-inter-regular)'],
        "inter-medium": ['var(--font-inter-medium)'],
        "inter-semibold": ['var(--font-inter-semibold)'],
        "inter-bold": ['var(--font-inter-bold)'],
        "inter-extrabold": ['var(--font-inter-extrabold)'],
      }
    },
  },
  plugins: [],
}
