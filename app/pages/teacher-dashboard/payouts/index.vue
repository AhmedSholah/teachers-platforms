<script setup lang="ts">
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

// Stats state
const currency = ref('ج.م')
const totalAcademyEarnings = ref('48,250')
const earningsGrowth = ref('+18.4%')
const courseSalesEarnings = ref('41,200')
const subscriptionEarnings = ref('7,050')
const netAvailableProfit = ref('46,970')

const totalUsageAmount = ref('1,280')
const usageDueDate = ref('30 نوفمبر 2026')
const usageItems = ref([
  { title: 'اشتراك المنصة (الباقة الاحترافية Pro)', amount: '450 ج.م', icon: 'i-lucide-sparkles' },
  { title: 'استهلاك التخزين وبث الفيديو (145 GB)', amount: '520 ج.م', icon: 'i-lucide-hard-drive' },
  { title: 'رسوم بوابات الدفع والمعاملات (1.5%)', amount: '310 ج.م', icon: 'i-lucide-credit-card' }
])

// Transactions list
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

// Filter & Search
const searchQuery = ref('')
const selectedType = ref<'all' | 'earning' | 'usage' | 'payout'>('all')

const filteredTransactions = computed(() => {
  return transactions.value.filter(item => {
    const matchesType = selectedType.value === 'all' || item.type === selectedType.value
    const matchesQuery =
      !searchQuery.value.trim() ||
      item.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.paymentMethod.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesType && matchesQuery
  })
})

const earningsCount = computed(() => transactions.value.filter(t => t.type === 'earning').length)
const usageCount = computed(() => transactions.value.filter(t => t.type === 'usage').length)
const payoutCount = computed(() => transactions.value.filter(t => t.type === 'payout').length)
</script>

<template>
  <div class="flex flex-col min-h-full">
    <!-- Sub-navbar Action Bar -->
    <DashboardActionBar max-width="max-w-none" container-class="px-6 md:px-10">
      <UButton
        to="/teacher-dashboard/payouts/withdraw"
        color="primary"
        variant="solid"
        size="md"
        icon="i-lucide-arrow-up-right"
        class="font-bold cursor-pointer"
      >
        سحب الأرباح
      </UButton>
      <UButton
        to="/teacher-dashboard/payouts/methods"
        variant="outline"
        color="neutral"
        size="md"
        icon="i-lucide-credit-card"
        class="font-bold cursor-pointer"
      >
        طرق الاستلام
      </UButton>
    </DashboardActionBar>

    <div class="p-6 md:p-10 flex flex-col gap-8 w-full box-border">

    <!-- Top 2 Cards: Total Academy Earnings & End of Month Usage Cost -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      <!-- Card 1: Total Academy Earnings This Month -->
      <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white flex flex-col justify-between overflow-hidden">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <UIcon name="i-lucide-trending-up" class="w-6 h-6 shrink-0" />
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-700">إجمالي أرباح الأكاديمية هذا الشهر</span>
                <span class="text-xs text-slate-400">إجمالي إيرادات المبيعات والاشتراكات لشهر نوفمبر 2026</span>
              </div>
            </div>
            <UBadge color="success" variant="subtle" size="sm" class="font-bold inline-flex items-center gap-1">
              <UIcon name="i-lucide-arrow-up-right" class="w-3.5 h-3.5 shrink-0" />
              <span>{{ earningsGrowth }}</span>
            </UBadge>
          </div>
        </template>

        <div class="flex flex-col gap-4 py-2">
          <!-- Main Amount Display -->
          <div class="flex items-baseline gap-2">
            <span class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">{{ totalAcademyEarnings }}</span>
            <span class="text-xl font-bold text-slate-500">{{ currency }}</span>
          </div>

          <!-- Breakdown pills -->
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <UIcon name="i-lucide-book-open" class="w-3.5 h-3.5 text-blue-500" />
                مبيعات الدورات
              </span>
              <span class="text-base font-extrabold text-slate-900">{{ courseSalesEarnings }} {{ currency }}</span>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span class="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <UIcon name="i-lucide-users" class="w-3.5 h-3.5 text-purple-500" />
                اشتراكات الطلاب
              </span>
              <span class="text-base font-extrabold text-slate-900">{{ subscriptionEarnings }} {{ currency }}</span>
            </div>
          </div>

          <!-- Net Available Info Banner -->
          <div class="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-900 text-xs sm:text-sm font-medium">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-wallet" class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>صافي الرصيد المتاح للسحب حالياً:</span>
            </div>
            <span class="font-extrabold text-emerald-700 text-sm sm:text-base">{{ netAvailableProfit }} {{ currency }}</span>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center gap-3 pt-1">
            <UButton
              to="/teacher-dashboard/payouts/withdraw"
              color="primary"
              variant="solid"
              size="md"
              icon="i-lucide-arrow-up-right"
              class="font-bold flex-1 justify-center rounded-xl cursor-pointer"
            >
              سحب الأرباح الآن
            </UButton>
            <UButton
              to="/teacher-dashboard/sales"
              variant="outline"
              color="neutral"
              size="md"
              icon="i-lucide-bar-chart-3"
              class="font-bold rounded-xl cursor-pointer"
            >
              تقرير المبيعات
            </UButton>
          </div>
        </template>
      </UCard>

      <!-- Card 2: End-of-Month Platform Usage Cost -->
      <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white flex flex-col justify-between overflow-hidden">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <UIcon name="i-lucide-server" class="w-6 h-6 shrink-0" />
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-700">المستحق سداده نهاية الشهر (تكلفة الاستخدام)</span>
                <span class="text-xs text-slate-400">حساب استهلاك المنصة والخدمات السحابية لشهر نوفمبر</span>
              </div>
            </div>
            <UBadge color="warning" variant="subtle" size="sm" class="font-bold inline-flex items-center gap-1">
              <UIcon name="i-lucide-calendar-clock" class="w-3.5 h-3.5 shrink-0" />
              <span>تستحق في {{ usageDueDate }}</span>
            </UBadge>
          </div>
        </template>

        <div class="flex flex-col gap-4 py-2">
          <!-- Main Amount Display -->
          <div class="flex items-baseline gap-2">
            <span class="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">{{ totalUsageAmount }}</span>
            <span class="text-xl font-bold text-slate-500">{{ currency }}</span>
          </div>

          <!-- Usage Breakdown List -->
          <div class="flex flex-col gap-2">
            <div
              v-for="(item, idx) in usageItems"
              :key="idx"
              class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm"
            >
              <div class="flex items-center gap-2 text-slate-700 font-medium">
                <UIcon :name="item.icon" class="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{{ item.title }}</span>
              </div>
              <span class="font-bold text-slate-900">{{ item.amount }}</span>
            </div>
          </div>

          <!-- Usage Deduction Notice -->
          <div class="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-indigo-900 text-xs font-medium">
            <UIcon name="i-lucide-info" class="w-4 h-4 text-indigo-600 shrink-0" />
            <span>يتم خصم مستحقات الاستخدام تلقائياً من محفظة أرباحك في 30 من الشهر الجاري.</span>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center gap-3 pt-1">
            <UButton
              to="/teacher-dashboard/settings/subscription"
              variant="outline"
              color="neutral"
              size="md"
              icon="i-lucide-sliders"
              class="font-bold flex-1 justify-center rounded-xl cursor-pointer"
            >
              إدارة باقة الاشتراك والاستهلاك
            </UButton>
          </div>
        </template>
      </UCard>
    </div>

    <!-- Transactions Table Section -->
    <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden p-0">
      <template #header>
        <div class="flex flex-col gap-4">
          <!-- Section Title & Meta -->
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-receipt" class="w-5 h-5 shrink-0" />
              </div>
              <div class="flex flex-col">
                <h2 class="m-0 text-lg sm:text-xl font-bold text-slate-900">جدول المعاملات المالية</h2>
                <span class="text-xs sm:text-sm text-slate-500">
                  سجل تفصيلي لجميع المبيعات والأرباح، استقطاعات الاستخدام الشهرية، وعمليات السحب.
                </span>
              </div>
            </div>

            <UBadge color="neutral" variant="subtle" size="sm" class="font-bold">
              {{ filteredTransactions.length }} من {{ transactions.length }} معاملة
            </UBadge>
          </div>

          <!-- Search and Filter Toolbar -->
          <div class="flex flex-col md:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <!-- Search Input -->
            <div class="w-full md:w-80">
              <UInput
                v-model="searchQuery"
                icon="i-lucide-search"
                placeholder="بحث برقم المعاملة، البيان، وسيلة الدفع..."
                size="md"
                class="w-full"
              />
            </div>

            <!-- Filter Buttons -->
            <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <UButton
                :variant="selectedType === 'all' ? 'solid' : 'ghost'"
                :color="selectedType === 'all' ? 'primary' : 'neutral'"
                size="sm"
                class="rounded-xl font-bold cursor-pointer"
                @click="selectedType = 'all'"
              >
                الكل ({{ transactions.length }})
              </UButton>
              <UButton
                :variant="selectedType === 'earning' ? 'solid' : 'ghost'"
                :color="selectedType === 'earning' ? 'primary' : 'neutral'"
                size="sm"
                class="rounded-xl font-bold cursor-pointer"
                @click="selectedType = 'earning'"
              >
                أرباح الأكاديمية ({{ earningsCount }})
              </UButton>
              <UButton
                :variant="selectedType === 'usage' ? 'solid' : 'ghost'"
                :color="selectedType === 'usage' ? 'primary' : 'neutral'"
                size="sm"
                class="rounded-xl font-bold cursor-pointer"
                @click="selectedType = 'usage'"
              >
                تكاليف الاستخدام ({{ usageCount }})
              </UButton>
              <UButton
                :variant="selectedType === 'payout' ? 'solid' : 'ghost'"
                :color="selectedType === 'payout' ? 'primary' : 'neutral'"
                size="sm"
                class="rounded-xl font-bold cursor-pointer"
                @click="selectedType = 'payout'"
              >
                سحب الأرباح ({{ payoutCount }})
              </UButton>
            </div>
          </div>
        </div>
      </template>

      <!-- Table Body -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-start border-collapse">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500">
              <th class="py-3.5 px-6 text-start">المعاملة والبيان</th>
              <th class="py-3.5 px-6 text-start">النوع</th>
              <th class="py-3.5 px-6 text-start">التاريخ والوقت</th>
              <th class="py-3.5 px-6 text-start">طريقة الدفع / التحصيل</th>
              <th class="py-3.5 px-6 text-start">المبلغ</th>
              <th class="py-3.5 px-6 text-end">الحالة</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="item in filteredTransactions"
              :key="item.id"
              class="hover:bg-slate-50/70 transition-colors"
            >
              <!-- Transaction Details -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    :class="{
                      'bg-emerald-50 text-emerald-600': item.type === 'earning',
                      'bg-indigo-50 text-indigo-600': item.type === 'usage',
                      'bg-amber-50 text-amber-600': item.type === 'payout'
                    }"
                  >
                    <UIcon
                      :name="item.type === 'earning' ? 'i-lucide-arrow-down-left' : (item.type === 'usage' ? 'i-lucide-cpu' : 'i-lucide-arrow-up-right')"
                      class="w-5 h-5 shrink-0"
                    />
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-900">{{ item.title }}</span>
                    <span class="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span class="font-mono text-slate-500 font-medium">{{ item.id }}</span>
                      <span>•</span>
                      <span>{{ item.description }}</span>
                    </span>
                  </div>
                </div>
              </td>

              <!-- Type Badge -->
              <td class="py-4 px-6">
                <UBadge
                  :color="item.type === 'earning' ? 'success' : (item.type === 'usage' ? 'info' : 'warning')"
                  variant="subtle"
                  size="sm"
                  class="font-bold"
                >
                  {{ item.typeLabel }}
                </UBadge>
              </td>

              <!-- Date -->
              <td class="py-4 px-6 text-slate-600">
                <div class="flex items-center gap-1.5 text-xs">
                  <UIcon name="i-lucide-calendar" class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{{ item.date }}</span>
                </div>
              </td>

              <!-- Payment Method -->
              <td class="py-4 px-6 text-slate-700 text-xs font-medium">
                <div class="flex items-center gap-1.5">
                  <UIcon name="i-lucide-credit-card" class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{{ item.paymentMethod }}</span>
                </div>
              </td>

              <!-- Amount -->
              <td class="py-4 px-6">
                <span
                  class="font-extrabold text-base"
                  :class="item.isPositive ? 'text-emerald-600' : (item.type === 'usage' ? 'text-indigo-700' : 'text-slate-800')"
                >
                  {{ item.amount }}
                </span>
              </td>

              <!-- Status -->
              <td class="py-4 px-6 text-end">
                <UBadge
                  :color="item.status === 'completed' ? 'success' : (item.status === 'scheduled' ? 'warning' : 'neutral')"
                  variant="subtle"
                  size="sm"
                  class="font-bold inline-flex items-center gap-1"
                >
                  <UIcon
                    :name="item.status === 'completed' ? 'i-lucide-check-circle-2' : 'i-lucide-clock'"
                    class="w-3.5 h-3.5 shrink-0"
                  />
                  <span>{{ item.statusLabel }}</span>
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
        <UIcon name="i-lucide-receipt" class="w-10 h-10 text-slate-300" />
        <p class="text-sm font-bold text-slate-700">لم يتم العثور على أي معاملات</p>
        <p class="text-xs text-slate-400">جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً من القائمة.</p>
        <UButton
          size="xs"
          variant="outline"
          color="neutral"
          class="mt-2 font-bold cursor-pointer"
          @click="searchQuery = ''; selectedType = 'all'"
        >
          إعادة ضبط الفلاتر
        </UButton>
      </div>
    </UCard>
    </div>
  </div>
</template>
