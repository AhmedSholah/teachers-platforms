<script setup lang="ts">
import type { Classroom } from '~/composables/useClassrooms'

useHead({
  title: 'الفصول الدراسية - لوحة التحكم'
})

definePageMeta({
  alias: ['/teacher-dashboard/classes', '/teacher-dashboard/courses/categories']
})

const {
  classrooms,
  courses,
  addClassroom,
  updateClassroom,
  deleteClassroom
} = useClassrooms()

// Form & Search states
const newClassName = ref('')
const searchQuery = ref('')
const successMessage = ref('')
const errorMessage = ref('')

// Edit Modal states
const isEditModalOpen = ref(false)
const editingClassroomId = ref('')
const editingClassName = ref('')

// Delete Modal states
const isDeleteModalOpen = ref(false)
const classroomToDelete = ref<Classroom | null>(null)

function isClassroomExisting(name: string): boolean {
  const normalized = name.trim().toLowerCase()
  return classrooms.value.some(c => c.name.trim().toLowerCase() === normalized)
}

function getCourseCount(classroomName: string): number {
  return courses.value.filter(c => c.classroom === classroomName).length
}

function getStudentsCount(classroomName: string): number {
  return courses.value
    .filter(c => c.classroom === classroomName)
    .reduce((sum, c) => sum + (c.studentsCount || 0), 0)
}

function formatCoursesCount(count: number): string {
  if (count === 0) return 'لا توجد دورات'
  if (count === 1) return 'دورة واحدة'
  if (count === 2) return 'دورتان'
  if (count >= 3 && count <= 10) return `${count} دورات`
  return `${count} دورة`
}

function formatStudentsCount(count: number): string {
  if (count === 0) return '0 طالب'
  if (count === 1) return 'طالب واحد'
  if (count === 2) return 'طالبان'
  if (count >= 3 && count <= 10) return `${count} طلاب`
  return `${count} طالب`
}

function notifySuccess(msg: string) {
  successMessage.value = msg
  errorMessage.value = ''
  setTimeout(() => {
    successMessage.value = ''
  }, 3500)
}

function notifyError(msg: string) {
  errorMessage.value = msg
  setTimeout(() => {
    errorMessage.value = ''
  }, 4000)
}

function handleAddClassroom() {
  const trimmed = newClassName.value.trim()
  if (!trimmed) return

  if (isClassroomExisting(trimmed)) {
    notifyError(`فصل «${trimmed}» موجود بالفعل في قائمتك.`)
    return
  }

  addClassroom(trimmed)
  newClassName.value = ''
  notifySuccess(`تمت إضافة «${trimmed}» بنجاح!`)
}

function openEditModal(cls: Classroom) {
  editingClassroomId.value = cls.id
  editingClassName.value = cls.name
  isEditModalOpen.value = true
}

function handleSaveEdit() {
  const trimmed = editingClassName.value.trim()
  if (!trimmed) return

  const target = classrooms.value.find(c => c.id === editingClassroomId.value)
  if (!target) return

  if (trimmed === target.name) {
    isEditModalOpen.value = false
    return
  }

  // Check if new name conflicts with another classroom
  const conflict = classrooms.value.some(
    c => c.id !== editingClassroomId.value && c.name.trim().toLowerCase() === trimmed.toLowerCase()
  )
  if (conflict) {
    notifyError(`يوجد فصل آخر بالفعل باسم «${trimmed}».`)
    return
  }

  updateClassroom(editingClassroomId.value, trimmed)
  isEditModalOpen.value = false
  notifySuccess(`تم تحديث اسم الفصل إلى «${trimmed}» بنجاح!`)
}

function openDeleteModal(cls: Classroom) {
  classroomToDelete.value = cls
  isDeleteModalOpen.value = true
}

function handleConfirmDelete() {
  if (!classroomToDelete.value) return
  const deletedName = classroomToDelete.value.name
  deleteClassroom(classroomToDelete.value.id)
  isDeleteModalOpen.value = false
  classroomToDelete.value = null
  notifySuccess(`تم حذف فصل «${deletedName}» بنجاح.`)
}

const filteredClassrooms = computed(() => {
  if (!searchQuery.value.trim()) return classrooms.value
  const q = searchQuery.value.trim().toLowerCase()
  return classrooms.value.filter(c => c.name.toLowerCase().includes(q))
})
</script>

<template>
  <div class="p-6 sm:p-8 lg:p-10 flex flex-col gap-6 max-w-7xl mx-auto w-full box-border">
    <!-- Notifications -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <UAlert
        v-if="successMessage"
        color="success"
        variant="subtle"
        icon="i-lucide-check-circle"
        :title="successMessage"
        class="font-bold"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <UAlert
        v-if="errorMessage"
        color="error"
        variant="subtle"
        icon="i-lucide-alert-circle"
        :title="errorMessage"
        class="font-bold"
      />
    </Transition>

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
          <UIcon name="i-lucide-school" class="w-6 h-6" />
        </div>
        <div class="flex flex-col gap-0.5">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            الفصول الدراسية
          </h1>
          <p class="text-sm text-slate-500 font-medium">
            إدارة المراحل والصفوف الدراسية (مثل الأول الثانوي، الثاني الثانوي) لتصنيف وتنظيم دوراتك بسهولة.
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <UButton
          to="/teacher-dashboard/courses"
          color="neutral"
          variant="outline"
          size="md"
          icon="i-lucide-book-open"
          class="font-bold rounded-xl cursor-pointer"
        >
          عرض الدورات
        </UButton>
      </div>
    </div>

    <!-- Quick Add Classroom Card -->
    <UCard class="border border-slate-200 shadow-xs rounded-2xl bg-white overflow-hidden">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-plus-circle" class="w-5 h-5 text-blue-600" />
            <h2 class="text-base sm:text-lg font-bold text-slate-900 m-0">
              إضافة فصل دراسي جديد
            </h2>
          </div>
          <span class="text-xs text-slate-400 font-medium">
            اكتب اسم الفصل الدراسي
          </span>
        </div>
      </template>

      <div>
        <!-- Input Row -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          <UFormField label="اسم الفصل الدراسي" class="font-bold text-slate-700 flex-1">
            <UInput
              v-model="newClassName"
              icon="i-lucide-graduation-cap"
              placeholder="اكتب اسم الفصل هنا (مثال: الصف الأول الثانوي)"
              size="lg"
              class="w-full"
              @keydown.enter.prevent="handleAddClassroom"
            />
          </UFormField>

          <UButton
            color="primary"
            variant="solid"
            size="lg"
            icon="i-lucide-plus"
            class="font-bold rounded-xl shrink-0 justify-center cursor-pointer"
            :disabled="!newClassName.trim()"
            @click="handleAddClassroom"
          >
            إضافة الفصل
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Classrooms List Section -->
    <UCard class="border border-slate-200 shadow-xs rounded-2xl bg-white overflow-hidden">
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-layout-grid" class="w-4 h-4" />
            </div>
            <div class="flex items-center gap-2">
              <h2 class="text-base sm:text-lg font-bold text-slate-900 m-0">
                الفصول الدراسية الحالية
              </h2>
              <UBadge color="primary" variant="subtle" size="sm" class="font-bold">
                {{ classrooms.length }} فصول
              </UBadge>
            </div>
          </div>

          <!-- Search filter when classrooms exist -->
          <div v-if="classrooms.length > 2" class="w-full sm:w-64">
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              placeholder="بحث في الفصول..."
              size="sm"
              class="w-full"
            />
          </div>
        </div>
      </template>

      <!-- Classrooms Cards Grid -->
      <div v-if="filteredClassrooms.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="cls in filteredClassrooms"
          :key="cls.id"
          class="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between gap-4"
        >
          <!-- Top Row: Dot, Name, Actions -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <span class="w-4 h-4 rounded-full shrink-0 shadow-xs" :class="cls.colorClass" />
              <div class="flex flex-col min-w-0">
                <h3 class="text-base sm:text-lg font-bold text-slate-900 truncate m-0" :title="cls.name">
                  {{ cls.name }}
                </h3>
              </div>
            </div>

            <!-- Action buttons (Edit & Delete) -->
            <div class="flex items-center gap-1 shrink-0">
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                icon="i-lucide-pencil"
                class="font-bold text-slate-600 hover:text-blue-600 cursor-pointer"
                title="تعديل اسم الفصل"
                @click="openEditModal(cls)"
              />
              <UButton
                color="error"
                variant="ghost"
                size="xs"
                icon="i-lucide-trash-2"
                class="font-bold text-rose-500 hover:text-rose-700 cursor-pointer"
                title="حذف الفصل"
                @click="openDeleteModal(cls)"
              />
            </div>
          </div>

          <!-- Middle Row: Stats -->
          <div class="flex items-center gap-4 py-2 border-y border-slate-100 text-xs font-semibold text-slate-600">
            <div class="flex items-center gap-1.5">
              <UIcon name="i-lucide-book-open" class="w-4 h-4 text-blue-600 shrink-0" />
              <span>{{ formatCoursesCount(getCourseCount(cls.name)) }}</span>
            </div>
            <span class="text-slate-300">•</span>
            <div class="flex items-center gap-1.5">
              <UIcon name="i-lucide-users" class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{{ formatStudentsCount(getStudentsCount(cls.name)) }}</span>
            </div>
          </div>

          <!-- Bottom Row: Navigation Links -->
          <div class="flex items-center justify-between gap-2 pt-1">
            <UButton
              :to="`/teacher-dashboard/courses?classroom=${encodeURIComponent(cls.name)}`"
              variant="subtle"
              color="neutral"
              size="xs"
              icon="i-lucide-book-open"
              class="font-bold rounded-lg cursor-pointer"
            >
              عرض الدورات
            </UButton>
            <UButton
              :to="`/teacher-dashboard/courses/new?classroom=${encodeURIComponent(cls.name)}`"
              variant="ghost"
              color="primary"
              size="xs"
              icon="i-lucide-plus"
              class="font-bold rounded-lg cursor-pointer"
            >
              دورة جديدة
            </UButton>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 text-center flex flex-col items-center justify-center gap-3">
        <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <UIcon name="i-lucide-school" class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-bold text-slate-800 m-0">
          {{ searchQuery ? 'لم يتم العثور على فصول دراسية تطابق بحثك' : 'لا توجد فصول دراسية حتى الآن' }}
        </h3>
        <p class="text-sm text-slate-500 max-w-sm m-0">
          {{ searchQuery ? 'جرّب كتابة كلمة بحث أخرى أو امسح حقل البحث.' : 'أضف فصولك الدراسية مثل الصف الأول الثانوي أو الصف الثاني الثانوي من النموذج بالأعلى لتصنيف دوراتك.' }}
        </p>
      </div>
    </UCard>

    <!-- Edit Classroom Modal -->
    <UModal v-model:open="isEditModalOpen">
      <template #content>
        <div class="p-6 flex flex-col gap-5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-pencil" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <h3 class="text-lg font-bold text-slate-900 m-0">
                  تعديل الفصل الدراسي
                </h3>
                <span class="text-xs text-slate-500">
                  سيتم تحديث اسم الفصل وجميع الدورات التابعة له تلقائياً
                </span>
              </div>
            </div>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              class="cursor-pointer"
              @click="isEditModalOpen = false"
            />
          </div>

          <form class="flex flex-col gap-4" @submit.prevent="handleSaveEdit">
            <UFormField label="اسم الفصل الدراسي" required class="font-bold text-slate-700">
              <UInput
                v-model="editingClassName"
                placeholder="مثال: الصف الأول الثانوي"
                size="lg"
                class="w-full"
                autofocus
              />
            </UFormField>

            <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                class="font-bold rounded-xl cursor-pointer"
                @click="isEditModalOpen = false"
              >
                إلغاء
              </UButton>
              <UButton
                color="primary"
                variant="solid"
                size="md"
                icon="i-lucide-check"
                class="font-bold rounded-xl cursor-pointer"
                :disabled="!editingClassName.trim()"
                @click="handleSaveEdit"
              >
                حفظ التعديلات
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="isDeleteModalOpen">
      <template #content>
        <div class="p-6 flex flex-col gap-4">
          <div class="flex items-center gap-3 text-rose-600">
            <div class="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-rose-600 shrink-0" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 m-0">تأكيد حذف الفصل الدراسي</h3>
              <span class="text-xs text-slate-500">لا يمكن التراجع عن هذا الإجراء</span>
            </div>
          </div>
          <p class="text-sm text-slate-600 leading-relaxed m-0">
            هل أنت متأكد من حذف «{{ classroomToDelete?.name }}»؟ لن تُحذف الدورات المربوطة به، وستصبح مصنفة كـ «بدون فصل دراسي».
          </p>
          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <UButton
              color="neutral"
              variant="outline"
              size="md"
              class="rounded-xl font-bold cursor-pointer"
              @click="isDeleteModalOpen = false"
            >
              إلغاء
            </UButton>
            <UButton
              color="error"
              variant="solid"
              size="md"
              icon="i-lucide-trash-2"
              class="rounded-xl font-bold cursor-pointer"
              @click="handleConfirmDelete"
            >
              تأكيد الحذف
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
