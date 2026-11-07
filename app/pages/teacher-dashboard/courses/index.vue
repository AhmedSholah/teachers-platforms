<script setup lang="ts">
useHead({
  title: 'دوراتي - لوحة التحكم'
})

interface Course {
  id: number
  title: string
  lessonsCount: number
  studentsCount: number
  category: string
  price: string
  status: 'published' | 'draft'
  headerBg: string
  iconColor: string
}

interface CategoryTab {
  id: string
  label: string
  fullName: string
  dotClass?: string
}

const categoryOptions = [
  'الأول الثانوي',
  'الثاني الثانوي',
  'الثالث الثانوي',
  'بدون تصنيف'
]

const courses = ref<Course[]>([
  {
    id: 1,
    title: 'أساسيات الجبر',
    lessonsCount: 12,
    studentsCount: 124,
    category: 'الأول الثانوي',
    price: '250 ج.م',
    status: 'published',
    headerBg: 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
    iconColor: 'text-blue-700 dark:text-blue-400'
  },
  {
    id: 2,
    title: 'دورة مكثفة في الهندسة',
    lessonsCount: 20,
    studentsCount: 86,
    category: 'الأول الثانوي',
    price: '300 ج.م',
    status: 'published',
    headerBg: 'bg-amber-100/80 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400',
    iconColor: 'text-amber-800 dark:text-amber-400'
  },
  {
    id: 3,
    title: 'الإحصاء والاحتمالات',
    lessonsCount: 10,
    studentsCount: 42,
    category: 'الثاني الثانوي',
    price: '350 ج.م',
    status: 'published',
    headerBg: 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400',
    iconColor: 'text-emerald-800 dark:text-emerald-400'
  },
  {
    id: 4,
    title: 'التفاضل والتكامل',
    lessonsCount: 5,
    studentsCount: 0,
    category: 'الثالث الثانوي',
    price: '400 ج.م',
    status: 'draft',
    headerBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800/80 dark:text-slate-400',
    iconColor: 'text-slate-600 dark:text-slate-400'
  }
])

const selectedCategory = ref('all')
const searchQuery = ref('')

const categoryTabs = computed<CategoryTab[]>(() => {
  const allCount = courses.value.length
  const firstCount = courses.value.filter(c => c.category === 'الأول الثانوي').length
  const secondCount = courses.value.filter(c => c.category === 'الثاني الثانوي').length
  const thirdCount = courses.value.filter(c => c.category === 'الثالث الثانوي').length

  return [
    {
      id: 'all',
      label: `الكل (${allCount})`,
      fullName: 'كل الدورات'
    },
    {
      id: 'الأول الثانوي',
      label: `الأول الثانوي (${firstCount})`,
      fullName: 'الصف الأول الثانوي',
      dotClass: 'bg-blue-600'
    },
    {
      id: 'الثاني الثانوي',
      label: `الثاني الثانوي (${secondCount})`,
      fullName: 'الصف الثاني الثانوي',
      dotClass: 'bg-amber-500'
    },
    {
      id: 'الثالث الثانوي',
      label: `الثالث الثانوي (${thirdCount})`,
      fullName: 'الصف الثالث الثانوي',
      dotClass: 'bg-emerald-600'
    }
  ]
})

function formatCoursesCount(count: number): string {
  if (count === 1) return '1 دورة'
  if (count === 2) return '2 دورات'
  if (count >= 3 && count <= 10) return `${count} دورات`
  return `${count} دورة`
}

function formatStudentsCount(count: number): string {
  if (count === 0) return '0 طالب'
  if (count === 1) return 'طالب واحد'
  if (count === 2) return 'طالبان'
  if (count >= 3 && count <= 10) return `${count} طلاب`
  return `${count} طالباً`
}

const activeCategorySummary = computed(() => {
  if (selectedCategory.value === 'all') {
    const totalStudents = courses.value.reduce((acc, c) => acc + c.studentsCount, 0)
    return {
      title: 'كل الدورات',
      coursesCountText: formatCoursesCount(courses.value.length),
      studentsCountText: formatStudentsCount(totalStudents)
    }
  }

  const currentTab = categoryTabs.value.find(tab => tab.id === selectedCategory.value)
  const categoryCourses = courses.value.filter(c => c.category === selectedCategory.value)
  const categoryStudents = categoryCourses.reduce((acc, c) => acc + c.studentsCount, 0)

  return {
    title: currentTab?.fullName || selectedCategory.value,
    coursesCountText: formatCoursesCount(categoryCourses.length),
    studentsCountText: formatStudentsCount(categoryStudents)
  }
})

const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchesCategory = selectedCategory.value === 'all' || course.category === selectedCategory.value
    const matchesSearch = !searchQuery.value.trim() ||
      course.title.toLowerCase().includes(searchQuery.value.trim().toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <div class="p-6 sm:p-8 lg:p-10 flex flex-col gap-6 max-w-7xl mx-auto w-full box-border">
    <!-- Header & Top Action Buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          دوراتي
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          عرض وإدارة كافة دوراتك التعليمية وتصنيفاتها والطلاب المسجلين.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <UButton
          to="/teacher-dashboard/courses/categories"
          color="neutral"
          variant="outline"
          icon="i-lucide-folder-cog"
          size="md"
          class="font-bold rounded-xl"
        >
          إدارة التصنيفات
        </UButton>

        <UButton
          to="/teacher-dashboard/courses/new"
          color="primary"
          variant="solid"
          icon="i-lucide-plus"
          size="md"
          class="font-bold rounded-xl"
        >
          دورة جديدة
        </UButton>
      </div>
    </div>

    <!-- Category Filter Tabs -->
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-sm font-bold text-slate-600 me-1">التصنيف:</span>

      <UButton
        v-for="tab in categoryTabs"
        :key="tab.id"
        :variant="selectedCategory === tab.id ? 'solid' : 'ghost'"
        :color="selectedCategory === tab.id ? 'primary' : 'neutral'"
        size="sm"
        class="font-bold rounded-xl transition-all"
        @click="selectedCategory = tab.id"
      >
        <span
          v-if="tab.dotClass"
          :class="['w-2 h-2 rounded-full inline-block me-1.5 shrink-0', tab.dotClass]"
        />
        <span>{{ tab.label }}</span>
      </UButton>

      <UButton
        to="/teacher-dashboard/courses/categories"
        variant="ghost"
        color="primary"
        icon="i-lucide-plus"
        size="sm"
        class="font-bold rounded-xl"
      >
        تصنيف جديد
      </UButton>
    </div>

    <!-- Category Summary & Search Bar -->
    <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex flex-col gap-0.5">
          <h2 class="m-0 text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {{ activeCategorySummary.title }}
          </h2>
          <span class="text-xs sm:text-sm text-slate-500 font-medium">
            {{ activeCategorySummary.coursesCountText }} · {{ activeCategorySummary.studentsCountText }}
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <UInput
            v-model="searchQuery"
            icon="i-lucide-search"
            placeholder="ابحث في دوراتك"
            size="md"
            class="w-full sm:w-60"
            aria-label="بحث في الدورات"
          />

          <template v-if="selectedCategory !== 'all'">
            <UButton
              to="/teacher-dashboard/courses/new"
              color="primary"
              variant="solid"
              size="md"
              icon="i-lucide-plus"
              class="font-bold rounded-xl"
            >
              إضافة دورة
            </UButton>

            <UButton
              to="/teacher-dashboard/courses/categories"
              color="neutral"
              variant="outline"
              size="md"
              class="font-bold rounded-xl"
            >
              تعديل التصنيف
            </UButton>
          </template>
        </div>
      </div>
    </UCard>

    <!-- Courses Grid -->
    <div
      v-if="filteredCourses.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      <UCard
        v-for="course in filteredCourses"
        :key="course.id"
        :ui="{ body: 'p-0 sm:p-0' }"
        class="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden flex flex-col hover:shadow-md transition-shadow"
      >
        <!-- Course Header Thumbnail -->
        <div :class="['h-28 relative flex items-center justify-center', course.headerBg, course.iconColor]">
          <UIcon name="i-lucide-book-open" class="w-11 h-11" />
          <UBadge
            :color="course.status === 'published' ? 'success' : 'warning'"
            variant="subtle"
            size="sm"
            class="absolute top-3 end-3 font-bold rounded-lg"
          >
            {{ course.status === 'published' ? 'منشورة' : 'مسودة' }}
          </UBadge>
        </div>

        <!-- Course Content Body -->
        <div class="p-5 flex flex-col gap-4 flex-1 justify-between">
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1 leading-normal">
              <h3 class="m-0 text-lg font-bold text-slate-900 tracking-tight line-clamp-1">
                {{ course.title }}
              </h3>
              <span class="text-xs text-slate-500 font-medium">
                {{ course.lessonsCount }} درساً · {{ course.studentsCount }} طالب
              </span>
            </div>

            <USelect
              v-model="course.category"
              :items="categoryOptions"
              size="md"
              class="w-full font-medium"
              aria-label="تغيير تصنيف الدورة"
            />

            <span class="text-xl font-extrabold text-slate-900">
              {{ course.price }}
            </span>
          </div>

          <!-- Card Actions -->
          <div class="flex items-center gap-2.5 pt-2 border-t border-slate-100">
            <UButton
              to="/teacher-dashboard/courses/edit"
              color="primary"
              variant="solid"
              size="md"
              class="flex-1 justify-center font-bold rounded-xl"
            >
              تعديل
            </UButton>
            <UButton
              href="https://ahmed.mydomain.com"
              target="_blank"
              rel="noopener noreferrer"
              color="neutral"
              variant="outline"
              size="md"
              icon="i-lucide-external-link"
              class="font-bold rounded-xl"
            >
              معاينة
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <UCard
      v-else
      class="border border-slate-200 shadow-sm rounded-2xl bg-white p-10 text-center"
    >
      <div class="flex flex-col items-center justify-center gap-3">
        <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
          <UIcon name="i-lucide-book-open" class="w-7 h-7" />
        </div>
        <h3 class="text-lg font-bold text-slate-900">
          لا توجد دورات مطابقة
        </h3>
        <p class="text-sm text-slate-500 max-w-sm">
          لم يتم العثور على أي دورات مطابقة لمعايير البحث أو التصنيف المحدد. يمكنك تجربة كلمة بحث أخرى أو إضافة دورة جديدة.
        </p>
        <UButton
          to="/teacher-dashboard/courses/new"
          color="primary"
          variant="solid"
          icon="i-lucide-plus"
          size="md"
          class="mt-2 font-bold rounded-xl"
        >
          دورة جديدة
        </UButton>
      </div>
    </UCard>
  </div>
</template>