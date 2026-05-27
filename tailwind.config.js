/** @type {import('tailwindcss').Config} */
export default {
  content: ['dist/**/*.html', 'src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      width: ['group-hover'], // add this line
    },
  },
  plugins: [],
}

