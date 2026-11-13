<script setup lang="ts">
useHead({
  title: 'لوحة التحكم - المعلم'
})

const stats = [
  {
    title: 'إجمالي الأرباح',
    value: '18,450 ر.س',
    change: '+14% مقارنة بالشهر السابق',
    changeType: 'positive',
    icon: 'i-lucide-badge-dollar-sign',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    title: 'إجمالي الطلاب',
    value: '128',
    change: '+12 طالب جديد هذا الشهر',
    changeType: 'positive',
    icon: 'i-lucide-users',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'الدورات المنشورة',
    value: '6',
    change: 'دورة واحدة قيد المراجعة',
    changeType: 'neutral',
    icon: 'i-lucide-book-open',
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    title: 'متوسط التقييم',
    value: '4.9',
    change: 'من أصل 84 تقييم طالب',
    changeType: 'positive',
    icon: 'i-lucide-star',
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  }
]

const topCourses = [
  {
    id: 1,
    title: 'أساسيات الجبر الخطي والمصفوفات',
    studentsCount: 64,
    revenue: '9,600 ر.س',
    rating: '4.9',
    category: 'رياضيات'
  },
  {
    id: 2,
    title: 'حساب التفاضل والتكامل المتقدم',
    studentsCount: 42,
    revenue: '10,500 ر.س',
    rating: '4.8',
    category: 'رياضيات'
  },
  {
    id: 3,
    title: 'فيزياء الميكانيكا الكلاسيكية',
    studentsCount: 22,
    revenue: '4,400 ر.س',
    rating: '5.0',
    category: 'علوم'
  }
]

const recentActivities = [
  {
    id: 1,
    title: 'طالب جديد انضم للدورة',
    description: 'انضمت «سارة علي» إلى دورة أساسيات الجبر الخطي.',
    time: 'منذ 10 دقائق',
    icon: 'i-lucide-user-plus',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50'
  },
  {
    id: 2,
    title: 'عملية شراء مكتملة',
    description: 'تم شراء دورة التفاضل والتكامل بمبلغ 250 ر.س.',
    time: 'منذ 45 دقيقة',
    icon: 'i-lucide-credit-card',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50'
  },
  {
    id: 3,
    title: 'تقييم 5 نجوم جديد',
    description: '«شرح ممتاز ومفهوم جداً، شكراً أستاذ أحمد!»',
    time: 'منذ ساعتين',
    icon: 'i-lucide-star',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50'
  }
]
</script>

<template>
  <div class="flex flex-col min-h-full">
    <div class="h-14 shrink-0" aria-hidden="true" />
    <div class="p-6 md:p-10 flex flex-col gap-8 w-full box-border">
    <!-- Welcome Banner Card -->
    <UCard
      :ui="{ body: 'p-6 sm:p-8 relative overflow-hidden bg-linear-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-2xl shadow-md border-0' }"
    >
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div class="flex flex-col gap-2 max-w-xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold w-fit">
            <UIcon name="i-lucide-sparkles" class="w-3.5 h-3.5" />
            <span>لوحة تحكم الأستاذ أحمد الشناوي</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            أهلاً بك مجدداً، أستاذ أحمد!
          </h1>
          <p class="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
            حققت منصتك زيادة بنسبة 14% في المبيعات هذا الشهر مع انضمام 12 طالباً جديداً.
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <UButton
            to="/teacher-dashboard/courses/new"
            color="neutral"
            variant="solid"
            size="lg"
            icon="i-lucide-plus"
            class="font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl px-5 shadow-sm"
          >
            إنشاء دورة جديدة
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <UCard
        v-for="stat in stats"
        :key="stat.title"
        class="border border-slate-200 shadow-sm rounded-2xl bg-white transition-all hover:shadow-md"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-xs font-bold text-slate-500">{{ stat.title }}</span>
            <span class="text-2xl sm:text-3xl font-extrabold text-slate-900">{{ stat.value }}</span>
            <span
              class="text-xs font-bold mt-1 flex items-center gap-1"
              :class="stat.changeType === 'positive' ? 'text-emerald-600' : 'text-slate-400'"
            >
              <UIcon
                v-if="stat.changeType === 'positive'"
                name="i-lucide-trending-up"
                class="w-3.5 h-3.5"
              />
              {{ stat.change }}
            </span>
          </div>
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            :class="[stat.bg, stat.color]"
          >
            <UIcon :name="stat.icon" class="w-6 h-6" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Main Content Split: Top Courses & Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Top Performing Courses (2 cols) -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              أفضل الدورات أداءً
            </h2>
            <UBadge color="primary" variant="subtle" size="xs" class="font-bold">
              حسب الإيرادات
            </UBadge>
          </div>

          <UButton
            to="/teacher-dashboard/courses"
            variant="ghost"
            color="primary"
            size="sm"
            class="font-bold text-xs sm:text-sm"
          >
            إدارة كل الدورات
          </UButton>
        </div>

        <div class="flex flex-col gap-4">
          <UCard
            v-for="course in topCourses"
            :key="course.id"
            class="border border-slate-200 shadow-sm rounded-2xl bg-white hover:border-blue-200 transition-colors"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-start gap-3.5">
                <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-book-open" class="w-6 h-6" />
                </div>

                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-2">
                    <UBadge color="neutral" variant="subtle" size="xs" class="font-bold">
                      {{ course.category }}
                    </UBadge>
                    <span class="text-xs font-bold text-amber-500 flex items-center gap-1">
                      <UIcon name="i-lucide-star" class="w-3.5 h-3.5 fill-current" />
                      {{ course.rating }}
                    </span>
                  </div>
                  <h3 class="text-base font-bold text-slate-900 leading-snug">
                    {{ course.title }}
                  </h3>
                </div>
              </div>

              <!-- Numbers & Action -->
              <div class="flex items-center gap-6 self-end sm:self-center">
                <div class="flex flex-col text-start sm:text-end">
                  <span class="text-xs text-slate-400 font-medium">الطلاب</span>
                  <span class="text-sm font-bold text-slate-800">{{ course.studentsCount }} طالب</span>
                </div>

                <div class="flex flex-col text-start sm:text-end">
                  <span class="text-xs text-slate-400 font-medium">الأرباح</span>
                  <span class="text-sm font-extrabold text-emerald-600">{{ course.revenue }}</span>
                </div>

                <UButton
                  to="/teacher-dashboard/courses"
                  color="neutral"
                  variant="outline"
                  size="sm"
                  class="font-bold rounded-xl"
                >
                  تفاصيل
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Recent Activities & Shortcuts (1 col) -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            آخر الأنشطة والتنبيهات
          </h2>
          <UButton
            to="/teacher-dashboard/notifications"
            variant="ghost"
            color="primary"
            size="sm"
            class="font-bold text-xs sm:text-sm"
          >
            عرض الكل
          </UButton>
        </div>

        <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white">
          <div class="flex flex-col divide-y divide-slate-100">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="py-4 first:pt-0 last:pb-0 flex items-start gap-3"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                :class="[activity.iconBg, activity.iconColor]"
              >
                <UIcon :name="activity.icon" class="w-5 h-5" />
              </div>

              <div class="flex-1 flex flex-col gap-0.5 min-w-0">
                <h4 class="text-xs font-bold text-slate-900 leading-snug">
                  {{ activity.title }}
                </h4>
                <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {{ activity.description }}
                </p>
                <span class="text-[10px] text-slate-400 mt-1">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Quick Payout Balance Banner -->
        <UCard class="border border-emerald-200 bg-emerald-50/50 shadow-sm rounded-2xl p-0">
          <div class="p-4 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-wallet" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-emerald-900">الرصيد المتاح للسحب</span>
                <span class="text-lg font-extrabold text-emerald-700">3,850 ر.س</span>
              </div>
            </div>

            <UButton
              to="/teacher-dashboard/payouts/withdraw"
              color="primary"
              variant="solid"
              size="sm"
              class="font-bold rounded-xl"
            >
              سحب
            </UButton>
          </div>
        </UCard>
      </div>
    </div>
    </div>
  </div>
</template>