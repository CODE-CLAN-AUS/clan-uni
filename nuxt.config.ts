// https://nuxt.com/docs/guide/directory-structure/nuxt.config#nuxt-config-file

import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  site: {
    url: 'https://uni.codeclan.org',
    name: 'CLAN UNI'
  },
  modules: [
    '@nuxt/content',
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    "@nuxtjs/robots",
    "@nuxt/image",
    'shadcn-nuxt'
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: '',
  },
  css: [
    '~/assets/css/tailwind.css',
    'public/styles/common.scss',
    'public/styles/light.scss',
    'public/styles/dark.scss',
  ],
  components:true,
  compatibilityDate: '2024-08-10',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})