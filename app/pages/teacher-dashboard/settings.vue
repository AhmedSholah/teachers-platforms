<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const links = computed<NavigationMenuItem[][]>(() => [[
  {
    label: 'معلومات عامة',
    icon: 'i-lucide-monitor',
    to: '/teacher-dashboard/settings',
    exact: true,
    active: route.path === '/teacher-dashboard/settings' && (!route.query.tab || route.query.tab === 'general')
  },
  {
    label: 'عنوان المنصة (النطاق)',
    icon: 'i-lucide-globe',
    to: '/teacher-dashboard/settings?tab=domain',
    active: route.path === '/teacher-dashboard/settings' && route.query.tab === 'domain'
  },
  {
    label: 'تصميم المنصة',
    icon: 'i-lucide-palette',
    to: '/teacher-dashboard/settings?tab=design',
    active: route.path === '/teacher-dashboard/settings' && route.query.tab === 'design'
  },
  {
    label: 'اشتراك المنصة',
    icon: 'i-lucide-sparkles',
    to: '/teacher-dashboard/settings/subscription'
  },
  {
    label: 'الإشعارات',
    icon: 'i-lucide-bell',
    to: '/teacher-dashboard/settings/notifications'
  }
]])
</script>

<template>
  <UDashboardPanel id="teacher-settings" :ui="{ body: 'lg:py-10' }">
    <template #header>
      <UDashboardNavbar title="الإعدادات">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <TeacherUserMenu />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <UNavigationMenu
          :items="links"
          highlight
          class="-mx-1 flex-1"
        />
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full lg:max-w-3xl mx-auto">
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
