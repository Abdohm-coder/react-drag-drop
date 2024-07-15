/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3e6ff3",
        secondary: "#e3eafd",
        background: "#f2f4f7",
        accent: "#40b8f8",
        success: "#68d064",
        danger: "#ff5d54",
        dark: "#393841",
        light: "#a2b1c7",
      },
    },
  },
  plugins: [],
};
