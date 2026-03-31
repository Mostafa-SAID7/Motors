/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts,tsx}",
    "./node_modules/primeng/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#dc2626",
        accent: "#6b7280",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
