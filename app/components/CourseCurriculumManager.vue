<script setup lang="ts">
import type { SectionItem, LessonItem } from '~/composables/useCourses'

const props = defineProps<{
  modelValue: SectionItem[]
}>()

const emit = defineEmits<{
  'update:modelValue': [val: SectionItem[]]
  'change': [val: SectionItem[]]
}>()

// Internal copy of sections
const sections = ref<SectionItem[]>([])

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && JSON.stringify(newVal) !== JSON.stringify(sections.value)) {
      sections.value = JSON.parse(JSON.stringify(newVal))
    }
  },
  { immediate: true, deep: true }
)

function syncChanges() {
  emit('update:modelValue', sections.value)
  emit('change', sections.value)
}

// ==========================================
// SELECTED SECTION (Udemy-style split layout)
// ==========================================
const selectedSectionId = ref<number | null>(null)

const selectedSection = computed(() =>
  sections.value.find(s => s.id === selectedSectionId.value) || null
)

watch(
  () => sections.value.length,
  () => {
    if (!selectedSection.value && sections.value.length > 0) {
      selectedSectionId.value = sections.value[0]!.id
    }
  },
  { immediate: true }
)

function selectSection(section: SectionItem) {
  selectedSectionId.value = section.id
}

// ==========================================
// SECTION MANAGEMENT (naming via modal)
// ==========================================
const isSectionModalOpen = ref(false)
const sectionModalMode = ref<'add' | 'edit'>('add')
const sectionFormId = ref<number | null>(null)
const sectionFormTitle = ref('')
const sectionTitleInputRef = ref<HTMLInputElement | null>(null)

function openAddSection() {
  sectionModalMode.value = 'add'
  sectionFormId.value = null
  sectionFormTitle.value = `القسم ${sections.value.length + 1}`
  isSectionModalOpen.value = true
}

function openEditSection(section: SectionItem) {
  sectionModalMode.value = 'edit'
  sectionFormId.value = section.id
  sectionFormTitle.value = section.title
  isSectionModalOpen.value = true
}

function saveSection() {
  const title = sectionFormTitle.value.trim()
  if (!title) return

  if (sectionModalMode.value === 'add') {
    const newSection: SectionItem = {
      id: Date.now(),
      title,
      order: sections.value.length + 1,
      lessons: []
    }
    sections.value.push(newSection)
    selectedSectionId.value = newSection.id
  } else if (sectionFormId.value) {
    const sec = sections.value.find(s => s.id === sectionFormId.value)
    if (sec) sec.title = title
  }

  isSectionModalOpen.value = false
  syncChanges()
}

function moveSection(index: number, direction: 'up' | 'down') {
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= sections.value.length) return
  const temp = sections.value[index]
  sections.value[index] = sections.value[targetIndex]
  sections.value[targetIndex] = temp
  sections.value.forEach((sec, idx) => {
    sec.order = idx + 1
  })
  syncChanges()
}

// ==========================================
// LESSON MANAGEMENT
// ==========================================
const isLessonModalOpen = ref(false)
const lessonModalMode = ref<'add' | 'edit'>('add')
const targetSectionForLesson = ref<SectionItem | null>(null)
const editingLessonId = ref<number | null>(null)

const lessonForm = reactive({
  title: '',
  type: 'video' as 'video' | 'text' | 'pdf' | 'quiz',
  videoFile: null as File | null,
  videoFileName: '',
  videoFileSize: '',
  videoUrl: '',
  videoDescription: '',
  content: '',
  pdfFile: null as File | null,
  pdfFileName: ''
})

const videoFileInputRef = ref<HTMLInputElement | null>(null)
const pdfFileInputRef = ref<HTMLInputElement | null>(null)

// Full maps (kept for displaying existing lessons, incl. legacy quiz data)
const typeOptions = [
  { type: 'video' as const, label: 'فيديو', icon: 'i-lucide-video', iconClass: 'text-blue-600 dark:text-blue-400' },
  { type: 'text' as const, label: 'نص ومقال', icon: 'i-lucide-file-text', iconClass: 'text-purple-600 dark:text-purple-400' },
  { type: 'pdf' as const, label: 'ملف PDF', icon: 'i-lucide-file-down', iconClass: 'text-amber-600 dark:text-amber-400' },
  { type: 'quiz' as const, label: 'اختبار', icon: 'i-lucide-help-circle', iconClass: 'text-emerald-600 dark:text-emerald-400' }
]

// Only the types offered when adding a lesson (quiz removed)
const addableTypeOptions = typeOptions.filter(t => t.type !== 'quiz')

function typeLabelFor(type: LessonItem['type']) {
  return typeOptions.find(t => t.type === type)?.label || ''
}

function typeIconFor(type: LessonItem['type']) {
  return typeOptions.find(t => t.type === type)?.icon || 'i-lucide-file'
}

function typeBadgeClassFor(type: LessonItem['type']) {
  switch (type) {
    case 'video': return 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
    case 'text': return 'bg-purple-100/80 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
    case 'pdf': return 'bg-amber-100/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
    case 'quiz': return 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
  }
}

function resetLessonForm() {
  lessonForm.title = ''
  lessonForm.type = 'video'
  lessonForm.videoFile = null
  lessonForm.videoFileName = ''
  lessonForm.videoFileSize = ''
  lessonForm.videoUrl = ''
  lessonForm.videoDescription = ''
  lessonForm.content = ''
  lessonForm.pdfFile = null
  lessonForm.pdfFileName = ''
}

function openAddLesson(section: SectionItem) {
  lessonModalMode.value = 'add'
  targetSectionForLesson.value = section
  editingLessonId.value = null
  resetLessonForm()
  isLessonModalOpen.value = true
}

function openEditLesson(section: SectionItem, lesson: LessonItem) {
  lessonModalMode.value = 'edit'
  targetSectionForLesson.value = section
  editingLessonId.value = lesson.id
  resetLessonForm()
  lessonForm.title = lesson.title
  lessonForm.type = lesson.type
  lessonForm.videoFile = lesson.videoFile || null
  lessonForm.videoFileName = lesson.videoFileName || ''
  lessonForm.videoFileSize = lesson.videoFileSize || ''
  lessonForm.videoUrl = lesson.videoUrl || ''
  lessonForm.videoDescription = lesson.videoDescription || ''
  lessonForm.content = lesson.content || ''
  lessonForm.pdfFileName = lesson.pdfFileName || ''
  isLessonModalOpen.value = true
}

function handleVideoFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    lessonForm.videoFile = file
    lessonForm.videoFileName = file.name
    lessonForm.videoFileSize = `${(file.size / (1024 * 1024)).toFixed(1)} ميجابايت`
    if (lessonForm.videoUrl && lessonForm.videoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(lessonForm.videoUrl)
    }
    lessonForm.videoUrl = URL.createObjectURL(file)
  }
}

function removeVideoFile() {
  if (lessonForm.videoUrl && lessonForm.videoUrl.startsWith('blob:')) {
    URL.revokeObjectURL(lessonForm.videoUrl)
  }
  lessonForm.videoFile = null
  lessonForm.videoFileName = ''
  lessonForm.videoFileSize = ''
  lessonForm.videoUrl = ''
  if (videoFileInputRef.value) {
    videoFileInputRef.value.value = ''
  }
}

function handlePdfFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    lessonForm.pdfFile = file
    lessonForm.pdfFileName = file.name
  }
}

function removePdfFile() {
  lessonForm.pdfFile = null
  lessonForm.pdfFileName = ''
  if (pdfFileInputRef.value) {
    pdfFileInputRef.value.value = ''
  }
}

function saveLesson() {
  if (!lessonForm.title.trim() || !targetSectionForLesson.value) return

  const lessonData: LessonItem = {
    id: editingLessonId.value ?? Date.now(),
    sectionId: targetSectionForLesson.value.id,
    title: lessonForm.title.trim(),
    type: lessonForm.type,
    typeLabel: typeLabelFor(lessonForm.type),
    videoFile: lessonForm.videoFile,
    videoFileName: lessonForm.videoFileName,
    videoFileSize: lessonForm.videoFileSize,
    videoUrl: lessonForm.videoUrl,
    videoDescription: lessonForm.videoDescription,
    content: lessonForm.content,
    pdfFile: lessonForm.pdfFile,
    pdfFileName: lessonForm.pdfFileName
  }

  const sec = targetSectionForLesson.value
  if (!sec.lessons) sec.lessons = []

  if (lessonModalMode.value === 'add') {
    sec.lessons.push(lessonData)
  } else {
    const idx = sec.lessons.findIndex(l => l.id === lessonData.id)
    if (idx !== -1) sec.lessons[idx] = lessonData
  }

  isLessonModalOpen.value = false
  syncChanges()
}

function moveLesson(section: SectionItem, lessonIndex: number, direction: 'up' | 'down') {
  if (!section.lessons) return
  const targetIndex = direction === 'up' ? lessonIndex - 1 : lessonIndex + 1
  if (targetIndex < 0 || targetIndex >= section.lessons.length) return
  const temp = section.lessons[lessonIndex]
  section.lessons[lessonIndex] = section.lessons[targetIndex]
  section.lessons[targetIndex] = temp
  syncChanges()
}

// ==========================================
// DELETE CONFIRMATIONS (section & lesson)
// ==========================================
const isDeleteSectionModalOpen = ref(false)
const sectionToDelete = ref<SectionItem | null>(null)

function confirmDeleteSection(section: SectionItem) {
  sectionToDelete.value = section
  isDeleteSectionModalOpen.value = true
}

function executeDeleteSection() {
  if (!sectionToDelete.value) return
  sections.value = sections.value.filter(s => s.id !== sectionToDelete.value?.id)
  sections.value.forEach((sec, idx) => {
    sec.order = idx + 1
  })
  if (selectedSectionId.value === sectionToDelete.value?.id) {
    selectedSectionId.value = sections.value[0]?.id ?? null
  }
  isDeleteSectionModalOpen.value = false
  sectionToDelete.value = null
  syncChanges()
}

const isDeleteLessonModalOpen = ref(false)
const lessonToDelete = ref<{ section: SectionItem, lesson: LessonItem } | null>(null)

function confirmDeleteLesson(section: SectionItem, lesson: LessonItem) {
  lessonToDelete.value = { section, lesson }
  isDeleteLessonModalOpen.value = true
}

function executeDeleteLesson() {
  const target = lessonToDelete.value
  if (!target) return
  if (target.section.lessons) {
    target.section.lessons = target.section.lessons.filter(l => l.id !== target.lesson.id)
  }
  isDeleteLessonModalOpen.value = false
  lessonToDelete.value = null
  syncChanges()
}
</script>

<template>
  <div>
    <!-- ============================================== -->
    <!-- Empty State: No Sections                       -->
    <!-- ============================================== -->
    <div
      v-if="sections.length === 0"
      class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3 bg-white/50 dark:bg-slate-900/40"
    >
      <div class="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 flex items-center justify-center">
        <UIcon name="i-lucide-layers" class="w-7 h-7" />
      </div>
      <div class="flex flex-col items-center gap-1 max-w-md">
        <h3 class="text-base font-bold text-slate-900 dark:text-white m-0">
          نظّم محتوى الدورة في أقسام
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 m-0 leading-relaxed">
          أنشئ أقساماً مثل (الوحدة الأولى، التمارين) وضع بداخل كل قسم دروسك: فيديو، مقالات نصية وملفات PDF.
        </p>
      </div>
      <UButton
        color="primary"
        variant="solid"
        size="md"
        icon="i-lucide-plus"
        class="font-bold rounded-xl mt-2 cursor-pointer"
        @click="openAddSection"
      >
        إنشاء أول قسم الآن
      </UButton>
    </div>

    <!-- ============================================== -->
    <!-- Split Layout: Sections bar (start) + Lessons   -->
    <!-- (single connected surface, divider between)    -->
    <!-- ============================================== -->
    <div class="flex flex-col md:flex-row items-stretch rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
      <!-- ===== Sidebar: Sections List ===== -->
      <aside class="w-full md:w-60 shrink-0 flex flex-col bg-slate-50/80 dark:bg-slate-800/40 border-b md:border-b-0 md:border-e border-slate-200 dark:border-slate-800">
        <div class="flex-1 p-2 flex flex-col gap-1">
          <div
            v-for="(section, sIndex) in sections"
            :key="section.id"
            role="button"
            tabindex="0"
            class="group flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-colors select-none"
            :class="selectedSectionId === section.id
              ? 'border-primary-500 bg-primary-50/60 dark:bg-primary-950/40'
              : 'border-transparent hover:bg-slate-100/80 dark:hover:bg-slate-800/60'"
            @click="selectSection(section)"
            @keydown.enter="selectSection(section)"
          >
            <!-- Order number -->
            <span
              :class="[
                'w-6 h-6 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0',
                selectedSectionId === section.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300'
              ]"
            >
              {{ sIndex + 1 }}
            </span>

            <!-- Title -->
            <span class="flex-1 min-w-0 text-xs font-bold text-slate-900 dark:text-white truncate">
              {{ section.title }}
            </span>

            <!-- Reorder arrows -->
            <span class="flex items-center gap-0.5 shrink-0">
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                icon="i-lucide-chevron-up"
                :disabled="sIndex === 0"
                class="rounded cursor-pointer"
                title="تحريك القسم لأعلى"
                @click.stop="moveSection(sIndex, 'up')"
              />
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                icon="i-lucide-chevron-down"
                :disabled="sIndex === sections.length - 1"
                class="rounded cursor-pointer"
                title="تحريك القسم لأسفل"
                @click.stop="moveSection(sIndex, 'down')"
              />
            </span>
          </div>
        </div>

        <!-- Add Section (pinned to sidebar bottom) -->
        <div class="p-2 border-t border-slate-200/80 dark:border-slate-800">
          <UButton
            color="primary"
            variant="outline"
            size="sm"
            icon="i-lucide-plus"
            block
            class="font-bold rounded-xl cursor-pointer"
            @click="openAddSection"
          >
            إضافة قسم
          </UButton>
        </div>
      </aside>

      <!-- ===== Main Panel: Lessons of selected section ===== -->
      <section class="flex-1 min-w-0 w-full flex flex-col">
        <div
          v-if="selectedSection"
          class="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden"
        >
          <!-- Panel Header -->
          <div class="flex items-center gap-2 p-3 border-b border-slate-200 dark:border-slate-800">
            <h3 class="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate m-0">
              {{ selectedSection.title }}
            </h3>
            <UBadge size="xs" variant="subtle" color="neutral" class="rounded-md shrink-0">
              {{ selectedSection.lessons?.length || 0 }} دروس
            </UBadge>
            <div class="flex items-center gap-1 ms-auto shrink-0">
              <UButton
                color="neutral"
                variant="ghost"
                size="xs"
                icon="i-lucide-pencil"
                class="rounded-lg cursor-pointer"
                title="تعديل اسم القسم"
                @click="openEditSection(selectedSection)"
              />
              <UButton
                color="error"
                variant="ghost"
                size="xs"
                icon="i-lucide-trash-2"
                class="rounded-lg cursor-pointer"
                title="حذف القسم"
                @click="confirmDeleteSection(selectedSection)"
              />
            </div>
          </div>

          <!-- Lessons List -->
          <div class="flex-1 p-3 flex flex-col gap-2">
            <div v-if="selectedSection.lessons && selectedSection.lessons.length > 0" class="flex flex-col gap-2">
              <div
                v-for="(lesson, lIndex) in selectedSection.lessons"
                :key="lesson.id"
                class="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <!-- Reorder arrows (up / down) -->
                <div class="flex flex-col gap-0.5 shrink-0">
                  <UButton
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    icon="i-lucide-chevron-up"
                    :disabled="lIndex === 0"
                    class="rounded cursor-pointer"
                    title="تحريك الدرس لأعلى"
                    @click="moveLesson(selectedSection, lIndex, 'up')"
                  />
                  <UButton
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    icon="i-lucide-chevron-down"
                    :disabled="lIndex === selectedSection.lessons.length - 1"
                    class="rounded cursor-pointer"
                    title="تحريك الدرس لأسفل"
                    @click="moveLesson(selectedSection, lIndex, 'down')"
                  />
                </div>

                <!-- Type Icon -->
                <span
                  :class="[
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                    typeBadgeClassFor(lesson.type)
                  ]"
                >
                  <UIcon :name="typeIconFor(lesson.type)" class="w-4 h-4" />
                </span>

                <!-- Title & Type -->
                <div class="flex flex-col min-w-0">
                  <span class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {{ lesson.title }}
                  </span>
                  <span class="text-[11px] text-slate-500 dark:text-slate-400">
                    {{ lesson.typeLabel }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-0.5 ms-auto shrink-0">
                  <UButton
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    icon="i-lucide-pencil"
                    class="rounded-lg cursor-pointer"
                    title="تعديل الدرس"
                    @click="openEditLesson(selectedSection, lesson)"
                  />
                  <UButton
                    color="error"
                    variant="ghost"
                    size="xs"
                    icon="i-lucide-trash-2"
                    class="rounded-lg cursor-pointer"
                    title="حذف الدرس"
                    @click="confirmDeleteLesson(selectedSection, lesson)"
                  />
                </div>
              </div>
            </div>

            <!-- Add lesson button -->
            <UButton
              color="primary"
              variant="solid"
              size="sm"
              icon="i-lucide-plus"
              class="self-center font-bold rounded-xl cursor-pointer"
              @click="openAddLesson(selectedSection)"
            >
              إضافة درس
            </UButton>
          </div>
        </div>

        <!-- No section selected (defensive fallback) -->
        <div
          v-else
          class="flex-1 p-10 flex items-center justify-center text-xs text-slate-400"
        >
          اختر قسماً من القائمة الجانبية لعرض دروسه
        </div>
      </section>
    </div>

    <!-- ============================================== -->
    <!-- Modal: Add / Edit Section (naming)             -->
    <!-- ============================================== -->
    <UModal v-model:open="isSectionModalOpen">
      <template #content>
        <div class="p-6 flex flex-col gap-5">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-folder-plus" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <h3 class="text-base font-bold text-slate-900 dark:text-white m-0">
                  {{ sectionModalMode === 'add' ? 'إضافة قسم جديد' : 'تعديل اسم القسم' }}
                </h3>
                <span class="text-[11px] text-slate-500 dark:text-slate-400">
                  الأقسام تساعد الطلاب على متابعة الدورة خطوة بخطوة
                </span>
              </div>
            </div>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              class="cursor-pointer"
              @click="isSectionModalOpen = false"
            />
          </div>

          <form class="flex flex-col gap-4" @submit.prevent="saveSection">
            <UFormField label="اسم أو عنوان القسم" required class="font-bold text-slate-700 dark:text-slate-300">
              <UInput
                ref="sectionTitleInputRef"
                v-model="sectionFormTitle"
                placeholder="مثال: الوحدة الأولى: مقدمة في المعادلات الخطية"
                size="md"
                class="w-full"
                autofocus
              />
            </UFormField>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <UButton
                color="primary"
                variant="solid"
                size="md"
                icon="i-lucide-check"
                type="submit"
                class="font-bold rounded-xl"
                :disabled="!sectionFormTitle.trim()"
              >
                {{ sectionModalMode === 'add' ? 'إنشاء القسم' : 'حفظ التعديل' }}
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                class="font-bold rounded-xl"
                @click="isSectionModalOpen = false"
              >
                إلغاء
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>

    <!-- ============================================== -->
    <!-- Modal: Add / Edit Lesson                       -->
    <!-- ============================================== -->
    <UModal v-model:open="isLessonModalOpen" :ui="{ content: 'sm:max-w-2xl' }">
      <template #content>
        <div class="p-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-book-open" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <h3 class="text-base font-bold text-slate-900 dark:text-white m-0">
                  {{ lessonModalMode === 'add' ? 'إضافة درس جديد' : 'تعديل بيانات الدرس' }}
                </h3>
                <span class="text-[11px] text-slate-500 dark:text-slate-400">
                  القسم: {{ targetSectionForLesson?.title }}
                </span>
              </div>
            </div>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              class="cursor-pointer"
              @click="isLessonModalOpen = false"
            />
          </div>

          <form class="flex flex-col gap-4" @submit.prevent="saveLesson">
            <!-- Lesson Type Cards -->
            <UFormField label="نوع الدرس" class="font-bold text-slate-700 dark:text-slate-300">
              <div class="grid grid-cols-3 gap-2.5">
                <button
                  v-for="opt in addableTypeOptions"
                  :key="opt.type"
                  type="button"
                  :class="[
                    'p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all',
                    lessonForm.type === opt.type
                      ? 'border-primary-500 bg-primary-50/60 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  ]"
                  @click="lessonForm.type = opt.type"
                >
                  <UIcon :name="opt.icon" :class="['w-5 h-5', opt.iconClass]" />
                  <span class="text-xs">{{ opt.label }}</span>
                </button>
              </div>
            </UFormField>

            <!-- Lesson Title -->
            <UFormField label="عنوان الدرس" required class="font-bold text-slate-700 dark:text-slate-300">
              <UInput
                v-model="lessonForm.title"
                placeholder="مثال: شرح نظرية فيثاغورس وتطبيقاتها"
                size="md"
                class="w-full"
                autofocus
              />
            </UFormField>

            <!-- ============================================== -->
            <!-- TYPE 1: VIDEO (upload + rich text info)        -->
            <!-- ============================================== -->
            <div v-if="lessonForm.type === 'video'" class="flex flex-col gap-4">
              <input
                ref="videoFileInputRef"
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/quicktime"
                class="hidden"
                @change="handleVideoFileSelect"
              >

              <!-- Video Preview State -->
              <div v-if="lessonForm.videoUrl" class="flex flex-col gap-2">
                <video
                  :src="lessonForm.videoUrl"
                  controls
                  class="w-full rounded-xl bg-black max-h-56 object-contain"
                />
                <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <div class="flex items-center gap-2 min-w-0">
                    <UIcon name="i-lucide-film" class="w-4 h-4 text-primary-600 shrink-0" />
                    <span class="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {{ lessonForm.videoFileName || 'ملف فيديو محلي' }}
                    </span>
                    <span v-if="lessonForm.videoFileSize" class="text-[11px] text-slate-400 shrink-0">
                      ({{ lessonForm.videoFileSize }})
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <UButton
                      type="button"
                      color="neutral"
                      variant="outline"
                      size="xs"
                      class="font-bold cursor-pointer"
                      @click="videoFileInputRef?.click()"
                    >
                      تغيير
                    </UButton>
                    <UButton
                      type="button"
                      color="error"
                      variant="ghost"
                      size="xs"
                      icon="i-lucide-trash-2"
                      class="cursor-pointer"
                      @click="removeVideoFile"
                    />
                  </div>
                </div>
              </div>

              <!-- Upload Video Dropzone State -->
              <div
                v-else
                class="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary-400 hover:bg-primary-50/20 dark:hover:bg-primary-950/20 transition-colors rounded-xl p-6 text-center flex flex-col items-center gap-2 cursor-pointer"
                @click="videoFileInputRef?.click()"
              >
                <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-upload-cloud" class="w-5 h-5" />
                </div>
                <div class="flex flex-col items-center gap-0.5">
                  <span class="text-xs font-bold text-slate-700 dark:text-slate-300">
                    انقر هنا لرفع فيديو الدرس من جهازك
                  </span>
                  <span class="text-[11px] text-slate-400">يدعم صيغ MP4, WebM, MOV بحجم يصل إلى 500 ميجابايت</span>
                </div>
              </div>

              <!-- Video Info: Rich Text Editor -->
              <UFormField label="معلومات ووصف الفيديو" class="font-bold text-slate-700 dark:text-slate-300">
                <ClientOnly>
                  <RichTextEditor
                    v-model="lessonForm.videoDescription"
                    placeholder="اكتب هنا شرحاً أو ملخصاً أو توجيهات للطلاب حول ما يشاهدونه في هذا الفيديو..."
                    min-height="140px"
                  />
                  <template #fallback>
                    <div class="p-6 text-center text-xs text-slate-400 border border-slate-200 dark:border-slate-800 rounded-xl">
                      جاري تحميل المحرر المنسق...
                    </div>
                  </template>
                </ClientOnly>
              </UFormField>
            </div>

            <!-- ============================================== -->
            <!-- TYPE 2: TEXT (rich text editor)                -->
            <!-- ============================================== -->
            <div v-if="lessonForm.type === 'text'" class="flex flex-col gap-2">
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <UIcon name="i-lucide-pen-tool" class="w-4 h-4 text-purple-600" />
                محتوى المقال والشرح النصي
              </span>

              <ClientOnly>
                <RichTextEditor
                  v-model="lessonForm.content"
                  placeholder="اكتب تفاصيل ومحتوى الدرس كاملاً هنا..."
                  min-height="240px"
                />
                <template #fallback>
                  <div class="p-6 text-center text-xs text-slate-400 border border-slate-200 dark:border-slate-800 rounded-xl">
                    جاري تحميل المحرر المنسق...
                  </div>
                </template>
              </ClientOnly>
            </div>

            <!-- ============================================== -->
            <!-- TYPE 3: PDF (file upload)                      -->
            <!-- ============================================== -->
            <div v-if="lessonForm.type === 'pdf'" class="flex flex-col gap-3">
              <input
                ref="pdfFileInputRef"
                type="file"
                accept="application/pdf"
                class="hidden"
                @change="handlePdfFileSelect"
              >

              <!-- PDF Selected State -->
              <div
                v-if="lessonForm.pdfFileName"
                class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <UIcon name="i-lucide-file-text" class="w-4 h-4 text-amber-600 shrink-0" />
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {{ lessonForm.pdfFileName }}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <UButton
                    type="button"
                    color="neutral"
                    variant="outline"
                    size="xs"
                    class="font-bold cursor-pointer"
                    @click="pdfFileInputRef?.click()"
                  >
                    تغيير
                  </UButton>
                  <UButton
                    type="button"
                    color="error"
                    variant="ghost"
                    size="xs"
                    icon="i-lucide-trash-2"
                    class="cursor-pointer"
                    @click="removePdfFile"
                  />
                </div>
              </div>

              <!-- PDF Dropzone State -->
              <div
                v-else
                class="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-400 hover:bg-amber-50/20 transition-colors rounded-xl p-6 text-center flex flex-col items-center gap-2 cursor-pointer"
                @click="pdfFileInputRef?.click()"
              >
                <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-file-up" class="w-5 h-5" />
                </div>
                <div class="flex flex-col items-center gap-0.5">
                  <span class="text-xs font-bold text-slate-700 dark:text-slate-300">
                    انقر لرفع ملف التمارين أو المذكرة بصيغة PDF
                  </span>
                  <span class="text-[11px] text-slate-400">صيغة PDF فقط</span>
                </div>
              </div>
            </div>

            <!-- Footer Buttons -->
            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <UButton
                color="primary"
                variant="solid"
                size="md"
                icon="i-lucide-check"
                type="submit"
                class="font-bold rounded-xl"
                :disabled="!lessonForm.title.trim()"
              >
                {{ lessonModalMode === 'add' ? 'إضافة الدرس' : 'حفظ التعديلات' }}
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                class="font-bold rounded-xl"
                @click="isLessonModalOpen = false"
              >
                إلغاء
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>

    <!-- ============================================== -->
    <!-- Modal: Delete Section Confirmation             -->
    <!-- ============================================== -->
    <UModal v-model:open="isDeleteSectionModalOpen">
      <template #content>
        <div class="p-6 flex flex-col gap-4 text-center">
          <div class="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 mx-auto flex items-center justify-center">
            <UIcon name="i-lucide-alert-triangle" class="w-6 h-6" />
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-base font-bold text-slate-900 dark:text-white m-0">
              هل أنت متأكد من حذف هذا القسم؟
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 m-0">
              «{{ sectionToDelete?.title }}»
              <span v-if="(sectionToDelete?.lessons?.length || 0) > 0" class="block text-rose-500 font-bold mt-1">
                تنبيه: يحتوي هذا القسم على {{ sectionToDelete?.lessons?.length }} دروس وسيتم حذفها جميعاً.
              </span>
            </p>
          </div>
          <div class="flex items-center justify-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <UButton
              color="error"
              variant="solid"
              size="md"
              icon="i-lucide-trash-2"
              class="font-bold rounded-xl"
              @click="executeDeleteSection"
            >
              نعم، احذف القسم
            </UButton>
            <UButton
              color="neutral"
              variant="outline"
              size="md"
              class="font-bold rounded-xl"
              @click="isDeleteSectionModalOpen = false"
            >
              إلغاء
            </UButton>
          </div>
        </div>
      </template>
    </UModal>

    <!-- ============================================== -->
    <!-- Modal: Delete Lesson Confirmation              -->
    <!-- ============================================== -->
    <UModal v-model:open="isDeleteLessonModalOpen">
      <template #content>
        <div class="p-6 flex flex-col gap-4 text-center">
          <div class="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 mx-auto flex items-center justify-center">
            <UIcon name="i-lucide-alert-triangle" class="w-6 h-6" />
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-base font-bold text-slate-900 dark:text-white m-0">
              هل أنت متأكد من حذف هذا الدرس؟
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 m-0">
              «{{ lessonToDelete?.lesson.title }}» من قسم «{{ lessonToDelete?.section.title }}»
              <span class="block text-rose-500 font-bold mt-1">لا يمكن التراجع عن هذه العملية.</span>
            </p>
          </div>
          <div class="flex items-center justify-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <UButton
              color="error"
              variant="solid"
              size="md"
              icon="i-lucide-trash-2"
              class="font-bold rounded-xl"
              @click="executeDeleteLesson"
            >
              نعم، احذف الدرس
            </UButton>
            <UButton
              color="neutral"
              variant="outline"
              size="md"
              class="font-bold rounded-xl"
              @click="isDeleteLessonModalOpen = false"
            >
              إلغاء
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
