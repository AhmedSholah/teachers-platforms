<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { DashboardDateRange, DashboardPeriod, TeacherSaleRecord } from '~/composables/useTeacherDashboard'

defineProps<{
  period: DashboardPeriod
  range: DashboardDateRange
}>()

const UBadge = resolveComponent('UBadge')
const { formatCurrency } = useTeacherDashboard()

const data = ref<TeacherSaleRecord[]>([
  {
    id: '#4598',
    date: '13 نوفمبر، 17:12',
    status: 'paid',
    studentName: 'سارة علي أحمد',
    email: 'sara@example.com',
    courseTitle: 'أساسيات الجبر الخطي والمصفوفات',
    amount: 350
  },
  {
    id: '#4597',
    date: '13 نوفمبر، 14:12',
    status: 'pending',
    studentName: 'محمد خالد الغامدي',
    email: 'mohammed@example.com',
    courseTitle: 'حساب التفاضل والتكامل المتقدم',
    amount: 450
  },
  {
    id: '#4596',
    date: '13 نوفمبر، 13:12',
    status: 'paid',
    studentName: 'عبدالله بن فهد',
    email: 'abdullah@example.com',
    courseTitle: 'فيزياء الميكانيكا الكلاسيكية',
    amount: 300
  },
  {
    id: '#4595',
    date: '12 نوفمبر، 18:12',
    status: 'paid',
    studentName: 'ريم القحطاني',
    email: 'reem@example.com',
    courseTitle: 'أساسيات الجبر الخطي والمصفوفات',
    amount: 350
  },
  {
    id: '#4594',
    date: '12 نوفمبر، 09:40',
    status: 'refunded',
    studentName: 'يوسف إبراهيم',
    email: 'yousef@example.com',
    courseTitle: 'مراجعة الكيمياء المكثفة',
    amount: 220
  }
])

const statusMap = {
  paid: { label: 'مكتملة', color: 'success' as const },
  pending: { label: 'قيد المراجعة', color: 'warning' as const },
  refunded: { label: 'مستردة', color: 'neutral' as const }
}

const columns: TableColumn<TeacherSaleRecord>[] = [
  {
    accessorKey: 'id',
    header: 'رقم العملية',
    cell: ({ row }) => h('span', { class: 'font-medium text-highlighted' }, row.getValue('id'))
  },
  {
    accessorKey: 'date',
    header: 'التاريخ',
    cell: ({ row }) => h('span', { class: 'text-muted' }, row.getValue('date'))
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ({ row }) => {
      const status = row.getValue('status') as keyof typeof statusMap
      const meta = statusMap[status]
      return h(UBadge, { variant: 'subtle', color: meta.color }, () => meta.label)
    }
  },
  {
    accessorKey: 'studentName',
    header: 'الطالب',
    cell: ({ row }) => h('div', { class: 'flex flex-col' }, [
      h('span', { class: 'font-medium text-highlighted' }, row.original.studentName),
      h('span', { class: 'text-xs text-muted' }, row.original.email)
    ])
  },
  {
    accessorKey: 'courseTitle',
    header: 'الدورة',
    cell: ({ row }) => h('span', { class: 'text-default truncate block max-w-[220px]' }, row.getValue('courseTitle'))
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-end' }, 'المبلغ'),
    cell: ({ row }) => h('div', { class: 'text-end font-medium text-highlighted' }, formatCurrency(row.getValue('amount')))
  }
]
</script>

<template>
  <UTable
    :data="data"
    :columns="columns"
    class="shrink-0"
    :ui="{
      base: 'table-fixed border-separate border-spacing-0',
      thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
      tbody: '[&>tr]:last:[&>td]:border-b-0',
      th: 'first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e',
      td: 'border-b border-default'
    }"
  />
</template>
