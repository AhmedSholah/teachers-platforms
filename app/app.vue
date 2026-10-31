<script setup lang="ts">
import { ar } from '@nuxt/ui/locale'

useHead({
  htmlAttrs: { lang: 'ar', dir: 'rtl' }
})
</script>

<template>
  <UApp :locale="ar">
    <NuxtPage />
  </UApp>
</template>
