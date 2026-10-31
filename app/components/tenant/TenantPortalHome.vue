<script setup lang="ts">
const props = defineProps<{
  subdomain: string
}>()

// Format subdomain to human readable teacher name (e.g., "mr-ahmed" -> "الأستاذ أحمد")
const teacherDisplayName = computed(() => {
  const clean = props.subdomain.replace(/[-_]/g, ' ')
  return clean
})

const courses = [
  {
    id: 1,
    title: 'مراجعة المنهج النهائي الشاملة - الثانوية العامة',
    grade: 'الصف الثالث الثانوي',
    lessonsCount: 24,
    hours: '32 ساعة',
    price: '350 ج.م',
    popular: true,
    rating: 4.9
  },
  {
    id: 2,
    title: 'كورس التأسيس وحل التمارين المتقدمة',
    grade: 'الصف الثاني الثانوي',
    lessonsCount: 18,
    hours: '22 ساعة',
    price: '280 ج.م',
    popular: false,
    rating: 4.8
  },
  {
    id: 3,
    title: 'شرح الوحدات الأولى والثانية بالتفصيل',
    grade: 'الصف الأول الثانوي',
    lessonsCount: 14,
    hours: '16 ساعة',
    price: '220 ج.م',
    popular: false,
    rating: 5.0
  }
]
</script>

<template>
  <div class="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-brand-500 selection:text-white">
    <!-- Subdomain Notice Bar (indicates the current active platform) -->
    <div class="bg-brand-600 px-4 py-2 text-center text-xs font-medium text-white shadow-inner flex items-center justify-center gap-2">
      <UIcon name="i-lucide-globe" class="size-4 shrink-0 opacity-80" />
      <span>أنت الآن في المنصة الرسمية لـ: <strong>{{ subdomain }}</strong></span>
      <span class="rounded bg-white/20 px-1.5 py-0.5 text-[11px] font-mono">{{ subdomain }}.منصتك</span>
    </div>

    <!-- Tenant Header / Navbar -->
    <header class="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/85 backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <!-- Teacher Brand -->
        <div class="flex items-center gap-3">
          <div class="flex size-11 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 text-white font-bold text-lg shadow-sm">
            {{ teacherDisplayName.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h1 class="text-base font-bold text-neutral-900 sm:text-lg capitalize leading-snug">
              منصة {{ teacherDisplayName }}
            </h1>
            <p class="text-xs text-neutral-500">المنصة التعليمية المعتمدة</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2 sm:gap-3">
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            icon="i-lucide-user"
            class="text-neutral-700"
          >
            دخول الطالب
          </UButton>
          <UButton
            color="primary"
            size="sm"
            icon="i-lucide-book-open"
            class="shadow-sm shadow-brand-500/20"
          >
            اشترك في كورس
          </UButton>
        </div>
      </div>
    </header>

    <!-- Tenant Hero -->
    <section class="relative overflow-hidden bg-white border-b border-neutral-200/60 py-16 sm:py-20">
      <!-- Background subtle decor -->
      <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute -top-32 start-1/2 -translate-x-1/2 size-[36rem] rounded-full bg-brand-100/60 blur-3xl opacity-60" />
      </div>

      <div class="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div class="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700 mb-6">
          <UIcon name="i-lucide-sparkles" class="size-3.5" />
          <span>العام الدراسي الجديد مفتوح للتسجيل الآن</span>
        </div>

        <h2 class="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl text-balance">
          تعلّم معنا وحقّق أعلى الدرجات مع
          <span class="bg-gradient-to-l from-brand-600 to-brand-500 bg-clip-text text-transparent">منصة {{ teacherDisplayName }}</span>
        </h2>

        <p class="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-neutral-600 leading-relaxed">
          شروحات مبسطة بأعلى جودة، متابعة دورية لكل حصة، اختبارات أسبوعية وبنك أسئلة مخصص لضمان تفوقك المستمر.
        </p>

        <!-- Quick Stats -->
        <div class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl mx-auto">
          <div class="rounded-2xl border border-neutral-200/70 bg-neutral-50/70 p-4 text-center">
            <div class="text-2xl sm:text-3xl font-extrabold text-brand-600">+1,500</div>
            <div class="mt-1 text-xs text-neutral-500">طالب مسجل</div>
          </div>
          <div class="rounded-2xl border border-neutral-200/70 bg-neutral-50/70 p-4 text-center">
            <div class="text-2xl sm:text-3xl font-extrabold text-brand-600">30+</div>
            <div class="mt-1 text-xs text-neutral-500">ساعة تعليمية</div>
          </div>
          <div class="rounded-2xl border border-neutral-200/70 bg-neutral-50/70 p-4 text-center">
            <div class="text-2xl sm:text-3xl font-extrabold text-brand-600">4.9/5</div>
            <div class="mt-1 text-xs text-neutral-500">تقييم الطلاب</div>
          </div>
          <div class="rounded-2xl border border-neutral-200/70 bg-neutral-50/70 p-4 text-center">
            <div class="text-2xl sm:text-3xl font-extrabold text-brand-600">100%</div>
            <div class="mt-1 text-xs text-neutral-500">متابعة شخصية</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Available Courses Section -->
    <section class="py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span class="text-xs font-semibold text-brand-600 uppercase tracking-wider">الكورسات المتاحة</span>
            <h3 class="text-2xl font-bold text-neutral-900 mt-1">اختر الكورس المناسب لصفك الدراسي</h3>
          </div>
          <div class="flex items-center gap-2">
            <UBadge color="neutral" variant="outline" class="text-xs font-medium">كل الكورسات متاحة بجودة HD</UBadge>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="course in courses"
            :key="course.id"
            class="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div v-if="course.popular" class="absolute top-0 end-0 bg-brand-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl shadow-xs">
              الأكثر طلباً
            </div>

            <div class="mb-4">
              <span class="inline-block rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                {{ course.grade }}
              </span>
            </div>

            <h4 class="text-lg font-bold text-neutral-900 leading-snug mb-3">
              {{ course.title }}
            </h4>

            <div class="flex items-center gap-4 text-xs text-neutral-500 mb-6">
              <span class="flex items-center gap-1">
                <UIcon name="i-lucide-play-circle" class="size-4 text-neutral-400" />
                {{ course.lessonsCount }} حصة
              </span>
              <span class="flex items-center gap-1">
                <UIcon name="i-lucide-clock" class="size-4 text-neutral-400" />
                {{ course.hours }}
              </span>
              <span class="flex items-center gap-1 text-amber-600 font-semibold">
                <UIcon name="i-lucide-star" class="size-4 fill-amber-400 text-amber-400" />
                {{ course.rating }}
              </span>
            </div>

            <div class="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <span class="text-xs text-neutral-400 block">السعر</span>
                <span class="text-xl font-bold text-neutral-900">{{ course.price }}</span>
              </div>
              <UButton color="primary" size="sm" icon="i-lucide-arrow-left">
                التحق بالكورس
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Student Features / Guarantee -->
    <section class="border-t border-neutral-200/80 bg-white py-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex items-start gap-4">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <UIcon name="i-lucide-video" class="size-6" />
            </div>
            <div>
              <h5 class="font-bold text-neutral-900 text-base">فيديوهات تفاعلية وبدون تقطيع</h5>
              <p class="text-sm text-neutral-500 mt-1">مشاهدة سريعة ومحمية تدعم كافة الأجهزة والهواتف.</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <UIcon name="i-lucide-check-circle-2" class="size-6" />
            </div>
            <div>
              <h5 class="font-bold text-neutral-900 text-base">واجبات وتصحيح فوري</h5>
              <p class="text-sm text-neutral-500 mt-1">امتحانات إلكترونية دورية مع تقارير أداء ومتابعة مع ولي الأمر.</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <UIcon name="i-lucide-message-circle-question" class="size-6" />
            </div>
            <div>
              <h5 class="font-bold text-neutral-900 text-base">دعم مستمر وإجابة الأسئلة</h5>
              <p class="text-sm text-neutral-500 mt-1">مساعد خاص وطاقم تعليمي للإجابة على جميع استفسارات الطلاب أولاً بأول.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Subdomain Footer -->
    <footer class="border-t border-neutral-200 bg-neutral-100 py-8 text-center text-xs text-neutral-500">
      <div class="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 منصة {{ teacherDisplayName }} — جميع الحقوق محفوظة.</p>
        <p class="flex items-center gap-1.5">
          <span>مشغّل بواسطة</span>
          <a href="/" class="font-bold text-brand-600 hover:underline">منصتك</a>
        </p>
      </div>
    </footer>
  </div>
</template>

