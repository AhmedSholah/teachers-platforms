<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'ar',
    dir: 'rtl'
  },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap' }
  ]
})
</script>

<template>
  <div dir="rtl" class="app-root">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Cairo', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  direction: rtl;
  text-align: right;
  background-color: #FFFFFF;
}

*, *::before, *::after {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
