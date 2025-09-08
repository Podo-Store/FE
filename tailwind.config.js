// tailwind.config.js
// v4에선 무시/불필요
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["'Pretendard'", "sans-serif"],
      },
      keyframes: {
        "toast-in": {
          "0%": { opacity: "0", transform: "translate(-50%,-10px)" },
          "100%": { opacity: "1", transform: "translate(-50%,0)" },
        },
        "toast-out": {
          "0%": { opacity: "1", transform: "translate(-50%,0)" },
          "100%": { opacity: "0", transform: "translate(-50%,-10px)" },
        },
      },
      animation: {
        // 0.25s 등장 후, 0.75s 대기 포함 총 1s 안에 사라짐
        "toast-in-out":
          "toast-in 0.25s ease-out, toast-out 0.25s ease-in 0.75s forwards",
      },
    },
  },
  plugins: [],
};
