// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/google-fonts', '@pinia/nuxt'],
    devtools: {enabled: false},
    css: ['/assets/css/normalize.css', '/assets/css/style.css'],
    googleFonts: {
        families: {
            Roboto: [400, 700]
        }
    },
    alias: {
      "@/types": "/<rootDir>/types"
    }
})