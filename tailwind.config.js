/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Bai Jamjuree", "sans-serif"],
        secondary: ["Chakra Petch", "sans-serif"],
      },
    },
  },
  plugins: [],
};
