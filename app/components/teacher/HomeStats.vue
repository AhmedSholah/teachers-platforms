<script setup lang="ts">
import type { DashboardDateRange, DashboardPeriod } from '~/composables/useTeacherDashboard'

const props = defineProps<{
  period: DashboardPeriod
  range: DashboardDateRange
}>()

const { courses } = useCourses()
const { formatCurrency, formatNumber } = useTeacherDashboard()

interface StatCard {
  title: string
  icon: string
  value: string
  variation: number
  to: string
}

const rangeMultiplier = computed(() => {
  const diffMs = Math.abs(props.range.end.getTime() - props.range.start.getTime())
  const days = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)))
  if (days <= 7) return 0.35
  if (days <= 14) return 0.65
  if (days <= 31) return 1
  if (days <= 95) return 2.6
  return 4.5
})

const stats = computed<StatCard[]>(() => {
  const mult = rangeMultiplier.value
  const periodBoost = props.period === 'monthly' ? 1.08 : props.period === 'weekly' ? 1.03 : 1

  const publishedCourses = courses.value.filter(c => c.status === 'published').length || 6
  const totalStudents = Math.round(128 * mult * periodBoost)
  const totalRevenue = Math.round(18450 * mult * periodBoost)
  const enrollmentsCount = Math.round(42 * mult * periodBoost)

  return [
    {
      title: 'إجمالي الأرباح',
      icon: 'i-lucide-circle-dollar-sign',
      value: formatCurrency(totalRevenue),
      variation: 14,
      to: '/teacher-dashboard/payouts'
    },
    {
      title: 'الطلاب المسجلون',
      icon: 'i-lucide-users',
      value: formatNumber(totalStudents),
      variation: 12,
      to: '/teacher-dashboard/students'
    },
    {
      title: 'الدورات المنشورة',
      icon: 'i-lucide-book-open',
      value: formatNumber(publishedCourses),
      variation: 8,
      to: '/teacher-dashboard/courses'
    },
    {
      title: 'الاشتراكات الجديدة',
      icon: 'i-lucide-trending-up',
      value: formatNumber(enrollmentsCount),
      variation: props.period === 'daily' ? -2 : 9,
      to: '/teacher-dashboard/payouts'
    }
  ]
})
</script>

<template>
  <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
    <UPageCard
      v-for="(stat, index) in stats"
      :key="index"
      :icon="stat.icon"
      :title="stat.title"
      :to="stat.to"
      variant="subtle"
      :ui="{
        container: 'gap-y-1.5',
        wrapper: 'items-start',
        leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
        title: 'font-normal text-muted text-xs'
      }"
      class="lg:rounded-none first:rounded-s-lg last:rounded-e-lg hover:z-1"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold text-highlighted">
          {{ stat.value }}
        </span>

        <UBadge
          :color="stat.variation > 0 ? 'success' : 'error'"
          variant="subtle"
          class="text-xs"
        >
          {{ stat.variation > 0 ? `+${stat.variation}%` : `${stat.variation}%` }}
        </UBadge>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
