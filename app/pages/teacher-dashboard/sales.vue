<script setup lang="ts">
useHead({
  title: 'المبيعات والأرباح - لوحة المعلم'
})

interface Transaction {
  id: string
  studentName: string
  courseTitle: string
  amount: string
  fee: string
  netAmount: string
  date: string
  status: 'completed' | 'refunded'
  paymentMethod: string
}

const transactions = ref<Transaction[]>([
  {
    id: 'TXN-8942',
    studentName: 'سارة علي أحمد',
    courseTitle: 'أساسيات الجبر والمصفوفات',
    amount: '150 ر.س',
    fee: '7.5 ر.س',
    netAmount: '142.5 ر.س',
    date: 'اليوم، 10:30 ص',
    status: 'completed',
    paymentMethod: 'مدى (Mada)'
  },
  {
    id: 'TXN-8941',
    studentName: 'محمد خالد الغامدي',
    courseTitle: 'حساب التفاضل والتكامل المتقدم',
    amount: '250 ر.س',
    fee: '12.5 ر.س',
    netAmount: '237.5 ر.س',
    date: 'أمس، 4:15 م',
    status: 'completed',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'TXN-8940',
    studentName: 'عبدالله بن فهد',
    courseTitle: 'أساسيات الجبر والمصفوفات',
    amount: '150 ر.س',
    fee: '7.5 ر.س',
    netAmount: '142.5 ر.س',
    date: '28 ديسمبر 2024',
    status: 'completed',
    paymentMethod: 'فيزا (Visa)'
  },
  {
    id: 'TXN-8939',
    studentName: 'ريم القحطاني',
    courseTitle: 'فيزياء الميكانيكا الكلاسيكية',
    amount: '200 ر.س',
    fee: '0 ر.س',
    netAmount: '200 ر.س',
    date: '24 ديسمبر 2024',
    status: 'refunded',
    paymentMethod: 'مدى (Mada)'
  },
  {
    id: 'TXN-8938',
    studentName: 'يوسف إبراهيم',
    courseTitle: 'حساب التفاضل والتكامل المتقدم',
    amount: '250 ر.س',
    fee: '12.5 ر.س',
    netAmount: '237.5 ر.س',
    date: '20 ديسمبر 2024',
    status: 'completed',
    paymentMethod: 'ماستركارد (Mastercard)'
  }
])

const activePeriod = ref<'month' | 'quarter' | 'year' | 'all'>('month')
const searchQuery = ref('')

const filteredTransactions = computed(() => {
  if (!searchQuery.value.trim()) return transactions.value
  const q = searchQuery.value.toLowerCase()
  return transactions.value.filter(t =>
    t.id.toLowerCase().includes(q) ||
    t.studentName.toLowerCase().includes(q) ||
    t.courseTitle.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="flex flex-col min-h-full">
    <!-- Sub-navbar Action Bar -->
    <DashboardActionBar>
      <UButton
        to="/teacher-dashboard/payouts/withdraw"
        icon="i-lucide-wallet"
        color="primary"
        variant="solid"
        size="md"
        class="font-bold rounded-xl"
      >
        طلب سحب أرباح
      </UButton>
      <UButton
        icon="i-lucide-download"
        color="neutral"
        variant="outline"
        size="md"
        class="font-bold rounded-xl"
      >
        تصدير التقرير
      </UButton>
    </DashboardActionBar>

    <div class="p-6 sm:p-8 lg:p-10 flex flex-col gap-6 max-w-7xl mx-auto w-full">

    <!-- Revenue Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white">
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-xs font-bold text-slate-500">إجمالي الأرباح</span>
            <span class="text-2xl sm:text-3xl font-extrabold text-slate-900">18,450 ر.س</span>
            <span class="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <UIcon name="i-lucide-trending-up" class="w-3.5 h-3.5" />
              +14% مقارنة بالشهر السابق
            </span>
          </div>
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-badge-dollar-sign" class="w-6 h-6" />
          </div>
        </div>
      </UCard>

      <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white">
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-xs font-bold text-slate-500">مبيعات هذا الشهر</span>
            <span class="text-2xl sm:text-3xl font-extrabold text-slate-900">4,250 ر.س</span>
            <span class="text-xs font-bold text-blue-600 mt-1">28 عملية بيع مكتملة</span>
          </div>
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-shopping-cart" class="w-6 h-6" />
          </div>
        </div>
      </UCard>

      <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white">
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-xs font-bold text-slate-500">الرصيد القابل للسحب</span>
            <span class="text-2xl sm:text-3xl font-extrabold text-slate-900">3,850 ر.س</span>
            <span class="text-xs text-slate-400 mt-1">متاح للتحويل فوراً</span>
          </div>
          <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-wallet" class="w-6 h-6" />
          </div>
        </div>
      </UCard>

      <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white">
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-xs font-bold text-slate-500">متوسط قيمة الطلب</span>
            <span class="text-2xl sm:text-3xl font-extrabold text-slate-900">180 ر.س</span>
            <span class="text-xs text-slate-400 mt-1">لكل دورة مباعة</span>
          </div>
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-calculator" class="w-6 h-6" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Filter Periods & Table Card -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }" class="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
      <!-- Toolbar -->
      <div class="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
        <div class="w-full sm:w-80">
          <UInput
            v-model="searchQuery"
            icon="i-lucide-search"
            placeholder="بحث برقم المعاملة، اسم الطالب، الدورة..."
            size="md"
            class="w-full"
          />
        </div>

        <div class="flex items-center gap-2 self-start sm:self-auto">
          <UButton
            :variant="activePeriod === 'month' ? 'solid' : 'ghost'"
            :color="activePeriod === 'month' ? 'primary' : 'neutral'"
            size="sm"
            class="rounded-xl font-bold px-3.5"
            @click="activePeriod = 'month'"
          >
            هذا الشهر
          </UButton>
          <UButton
            :variant="activePeriod === 'quarter' ? 'solid' : 'ghost'"
            :color="activePeriod === 'quarter' ? 'primary' : 'neutral'"
            size="sm"
            class="rounded-xl font-bold px-3.5"
            @click="activePeriod = 'quarter'"
          >
            آخر 3 أشهر
          </UButton>
          <UButton
            :variant="activePeriod === 'year' ? 'solid' : 'ghost'"
            :color="activePeriod === 'year' ? 'primary' : 'neutral'"
            size="sm"
            class="rounded-xl font-bold px-3.5"
            @click="activePeriod = 'year'"
          >
            هذا العام
          </UButton>
          <UButton
            :variant="activePeriod === 'all' ? 'solid' : 'ghost'"
            :color="activePeriod === 'all' ? 'primary' : 'neutral'"
            size="sm"
            class="rounded-xl font-bold px-3.5"
            @click="activePeriod = 'all'"
          >
            الكل
          </UButton>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-start border-collapse">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/80 text-xs font-bold text-slate-500">
              <th class="p-4 ps-6 text-start">رقم المعاملة</th>
              <th class="p-4 text-start">الطالب</th>
              <th class="p-4 text-start">الدورة</th>
              <th class="p-4 text-start">المبلغ</th>
              <th class="p-4 text-start">طريقة الدفع</th>
              <th class="p-4 text-start">التاريخ</th>
              <th class="p-4 pe-6 text-end">الحالة</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr
              v-for="txn in filteredTransactions"
              :key="txn.id"
              class="hover:bg-slate-50/70 transition-colors"
            >
              <!-- TXN ID -->
              <td class="p-4 ps-6">
                <span class="font-mono text-xs font-bold text-slate-900">{{ txn.id }}</span>
              </td>

              <!-- Student -->
              <td class="p-4">
                <span class="font-bold text-slate-900">{{ txn.studentName }}</span>
              </td>

              <!-- Course -->
              <td class="p-4">
                <span class="text-xs font-bold text-blue-600">{{ txn.courseTitle }}</span>
              </td>

              <!-- Amount & Net -->
              <td class="p-4">
                <div class="flex flex-col">
                  <span class="font-bold text-emerald-600">{{ txn.amount }}</span>
                  <span class="text-[11px] text-slate-400">صافي: {{ txn.netAmount }}</span>
                </div>
              </td>

              <!-- Payment Method -->
              <td class="p-4 text-xs font-medium text-slate-600">
                {{ txn.paymentMethod }}
              </td>

              <!-- Date -->
              <td class="p-4 text-xs text-slate-500">
                {{ txn.date }}
              </td>

              <!-- Status -->
              <td class="p-4 pe-6 text-end">
                <UBadge
                  :color="txn.status === 'completed' ? 'success' : 'error'"
                  variant="subtle"
                  size="sm"
                  class="font-bold"
                >
                  {{ txn.status === 'completed' ? 'ناجحة' : 'مستردة' }}
                </UBadge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredTransactions.length === 0"
        class="text-center py-12 p-6 flex flex-col items-center justify-center gap-2"
      >
        <UIcon name="i-lucide-receipt" class="w-8 h-8 text-slate-300" />
        <p class="text-sm font-bold text-slate-700">لم يتم العثور على أي معاملات</p>
        <p class="text-xs text-slate-400">لا توجد عمليات بيع تطابق البحث في هذه الفترة.</p>
      </div>
    </UCard>
    </div>
  </div>
</template>