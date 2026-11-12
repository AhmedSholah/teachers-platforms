<script setup lang="ts">
useHead({
  title: 'طريقة استلام الأرباح - لوحة التحكم'
})

const selectedMethod = ref<'bank' | 'wallet' | 'paypal'>('bank')

const paymentMethods = [
  {
    value: 'bank',
    label: 'حساب بنكي',
    subtext: 'تحويل مباشر إلى حسابك البنكي',
    icon: 'i-lucide-landmark'
  },
  {
    value: 'wallet',
    label: 'محفظة إلكترونية',
    subtext: 'استلام الأرباح على محفظة هاتفك',
    icon: 'i-lucide-smartphone'
  },
  {
    value: 'paypal',
    label: 'باي بال',
    subtext: 'استلام الأرباح بالدولار',
    icon: 'i-lucide-globe'
  }
]

// Bank account data
const bankForm = ref({
  accountName: 'أحمد محمد',
  bankName: 'البنك الأهلي المصري',
  iban: ''
})

// Electronic wallet data
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

// PayPal data
const paypalForm = ref({
  accountName: 'أحمد محمد',
  email: ''
})

const isSaving = ref(false)

function saveMethod() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    alert('تم حفظ طريقة استلام الأرباح بنجاح!')
    navigateTo('/teacher-dashboard/payouts')
  }, 600)
}
</script>

<template>
  <div class="flex flex-col min-h-full">
    <DashboardActionBar max-width="max-w-3xl" container-class="px-6 sm:px-8 lg:px-10">
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

    <div class="p-6 sm:p-8 lg:p-10 flex flex-col gap-8 max-w-3xl mx-auto w-full">

    <!-- Main Card -->
    <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white">
      <form class="flex flex-col gap-6" @submit.prevent="saveMethod">
        <!-- Payment Method Options -->
        <div class="flex flex-col gap-3">
          <label class="text-sm font-bold text-slate-700">اختر وسيلة الاستلام</label>
          <URadioGroup
            v-model="selectedMethod"
            :items="paymentMethods"
            variant="card"
            color="primary"
            size="lg"
            class="w-full"
            :ui="{
              fieldset: 'flex flex-col gap-3 w-full',
              item: 'p-4 rounded-xl border border-slate-200 transition-all cursor-pointer flex items-center',
              container: 'shrink-0',
              wrapper: 'ms-3 flex-1 flex flex-col',
              label: 'text-sm md:text-base font-bold text-slate-900 cursor-pointer'
            }"
          >
            <template #label="{ item }">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UIcon :name="item.icon" class="w-5 h-5 shrink-0" />
                </div>
                <div class="flex flex-col text-start">
                  <span class="font-bold text-slate-900 text-sm md:text-base leading-snug">{{ item.label }}</span>
                  <span class="text-xs md:text-sm text-slate-500 font-normal leading-snug mt-0.5">{{ item.subtext }}</span>
                </div>
              </div>
            </template>
          </URadioGroup>
        </div>

        <!-- Bank Account Fields -->
        <div v-if="selectedMethod === 'bank'" class="flex flex-col gap-4 border-t border-slate-100 pt-6">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-landmark" class="w-5 h-5 text-blue-600 shrink-0" />
            <h2 class="text-lg font-bold text-slate-900">بيانات الحساب البنكي</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="اسم صاحب الحساب" required>
              <UInput
                v-model="bankForm.accountName"
                icon="i-lucide-user"
                placeholder="أحمد محمد"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <UFormField label="اسم البنك" required>
              <UInput
                v-model="bankForm.bankName"
                icon="i-lucide-building-2"
                placeholder="البنك الأهلي المصري"
                size="lg"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField
            label="رقم الحساب أو IBAN"
            description="تأكد من إدخال رقم الحساب البنكي الدولي (IBAN) بشكل صحيح لتجنب تأخير التحويل."
            required
          >
            <UInput
              v-model="bankForm.iban"
              icon="i-lucide-credit-card"
              placeholder="EG00 0000 0000 0000 0000 0000 0000 0"
              size="lg"
              class="w-full font-mono"
            />
          </UFormField>
        </div>

        <!-- Electronic Wallet Fields -->
        <div v-else-if="selectedMethod === 'wallet'" class="flex flex-col gap-4 border-t border-slate-100 pt-6">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-smartphone" class="w-5 h-5 text-blue-600 shrink-0" />
            <h2 class="text-lg font-bold text-slate-900">بيانات المحفظة الإلكترونية</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="اسم صاحب المحفظة" required>
              <UInput
                v-model="walletForm.accountName"
                icon="i-lucide-user"
                placeholder="أحمد محمد"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <UFormField label="مزود خدمة المحفظة" required>
              <USelect
                v-model="walletForm.provider"
                :items="walletProviders"
                size="lg"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField
            label="رقم هاتف المحفظة"
            description="رقم الهاتف المسجل عليه حساب المحفظة الإلكترونية لاستلام التحويل المالي."
            required
          >
            <UInput
              v-model="walletForm.phone"
              type="tel"
              icon="i-lucide-phone"
              placeholder="01012345678"
              size="lg"
              class="w-full font-mono"
            />
          </UFormField>
        </div>

        <!-- PayPal Fields -->
        <div v-else-if="selectedMethod === 'paypal'" class="flex flex-col gap-4 border-t border-slate-100 pt-6">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-globe" class="w-5 h-5 text-blue-600 shrink-0" />
            <h2 class="text-lg font-bold text-slate-900">بيانات حساب باي بال</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="اسم صاحب الحساب" required>
              <UInput
                v-model="paypalForm.accountName"
                icon="i-lucide-user"
                placeholder="أحمد محمد"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="البريد الإلكتروني لحساب باي بال"
              description="سيتم إرسال مستحقاتك وأرباحك بالدولار مباشرة إلى هذا البريد."
              required
            >
              <UInput
                v-model="paypalForm.email"
                type="email"
                icon="i-lucide-mail"
                placeholder="teacher@example.com"
                size="lg"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>

        <!-- Security & Info Notice -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs md:text-sm text-slate-600">
          <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div class="flex flex-col gap-0.5">
            <span class="font-bold text-slate-800">بياناتك المالية محمية ومشفرة</span>
            <span class="text-slate-500 text-xs leading-relaxed">
              تُستخدم بيانات وسيلة الاستلام حصرياً لتحويل أرباحك وعوائد مبيعات دوراتك التعليمية وفق معايير الأمان المعتمدة.
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-end gap-3">
          <UButton
            to="/teacher-dashboard/payouts"
            variant="outline"
            color="neutral"
            size="lg"
            icon="i-lucide-x"
            class="font-bold cursor-pointer"
          >
            إلغاء
          </UButton>
          <UButton
            type="submit"
            color="primary"
            size="lg"
            :loading="isSaving"
            icon="i-lucide-check"
            class="font-bold cursor-pointer px-6"
          >
            حفظ الطريقة
          </UButton>
        </div>
      </form>
    </UCard>
    </div>
  </div>
</template>
