<script setup lang="ts">
useHead({
  title: 'سحب الأرباح - لوحة التحكم'
})

const toast = useToast()
const availableBalance = '8,200 ج.م'
const amount = ref('5,000')

const bankAccount = {
  name: 'البنك الأهلي المصري',
  lastDigits: '4821'
}

const isSubmitting = ref(false)

function handleConfirm() {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    toast.add({
      title: 'تم إرسال طلب السحب',
      description: `سيتم تحويل مبلغ ${amount.value || '5,000'} ج.م إلى حسابك خلال 2-3 أيام عمل.`,
      color: 'success'
    })
    navigateTo('/teacher-dashboard/payouts')
  }, 500)
}
</script>

<template>
  <UDashboardPanel id="teacher-payouts-withdraw" :ui="{ body: 'lg:py-10' }">
    <template #header>
      <UDashboardNavbar title="سحب الأرباح">
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
            to="/teacher-dashboard/payouts"
            color="neutral"
            variant="outline"
            icon="i-lucide-arrow-right"
            label="رجوع إلى المدفوعات"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="w-full lg:max-w-2xl mx-auto">
        <UPageCard
          title="طلب سحب أرباح"
          description="حدد المبلغ المطلوب سحبه وتحقق من وسيلة الاستلام."
          variant="subtle"
        >
          <div class="flex flex-col gap-5">
            <div class="flex items-center justify-between p-4 rounded-lg bg-default border border-default">
              <div class="flex items-center gap-2.5">
                <UIcon name="i-lucide-wallet" class="size-5 text-primary" />
                <span class="text-sm text-muted">الرصيد المتاح للسحب</span>
              </div>
              <span class="text-xl font-bold text-highlighted">{{ availableBalance }}</span>
            </div>

            <UFormField label="المبلغ المراد سحبه" name="amount">
              <UInput
                v-model="amount"
                type="text"
                placeholder="0"
                size="lg"
                class="w-full"
              >
                <template #trailing>
                  <span class="text-xs font-semibold text-muted">ج.م</span>
                </template>
              </UInput>
            </UFormField>

            <div class="flex items-center justify-between gap-4 p-4 rounded-lg bg-default border border-default">
              <div class="flex items-center gap-3 min-w-0">
                <div class="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-landmark" class="size-5" />
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-sm font-semibold text-highlighted truncate">{{ bankAccount.name }}</span>
                  <span class="text-xs text-muted font-mono">•••• {{ bankAccount.lastDigits }}</span>
                </div>
              </div>
              <UButton
                to="/teacher-dashboard/payouts/methods"
                color="neutral"
                variant="outline"
                size="sm"
                label="تغيير"
              />
            </div>

            <div class="rounded-lg bg-default border border-default p-4 flex flex-col gap-2.5 text-sm">
              <div class="flex items-center justify-between text-muted">
                <span>المبلغ المطلوب</span>
                <span class="font-medium text-highlighted">{{ amount ? `${amount} ج.م` : '5,000 ج.م' }}</span>
              </div>
              <div class="flex items-center justify-between text-muted">
                <span>رسوم التحويل</span>
                <span>0 ج.م</span>
              </div>
              <USeparator />
              <div class="flex items-center justify-between font-semibold text-highlighted">
                <span>الصافي المستلم</span>
                <span class="text-primary">{{ amount ? `${amount} ج.م` : '5,000 ج.م' }}</span>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2">
              <UButton
                to="/teacher-dashboard/payouts"
                color="neutral"
                variant="outline"
                label="إلغاء"
              />
              <UButton
                :loading="isSubmitting"
                icon="i-lucide-check"
                label="تأكيد السحب"
                @click="handleConfirm"
              />
            </div>
          </div>
        </UPageCard>
      </div>
    </template>
  </UDashboardPanel>
</template>