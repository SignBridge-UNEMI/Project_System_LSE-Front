/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',  // Asegúrate de que Tailwind procese los archivos en la carpeta "app"
    './components/**/*.{js,jsx,ts,tsx}',  // Y cualquier otra carpeta que contenga archivos con clases de Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
