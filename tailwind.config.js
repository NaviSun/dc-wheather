/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins"],
      },
      colors: {
        "blue": "#4EB6EE",
        "dark-blue": "#0a68e4",
      },
    },
    container: {
      center: true,
    },
  },
  
  plugins: [],
}

