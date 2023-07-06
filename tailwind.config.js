/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      animation: {
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) infinite",
        wiggle: "wiggle 0.3s cubic-bezier(.36,.07,.19,.97) infinite",
        weakping: "weakping 1.5s cubic-bezier(.36,.07,.19,.97) infinite",
      },
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(7deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(-7deg)" },
        },
        weakping: {
          "75%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.5)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
