export default {
  target: 'static',
  head: {
    title: 'Best Drink',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { hid: 'description', name: 'description', content: '' },
      { hid: 'og:image', name: 'image', content: '' },
      { hid: 'og:title', name: 'title', content: '' },
      { hid: 'og:description', name: 'description', content: '' }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: '/apple-icon-57x57.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: '/apple-icon-60x60.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/apple-icon-72x72.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: '/apple-icon-76x76.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: '/apple-icon-114x114.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/apple-icon-120x120.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/apple-icon-144x144.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/apple-icon-152x152.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-icon-180x180.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/android-icon-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/manifest.json' },
      { name: 'msapplication-TileColor', content: '#EEEAE6' },
      { name: 'msapplication-TileImage"', content: '/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#151515' }
    ]
  },

  css: ['~/assets/styles/index.scss', 'swiper/swiper-bundle.css'],

  plugins: [
    '~/plugins/anime.ts',
    {
      src: '~/plugins/masonry.js',
      mode: 'client'
    },
    {
      src: '~/plugins/gsap.ts',
      mode: 'client'
    },
    {
      src: '~/plugins/splitting.ts',
      mode: 'client'
    },
    {
      src: '~/plugins/smooth-scrollbar.ts',
      mode: 'client'
    },
    {
      src: '~/plugins/router.ts',
      mode: 'client'
    }
  ],

  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '3000'
  },

  components: true,


  buildModules: [
    '@nuxtjs/pwa',
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/composition-api/module'
  ],

  modules: ['cookie-universal-nuxt', '@nuxtjs/axios'],

  build: {},

  axios: {
    baseURL: 'https://serverwe.herokuapp.com/api'
  }
}
