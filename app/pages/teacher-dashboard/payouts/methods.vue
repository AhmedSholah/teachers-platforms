<script setup lang="ts">
useHead({
  title: 'طريقة استلام الأرباح - لوحة التحكم'
})

const toast = useToast()
const selectedMethod = ref<'bank' | 'wallet' | 'paypal'>('bank')

const paymentMethods = [
  {
    value: 'bank',
    label: 'حساب بنكي',
    description: 'تحويل مباشر إلى حسابك البنكي',
    icon: 'i-lucide-landmark'
  },
  {
    value: 'wallet',
    label: 'محفظة إلكترونية',
    description: 'استلام الأرباح على محفظة هاتفك',
    icon: 'i-lucide-smartphone'
  },
  {
    value: 'paypal',
    label: 'باي بال (PayPal)',
    description: 'استلام الأرباح بالدولار',
    icon: 'i-lucide-globe'
  }
]

const bankForm = ref({
  accountName: 'أحمد محمد',
  bankName: 'البنك الأهلي المصري',
  iban: ''
})

const walletForm = ref({
  accountName: 'أحمد محمد',
  provider: 'vodafone',
  phone: ''
})

const walletProviders = [
  { label: 'فودافون كاش (Vodafone Cash)', value: 'vodafone' },
  { label: 'أورنج كاش (Orange Cash)', value: 'orange' },
  { label: 'اتصالات كاش (Etisalat Cash)', value: 'etisalat' },
  { label: 'وي باي (WE Pay)', value: 'we' },
  { label: 'محفظة بنكية ذكية', value: 'smart_wallet' },
  { label: 'STC Pay', value: 'stc_pay' }
]

const paypalForm = ref({
  accountName: 'أحمد محمد',
  email: ''
})

const isSaving = ref(false)

function saveMethod() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    toast.add({
      title: 'تم حفظ وسيلة الاستلام',
      description: 'تم تحديث بيانات استلام الأرباح بنجاح.',
      color: 'success'
    })
    navigateTo('/teacher-dashboard/payouts')
  }, 500)
}
</script>

<template>
  <UDashboardPanel id="teacher-payouts-methods" :ui="{ body: 'lg:py-10' }">
    <template #header>
      <UDashboardNavbar title="طرق استلام الأرباح">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            to="/teacher-dashboard/payouts"
            color="neutral"
            variant="outline"
            icon="i-lucide-arrow-right"
            label="رجوع إلى المدفوعات"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="w-full lg:max-w-3xl mx-auto">
        <form class="flex flex-col gap-6" @submit.prevent="saveMethod">
          <UPageCard
            title="وسيلة استلام الأرباح"
            description="اختر الوسيلة الافتراضية لتحويل أرباح دوراتك."
            variant="naked"
            orientation="horizontal"
          >
            <UButton
              type="submit"
              label="حفظ الطريقة"
              color="neutral"
              :loading="isSaving"
              class="w-fit lg:ms-auto"
            />
          </UPageCard>

          <UPageCard variant="subtle">
            <URadioGroup
              v-model="selectedMethod"
              :items="paymentMethods"
              variant="card"
              color="primary"
              class="w-full"
            />

            <USeparator />

            <div v-if="selectedMethod === 'bank'" class="flex flex-col gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField label="اسم صاحب الحساب" required>
                  <UInput v-model="bankForm.accountName" icon="i-lucide-user" class="w-full" />
                </UFormField>
                <UFormField label="اسم البنك" required>
                  <UInput v-model="bankForm.bankName" icon="i-lucide-building-2" class="w-full" />
                </UFormField>
              </div>

              <UFormField
                label="رقم الحساب أو IBAN"
                description="تأكد من إدخال رقم IBAN بشكل صحيح."
                required
              >
                <UInput
                  v-model="bankForm.iban"
                  icon="i-lucide-credit-card"
                  placeholder="EG00 0000 0000 0000 0000 0000 0000 0"
                  class="w-full font-mono"
                />
              </UFormField>
            </div>

            <div v-else-if="selectedMethod === 'wallet'" class="flex flex-col gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField label="اسم صاحب المحفظة" required>
                  <UInput v-model="walletForm.accountName" icon="i-lucide-user" class="w-full" />
                </UFormField>
                <UFormField label="مزود الخدمة" required>
                  <USelect v-model="walletForm.provider" :items="walletProviders" class="w-full" />
                </UFormField>
              </div>

              <UFormField label="رقم هاتف المحفظة" required>
                <UInput v-model="walletForm.phone" type="tel" icon="i-lucide-phone" placeholder="01012345678" class="w-full font-mono" />
              </UFormField>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="اسم صاحب الحساب" required>
                <UInput v-model="paypalForm.accountName" icon="i-lucide-user" class="w-full" />
              </UFormField>
              <UFormField label="البريد الإلكتروني لحساب باي بال" required>
                <UInput v-model="paypalForm.email" type="email" icon="i-lucide-mail" placeholder="teacher@example.com" class="w-full" />
              </UFormField>
            </div>
          </UPageCard>
        </form>
      </div>
    </template>
  </UDashboardPanel>
</template>
