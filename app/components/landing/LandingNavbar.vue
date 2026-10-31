<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const links: NavigationMenuItem[] = [
  { label: 'الرئيسية', to: '/' },
  { label: 'المميزات', to: '#features' },
  { label: 'كيف تعمل؟', to: '#how-it-works' },
  { label: 'الأسعار', to: '#pricing' }
]
</script>

<template>
  <UHeader
    mode="drawer"
    class="border-b border-neutral-200/70 bg-white/80 backdrop-blur-xl"
  >
    <template #left>
      <LandingLogo />
    </template>

    <UNavigationMenu
      orientation="horizontal"
      :items="links"
      :ui="{
        link: 'px-3.5 py-2 rounded-lg text-[15px] text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 focus-visible:outline-2 focus-visible:outline-brand-500/40'
      }"
    />

    <template #right>
      <UButton
        to="/login"
        color="neutral"
        variant="ghost"
        class="hidden sm:inline-flex text-neutral-600 hover:text-neutral-900"
      >
        تسجيل الدخول
      </UButton>

      <UButton
        to="#pricing"
        size="md"
        class="shadow-sm shadow-brand-600/25 hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-300"
      >
        أنشئ منصتك مجانًا
      </UButton>
    </template>

    <template #body>
      <div class="flex flex-col gap-2">
        <UNavigationMenu
          orientation="vertical"
          :items="links"
          class="w-full"
          :ui="{
            link: 'px-4 py-3 rounded-xl text-base text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-brand-500/40'
          }"
        />

        <USeparator class="my-3" />

        <div class="grid gap-2.5">
          <UButton to="#pricing" size="lg" block class="text-base">أنشئ منصتك مجانًا</UButton>
          <UButton to="/login" size="lg" color="neutral" variant="outline" block class="text-base">
            تسجيل الدخول
          </UButton>
        </div>
      </div>
    </template>
  </UHeader>
</template>
