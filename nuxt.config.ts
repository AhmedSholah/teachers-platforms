// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/image'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  // The landing page is designed light-first (white/neutral surfaces).
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ar', dir: 'rtl' },
      title: 'منصتك — منصتك التعليمية، باسمك',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'أنشئ منصتك التعليمية الخاصة خلال دقائق، وابدأ في تقديم كورساتك وإدارة طلابك من مكان واحد — على رابط خاص باسمك.'
        },
        { name: 'theme-color', content: '#ffffff' },
        // Social preview (og:locale is Arabic Egypt by default)
        { property: 'og:site_name', content: 'منصتك' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'منصتك — منصتك التعليمية، باسمك' },
        {
          property: 'og:description',
          content: 'أنشئ منصتك التعليمية الخاصة خلال دقائق، وابدأ في تقديم كورساتك وإدارة طلابك من مكان واحد.'
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'منصتك — منصتك التعليمية، باسمك' },
        {
          name: 'twitter:description',
          content: 'أنشئ منصتك التعليمية الخاصة خلال دقائق، وابدأ في تقديم كورساتك وإدارة طلابك من مكان واحد.'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  }
})
