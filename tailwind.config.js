/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "vazir-medium": ["var(--font-vazir-medium)"],
      },
    },
  },
  plugins: [],
};
