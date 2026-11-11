<script setup lang="ts">
useHead({
  title: 'الرئيسية - لوحة الطالب'
})

const stats = [
  {
    label: 'الدورات المسجلة',
    value: '3',
    icon: 'i-lucide-book-open',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    label: 'الدروس المكتملة',
    value: '24',
    icon: 'i-lucide-check-circle',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  {
    label: 'ساعات التعلّم',
    value: '18',
    icon: 'i-lucide-clock',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  },
  {
    label: 'الشهادات',
    value: '1',
    icon: 'i-lucide-award',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
]

const currentCourse = {
  title: 'أساسيات الجبر',
  lesson: 'الدرس 8 من 12 · حل المعادلات من الدرجة الأولى',
  progress: 65
}

const myCourses = [
  {
    id: 1,
    title: 'أساسيات الجبر',
    instructor: 'الأستاذ أحمد محمد',
    progress: 65,
    isCompleted: false,
    icon: 'i-lucide-function-square',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 2,
    title: 'دورة مكثفة في الهندسة',
    instructor: 'الأستاذ أحمد محمد',
    progress: 30,
    isCompleted: false,
    icon: 'i-lucide-shapes',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  },
  {
    id: 3,
    title: 'اللغة الإنجليزية: القواعد',
    instructor: 'الأستاذ أحمد محمد',
    progress: 100,
    isCompleted: true,
    icon: 'i-lucide-languages',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  }
]

const upcomingTasks = [
  {
    id: 1,
    title: 'واجب: المعادلات الخطية',
    due: 'يُسلَّم غداً',
    icon: 'i-lucide-clipboard-list',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  },
  {
    id: 2,
    title: 'اختبار الهندسة',
    due: 'الخميس القادم',
    icon: 'i-lucide-check-circle-2',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 3,
    title: 'جلسة مباشرة مع الأستاذ أحمد',
    due: 'السبت · 8 مساءً',
    icon: 'i-lucide-video',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  }
]

const suggestedCourses = [
  {
    id: 1,
    title: 'التفاضل والتكامل',
    instructor: 'الأستاذ أحمد محمد',
    price: '400 ج.م',
    icon: 'i-lucide-calculator',
    color: 'text-amber-600',
    headerBg: 'bg-gradient-to-br from-amber-100 to-amber-200'
  },
  {
    id: 2,
    title: 'الإحصاء والاحتمالات',
    instructor: 'الأستاذ أحمد محمد',
    price: '350 ج.م',
    icon: 'i-lucide-bar-chart-3',
    color: 'text-blue-600',
    headerBg: 'bg-gradient-to-br from-blue-100 to-blue-200'
  }
]
</script>

<template>
  <div class="flex flex-col gap-8 p-6 md:p-10 box-border w-full">
    <!-- Page Header -->
    <div class="flex flex-col gap-1.5">
      <h1 class="m-0 text-3xl font-extrabold text-slate-900 leading-tight">
        أهلاً بعودتك، سارة
      </h1>
      <span class="text-sm md:text-base text-slate-500">
        واصل رحلتك التعليمية من حيث توقفت.
      </span>
    </div>

    <!-- Continue Learning Hero Card -->
    <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 min-w-0">
          <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-book-open" class="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
          </div>
          <div class="flex-1 flex flex-col gap-2 min-w-0">
            <UBadge color="primary" variant="subtle" size="sm" class="w-fit font-bold">
              تابع التعلّم
            </UBadge>
            <h2 class="m-0 text-xl sm:text-2xl font-extrabold text-slate-900 truncate">
              {{ currentCourse.title }}
            </h2>
            <span class="text-sm text-slate-500">
              {{ currentCourse.lesson }}
            </span>
            <div class="flex items-center gap-3 pt-1 max-w-md">
              <div class="flex-1">
                <UProgress :model-value="currentCourse.progress" color="primary" size="md" />
              </div>
              <span class="text-sm font-bold text-slate-700 font-mono">{{ currentCourse.progress }}%</span>
            </div>
          </div>
        </div>
        <div class="shrink-0 w-full lg:w-auto">
          <UButton
            to="/student-dashboard/courses"
            color="primary"
            size="xl"
            icon="i-lucide-play"
            class="w-full lg:w-auto justify-center font-bold px-6 py-3 rounded-xl cursor-pointer shadow-sm hover:shadow transition-all"
          >
            متابعة الدرس
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-2xl border border-slate-200 shadow-xs bg-white"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-xs sm:text-sm text-slate-500 font-medium">{{ stat.label }}</span>
            <span class="text-2xl sm:text-3xl font-extrabold text-slate-900">{{ stat.value }}</span>
          </div>
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            :class="[stat.bgColor, stat.color]"
          >
            <UIcon :name="stat.icon" class="w-6 h-6 shrink-0" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Content Columns (My Courses & Upcoming Tasks) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- My Courses (2 cols on lg) -->
      <UCard class="lg:col-span-2 rounded-2xl border border-slate-200 shadow-xs bg-white flex flex-col">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-book-marked" class="w-5 h-5 text-blue-600 shrink-0" />
              <h2 class="m-0 text-lg sm:text-xl font-bold text-slate-900">دوراتي</h2>
            </div>
            <UButton
              to="/student-dashboard/courses"
              variant="ghost"
              color="primary"
              size="sm"
              trailing-icon="i-lucide-arrow-left"
              class="font-bold cursor-pointer"
            >
              عرض الكل
            </UButton>
          </div>
        </template>

        <div class="divide-y divide-slate-100">
          <div
            v-for="course in myCourses"
            :key="course.id"
            class="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div class="flex items-center gap-3.5 flex-1 min-w-0">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                :class="[course.bgColor, course.color]"
              >
                <UIcon :name="course.icon" class="w-6 h-6 shrink-0" />
              </div>
              <div class="flex flex-col gap-1 flex-1 min-w-0">
                <span class="text-sm sm:text-base font-bold text-slate-900 truncate">{{ course.title }}</span>
                <span class="text-xs text-slate-500">{{ course.instructor }}</span>
                <div class="flex items-center gap-3 pt-1 max-w-xs">
                  <div class="flex-1">
                    <UProgress
                      :model-value="course.progress"
                      :color="course.isCompleted ? 'success' : 'primary'"
                      size="xs"
                    />
                  </div>
                  <span
                    v-if="course.isCompleted"
                    class="text-xs font-bold text-emerald-600"
                  >
                    مكتملة
                  </span>
                  <span
                    v-else
                    class="text-xs font-bold text-slate-600 font-mono"
                  >
                    {{ course.progress }}%
                  </span>
                </div>
              </div>
            </div>

            <div class="shrink-0 flex items-center sm:self-center self-end">
              <UButton
                v-if="course.isCompleted"
                to="/student-dashboard/certificates"
                variant="subtle"
                color="success"
                size="sm"
                icon="i-lucide-award"
                class="font-bold cursor-pointer rounded-xl"
              >
                الشهادة
              </UButton>
              <UButton
                v-else
                to="/student-dashboard/courses"
                variant="outline"
                color="primary"
                size="sm"
                icon="i-lucide-play"
                class="font-bold cursor-pointer rounded-xl"
              >
                متابعة
              </UButton>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Upcoming Tasks (1 col on lg) -->
      <UCard class="rounded-2xl border border-slate-200 shadow-xs bg-white flex flex-col">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-calendar" class="w-5 h-5 text-blue-600 shrink-0" />
              <h2 class="m-0 text-lg sm:text-xl font-bold text-slate-900">المهام القادمة</h2>
            </div>
            <UBadge color="neutral" variant="subtle" size="xs" class="font-bold">
              {{ upcomingTasks.length }} مهام
            </UBadge>
          </div>
        </template>

        <div class="divide-y divide-slate-100">
          <div
            v-for="task in upcomingTasks"
            :key="task.id"
            class="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3"
          >
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              :class="[task.bgColor, task.color]"
            >
              <UIcon :name="task.icon" class="w-5 h-5 shrink-0" />
            </div>
            <div class="flex flex-col gap-0.5 min-w-0 flex-1">
              <span class="text-sm font-bold text-slate-900 truncate">{{ task.title }}</span>
              <span class="text-xs text-slate-500">{{ task.due }}</span>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Suggested Courses -->
    <UCard class="rounded-2xl border border-slate-200 shadow-xs bg-white">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-amber-500 shrink-0" />
            <h2 class="m-0 text-lg sm:text-xl font-bold text-slate-900">دورات مقترحة لك</h2>
          </div>
          <UButton
            to="/student-dashboard/courses"
            variant="ghost"
            color="primary"
            size="sm"
            trailing-icon="i-lucide-arrow-left"
            class="font-bold cursor-pointer"
          >
            تصفّح كل الدورات
          </UButton>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="course in suggestedCourses"
          :key="course.id"
          class="border border-slate-200 rounded-2xl overflow-hidden flex flex-col bg-slate-50/50 hover:border-slate-300 transition-colors"
        >
          <div
            class="h-24 flex items-center justify-center"
            :class="course.headerBg"
          >
            <UIcon :name="course.icon" class="w-10 h-10 opacity-70" :class="course.color" />
          </div>
          <div class="p-4 sm:p-5 flex flex-col gap-3 flex-1 justify-between bg-white">
            <div class="flex flex-col gap-1">
              <span class="text-base font-bold text-slate-900">{{ course.title }}</span>
              <span class="text-xs text-slate-500">{{ course.instructor }}</span>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-slate-100">
              <span class="text-base font-extrabold text-slate-900">{{ course.price }}</span>
              <UButton
                color="primary"
                size="sm"
                icon="i-lucide-plus"
                class="font-bold rounded-xl cursor-pointer"
              >
                سجّل الآن
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
