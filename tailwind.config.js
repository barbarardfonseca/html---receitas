/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    //"./app.vue", // Inclua se você usa um arquivo app.vue
  ],
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['Brush Script MT', 'cursive'] // Sua fonte personalizada
      },
      // Você pode adicionar outras extensões aqui (cores, espaçamentos, etc.)
    },
  },
  plugins: [],
  }