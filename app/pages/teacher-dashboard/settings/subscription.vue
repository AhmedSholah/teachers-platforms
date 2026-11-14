<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

useHead({
  title: 'اشتراك المنصة - الإعدادات'
})

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const currentPlan = {
  name: 'الباقة الاحترافية (Pro)',
  price: '49$',
  cycle: 'شهرياً',
  status: 'نشط',
  renewalDate: '15 ديسمبر 2026',
  storageUsed: 45,
  storageLimit: 100,
  coursesCount: 12,
  coursesLimit: 'غير محدود',
  studentsCount: 348
}

const plans = [
  {
    id: 'starter',
    name: 'الباقة الأساسية',
    icon: 'i-lucide-zap',
    price: '19$',
    period: '/ شهرياً',
    description: 'مثالية للمدرسين في بداية انطلاقهم.',
    isCurrent: false,
    features: [
      'حتى 3 دورات تدريبية',
      'حتى 100 طالب نشط',
      'مساحة تخزين 20 جيجابايت',
      'عمولة مبيعات 7%'
    ]
  },
  {
    id: 'pro',
    name: 'الباقة الاحترافية',
    icon: 'i-lucide-sparkles',
    price: '49$',
    period: '/ شهرياً',
    description: 'الخيار الأفضل للنمو والتوسع مع نطاق مخصص.',
    isCurrent: true,
    popular: true,
    features: [
      'دورات وطلاب غير محدودين',
      'مساحة تخزين 100 جيجابايت',
      'ربط نطاق خاص (Custom Domain)',
      'عمولة مبيعات مخفّضة 3%'
    ]
  },
  {
    id: 'enterprise',
    name: 'باقة المؤسسات',
    icon: 'i-lucide-crown',
    price: '129$',
    period: '/ شهرياً',
    description: 'حلول متكاملة للمراكز والأكاديميات الكبرى.',
    isCurrent: false,
    features: [
      'جميع ميزات الباقة الاحترافية',
      'مساحة تخزين 500 جيجابايت',
      'عمولة مبيعات 0%',
      'حسابات متعددة للمدرسين'
    ]
  }
]

interface Invoice {
  id: string
  date: string
  amount: string
  status: string
}

const invoices: Invoice[] = [
  { id: 'INV-2026-003', date: '15 أكتوبر 2026', amount: '49.00$', status: 'مدفوعة' },
  { id: 'INV-2026-002', date: '15 سبتمبر 2026', amount: '49.00$', status: 'مدفوعة' },
  { id: 'INV-2026-001', date: '15 أغسطس 2026', amount: '49.00$', status: 'مدفوعة' }
]

const invoiceColumns: TableColumn<Invoice>[] = [
  {
    accessorKey: 'id',
    header: 'رقم الفاتورة',
    cell: ({ row }) => h('span', { class: 'font-mono font-medium text-highlighted' }, row.getValue('id'))
  },
  {
    accessorKey: 'date',
    header: 'التاريخ',
    cell: ({ row }) => h('span', { class: 'text-muted' }, row.getValue('date'))
  },
  {
    accessorKey: 'amount',
    header: 'المبلغ',
    cell: ({ row }) => h('span', { class: 'font-medium text-highlighted' }, row.getValue('amount'))
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ({ row }) => h(UBadge, { color: 'success', variant: 'subtle' }, () => row.getValue('status'))
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-end' }, 'الإجراء'),
    cell: () => h('div', { class: 'text-end' }, h(UButton, {
      variant: 'ghost',
      color: 'neutral',
      size: 'xs',
      icon: 'i-lucide-download',
      label: 'تحميل'
    }))
  }
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <UPageCard
      :title="currentPlan.name"
      :description="`تتجدد تلقائياً في ${currentPlan.renewalDate}`"
      variant="subtle"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-2.5">
            <span class="text-lg font-semibold text-highlighted">{{ currentPlan.name }}</span>
            <UBadge color="success" variant="subtle">{{ currentPlan.status }}</UBadge>
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold text-highlighted">{{ currentPlan.price }}</span>
            <span class="text-xs text-muted">/ {{ currentPlan.cycle }}</span>
          </div>
        </div>
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="p-3.5 rounded-lg bg-default border border-default flex flex-col gap-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-muted">التخزين</span>
            <span class="font-semibold text-highlighted">{{ currentPlan.storageUsed }} / {{ currentPlan.storageLimit }} GB</span>
          </div>
          <UProgress :model-value="45" size="sm" />
        </div>

        <div class="p-3.5 rounded-lg bg-default border border-default flex flex-col gap-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-muted">الدورات</span>
            <span class="font-semibold text-highlighted">{{ currentPlan.coursesCount }} ({{ currentPlan.coursesLimit }})</span>
          </div>
          <UProgress :model-value="100" color="success" size="sm" />
        </div>

        <div class="p-3.5 rounded-lg bg-default border border-default flex flex-col gap-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-muted">الطلاب</span>
            <span class="font-semibold text-highlighted">{{ currentPlan.studentsCount }} طالب</span>
          </div>
          <UProgress :model-value="100" color="success" size="sm" />
        </div>
      </div>

      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <UButton icon="i-lucide-sparkles" label="ترقية الباقة" />
            <UButton color="neutral" variant="outline" icon="i-lucide-credit-card" label="بطاقة الدفع" />
          </div>
          <UButton color="error" variant="ghost" size="sm" label="إلغاء الاشتراك" />
        </div>
      </template>
    </UPageCard>

    <div>
      <UPageCard
        title="الباقات المتاحة"
        description="اختر الخطة المناسبة لحجم ونمو أكاديميتك."
        variant="naked"
        class="mb-4"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UPageCard
          v-for="plan in plans"
          :key="plan.id"
          :title="plan.name"
          :description="plan.description"
          :icon="plan.icon"
          :highlight="plan.popular"
          variant="subtle"
        >
          <div class="flex items-baseline gap-1 my-2">
            <span class="text-2xl font-bold text-highlighted">{{ plan.price }}</span>
            <span class="text-xs text-muted">{{ plan.period }}</span>
          </div>

          <ul class="flex flex-col gap-2 text-xs text-default">
            <li v-for="(feat, i) in plan.features" :key="i" class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="size-3.5 text-primary shrink-0" />
              <span>{{ feat }}</span>
            </li>
          </ul>

          <template #footer>
            <UButton
              :disabled="plan.isCurrent"
              :variant="plan.isCurrent ? 'subtle' : plan.popular ? 'solid' : 'outline'"
              :color="plan.isCurrent ? 'neutral' : plan.popular ? 'primary' : 'neutral'"
              block
              :label="plan.isCurrent ? 'باقتك الحالية' : 'اختيار الباقة'"
            />
          </template>
        </UPageCard>
      </div>
    </div>

    <div>
      <UPageCard
        title="سجل الفواتير"
        description="استعراض وتحميل فواتير الاشتراك السابقة."
        variant="naked"
        class="mb-4"
      />

      <UTable
        :data="invoices"
        :columns="invoiceColumns"
        :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e',
          td: 'border-b border-default'
        }"
      />
    </div>
  </div>
</template>
