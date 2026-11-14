<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

useHead({
  title: 'المدفوعات والمعاملات - لوحة التحكم'
})

interface Transaction {
  id: string
  title: string
  description: string
  type: 'earning' | 'usage' | 'payout'
  typeLabel: string
  amount: string
  isPositive: boolean
  date: string
  paymentMethod: string
  status: 'completed' | 'scheduled' | 'pending'
  statusLabel: string
}

const UBadge = resolveComponent('UBadge')
const UIcon = resolveComponent('UIcon')

const currency = ref('ج.م')
const totalAcademyEarnings = ref('48,250')
const earningsGrowth = ref('+18.4%')
const netAvailableProfit = ref('46,970')
const totalUsageAmount = ref('1,280')
const usageDueDate = ref('30 نوفمبر 2026')

const usageItems = ref([
  { title: 'اشتراك المنصة (الباقة الاحترافية Pro)', amount: '450 ج.م', icon: 'i-lucide-sparkles' },
  { title: 'استهلاك التخزين وبث الفيديو (145 GB)', amount: '520 ج.م', icon: 'i-lucide-hard-drive' },
  { title: 'رسوم بوابات الدفع والمعاملات (1.5%)', amount: '310 ج.م', icon: 'i-lucide-credit-card' }
])

const transactions = ref<Transaction[]>([
  {
    id: 'TXN-9842',
    title: 'شراء دورة: فيزياء الثانوية العامة (الميكانيكا)',
    description: 'الطالب: عمر سامي فاروق',
    type: 'earning',
    typeLabel: 'أرباح دورة',
    amount: '+450 ج.م',
    isPositive: true,
    date: '10 نوفمبر 2026، 03:45 م',
    paymentMethod: 'فودافون كاش',
    status: 'completed',
    statusLabel: 'مكتملة'
  },
  {
    id: 'USG-4089',
    title: 'رسوم استهلاك سعة التخزين والبث السحابي',
    description: 'استهلاك إضافي 25 GB لمقاطع الفيديو عالية الدقة',
    type: 'usage',
    typeLabel: 'تكلفة استخدام',
    amount: '-180 ج.م',
    isPositive: false,
    date: '08 نوفمبر 2026، 12:00 م',
    paymentMethod: 'خصم من أرباح نهاية الشهر',
    status: 'scheduled',
    statusLabel: 'تستحق نهاية الشهر'
  },
  {
    id: 'TXN-9841',
    title: 'شراء دورة: حساب التفاضل والتكامل المتقدم',
    description: 'الطالبة: مروة حسن عبد العزيز',
    type: 'earning',
    typeLabel: 'أرباح دورة',
    amount: '+350 ج.م',
    isPositive: true,
    date: '07 نوفمبر 2026، 06:15 م',
    paymentMethod: 'فوري (Fawry)',
    status: 'completed',
    statusLabel: 'مكتملة'
  },
  {
    id: 'TXN-9840',
    title: 'اشتراك شهري: مراجعات الكيمياء المكثفة',
    description: 'الطالب: إبراهيم يوسف السعدني',
    type: 'earning',
    typeLabel: 'أرباح اشتراك',
    amount: '+600 ج.م',
    isPositive: true,
    date: '05 نوفمبر 2026، 02:30 م',
    paymentMethod: 'بطاقة بنكية (Visa)',
    status: 'completed',
    statusLabel: 'مكتملة'
  },
  {
    id: 'USG-4088',
    title: 'رسوم تشغيل خدمات المنصة وبوابة الدفع',
    description: 'عمولة معالجة المدفوعات والخدمات السحابية',
    type: 'usage',
    typeLabel: 'تكلفة استخدام',
    amount: '-130 ج.م',
    isPositive: false,
    date: '03 نوفمبر 2026، 09:10 ص',
    paymentMethod: 'خصم تلقائي',
    status: 'scheduled',
    statusLabel: 'تستحق نهاية الشهر'
  },
  {
    id: 'WDR-1205',
    title: 'تحويل أرباح الحساب البنكي',
    description: 'البنك الأهلي المصري (حساب ينتهي بـ 4821)',
    type: 'payout',
    typeLabel: 'سحب أرباح',
    amount: '-8,200 ج.م',
    isPositive: false,
    date: '31 أكتوبر 2026، 11:30 ص',
    paymentMethod: 'تحويل بنكي مباشر',
    status: 'completed',
    statusLabel: 'مكتملة'
  },
  {
    id: 'USG-4087',
    title: 'اشتراك الباقة الاحترافية (Pro Plan)',
    description: 'فاتورة الاستخدام الشهري للخدمات المتقدمة',
    type: 'usage',
    typeLabel: 'تكلفة استخدام',
    amount: '-450 ج.م',
    isPositive: false,
    date: '31 أكتوبر 2026، 12:00 ص',
    paymentMethod: 'فاتورة الاشتراك الشهري',
    status: 'completed',
    statusLabel: 'مكتملة'
  },
  {
    id: 'TXN-9839',
    title: 'شراء دورة: أساسيات الجبر والمصفوفات',
    description: 'الطالب: كريم ناصر السعيد',
    type: 'earning',
    typeLabel: 'أرباح دورة',
    amount: '+300 ج.م',
    isPositive: true,
    date: '30 أكتوبر 2026، 08:20 م',
    paymentMethod: 'إنستاباي (InstaPay)',
    status: 'completed',
    statusLabel: 'مكتملة'
  }
])

const searchQuery = ref('')
const selectedType = ref<'all' | 'earning' | 'usage' | 'payout'>('all')

const typeFilterTabs = computed(() => [
  { label: `الكل (${transactions.value.length})`, value: 'all' },
  { label: `الأرباح (${transactions.value.filter(t => t.type === 'earning').length})`, value: 'earning' },
  { label: `الاستخدام (${transactions.value.filter(t => t.type === 'usage').length})`, value: 'usage' },
  { label: `السحوبات (${transactions.value.filter(t => t.type === 'payout').length})`, value: 'payout' }
])

const filteredTransactions = computed(() => {
  return transactions.value.filter((item) => {
    const matchesType = selectedType.value === 'all' || item.type === selectedType.value
    const q = searchQuery.value.trim().toLowerCase()
    const matchesQuery = !q ||
      item.id.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.paymentMethod.toLowerCase().includes(q)
    return matchesType && matchesQuery
  })
})

const columns: TableColumn<Transaction>[] = [
  {
    accessorKey: 'title',
    header: 'المعاملة والبيان',
    cell: ({ row }) => {
      const item = row.original
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', {
          class: [
            'size-8 rounded-full flex items-center justify-center shrink-0',
            item.type === 'earning' ? 'bg-success/10 text-success' : item.type === 'usage' ? 'bg-info/10 text-info' : 'bg-warning/10 text-warning'
          ]
        }, [
          h(UIcon, {
            name: item.type === 'earning' ? 'i-lucide-arrow-down-left' : item.type === 'usage' ? 'i-lucide-cpu' : 'i-lucide-arrow-up-right',
            class: 'size-4'
          })
        ]),
        h('div', { class: 'min-w-0' }, [
          h('p', { class: 'font-medium text-highlighted truncate' }, item.title),
          h('p', { class: 'text-xs text-muted truncate' }, `${item.id} • ${item.description}`)
        ])
      ])
    }
  },
  {
    accessorKey: 'typeLabel',
    header: 'النوع',
    cell: ({ row }) => {
      const color = row.original.type === 'earning' ? 'success' : row.original.type === 'usage' ? 'info' : 'warning'
      return h(UBadge, { color, variant: 'subtle' }, () => row.original.typeLabel)
    }
  },
  {
    accessorKey: 'date',
    header: 'التاريخ',
    cell: ({ row }) => h('span', { class: 'text-muted text-xs' }, row.original.date)
  },
  {
    accessorKey: 'paymentMethod',
    header: 'وسيلة الدفع',
    cell: ({ row }) => h('span', { class: 'text-default text-xs' }, row.original.paymentMethod)
  },
  {
    accessorKey: 'amount',
    header: 'المبلغ',
    cell: ({ row }) => h('span', {
      class: ['font-semibold', row.original.isPositive ? 'text-success' : 'text-highlighted']
    }, row.original.amount)
  },
  {
    accessorKey: 'statusLabel',
    header: () => h('div', { class: 'text-end' }, 'الحالة'),
    cell: ({ row }) => {
      const color = row.original.status === 'completed' ? 'success' : row.original.status === 'scheduled' ? 'warning' : 'neutral'
      return h('div', { class: 'text-end' }, h(UBadge, { color, variant: 'subtle' }, () => row.original.statusLabel))
    }
  }
]
</script>

<template>
  <UDashboardPanel id="teacher-payouts">
    <template #header>
      <UDashboardNavbar title="المدفوعات والمعاملات">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <TeacherUserMenu />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UButton
            to="/teacher-dashboard/payouts/withdraw"
            icon="i-lucide-arrow-up-right"
            label="سحب الأرباح"
          />
        </template>
      </UDashboardToolbar>

      <UDashboardToolbar>
        <template #left>
          <UTabs
            v-model="selectedType"
            :items="typeFilterTabs"
            :content="false"
            size="xs"
          />
        </template>

        <template #right>
          <UInput
            v-model="searchQuery"
            icon="i-lucide-search"
            placeholder="بحث برقم المعاملة أو البيان..."
            size="sm"
            class="w-64"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <!-- Connected 3 KPI Summary Cards matching template HomeStats -->
      <UPageGrid class="lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-px">
        <UPageCard
          icon="i-lucide-trending-up"
          title="إجمالي أرباح الأكاديمية"
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
              {{ totalAcademyEarnings }} {{ currency }}
            </span>
            <UBadge color="success" variant="subtle" class="text-xs">
              {{ earningsGrowth }}
            </UBadge>
          </div>
        </UPageCard>

        <UPageCard
          icon="i-lucide-wallet"
          title="صافي الرصيد المتاح للسحب"
          to="/teacher-dashboard/payouts/withdraw"
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
              {{ netAvailableProfit }} {{ currency }}
            </span>
            <UBadge color="primary" variant="subtle" class="text-xs">
              جاهز للسحب
            </UBadge>
          </div>
        </UPageCard>

        <UPageCard
          icon="i-lucide-server"
          title="تكلفة الاستخدام المستحقة"
          to="/teacher-dashboard/settings/subscription"
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
              {{ totalUsageAmount }} {{ currency }}
            </span>
            <UBadge color="warning" variant="subtle" class="text-xs">
              {{ usageDueDate }}
            </UBadge>
          </div>
        </UPageCard>
      </UPageGrid>

      <!-- Usage Cost Breakdown -->
      <UCard>
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p class="font-semibold text-highlighted text-sm">تفاصيل تكلفة الاستخدام الشهرية</p>
              <p class="text-xs text-muted">تُخصم تلقائياً من الرصيد في {{ usageDueDate }}</p>
            </div>
            <UButton
              to="/teacher-dashboard/settings/subscription"
              variant="ghost"
              color="neutral"
              size="xs"
              icon="i-lucide-sliders"
              label="إدارة الباقة"
            />
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            v-for="(item, idx) in usageItems"
            :key="idx"
            class="flex items-center justify-between p-3 rounded-lg bg-elevated/50 border border-default text-xs"
          >
            <div class="flex items-center gap-2 text-default min-w-0">
              <UIcon :name="item.icon" class="size-4 text-primary shrink-0" />
              <span class="truncate">{{ item.title }}</span>
            </div>
            <span class="font-semibold text-highlighted shrink-0 ms-2">{{ item.amount }}</span>
          </div>
        </div>
      </UCard>

      <!-- Transactions Table -->
      <UTable
        :data="filteredTransactions"
        :columns="columns"
        empty="لم يتم العثور على أي معاملات مطابقة للبحث."
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
  </UDashboardPanel>
</template>
