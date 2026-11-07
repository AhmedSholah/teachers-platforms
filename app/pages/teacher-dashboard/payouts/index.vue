<script setup lang="ts">
useHead({
  title: 'المدفوعات - لوحة التحكم'
})

interface PayoutMethod {
  name: string
  bankName: string
  accountNumber: string
  isPrimary: boolean
}

interface TransferRecord {
  id: string
  title: string
  date: string
  amount: string
  status: 'pending' | 'completed'
  statusLabel: string
}

// Financial balance state
const availableBalance = ref('8,200')
const pendingBalance = ref('1,150')
const currency = ref('ج.م')

// Primary payout method
const primaryMethod = ref<PayoutMethod>({
  name: 'الحساب الأساسي',
  bankName: 'البنك الأهلي المصري',
  accountNumber: '•••• 4821',
  isPrimary: true
})

// Transfer history
const transfers = ref<TransferRecord[]>([
  {
    id: 'TRF-101',
    title: 'تحويل بتاريخ 31 أكتوبر 2026',
    date: '31 أكتوبر 2026',
    amount: '1,150 ج.م',
    status: 'pending',
    statusLabel: 'قيد التحويل'
  },
  {
    id: 'TRF-100',
    title: 'تحويل بتاريخ 25 أكتوبر 2026',
    date: '25 أكتوبر 2026',
    amount: '3,500 ج.م',
    status: 'completed',
    statusLabel: 'مكتمل'
  },
  {
    id: 'TRF-099',
    title: 'تحويل بتاريخ 10 أكتوبر 2026',
    date: '10 أكتوبر 2026',
    amount: '2,900 ج.م',
    status: 'completed',
    statusLabel: 'مكتمل'
  },
  {
    id: 'TRF-098',
    title: 'تحويل بتاريخ 25 سبتمبر 2026',
    date: '25 سبتمبر 2026',
    amount: '3,100 ج.م',
    status: 'completed',
    statusLabel: 'مكتمل'
  }
])
</script>

<template>
  <div class="p-6 sm:p-8 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full box-border">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex flex-col gap-1.5">
        <h1 class="m-0 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">المدفوعات</h1>
        <p class="m-0 text-sm sm:text-base text-slate-500">إدارة الأرباح، سحب الرصيد المتاح، واستعراض سجل التحويلات المالية.</p>
      </div>

      <div class="flex items-center gap-3">
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
      </div>
    </div>

    <!-- Balance & Payout Method Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      <!-- Balance Card -->
      <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white flex flex-col justify-between">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-wallet" class="w-6 h-6 shrink-0" />
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-500">الرصيد المتاح</span>
                <span class="text-xs text-slate-400">جاهز للسحب المباشر إلى حسابك البنكي</span>
              </div>
            </div>
            <UBadge color="success" variant="subtle" size="sm" class="font-bold">
              متاح الآن
            </UBadge>
          </div>
        </template>

        <div class="flex flex-col gap-4 py-2">
          <div class="flex items-baseline gap-2">
            <span class="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono tracking-tight">{{ availableBalance }}</span>
            <span class="text-lg font-bold text-slate-500">{{ currency }}</span>
          </div>

          <div class="flex items-center gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-amber-800 text-sm font-medium">
            <UIcon name="i-lucide-clock" class="w-4 h-4 text-amber-600 shrink-0" />
            <span>قيد التحويل: <strong>{{ pendingBalance }} {{ currency }}</strong></span>
            <span class="text-xs text-amber-600 ms-auto font-normal">متوقع خلال يومين عمل</span>
          </div>
        </div>

        <template #footer>
          <UButton
            to="/teacher-dashboard/payouts/withdraw"
            color="primary"
            variant="solid"
            size="lg"
            block
            icon="i-lucide-arrow-up-right"
            class="font-bold w-full justify-center rounded-xl cursor-pointer"
          >
            سحب الأرباح
          </UButton>
        </template>
      </UCard>

      <!-- Payout Method Card -->
      <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white flex flex-col justify-between">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-landmark" class="w-6 h-6 shrink-0" />
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-500">طريقة استلام الأرباح</span>
                <span class="text-xs text-slate-400">الحساب البنكي المعتمد للإيداع</span>
              </div>
            </div>
            <UBadge color="success" variant="subtle" size="sm" class="font-bold">
              {{ primaryMethod.name }}
            </UBadge>
          </div>
        </template>

        <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 my-2">
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
              <UIcon name="i-lucide-building-2" class="w-5 h-5 shrink-0" />
            </div>
            <div class="flex flex-col">
              <span class="text-base font-bold text-slate-900">{{ primaryMethod.bankName }}</span>
              <span class="text-sm font-mono text-slate-500 text-end sm:text-start">{{ primaryMethod.accountNumber }}</span>
            </div>
          </div>
          <UBadge color="neutral" variant="outline" size="xs" class="font-mono">
            EGP
          </UBadge>
        </div>

        <template #footer>
          <UButton
            to="/teacher-dashboard/payouts/methods"
            variant="outline"
            color="neutral"
            size="lg"
            block
            icon="i-lucide-settings-2"
            class="font-bold w-full justify-center rounded-xl cursor-pointer"
          >
            تغيير الطريقة
          </UButton>
        </template>
      </UCard>
    </div>

    <!-- History Card -->
    <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden p-0">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-history" class="w-5 h-5 shrink-0" />
            </div>
            <div class="flex flex-col">
              <h2 class="m-0 text-lg sm:text-xl font-bold text-slate-900">سجل التحويلات</h2>
              <span class="text-xs sm:text-sm text-slate-500">استعراض تفاصيل وتواريخ عمليات التحويل المالي السابقة وحالتها</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <UBadge color="neutral" variant="subtle" size="sm" class="font-bold">
              {{ transfers.length }} عمليات تحويل
            </UBadge>
          </div>
        </div>
      </template>

      <!-- Transfers Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-start border-collapse">
          <thead>
            <tr class="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500">
              <th class="py-3.5 px-6 text-start">العملية</th>
              <th class="py-3.5 px-6 text-start">التاريخ</th>
              <th class="py-3.5 px-6 text-start">المبلغ</th>
              <th class="py-3.5 px-6 text-start">طريقة الاستلام</th>
              <th class="py-3.5 px-6 text-end">الحالة</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="item in transfers"
              :key="item.id"
              class="hover:bg-slate-50/70 transition-colors"
            >
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div
                    class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    :class="item.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'"
                  >
                    <UIcon
                      :name="item.status === 'completed' ? 'i-lucide-check-circle-2' : 'i-lucide-clock'"
                      class="w-4.5 h-4.5 shrink-0"
                    />
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-900">{{ item.title }}</span>
                    <span class="text-xs text-slate-400 font-mono">{{ item.id }}</span>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-slate-600">
                <div class="flex items-center gap-1.5">
                  <UIcon name="i-lucide-calendar" class="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{{ item.date }}</span>
                </div>
              </td>
              <td class="py-4 px-6">
                <span class="font-extrabold text-slate-900 font-mono text-base">{{ item.amount }}</span>
              </td>
              <td class="py-4 px-6 text-slate-600">
                <div class="flex items-center gap-1.5">
                  <UIcon name="i-lucide-landmark" class="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{{ primaryMethod.bankName }}</span>
                </div>
              </td>
              <td class="py-4 px-6 text-end">
                <UBadge
                  :color="item.status === 'completed' ? 'success' : 'warning'"
                  variant="subtle"
                  size="sm"
                  class="font-bold inline-flex items-center gap-1"
                >
                  <UIcon
                    :name="item.status === 'completed' ? 'i-lucide-check' : 'i-lucide-timer'"
                    class="w-3.5 h-3.5 shrink-0"
                  />
                  <span>{{ item.statusLabel }}</span>
                </UBadge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>
