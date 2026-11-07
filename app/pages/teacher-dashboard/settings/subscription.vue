<script setup lang="ts">
useHead({
  title: 'اشتراك المنصة - الإعدادات'
})

// Current Plan details
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

// Available Plans
const plans = [
  {
    id: 'starter',
    name: 'الباقة الأساسية',
    icon: 'i-lucide-zap',
    price: '19$',
    period: '/ شهرياً',
    description: 'مثالية للمدرسين في بداية انطلاقهم وتقديم أول دوراتهم.',
    isCurrent: false,
    features: [
      'حتى 3 دورات تدريبية',
      'حتى 100 طالب نشط',
      'مساحة تخزين 20 جيجابايت',
      'عمولة مبيعات 7%',
      'دعم فني عبر البريد الإلكتروني'
    ]
  },
  {
    id: 'pro',
    name: 'الباقة الاحترافية',
    icon: 'i-lucide-sparkles',
    price: '49$',
    period: '/ شهرياً',
    description: 'الخيار الأفضل للنمو والتوسع مع نطاق مخصص وميزات متقدمة.',
    isCurrent: true,
    popular: true,
    features: [
      'دورات تدريبية غير محدودة',
      'عدد طلاب غير محدود',
      'مساحة تخزين 100 جيجابايت',
      'ربط نطاق خاص (دومين مخصص)',
      'عمولة مبيعات مخفّضة 3%',
      'شهادات إتمام مخصصة',
      'دعم فني بأولوية عبر الدردشة المباشرة'
    ]
  },
  {
    id: 'enterprise',
    name: 'باقة المؤسسات',
    icon: 'i-lucide-crown',
    price: '129$',
    period: '/ شهرياً',
    description: 'حلول متكاملة للمراكز التعليمية والأكاديميات الكبرى.',
    isCurrent: false,
    features: [
      'جميع ميزات الباقة الاحترافية',
      'مساحة تخزين 500 جيجابايت',
      'عمولة مبيعات 0%',
      'حسابات متعددة للمدرسين والمساعدين',
      'تطبيق جوال خاص بالأكاديمية (اختياري)',
      'مدير حساب خاص ودعم مخصص على مدار الساعة'
    ]
  }
]

// Billing History
const invoices = [
  { id: 'INV-2026-003', date: '15 أكتوبر 2026', amount: '49.00$', status: 'مدفوعة' },
  { id: 'INV-2026-002', date: '15 سبتمبر 2026', amount: '49.00$', status: 'مدفوعة' },
  { id: 'INV-2026-001', date: '15 أغسطس 2026', amount: '49.00$', status: 'مدفوعة' }
]
</script>

<template>
  <div class="flex flex-col gap-8 p-6 md:p-10 box-border w-full">
    <!-- Page Header -->
    <div class="flex flex-col gap-1.5">
      <h1 class="m-0 text-3xl font-extrabold text-slate-900 leading-tight">اشتراك المنصة</h1>
      <span class="text-sm md:text-base text-slate-500">إدارة خطة اشتراكك الحالية، استعراض مزايا الباقة وسجل الفواتير والدفع.</span>
    </div>

    <!-- Current Subscription Card -->
    <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-credit-card" class="w-6 h-6 shrink-0" />
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2.5">
                <h2 class="m-0 text-xl font-bold text-slate-900">{{ currentPlan.name }}</h2>
                <UBadge color="success" variant="subtle" size="sm" class="font-bold">
                  {{ currentPlan.status }}
                </UBadge>
              </div>
              <span class="text-sm text-slate-500">تتجدد تلقائياً في {{ currentPlan.renewalDate }}</span>
            </div>
          </div>

          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-slate-900">{{ currentPlan.price }}</span>
            <span class="text-sm text-slate-500">/ {{ currentPlan.cycle }}</span>
          </div>
        </div>
      </template>

      <!-- Usage and Limits Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
        <div class="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div class="flex items-center justify-between text-sm">
            <span class="flex items-center gap-1.5 text-slate-700 font-bold">
              <UIcon name="i-lucide-hard-drive" class="w-4 h-4 text-slate-400 shrink-0" />
              مساحة التخزين المستهلكة
            </span>
            <span class="font-extrabold text-slate-900">{{ currentPlan.storageUsed }} / {{ currentPlan.storageLimit }} جيجابايت</span>
          </div>
          <UProgress :model-value="45" color="primary" size="sm" />
          <span class="text-xs text-slate-400">متبقي 55 جيجابايت من السعة المتاحة</span>
        </div>

        <div class="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div class="flex items-center justify-between text-sm">
            <span class="flex items-center gap-1.5 text-slate-700 font-bold">
              <UIcon name="i-lucide-book-open" class="w-4 h-4 text-blue-500 shrink-0" />
              الدورات المنشورة
            </span>
            <span class="font-extrabold text-blue-600">{{ currentPlan.coursesCount }} دورة ({{ currentPlan.coursesLimit }})</span>
          </div>
          <UProgress :model-value="100" color="success" size="sm" />
          <span class="text-xs text-slate-400">يمكنك إنشاء عدد غير محدود من الدورات</span>
        </div>

        <div class="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div class="flex items-center justify-between text-sm">
            <span class="flex items-center gap-1.5 text-slate-700 font-bold">
              <UIcon name="i-lucide-users" class="w-4 h-4 text-emerald-500 shrink-0" />
              الطلاب المسجلين
            </span>
            <span class="font-extrabold text-slate-900">{{ currentPlan.studentsCount }} طالب</span>
          </div>
          <UProgress :model-value="100" color="success" size="sm" />
          <span class="text-xs text-slate-400">استيعاب مفتوح بدون حدود لعدد الطلاب</span>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div class="flex flex-wrap items-center gap-3">
            <UButton 
              color="primary" 
              size="md" 
              icon="i-lucide-sparkles"
              class="font-bold cursor-pointer"
            >
              ترقية الباقة
            </UButton>
            <UButton 
              variant="outline" 
              color="neutral" 
              size="md" 
              icon="i-lucide-credit-card"
              class="font-bold cursor-pointer"
            >
              إدارة بطاقة الدفع
            </UButton>
          </div>
          <UButton 
            variant="ghost" 
            color="error" 
            size="sm" 
            icon="i-lucide-x"
            class="font-bold cursor-pointer"
          >
            إلغاء الاشتراك
          </UButton>
        </div>
      </template>
    </UCard>

    <!-- Available Plans Section -->
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-1">
        <h2 class="m-0 text-xl font-bold text-slate-900">باقات الاشتراك المتاحة</h2>
        <span class="text-sm text-slate-500">اختر الخطة المناسبة لحجم ونمو أكاديميتك التعليمية.</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <UCard 
          v-for="plan in plans" 
          :key="plan.id"
          class="rounded-2xl border transition-all duration-200 flex flex-col justify-between"
          :class="plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20 bg-white' : 'border-slate-200 bg-white'"
        >
          <template #header>
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div 
                    class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    :class="plan.popular ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'"
                  >
                    <UIcon :name="plan.icon" class="w-4 h-4 shrink-0" />
                  </div>
                  <span class="text-lg font-bold text-slate-900">{{ plan.name }}</span>
                </div>
                <UBadge v-if="plan.popular" color="primary" variant="solid" size="xs" class="font-bold">
                  الأكثر شيوعاً
                </UBadge>
                <UBadge v-else-if="plan.isCurrent" color="neutral" variant="subtle" size="xs" class="font-bold">
                  باقتك الحالية
                </UBadge>
              </div>
              <p class="text-sm text-slate-500 leading-relaxed min-h-[40px]">{{ plan.description }}</p>
              <div class="flex items-baseline gap-1 pt-2">
                <span class="text-3xl font-extrabold text-slate-900">{{ plan.price }}</span>
                <span class="text-sm text-slate-500">{{ plan.period }}</span>
              </div>
            </div>
          </template>

          <!-- Plan Features -->
          <ul class="flex flex-col gap-3 p-0 m-0 list-none my-4">
            <li 
              v-for="(feature, fIdx) in plan.features" 
              :key="fIdx"
              class="flex items-center gap-2.5 text-sm text-slate-700"
            >
              <div class="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-check" class="w-3.5 h-3.5 shrink-0" />
              </div>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <template #footer>
            <div class="pt-2">
              <UButton 
                v-if="plan.isCurrent"
                disabled
                variant="subtle"
                color="neutral"
                block
                size="md"
                icon="i-lucide-check-circle"
                class="font-bold w-full justify-center"
              >
                باقتك الحالية
              </UButton>
              <UButton 
                v-else-if="plan.popular"
                color="primary"
                block
                size="md"
                icon="i-lucide-sparkles"
                class="font-bold w-full justify-center cursor-pointer"
              >
                الترقية لهذه الباقة
              </UButton>
              <UButton 
                v-else
                variant="outline"
                color="neutral"
                block
                size="md"
                icon="i-lucide-arrow-left"
                class="font-bold w-full justify-center cursor-pointer"
              >
                اختيار هذه الباقة
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </div>

    <!-- Invoices & Billing History -->
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h2 class="m-0 text-xl font-bold text-slate-900">سجل الفواتير والمدفوعات</h2>
        <span class="text-sm text-slate-500">استعراض وتحميل فواتير الاشتراك الشهرية السابقة.</span>
      </div>

      <UCard class="rounded-2xl border border-slate-200 bg-white overflow-hidden p-0">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-right border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th class="py-3 px-6 text-start">رقم الفاتورة</th>
                <th class="py-3 px-6 text-start">التاريخ</th>
                <th class="py-3 px-6 text-start">المبلغ</th>
                <th class="py-3 px-6 text-start">الحالة</th>
                <th class="py-3 px-6 text-end">الإجراء</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="inv in invoices" :key="inv.id" class="hover:bg-slate-50/70 transition-colors">
                <td class="py-4 px-6 font-mono font-bold text-slate-800">{{ inv.id }}</td>
                <td class="py-4 px-6 text-slate-600">{{ inv.date }}</td>
                <td class="py-4 px-6 font-extrabold text-slate-900">{{ inv.amount }}</td>
                <td class="py-4 px-6">
                  <UBadge color="success" variant="subtle" size="sm" class="font-bold">
                    {{ inv.status }}
                  </UBadge>
                </td>
                <td class="py-4 px-6 text-end">
                  <UButton 
                    variant="ghost" 
                    color="primary" 
                    size="sm" 
                    icon="i-lucide-download"
                    class="font-bold cursor-pointer"
                  >
                    تحميل الفاتورة
                  </UButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </UCard>
    </div>
  </div>
</template>
