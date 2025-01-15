/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "",
          DEFAULT: "#7777ff",
          dark: "",
        },
        icon: {
          DEFAULT: "#333231",
          hover: "#3f3d3c",
        },
        link: {
          DEFAULT: "#ffbc6f",
          hover: "#fdd488",
          bg: "#987654",
          bghover: "#987654dc",
        },
        // --bg-color: #fafafa;
        // --bg-dark-color: #3b3b3a;
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

