<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { CourseItem } from '~/composables/useClassrooms'

useHead({
  title: 'دوراتي - لوحة تحكم المعلم'
})

const route = useRoute()
const toast = useToast()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UIcon = resolveComponent('UIcon')
const NuxtLink = resolveComponent('NuxtLink')

const {
  classrooms,
  courses,
  ensureLoaded,
  updateCourse,
  deleteCourse
} = useClassrooms()

await ensureLoaded()

const searchQuery = ref('')
const selectedClassroom = ref<string>((route.query.classroom as string) || 'all')
const selectedStatus = ref<'all' | 'published' | 'draft'>('all')
const sortBy = ref<'newest' | 'revenue' | 'students' | 'alphabetical'>('newest')

const currentPage = ref(1)
const itemsPerPage = ref(6)

const statusCounts = computed(() => {
  const all = courses.value.length
  const published = courses.value.filter(c => c.status === 'published').length
  const draft = courses.value.filter(c => c.status === 'draft').length
  return { all, published, draft }
})

const statusTabs = computed(() => [
  { label: `الكل (${statusCounts.value.all})`, value: 'all' },
  { label: `منشورة (${statusCounts.value.published})`, value: 'published' },
  { label: `مسودة (${statusCounts.value.draft})`, value: 'draft' }
])

const classroomFilterItems = computed(() => {
  const base = [{ label: 'كافة الفصول الدراسية', value: 'all' }]
  const list = classrooms.value.map(c => ({
    label: c.name,
    value: c.name
  }))
  return [...base, ...list, { label: 'بدون فصل دراسي', value: 'بدون فصل دراسي' }]
})

const sortItems = [
  { label: 'الأحدث أولاً', value: 'newest' },
  { label: 'الأعلى إيراداً', value: 'revenue' },
  { label: 'الأكثر طلاباً', value: 'students' },
  { label: 'الترتيب الأبجدي', value: 'alphabetical' }
]

const filteredCourses = computed(() => {
  const list = courses.value.filter((course) => {
    const matchesClass = selectedClassroom.value === 'all' || course.classroom === selectedClassroom.value
    const q = searchQuery.value.trim().toLowerCase()
    const matchesSearch = !q ||
      course.title.toLowerCase().includes(q) ||
      course.classroom.toLowerCase().includes(q) ||
      (course.category && course.category.toLowerCase().includes(q))
    const matchesStatus = selectedStatus.value === 'all' || course.status === selectedStatus.value
    return matchesClass && matchesSearch && matchesStatus
  })

  return [...list].sort((a, b) => {
    if (sortBy.value === 'revenue') return (b.revenueNumeric || 0) - (a.revenueNumeric || 0)
    if (sortBy.value === 'students') return (b.studentsCount || 0) - (a.studentsCount || 0)
    if (sortBy.value === 'alphabetical') return a.title.localeCompare(b.title, 'ar')
    return b.id - a.id
  })
})

watch([searchQuery, selectedClassroom, selectedStatus, sortBy], () => {
  currentPage.value = 1
})

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

function getCourseActionItems(course: CourseItem) {
  return [
    [
      {
        label: 'تعديل المحتوى والدروس',
        icon: 'i-lucide-pencil',
        to: `/teacher-dashboard/courses/edit?id=${course.id}`
      },
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

const columns: TableColumn<CourseItem>[] = [
  {
    accessorKey: 'title',
    header: 'الدورة',
    cell: ({ row }) => {
      const course = row.original
      return h('div', { class: 'flex items-center gap-3 min-w-0' }, [
        h('div', { class: ['size-9 rounded-lg flex items-center justify-center shrink-0', course.headerBg || 'bg-primary/10 text-primary'] }, [
          h(UIcon, { name: 'i-lucide-book-open', class: 'size-4' })
        ]),
        h('div', { class: 'min-w-0' }, [
          h(NuxtLink, {
            to: `/teacher-dashboard/courses/edit?id=${course.id}`,
            class: 'font-medium text-highlighted hover:text-primary truncate block'
          }, () => course.title),
          h('p', { class: 'text-xs text-muted truncate' }, `${course.category || 'عام'} • ${course.price}`)
        ])
      ])
    }
  },
  {
    accessorKey: 'classroom',
    header: 'الصف الدراسي',
    cell: ({ row }) => h(UBadge, { color: 'neutral', variant: 'subtle' }, () => row.original.classroom)
  },
  {
    accessorKey: 'lessonsCount',
    header: 'المحتوى',
    cell: ({ row }) => h('div', { class: 'flex flex-col' }, [
      h('span', { class: 'font-medium text-highlighted' }, `${row.original.lessonsCount} درساً`),
      h('span', { class: 'text-xs text-muted' }, `${row.original.studentsCount} طالب`)
    ])
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ({ row }) => {
      const published = row.original.status === 'published'
      return h(UBadge, {
        color: published ? 'success' : 'warning',
        variant: 'subtle',
        class: 'cursor-pointer',
        onClick: () => toggleCourseStatus(row.original.id)
      }, () => published ? 'منشورة' : 'مسودة')
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'flex items-center justify-end gap-1' }, [
      h(UButton, {
        to: `/teacher-dashboard/courses/edit?id=${row.original.id}`,
        size: 'xs',
        color: 'neutral',
        variant: 'ghost',
        icon: 'i-lucide-pencil',
        label: 'تعديل'
      }),
      h(UDropdownMenu, {
        items: getCourseActionItems(row.original),
        content: { align: 'end' }
      }, () => h(UButton, {
        icon: 'i-lucide-ellipsis-vertical',
        color: 'neutral',
        variant: 'ghost',
        size: 'xs',
        'aria-label': 'إجراءات'
      }))
    ])
  }
]

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
  <UDashboardPanel id="teacher-courses">
    <template #header>
      <UDashboardNavbar title="دوراتي">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #trailing>
          <UBadge variant="subtle" color="neutral">
            {{ courses.length }}
          </UBadge>
        </template>

        <template #right>
          <TeacherUserMenu />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UButton
            to="/teacher-dashboard/courses/new"
            icon="i-lucide-plus"
            label="دورة جديدة"
          />
          <UButton
            to="/teacher-dashboard/classrooms"
            color="neutral"
            variant="outline"
            icon="i-lucide-school"
            label="الفصول الدراسية"
          />
        </template>
      </UDashboardToolbar>

      <UDashboardToolbar
        :ui="{
          root: 'flex-col items-stretch py-3 gap-3 overflow-visible xl:flex-row xl:items-center xl:justify-between xl:py-0 xl:gap-1.5',
          left: 'w-full xl:w-auto',
          right: 'w-full xl:w-auto'
        }"
      >
        <template #left>
          <UTabs
            v-model="selectedStatus"
            :items="statusTabs"
            :content="false"
            size="xs"
            class="w-full xl:w-auto"
          />
        </template>

        <template #right>
          <div class="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 w-full xl:w-auto">
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              placeholder="بحث في الدورات..."
              size="sm"
              class="w-full sm:w-56"
            />
            <USelect
              v-model="selectedClassroom"
              :items="classroomFilterItems"
              size="sm"
              class="w-full sm:w-40"
            />
            <USelect
              v-model="sortBy"
              :items="sortItems"
              size="sm"
              class="w-full sm:w-36"
            />
            <UButton
              v-if="hasActiveFilters"
              color="neutral"
              variant="ghost"
              size="xs"
              icon="i-lucide-rotate-ccw"
              label="إعادة ضبط"
              class="w-full sm:w-auto justify-center"
              @click="resetFilters"
            />
          </div>
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div
        v-if="paginatedCourses.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center gap-3 border border-default rounded-lg bg-elevated/25"
      >
        <UIcon name="i-lucide-book-open" class="size-10 text-dimmed" />
        <div class="flex flex-col gap-1">
          <p class="font-semibold text-highlighted">لم يتم العثور على دورات مطابقة</p>
          <p class="text-sm text-muted">جرّب تعديل الفلاتر أو أنشئ دورة جديدة الآن.</p>
        </div>
        <div class="flex items-center gap-2 mt-2">
          <UButton
            v-if="hasActiveFilters"
            color="neutral"
            variant="outline"
            label="إلغاء التصفية"
            @click="resetFilters"
          />
          <UButton
            to="/teacher-dashboard/courses/new"
            icon="i-lucide-plus"
            label="إنشاء دورة جديدة"
          />
        </div>
      </div>

      <template v-else>
        <UTable
          :data="paginatedCourses"
          :columns="columns"
          class="shrink-0"
          :ui="{
            base: 'table-fixed border-separate border-spacing-0',
            thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
            tbody: '[&>tr]:last:[&>td]:border-b-0',
            th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e',
            td: 'border-b border-default'
          }"
        />

        <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto">
          <div class="text-sm text-muted">
            عرض {{ (currentPage - 1) * itemsPerPage + 1 }} إلى {{ Math.min(currentPage * itemsPerPage, filteredCourses.length) }} من {{ filteredCourses.length }} دورة
          </div>

          <UPagination
            v-model:page="currentPage"
            :items-per-page="itemsPerPage"
            :total="filteredCourses.length"
          />
        </div>
      </template>
    </template>
  </UDashboardPanel>
</template>
