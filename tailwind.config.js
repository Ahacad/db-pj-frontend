module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        152: "38rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
