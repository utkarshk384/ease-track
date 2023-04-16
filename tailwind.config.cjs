/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        paragraph: "1em",
        "sub-heading": "1.25em",
        h2: "2em",
        h1: "2.5em",
      },
      colors: {
        primary: "#B6D0D5",
        secondary: "#103783",
        accent: "#F8AE47",
        black: "#252525",
        lightGrey: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
