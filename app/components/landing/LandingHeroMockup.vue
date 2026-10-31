<script setup lang="ts">
interface CourseMock {
  title: string
  lessons: string
  students: string
  icon: string
  cover: string
  badge?: string
  progress: number
}

const courses: CourseMock[] = [
  {
    title: 'أساسيات الجبر',
    lessons: '18 درسًا',
    students: '240 طالبًا',
    icon: 'i-lucide-sigma',
    cover: 'from-brand-500 to-brand-700',
    badge: 'الأكثر رواجًا',
    progress: 75
  },
  {
    title: 'الهندسة خطوة بخطوة',
    lessons: '12 درسًا',
    students: '156 طالبًا',
    icon: 'i-lucide-shapes',
    cover: 'from-brand-400 to-brand-500',
    progress: 52
  },
  {
    title: 'مراجعة التفاضل النهائية',
    lessons: '22 درسًا',
    students: '480 طالبًا',
    icon: 'i-lucide-square-function',
    cover: 'from-brand-800 to-brand-700',
    progress: 40
  }
]
</script>

<template>
  <figure class="relative mx-auto max-w-3xl">
    <!-- Ambient glow behind the browser frame -->
    <div
      aria-hidden="true"
      class="absolute -inset-x-6 -top-6 bottom-10 rounded-[2.5rem] bg-gradient-to-b from-brand-200/60 via-brand-100/40 to-transparent blur-2xl"
    />

    <!-- Browser frame -->
    <div
      role="img"
      aria-label="معاينة لمنصة تعليمية خاصة بالمعلم أحمد على الرابط ahmed.yourplatform.com، تعرض الكورسات وجميع الدروس وعدد الطلاب"
      class="animate-hero-in relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-brand-950/10 ring-1 ring-neutral-200/90 [animation-delay:180ms]"
    >
      <!-- Browser bar -->
      <div dir="ltr" class="flex h-11 items-center gap-2 border-b border-neutral-200/80 bg-neutral-50/80 px-4">
        <div class="flex items-center gap-1.5">
          <span class="size-2.5 rounded-full bg-rose-400" />
          <span class="size-2.5 rounded-full bg-amber-400" />
          <span class="size-2.5 rounded-full bg-emerald-400" />
        </div>

        <div
          class="mx-auto flex h-6.5 items-center gap-1.5 rounded-md bg-white px-3 text-[11px] font-medium text-neutral-600 ring-1 ring-neutral-200"
        >
          <UIcon name="i-lucide-lock" class="size-3 shrink-0 text-emerald-500" />
          <span dir="ltr">ahmed.yourplatform.com</span>
          <UIcon name="i-lucide-shield-check" class="size-3 shrink-0 text-neutral-300" />
        </div>

        <span class="grid size-5 place-items-center rounded-full bg-gradient-to-b from-brand-500 to-brand-700 text-[8px] font-bold text-white">
          أ
        </span>
      </div>

      <!-- Platform top bar (teacher branding) -->
      <div class="flex h-14 items-center gap-3 border-b border-neutral-100 bg-white px-4 sm:px-5">
        <div class="flex min-w-0 items-center gap-2.5">
          <span
            class="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-b from-brand-500 to-brand-700 text-sm font-bold text-white shadow-sm"
          >
            أ
          </span>
          <div class="min-w-0">
            <p class="truncate text-[13px] font-bold text-neutral-900">أكاديمية أ. أحمد السعيد</p>
            <p class="truncate text-[10px] text-neutral-400">الرياضيات · الصف الثالث الثانوي</p>
          </div>
        </div>

        <nav class="mx-auto hidden items-center gap-1 sm:flex" aria-label="قائمة المنصة">
          <span class="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">الكورسات</span>
          <span class="px-3 py-1.5 text-xs text-neutral-400">الجدول</span>
          <span class="px-3 py-1.5 text-xs text-neutral-400">تقدمي</span>
          <span class="px-3 py-1.5 text-xs text-neutral-400">عن المعلم</span>
        </nav>

        <span class="ms-auto inline-flex h-8 items-center rounded-lg bg-neutral-900 px-3 text-[11px] font-bold text-white sm:ms-0">
          تسجيل
        </span>
      </div>

      <!-- Platform body -->
      <div class="space-y-3.5 bg-neutral-50 px-3.5 py-4 sm:px-5 sm:py-5">
        <!-- Banner -->
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-l from-brand-700 via-brand-600 to-brand-500 px-4 py-4 text-white sm:px-5">
          <div aria-hidden="true" class="bg-grid-light absolute inset-0" />
          <div aria-hidden="true" class="absolute -top-16 -start-12 size-40 rounded-full bg-white/10 blur-xl" />
          <div aria-hidden="true" class="absolute -bottom-20 end-10 size-32 rounded-full bg-white/10 blur-xl" />

          <div class="relative flex items-center gap-4">
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-semibold text-white/70">مرحبًا بك</p>
              <p class="mt-0.5 truncate text-sm font-bold sm:text-[15px]">
                ابدأ من درس اليوم — «مقدمة في التفاضل»
              </p>
              <p class="mt-1.5 text-[10.5px] text-white/70">3 كورسات و73 درسًا متاحة الآن</p>
            </div>
            <span
              class="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[11px] font-bold text-brand-700 shadow-sm"
            >
              <UIcon name="i-lucide-play" class="size-3.5" />
              ابدأ التعلم
            </span>
          </div>
        </div>

        <!-- Course cards -->
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <article
            v-for="(course, i) in courses"
            :key="course.title"
            class="flex-col rounded-xl bg-white p-2 ring-1 ring-neutral-200/90 sm:p-2.5"
            :class="i === courses.length - 1 ? 'hidden sm:flex' : 'flex'"
          >
            <div
              :class="course.cover"
              class="relative grid h-16 place-items-center rounded-lg bg-gradient-to-br sm:h-[4.33rem]"
            >
              <span aria-hidden="true" class="absolute inset-x-3 bottom-2 h-px bg-white/25" />
              <UIcon :name="course.icon" class="size-7 text-white/90" />
              <span
                v-if="course.badge"
                class="absolute start-1.5 top-1.5 rounded-md bg-brand-950/35 px-1.5 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm"
              >
                {{ course.badge }}
              </span>
            </div>

            <div class="flex flex-1 flex-col px-1 pb-0.5 pt-2.5">
              <p class="truncate text-[12px] font-bold text-neutral-800" :title="course.title">
                {{ course.title }}
              </p>
              <p class="mt-1 flex items-center gap-1 text-[10px] text-neutral-400">
                <UIcon name="i-lucide-book-open" class="size-3 shrink-0" />
                {{ course.lessons }}
                <span aria-hidden="true">·</span>
                <UIcon name="i-lucide-users" class="size-3 shrink-0" />
                {{ course.students }}
              </p>

              <div class="mt-auto pt-2.5">
                <div class="h-1 overflow-hidden rounded-full bg-neutral-100">
                  <div class="h-full rounded-full bg-brand-500" :style="{ width: `${course.progress}%` }" />
                </div>
                <div class="mt-1 flex items-center justify-between text-[9px] leading-3 text-neutral-400">
                  <span>تقدمك</span>
                  <span class="font-semibold text-neutral-600">{{ course.progress }}%</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Mini stats -->
        <div class="grid grid-cols-2 gap-3">
          <div class="flex items-center gap-3 rounded-xl bg-white px-3.5 py-3 ring-1 ring-neutral-200/90">
            <span class="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
              <UIcon name="i-lucide-users" class="size-4.5" />
            </span>
            <div class="min-w-0">
              <p class="text-[10px] text-neutral-400">طلابك</p>
              <p class="truncate text-[13px] font-extrabold text-neutral-900">
                876 <span class="text-[10px] font-semibold text-neutral-400">طالبًا نشطًا</span>
              </p>
            </div>
            <span class="ms-auto inline-flex shrink-0 items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9.5px] font-bold text-emerald-600">
              <UIcon name="i-lucide-trending-up" class="size-3" />
              +18%
            </span>
          </div>

          <div class="flex items-center gap-3 rounded-xl bg-white px-3.5 py-3 ring-1 ring-neutral-200/90">
            <span class="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
              <UIcon name="i-lucide-banknote" class="size-4.5" />
            </span>
            <div class="min-w-0">
              <p class="text-[10px] text-neutral-400">مدفوعاتك</p>
              <p class="truncate text-[13px] font-extrabold text-neutral-900">
                1,850 <span class="text-[10px] font-semibold text-neutral-400">ر.س هذا الأسبوع</span>
              </p>
            </div>
            <span class="ms-auto inline-flex shrink-0 items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9.5px] font-bold text-emerald-600">
              <UIcon name="i-lucide-trending-up" class="size-3" />
              +32%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating notifications -->
    <div aria-hidden="true" class="absolute top-20 z-10 hidden -left-4 md:block xl:-left-10">
      <div class="animate-float flex items-center gap-3 rounded-xl bg-white px-3.5 py-3 shadow-xl shadow-brand-950/10 ring-1 ring-neutral-200">
        <span class="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
          <UIcon name="i-lucide-banknote" class="size-5" />
        </span>
        <div>
          <p class="text-[11px] font-bold text-neutral-800">دفع مقبول</p>
          <p class="text-[10px] text-neutral-400">اشتراك جديد في «أساسيات الجبر»</p>
        </div>
      </div>
    </div>

    <div aria-hidden="true" class="absolute bottom-16 z-10 hidden -right-5 md:block xl:-right-12">
      <div class="animate-float-slow flex items-center gap-3 rounded-xl bg-white px-3.5 py-3 shadow-xl shadow-brand-950/10 ring-1 ring-neutral-200">
        <span class="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
          <UIcon name="i-lucide-user-plus" class="size-5" />
        </span>
        <div>
          <p class="text-[11px] font-bold text-neutral-800">طلابك ينمون</p>
          <p class="text-[10px] text-neutral-400">+120 طالبًا هذا الشهر</p>
        </div>
      </div>
    </div>

    <!-- Supporting message -->
    <figcaption class="mt-7 flex items-center justify-center gap-2 text-center text-[13px] text-neutral-500">
      <UIcon name="i-lucide-globe" class="size-4 shrink-0 text-brand-600" />
      <span>
        منصة كاملة باسمك —
        <span class="font-semibold text-neutral-700">بدون الحاجة لبرمجة موقع من الصفر.</span>
      </span>
    </figcaption>
  </figure>
</template>
