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
    screens: {
      xs: "650px",
      sm: "960px",
      md: "1280px",
      lg: "1400px",
      xl: "1920px",
    },
  },
  plugins: [],
};
