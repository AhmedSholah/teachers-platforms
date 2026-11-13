<script setup lang="ts">
useHead({
  title: 'منصة المعلمين – الرئيسية'
})

// Dynamic rotating hero words
const rotatingWords = ['دوراتك', 'دروسك', 'خبرتك', 'كتبك']
const currentWordIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    currentWordIndex.value = (currentWordIndex.value + 1) % rotatingWords.length
  }, 2400)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// How it works steps
const steps = [
  {
    number: 1,
    title: 'سجّل واختر اسماً',
    description: 'أنشئ حسابك واختر اسم منصتك، وسنجهّز لك موقعك فوراً.',
    icon: 'i-lucide-user-plus'
  },
  {
    number: 2,
    title: 'ارفع دوراتك',
    description: 'أضف الفيديوهات والملفات والدروس، ونظّمها في دورات، وحدّد سعراً لكل دورة.',
    icon: 'i-lucide-upload-cloud'
  },
  {
    number: 3,
    title: 'بِع لطلابك',
    description: 'يشترك الطلاب ويدفعون على موقعك، وتتابع المبيعات والمتعلمين من لوحة تحكم واحدة. [شروط تحويل الأرباح]',
    icon: 'i-lucide-banknote'
  }
]

// Platform features
const features = [
  {
    title: 'موقعك الخاص باسمك',
    description: 'موقع خاص بكل معلم، جاهز فور التسجيل.',
    icon: 'i-lucide-globe'
  },
  {
    title: 'منشئ دورات سهل',
    description: 'ارفع الدروس ونظّم الأقسام وانشر عندما تكون جاهزاً.',
    icon: 'i-lucide-graduation-cap'
  },
  {
    title: 'مدفوعات مدمجة',
    description: 'حدّد الأسعار ودع الطلاب يشترون الدورات مباشرة من منصتك.',
    icon: 'i-lucide-credit-card'
  },
  {
    title: 'إدارة الطلاب',
    description: 'اعرف من اشترك، وماذا اشترى، ومدى تقدّمه.',
    icon: 'i-lucide-users'
  },
  {
    title: 'هويتك البصرية',
    description: 'أضف شعارك وألوانك ورسالة الترحيب لتبدو المنصة ملكاً لك.',
    icon: 'i-lucide-palette'
  },
  {
    title: 'تعمل على كل الأجهزة',
    description: 'يتعلم الطلاب من الهاتف أو الجهاز اللوحي أو الحاسوب بنفس التجربة السلسة.',
    icon: 'i-lucide-smartphone'
  }
]

// Pricing plans
const pricingPlans = [
  {
    id: 'starter',
    name: 'أساسية',
    description: 'للمعلمين الذين يبدأون أول دورة.',
    price: '[السعر]',
    period: '/ شهرياً',
    popular: false,
    features: [
      'موقع خاص باسمك',
      'عدد الدورات: [العدد]',
      'عمولة المبيعات: [النسبة]'
    ]
  },
  {
    id: 'pro',
    name: 'احترافية',
    description: 'لمن يبيع دورات متعددة ويُنمّي جمهوره.',
    price: '[السعر]',
    period: '/ شهرياً',
    popular: true,
    badge: 'الأكثر اختياراً',
    features: [
      'كل مزايا الخطة الأساسية',
      'شعارك وألوانك الخاصة',
      'عمولة المبيعات: [النسبة]'
    ]
  },
  {
    id: 'academy',
    name: 'أكاديمية',
    description: 'للمؤسسات التعليمية وفرق التدريس.',
    price: '[السعر]',
    period: '/ شهرياً',
    popular: false,
    features: [
      'كل مزايا الخطة الاحترافية',
      'عدة معلمين على منصة واحدة',
      'دعم ذو أولوية'
    ]
  }
]

// Frequently asked questions
const faqItems = [
  {
    label: 'كيف أنشئ منصتي؟',
    content: 'سجّل حسابك واختر اسم منصتك، وستكون منصتك جاهزة لتبدأ برفع دوراتك فوراً.'
  },
  {
    label: 'هل أحتاج إلى خبرة تقنية؟',
    content: 'لا. كل شيء يتم من لوحة تحكم بسيطة: ارفع الفيديوهات والملفات ونظّمها في دورات دون كتابة أي كود.'
  },
  {
    label: 'ما أنواع المحتوى التي يمكنني رفعها؟',
    content: 'يمكنك رفع الفيديوهات والملفات والدروس وتنظيمها في دورات. [الصيغ والأحجام المدعومة]'
  },
  {
    label: 'كيف أستلم أرباح مبيعاتي؟',
    content: 'يدفع الطلاب مباشرة على منصتك، وتتابع مبيعاتك من لوحة التحكم. [طرق وشروط تحويل الأرباح]'
  },
  {
    label: 'هل يمكنني تخصيص شكل منصتي؟',
    content: 'نعم، أضف شعارك وألوانك ورسالة الترحيب لتبدو المنصة ملكاً لك.'
  },
  {
    label: 'هل يمكنني تجربة المنصة قبل الاشتراك؟',
    content: '[تفاصيل التجربة المجانية]. يمكنك الاطلاع على الخطط والأسعار في قسم الأسعار.'
  }
]
</script>

<template>
  <div class="w-full min-h-screen bg-white text-slate-900 flex flex-col font-sans">
    <!-- Navigation Header -->
    <PublicNavbar />

    <main class="flex-1 flex flex-col">
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-slate-50/70 border-b border-slate-100 py-20 lg:py-28">
        <!-- Subtle Pattern Background -->
        <div class="absolute inset-0 bg-[radial-gradient(#c5d0f5_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

        <!-- Ambient Glowing Lights -->
        <div class="absolute -top-24 start-1/12 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none animate-pulse-subtle" />
        <div class="absolute top-1/2 -translate-y-1/2 start-1/2 -translate-x-1/2 w-[600px] h-72 rounded-full bg-blue-200/25 blur-3xl pointer-events-none" />
        <div class="absolute -bottom-20 end-1/12 w-96 h-96 rounded-full bg-amber-300/20 blur-3xl pointer-events-none animate-pulse-subtle anim-delay-1000" />

        <!-- Floating Animated Decorative Badges (Desktop & Large Screens) -->
        <!-- Start Side Badges -->
        <div class="absolute top-10 start-6 xl:start-14 hidden lg:flex items-center gap-3 p-2.5 xl:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-100 shadow-xl shadow-blue-500/10 animate-float-slow hover:scale-105 transition-all duration-300 group cursor-default select-none z-10">
          <div class="w-11 h-11 xl:w-12 xl:h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs">
            <UIcon name="i-lucide-graduation-cap" class="w-6 h-6 xl:w-7 xl:h-7 group-hover:rotate-6 transition-transform duration-300" />
          </div>
          <div class="hidden xl:flex flex-col pe-2">
            <span class="text-xs font-black text-slate-800">+1,500 معلم</span>
            <span class="text-[10px] font-medium text-slate-500">أنشأوا أكاديمياتهم</span>
          </div>
        </div>

        <div class="absolute top-44 start-4 xl:start-8 hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-md border border-red-100 shadow-xl shadow-red-500/10 text-red-500 animate-float-medium anim-delay-500 hover:scale-110 transition-all duration-300 group cursor-default select-none z-10">
          <span class="absolute top-2 end-2 w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75" />
          <UIcon name="i-lucide-video" class="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
        </div>

        <div class="absolute top-2/3 start-8 xl:start-16 hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-100 shadow-xl shadow-amber-500/10 text-amber-500 animate-float-reverse anim-delay-1000 hover:scale-110 transition-all duration-300 group cursor-default select-none z-10">
          <UIcon name="i-lucide-lightbulb" class="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
        </div>

        <div class="absolute bottom-12 start-6 xl:start-12 hidden lg:flex items-center justify-center w-13 h-13 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-100 shadow-xl shadow-emerald-500/10 text-emerald-600 animate-float-slow anim-delay-1500 hover:scale-110 transition-all duration-300 group cursor-default select-none z-10">
          <UIcon name="i-lucide-globe" class="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
        </div>

        <!-- End Side Badges -->
        <div class="absolute top-10 end-6 xl:end-14 hidden lg:flex items-center gap-3 p-2.5 xl:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-100 shadow-xl shadow-amber-500/10 animate-float-slow anim-delay-700 hover:scale-105 transition-all duration-300 group cursor-default select-none z-10">
          <div class="w-11 h-11 xl:w-12 xl:h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-xs">
            <UIcon name="i-lucide-star" class="w-6 h-6 xl:w-7 xl:h-7 fill-amber-400 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div class="hidden xl:flex flex-col pe-2">
            <span class="text-xs font-black text-slate-800">تقييم 4.9 / 5</span>
            <span class="text-[10px] font-medium text-slate-500">رضا الطلاب والمعلمين</span>
          </div>
        </div>

        <div class="absolute top-44 end-4 xl:end-8 hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-100 shadow-xl shadow-blue-500/10 text-blue-600 animate-float-fast anim-delay-300 hover:scale-110 transition-all duration-300 group cursor-default select-none z-10">
          <UIcon name="i-lucide-book-open" class="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
        </div>

        <div class="absolute top-2/3 end-8 xl:end-16 hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-100 shadow-xl shadow-purple-500/10 text-purple-600 animate-float-reverse anim-delay-1200 hover:scale-110 transition-all duration-300 group cursor-default select-none z-10">
          <UIcon name="i-lucide-banknote" class="w-7 h-7 group-hover:-rotate-12 transition-transform duration-300" />
        </div>

        <div class="absolute bottom-12 end-6 xl:end-12 hidden lg:flex items-center justify-center w-13 h-13 rounded-2xl bg-white/95 backdrop-blur-md border border-indigo-100 shadow-xl shadow-indigo-500/10 text-indigo-600 animate-float-medium anim-delay-2000 hover:scale-110 transition-all duration-300 group cursor-default select-none z-10">
          <UIcon name="i-lucide-sparkles" class="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
        </div>

        <UContainer class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div class="max-w-3xl mx-auto flex flex-col items-center text-center gap-7">
            <!-- Hero Pill / Announcement Badge -->
            <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-200/70 shadow-xs text-xs sm:text-sm font-bold text-slate-800 hover:border-blue-300 hover:shadow-sm transition-all select-none">
              <span class="flex h-2 w-2 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <UIcon name="i-lucide-sparkles" class="w-4 h-4 text-amber-500 animate-pulse" />
              <span>المنصة الأسهل لإنشاء وإدارة أكاديميتك الخاصة</span>
            </div>

            <!-- Headline -->
            <h1 class="m-0 text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.25] tracking-tight">
              <span class="block">أنشئ منصتك التعليمية لبيع</span>
              <span class="block my-2">
                <span class="relative inline-flex items-center justify-center px-4 py-1 text-blue-600 font-extrabold min-w-[160px]">
                  <span class="absolute inset-x-0 bottom-1.5 h-3.5 bg-amber-200/80 rounded-lg -z-0" />
                  <Transition 
                    mode="out-in" 
                    enter-active-class="transition duration-200 ease-out transform" 
                    enter-from-class="opacity-0 -translate-y-2" 
                    enter-to-class="opacity-100 translate-y-0" 
                    leave-active-class="transition duration-150 ease-in transform" 
                    leave-from-class="opacity-100 translate-y-0" 
                    leave-to-class="opacity-0 translate-y-2"
                  >
                    <span :key="currentWordIndex" class="relative z-10">
                      {{ rotatingWords[currentWordIndex] }}
                    </span>
                  </Transition>
                </span>
              </span>
              <span class="block">في دقائق</span>
            </h1>

            <!-- Subtitle -->
            <p class="m-0 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              ارفع دوراتك، وحدّد أسعارك، وابدأ البيع لطلابك بهويتك وعلامتك التجارية الخاصة.
            </p>

            <!-- CTA Buttons -->
            <div id="start" class="flex flex-wrap items-center justify-center gap-4 pt-1">
              <UButton 
                to="/register" 
                size="xl" 
                color="primary" 
                class="font-black px-8 py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all text-base cursor-pointer group"
              >
                <template #leading>
                  <UIcon name="i-lucide-rocket" class="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-12 transition-transform duration-300" />
                </template>
                أنشئ منصتي
              </UButton>
              <UButton 
                to="#video" 
                size="xl" 
                variant="outline" 
                color="neutral" 
                class="font-bold px-7 py-4 rounded-xl bg-white text-slate-800 border-slate-300 hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 transition-all text-base cursor-pointer group"
              >
                <template #leading>
                  <UIcon name="i-lucide-play-circle" class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                </template>
                شاهد كيف تعمل
              </UButton>
            </div>

            <!-- Trust / Guarantee Badge -->
            <div class="flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
              <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>اسمك وعلامتك وطلابك. [شروط التجربة المجانية]</span>
            </div>

            <!-- Value Props Highlights Bar -->
            <div class="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-700">
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
                <UIcon name="i-lucide-zap" class="w-4 h-4 text-amber-500 shrink-0" />
                <span>إطلاق فوري في دقيقتين</span>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
                <UIcon name="i-lucide-credit-card" class="w-4 h-4 text-emerald-600 shrink-0" />
                <span>مدفوعات مباشرة لطلابك</span>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
                <UIcon name="i-lucide-palette" class="w-4 h-4 text-blue-600 shrink-0" />
                <span>تخصيص الهوية والشعار</span>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors">
                <UIcon name="i-lucide-smartphone" class="w-4 h-4 text-purple-600 shrink-0" />
                <span>متوافق مع كل الأجهزة</span>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Video / Explainer Section -->
      <section id="video" class="bg-slate-900 text-white py-24 border-y border-slate-800">
        <UContainer class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <!-- Section Header -->
          <div class="text-center flex flex-col items-center gap-3">
            <UBadge color="warning" variant="subtle" size="md" class="font-bold px-3 py-1">
              شاهد الشرح
            </UBadge>
            <h2 class="m-0 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              تعرّف على المنصة في دقيقتين
            </h2>
            <p class="m-0 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              فيديو قصير يشرح كيف تنشئ منصتك وترفع دوراتك وتبدأ البيع.
            </p>
          </div>

          <!-- Video Mockup Card -->
          <div class="w-full max-w-4xl mx-auto aspect-video rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden flex items-center justify-center group">
            <!-- Badge -->
            <UBadge color="neutral" variant="subtle" class="absolute top-5 end-5 font-bold z-10">
              شرح المنصة
            </UBadge>

            <!-- Big Play Action Button -->
            <UButton 
              color="primary" 
              size="xl" 
              aria-label="تشغيل الفيديو"
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/20 group-hover:scale-110 transition-transform cursor-pointer p-0"
            >
              <UIcon name="i-lucide-play" class="w-10 h-10 ms-1 text-white shrink-0" />
            </UButton>

            <!-- Video Player Controls Bar Mockup -->
            <div class="absolute inset-x-0 bottom-0 px-6 py-4 bg-slate-950/90 backdrop-blur border-t border-slate-800 flex items-center gap-4 text-slate-300 text-sm">
              <UIcon name="i-lucide-play" class="w-5 h-5 text-white shrink-0" />
              <div class="flex-1 h-1.5 rounded-full bg-slate-700 relative overflow-hidden">
                <div class="h-full w-1/4 bg-amber-400 rounded-full" />
              </div>
              <span class="font-mono text-xs text-slate-400">0:00 / [المدة]</span>
              <UIcon name="i-lucide-volume-2" class="w-5 h-5 text-slate-300 shrink-0" />
              <UIcon name="i-lucide-maximize" class="w-5 h-5 text-slate-300 shrink-0" />
            </div>
          </div>

          <!-- Helper Note -->
          <p class="m-0 text-center text-xs sm:text-sm text-slate-400">
            [رابط فيديو الشرح] استبدل هذا العنصر بفيديو الشرح الخاص بك.
          </p>
        </UContainer>
      </section>

      <!-- How It Works Section -->
      <section id="how" class="bg-white py-24">
        <UContainer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
          <!-- Section Header -->
          <div class="text-center flex flex-col items-center gap-3">
            <UBadge color="primary" variant="subtle" size="md" class="font-bold px-3 py-1">
              كيف تعمل المنصة
            </UBadge>
            <h2 class="m-0 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              من التسجيل إلى أول عملية بيع في ثلاث خطوات
            </h2>
          </div>

          <!-- 3 Steps Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            <UCard 
              v-for="step in steps" 
              :key="step.number"
              class="rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div class="flex flex-col gap-5">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-500/20">
                    {{ step.number }}
                  </div>
                  <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <UIcon :name="step.icon" class="w-5 h-5" />
                  </div>
                </div>
                <h3 class="m-0 text-xl font-bold text-slate-900">
                  {{ step.title }}
                </h3>
                <p class="m-0 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </UCard>
          </div>
        </UContainer>
      </section>

      <!-- Features Section -->
      <section id="features" class="bg-slate-50/70 py-24 border-y border-slate-100">
        <UContainer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
          <!-- Section Header -->
          <div class="text-center flex flex-col items-center gap-3">
            <UBadge color="primary" variant="subtle" size="md" class="font-bold px-3 py-1">
              المميزات
            </UBadge>
            <h2 class="m-0 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight max-w-2xl">
              كل ما يحتاجه المعلم لإدارة مدرسته على الإنترنت
            </h2>
          </div>

          <!-- Features Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <UCard 
              v-for="(feature, fIndex) in features" 
              :key="fIndex"
              class="rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div class="flex flex-col gap-4">
                <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  <UIcon :name="feature.icon" class="w-6 h-6 shrink-0" />
                </div>
                <h3 class="m-0 text-xl font-bold text-slate-900">
                  {{ feature.title }}
                </h3>
                <p class="m-0 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </UCard>
          </div>
        </UContainer>
      </section>

      <!-- Pricing Section -->
      <section id="pricing" class="bg-white py-24">
        <UContainer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
          <!-- Section Header -->
          <div class="text-center flex flex-col items-center gap-3">
            <UBadge color="primary" variant="subtle" size="md" class="font-bold px-3 py-1">
              الأسعار
            </UBadge>
            <h2 class="m-0 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              اختر الخطة التي تناسب منصتك
            </h2>
            <p class="m-0 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              ابدأ بخطة بسيطة وارتقِ بها كلما كبرت منصتك وزاد عدد طلابك.
            </p>
          </div>

          <!-- Pricing Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <UCard 
              v-for="plan in pricingPlans" 
              :key="plan.id"
              class="rounded-2xl transition-all flex flex-col justify-between overflow-hidden"
              :class="plan.popular ? 'border-2 border-blue-600 bg-slate-900 text-white shadow-xl ring-2 ring-blue-500/20' : 'border border-slate-200 bg-white text-slate-900'"
            >
              <div class="flex flex-col gap-6">
                <!-- Card Header -->
                <div class="flex items-center justify-between">
                  <h3 class="m-0 text-2xl font-black" :class="plan.popular ? 'text-white' : 'text-slate-900'">
                    {{ plan.name }}
                  </h3>
                  <UBadge 
                    v-if="plan.badge" 
                    color="warning" 
                    variant="solid" 
                    size="sm" 
                    class="font-black"
                  >
                    {{ plan.badge }}
                  </UBadge>
                </div>

                <p class="m-0 text-sm leading-relaxed" :class="plan.popular ? 'text-slate-300' : 'text-slate-600'">
                  {{ plan.description }}
                </p>

                <!-- Price -->
                <div class="flex items-baseline gap-2 pt-2 border-t" :class="plan.popular ? 'border-slate-800' : 'border-slate-100'">
                  <span class="text-4xl font-black" :class="plan.popular ? 'text-white' : 'text-slate-900'">
                    {{ plan.price }}
                  </span>
                  <span class="text-sm font-semibold" :class="plan.popular ? 'text-slate-400' : 'text-slate-500'">
                    {{ plan.period }}
                  </span>
                </div>

                <!-- Features List -->
                <ul class="flex flex-col gap-3.5 p-0 m-0 list-none my-2">
                  <li 
                    v-for="(feat, fIdx) in plan.features" 
                    :key="fIdx"
                    class="flex items-center gap-3 text-sm font-medium"
                    :class="plan.popular ? 'text-slate-200' : 'text-slate-700'"
                  >
                    <UIcon 
                      name="i-lucide-check" 
                      class="w-5 h-5 shrink-0" 
                      :class="plan.popular ? 'text-amber-400' : 'text-blue-600'" 
                    />
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <!-- Button Action -->
              <div class="pt-6">
                <UButton 
                  to="/register" 
                  :color="plan.popular ? 'primary' : 'neutral'"
                  :variant="plan.popular ? 'solid' : 'outline'"
                  block 
                  size="lg"
                  class="font-extrabold rounded-xl py-3.5 cursor-pointer justify-center"
                >
                  أنشئ منصتي
                </UButton>
              </div>
            </UCard>
          </div>
        </UContainer>
      </section>

      <!-- FAQ Section -->
      <section id="faq" class="bg-slate-50/70 py-24 border-y border-slate-100">
        <UContainer class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <!-- Section Header -->
          <div class="text-center flex flex-col items-center gap-3">
            <UBadge color="primary" variant="subtle" size="md" class="font-bold px-3 py-1">
              الأسئلة الشائعة
            </UBadge>
            <h2 class="m-0 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              أسئلة يطرحها المعلمون قبل البدء
            </h2>
          </div>

          <!-- Nuxt UI Accordion Component -->
          <UAccordion 
            :items="faqItems" 
            type="single"
            collapsible
            class="w-full space-y-4"
            :ui="{
              item: 'bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden px-6 py-2 transition-colors hover:border-slate-300',
              trigger: 'text-slate-900 font-extrabold text-base sm:text-lg py-4 cursor-pointer hover:no-underline gap-4 justify-between',
              body: 'text-slate-600 text-sm sm:text-base leading-relaxed pb-5 pt-1'
            }"
          />
        </UContainer>
      </section>

      <!-- Final CTA Section -->
      <section class="bg-slate-900 text-white py-24 border-t border-slate-800 relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <UContainer class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center flex flex-col items-center gap-6">
          <h2 class="m-0 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            جاهز لتبدأ؟
          </h2>
          <p class="m-0 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
            أنشئ منصتك في دقائق، وابدأ رحلتك مع طلابك.
          </p>
          <UButton 
            to="/register" 
            size="xl" 
            color="primary" 
            icon="i-lucide-rocket"
            class="font-black px-10 py-4 rounded-xl shadow-xl shadow-blue-500/30 hover:scale-105 transition-transform text-lg cursor-pointer"
          >
            أنشئ منصتي
          </UButton>
        </UContainer>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-8">
      <UContainer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-between gap-6 text-sm text-slate-600">
          <!-- Logo / Brand -->
          <div class="flex items-center gap-2 font-black text-slate-900 text-base">
            <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-blue-600 shrink-0" />
            <span>[اسم علامتك]</span>
          </div>

          <!-- Links -->
          <div class="flex flex-wrap items-center gap-6 font-medium">
            <a href="#start" class="hover:text-blue-600 transition-colors">من نحن</a>
            <a href="#start" class="hover:text-blue-600 transition-colors">الدعم</a>
            <a href="#start" class="hover:text-blue-600 transition-colors">الشروط</a>
            <a href="#start" class="hover:text-blue-600 transition-colors">الخصوصية</a>
          </div>

          <!-- Copyright -->
          <div class="text-xs sm:text-sm text-slate-500">
            © [السنة] [اسم علامتك]
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>
