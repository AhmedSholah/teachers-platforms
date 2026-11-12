<script setup lang="ts">
useHead({
  title: 'سحب الأرباح - لوحة التحكم'
})

const availableBalance = '8,200 ج.م'
const amount = ref('5,000')

const bankAccount = {
  name: 'البنك الأهلي المصري',
  lastDigits: '4821'
}

const fee = '[الرسوم]'
const netAmount = '[المبلغ الصافي]'
const transferDuration = '[مدة التحويل]'

const isSubmitting = ref(false)

function handleConfirm() {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    navigateTo('/teacher-dashboard/payouts')
  }, 500)
}
</script>

<template>
  <div class="flex flex-col min-h-full">
    <DashboardActionBar max-width="max-w-4xl" container-class="px-6 md:px-10">
      <UButton
        to="/teacher-dashboard/payouts"
        color="neutral"
        variant="outline"
        size="md"
        icon="i-lucide-arrow-right"
        class="font-medium rounded-xl cursor-pointer"
      >
        رجوع إلى المدفوعات
      </UButton>
    </DashboardActionBar>

    <div class="flex flex-col gap-6 md:gap-8 p-6 md:p-10 w-full max-w-4xl mx-auto box-border">

    <!-- Main Withdrawal Card -->
    <UCard class="w-full max-w-2xl rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
      <div class="flex flex-col gap-6">
        <!-- Balance Info -->
        <div class="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-wallet" class="w-5 h-5" />
            </div>
            <span class="text-sm font-semibold text-slate-600">الرصيد المتاح</span>
          </div>
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{{ availableBalance }}</span>
        </div>

        <!-- Withdraw Amount Input -->
        <UFormField label="المبلغ المراد سحبه" name="amount" class="font-bold text-slate-700">
          <UInput
            id="wam"
            v-model="amount"
            type="text"
            placeholder="0"
            size="lg"
            class="w-full text-start"
          >
            <template #trailing>
              <span class="text-sm font-bold text-slate-500 pe-2">ج.م</span>
            </template>
          </UInput>
        </UFormField>

        <!-- Selected Payout Method -->
        <div class="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white">
          <div class="flex items-center gap-3.5 min-w-0">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-landmark" class="w-6 h-6" />
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-base font-bold text-slate-900 truncate">{{ bankAccount.name }}</span>
              <span class="text-xs sm:text-sm text-slate-500 text-end font-mono">•••• {{ bankAccount.lastDigits }}</span>
            </div>
          </div>
          <UButton
            to="/teacher-dashboard/payouts/methods"
            color="neutral"
            variant="outline"
            size="sm"
            class="shrink-0 font-medium"
          >
            تغيير
          </UButton>
        </div>

        <!-- Breakdown Summary -->
        <div class="rounded-xl bg-slate-50 p-4 sm:p-5 flex flex-col gap-3 border border-slate-100">
          <div class="flex items-center justify-between text-sm sm:text-base text-slate-600">
            <span>المبلغ</span>
            <span class="font-bold text-slate-900">{{ amount ? amount + ' ج.م' : '5,000 ج.م' }}</span>
          </div>
          <div class="flex items-center justify-between text-sm sm:text-base text-slate-600">
            <span>رسوم التحويل</span>
            <span class="font-medium text-slate-500">{{ fee }}</span>
          </div>
          <div class="border-t border-slate-200 my-1" />
          <div class="flex items-center justify-between text-base sm:text-lg font-bold text-slate-900">
            <span>الصافي المستلم</span>
            <span class="text-blue-600 font-extrabold">{{ netAmount }}</span>
          </div>
        </div>

        <!-- Arrival Time Note -->
        <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <UIcon name="i-lucide-clock" class="w-4 h-4 text-slate-400 shrink-0" />
          <span>يصل المبلغ خلال {{ transferDuration }}.</span>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <UButton
            color="primary"
            size="lg"
            :loading="isSubmitting"
            class="px-7 min-h-12 font-bold justify-center"
            @click="handleConfirm"
          >
            تأكيد السحب
          </UButton>
          <UButton
            to="/teacher-dashboard/payouts"
            color="neutral"
            variant="outline"
            size="lg"
            class="px-6 min-h-12 font-medium justify-center"
          >
            إلغاء
          </UButton>
        </div>
      </div>
    </UCard>
    </div>
  </div>
</template>