<script setup lang="ts">
useHead({
  title: 'إدارة التصنيفات - لوحة التحكم'
})

interface Category {
  id: string
  name: string
  colorClass: string
  courses: number[]
}

interface Course {
  id: number
  title: string
  studentCount: number
  status: 'published' | 'draft'
  statusLabel: string
  thumbnailBg: string
}

// Categories list
const categories = ref<Category[]>([
  {
    id: 'cat-1',
    name: 'الصف الأول الثانوي',
    colorClass: 'bg-blue-600',
    courses: [1, 2]
  },
  {
    id: 'cat-2',
    name: 'الصف الثاني الثانوي',
    colorClass: 'bg-amber-500',
    courses: [3]
  },
  {
    id: 'cat-3',
    name: 'الصف الثالث الثانوي',
    colorClass: 'bg-emerald-600',
    courses: [4]
  }
])

// All courses available for assignment
const allCourses = ref<Course[]>([
  {
    id: 1,
    title: 'أساسيات الجبر',
    studentCount: 124,
    status: 'published',
    statusLabel: 'منشورة',
    thumbnailBg: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    title: 'دورة مكثفة في الهندسة',
    studentCount: 86,
    status: 'published',
    statusLabel: 'منشورة',
    thumbnailBg: 'bg-amber-100 text-amber-700'
  },
  {
    id: 3,
    title: 'الإحصاء والاحتمالات',
    studentCount: 42,
    status: 'published',
    statusLabel: 'منشورة',
    thumbnailBg: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 4,
    title: 'التفاضل والتكامل',
    studentCount: 0,
    status: 'draft',
    statusLabel: 'مسودة',
    thumbnailBg: 'bg-slate-100 text-slate-600'
  }
])

const selectedCategoryId = ref('cat-1')
const selectedCategory = computed(() => {
  return categories.value.find(c => c.id === selectedCategoryId.value) || categories.value[0]
})

const editingCategoryName = ref(selectedCategory.value?.name || '')
const searchQuery = ref('')
const newCategoryName = ref('')
const showDeleteModal = ref(false)
const isSaving = ref(false)

// Switch active category
function selectCategory(id: string) {
  selectedCategoryId.value = id
  const cat = categories.value.find(c => c.id === id)
  if (cat) {
    editingCategoryName.value = cat.name
  }
}

// Check if course belongs to the active category
function isCourseSelected(courseId: number): boolean {
  if (!selectedCategory.value) return false
  return selectedCategory.value.courses.includes(courseId)
}

// Toggle course membership in active category
function toggleCourse(courseId: number) {
  if (!selectedCategory.value) return
  const list = selectedCategory.value.courses
  const index = list.indexOf(courseId)
  if (index > -1) {
    list.splice(index, 1)
  } else {
    list.push(courseId)
  }
}

// Filtered courses based on search input
const filteredCourses = computed(() => {
  if (!searchQuery.value.trim()) return allCourses.value
  return allCourses.value.filter(course =>
    course.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Add new category
function addCategory() {
  const name = newCategoryName.value.trim()
  if (!name) return

  const colorPalette = [
    'bg-blue-600',
    'bg-amber-500',
    'bg-emerald-600',
    'bg-purple-600',
    'bg-rose-500',
    'bg-cyan-600'
  ]
  const randomColor = colorPalette[categories.value.length % colorPalette.length]

  const newId = `cat-${Date.now()}`
  categories.value.push({
    id: newId,
    name,
    colorClass: randomColor,
    courses: []
  })
  selectedCategoryId.value = newId
  editingCategoryName.value = name
  newCategoryName.value = ''
}

// Save active category name
function saveCategory() {
  if (selectedCategory.value && editingCategoryName.value.trim()) {
    selectedCategory.value.name = editingCategoryName.value.trim()
  }
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    alert('تم حفظ التصنيف بنجاح!')
  }, 400)
}

// Confirm deletion of active category
function confirmDeleteCategory() {
  const index = categories.value.findIndex(c => c.id === selectedCategoryId.value)
  if (index > -1) {
    categories.value.splice(index, 1)
    if (categories.value.length > 0) {
      selectCategory(categories.value[0].id)
    } else {
      selectedCategoryId.value = ''
      editingCategoryName.value = ''
    }
  }
  showDeleteModal.value = false
}
</script>

<template>
  <div class="p-6 sm:p-8 lg:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <UButton
          to="/teacher-dashboard/courses"
          color="neutral"
          variant="outline"
          size="sm"
          icon="i-lucide-arrow-right"
          class="rounded-xl"
          aria-label="رجوع إلى دوراتي"
        />
        <div class="flex flex-col gap-1">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            إدارة التصنيفات
          </h1>
          <p class="text-sm text-slate-500 font-medium">
            تنظيم الدورات وتصنيفها لتسهيل وصول الطلاب إلى المواد التعليمية.
          </p>
        </div>
      </div>

      <UButton
        to="/teacher-dashboard/courses"
        color="neutral"
        variant="outline"
        size="md"
        icon="i-lucide-arrow-right"
        class="font-bold rounded-xl self-start sm:self-auto"
      >
        رجوع إلى دوراتي
      </UButton>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Column 1: Categories List & Add Form (4 cols on lg) -->
      <div class="lg:col-span-4 flex flex-col gap-6 w-full">
        <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
          <template #header>
            <div class="flex flex-col gap-1">
              <h2 class="text-lg font-bold text-slate-900">
                التصنيفات
              </h2>
              <p class="text-xs text-slate-500 font-medium">
                اختر تصنيفاً لتعديل دوراته
              </p>
            </div>
          </template>

          <div class="flex flex-col gap-2.5">
            <div
              v-for="cat in categories"
              :key="cat.id"
              class="flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none"
              :class="selectedCategoryId === cat.id ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'"
              @click="selectCategory(cat.id)"
            >
              <div class="flex items-center gap-3 min-w-0">
                <span class="w-3 h-3 rounded-full shrink-0" :class="cat.colorClass" />
                <div class="flex flex-col min-w-0">
                  <span class="text-sm font-bold text-slate-900 truncate">{{ cat.name }}</span>
                  <span class="text-xs text-slate-500 font-medium">{{ cat.courses.length }} دورات</span>
                </div>
              </div>
              <UBadge
                :color="selectedCategoryId === cat.id ? 'primary' : 'neutral'"
                variant="subtle"
                size="sm"
                class="font-bold shrink-0"
              >
                {{ cat.courses.length }}
              </UBadge>
            </div>

            <div v-if="categories.length === 0" class="text-center py-6 text-sm text-slate-400">
              لا توجد تصنيفات حالياً. أضف أول تصنيف أدناه.
            </div>
          </div>

          <template #footer>
            <div class="flex flex-col gap-3 pt-1">
              <UFormField label="تصنيف جديد" class="font-bold text-slate-700">
                <UInput
                  v-model="newCategoryName"
                  placeholder="مثال: الصف الأول الإعدادي"
                  size="md"
                  class="w-full"
                  @keydown.enter.prevent="addCategory"
                />
              </UFormField>
              <UButton
                color="primary"
                variant="subtle"
                size="md"
                icon="i-lucide-plus"
                class="font-bold rounded-xl justify-center"
                :disabled="!newCategoryName.trim()"
                @click="addCategory"
              >
                إضافة تصنيف
              </UButton>
            </div>
          </template>
        </UCard>
      </div>

      <!-- Column 2: Selected Category Details & Courses Assignment (8 cols on lg) -->
      <div class="lg:col-span-8 flex flex-col gap-6 w-full">
        <UCard v-if="selectedCategory" class="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
          <template #header>
            <div class="flex items-center justify-between gap-4">
              <h2 class="text-lg font-bold text-slate-900">
                دورات هذا التصنيف
              </h2>
              <UBadge color="primary" variant="subtle" size="md" class="font-bold">
                {{ selectedCategory.courses.length }} دورات
              </UBadge>
            </div>
          </template>

          <div class="flex flex-col gap-6">
            <!-- Category Name Field -->
            <UFormField label="اسم التصنيف" class="font-bold text-slate-700">
              <UInput
                v-model="editingCategoryName"
                size="md"
                class="w-full"
              />
            </UFormField>

            <!-- Courses Selection Section -->
            <div class="flex flex-col gap-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div class="flex flex-col">
                  <span class="text-sm font-bold text-slate-900">
                    اختر الدورات التابعة لهذا التصنيف
                  </span>
                  <span class="text-xs text-slate-500 font-medium">
                    يمكن للدورة أن تنتمي إلى أكثر من تصنيف
                  </span>
                </div>
                <UBadge color="primary" variant="subtle" size="sm" class="font-bold self-start sm:self-auto">
                  تم اختيار {{ selectedCategory.courses.length }} من {{ allCourses.length }}
                </UBadge>
              </div>

              <!-- Search Input -->
              <UInput
                v-model="searchQuery"
                icon="i-lucide-search"
                placeholder="ابحث في الدورات"
                size="md"
                class="w-full"
              />

              <!-- Courses Checkbox List -->
              <div class="flex flex-col gap-2.5">
                <div
                  v-for="course in filteredCourses"
                  :key="course.id"
                  class="flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none"
                  :class="isCourseSelected(course.id) ? 'border-blue-300 bg-blue-50/40 ring-1 ring-blue-500/20' : 'border-slate-200 bg-white hover:bg-slate-50/70'"
                  @click="toggleCourse(course.id)"
                >
                  <div class="flex items-center gap-3 min-w-0 flex-1">
                    <UCheckbox
                      :model-value="isCourseSelected(course.id)"
                      color="primary"
                      class="pointer-events-none"
                    />
                    <div
                      class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      :class="course.thumbnailBg"
                    >
                      <UIcon name="i-lucide-book-open" class="w-5 h-5 shrink-0" />
                    </div>
                    <div class="flex flex-col min-w-0">
                      <span class="text-sm font-bold text-slate-900 truncate">{{ course.title }}</span>
                      <span class="text-xs text-slate-500 font-medium">{{ course.studentCount }} طالب</span>
                    </div>
                  </div>

                  <UBadge
                    :color="course.status === 'published' ? 'success' : 'warning'"
                    variant="subtle"
                    size="sm"
                    class="font-bold shrink-0"
                  >
                    {{ course.statusLabel }}
                  </UBadge>
                </div>

                <div v-if="filteredCourses.length === 0" class="text-center py-6 text-sm text-slate-400">
                  لا توجد دورات تطابق بحثك.
                </div>
              </div>

              <!-- Add New Course Link -->
              <UButton
                to="/teacher-dashboard/courses/new"
                variant="outline"
                color="primary"
                size="md"
                icon="i-lucide-plus"
                class="w-full border-dashed py-3 font-bold rounded-xl justify-center"
              >
                إضافة دورة جديدة إلى هذا التصنيف
              </UButton>
            </div>
          </div>

          <template #footer>
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <UButton
                  color="primary"
                  variant="solid"
                  size="md"
                  icon="i-lucide-check"
                  :loading="isSaving"
                  class="font-bold rounded-xl"
                  @click="saveCategory"
                >
                  حفظ التصنيف
                </UButton>
                <UButton
                  to="/teacher-dashboard/courses"
                  color="neutral"
                  variant="outline"
                  size="md"
                  class="font-bold rounded-xl"
                >
                  إلغاء
                </UButton>
              </div>

              <UButton
                color="error"
                variant="ghost"
                size="md"
                icon="i-lucide-trash-2"
                class="font-bold rounded-xl"
                @click="showDeleteModal = true"
              >
                حذف التصنيف
              </UButton>
            </div>
          </template>
        </UCard>

        <!-- Empty state if no category selected -->
        <UCard v-else class="border border-slate-200 shadow-sm rounded-2xl bg-white p-12 text-center">
          <div class="flex flex-col items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <UIcon name="i-lucide-folder-open" class="w-6 h-6" />
            </div>
            <p class="text-sm font-bold text-slate-600">الرجاء اختيار تصنيف أو إضافة تصنيف جديد</p>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="showDeleteModal">
      <template #content>
        <div class="p-6 flex flex-col gap-4">
          <div class="flex items-center gap-3 text-red-600">
            <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-red-600" />
            </div>
            <h3 class="text-lg font-bold text-slate-900">
              تأكيد حذف التصنيف
            </h3>
          </div>
          <p class="text-sm text-slate-600 leading-relaxed">
            هل تريد حذف هذا التصنيف؟ لن تُحذف الدورات، وستنتقل إلى «بدون تصنيف».
          </p>
          <div class="flex items-center justify-end gap-2 pt-2">
            <UButton
              color="neutral"
              variant="outline"
              size="md"
              class="rounded-xl font-bold"
              @click="showDeleteModal = false"
            >
              إلغاء
            </UButton>
            <UButton
              color="error"
              variant="solid"
              size="md"
              class="rounded-xl font-bold"
              @click="confirmDeleteCategory"
            >
              نعم، احذف
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>