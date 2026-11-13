<script setup lang="ts">
useHead({
  title: 'الواجبات والاختبارات - لوحة الطالب'
})

interface AssignmentItem {
  id: number
  title: string
  course: string
  timing: string
  type: 'assignment' | 'exam'
  typeLabel: string
  status: 'in_progress' | 'not_started' | 'awaiting_grading' | 'graded'
  statusLabel: string
  statusColor: 'warning' | 'info' | 'primary' | 'success' | 'neutral'
  grade?: string
  actionLabel: string
  actionVariant: 'solid' | 'outline'
  actionColor: 'primary' | 'neutral'
  category: 'upcoming' | 'submitted' | 'graded'
  icon: string
}

const assignments = ref<AssignmentItem[]>([
  {
    id: 1,
    title: 'المعادلات الخطية',
    course: 'أساسيات الجبر',
    timing: 'يُسلَّم غداً',
    type: 'assignment',
    typeLabel: 'واجب',
    status: 'in_progress',
    statusLabel: 'قيد التسليم',
    statusColor: 'warning',
    actionLabel: 'ابدأ التسليم',
    actionVariant: 'solid',
    actionColor: 'primary',
    category: 'upcoming',
    icon: 'i-lucide-file-text'
  },
  {
    id: 2,
    title: 'اختبار الهندسة',
    course: 'دورة الهندسة',
    timing: 'الخميس القادم',
    type: 'exam',
    typeLabel: 'اختبار',
    status: 'not_started',
    statusLabel: 'لم يبدأ',
    statusColor: 'primary',
    actionLabel: 'عرض التفاصيل',
    actionVariant: 'outline',
    actionColor: 'neutral',
    category: 'upcoming',
    icon: 'i-lucide-help-circle'
  },
  {
    id: 3,
    title: 'مسائل الكسور',
    course: 'أساسيات الجبر',
    timing: 'سُلِّم أمس',
    type: 'assignment',
    typeLabel: 'واجب',
    status: 'awaiting_grading',
    statusLabel: 'بانتظار التصحيح',
    statusColor: 'info',
    actionLabel: 'عرض',
    actionVariant: 'outline',
    actionColor: 'neutral',
    category: 'submitted',
    icon: 'i-lucide-file-text'
  },
  {
    id: 4,
    title: 'حل المعادلات',
    course: 'أساسيات الجبر',
    timing: 'مصحَّح',
    type: 'assignment',
    typeLabel: 'واجب',
    status: 'graded',
    statusLabel: '18 من 20',
    statusColor: 'success',
    grade: '18 من 20',
    actionLabel: 'عرض الملاحظات',
    actionVariant: 'outline',
    actionColor: 'neutral',
    category: 'graded',
    icon: 'i-lucide-check-circle-2'
  },
  {
    id: 5,
    title: 'اختبار القواعد',
    course: 'اللغة الإنجليزية',
    timing: 'مصحَّح',
    type: 'exam',
    typeLabel: 'اختبار',
    status: 'graded',
    statusLabel: '92%',
    statusColor: 'success',
    grade: '92%',
    actionLabel: 'عرض النتيجة',
    actionVariant: 'outline',
    actionColor: 'neutral',
    category: 'graded',
    icon: 'i-lucide-award'
  }
])

const selectedFilter = ref<'all' | 'upcoming' | 'submitted' | 'graded'>('all')
const searchQuery = ref('')

const filterOptions = computed(() => [
  { id: 'all', label: 'الكل', count: assignments.value.length },
  { id: 'upcoming', label: 'قادمة', count: assignments.value.filter(a => a.category === 'upcoming').length },
  { id: 'submitted', label: 'مُسلَّمة', count: assignments.value.filter(a => a.category === 'submitted').length },
  { id: 'graded', label: 'مصحَّحة', count: assignments.value.filter(a => a.category === 'graded').length }
])

const filteredAssignments = computed(() => {
  return assignments.value.filter(item => {
    const matchesFilter = selectedFilter.value === 'all' || item.category === selectedFilter.value
    const matchesSearch = !searchQuery.value.trim() ||
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
})
</script>

<template>
  <div class="flex flex-col gap-6 p-6 md:p-10 w-full box-border">
    <!-- Page Header -->
    <div class="flex flex-col gap-1.5">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        الواجبات والاختبارات
      </h1>
      <p class="text-sm sm:text-base text-slate-500">
        تابع مهامك ومواعيد التسليم ونتائجك.
      </p>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

      <div class="w-full sm:w-64">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="ابحث في الواجبات..."
          size="sm"
          class="w-full"
        />
      </div>
    </div>

    <!-- Assignments List Card -->
    <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden p-0">
      <div v-if="filteredAssignments.length > 0" class="divide-y divide-slate-100">
        <div
          v-for="item in filteredAssignments"
          :key="item.id"
          class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/75 transition-colors duration-150"
        >
          <!-- Start Side: Type Icon + Title + Course Meta -->
          <div class="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div
              class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0"
              :class="item.type === 'assignment' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-600'"
            >
              <UIcon :name="item.icon" class="w-5 h-5 shrink-0" />
            </div>

            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-base font-bold text-slate-900 leading-snug">
                  {{ item.title }}
                </h3>
                <UBadge
                  :color="item.type === 'assignment' ? 'warning' : 'primary'"
                  variant="subtle"
                  size="xs"
                  class="font-bold shrink-0"
                >
                  {{ item.typeLabel }}
                </UBadge>
              </div>
              <p class="text-xs sm:text-sm text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>{{ item.course }}</span>
                <span class="text-slate-300">·</span>
                <span class="flex items-center gap-1">
                  <UIcon name="i-lucide-calendar" class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {{ item.timing }}
                </span>
              </p>
            </div>
          </div>

          <!-- End Side: Status Badge + Action Button -->
          <div class="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <UBadge
              :color="item.statusColor"
              variant="subtle"
              size="sm"
              class="font-bold px-2.5 py-1"
            >
              <UIcon
                v-if="item.status === 'graded'"
                name="i-lucide-check-circle"
                class="w-3.5 h-3.5 me-1 text-emerald-600 shrink-0"
              />
              <UIcon
                v-else-if="item.status === 'in_progress'"
                name="i-lucide-clock"
                class="w-3.5 h-3.5 me-1 text-amber-600 shrink-0"
              />
              {{ item.statusLabel }}
            </UBadge>

            <UButton
              :variant="item.actionVariant"
              :color="item.actionColor"
              size="sm"
              class="font-bold rounded-xl px-4 cursor-pointer"
            >
              {{ item.actionLabel }}
              <UIcon
                v-if="item.actionVariant === 'solid'"
                name="i-lucide-arrow-left"
                class="w-4 h-4 ms-1 shrink-0"
              />
            </UButton>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="py-12 px-4 flex flex-col items-center justify-center text-center">
        <div class="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
          <UIcon name="i-lucide-clipboard-x" class="w-7 h-7 shrink-0" />
        </div>
        <p class="text-base font-bold text-slate-700">لا توجد واجبات أو اختبارات</p>
        <p class="text-sm text-slate-500 mt-1 max-w-sm">لم يتم العثور على أي عناصر مطابقة للتصفية الحالية.</p>
        <UButton
          v-if="selectedFilter !== 'all' || searchQuery"
          variant="outline"
          color="neutral"
          size="sm"
          class="mt-4 rounded-xl font-bold cursor-pointer"
          @click="selectedFilter = 'all'; searchQuery = ''"
        >
          إعادة تعيين التصفية
        </UButton>
      </div>
    </UCard>
  </div>
</template>
