<script setup lang="ts">
import type { AcademicStage, Classroom } from '~/composables/useClassrooms'

useHead({
  title: 'المراحل والصفوف الدراسية - لوحة التحكم'
})

definePageMeta({
  alias: ['/teacher-dashboard/classes', '/teacher-dashboard/courses/categories']
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const {
  stages,
  classrooms,
  courses,
  isLoading,
  hasLoaded,
  ensureLoaded,
  seedEgyptDefaults,
  addStage,
  updateStage,
  deleteStage,
  addClassroom,
  updateClassroom,
  deleteClassroom
} = useClassrooms()

await ensureLoaded()

const isMutating = ref(false)

function getApiErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object') {
    const maybeErr = err as { statusMessage?: string; data?: { statusMessage?: string; message?: string }; message?: string }
    return maybeErr.data?.statusMessage || maybeErr.statusMessage || maybeErr.data?.message || maybeErr.message || fallback
  }
  return fallback
}

const colorOptions = [
  { label: 'أزرق', class: 'bg-blue-600' },
  { label: 'كهرماني', class: 'bg-amber-500' },
  { label: 'زمردي', class: 'bg-emerald-600' },
  { label: 'بنفسجي', class: 'bg-purple-600' },
  { label: 'وردي', class: 'bg-rose-500' },
  { label: 'سماوي', class: 'bg-cyan-600' },
  { label: 'نيلي', class: 'bg-indigo-600' }
]

const standardStagePresets: Array<{ name: string; colorClass: string; grades: string[] }> = [
  {
    name: 'المرحلة الابتدائية',
    colorClass: 'bg-emerald-600',
    grades: [
      'الصف الأول الابتدائي',
      'الصف الثاني الابتدائي',
      'الصف الثالث الابتدائي',
      'الصف الرابع الابتدائي',
      'الصف الخامس الابتدائي',
      'الصف السادس الابتدائي'
    ]
  },
  {
    name: 'المرحلة الإعدادية',
    colorClass: 'bg-amber-500',
    grades: [
      'الصف الأول الإعدادي',
      'الصف الثاني الإعدادي',
      'الصف الثالث الإعدادي'
    ]
  },
  {
    name: 'المرحلة الثانوية',
    colorClass: 'bg-blue-600',
    grades: [
      'الصف الأول الثانوي',
      'الصف الثاني الثانوي',
      'الصف الثالث الثانوي'
    ]
  },
  {
    name: 'المرحلة الجامعية',
    colorClass: 'bg-indigo-600',
    grades: [
      'الفرقة الأولى',
      'الفرقة الثانية',
      'الفرقة الثالثة',
      'الفرقة الرابعة'
    ]
  }
]

// Search & Filter states
const searchQuery = ref('')
const selectedStageFilter = ref<string>('all')
const collapsedStageIds = ref<Record<string, boolean>>({})

// Inline Quick-Add Grade states (inside each stage card)
const activeInlineStageId = ref<string | null>(null)
const inlineGradeName = ref('')
const inlineGradeColor = ref('bg-blue-600')
const inlineGradeError = ref('')

// Add Stage Modal states
const isAddStageModalOpen = ref(false)
const newStageName = ref('')
const addStageError = ref('')

// Edit Stage Modal states
const isEditStageModalOpen = ref(false)
const editingStageId = ref('')
const editingStageName = ref('')
const editStageError = ref('')

// Delete Stage Modal states
const isDeleteStageModalOpen = ref(false)
const stageToDelete = ref<AcademicStage | null>(null)

// Add Classroom Modal states
const isAddGradeModalOpen = ref(false)
const modalGradeStageId = ref('')
const isModalStageKnown = ref(false)
const modalGradeName = ref('')
const modalGradeError = ref('')
const isSubmittingGrade = ref(false)

const selectedModalStage = computed(() => {
  return stages.value.find(s => s.id === modalGradeStageId.value)
})

// Edit Grade Modal states
const isEditGradeModalOpen = ref(false)
const editingGradeId = ref('')
const editingGradeStageId = ref('')
const editingGradeName = ref('')
const editingGradeColor = ref('bg-blue-600')
const editGradeError = ref('')

// Delete Grade Modal states
const isDeleteGradeModalOpen = ref(false)
const gradeToDelete = ref<Classroom | null>(null)

onMounted(() => {
  if (route.query.created) {
    toast.add({
      title: 'تمت الإضافة بنجاح',
      description: `تمت إضافة «${route.query.created}» إلى قائمتك.`,
      color: 'success'
    })
  }

  if (route.query.add === 'classroom' || route.query.add === 'grade' || route.query.add === 'true' || route.query.new === '1') {
    const stageId = typeof route.query.stageId === 'string' ? route.query.stageId : undefined
    openAddGradeModal(stageId)
  } else if (route.query.add === 'stage') {
    openAddStageModal()
  }
})

watch(() => route.query.add, (newVal) => {
  if (newVal === 'classroom' || newVal === 'grade' || newVal === 'true') {
    const stageId = typeof route.query.stageId === 'string' ? route.query.stageId : undefined
    openAddGradeModal(stageId)
  } else if (newVal === 'stage') {
    openAddStageModal()
  }
})

// Helper functions
function getStageGrades(stageId: string): Classroom[] {
  return classrooms.value.filter(c => c.stageId === stageId)
}

function getStageCoursesCount(stageId: string): number {
  const gradeNames = new Set(getStageGrades(stageId).map(g => g.name))
  return courses.value.filter(c => gradeNames.has(c.classroom)).length
}

function formatStagesCount(count: number): string {
  if (count === 0) return 'لا توجد مراحل'
  if (count === 1) return 'مرحلة واحدة'
  if (count === 2) return 'مرحلتان'
  if (count >= 3 && count <= 10) return `${count} مراحل`
  return `${count} مرحلة`
}

function formatGradesCount(count: number): string {
  if (count === 0) return 'لا توجد صفوف'
  if (count === 1) return 'صف واحد'
  if (count === 2) return 'صفان'
  if (count >= 3 && count <= 10) return `${count} صفوف`
  return `${count} صف`
}

function formatCoursesCount(count: number): string {
  if (count === 0) return 'لا توجد دورات'
  if (count === 1) return 'دورة واحدة'
  if (count === 2) return 'دورتان'
  if (count >= 3 && count <= 10) return `${count} دورات`
  return `${count} دورة`
}

function isStageCollapsed(stageId: string): boolean {
  if (searchQuery.value.trim()) return false
  return Boolean(collapsedStageIds.value[stageId])
}

function toggleStageCollapse(stageId: string) {
  collapsedStageIds.value[stageId] = !collapsedStageIds.value[stageId]
}

// Filtering
const filteredStages = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()

  return stages.value.filter((stage) => {
    if (selectedStageFilter.value !== 'all' && stage.id !== selectedStageFilter.value) {
      return false
    }
    if (!q) return true

    const stageMatches = stage.name.toLowerCase().includes(q)
    const hasMatchingGrade = getStageGrades(stage.id).some(g => g.name.toLowerCase().includes(q))
    return stageMatches || hasMatchingGrade
  })
})

function getVisibleGradesForStage(stage: AcademicStage): Classroom[] {
  const grades = getStageGrades(stage.id)
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return grades
  if (stage.name.toLowerCase().includes(q)) return grades
  return grades.filter(g => g.name.toLowerCase().includes(q))
}

function getSuggestedGradesForStage(stage: AcademicStage): string[] {
  const normalized = stage.name.trim().toLowerCase()
  const matched = standardStagePresets.find(p =>
    normalized.includes(p.name.replace('المرحلة ', '').toLowerCase())
  )
  if (!matched) return []

  const existingAll = new Set(classrooms.value.map(c => c.name.trim().toLowerCase()))
  return matched.grades.filter(g => !existingAll.has(g.toLowerCase()))
}

const stageSelectItems = computed(() => {
  return stages.value.map(s => ({
    label: s.name,
    value: s.id
  }))
})

// Inline Quick-Add Grade inside a stage
function openInlineGradeAdd(stageId: string) {
  collapsedStageIds.value[stageId] = false
  activeInlineStageId.value = stageId
  inlineGradeName.value = ''
  inlineGradeError.value = ''
  const nextColor = colorOptions[classrooms.value.length % colorOptions.length]?.class || 'bg-blue-600'
  inlineGradeColor.value = nextColor

  nextTick(() => {
    const inputEl = document.getElementById(`inline-grade-input-${stageId}`) as HTMLInputElement | null
    inputEl?.focus()
  })
}

function closeInlineGradeAdd() {
  activeInlineStageId.value = null
  inlineGradeName.value = ''
  inlineGradeError.value = ''
}

async function handleInlineGradeAdd(stageId: string) {
  if (isMutating.value) return
  const trimmed = inlineGradeName.value.trim()
  inlineGradeError.value = ''
  if (!trimmed) {
    inlineGradeError.value = 'يرجى كتابة اسم الصف الدراسي أولاً.'
    return
  }

  const duplicate = classrooms.value.some(c => c.name.trim().toLowerCase() === trimmed.toLowerCase())
  if (duplicate) {
    inlineGradeError.value = `الصف «${trimmed}» موجود بالفعل.`
    return
  }

  isMutating.value = true
  try {
    await addClassroom(trimmed, inlineGradeColor.value, stageId)
    inlineGradeName.value = ''
    inlineGradeColor.value = colorOptions[classrooms.value.length % colorOptions.length]?.class || 'bg-blue-600'

    toast.add({
      title: 'تمت إضافة الصف الدراسي',
      description: `تمت إضافة «${trimmed}» وحفظه بنجاح.`,
      color: 'success'
    })

    nextTick(() => {
      const inputEl = document.getElementById(`inline-grade-input-${stageId}`) as HTMLInputElement | null
      inputEl?.focus()
    })
  } catch (err) {
    inlineGradeError.value = getApiErrorMessage(err, 'تعذر إضافة الصف الدراسي.')
  } finally {
    isMutating.value = false
  }
}

async function handleQuickAddSuggestedGrade(stageId: string, gradeName: string) {
  if (isMutating.value) return
  const duplicate = classrooms.value.some(c => c.name.trim().toLowerCase() === gradeName.trim().toLowerCase())
  if (duplicate) return

  isMutating.value = true
  try {
    const color = colorOptions[classrooms.value.length % colorOptions.length]?.class || 'bg-blue-600'
    await addClassroom(gradeName, color, stageId)
    toast.add({
      title: 'تمت إضافة الصف',
      description: `تمت إضافة «${gradeName}» وحفظه بنجاح.`,
      color: 'success'
    })
  } catch (err) {
    toast.add({
      title: 'تعذر إضافة الصف',
      description: getApiErrorMessage(err, 'حدث خطأ أثناء الحفظ.'),
      color: 'error'
    })
  } finally {
    isMutating.value = false
  }
}

// Add Stage Modal handlers
function openAddStageModal() {
  newStageName.value = ''
  addStageError.value = ''
  isAddStageModalOpen.value = true
}

async function handleCreateStage() {
  if (isMutating.value) return
  const trimmed = newStageName.value.trim()
  addStageError.value = ''

  if (!trimmed) {
    addStageError.value = 'يرجى كتابة اسم المرحلة الدراسية.'
    return
  }

  const duplicateStage = stages.value.some(s => s.name.trim().toLowerCase() === trimmed.toLowerCase())
  if (duplicateStage) {
    addStageError.value = `توجد مرحلة دراسية بالفعل باسم «${trimmed}».`
    return
  }

  isMutating.value = true
  try {
    const defaultColor = colorOptions[stages.value.length % colorOptions.length]?.class || 'bg-blue-600'
    const createdStage = await addStage(trimmed, defaultColor)

    isAddStageModalOpen.value = false
    selectedStageFilter.value = 'all'
    if (createdStage) {
      collapsedStageIds.value[createdStage.id] = false
      openInlineGradeAdd(createdStage.id)
    }

    toast.add({
      title: 'تمت إضافة المرحلة الدراسية',
      description: `تم إنشاء «${trimmed}» — يمكنك إضافة صفوفها الآن.`,
      color: 'success'
    })
  } catch (err) {
    addStageError.value = getApiErrorMessage(err, 'تعذر حفظ المرحلة الدراسية.')
  } finally {
    isMutating.value = false
  }
}

// Edit Stage Modal handlers
function openEditStageModal(stage: AcademicStage) {
  editingStageId.value = stage.id
  editingStageName.value = stage.name
  editStageError.value = ''
  isEditStageModalOpen.value = true
}

async function handleSaveStageEdit() {
  if (isMutating.value) return
  const trimmed = editingStageName.value.trim()
  editStageError.value = ''
  if (!trimmed) {
    editStageError.value = 'يرجى كتابة اسم المرحلة.'
    return
  }

  const conflict = stages.value.some(
    s => s.id !== editingStageId.value && s.name.trim().toLowerCase() === trimmed.toLowerCase()
  )
  if (conflict) {
    editStageError.value = `توجد مرحلة أخرى بالفعل باسم «${trimmed}».`
    return
  }

  isMutating.value = true
  try {
    await updateStage(editingStageId.value, {
      name: trimmed
    })
    isEditStageModalOpen.value = false
    toast.add({
      title: 'تم تحديث المرحلة',
      description: `تم تحديث بيانات «${trimmed}» بنجاح.`,
      color: 'success'
    })
  } catch (err) {
    editStageError.value = getApiErrorMessage(err, 'تعذر تحديث المرحلة.')
  } finally {
    isMutating.value = false
  }
}

// Delete Stage Modal handlers
function openDeleteStageModal(stage: AcademicStage) {
  stageToDelete.value = stage
  isDeleteStageModalOpen.value = true
}

async function handleConfirmDeleteStage() {
  if (!stageToDelete.value || isMutating.value) return
  const deletedName = stageToDelete.value.name
  const deletedId = stageToDelete.value.id

  isMutating.value = true
  try {
    await deleteStage(deletedId)
    if (selectedStageFilter.value === deletedId) {
      selectedStageFilter.value = 'all'
    }
    isDeleteStageModalOpen.value = false
    stageToDelete.value = null
    toast.add({
      title: 'تم حذف المرحلة',
      description: `تم حذف «${deletedName}» وصفوفها بنجاح.`,
      color: 'neutral'
    })
  } catch (err) {
    toast.add({
      title: 'تعذر حذف المرحلة',
      description: getApiErrorMessage(err, 'حدث خطأ أثناء الحذف.'),
      color: 'error'
    })
  } finally {
    isMutating.value = false
  }
}

// Add Classroom Modal (from ActionBar or Stage Header)
function openAddGradeModal(stageId?: string) {
  if (stages.value.length === 0) {
    toast.add({
      title: 'يرجى إنشاء مرحلة دراسية أولاً',
      description: 'لتنظيم الفصول، أضف المرحلة التعليمية (مثل الثانوية أو الإعدادية) ثم أضف فصولها.',
      color: 'warning'
    })
    openAddStageModal()
    return
  }
  if (stageId && stages.value.some(s => s.id === stageId)) {
    modalGradeStageId.value = stageId
    isModalStageKnown.value = true
  } else if (selectedStageFilter.value !== 'all' && stages.value.some(s => s.id === selectedStageFilter.value)) {
    modalGradeStageId.value = selectedStageFilter.value
    isModalStageKnown.value = true
  } else {
    modalGradeStageId.value = stages.value[0]?.id || ''
    isModalStageKnown.value = stages.value.length === 1
  }

  modalGradeName.value = ''
  modalGradeError.value = ''
  isAddGradeModalOpen.value = true
}

async function handleModalAddGrade() {
  if (isSubmittingGrade.value) return
  const trimmed = modalGradeName.value.trim()
  modalGradeError.value = ''

  if (!modalGradeStageId.value) {
    modalGradeError.value = 'يرجى اختيار المرحلة الدراسية.'
    return
  }
  if (!trimmed) {
    modalGradeError.value = 'يرجى كتابة اسم الفصل الدراسي أولاً.'
    return
  }

  const duplicate = classrooms.value.some(c => c.name.trim().toLowerCase() === trimmed.toLowerCase())
  if (duplicate) {
    modalGradeError.value = `يوجد فصل دراسي آخر بالفعل باسم «${trimmed}».`
    return
  }

  isSubmittingGrade.value = true
  try {
    const defaultColor = colorOptions[classrooms.value.length % colorOptions.length]?.class || 'bg-blue-600'
    await addClassroom(
      trimmed,
      defaultColor,
      modalGradeStageId.value
    )

    collapsedStageIds.value[modalGradeStageId.value] = false
    isAddGradeModalOpen.value = false
    if (route.query.add) {
      const query = { ...route.query }
      delete query.add
      delete query.stageId
      router.replace({ query })
    }
    toast.add({
      title: 'تمت إضافة الفصل الدراسي',
      description: `تمت إضافة «${trimmed}» وحفظه بنجاح.`,
      color: 'success'
    })
  } catch (err) {
    modalGradeError.value = getApiErrorMessage(err, 'تعذر إضافة الفصل الدراسي، يرجى المحاولة مرة أخرى.')
  } finally {
    isSubmittingGrade.value = false
  }
}

// Edit Grade Modal handlers
function openEditGradeModal(grade: Classroom) {
  editingGradeId.value = grade.id
  editingGradeStageId.value = grade.stageId
  editingGradeName.value = grade.name
  editingGradeColor.value = grade.colorClass
  editGradeError.value = ''
  isEditGradeModalOpen.value = true
}

async function handleSaveGradeEdit() {
  if (isMutating.value) return
  const trimmed = editingGradeName.value.trim()
  editGradeError.value = ''
  if (!trimmed) {
    editGradeError.value = 'يرجى كتابة اسم الصف الدراسي.'
    return
  }

  const conflict = classrooms.value.some(
    c => c.id !== editingGradeId.value && c.name.trim().toLowerCase() === trimmed.toLowerCase()
  )
  if (conflict) {
    editGradeError.value = `يوجد صف آخر بالفعل باسم «${trimmed}».`
    return
  }

  isMutating.value = true
  try {
    await updateClassroom(editingGradeId.value, trimmed, {
      colorClass: editingGradeColor.value,
      stageId: editingGradeStageId.value
    })
    isEditGradeModalOpen.value = false
    toast.add({
      title: 'تم تحديث الصف الدراسي',
      description: `تم حفظ التعديلات على «${trimmed}» بنجاح.`,
      color: 'success'
    })
  } catch (err) {
    editGradeError.value = getApiErrorMessage(err, 'تعذر تحديث الصف الدراسي.')
  } finally {
    isMutating.value = false
  }
}

// Delete Grade Modal handlers
function openDeleteGradeModal(grade: Classroom) {
  gradeToDelete.value = grade
  isDeleteGradeModalOpen.value = true
}

async function handleConfirmDeleteGrade() {
  if (!gradeToDelete.value || isMutating.value) return
  const deletedName = gradeToDelete.value.name
  isMutating.value = true
  try {
    await deleteClassroom(gradeToDelete.value.id)
    isDeleteGradeModalOpen.value = false
    gradeToDelete.value = null
    toast.add({
      title: 'تم حذف الصف الدراسي',
      description: `تم حذف «${deletedName}» بنجاح.`,
      color: 'neutral'
    })
  } catch (err) {
    toast.add({
      title: 'تعذر حذف الصف الدراسي',
      description: getApiErrorMessage(err, 'حدث خطأ أثناء الحذف.'),
      color: 'error'
    })
  } finally {
    isMutating.value = false
  }
}

async function handleRestoreEgyptStages() {
  if (isMutating.value) return
  isMutating.value = true
  try {
    await seedEgyptDefaults(false)
    toast.add({
      title: 'تمت استعادة المراحل المصرية',
      description: 'تمت إضافة المرحلة الابتدائية والإعدادية والثانوية بجميع صفوفها.',
      color: 'success'
    })
  } catch (err) {
    toast.add({
      title: 'تعذر الاستعادة',
      description: getApiErrorMessage(err, 'حدث خطأ أثناء تعبئة البيانات.'),
      color: 'error'
    })
  } finally {
    isMutating.value = false
  }
}
</script>

<template>
  <div class="flex flex-col min-h-full">
    <!-- Sub-navbar Action Bar -->
    <DashboardActionBar max-width="max-w-none" container-class="px-6 md:px-10">
      <UButton
        color="primary"
        variant="solid"
        size="md"
        icon="i-lucide-plus"
        class="font-bold rounded-xl cursor-pointer shadow-sm shadow-blue-500/20"
        @click="openAddGradeModal()"
      >
        إضافة فصل دراسي
      </UButton>

      <UButton
        color="neutral"
        variant="outline"
        size="md"
        icon="i-lucide-folder-plus"
        class="font-bold rounded-xl cursor-pointer"
        @click="openAddStageModal"
      >
        إضافة مرحلة دراسية
      </UButton>

      <template #end>
        <UButton
          to="/teacher-dashboard/courses"
          color="neutral"
          variant="ghost"
          size="md"
          icon="i-lucide-book-open"
          class="font-bold rounded-xl cursor-pointer"
        >
          عرض الدورات
        </UButton>
      </template>
    </DashboardActionBar>

    <div class="p-6 md:p-10 flex flex-col gap-6 w-full box-border">
      <!-- Search & Stage Filter Toolbar -->
      <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col gap-3.5">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div class="w-full md:w-80">
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              placeholder="ابحث عن مرحلة أو صف دراسي..."
              size="md"
              class="w-full"
            />
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <UBadge color="primary" variant="subtle" size="md" class="font-bold px-3 py-1">
              {{ formatStagesCount(stages.length) }}
            </UBadge>
            <UBadge color="neutral" variant="subtle" size="md" class="font-bold px-3 py-1">
              {{ formatGradesCount(classrooms.length) }}
            </UBadge>
          </div>
        </div>

        <!-- Stage Filter Pills -->
        <div v-if="stages.length > 0" class="flex items-center gap-2 flex-wrap pt-3 border-t border-slate-100">
          <span class="text-xs font-bold text-slate-500 me-1">تصفية حسب المرحلة:</span>
          <UButton
            size="xs"
            :color="selectedStageFilter === 'all' ? 'primary' : 'neutral'"
            :variant="selectedStageFilter === 'all' ? 'solid' : 'subtle'"
            class="rounded-lg font-bold cursor-pointer"
            @click="selectedStageFilter = 'all'"
          >
            كل المراحل
          </UButton>
          <UButton
            v-for="stage in stages"
            :key="stage.id"
            size="xs"
            :color="selectedStageFilter === stage.id ? 'primary' : 'neutral'"
            :variant="selectedStageFilter === stage.id ? 'solid' : 'subtle'"
            class="rounded-lg font-bold cursor-pointer gap-1.5"
            @click="selectedStageFilter = stage.id"
          >
            <span class="w-2 h-2 rounded-full shrink-0" :class="stage.colorClass" />
            <span>{{ stage.name }}</span>
            <span class="opacity-70">({{ getStageGrades(stage.id).length }})</span>
          </UButton>
        </div>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="isLoading && !hasLoaded" class="flex flex-col gap-5">
        <UCard v-for="n in 2" :key="n" class="border border-slate-200 rounded-2xl bg-white">
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <USkeleton class="w-10 h-10 rounded-xl" />
                <USkeleton class="w-40 h-5 rounded-lg" />
              </div>
              <USkeleton class="w-24 h-8 rounded-xl" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <USkeleton v-for="card in 3" :key="card" class="h-32 rounded-xl" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Stages List -->
      <div v-else-if="filteredStages.length > 0" class="flex flex-col gap-5">
        <div
          v-for="stage in filteredStages"
          :key="stage.id"
          class="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden transition-all"
        >
          <!-- Stage Header -->
          <div class="px-5 py-4 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              class="flex items-center gap-3 min-w-0 text-start cursor-pointer group"
              @click="toggleStageCollapse(stage.id)"
            >
              <div
                class="w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0 shadow-xs"
                :class="stage.colorClass"
              >
                <UIcon name="i-lucide-layers" class="w-5 h-5" />
              </div>

              <div class="flex flex-col min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <h2 class="text-base sm:text-lg font-extrabold text-slate-900 m-0 group-hover:text-blue-600 transition-colors">
                    {{ stage.name }}
                  </h2>
                  <UBadge color="neutral" variant="subtle" size="xs" class="font-bold">
                    {{ formatGradesCount(getStageGrades(stage.id).length) }}
                  </UBadge>
                  <UBadge v-if="getStageCoursesCount(stage.id) > 0" color="primary" variant="subtle" size="xs" class="font-bold">
                    {{ formatCoursesCount(getStageCoursesCount(stage.id)) }}
                  </UBadge>
                </div>
                <p v-if="stage.description" class="text-xs text-slate-500 m-0 mt-0.5 truncate">
                  {{ stage.description }}
                </p>
              </div>
            </button>

            <!-- Stage Actions -->
            <div class="flex items-center gap-1.5 shrink-0">
              <UButton
                color="primary"
                variant="soft"
                size="sm"
                icon="i-lucide-plus"
                class="font-bold rounded-xl cursor-pointer"
                @click="openAddGradeModal(stage.id)"
              >
                إضافة صف
              </UButton>

              <UTooltip text="تعديل المرحلة">
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  icon="i-lucide-pencil"
                  class="text-slate-500 hover:text-blue-600 cursor-pointer"
                  aria-label="تعديل المرحلة"
                  @click="openEditStageModal(stage)"
                />
              </UTooltip>

              <UTooltip text="حذف المرحلة">
                <UButton
                  color="error"
                  variant="ghost"
                  size="sm"
                  icon="i-lucide-trash-2"
                  class="text-rose-500 hover:text-rose-700 cursor-pointer"
                  aria-label="حذف المرحلة"
                  @click="openDeleteStageModal(stage)"
                />
              </UTooltip>

              <UButton
                color="neutral"
                variant="ghost"
                size="sm"
                icon="i-lucide-chevron-down"
                class="text-slate-400 cursor-pointer transition-transform duration-200"
                :class="{ 'rotate-180': isStageCollapsed(stage.id) }"
                aria-label="طي أو توسيع المرحلة"
                @click="toggleStageCollapse(stage.id)"
              />
            </div>
          </div>

          <!-- Stage Body -->
          <div v-show="!isStageCollapsed(stage.id)" class="p-5 flex flex-col gap-4">
            <!-- Inline Quick-Add Grade Bar (shown when activated or when stage has no grades) -->
            <div
              v-if="activeInlineStageId === stage.id || (getStageGrades(stage.id).length === 0 && !searchQuery.trim())"
              class="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 flex flex-col gap-3"
            >
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-800">
                  <UIcon name="i-lucide-plus-circle" class="w-4 h-4 shrink-0" />
                  <span>إضافة صف دراسي جديد داخل «{{ stage.name }}»</span>
                </div>
                <UButton
                  v-if="getStageGrades(stage.id).length > 0"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  icon="i-lucide-x"
                  class="cursor-pointer"
                  @click="closeInlineGradeAdd"
                />
              </div>

              <form class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3" @submit.prevent="handleInlineGradeAdd(stage.id)">
                <UInput
                  :id="`inline-grade-input-${stage.id}`"
                  v-model="inlineGradeName"
                  placeholder="اكتب اسم الصف الدراسي (مثال: الصف الأول الثانوي)..."
                  size="md"
                  class="flex-1 bg-white rounded-lg"
                  @update:model-value="inlineGradeError = ''"
                />

                <!-- Compact Color Picker -->
                <div class="flex items-center gap-1.5 px-1">
                  <button
                    v-for="color in colorOptions"
                    :key="color.class"
                    type="button"
                    class="w-6 h-6 rounded-full transition-transform cursor-pointer shrink-0"
                    :class="[
                      color.class,
                      inlineGradeColor === color.class
                        ? 'ring-2 ring-offset-2 ring-blue-600 scale-110'
                        : 'opacity-75 hover:opacity-100'
                    ]"
                    :title="color.label"
                    @click="inlineGradeColor = color.class"
                  />
                </div>

                <UButton
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="md"
                  icon="i-lucide-check"
                  class="font-bold rounded-xl justify-center cursor-pointer shrink-0"
                  :disabled="!inlineGradeName.trim()"
                >
                  إضافة الصف
                </UButton>
              </form>

              <p v-if="inlineGradeError" class="text-xs font-bold text-rose-600 m-0">
                {{ inlineGradeError }}
              </p>

              <!-- 1-click suggested grades for common stages -->
              <div
                v-if="getSuggestedGradesForStage(stage).length > 0"
                class="flex items-center gap-1.5 flex-wrap pt-1 border-t border-blue-200/60"
              >
                <span class="text-xs font-bold text-slate-600 me-1">إضافة سريعة:</span>
                <UButton
                  v-for="suggested in getSuggestedGradesForStage(stage)"
                  :key="suggested"
                  type="button"
                  size="xs"
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-plus"
                  class="bg-white rounded-lg font-bold cursor-pointer"
                  @click="handleQuickAddSuggestedGrade(stage.id, suggested)"
                >
                  {{ suggested }}
                </UButton>
              </div>
            </div>

            <!-- Grades Grid -->
            <div
              v-if="getVisibleGradesForStage(stage).length > 0"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              <div
                v-for="grade in getVisibleGradesForStage(stage)"
                :key="grade.id"
                class="group px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:border-blue-400 hover:shadow-xs transition-all flex items-center justify-between gap-2"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <span class="w-3 h-3 rounded-full shrink-0 shadow-2xs" :class="grade.colorClass" />
                  <h3 class="text-sm sm:text-base font-bold text-slate-900 truncate m-0" :title="grade.name">
                    {{ grade.name }}
                  </h3>
                </div>

                <div class="flex items-center gap-0.5 shrink-0">
                  <UButton
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    icon="i-lucide-pencil"
                    class="text-slate-500 hover:text-blue-600 cursor-pointer"
                    aria-label="تعديل الصف"
                    @click="openEditGradeModal(grade)"
                  />
                  <UButton
                    color="error"
                    variant="ghost"
                    size="xs"
                    icon="i-lucide-trash-2"
                    class="text-rose-500 hover:text-rose-700 cursor-pointer"
                    aria-label="حذف الصف"
                    @click="openDeleteGradeModal(grade)"
                  />
                </div>
              </div>

              <!-- Dashed Quick-Add Slot at end of grid -->
              <button
                v-if="!searchQuery.trim()"
                type="button"
                class="px-4 py-3.5 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600 cursor-pointer"
                @click="openAddGradeModal(stage.id)"
              >
                <UIcon name="i-lucide-plus" class="w-4 h-4 shrink-0" />
                <span class="text-xs font-bold">إضافة صف في {{ stage.name }}</span>
              </button>
            </div>

            <!-- Empty search state inside stage -->
            <p
              v-else-if="getStageGrades(stage.id).length > 0 && searchQuery.trim()"
              class="text-xs text-slate-500 m-0 py-2"
            >
              لا توجد صفوف مطابقة لبحثك داخل هذه المرحلة.
            </p>
          </div>
        </div>
      </div>

      <!-- Empty State (no stages at all or no search match) -->
      <UCard v-else class="border border-slate-200 shadow-xs rounded-2xl bg-white">
        <div class="p-10 text-center flex flex-col items-center justify-center gap-3">
          <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <UIcon name="i-lucide-layers" class="w-8 h-8" />
          </div>
          <h3 class="text-lg font-bold text-slate-800 m-0">
            {{ searchQuery ? 'لم يتم العثور على مراحل أو صفوف مطابقة' : 'ابدأ بإضافة المرحلة الدراسية الأولى' }}
          </h3>
          <p class="text-sm text-slate-500 max-w-md m-0">
            {{
              searchQuery
                ? 'جرّب البحث بكلمة أخرى أو امسح مربع البحث لعرض جميع المراحل.'
                : 'أنشئ المراحل الدراسية (مثل المرحلة الإعدادية أو الثانوية) ثم أضف بداخلها الصفوف الدراسية لتنظيم دوراتك.'
            }}
          </p>
          <div class="flex items-center justify-center gap-2.5 flex-wrap mt-2">
            <UButton
              v-if="searchQuery"
              color="neutral"
              variant="outline"
              size="md"
              icon="i-lucide-rotate-ccw"
              class="font-bold rounded-xl cursor-pointer"
              @click="searchQuery = ''; selectedStageFilter = 'all'"
            >
              مسح البحث
            </UButton>
            <template v-else>
              <UButton
                color="primary"
                variant="solid"
                size="md"
                icon="i-lucide-folder-plus"
                class="font-bold rounded-xl cursor-pointer"
                @click="openAddStageModal"
              >
                إضافة مرحلة دراسية
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                icon="i-lucide-sparkles"
                class="font-bold rounded-xl cursor-pointer"
                :loading="isMutating"
                @click="handleRestoreEgyptStages"
              >
                تعبئة المراحل المصرية الافتراضية
              </UButton>
            </template>
          </div>
        </div>
      </UCard>

      <!-- ================================================== -->
      <!-- Modal: Add Stage                                   -->
      <!-- ================================================== -->
      <UModal v-model:open="isAddStageModalOpen">
        <template #content>
          <div class="p-6 flex flex-col gap-5">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-folder-plus" class="w-5 h-5" />
                </div>
                <h3 class="text-lg font-bold text-slate-900 m-0">
                  إضافة مرحلة دراسية جديدة
                </h3>
              </div>
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="xs"
                class="cursor-pointer"
                @click="isAddStageModalOpen = false"
              />
            </div>

            <form class="flex flex-col gap-4" @submit.prevent="handleCreateStage">
              <UFormField label="اسم المرحلة الدراسية" required class="font-bold text-slate-700">
                <UInput
                  v-model="newStageName"
                  placeholder="مثال: المرحلة الابتدائية، المرحلة الثانوية..."
                  size="lg"
                  class="w-full"
                  autofocus
                  @update:model-value="addStageError = ''"
                />
              </UFormField>

              <UAlert
                v-if="addStageError"
                color="error"
                variant="subtle"
                icon="i-lucide-alert-circle"
                :title="addStageError"
                class="font-bold"
              />

              <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <UButton
                  type="button"
                  color="neutral"
                  variant="outline"
                  size="md"
                  class="font-bold rounded-xl cursor-pointer"
                  @click="isAddStageModalOpen = false"
                >
                  إلغاء
                </UButton>
                <UButton
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="md"
                  icon="i-lucide-check"
                  class="font-bold rounded-xl cursor-pointer"
                  :disabled="!newStageName.trim()"
                >
                  حفظ المرحلة
                </UButton>
              </div>
            </form>
          </div>
        </template>
      </UModal>

      <!-- ================================================== -->
      <!-- Modal: Edit Stage                                  -->
      <!-- ================================================== -->
      <UModal v-model:open="isEditStageModalOpen">
        <template #content>
          <div class="p-6 flex flex-col gap-5">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-pencil" class="w-5 h-5" />
                </div>
                <h3 class="text-lg font-bold text-slate-900 m-0">
                  تعديل المرحلة الدراسية
                </h3>
              </div>
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="xs"
                class="cursor-pointer"
                @click="isEditStageModalOpen = false"
              />
            </div>

            <form class="flex flex-col gap-4" @submit.prevent="handleSaveStageEdit">
              <UFormField label="اسم المرحلة الدراسية" required class="font-bold text-slate-700">
                <UInput
                  v-model="editingStageName"
                  size="lg"
                  class="w-full"
                  autofocus
                  @update:model-value="editStageError = ''"
                />
              </UFormField>

              <UAlert
                v-if="editStageError"
                color="error"
                variant="subtle"
                icon="i-lucide-alert-circle"
                :title="editStageError"
                class="font-bold"
              />

              <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <UButton
                  type="button"
                  color="neutral"
                  variant="outline"
                  size="md"
                  class="font-bold rounded-xl cursor-pointer"
                  @click="isEditStageModalOpen = false"
                >
                  إلغاء
                </UButton>
                <UButton
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="md"
                  icon="i-lucide-check"
                  class="font-bold rounded-xl cursor-pointer"
                  :disabled="!editingStageName.trim()"
                >
                  حفظ التعديلات
                </UButton>
              </div>
            </form>
          </div>
        </template>
      </UModal>

      <!-- ================================================== -->
      <!-- Modal: Delete Stage                                -->
      <!-- ================================================== -->
      <UModal v-model:open="isDeleteStageModalOpen">
        <template #content>
          <div class="p-6 flex flex-col gap-4">
            <div class="flex items-center gap-3 text-rose-600">
              <div class="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-rose-600 shrink-0" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-900 m-0">تأكيد حذف المرحلة الدراسية</h3>
                <span class="text-xs text-slate-500">لا يمكن التراجع عن هذا الإجراء</span>
              </div>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed m-0">
              هل أنت متأكد من حذف «{{ stageToDelete?.name }}»؟ سيتم حذف الصفوف التابعة لها ({{ stageToDelete ? formatGradesCount(getStageGrades(stageToDelete.id).length) : '' }})، وستبقى الدورات المربوطة بها تحت تصنيف «بدون فصل دراسي».
            </p>
            <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                class="rounded-xl font-bold cursor-pointer"
                @click="isDeleteStageModalOpen = false"
              >
                إلغاء
              </UButton>
              <UButton
                color="error"
                variant="solid"
                size="md"
                icon="i-lucide-trash-2"
                class="rounded-xl font-bold cursor-pointer"
                @click="handleConfirmDeleteStage"
              >
                تأكيد الحذف
              </UButton>
            </div>
          </div>
        </template>
      </UModal>

      <!-- ================================================== -->
      <!-- Modal: Add Classroom / Grade                       -->
      <!-- ================================================== -->
      <UModal v-model:open="isAddGradeModalOpen">
        <template #content>
          <div class="p-6 flex flex-col gap-5">
            <!-- Modal Header -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-school" class="w-5 h-5" />
                </div>
                <div class="flex flex-col">
                  <h3 class="text-lg font-bold text-slate-900 m-0">
                    إضافة فصل دراسي جديد
                  </h3>
                  <span v-if="isModalStageKnown && selectedModalStage" class="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span class="w-2 h-2 rounded-full shrink-0" :class="selectedModalStage.colorClass" />
                    <span>في {{ selectedModalStage.name }}</span>
                  </span>
                  <span v-else class="text-xs text-slate-500">
                    أدخل اسم الفصل الدراسي لإضافته
                  </span>
                </div>
              </div>
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="xs"
                class="cursor-pointer"
                @click="isAddGradeModalOpen = false"
              />
            </div>

            <!-- Error Alert -->
            <UAlert
              v-if="modalGradeError"
              color="error"
              variant="subtle"
              icon="i-lucide-alert-circle"
              :title="modalGradeError"
              class="font-bold"
            />

            <form class="flex flex-col gap-4" @submit.prevent="handleModalAddGrade()">
              <!-- Stage Selector (only when stage isn't already known from context) -->
              <UFormField
                v-if="!isModalStageKnown && stageSelectItems.length > 1"
                label="المرحلة الدراسية"
                required
                class="font-bold text-slate-700"
              >
                <USelect
                  v-model="modalGradeStageId"
                  :items="stageSelectItems"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <!-- Classroom Name -->
              <UFormField
                label="اسم الفصل أو الصف الدراسي"
                required
                class="font-bold text-slate-700"
              >
                <UInput
                  v-model="modalGradeName"
                  icon="i-lucide-graduation-cap"
                  placeholder="مثال: الصف الأول الثانوي"
                  size="lg"
                  class="w-full"
                  autofocus
                  @update:model-value="modalGradeError = ''"
                  @keydown.enter.prevent="handleModalAddGrade()"
                />
              </UFormField>

              <!-- Footer Buttons -->
              <div class="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <UButton
                  type="button"
                  color="neutral"
                  variant="outline"
                  size="md"
                  class="font-bold rounded-xl cursor-pointer"
                  @click="isAddGradeModalOpen = false"
                >
                  إلغاء
                </UButton>

                <UButton
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="md"
                  icon="i-lucide-check"
                  class="font-bold rounded-xl cursor-pointer shadow-sm shadow-blue-500/20"
                  :disabled="!modalGradeName.trim() || isSubmittingGrade"
                  :loading="isSubmittingGrade"
                >
                  حفظ وإنشاء الفصل
                </UButton>
              </div>
            </form>
          </div>
        </template>
      </UModal>

      <!-- ================================================== -->
      <!-- Modal: Edit Grade                                  -->
      <!-- ================================================== -->
      <UModal v-model:open="isEditGradeModalOpen">
        <template #content>
          <div class="p-6 flex flex-col gap-5">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-pencil" class="w-5 h-5" />
                </div>
                <div class="flex flex-col">
                  <h3 class="text-lg font-bold text-slate-900 m-0">
                    تعديل الصف الدراسي
                  </h3>
                  <span class="text-xs text-slate-500">
                    سيتم تحديث اسم الصف في جميع الدورات التابعة له تلقائياً
                  </span>
                </div>
              </div>
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="xs"
                class="cursor-pointer"
                @click="isEditGradeModalOpen = false"
              />
            </div>

            <form class="flex flex-col gap-4" @submit.prevent="handleSaveGradeEdit">
              <UFormField label="المرحلة الدراسية" required class="font-bold text-slate-700">
                <USelect
                  v-model="editingGradeStageId"
                  :items="stageSelectItems"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="اسم الصف الدراسي" required class="font-bold text-slate-700">
                <UInput
                  v-model="editingGradeName"
                  placeholder="مثال: الصف الأول الثانوي"
                  size="lg"
                  class="w-full"
                  autofocus
                  @update:model-value="editGradeError = ''"
                />
              </UFormField>

              <div class="flex flex-col gap-2">
                <span class="text-xs font-bold text-slate-700">لون التمييز:</span>
                <div class="flex items-center gap-2.5 flex-wrap">
                  <button
                    v-for="color in colorOptions"
                    :key="color.class"
                    type="button"
                    class="w-7 h-7 rounded-full transition-transform cursor-pointer"
                    :class="[
                      color.class,
                      editingGradeColor === color.class
                        ? 'ring-2 ring-offset-2 ring-blue-600 scale-110'
                        : 'opacity-75 hover:opacity-100'
                    ]"
                    :title="color.label"
                    @click="editingGradeColor = color.class"
                  />
                </div>
              </div>

              <UAlert
                v-if="editGradeError"
                color="error"
                variant="subtle"
                icon="i-lucide-alert-circle"
                :title="editGradeError"
                class="font-bold"
              />

              <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <UButton
                  type="button"
                  color="neutral"
                  variant="outline"
                  size="md"
                  class="font-bold rounded-xl cursor-pointer"
                  @click="isEditGradeModalOpen = false"
                >
                  إلغاء
                </UButton>
                <UButton
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="md"
                  icon="i-lucide-check"
                  class="font-bold rounded-xl cursor-pointer"
                  :disabled="!editingGradeName.trim()"
                >
                  حفظ التعديلات
                </UButton>
              </div>
            </form>
          </div>
        </template>
      </UModal>

      <!-- ================================================== -->
      <!-- Modal: Delete Grade Confirmation                   -->
      <!-- ================================================== -->
      <UModal v-model:open="isDeleteGradeModalOpen">
        <template #content>
          <div class="p-6 flex flex-col gap-4">
            <div class="flex items-center gap-3 text-rose-600">
              <div class="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-rose-600 shrink-0" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-900 m-0">تأكيد حذف الصف الدراسي</h3>
                <span class="text-xs text-slate-500">لا يمكن التراجع عن هذا الإجراء</span>
              </div>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed m-0">
              هل أنت متأكد من حذف «{{ gradeToDelete?.name }}»؟ لن تُحذف الدورات المربوطة به، وستصبح مصنفة كـ «بدون فصل دراسي».
            </p>
            <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                class="rounded-xl font-bold cursor-pointer"
                @click="isDeleteGradeModalOpen = false"
              >
                إلغاء
              </UButton>
              <UButton
                color="error"
                variant="solid"
                size="md"
                icon="i-lucide-trash-2"
                class="rounded-xl font-bold cursor-pointer"
                @click="handleConfirmDeleteGrade"
              >
                تأكيد الحذف
              </UButton>
            </div>
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>
