/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "input-outline": "0 0 0 2px rgba(0,0,0,0)",
        "button-outline": "0 0 0 1px #fff, 0 0 0 3px #3b82f6",
      },
    },
  },
  plugins: [],
};
