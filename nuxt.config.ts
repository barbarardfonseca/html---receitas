import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  runtimeConfig: { public: { firebaseConfig: process.env.NUXT_PUBLIC_FIREBASE_CONFIG } },

  tiptap: { prefix: "Tiptap" },

  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "nuxt-tiptap-editor"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins:[
      tailwindcss(),
    ]
  }
});