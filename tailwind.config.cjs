/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      button: ["Open Sans"],
    },
    extend: {
      screens: {
        tablet: {
          max: "1079px",
        },
        laptop: {
          min: "1080px",
          max: "1439px",
        },
        desktop: {
          min: "1440px",
        },
      },
      colors: {
        appBlack: "#181818",
        appDarkGrey: "#1B1B1B",
        appGrey: "#B2B2B2",
        appBrightOrange: "#FF9B33",
        appYellow: "#FFD25F",
        appOrange: "#FF5C01",
        appSkyBlue: "#00D1FF",
        appTextGrey: "#929292",
        appBorderGrey: "#1F1F1F",
        appButtonBlack: "#121212",
      },
    },
  },
  plugins: [],
};
