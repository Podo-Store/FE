// tailwind.config.js
// v4에선 무시/불필요
module.exports = {
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
