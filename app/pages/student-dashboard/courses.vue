<script setup lang="ts">
useHead({
  title: 'دوراتي - لوحة الطالب'
})

interface CourseItem {
  id: number
  title: string
  instructor: string
  completedLessons: number
  totalLessons: number
  progress: number
  status: 'in_progress' | 'completed'
  statusLabel: string
  icon: string
  bannerBg: string
  bannerColor: string
  badgeColor: 'primary' | 'success' | 'warning' | 'neutral'
  actionLabel: string
  actionTo: string
  actionIcon: string
  actionVariant: 'solid' | 'outline'
  actionColor: 'primary' | 'neutral'
}

const courses = ref<CourseItem[]>([
  {
    id: 1,
    title: 'أساسيات الجبر',
    instructor: 'الأستاذ أحمد محمد',
    completedLessons: 8,
    totalLessons: 12,
    progress: 65,
    status: 'in_progress',
    statusLabel: 'قيد التعلّم',
    icon: 'i-lucide-calculator',
    bannerBg: 'bg-linear-to-br from-blue-50 to-indigo-100 text-blue-600',
    bannerColor: 'text-blue-600',
    badgeColor: 'primary',
    actionLabel: 'متابعة التعلّم',
    actionTo: '#',
    actionIcon: 'i-lucide-play',
    actionVariant: 'solid',
    actionColor: 'primary'
  },
  {
    id: 2,
    title: 'دورة مكثفة في الهندسة',
    instructor: 'الأستاذ أحمد محمد',
    completedLessons: 6,
    totalLessons: 20,
    progress: 30,
    status: 'in_progress',
    statusLabel: 'قيد التعلّم',
    icon: 'i-lucide-shapes',
    bannerBg: 'bg-linear-to-br from-amber-50 to-orange-100 text-amber-600',
    bannerColor: 'text-amber-600',
    badgeColor: 'warning',
    actionLabel: 'متابعة التعلّم',
    actionTo: '#',
    actionIcon: 'i-lucide-play',
    actionVariant: 'solid',
    actionColor: 'primary'
  },
  {
    id: 3,
    title: 'اللغة الإنجليزية: القواعد',
    instructor: 'الأستاذ أحمد محمد',
    completedLessons: 15,
    totalLessons: 15,
    progress: 100,
    status: 'completed',
    statusLabel: 'مكتملة',
    icon: 'i-lucide-languages',
    bannerBg: 'bg-linear-to-br from-emerald-50 to-teal-100 text-emerald-600',
    bannerColor: 'text-emerald-600',
    badgeColor: 'success',
    actionLabel: 'عرض الشهادة',
    actionTo: '/student-dashboard/certificates',
    actionIcon: 'i-lucide-award',
    actionVariant: 'outline',
    actionColor: 'neutral'
  }
])

const selectedFilter = ref<'all' | 'in_progress' | 'completed'>('all')
const searchQuery = ref('')

const filterOptions = computed(() => [
  { id: 'all', label: 'الكل', count: courses.value.length },
  { id: 'in_progress', label: 'قيد التعلّم', count: courses.value.filter(c => c.status === 'in_progress').length },
  { id: 'completed', label: 'مكتملة', count: courses.value.filter(c => c.status === 'completed').length }
])

const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchesFilter = selectedFilter.value === 'all' || course.status === selectedFilter.value
    const matchesSearch = !searchQuery.value.trim() ||
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
})
</script>

<template>
  <div class="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full box-border">
    <!-- Page Header -->
    <div class="flex flex-col gap-1.5">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        دوراتي
      </h1>
      <p class="text-sm sm:text-base text-slate-500">
        كل الدورات التي سجّلت فيها في مكان واحد.
      </p>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <!-- Filter Tabs -->
      <div class="flex flex-wrap items-center gap-2">
        <UButton
          v-for="filter in filterOptions"
          :key="filter.id"
          :variant="selectedFilter === filter.id ? 'solid' : 'ghost'"
          :color="selectedFilter === filter.id ? 'primary' : 'neutral'"
          size="sm"
          class="font-bold rounded-xl cursor-pointer transition-all duration-150"
          @click="selectedFilter = filter.id as any"
        >
          {{ filter.label }}
          <UBadge
            :color="selectedFilter === filter.id ? 'neutral' : 'neutral'"
            :variant="selectedFilter === filter.id ? 'solid' : 'subtle'"
            size="xs"
            class="ms-1.5 rounded-full px-1.5"
          >
            {{ filter.count }}
          </UBadge>
        </UButton>
      </div>

      <!-- Search Input -->
      <div class="w-full sm:w-64">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="ابحث في الدورات..."
          size="sm"
          class="w-full"
        />
      </div>
    </div>

    <!-- Course Cards Grid -->
    <div
      v-if="filteredCourses.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <UCard
        v-for="course in filteredCourses"
        :key="course.id"
        class="rounded-2xl border border-slate-200 shadow-xs bg-white overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-md transition-all duration-200 p-0"
      >
        <!-- Course Header Thumbnail / Banner -->
        <div
          class="h-32 sm:h-36 relative flex items-center justify-center shrink-0 border-b border-slate-100"
          :class="course.bannerBg"
        >
          <UIcon :name="course.icon" class="w-12 h-12" />

          <!-- Status Badge in corner -->
          <div class="absolute top-3 end-3">
            <UBadge
              :color="course.badgeColor"
              variant="subtle"
              size="xs"
              class="font-bold px-2 py-0.5 rounded-lg shadow-xs"
            >
              {{ course.statusLabel }}
            </UBadge>
          </div>
        </div>

        <!-- Course Details Body -->
        <div class="p-5 flex flex-col flex-1 justify-between gap-5">
          <div class="flex flex-col gap-1.5">
            <h3 class="text-lg font-extrabold text-slate-900 leading-snug line-clamp-1">
              {{ course.title }}
            </h3>
            <span class="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 font-medium">
              <UIcon name="i-lucide-user" class="w-4 h-4 text-slate-400 shrink-0" />
              {{ course.instructor }}
            </span>
          </div>

          <!-- Progress Info -->
          <div class="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <div class="flex items-center justify-between text-xs sm:text-sm">
              <span class="text-slate-500 font-medium">
                {{ course.completedLessons }} من {{ course.totalLessons }} درساً
              </span>
              <span class="font-extrabold text-slate-900 font-mono">
                {{ course.progress }}%
              </span>
            </div>

            <UProgress
              :model-value="course.progress"
              :color="course.status === 'completed' ? 'success' : 'primary'"
              size="sm"
            />
          </div>

          <!-- Action Button -->
          <div class="pt-1">
            <UButton
              :to="course.actionTo"
              :variant="course.actionVariant"
              :color="course.actionColor"
              :icon="course.actionIcon"
              block
              size="md"
              class="justify-center font-bold rounded-xl cursor-pointer shadow-xs"
            >
              {{ course.actionLabel }}
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <UCard
      v-else
      class="rounded-2xl border border-slate-200 shadow-xs bg-white p-8 sm:p-12 text-center"
    >
      <div class="flex flex-col items-center justify-center">
        <div class="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
          <UIcon name="i-lucide-book-x" class="w-7 h-7 shrink-0" />
        </div>
        <p class="text-base font-bold text-slate-700">لا توجد دورات مطابقة</p>
        <p class="text-sm text-slate-500 mt-1 max-w-sm">
          لم نتمكن من العثور على أي دورات تطابق معايير البحث أو التصفية المحددة.
        </p>
        <UButton
          v-if="selectedFilter !== 'all' || searchQuery"
          variant="outline"
          color="neutral"
          size="sm"
          class="mt-4 rounded-xl font-bold cursor-pointer"
          @click="selectedFilter = 'all'; searchQuery = ''"
        >
          إعادة ضبط التصفية
        </UButton>
      </div>
    </UCard>
  </div>
</template>