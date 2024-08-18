// https://nuxt.com/docs/guide/directory-structure/nuxt.config#nuxt-config-file
export default defineNuxtConfig({
  modules: [
    'nuxt-content-assets',
    '@nuxt/content',
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  content: {
    documentDriven: true,
    experimental: {
      clientDB: true,
    },
    highlight: {
      langs: [
        'angular-html',
        'angular-ts',
        'bat',
        'csharp',
        'css',
        'csv',
        'docker',
        'graphql',
        'html',
        'html-derivative',
        'javascript',
        'json',
        'json5',
        'jsonl',
        'jsx',
        'less',
        'log',
        'markdown',
        'php',
        'postcss',
        'powershell',
        'python',
        'razor',
        'regexp',
        'sass',
        'scss',
        'stylus',
        'tsx',
        'typescript',
        'vue',
        'vue-html',
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
  ],

  compatibilityDate: '2024-08-10'
})