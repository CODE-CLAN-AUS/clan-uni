// https://nuxt.com/docs/guide/directory-structure/nuxt.config#nuxt-config-file
export default defineNuxtConfig({
  modules: [
    'nuxt-content-assets',
    '@nuxt/content',
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    "nuxt-lazytube"
  ],
  content: {
    documentDriven: true,
    experimental: {
      clientDB: true,
    },
    highlight: {
      langs: [
        'csharp',
        'typescript',
      ],
      theme: {
        default: 'light-plus',
        dark: 'dark-plus',
      },
    },
  },
  colorMode: {
    classSuffix: '',
  },
  css: [
    'public/styles/common.scss',
    'public/styles/light.scss',
    'public/styles/dark.scss',
  ]
})