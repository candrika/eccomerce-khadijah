/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  variants: {
    extend: {
      backgroundColor: ["responsive", "hover", "focus", "print"], // Add 'print' variant
    },
  },
  theme: {
    extend: {
      colors: {
        // primary: "#78b144",
        primary: "#00b4d8",
        darkblue: "#0077b6",
        warning: "#f8c84f",
        warningHover: "#f8c84f1A",
        dark: "rgb(8 47 73)",

        blue: "#1155CC1A",
        lime: "rgb(167 243 208)",
      },
    },
  },
  plugins: [],
};
