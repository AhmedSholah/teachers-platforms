<script setup lang="ts">
useHead({
  title: 'دوراتي - لوحة تحكم المعلم'
})

const route = useRoute()
const toast = useToast()

const {
  classrooms,
  courses,
  ensureLoaded,
  updateCourse,
  deleteCourse
} = useClassrooms()

await ensureLoaded()

// Filters state
const searchQuery = ref('')
const selectedClassroom = ref<string>((route.query.classroom as string) || 'all')
const selectedStatus = ref<'all' | 'published' | 'draft'>('all')
const sortBy = ref<'newest' | 'revenue' | 'students' | 'alphabetical'>('newest')

// Pagination state - defaults to 4 items so multi-page pagination controls are clearly visible
const currentPage = ref(1)
const itemsPerPage = ref(4)

const totalPages = computed(() => Math.ceil(filteredCourses.value.length / itemsPerPage.value) || 1)

type PaginationItem = number | '...'

const visiblePages = computed<PaginationItem[]>(() => {
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total]
  }

  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  }

  return [1, '...', current - 1, current, current + 1, '...', total]
})

function goToPage(page: PaginationItem) {
  if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Items per page dropdown options
const perPageOptions = [4, 8, 12, 24]
const perPageDropdownItems = computed(() => [
  perPageOptions.map(num => ({
    label: `${num}`,
    active: itemsPerPage.value === num,
    onSelect: () => {
      itemsPerPage.value = num
      currentPage.value = 1
    }
  }))
])

// Counts for quick status tabs
const statusCounts = computed(() => {
  const all = courses.value.length
  const published = courses.value.filter(c => c.status === 'published').length
  const draft = courses.value.filter(c => c.status === 'draft').length
  return { all, published, draft }
})

// Classroom options for USelect
const classroomFilterItems = computed(() => {
  const base = [{ label: 'كافة الفصول الدراسية', value: 'all' }]
  const list = classrooms.value.map(c => ({
    label: c.name,
    value: c.name
  }))
  return [...base, ...list, { label: 'بدون فصل دراسي', value: 'بدون فصل دراسي' }]
})

// Sort options for USelect
const sortItems = [
  { label: 'الأحدث أولاً', value: 'newest' },
  { label: 'الأعلى إيراداً', value: 'revenue' },
  { label: 'الأكثر طلاباً', value: 'students' },
  { label: 'الترتيب الأبجدي', value: 'alphabetical' }
]


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

async function toggleCourseStatus(courseId: number) {
  const c = courses.value.find(item => item.id === courseId)
  if (!c) return

  const newStatus = c.status === 'published' ? 'draft' : 'published'
  try {
    await updateCourse(courseId, { status: newStatus })
    toast.add({
      title: 'تم تحديث حالة الدورة',
      description: `أصبحت الدورة "${c.title}" في حالة: ${newStatus === 'published' ? 'منشورة' : 'مسودة'}`,
      color: newStatus === 'published' ? 'success' : 'neutral'
    })
  } catch (err: unknown) {
    const fetchErr = err as { data?: { statusMessage?: string }; statusMessage?: string }
    toast.add({
      title: 'تعذر تحديث حالة الدورة',
      description: fetchErr?.data?.statusMessage || fetchErr?.statusMessage || 'حدث خطأ أثناء الحفظ.',
      color: 'error'
    })
  }
}

// Single course action dropdown menu
function getCourseActionItems(course: typeof courses.value[0]) {
  return [
    [
      {
        label: 'تعديل المحتوى والدروس',
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
        label: course.status === 'published' ? 'تحويل إلى مسودة' : 'نشر الدورة للطلاب',
        icon: course.status === 'published' ? 'i-lucide-pause-circle' : 'i-lucide-check-circle-2',
        onSelect: () => toggleCourseStatus(course.id)
      }
    ],
    [
      {
        label: 'حذف الدورة',
        icon: 'i-lucide-trash-2',
        color: 'error' as const,
        onSelect: async () => {
          if (!confirm(`هل أنت متأكد من حذف الدورة "${course.title}"؟`)) return
          try {
            await deleteCourse(course.id)
            toast.add({
              title: 'تم حذف الدورة',
              description: `تم إزالة دورة "${course.title}" بنجاح.`,
              color: 'error'
            })
          } catch (err: unknown) {
            const fetchErr = err as { data?: { statusMessage?: string }; statusMessage?: string }
            toast.add({
              title: 'تعذر حذف الدورة',
              description: fetchErr?.data?.statusMessage || fetchErr?.statusMessage || 'حدث خطأ أثناء الحذف.',
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
  <div class="flex flex-col min-h-full">
    <!-- Sub-navbar Action Bar -->
    <DashboardActionBar max-width="max-w-none" container-class="px-6 md:px-10">
      <div class="flex items-center gap-2.5">
        <UButton
          to="/teacher-dashboard/courses/new"
          color="primary"
          variant="solid"
          icon="i-lucide-plus"
          size="md"
          class="font-extrabold rounded-xl shadow-xs px-4"
        >
          دورة جديدة
        </UButton>

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
      </div>

      <!-- Left Side Badges / Counter -->
      <template #end>
        <div class="flex items-center gap-3">
          <span class="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            {{ courses.length }} دورة مسجلة
          </span>
        </div>
      </template>
    </DashboardActionBar>

    <div class="p-6 md:p-10 flex flex-col gap-6 w-full box-border">

      <!-- Status Tabs + Search & Filters Bar -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-xs">
        <!-- Top Row: Status Quick Tabs + Search Input -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <!-- Segmented Status Tabs -->
          <div class="flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl w-fit border border-slate-200/60 dark:border-slate-700/60">
            <button
              type="button"
              class="px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              :class="selectedStatus === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              @click="selectedStatus = 'all'"
            >
              <span>كافة الدورات</span>
              <span
                class="px-1.5 py-0.5 rounded-full text-[10px] font-black"
                :class="selectedStatus === 'all' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' : 'bg-slate-200/60 dark:bg-slate-700 text-slate-500'"
              >
                {{ statusCounts.all }}
              </span>
            </button>

            <button
              type="button"
              class="px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              :class="selectedStatus === 'published'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              @click="selectedStatus = 'published'"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-500" />
              <span>المنشورة</span>
              <span
                class="px-1.5 py-0.5 rounded-full text-[10px] font-black"
                :class="selectedStatus === 'published' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300' : 'bg-slate-200/60 dark:bg-slate-700 text-slate-500'"
              >
                {{ statusCounts.published }}
              </span>
            </button>

            <button
              type="button"
              class="px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              :class="selectedStatus === 'draft'
                ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
              @click="selectedStatus = 'draft'"
            >
              <span class="w-2 h-2 rounded-full bg-amber-500" />
              <span>المسودات</span>
              <span
                class="px-1.5 py-0.5 rounded-full text-[10px] font-black"
                :class="selectedStatus === 'draft' ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300' : 'bg-slate-200/60 dark:bg-slate-700 text-slate-500'"
              >
                {{ statusCounts.draft }}
              </span>
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full md:w-80">
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              placeholder="ابحث بالاسم، الفصل، أو التخصص..."
              size="md"
              class="w-full"
            />
          </div>
        </div>

        <!-- Bottom Row: Classroom Filter + Sort + Results count -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div class="flex flex-wrap items-center gap-3">
            <!-- Classroom Filter -->
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-500 font-bold whitespace-nowrap">الفصل:</span>
              <USelect
                v-model="selectedClassroom"
                :items="classroomFilterItems"
                icon="i-lucide-school"
                size="sm"
                class="w-48"
              />
            </div>

            <!-- Sort Filter -->
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-500 font-bold whitespace-nowrap">الترتيب:</span>
              <USelect
                v-model="sortBy"
                :items="sortItems"
                icon="i-lucide-arrow-up-down"
                size="sm"
                class="w-44"
              />
            </div>

            <!-- Reset Filters -->
            <UButton
              v-if="hasActiveFilters"
              color="neutral"
              variant="ghost"
              icon="i-lucide-rotate-ccw"
              size="xs"
              class="text-xs font-bold text-slate-500 hover:text-slate-800"
              @click="resetFilters"
            >
              إلغاء التصفية
            </UButton>
          </div>

          <!-- Matching Count -->
          <div class="flex items-center gap-2 text-xs font-bold text-slate-500 self-end sm:self-auto">
            <span>{{ filteredCourses.length }} دورة مطابقة</span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="paginatedCourses.length === 0"
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4 shadow-xs"
      >
        <div class="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <UIcon name="i-lucide-book-open-check" class="w-8 h-8" />
        </div>
        <div class="flex flex-col gap-1 max-w-md">
          <h3 class="font-black text-lg text-slate-900 dark:text-white">لم يتم العثور على أي دورات مطابقة</h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            لا توجد دورات تطابق معايير البحث أو التصنيف المحدد. يمكنك إلغاء التصفية للرجوع لكافة الدورات أو إنشاء دورة تعليمية جديدة الآن.
          </p>
        </div>
        <div class="flex items-center gap-3 mt-2">
          <UButton
            v-if="hasActiveFilters"
            color="neutral"
            variant="outline"
            size="md"
            icon="i-lucide-rotate-ccw"
            class="font-bold rounded-xl"
            @click="resetFilters"
          >
            إعادة ضبط الفلاتر
          </UButton>
          <UButton
            to="/teacher-dashboard/courses/new"
            color="primary"
            variant="solid"
            size="md"
            icon="i-lucide-plus"
            class="font-bold rounded-xl"
          >
            إنشاء دورة جديدة
          </UButton>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- CLEAN & COMFORTABLE TABLE VIEW                           -->
      <!-- ======================================================== -->
      <div v-else class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-start text-sm border-collapse">
            <thead>
              <tr class="bg-slate-50/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-extrabold text-xs">
                <th class="p-4.5 ps-6 text-start">الدورة والتصنيف</th>
                <th class="p-4.5 text-start">الفصل الدراسي</th>
                <th class="p-4.5 text-start">المحتوى والمدة</th>
                <th class="p-4.5 text-start">الحالة</th>
                <th class="p-4.5 pe-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr
                v-for="course in paginatedCourses"
                :key="course.id"
                class="hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors"
              >
                <!-- Course Title & Category -->
                <td class="p-4.5 ps-6 min-w-[280px]">
                  <div class="flex items-center gap-3.5">
                    <div :class="['w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs text-lg', course.headerBg]">
                      <UIcon name="i-lucide-book-open" class="w-5 h-5" />
                    </div>
                    <div class="flex flex-col min-w-0">
                      <NuxtLink
                        :to="`/teacher-dashboard/courses/edit?id=${course.id}`"
                        class="font-black text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1 text-sm leading-snug"
                      >
                        {{ course.title }}
                      </NuxtLink>
                      <div class="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span>{{ course.category || 'عام' }}</span>
                        <span>·</span>
                        <span class="flex items-center gap-0.5 text-amber-500 font-bold">
                          <UIcon name="i-lucide-star" class="w-3.5 h-3.5 fill-amber-400" />
                          {{ course.rating && course.rating > 0 ? course.rating : 'جديد' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Classroom Badge -->
                <td class="p-4.5 whitespace-nowrap">
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

                <!-- Content & Duration -->
                <td class="p-4.5 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="font-extrabold text-slate-900 dark:text-white">{{ course.lessonsCount }} درساً</span>
                    <span class="text-xs text-slate-400 mt-0.5">{{ course.durationHours || 12 }} ساعة تدريبية</span>
                  </div>
                </td>

                <!-- Status with Interactive Toggle Badge -->
                <td class="p-4.5 whitespace-nowrap">
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
                      class="font-black cursor-pointer hover:opacity-80 transition-opacity gap-1.5"
                    >
                      <span :class="['w-1.5 h-1.5 rounded-full', course.status === 'published' ? 'bg-emerald-600' : 'bg-amber-500']" />
                      <span>{{ course.status === 'published' ? 'منشورة' : 'مسودة' }}</span>
                    </UBadge>
                  </button>
                </td>

                <!-- Actions -->
                <td class="p-4.5 pe-6 text-center whitespace-nowrap">
                  <div class="flex items-center justify-center gap-1.5">
                    <UButton
                      :to="`/teacher-dashboard/courses/edit?id=${course.id}`"
                      size="xs"
                      color="primary"
                      variant="subtle"
                      icon="i-lucide-pencil"
                      class="rounded-xl font-bold px-2.5"
                    >
                      تعديل
                    </UButton>

                    <UDropdownMenu
                      :items="getCourseActionItems(course)"
                      :content="{ align: 'end' }"
                    >
                      <UButton
                        size="xs"
                        color="neutral"
                        variant="ghost"
                        icon="i-lucide-ellipsis-vertical"
                        class="rounded-xl text-slate-400 hover:text-slate-700"
                        aria-label="قائمة الخيارات"
                      />
                    </UDropdownMenu>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table Footer / Pagination Bar matching design mockup -->
        <div
          v-if="filteredCourses.length > 0"
          class="p-4 px-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-sm font-normal text-slate-500 dark:text-slate-400"
        >
          <!-- Total Count (Start side) -->
          <div class="flex items-center">
            <span>
              عرض
              {{ (currentPage - 1) * itemsPerPage + 1 }}
              إلى
              {{ Math.min(currentPage * itemsPerPage, filteredCourses.length) }}
              من
              {{ filteredCourses.length }}
              نتيجة
            </span>
          </div>

          <!-- Pagination Controls & Rows Per Page (End side) -->
          <div class="flex flex-wrap items-center gap-3 sm:gap-4 justify-between lg:justify-end">
            <!-- Rows Per Page -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-500 dark:text-slate-400 font-normal whitespace-nowrap">
                الصفوف في الصفحة:
              </span>

              <UDropdownMenu
                :items="perPageDropdownItems"
                :content="{ align: 'center' }"
              >
                <button
                  type="button"
                  class="inline-flex items-center justify-between gap-2 px-3 py-1.5 h-9 min-w-[58px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer shadow-2xs"
                >
                  <span>{{ itemsPerPage }}</span>
                  <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              </UDropdownMenu>
            </div>

            <!-- Faint vertical divider line -->
            <div class="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

            <!-- Page Navigation Controls -->
            <div class="flex items-center gap-1.5 flex-wrap">
              <!-- Previous Button -->
              <button
                type="button"
                :disabled="currentPage === 1"
                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300 dark:hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-800 disabled:hover:border-slate-200 dark:disabled:hover:border-slate-700 transition-all shadow-2xs cursor-pointer"
                aria-label="الصفحة السابقة"
                @click="prevPage"
              >
                <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>السابق</span>
              </button>

              <!-- Page Number Buttons -->
              <template v-for="(item, idx) in visiblePages" :key="idx">
                <span
                  v-if="item === '...'"
                  class="min-w-9 h-9 px-1 text-slate-400 font-bold text-sm flex items-center justify-center select-none"
                >
                  ...
                </span>
                <button
                  v-else
                  type="button"
                  class="min-w-9 h-9 px-3 rounded-lg text-sm transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                  :class="item === currentPage
                    ? 'bg-blue-600 text-white font-semibold border border-blue-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300 dark:hover:border-slate-600'"
                  :aria-label="`صفحة ${item}`"
                  :aria-current="item === currentPage ? 'page' : undefined"
                  @click="goToPage(item)"
                >
                  {{ item }}
                </button>
              </template>

              <!-- Next Button -->
              <button
                type="button"
                :disabled="currentPage === totalPages"
                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300 dark:hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-800 disabled:hover:border-slate-200 dark:disabled:hover:border-slate-700 transition-all shadow-2xs cursor-pointer"
                aria-label="الصفحة التالية"
                @click="nextPage"
              >
                <span>التالي</span>
                <UIcon name="i-lucide-chevron-left" class="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
