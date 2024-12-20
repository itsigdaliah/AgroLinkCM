/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F5233',
          light: '#3A6B3F',
          dark: '#1E351F',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}