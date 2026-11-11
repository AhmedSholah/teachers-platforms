<script setup lang="ts">
useHead({
  title: 'دوراتي - لوحة تحكم المعلم'
})

const toast = useToast()

const {
  classrooms,
  courses,
  deleteCourse
} = useClassrooms()

// Filters state
const searchQuery = ref('')
const selectedClassroom = ref<string>('all')
const selectedStatus = ref<'all' | 'published' | 'draft'>('all')
const sortBy = ref<'newest' | 'revenue' | 'students' | 'alphabetical'>('newest')

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(5)

// Selection state for bulk operations
const selectedIds = ref<number[]>([])

// Notification banner message (if toast or inline)
const bannerMessage = ref('')

// Classroom options for USelect
const classroomFilterItems = computed(() => {
  const base = [{ label: 'كافة الفصول الدراسية', value: 'all' }]
  const list = classrooms.value.map(c => ({
    label: c.name,
    value: c.name
  }))
  return [...base, ...list, { label: 'بدون فصل دراسي', value: 'بدون فصل دراسي' }]
})

// Status options for USelect
const statusFilterItems = [
  { label: 'كافة الحالات', value: 'all' },
  { label: 'المنشورة فقط', value: 'published' },
  { label: 'المسودات فقط', value: 'draft' }
]

// Sort options for USelect
const sortItems = [
  { label: 'الأحدث أولاً', value: 'newest' },
  { label: 'الأعلى إيراداً', value: 'revenue' },
  { label: 'الأكثر طلاباً', value: 'students' },
  { label: 'الترتيب الأبجدي', value: 'alphabetical' }
]

// Items per page options for USelect
const perPageItems = [
  { label: '5 دورات بالصفحة', value: 5 },
  { label: '10 دورات بالصفحة', value: 10 },
  { label: '20 دورة بالصفحة', value: 20 }
]

// Summary KPIs
const totalStudents = computed(() => {
  return courses.value.reduce((acc, c) => acc + (c.studentsCount || 0), 0)
})

const totalRevenue = computed(() => {
  return courses.value.reduce((acc, c) => acc + (c.revenueNumeric || 0), 0)
})

const publishedCount = computed(() => {
  return courses.value.filter(c => c.status === 'published').length
})

const averageCompletionRate = computed(() => {
  const publishedCourses = courses.value.filter(c => c.status === 'published' && c.completionRate)
  if (!publishedCourses.length) return 0
  const sum = publishedCourses.reduce((acc, c) => acc + (c.completionRate || 0), 0)
  return Math.round(sum / publishedCourses.length)
})

// Filtered and Sorted Courses
const filteredCourses = computed(() => {
  const list = courses.value.filter(course => {
    const matchesClass = selectedClassroom.value === 'all' || course.classroom === selectedClassroom.value
    const matchesSearch = !searchQuery.value.trim() ||
      course.title.toLowerCase().includes(searchQuery.value.trim().toLowerCase()) ||
      course.classroom.toLowerCase().includes(searchQuery.value.trim().toLowerCase()) ||
      (course.category && course.category.toLowerCase().includes(searchQuery.value.trim().toLowerCase()))
    const matchesStatus = selectedStatus.value === 'all' || course.status === selectedStatus.value
    return matchesClass && matchesSearch && matchesStatus
  })

  // Sorting
  return [...list].sort((a, b) => {
    if (sortBy.value === 'revenue') {
      return (b.revenueNumeric || 0) - (a.revenueNumeric || 0)
    }
    if (sortBy.value === 'students') {
      return (b.studentsCount || 0) - (a.studentsCount || 0)
    }
    if (sortBy.value === 'alphabetical') {
      return a.title.localeCompare(b.title, 'ar')
    }
    // newest default
    return b.id - a.id
  })
})

// Reset page when filter changes
watch([searchQuery, selectedClassroom, selectedStatus, sortBy, itemsPerPage], () => {
  currentPage.value = 1
})

// Paginated courses for current page
const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredCourses.value.slice(start, start + itemsPerPage.value)
})

// Checkbox selection state
const isAllPageSelected = computed(() => {
  if (paginatedCourses.value.length === 0) return false
  return paginatedCourses.value.every(c => selectedIds.value.includes(c.id))
})

const isPartiallySelected = computed(() => {
  const count = paginatedCourses.value.filter(c => selectedIds.value.includes(c.id)).length
  return count > 0 && count < paginatedCourses.value.length
})

function toggleSelectAllPage() {
  if (isAllPageSelected.value) {
    const pageIds = paginatedCourses.value.map(c => c.id)
    selectedIds.value = selectedIds.value.filter(id => !pageIds.includes(id))
  } else {
    paginatedCourses.value.forEach(c => {
      if (!selectedIds.value.includes(c.id)) {
        selectedIds.value.push(c.id)
      }
    })
  }
}

function toggleSelectRow(id: number) {
  const index = selectedIds.value.indexOf(id)
  if (index > -1) {
    selectedIds.value.splice(index, 1)
  } else {
    selectedIds.value.push(id)
  }
}

function toggleCourseStatus(courseId: number) {
  const c = courses.value.find(item => item.id === courseId)
  if (c) {
    const newStatus = c.status === 'published' ? 'draft' : 'published'
    c.status = newStatus
    toast.add({
      title: 'تم تحديث حالة الدورة',
      description: `أصبحت الدورة "${c.title}" في حالة: ${newStatus === 'published' ? 'منشورة' : 'مسودة'}`,
      color: newStatus === 'published' ? 'success' : 'neutral'
    })
  }
}

// Bulk Actions
function bulkSetStatus(status: 'published' | 'draft') {
  courses.value.forEach(c => {
    if (selectedIds.value.includes(c.id)) {
      c.status = status
    }
  })
  const label = status === 'published' ? 'منشورة' : 'مسودة'
  toast.add({
    title: 'تحديث جماعي للحالة',
    description: `تم تحويل ${selectedIds.value.length} دورة إلى حالة "${label}" بنجاح.`,
    color: 'success'
  })
}

function bulkDelete() {
  if (confirm(`هل أنت متأكد من رغبتك في حذف ${selectedIds.value.length} دورة محددة نهائياً؟`)) {
    const count = selectedIds.value.length
    selectedIds.value.forEach(id => deleteCourse(id))
    selectedIds.value = []
    toast.add({
      title: 'تم الحذف الجماعي',
      description: `تم حذف ${count} دورات بنجاح.`,
      color: 'error'
    })
  }
}

function bulkExport() {
  toast.add({
    title: 'تصدير البيانات',
    description: `جاري تحميل ملف CSV يحتوي على ${selectedIds.value.length} دورة...`,
    color: 'info'
  })
}

// Bulk actions dropdown menu items
const bulkMenuItems = computed(() => [
  [
    {
      label: 'نشر الدورات المحددة',
      icon: 'i-lucide-check-circle',
      onSelect: () => bulkSetStatus('published')
    },
    {
      label: 'تحويل المحدد لمسودة',
      icon: 'i-lucide-pause-circle',
      onSelect: () => bulkSetStatus('draft')
    },
    {
      label: 'تصدير كملف CSV',
      icon: 'i-lucide-download',
      onSelect: bulkExport
    }
  ],
  [
    {
      label: 'حذف الدورات المحددة',
      icon: 'i-lucide-trash-2',
      color: 'error' as const,
      onSelect: bulkDelete
    }
  ]
])

// Single course action dropdown menu
function getCourseActionItems(course: typeof courses.value[0]) {
  return [
    [
      {
        label: 'تعديل محتوى الدورة',
        icon: 'i-lucide-pencil',
        to: `/teacher-dashboard/courses/edit?id=${course.id}`
      },
      {
        label: 'معاينة كطالب',
        icon: 'i-lucide-external-link',
        to: 'https://ahmed.mydomain.com',
        target: '_blank'
      },
      {
        label: 'نسخ رابط الدورة',
        icon: 'i-lucide-copy',
        onSelect: () => copyCourseShareLink(course.id)
      }
    ],
    [
      {
        label: course.status === 'published' ? 'تحويل إلى مسودة' : 'نشر الدورة الآن',
        icon: course.status === 'published' ? 'i-lucide-pause-circle' : 'i-lucide-check-circle-2',
        onSelect: () => toggleCourseStatus(course.id)
      }
    ],
    [
      {
        label: 'حذف الدورة',
        icon: 'i-lucide-trash-2',
        color: 'error' as const,
        onSelect: () => {
          if (confirm(`هل أنت متأكد من حذف الدورة "${course.title}"؟`)) {
            deleteCourse(course.id)
            selectedIds.value = selectedIds.value.filter(id => id !== course.id)
            toast.add({
              title: 'تم حذف الدورة',
              description: `تم إزالة دورة "${course.title}" بنجاح.`,
              color: 'error'
            })
          }
        }
      }
    ]
  ]
}

function getClassroomColor(classroomName: string): string {
  const cls = classrooms.value.find(c => c.name === classroomName)
  return cls?.colorClass || 'bg-slate-400'
}

function copyCourseShareLink(courseId: number) {
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText(`https://ahmed.mydomain.com/courses/${courseId}`)
    toast.add({
      title: 'تم نسخ الرابط بنجاح',
      description: 'يمكنك الآن مشاركة رابط الدورة مع طلابك.',
      color: 'success'
    })
  }
}

function resetFilters() {
  searchQuery.value = ''
  selectedClassroom.value = 'all'
  selectedStatus.value = 'all'
  sortBy.value = 'newest'
}

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || selectedClassroom.value !== 'all' || selectedStatus.value !== 'all'
})
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full box-border">
    <!-- Top Header and Main Action Buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            دوراتي التعليمية
          </h1>
          <UBadge color="primary" variant="subtle" size="md" class="font-extrabold rounded-full px-2.5">
            {{ courses.length }} دورات
          </UBadge>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">
          إدارة وتنظيم كافة الدورات والمناهج التعليمية، مع إمكانية الفرز والتصفية وتنفيذ العمليات الجماعية.
        </p>
      </div>

      <div class="flex items-center gap-2.5">
        <UButton
          to="/teacher-dashboard/classrooms"
          color="neutral"
          variant="outline"
          icon="i-lucide-school"
          size="md"
          class="font-bold rounded-xl"
        >
          الفصول الدراسية
        </UButton>

        <UButton
          to="/teacher-dashboard/courses/new"
          color="primary"
          variant="solid"
          icon="i-lucide-plus"
          size="md"
          class="font-bold rounded-xl shadow-sm"
        >
          دورة جديدة
        </UButton>
      </div>
    </div>

    <!-- Quick Analytics KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-bold text-slate-400 block mb-1">إجمالي الدورات</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-black text-slate-900 dark:text-white">{{ courses.length }}</span>
            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">{{ publishedCount }} منشورة</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <UIcon name="i-lucide-book-open" class="w-5 h-5" />
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-bold text-slate-400 block mb-1">الطلاب المسجلين</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-black text-slate-900 dark:text-white">{{ totalStudents }}</span>
            <span class="text-xs font-bold text-slate-400">طالب</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <UIcon name="i-lucide-users" class="w-5 h-5" />
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-bold text-slate-400 block mb-1">إجمالي المبيعات</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-black text-emerald-600 dark:text-emerald-400">{{ totalRevenue.toLocaleString('ar-EG') }}</span>
            <span class="text-xs font-bold text-slate-400">ج.م</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <UIcon name="i-lucide-wallet" class="w-5 h-5" />
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <span class="text-xs font-bold text-slate-400 block mb-1">متوسط إنجاز الطلاب</span>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-black text-purple-600 dark:text-purple-400">{{ averageCompletionRate }}%</span>
            <span class="text-xs font-bold text-slate-400">للمنشورة</span>
          </div>
        </div>
        <div class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
          <UIcon name="i-lucide-trending-up" class="w-5 h-5" />
        </div>
      </div>
    </div>

    <!-- Table Toolbar with Nuxt UI Components -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
        <!-- Search Input -->
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="بحث بالاسم، الفصل، أو التصنيف..."
          size="md"
          class="w-full sm:w-72"
        />

        <!-- Classroom Filter -->
        <USelect
          v-model="selectedClassroom"
          :items="classroomFilterItems"
          icon="i-lucide-school"
          size="md"
          class="w-full sm:w-48"
        />

        <!-- Status Filter -->
        <USelect
          v-model="selectedStatus"
          :items="statusFilterItems"
          icon="i-lucide-filter"
          size="md"
          class="w-full sm:w-36"
        />

        <!-- Sort Filter -->
        <USelect
          v-model="sortBy"
          :items="sortItems"
          icon="i-lucide-arrow-up-down"
          size="md"
          class="w-full sm:w-40"
        />
      </div>

      <!-- Reset Filters & Active count -->
      <div class="flex items-center gap-3 self-end md:self-auto">
        <UButton
          v-if="hasActiveFilters"
          color="neutral"
          variant="ghost"
          icon="i-lucide-rotate-ccw"
          size="sm"
          class="text-xs font-bold"
          @click="resetFilters"
        >
          إعادة ضبط
        </UButton>

        <span class="text-xs text-slate-500 font-bold whitespace-nowrap">
          {{ filteredCourses.length }} دورة مطابقة
        </span>
      </div>
    </div>

    <!-- Bulk Floating Actions Bar (Nuxt UI DropdownMenu & Buttons) -->
    <div
      v-if="selectedIds.length > 0"
      class="bg-blue-900 text-white rounded-2xl p-3.5 px-5 flex flex-wrap items-center justify-between gap-3 shadow-lg border border-blue-800 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div class="flex items-center gap-3">
        <span class="w-6 h-6 rounded-full bg-white text-blue-900 text-xs font-black flex items-center justify-center">
          {{ selectedIds.length }}
        </span>
        <span class="text-sm font-bold">دورات محددة</span>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          size="xs"
          color="neutral"
          variant="outline"
          class="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold rounded-xl"
          icon="i-lucide-check-circle-2"
          @click="bulkSetStatus('published')"
        >
          نشر المحدد
        </UButton>

        <UButton
          size="xs"
          color="neutral"
          variant="outline"
          class="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold rounded-xl"
          icon="i-lucide-pause-circle"
          @click="bulkSetStatus('draft')"
        >
          تحويل لمسودة
        </UButton>

        <UButton
          size="xs"
          color="neutral"
          variant="outline"
          class="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold rounded-xl"
          icon="i-lucide-download"
          @click="bulkExport"
        >
          تصدير CSV
        </UButton>

        <!-- Dropdown Menu for more bulk options -->
        <UDropdownMenu :items="bulkMenuItems" :content="{ align: 'end' }">
          <UButton
            size="xs"
            color="neutral"
            variant="outline"
            class="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold rounded-xl"
            icon="i-lucide-more-horizontal"
          >
            المزيد
          </UButton>
        </UDropdownMenu>

        <UButton
          size="xs"
          color="neutral"
          variant="ghost"
          class="text-blue-200 hover:text-white font-bold"
          @click="selectedIds = []"
        >
          إلغاء التحديد
        </UButton>
      </div>
    </div>

    <!-- Data Table Container -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-start text-xs border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-extrabold">
              <!-- Select All Header Checkbox using UCheckbox -->
              <th class="p-4 w-12 text-center">
                <div class="flex items-center justify-center">
                  <UCheckbox
                    :model-value="isAllPageSelected"
                    :indeterminate="isPartiallySelected"
                    color="primary"
                    aria-label="تحديد الصفحة الحالية"
                    @update:model-value="toggleSelectAllPage"
                  />
                </div>
              </th>
              <th class="p-4 text-start">الدورة والتصنيف</th>
              <th class="p-4 text-start">الفصل الدراسي</th>
              <th class="p-4 text-start">السعر</th>
              <th class="p-4 text-start">المحتوى</th>
              <th class="p-4 text-start">الطلاب المسجلين</th>
              <th class="p-4 text-start">نسبة الإكمال</th>
              <th class="p-4 text-start">الإيرادات</th>
              <th class="p-4 text-start">الحالة</th>
              <th class="p-4 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <!-- Empty State -->
            <tr v-if="paginatedCourses.length === 0">
              <td colspan="10" class="p-12 text-center">
                <div class="flex flex-col items-center justify-center gap-3">
                  <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <UIcon name="i-lucide-search-x" class="w-6 h-6" />
                  </div>
                  <h3 class="font-extrabold text-base text-slate-900 dark:text-white">لم يتم العثور على أي دورات</h3>
                  <p class="text-xs text-slate-500 max-w-sm">
                    لا توجد دورات تطابق معايير البحث أو الفلاتر المحددة. جرب تغيير الفلتر أو إضافة دورة جديدة.
                  </p>
                  <UButton
                    v-if="hasActiveFilters"
                    color="primary"
                    variant="subtle"
                    size="sm"
                    icon="i-lucide-rotate-ccw"
                    class="font-bold rounded-xl mt-1"
                    @click="resetFilters"
                  >
                    إعادة ضبط الفلاتر
                  </UButton>
                </div>
              </td>
            </tr>

            <!-- Rows -->
            <tr
              v-for="course in paginatedCourses"
              :key="course.id"
              :class="[
                'hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors',
                selectedIds.includes(course.id) ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
              ]"
            >
              <!-- Row Checkbox using UCheckbox -->
              <td class="p-4 text-center">
                <div class="flex items-center justify-center">
                  <UCheckbox
                    :model-value="selectedIds.includes(course.id)"
                    color="primary"
                    :aria-label="`تحديد ${course.title}`"
                    @update:model-value="toggleSelectRow(course.id)"
                  />
                </div>
              </td>

              <!-- Course Title & Category -->
              <td class="p-4 min-w-[240px]">
                <div class="flex items-center gap-3">
                  <div :class="['w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs', course.headerBg]">
                    <UIcon name="i-lucide-book-open" class="w-4 h-4" />
                  </div>
                  <div class="flex flex-col min-w-0">
                    <NuxtLink
                      :to="`/teacher-dashboard/courses/edit?id=${course.id}`"
                      class="font-black text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1 text-sm"
                    >
                      {{ course.title }}
                    </NuxtLink>
                    <div class="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{{ course.category || 'رياضيات عامة' }}</span>
                      <span>·</span>
                      <span class="flex items-center gap-0.5 text-amber-500 font-bold">
                        <UIcon name="i-lucide-star" class="w-3 h-3 fill-amber-400" />
                        {{ course.rating || '5.0' }}
                      </span>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Classroom Badge -->
              <td class="p-4 whitespace-nowrap">
                <UBadge
                  color="neutral"
                  variant="subtle"
                  size="sm"
                  class="font-bold rounded-lg gap-1.5"
                >
                  <span :class="['w-2 h-2 rounded-full shrink-0', getClassroomColor(course.classroom)]" />
                  <span>{{ course.classroom }}</span>
                </UBadge>
              </td>

              <!-- Price -->
              <td class="p-4 whitespace-nowrap">
                <UBadge
                  :color="course.price === 'مجانية' ? 'info' : 'neutral'"
                  variant="outline"
                  size="sm"
                  class="font-black"
                >
                  {{ course.price }}
                </UBadge>
              </td>

              <!-- Content (Lessons & Duration) -->
              <td class="p-4 whitespace-nowrap">
                <div class="flex flex-col">
                  <span class="font-bold text-slate-800 dark:text-slate-200">{{ course.lessonsCount }} درساً</span>
                  <span class="text-[10px] text-slate-400">{{ course.durationHours || 12 }} ساعة تدريبية</span>
                </div>
              </td>

              <!-- Students Count with Mini Avatar stack -->
              <td class="p-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <div class="flex -space-x-1.5 rtl:space-x-reverse overflow-hidden">
                    <div class="w-5 h-5 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center ring-1 ring-white">أ</div>
                    <div class="w-5 h-5 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center ring-1 ring-white">م</div>
                    <div class="w-5 h-5 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center ring-1 ring-white">س</div>
                  </div>
                  <span class="font-black text-slate-900 dark:text-white">{{ course.studentsCount }}</span>
                </div>
              </td>

              <!-- Completion Rate with UProgress -->
              <td class="p-4 min-w-[130px]">
                <div class="flex flex-col gap-1">
                  <div class="flex items-center justify-between text-[11px] font-bold">
                    <span class="text-slate-500">{{ course.completionRate || 0 }}%</span>
                  </div>
                  <UProgress
                    :model-value="course.completionRate || 0"
                    :color="course.completionRate && course.completionRate > 70 ? 'success' : 'primary'"
                    size="xs"
                  />
                </div>
              </td>

              <!-- Revenue -->
              <td class="p-4 whitespace-nowrap font-black text-emerald-600 dark:text-emerald-400 text-xs">
                {{ course.revenue || '0 ج.م' }}
              </td>

              <!-- Status with Interactive Toggle Badge -->
              <td class="p-4 whitespace-nowrap">
                <button
                  type="button"
                  class="cursor-pointer"
                  :title="'اضغط لتغيير الحالة إلى ' + (course.status === 'published' ? 'مسودة' : 'منشورة')"
                  @click="toggleCourseStatus(course.id)"
                >
                  <UBadge
                    :color="course.status === 'published' ? 'success' : 'warning'"
                    variant="subtle"
                    size="sm"
                    class="font-bold cursor-pointer hover:opacity-80 transition-opacity gap-1"
                  >
                    <span :class="['w-1.5 h-1.5 rounded-full', course.status === 'published' ? 'bg-emerald-600' : 'bg-amber-500']" />
                    <span>{{ course.status === 'published' ? 'منشورة' : 'مسودة' }}</span>
                  </UBadge>
                </button>
              </td>

              <!-- Actions DropdownMenu -->
              <td class="p-4 text-center whitespace-nowrap">
                <div class="flex items-center justify-center gap-1">
                  <UButton
                    :to="`/teacher-dashboard/courses/edit?id=${course.id}`"
                    size="xs"
                    color="primary"
                    variant="ghost"
                    icon="i-lucide-pencil"
                    class="rounded-lg"
                    title="تعديل سريع"
                  />

                  <!-- Nuxt UI UDropdownMenu for full row actions -->
                  <UDropdownMenu
                    :items="getCourseActionItems(course)"
                    :content="{ align: 'end' }"
                  >
                    <UButton
                      size="xs"
                      color="neutral"
                      variant="ghost"
                      icon="i-lucide-ellipsis-vertical"
                      class="rounded-lg"
                      aria-label="قائمة الخيارات"
                    />
                  </UDropdownMenu>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table Footer with UPagination and Per-Page Selector -->
      <div class="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-bold text-slate-500">
        <!-- Records Counter & Page Size Selector -->
        <div class="flex items-center gap-3">
          <span>
            عرض
            <span class="text-slate-900 dark:text-white font-black">
              {{ filteredCourses.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0 }}
            </span>
            إلى
            <span class="text-slate-900 dark:text-white font-black">
              {{ Math.min(currentPage * itemsPerPage, filteredCourses.length) }}
            </span>
            من إجمالي
            <span class="text-slate-900 dark:text-white font-black">{{ filteredCourses.length }}</span>
            دورة
          </span>

          <span class="text-slate-300 dark:text-slate-700">|</span>

          <div class="flex items-center gap-1.5">
            <span class="text-slate-400">العرض:</span>
            <USelect
              v-model="itemsPerPage"
              :items="perPageItems"
              size="xs"
              class="w-32"
            />
          </div>
        </div>

        <!-- Nuxt UI UPagination Component -->
        <div class="flex items-center justify-center sm:justify-end">
          <UPagination
            v-if="filteredCourses.length > itemsPerPage"
            v-model:page="currentPage"
            :total="filteredCourses.length"
            :items-per-page="itemsPerPage"
            size="sm"
            color="primary"
            show-edges
          />
        </div>
      </div>
    </div>
  </div>
</template>
