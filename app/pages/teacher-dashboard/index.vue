<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { DashboardDateRange, DashboardPeriod } from '~/composables/useTeacherDashboard'

useHead({
  title: 'الرئيسية - لوحة المعلم'
})

const { isNotificationsSlideoverOpen, unreadCount } = useTeacherDashboard()
const { ensureLoaded } = useCourses()
await ensureLoaded()

defineShortcuts({
  n: () => {
    isNotificationsSlideoverOpen.value = !isNotificationsSlideoverOpen.value
  }
})

const quickActionItems = [[
  {
    label: 'دورة جديدة',
    icon: 'i-lucide-book-plus',
    to: '/teacher-dashboard/courses/new'
  },
  {
    label: 'سحب الأرباح',
    icon: 'i-lucide-wallet',
    to: '/teacher-dashboard/payouts/withdraw'
  }
]] satisfies DropdownMenuItem[][]

const now = new Date()
const start = new Date(now)
start.setDate(now.getDate() - 14)

const range = shallowRef<DashboardDateRange>({
  start,
  end: now
})

const period = ref<DashboardPeriod>('daily')
</script>

<template>
  <UDashboardPanel id="teacher-home">
    <template #header>
      <UDashboardNavbar title="الرئيسية" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip text="الإشعارات" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              aria-label="الإشعارات"
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset :show="unreadCount > 0">
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdownMenu :items="quickActionItems">
            <UButton
              icon="i-lucide-plus"
              size="md"
              class="rounded-full"
              aria-label="إجراء سريع"
            />
          </UDropdownMenu>

          <TeacherUserMenu />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <TeacherHomeDateRangePicker v-model="range" class="-ms-1" />
          <TeacherHomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <TeacherHomeStats :period="period" :range="range" />
      <TeacherHomeChart :period="period" :range="range" />
      <TeacherHomeSales :period="period" :range="range" />
    </template>
  </UDashboardPanel>
</template>