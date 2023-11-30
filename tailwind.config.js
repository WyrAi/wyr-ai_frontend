/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        foreground: "#CCCCCC",
        blue: "#1B9BEF",
        green: "#26BA98",
        dark: "#333333",
        darkGray: "#666666",
        lightGray: "#999999",
        slimeGray: "#F7F7F7",
        transparent: "#00000080",
        orange: "#EE7360",
        lightBlue: "#EFF8FE",
        lightRed: "#FF686B",
        lightGreen: "#29BF12",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#d0fc99",
          secondary: "#7db4db",
          accent: "#85aaea",
          neutral: "#282730",
          "base-100": "#f5f3f6",
          info: "#4f6af3",
          success: "#7aebb6",
          warning: "#f3b73f",
          error: "#f12253",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
