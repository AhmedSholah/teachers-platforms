<script setup lang="ts">
const year = new Date().getFullYear()

const links = [
  { label: 'الرئيسية', to: '/' },
  { label: 'المميزات', to: '#features' },
  { label: 'الأسعار', to: '#pricing' },
  { label: 'تواصل معنا', to: 'mailto:salam@manasatak.app' }
]
</script>

<template>
  <footer class="border-t border-neutral-200/70 bg-white">
    <UContainer class="py-12 sm:py-14">
      <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div class="max-w-sm">
          <LandingLogo />
          <p class="mt-4 text-sm leading-7 text-neutral-500">
            منصتك هي أسهل طريقة لتحويل خبرتك التعليمية إلى منصة متكاملة — كورساتك وطلابك ومدفوعاتك على رابط خاص باسمك.
          </p>
        </div>

        <nav aria-label="روابط التذييل">
          <ul class="flex flex-wrap gap-x-8 gap-y-3">
            <li v-for="link in links" :key="link.label">
              <ULink
                :to="link.to"
                class="text-sm outline-none transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-brand-500/40"
              >
                {{ link.label }}
              </ULink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-neutral-100 pt-6 sm:flex-row">
        <p class="text-xs text-neutral-400">© {{ year }} منصتك — جميع الحقوق محفوظة.</p>

        <span class="inline-flex items-center gap-1.5 rounded-md bg-neutral-50 px-2 py-1 text-[11px] text-neutral-400 ring-1 ring-neutral-100">
          <UIcon name="i-lucide-globe" class="size-3" />
          <span dir="ltr">manasatak.app</span>
        </span>
      </div>
    </UContainer>
  </footer>
</template>
