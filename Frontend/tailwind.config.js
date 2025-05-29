/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - var(--gap)/2))" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(calc(-50% - var(--gap)/2))" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-reverse": "marquee-reverse var(--duration) linear infinite",
      },
    },
  },
  plugins: [tailwindcss()],
};
