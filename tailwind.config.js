/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      fontFamily: {
        itim: ['Itim', 'cursive'],
        chewy: ['Chewy', 'cursive'],
      },
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: ["light"],
  },
}

