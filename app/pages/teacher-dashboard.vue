<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

definePageMeta({
  alias: ['/teacher', '/dashboard', '/dashboard/teacher']
})

const route = useRoute()
const open = ref(false)

const { unreadCount } = useTeacherDashboard()
const { courses, ensureLoaded } = useCourses()
await ensureLoaded()

const isSettingsActive = computed(() => {
  return route.path.startsWith('/teacher-dashboard/settings') || route.path.includes('/profile') || route.path.includes('/design')
})

const navigationLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: 'الرئيسية',
    icon: 'i-lucide-house',
    to: '/teacher-dashboard',
    exact: true,
    onSelect: () => { open.value = false }
  },
  {
    label: 'دوراتي',
    icon: 'i-lucide-book-open',
    to: '/teacher-dashboard/courses',
    active: route.path.startsWith('/teacher-dashboard/courses'),
    onSelect: () => { open.value = false }
  },
  {
    label: 'الطلاب',
    icon: 'i-lucide-users',
    to: '/teacher-dashboard/students',
    onSelect: () => { open.value = false }
  },
  {
    label: 'المدفوعات',
    icon: 'i-lucide-wallet',
    to: '/teacher-dashboard/payouts',
    active: route.path.startsWith('/teacher-dashboard/payouts'),
    onSelect: () => { open.value = false }
  },
  {
    label: 'الإشعارات',
    icon: 'i-lucide-inbox',
    to: '/teacher-dashboard/notifications',
    badge: unreadCount.value > 0 ? String(unreadCount.value) : undefined,
    onSelect: () => { open.value = false }
  },
  {
    label: 'الإعدادات',
    to: '/teacher-dashboard/settings',
    icon: 'i-lucide-settings',
    defaultOpen: isSettingsActive.value,
    type: 'trigger',
    children: [
      {
        label: 'إعدادات المنصة',
        to: '/teacher-dashboard/settings',
        exact: true,
        active: route.path === '/teacher-dashboard/settings' && (!route.query.tab || route.query.tab === 'general'),
        onSelect: () => { open.value = false }
      },
      {
        label: 'عنوان المنصة (النطاق)',
        to: '/teacher-dashboard/settings?tab=domain',
        active: route.path === '/teacher-dashboard/settings' && route.query.tab === 'domain',
        onSelect: () => { open.value = false }
      },
      {
        label: 'تصميم المنصة',
        to: '/teacher-dashboard/settings?tab=design',
        active: route.path === '/teacher-dashboard/settings' && route.query.tab === 'design',
        onSelect: () => { open.value = false }
      },
      {
        label: 'اشتراك المنصة',
        to: '/teacher-dashboard/settings/subscription',
        onSelect: () => { open.value = false }
      },
      {
        label: 'إعدادات الإشعارات',
        to: '/teacher-dashboard/settings/notifications',
        onSelect: () => { open.value = false }
      },
      {
        label: 'الملف الشخصي',
        to: '/teacher-dashboard/profile',
        onSelect: () => { open.value = false }
      }
    ]
  }
])

const searchGroups = computed(() => [
  {
    id: 'links',
    label: 'التنقل السريع',
    items: [
      { label: 'الرئيسية', icon: 'i-lucide-house', to: '/teacher-dashboard' },
      { label: 'دوراتي', icon: 'i-lucide-book-open', to: '/teacher-dashboard/courses' },
      { label: 'الطلاب', icon: 'i-lucide-users', to: '/teacher-dashboard/students' },
      { label: 'المدفوعات', icon: 'i-lucide-wallet', to: '/teacher-dashboard/payouts' },
      { label: 'الإشعارات', icon: 'i-lucide-inbox', to: '/teacher-dashboard/notifications' },
      { label: 'إعدادات المنصة', icon: 'i-lucide-settings', to: '/teacher-dashboard/settings' },
      { label: 'الملف الشخصي', icon: 'i-lucide-user', to: '/teacher-dashboard/profile' }
    ]
  },
  {
    id: 'actions',
    label: 'إجراءات سريعة',
    items: [
      { label: 'إنشاء دورة جديدة', icon: 'i-lucide-plus', to: '/teacher-dashboard/courses/new' },
      { label: 'سحب الأرباح', icon: 'i-lucide-arrow-up-right', to: '/teacher-dashboard/payouts/withdraw' }
    ]
  },
  ...(courses.value.length > 0
    ? [{
        id: 'courses',
        label: 'الدورات',
        items: courses.value.slice(0, 8).map(c => ({
          label: c.title,
          suffix: c.category || c.price,
          icon: 'i-lucide-graduation-cap',
          to: `/teacher-dashboard/courses/edit?id=${c.id}`
        }))
      }]
    : [])
])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="teacher-default"
      v-model:open="open"
      collapsible
      resizable
      :default-size="17"
      :menu="{ side: 'right' }"
      class="bg-elevated/25"
    >
      <template #header="{ collapsed }">
        <NuxtLink
          to="/teacher-dashboard"
          class="flex items-center gap-2.5 min-w-0 px-1 py-1"
          @click="open = false"
        >
          <div class="size-8 rounded-lg bg-primary text-inverted flex items-center justify-center shrink-0 shadow-xs">
            <UIcon name="i-lucide-graduation-cap" class="size-5" />
          </div>
          <span
            v-if="!collapsed"
            class="text-base font-bold text-highlighted truncate"
          >
            منصة المعلم
          </span>
        </NuxtLink>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton
          :collapsed="collapsed"
          label="بحث..."
          size="lg"
          class="bg-transparent ring-default"
          :class="[!collapsed && 'py-2.5']"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="navigationLinks"
          orientation="vertical"
          tooltip
          popover
          :ui="{
            list: 'space-y-1',
            childList: 'space-y-1 py-1',
            link: collapsed ? 'py-2.5 justify-center' : 'px-3.5 py-2.5 text-base gap-3 before:rounded-lg',
            linkLeadingIcon: 'size-6',
            linkTrailingIcon: 'size-5',
            linkTrailingBadgeSize: 'md',
            childLink: 'p-2.5 gap-2.5 text-base',
            childLinkIcon: 'size-5'
          }"
        />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch
      :groups="searchGroups"
      :color-mode="false"
      placeholder="ابحث عن صفحة، دورة، أو إجراء..."
    />

    <NuxtPage />

    <TeacherNotificationsSlideover />
  </UDashboardGroup>
</template>