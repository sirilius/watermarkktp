/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk,js}"],
  theme: {
    extend: {
      height: {
        518: "518px",
      },
      colors: {
        "gradient-btn-from": "rgb(255 255 255 / 5%)",
        "gradient-btn-to": "rgb(255 255 255 / 1%)",
      },
      boxShadow: {
        "3d-blue-button":
          "inset 0 1px 0 0 hsl(0deg 0% 100% / 10%), 0 0 0 1px rgb(37 99 235), 0 2px 3px 0 rgb(9 11 20 / 18%), 0 2px 1px 0 rgb(9 11 20 / 12%)",
        "3d-red-button":
          "inset 0 1px 0 0 hsl(0deg 0% 100% / 10%), 0 0 0 1px rgb(185 28 28), 0 2px 3px 0 rgb(9 11 20 / 18%), 0 2px 1px 0 rgb(9 11 20 / 12%)",
        "3d-black-button":
          "inset 0 1px 0 0 hsl(0deg 0% 100% / 10%), 0 0 0 1px rgb(93 93 93), 0 2px 3px 0 rgb(9 11 20 / 18%), 0 2px 1px 0 rgb(9 11 20 / 12%)",
      },
    },
  },
  plugins: [],
};
