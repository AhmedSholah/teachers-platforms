<script setup lang="ts">
const billingCycle = ref<'monthly' | 'yearly'>('monthly')

interface Plan {
  id: string
  name: string
  badge?: string
  description: string
  priceMonthly: string
  priceYearly: string
  periodMonthly: string
  periodYearly: string
  savings?: string
  highlighted?: boolean
  ctaText: string
  ctaVariant: 'solid' | 'outline' | 'subtle'
  features: string[]
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'باقة البداية (Starter)',
    description: 'مثالية للمعلمين الجدد الذين يبدأون أولى خطواتهم لتقديم كورساتهم أونلاين.',
    priceMonthly: '0',
    priceYearly: '0',
    periodMonthly: 'مجاناً للبدء',
    periodYearly: 'مجاناً دائماً',
    ctaText: 'ابدأ مجاناً الآن',
    ctaVariant: 'outline',
    features: [
      'حتى 100 طالب مسجل',
      'كورسين كاملين بمحاضرات غير محدودة',
      'دومين فرعي مجاني (yourname.monasatk.com)',
      'تحصيل الاشتراكات عبر فودافون كاش ومحافظ الهاتف',
      'علامة مائية قياسية لحماية الفيديوهات',
      'امتحانات إلكترونية بسيطة وتصحيح ذاتي'
    ]
  },
  {
    id: 'pro',
    name: 'المحاضر المحترف (Pro)',
    badge: 'الأكثر اختياراً بين المعلمين',
    description: 'الحل الشامل للمعلم المستقل الذي يريد هويته الخاصة وحماية كاملة لأرباحه.',
    priceMonthly: '399',
    priceYearly: '319',
    periodMonthly: 'ج.م / شهرياً',
    periodYearly: 'ج.م / شهرياً (تدفع سنوياً)',
    savings: 'وفر 20% مع الدفع السنوي',
    highlighted: true,
    ctaText: 'ابدأ تجربة مجانية 14 يوماً',
    ctaVariant: 'solid',
    features: [
      'عدد غير محدود من الطلاب والكورسات',
      'ربط دومينك الخاص (yourname.com) مع شهادة SSL مجانية',
      'درع الحماية المشدد DRM (منع تصوير الشاشة وتنزيل الفيديوهات)',
      'علامة مائية متحركة ديناميكية برقم هاتف وIP الطالب',
      'ربط بوابات الدفع (فودافون كاش، انستا باي، فوري، فيزا وميزة)',
      'بنك أسئلة ذكي وامتحانات مؤقتة مع تصحيح فوري',
      'إرسال نتائج الامتحانات والغياب لأولياء الأمور عبر واتساب',
      'توليد وطباعة كروت شحن وأكواد السنتر'
    ]
  },
  {
    id: 'academy',
    name: 'الأكاديميات والفرق (Academy)',
    description: 'مصممة للسناتر الكبرى والأكاديميات التعليمية التي تدير عدة مواد ومساعدين.',
    priceMonthly: '899',
    priceYearly: '719',
    periodMonthly: 'ج.م / شهرياً',
    periodYearly: 'ج.م / شهرياً (تدفع سنوياً)',
    savings: 'وفر 20% مع الدفع السنوي',
    ctaText: 'اشترك الآن كأكاديمية',
    ctaVariant: 'outline',
    features: [
      'كل مميزات الباقة المحترفة بالكامل',
      'حتى 5 حسابات للمساعدين (Assistants) بصلاحيات مخصصة',
      'تطبيق ويب متقدم PWA بهوية وشعار أكاديميتك',
      'تقارير مالية تفصيلية ومتابعة أرباح كل مادة ومعلم',
      'أولوية الدعم الفني ومدير حساب مخصص طوال الأسبوع',
      'خوادم استضافة فائقة السرعة للمشاهدات المليونية'
    ]
  }
]

const guarantees = [
  { icon: 'i-lucide-check-circle-2', text: 'تجربة مجانية 14 يوماً دون أي التزام' },
  { icon: 'i-lucide-credit-card', text: 'لا نأخذ أي عمولة على مبيعات كورساتك' },
  { icon: 'i-lucide-shield-check', text: 'حماية كاملة لفيديوهاتك وملفاتك 100%' },
  { icon: 'i-lucide-zap', text: 'إطلاق وتفعيل فوري خلال دقيقتين فقط' }
]
</script>

<template>
  <section id="pricing" class="relative bg-neutral-50/70 py-20 sm:py-24 lg:py-28 overflow-hidden">
    <!-- Ambient Backdrop Glow -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute top-1/4 start-1/2 -translate-x-1/2 size-[42rem] rounded-full bg-brand-200/30 blur-[140px]" />
      <div class="bg-dots absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_50%_at_50%_40%,black,transparent)]" />
    </div>

    <UContainer class="relative z-10">
      <!-- Section Header -->
      <header v-reveal class="mx-auto max-w-2xl text-center">
        <UBadge
          color="primary"
          variant="soft"
          size="sm"
          class="rounded-full px-3 py-1 text-[13px] font-semibold"
        >
          خطط الأسعار
        </UBadge>

        <h2 class="mt-4 text-3xl font-extrabold text-balance text-neutral-900 sm:text-4xl lg:text-[2.65rem] leading-tight">
          باقات واضحة وبسيطة،
          <span class="bg-gradient-to-b from-brand-500 to-brand-700 bg-clip-text text-transparent">
            بدون أي عمولات خفية.
          </span>
        </h2>

        <p class="mt-4 text-[17px] leading-8 text-neutral-600">
          اختر الباقة المناسبة لحجم طلابك، واحتفظ بكامل أرباحك بنسبة 100% دون خصومات.
        </p>

        <!-- Billing Cycle Toggle (Monthly vs Yearly) -->
        <div class="mt-8 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white p-1.5 shadow-xs">
          <button
            type="button"
            class="rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            :class="
              billingCycle === 'monthly'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            "
            @click="billingCycle = 'monthly'"
          >
            دفع شهري
          </button>
          
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            :class="
              billingCycle === 'yearly'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            "
            @click="billingCycle = 'yearly'"
          >
            <span>دفع سنوي</span>
            <span class="rounded-full bg-amber-400 text-neutral-950 px-2 py-0.5 text-[10px] font-black">
              وفر 20%
            </span>
          </button>
        </div>
      </header>

      <!-- Pricing Cards Grid -->
      <div class="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
        <div
          v-for="(plan, i) in plans"
          :key="plan.id"
          v-reveal="{ delay: i * 120 }"
          class="relative flex flex-col justify-between rounded-3xl transition-all duration-300"
          :class="
            plan.highlighted
              ? 'border-2 border-brand-500 bg-white shadow-2xl shadow-brand-600/15 ring-4 ring-brand-500/10 lg:-translate-y-2'
              : 'border border-neutral-200/90 bg-white shadow-sm hover:shadow-md'
          "
        >
          <!-- Featured Badge for Pro Plan -->
          <div
            v-if="plan.badge"
            class="absolute -top-4 start-1/2 -translate-x-1/2 rounded-full bg-gradient-to-l from-brand-600 to-indigo-600 px-4 py-1 text-xs font-black text-white shadow-md shadow-brand-600/30 flex items-center gap-1.5"
          >
            <UIcon name="i-lucide-sparkles" class="size-3.5 text-amber-300" />
            <span>{{ plan.badge }}</span>
          </div>

          <!-- Card Top Content -->
          <div class="p-7 sm:p-8">
            <h3 class="text-xl font-extrabold text-neutral-900">
              {{ plan.name }}
            </h3>
            
            <p class="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed min-h-[40px]">
              {{ plan.description }}
            </p>

            <!-- Price Display -->
            <div class="mt-6 pt-6 border-t border-neutral-100 flex items-baseline gap-2">
              <span class="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 font-sans">
                {{ billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly }}
              </span>
              <div class="text-xs text-neutral-500">
                <span class="font-bold block text-neutral-700">
                  {{ billingCycle === 'monthly' ? plan.periodMonthly : plan.periodYearly }}
                </span>
                <span v-if="plan.savings && billingCycle === 'yearly'" class="text-[11px] font-bold text-emerald-600">
                  {{ plan.savings }}
                </span>
              </div>
            </div>

            <!-- CTA Button -->
            <div class="mt-7">
              <UButton
                to="/login"
                size="lg"
                block
                :color="plan.highlighted ? 'primary' : 'neutral'"
                :variant="plan.highlighted ? 'solid' : 'outline'"
                class="rounded-xl font-bold py-3 text-sm shadow-xs transition-transform duration-200 active:scale-[0.99]"
              >
                <span>{{ plan.ctaText }}</span>
                <UIcon name="i-lucide-arrow-left" class="size-4" />
              </UButton>
            </div>

            <!-- Features Checklist -->
            <div class="mt-8 space-y-3">
              <p class="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
                المميزات المضمنة:
              </p>
              
              <ul class="space-y-3 text-xs sm:text-[13px] text-neutral-700">
                <li
                  v-for="(feat, fIdx) in plan.features"
                  :key="fIdx"
                  class="flex items-start gap-2.5 leading-snug"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="size-4 shrink-0 mt-0.5"
                    :class="plan.highlighted ? 'text-brand-600 font-bold' : 'text-emerald-600'"
                  />
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Card Bottom Note -->
          <div class="px-7 py-4 bg-neutral-50/70 border-t border-neutral-100 rounded-b-3xl text-center text-[11px] text-neutral-500 font-medium">
            <span v-if="plan.id === 'starter'">بدون بطاقة ائتمانية للبدء</span>
            <span v-else-if="plan.id === 'pro'">استرداد الأموال خلال 14 يوماً</span>
            <span v-else>دعم مخصص ونقل بيانات مجاني</span>
          </div>
        </div>
      </div>

      <!-- Trust & Guarantees Strip -->
      <div v-reveal class="mt-14 pt-8 border-t border-neutral-200/80">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div
            v-for="(g, idx) in guarantees"
            :key="idx"
            class="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 text-xs font-bold text-neutral-700 rounded-2xl bg-white border border-neutral-200/70 shadow-2xs"
          >
            <UIcon :name="g.icon" class="size-4.5 text-brand-600 shrink-0" />
            <span>{{ g.text }}</span>
          </div>
        </div>
      </div>

    </UContainer>
  </section>
</template>

