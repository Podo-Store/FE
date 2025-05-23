// tailwind.config.js
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["'Pretendard'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
