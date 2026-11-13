<script setup lang="ts">
const route = useRoute()

const navLinks = [
  { label: 'كيف تعمل', href: '/#how' },
  { label: 'المميزات', href: '/#features' },
  { label: 'الأسعار', href: '/#pricing' },
  { label: 'الأسئلة الشائعة', href: '/#faq' }
]

const mobileMenuOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  }
)
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
    <UContainer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
        <!-- Brand Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          </div>
          <span class="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">[اسم علامتك]</span>
        </NuxtLink>

        <!-- Nav Items (Desktop) -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Auth Actions + Mobile Menu Toggle -->
        <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <UButton
            to="/login"
            :variant="route.path === '/login' ? 'soft' : 'ghost'"
            :color="route.path === '/login' ? 'primary' : 'neutral'"
            size="md"
            class="font-bold cursor-pointer whitespace-nowrap px-2.5 sm:px-3.5 text-xs sm:text-sm"
            :class="route.path === '/login' ? '' : 'text-slate-700 hover:text-blue-600'"
          >
            تسجيل الدخول
          </UButton>
          <UButton
            to="/register"
            color="primary"
            :variant="route.path === '/register' ? 'soft' : 'solid'"
            size="md"
            class="font-extrabold rounded-xl px-3 sm:px-5 py-2 sm:py-2.5 cursor-pointer whitespace-nowrap text-xs sm:text-sm"
            :class="route.path === '/register' ? '' : 'shadow-md shadow-blue-500/20'"
          >
            أنشئ منصتي
          </UButton>

          <!-- Mobile Navigation Toggle -->
          <UButton
            type="button"
            variant="ghost"
            color="neutral"
            size="md"
            :icon="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            aria-label="القائمة"
            class="md:hidden cursor-pointer text-slate-700 shrink-0"
            @click="mobileMenuOpen = !mobileMenuOpen"
          />
        </div>
      </div>

      <!-- Mobile Dropdown Navigation -->
      <nav
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-slate-100 py-3 flex flex-col gap-1"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </UContainer>
  </header>
</template>
