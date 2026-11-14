<script setup lang="ts">
import type { DashboardDateRange, DashboardPeriod } from '~/composables/useTeacherDashboard'

const model = defineModel<DashboardPeriod>({ required: true })

const props = defineProps<{
  range: DashboardDateRange
}>()

const dayCount = computed(() => {
  const diffMs = Math.abs(props.range.end.getTime() - props.range.start.getTime())
  return Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)))
})

const periods = computed(() => {
  if (dayCount.value <= 8) {
    return [
      { label: 'يومي', value: 'daily' as const }
    ]
  }
  if (dayCount.value <= 31) {
    return [
      { label: 'يومي', value: 'daily' as const },
      { label: 'أسبوعي', value: 'weekly' as const }
    ]
  }
  return [
    { label: 'أسبوعي', value: 'weekly' as const },
    { label: 'شهري', value: 'monthly' as const }
  ]
})

watch(periods, () => {
  if (!periods.value.some(p => p.value === model.value)) {
    model.value = periods.value[0]!.value
  }
}, { immediate: true })
</script>

<template>
  <USelect
    v-model="model"
    :items="periods"
    variant="ghost"
    class="data-[state=open]:bg-elevated"
    :ui="{ value: 'capitalize', itemLabel: 'capitalize', trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
  />
</template>
