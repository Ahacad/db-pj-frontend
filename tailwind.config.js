module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        152: "38rem",
        190: "47.5rem",
      },
      minHeight: {
        10: "2.5rem",
        36: "9rem",
        48: "12rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
