<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import type { DashboardDateRange, DashboardPeriod } from '~/composables/useTeacherDashboard'

const props = defineProps<{
  period: DashboardPeriod
  range: DashboardDateRange
}>()

interface DataRecord {
  date: Date
  amount: number
}

const cardRef = useTemplateRef<HTMLElement>('cardRef')
const width = ref(720)
let observer: ResizeObserver | null = null

onMounted(() => {
  const el = (cardRef.value as unknown as { $el?: HTMLElement })?.$el || (cardRef.value as unknown as HTMLElement | null)
  if (!el) return
  width.value = el.getBoundingClientRect().width || 720
  observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (entry && entry.contentRect.width > 0) {
      width.value = entry.contentRect.width
    }
  })
  observer.observe(el)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

const { formatCurrency } = useTeacherDashboard()

const data = computed<DataRecord[]>(() => {
  const start = new Date(props.range.start)
  const end = new Date(props.range.end)
  const points: DataRecord[] = []

  const stepDays = props.period === 'monthly' ? 30 : props.period === 'weekly' ? 7 : 1
  const totalDays = Math.max(2, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
  const count = Math.min(36, Math.max(4, Math.floor(totalDays / stepDays) + 1))

  for (let i = 0; i < count; i++) {
    const d = new Date(start.getTime() + (i / (count - 1)) * (end.getTime() - start.getTime()))
    const base = props.period === 'monthly' ? 14500 : props.period === 'weekly' ? 4200 : 850
    const wave = Math.sin(i * 0.85) * base * 0.28 + Math.cos(i * 0.45) * base * 0.16
    const growth = i * (base * 0.03)
    points.push({
      date: d,
      amount: Math.max(200, Math.round(base + wave + growth))
    })
  }
  return points
})

const total = computed(() => data.value.reduce((acc, item) => acc + item.amount, 0))

const x = (_: DataRecord, i: number) => i
const y = (d: DataRecord) => d.amount

const formatAxisDate = (date: Date) => {
  return new Intl.DateTimeFormat('ar-EG', {
    day: 'numeric',
    month: 'short'
  }).format(date)
}

const xTicks = (i: number) => {
  if (i === 0 || i === data.value.length - 1 || !data.value[i]) {
    return ''
  }
  return formatAxisDate(data.value[i].date)
}

const tooltipTemplate = (d: DataRecord) => {
  return `<div style="direction:rtl;text-align:right;padding:4px 8px;font-family:Cairo,sans-serif;font-size:12px;">
    <div style="color:#64748b;margin-bottom:2px;">${formatAxisDate(d.date)}</div>
    <div style="font-weight:700;color:#0f172a;">${formatCurrency(d.amount)}</div>
  </div>`
}
</script>

<template>
  <UCard
    ref="cardRef"
    :ui="{ root: 'overflow-visible', body: '!px-0 !pt-0 !pb-3' }"
  >
    <template #header>
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs text-muted uppercase mb-1.5">
            إجمالي الإيرادات
          </p>
          <p class="text-3xl text-highlighted font-semibold">
            {{ formatCurrency(total) }}
          </p>
        </div>

        <UBadge color="primary" variant="subtle" size="sm">
          {{ period === 'daily' ? 'عرض يومي' : period === 'weekly' ? 'عرض أسبوعي' : 'عرض شهري' }}
        </UBadge>
      </div>
    </template>

    <div
      dir="ltr"
      class="w-full [--vis-crosshair-line-stroke-color:var(--ui-primary)] [--vis-crosshair-circle-stroke-color:var(--ui-bg)] [--vis-axis-grid-color:var(--ui-border)] [--vis-axis-tick-color:var(--ui-border)] [--vis-axis-tick-label-color:var(--ui-text-dimmed)] [--vis-tooltip-background-color:var(--ui-bg)] [--vis-tooltip-border-color:var(--ui-border)] [--vis-tooltip-text-color:var(--ui-text-highlighted)]"
    >
      <VisXYContainer
        :data="data"
        :padding="{ top: 40 }"
        class="h-80"
        :width="width"
      >
        <VisLine
          :x="x"
          :y="y"
          color="var(--ui-primary)"
        />
        <VisArea
          :x="x"
          :y="y"
          color="var(--ui-primary)"
          :opacity="0.1"
        />

        <VisAxis
          type="x"
          :x="x"
          :tick-format="xTicks"
        />

        <VisCrosshair
          color="var(--ui-primary)"
          :template="tooltipTemplate"
        />

        <VisTooltip />
      </VisXYContainer>
    </div>
  </UCard>
</template>
