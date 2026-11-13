<script setup lang="ts">
import type { SectionItem, LessonItem } from '~/composables/useClassrooms'

const props = defineProps<{
  modelValue: SectionItem[]
}>()

const emit = defineEmits<{
  'update:modelValue': [val: SectionItem[]]
  'change': [val: SectionItem[]]
}>()

// Internal copy of sections
const sections = ref<SectionItem[]>([])

// Initialize or watch external modelValue
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

// Summary statistics
const totalSectionsCount = computed(() => sections.value.length)
const totalLessonsCount = computed(() => {
  return sections.value.reduce((acc, s) => acc + (s.lessons?.length || 0), 0)
})
const videoLessonsCount = computed(() => {
  return sections.value.reduce(
    (acc, s) => acc + (s.lessons?.filter(l => l.type === 'video').length || 0),
    0
  )
})
const textLessonsCount = computed(() => {
  return sections.value.reduce(
    (acc, s) => acc + (s.lessons?.filter(l => l.type === 'text').length || 0),
    0
  )
})

// ==========================================
// SECTION MANAGEMENT
// ==========================================
const isSectionModalOpen = ref(false)
const sectionModalMode = ref<'add' | 'edit'>('add')
const sectionForm = reactive({
  id: 0,
  title: ''
})

function openAddSection() {
  sectionModalMode.value = 'add'
  sectionForm.id = Date.now()
  sectionForm.title = `القسم ${sections.value.length + 1}: `
  isSectionModalOpen.value = true
}

function openEditSection(section: SectionItem) {
  sectionModalMode.value = 'edit'
  sectionForm.id = section.id
  sectionForm.title = section.title
  isSectionModalOpen.value = true
}

function saveSection() {
  if (!sectionForm.title.trim()) return

  if (sectionModalMode.value === 'add') {
    sections.value.push({
      id: sectionForm.id,
      title: sectionForm.title.trim(),
      order: sections.value.length + 1,
      isCollapsed: false,
      lessons: []
    })
  } else {
    const sec = sections.value.find(s => s.id === sectionForm.id)
    if (sec) {
      sec.title = sectionForm.title.trim()
    }
  }
  isSectionModalOpen.value = false
  syncChanges()
}

// Delete section confirmation
const isDeleteSectionModalOpen = ref(false)
const sectionToDelete = ref<SectionItem | null>(null)

function confirmDeleteSection(section: SectionItem) {
  sectionToDelete.value = section
  isDeleteSectionModalOpen.value = true
}

function executeDeleteSection() {
  if (!sectionToDelete.value) return
  sections.value = sections.value.filter(s => s.id !== sectionToDelete.value?.id)
  // Re-assign orders
  sections.value.forEach((sec, idx) => {
    sec.order = idx + 1
  })
  isDeleteSectionModalOpen.value = false
  sectionToDelete.value = null
  syncChanges()
}

function toggleSectionCollapse(section: SectionItem) {
  section.isCollapsed = !section.isCollapsed
}

function moveSection(index: number, direction: 'up' | 'down') {
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= sections.value.length) return
  const temp = sections.value[index]
  sections.value[index] = sections.value[targetIndex]
  sections.value[targetIndex] = temp
  // Update order property
  sections.value.forEach((sec, idx) => {
    sec.order = idx + 1
  })
  syncChanges()
}

// ==========================================
// DRAG & DROP: SECTIONS
// ==========================================
const draggedSectionIndex = ref<number | null>(null)
const dragOverSectionIndex = ref<number | null>(null)

function onSectionDragStart(event: DragEvent, index: number) {
  draggedSectionIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('application/json-section', String(index))
  }
}

function onSectionDragOver(event: DragEvent, index: number) {
  if (draggedSectionIndex.value === null) return
  event.preventDefault()
  dragOverSectionIndex.value = index
}

function onSectionDrop(event: DragEvent, targetIndex: number) {
  if (draggedSectionIndex.value === null) return
  event.preventDefault()
  const fromIndex = draggedSectionIndex.value
  if (fromIndex !== targetIndex) {
    const moved = sections.value.splice(fromIndex, 1)[0]
    sections.value.splice(targetIndex, 0, moved)
    sections.value.forEach((sec, idx) => {
      sec.order = idx + 1
    })
    syncChanges()
  }
  draggedSectionIndex.value = null
  dragOverSectionIndex.value = null
}

function onSectionDragEnd() {
  draggedSectionIndex.value = null
  dragOverSectionIndex.value = null
}

// ==========================================
// LESSON MANAGEMENT
// ==========================================
const isLessonModalOpen = ref(false)
const lessonModalMode = ref<'add' | 'edit'>('add')
const targetSectionIdForAdd = ref<number>(0)

const lessonForm = reactive({
  id: 0,
  sectionId: 0,
  title: '',
  type: 'video' as 'video' | 'text' | 'pdf' | 'quiz',
  typeLabel: 'فيديو',
  duration: '',
  videoFile: null as File | null,
  videoFileName: '',
  videoFileSize: '',
  videoUrl: '',
  videoDescription: '',
  content: '',
  pdfFileName: '',
  pagesCount: '',
  questionsCount: ''
})

const videoFileInputRef = ref<HTMLInputElement | null>(null)

function openAddLesson(sectionId: number, type: 'video' | 'text' | 'pdf' | 'quiz' = 'video') {
  lessonModalMode.value = 'add'
  targetSectionIdForAdd.value = sectionId
  lessonForm.id = Date.now()
  lessonForm.sectionId = sectionId
  lessonForm.title = ''
  lessonForm.type = type
  lessonForm.videoFile = null
  lessonForm.videoFileName = ''
  lessonForm.videoFileSize = ''
  lessonForm.videoUrl = ''
  lessonForm.videoDescription = ''
  lessonForm.content = ''
  lessonForm.pdfFileName = ''
  lessonForm.pagesCount = ''
  lessonForm.questionsCount = ''

  if (type === 'video') {
    lessonForm.typeLabel = 'فيديو'
    lessonForm.duration = '15:00 دقيقة'
  } else if (type === 'text') {
    lessonForm.typeLabel = 'نص ومقال'
    lessonForm.duration = '5 دقائق قراءة'
    lessonForm.content = '<p>اكتب هنا محتوى الدرس بالتفصيل...</p>'
  } else if (type === 'pdf') {
    lessonForm.typeLabel = 'ملف PDF'
    lessonForm.duration = '6 صفحات'
  } else {
    lessonForm.typeLabel = 'اختبار'
    lessonForm.duration = '10 أسئلة'
  }

  isLessonModalOpen.value = true
}

function openEditLesson(lesson: LessonItem) {
  lessonModalMode.value = 'edit'
  lessonForm.id = lesson.id
  lessonForm.sectionId = lesson.sectionId
  lessonForm.title = lesson.title
  lessonForm.type = lesson.type
  lessonForm.typeLabel = lesson.typeLabel
  lessonForm.duration = lesson.duration || ''
  lessonForm.videoFile = lesson.videoFile || null
  lessonForm.videoFileName = lesson.videoFileName || ''
  lessonForm.videoFileSize = lesson.videoFileSize || ''
  lessonForm.videoUrl = lesson.videoUrl || ''
  lessonForm.videoDescription = lesson.videoDescription || ''
  lessonForm.content = lesson.content || ''
  lessonForm.pdfFileName = lesson.pdfFileName || ''
  lessonForm.pagesCount = lesson.pagesCount || ''
  lessonForm.questionsCount = lesson.questionsCount || ''

  isLessonModalOpen.value = true
}

function handleVideoFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    lessonForm.videoFile = file
    lessonForm.videoFileName = file.name
    // Format size
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1)
    lessonForm.videoFileSize = `${sizeMb} ميجابايت`
    // Create preview URL
    if (lessonForm.videoUrl && lessonForm.videoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(lessonForm.videoUrl)
    }
    lessonForm.videoUrl = URL.createObjectURL(file)

    // Auto extract duration if possible
    const tempVideo = document.createElement('video')
    tempVideo.preload = 'metadata'
    tempVideo.src = lessonForm.videoUrl
    tempVideo.onloadedmetadata = () => {
      const minutes = Math.floor(tempVideo.duration / 60)
      const seconds = Math.floor(tempVideo.duration % 60)
      lessonForm.duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} دقيقة`
    }
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

function triggerVideoUpload() {
  videoFileInputRef.value?.click()
}

function saveLesson() {
  if (!lessonForm.title.trim()) return

  const lessonData: LessonItem = {
    id: lessonForm.id,
    sectionId: Number(lessonForm.sectionId),
    title: lessonForm.title.trim(),
    type: lessonForm.type,
    typeLabel:
      lessonForm.type === 'video'
        ? 'فيديو'
        : lessonForm.type === 'text'
          ? 'نص ومقال'
          : lessonForm.type === 'pdf'
            ? 'ملف PDF'
            : 'اختبار',
    duration:
      lessonForm.duration.trim() ||
      (lessonForm.type === 'video'
        ? '10:00 دقيقة'
        : lessonForm.type === 'text'
          ? '5 دقائق قراءة'
          : lessonForm.type === 'pdf'
            ? '5 صفحات'
            : '5 أسئلة'),
    videoFile: lessonForm.videoFile,
    videoFileName: lessonForm.videoFileName,
    videoFileSize: lessonForm.videoFileSize,
    videoUrl: lessonForm.videoUrl,
    videoDescription: lessonForm.videoDescription,
    content: lessonForm.content,
    pdfFileName: lessonForm.pdfFileName,
    pagesCount: lessonForm.pagesCount,
    questionsCount: lessonForm.questionsCount
  }

  if (lessonModalMode.value === 'add') {
    const targetSec = sections.value.find(s => s.id === lessonData.sectionId)
    if (targetSec) {
      if (!targetSec.lessons) targetSec.lessons = []
      targetSec.lessons.push(lessonData)
    }
  } else {
    // Check if section changed
    let oldSec: SectionItem | undefined
    let oldIndex = -1

    for (const sec of sections.value) {
      const idx = sec.lessons?.findIndex(l => l.id === lessonData.id) ?? -1
      if (idx !== -1) {
        oldSec = sec
        oldIndex = idx
        break
      }
    }

    if (oldSec && oldSec.id === lessonData.sectionId) {
      // Updated inside same section
      oldSec.lessons[oldIndex] = lessonData
    } else {
      // Moved to another section
      if (oldSec && oldIndex !== -1) {
        oldSec.lessons.splice(oldIndex, 1)
      }
      const newSec = sections.value.find(s => s.id === lessonData.sectionId)
      if (newSec) {
        if (!newSec.lessons) newSec.lessons = []
        newSec.lessons.push(lessonData)
      }
    }
  }

  isLessonModalOpen.value = false
  syncChanges()
}

function deleteLesson(sectionId: number, lessonId: number) {
  const sec = sections.value.find(s => s.id === sectionId)
  if (sec && sec.lessons) {
    sec.lessons = sec.lessons.filter(l => l.id !== lessonId)
    syncChanges()
  }
}

function moveLesson(sectionId: number, lessonIndex: number, direction: 'up' | 'down') {
  const sec = sections.value.find(s => s.id === sectionId)
  if (!sec || !sec.lessons) return

  const targetIndex = direction === 'up' ? lessonIndex - 1 : lessonIndex + 1
  if (targetIndex < 0 || targetIndex >= sec.lessons.length) return

  const temp = sec.lessons[lessonIndex]
  sec.lessons[lessonIndex] = sec.lessons[targetIndex]
  sec.lessons[targetIndex] = temp
  syncChanges()
}

// ==========================================
// DRAG & DROP: LESSONS (Within & Cross Sections)
// ==========================================
const draggedLesson = ref<{
  sectionId: number
  lessonIndex: number
  lessonId: number
} | null>(null)

const dragOverLessonTarget = ref<{
  sectionId: number
  lessonIndex?: number
} | null>(null)

function onLessonDragStart(event: DragEvent, sectionId: number, lessonIndex: number, lessonId: number) {
  draggedLesson.value = { sectionId, lessonIndex, lessonId }
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData(
      'application/json-lesson',
      JSON.stringify({ sectionId, lessonIndex, lessonId })
    )
  }
}

function onLessonDragOver(event: DragEvent, sectionId: number, lessonIndex?: number) {
  if (!draggedLesson.value) return
  event.preventDefault()
  dragOverLessonTarget.value = { sectionId, lessonIndex }
}

function onLessonDrop(event: DragEvent, targetSectionId: number, targetLessonIndex?: number) {
  if (!draggedLesson.value) return
  event.preventDefault()

  const { sectionId: srcSectionId, lessonIndex: srcLessonIndex } = draggedLesson.value

  const sourceSec = sections.value.find(s => s.id === srcSectionId)
  const targetSec = sections.value.find(s => s.id === targetSectionId)

  if (sourceSec && targetSec && sourceSec.lessons) {
    // Pick the dragged lesson
    const [movedLesson] = sourceSec.lessons.splice(srcLessonIndex, 1)
    if (movedLesson) {
      movedLesson.sectionId = targetSectionId
      if (!targetSec.lessons) targetSec.lessons = []

      if (typeof targetLessonIndex === 'number' && targetLessonIndex >= 0) {
        targetSec.lessons.splice(targetLessonIndex, 0, movedLesson)
      } else {
        // Appended to the end of section
        targetSec.lessons.push(movedLesson)
      }
      syncChanges()
    }
  }

  draggedLesson.value = null
  dragOverLessonTarget.value = null
}

function onLessonDragEnd() {
  draggedLesson.value = null
  dragOverLessonTarget.value = null
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <!-- Top Bar: Summary & Add Section CTA -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 flex items-center justify-center shrink-0">
          <UIcon name="i-lucide-folder-tree" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-base font-bold text-slate-900 dark:text-white m-0">
            خطة وأقسام الدورة التدريبية
          </h2>
          <div class="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
            <span class="font-medium">{{ totalSectionsCount }} أقسام</span>
            <span>•</span>
            <span class="font-medium">{{ totalLessonsCount }} درس</span>
            <span v-if="videoLessonsCount > 0">• {{ videoLessonsCount }} فيديو</span>
            <span v-if="textLessonsCount > 0">• {{ textLessonsCount }} نص ومقال</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          color="primary"
          variant="solid"
          size="md"
          icon="i-lucide-folder-plus"
          class="font-bold rounded-xl cursor-pointer"
          @click="openAddSection"
        >
          إضافة قسم جديد
        </UButton>
      </div>
    </div>

    <!-- Empty State: No Sections -->
    <div
      v-if="sections.length === 0"
      class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3 bg-white/50 dark:bg-slate-900/40"
    >
      <div class="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 flex items-center justify-center">
        <UIcon name="i-lucide-layers" class="w-7 h-7" />
      </div>
      <div class="flex flex-col items-center gap-1 max-w-md">
        <h3 class="text-base font-bold text-slate-900 dark:text-white m-0">
          ابدأ بتنظيم محتوى الدورة في أقسام (وحدات)
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 m-0 leading-relaxed">
          قم بإنشاء أقسام مثل (الوحدة الأولى، المدخل العام، التمارين) وضع بداخل كل قسم دروس الفيديو والمقالات النصية والاختبارات. يمكنك سحب وإفلات الأقسام والدروس لترتيبها بكل حرية.
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

    <!-- Sections List (Draggable & Collapsible) -->
    <div v-else class="flex flex-col gap-4">
      <div
        v-for="(section, sIndex) in sections"
        :key="section.id"
        :class="[
          'rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-xs overflow-hidden',
          draggedSectionIndex === sIndex
            ? 'opacity-40 border-dashed border-primary-500'
            : dragOverSectionIndex === sIndex
              ? 'border-primary-500 ring-2 ring-primary-500/20'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        ]"
        @dragover="onSectionDragOver($event, sIndex)"
        @drop="onSectionDrop($event, sIndex)"
      >
        <!-- Section Header -->
        <div class="flex items-center justify-between gap-3 p-4 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800">
          <!-- Left info & drag handle -->
          <div class="flex items-center gap-2.5 min-w-0">
            <!-- Drag Handle for Section -->
            <button
              type="button"
              draggable="true"
              class="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
              title="اسحب لإعادة ترتيب القسم"
              @dragstart="onSectionDragStart($event, sIndex)"
              @dragend="onSectionDragEnd"
            >
              <UIcon name="i-lucide-grip-vertical" class="w-4 h-4" />
            </button>

            <!-- Reorder up/down buttons for Section -->
            <div class="flex flex-col gap-0.5">
              <button
                type="button"
                :disabled="sIndex === 0"
                class="p-0.5 hover:text-primary-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed text-slate-500"
                title="تحريك القسم لأعلى"
                @click="moveSection(sIndex, 'up')"
              >
                <UIcon name="i-lucide-chevron-up" class="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                :disabled="sIndex === sections.length - 1"
                class="p-0.5 hover:text-primary-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed text-slate-500"
                title="تحريك القسم لأسفل"
                @click="moveSection(sIndex, 'down')"
              >
                <UIcon name="i-lucide-chevron-down" class="w-3.5 h-3.5" />
              </button>
            </div>

            <!-- Order Badge -->
            <span class="px-2 py-0.5 rounded-md bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-bold text-xs shrink-0">
              قسم {{ sIndex + 1 }}
            </span>

            <!-- Section Title -->
            <div
              class="flex items-center gap-2 cursor-pointer select-none group min-w-0"
              @click="toggleSectionCollapse(section)"
            >
              <h3 class="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate m-0">
                {{ section.title }}
              </h3>
              <UBadge size="xs" variant="subtle" color="neutral" class="rounded-md shrink-0">
                {{ section.lessons?.length || 0 }} دروس
              </UBadge>
            </div>
          </div>

          <!-- Right: Section Actions -->
          <div class="flex items-center gap-1.5 shrink-0">
            <!-- Add Lesson to this section -->
            <div class="hidden sm:flex items-center gap-1">
              <UButton
                color="primary"
                variant="subtle"
                size="xs"
                icon="i-lucide-video"
                class="font-bold rounded-lg cursor-pointer"
                @click="openAddLesson(section.id, 'video')"
              >
                + فيديو
              </UButton>
              <UButton
                color="neutral"
                variant="subtle"
                size="xs"
                icon="i-lucide-file-text"
                class="font-bold rounded-lg cursor-pointer"
                @click="openAddLesson(section.id, 'text')"
              >
                + نص ومقال
              </UButton>
              <UButton
                color="neutral"
                variant="subtle"
                size="xs"
                icon="i-lucide-file-down"
                class="font-bold rounded-lg cursor-pointer"
                @click="openAddLesson(section.id, 'pdf')"
              >
                + PDF
              </UButton>
              <UButton
                color="neutral"
                variant="subtle"
                size="xs"
                icon="i-lucide-help-circle"
                class="font-bold rounded-lg cursor-pointer"
                @click="openAddLesson(section.id, 'quiz')"
              >
                + اختبار
              </UButton>
            </div>

            <!-- Mobile Add Lesson dropdown or quick button -->
            <UButton
              color="primary"
              variant="outline"
              size="xs"
              icon="i-lucide-plus"
              class="sm:hidden font-bold rounded-lg"
              @click="openAddLesson(section.id, 'video')"
            >
              درس
            </UButton>

            <!-- Edit Section -->
            <UButton
              color="neutral"
              variant="ghost"
              size="xs"
              icon="i-lucide-pencil"
              class="rounded-lg cursor-pointer"
              title="تعديل اسم القسم"
              @click="openEditSection(section)"
            />

            <!-- Delete Section -->
            <UButton
              color="error"
              variant="ghost"
              size="xs"
              icon="i-lucide-trash-2"
              class="rounded-lg cursor-pointer"
              title="حذف القسم"
              @click="confirmDeleteSection(section)"
            />

            <!-- Collapse / Expand Toggle -->
            <button
              type="button"
              class="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 cursor-pointer transition-transform"
              :class="{ 'rotate-180': !section.isCollapsed }"
              title="طي أو فتح القسم"
              @click="toggleSectionCollapse(section)"
            >
              <UIcon name="i-lucide-chevron-down" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Section Body: Lessons Container -->
        <div
          v-show="!section.isCollapsed"
          class="p-4 flex flex-col gap-2.5 transition-all"
          @dragover="onLessonDragOver($event, section.id)"
          @drop="onLessonDrop($event, section.id)"
        >
          <!-- Lessons List -->
          <div
            v-if="section.lessons && section.lessons.length > 0"
            class="flex flex-col gap-2"
          >
            <div
              v-for="(lesson, lIndex) in section.lessons"
              :key="lesson.id"
              :class="[
                'flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all group bg-white dark:bg-slate-900',
                draggedLesson?.lessonId === lesson.id
                  ? 'opacity-30 border-dashed border-primary-500'
                  : dragOverLessonTarget?.sectionId === section.id && dragOverLessonTarget?.lessonIndex === lIndex
                    ? 'border-primary-500 ring-2 ring-primary-500/20 bg-primary-50/20 dark:bg-primary-950/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              ]"
              @dragover.stop="onLessonDragOver($event, section.id, lIndex)"
              @drop.stop="onLessonDrop($event, section.id, lIndex)"
            >
              <!-- Left: Handle, Order, Type Icon & Title -->
              <div class="flex items-center gap-3 min-w-0">
                <!-- Drag Handle for Lesson -->
                <button
                  type="button"
                  draggable="true"
                  class="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-0.5 rounded transition-colors"
                  title="اسحب لإعادة ترتيب الدرس أو نقله لقسم آخر"
                  @dragstart.stop="onLessonDragStart($event, section.id, lIndex, lesson.id)"
                  @dragend.stop="onLessonDragEnd"
                >
                  <UIcon name="i-lucide-grip-vertical" class="w-3.5 h-3.5" />
                </button>

                <!-- Up/Down buttons for Lesson -->
                <div class="flex flex-col gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    :disabled="lIndex === 0"
                    class="p-0.5 hover:text-primary-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                    title="تحريك لأعلى"
                    @click="moveLesson(section.id, lIndex, 'up')"
                  >
                    <UIcon name="i-lucide-chevron-up" class="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    :disabled="lIndex === section.lessons.length - 1"
                    class="p-0.5 hover:text-primary-600 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                    title="تحريك لأسفل"
                    @click="moveLesson(section.id, lIndex, 'down')"
                  >
                    <UIcon name="i-lucide-chevron-down" class="w-3 h-3" />
                  </button>
                </div>

                <!-- Number index inside section -->
                <span class="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs flex items-center justify-center shrink-0">
                  {{ lIndex + 1 }}
                </span>

                <!-- Type Icon -->
                <div
                  :class="[
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                    lesson.type === 'video'
                      ? 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                      : lesson.type === 'text'
                        ? 'bg-purple-100/80 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400'
                        : lesson.type === 'pdf'
                          ? 'bg-amber-100/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                          : 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                  ]"
                >
                  <UIcon
                    :name="
                      lesson.type === 'video'
                        ? 'i-lucide-video'
                        : lesson.type === 'text'
                          ? 'i-lucide-file-text'
                          : lesson.type === 'pdf'
                            ? 'i-lucide-file-down'
                            : 'i-lucide-help-circle'
                    "
                    class="w-4 h-4"
                  />
                </div>

                <!-- Title & Meta -->
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {{ lesson.title }}
                    </span>
                    <span
                      v-if="lesson.type === 'video' && lesson.videoFileName"
                      class="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 px-1.5 py-0.5 rounded font-medium shrink-0"
                    >
                      <UIcon name="i-lucide-check-circle" class="w-3 h-3" />
                      فيديو مرفوع
                    </span>
                    <span
                      v-if="lesson.type === 'text' && lesson.content"
                      class="inline-flex items-center gap-1 text-[10px] text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400 px-1.5 py-0.5 rounded font-medium shrink-0"
                    >
                      محتوى نصي منسق
                    </span>
                  </div>

                  <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <UBadge size="xs" variant="subtle" color="neutral" class="rounded-md">
                      {{ lesson.typeLabel }}
                    </UBadge>
                    <span>{{ lesson.duration }}</span>
                    <span v-if="lesson.videoFileSize">• {{ lesson.videoFileSize }}</span>
                  </div>
                </div>
              </div>

              <!-- Right: Lesson Actions -->
              <div class="flex items-center gap-1 shrink-0">
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  icon="i-lucide-pencil"
                  class="rounded-lg cursor-pointer font-bold"
                  @click="openEditLesson(lesson)"
                >
                  تعديل
                </UButton>
                <UButton
                  color="error"
                  variant="ghost"
                  size="xs"
                  icon="i-lucide-trash-2"
                  class="rounded-lg cursor-pointer"
                  title="حذف الدرس"
                  @click="deleteLesson(section.id, lesson.id)"
                />
              </div>
            </div>
          </div>

          <!-- Empty Lessons State inside Section -->
          <div
            v-else
            class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center flex flex-col items-center justify-center gap-2 bg-slate-50/50 dark:bg-slate-800/30"
          >
            <UIcon name="i-lucide-folder-open" class="w-6 h-6 text-slate-400" />
            <span class="text-xs font-bold text-slate-600 dark:text-slate-400">
              لا توجد دروس في هذا القسم بعد
            </span>
            <div class="flex flex-wrap items-center justify-center gap-2 mt-1">
              <UButton
                color="primary"
                variant="subtle"
                size="xs"
                icon="i-lucide-video"
                class="font-bold rounded-lg cursor-pointer"
                @click="openAddLesson(section.id, 'video')"
              >
                + إضافة فيديو
              </UButton>
              <UButton
                color="neutral"
                variant="subtle"
                size="xs"
                icon="i-lucide-file-text"
                class="font-bold rounded-lg cursor-pointer"
                @click="openAddLesson(section.id, 'text')"
              >
                + درس نصي
              </UButton>
              <UButton
                color="neutral"
                variant="subtle"
                size="xs"
                icon="i-lucide-file-down"
                class="font-bold rounded-lg cursor-pointer"
                @click="openAddLesson(section.id, 'pdf')"
              >
                + PDF
              </UButton>
              <UButton
                color="neutral"
                variant="subtle"
                size="xs"
                icon="i-lucide-help-circle"
                class="font-bold rounded-lg cursor-pointer"
                @click="openAddLesson(section.id, 'quiz')"
              >
                + اختبار
              </UButton>
            </div>
          </div>

          <!-- Bottom quick add bar inside section -->
          <div
            v-if="section.lessons && section.lessons.length > 0"
            class="pt-1 flex items-center justify-between"
          >
            <button
              type="button"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
              @click="openAddLesson(section.id, 'video')"
            >
              <UIcon name="i-lucide-plus" class="w-3.5 h-3.5" />
              <span>إضافة درس آخر لهذا القسم</span>
            </button>
            <span class="text-[11px] text-slate-400">
              يمكنك سحب أي درس لتبديل مكانه أو نقله إلى قسم آخر
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- Modal: Add / Edit Section                      -->
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
                <h3 class="text-lg font-bold text-slate-900 dark:text-white m-0">
                  {{ sectionModalMode === 'add' ? 'إضافة قسم جديد' : 'تعديل اسم القسم' }}
                </h3>
                <span class="text-xs text-slate-500 dark:text-slate-400">
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
                v-model="sectionForm.title"
                placeholder="مثال: الوحدة الأولى: مقدمة في المعادلات الخطية"
                size="md"
                class="w-full"
                autofocus
              />
            </UFormField>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                class="font-bold rounded-xl"
                @click="isSectionModalOpen = false"
              >
                إلغاء
              </UButton>
              <UButton
                color="primary"
                variant="solid"
                size="md"
                icon="i-lucide-check"
                class="font-bold rounded-xl"
                :disabled="!sectionForm.title.trim()"
                @click="saveSection"
              >
                {{ sectionModalMode === 'add' ? 'إنشاء القسم' : 'حفظ التعديل' }}
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>

    <!-- ============================================== -->
    <!-- Modal: Delete Section Confirmation            -->
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
              color="neutral"
              variant="outline"
              size="md"
              class="font-bold rounded-xl"
              @click="isDeleteSectionModalOpen = false"
            >
              إلغاء
            </UButton>
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
          </div>
        </div>
      </template>
    </UModal>

    <!-- ============================================== -->
    <!-- Modal: Add / Edit Lesson                       -->
    <!-- ============================================== -->
    <UModal v-model:open="isLessonModalOpen" :ui="{ content: 'sm:max-w-3xl' }">
      <template #content>
        <div class="p-6 flex flex-col gap-5 max-h-[85vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-book-open" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white m-0">
                  {{ lessonModalMode === 'add' ? 'إضافة درس جديد' : 'تعديل بيانات الدرس' }}
                </h3>
                <span class="text-xs text-slate-500 dark:text-slate-400">
                  حدد نوع الدرس (فيديو، نص ومقال، PDF، أو اختبار) وأدخل محتواه
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
            <!-- Section Selector -->
            <UFormField label="القسم التابع له الدرس" required class="font-bold text-slate-700 dark:text-slate-300">
              <select
                v-model="lessonForm.sectionId"
                class="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option
                  v-for="sec in sections"
                  :key="sec.id"
                  :value="sec.id"
                >
                  {{ sec.title }}
                </option>
              </select>
            </UFormField>

            <!-- Lesson Type Tabs -->
            <UFormField label="نوع المحتوى" class="font-bold text-slate-700 dark:text-slate-300">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  :class="[
                    'p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all',
                    lessonForm.type === 'video'
                      ? 'border-primary-500 bg-primary-50/60 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  ]"
                  @click="lessonForm.type = 'video'; lessonForm.typeLabel = 'فيديو'"
                >
                  <UIcon name="i-lucide-video" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span class="text-xs">درس فيديو</span>
                </button>

                <button
                  type="button"
                  :class="[
                    'p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all',
                    lessonForm.type === 'text'
                      ? 'border-primary-500 bg-primary-50/60 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  ]"
                  @click="lessonForm.type = 'text'; lessonForm.typeLabel = 'نص ومقال'"
                >
                  <UIcon name="i-lucide-file-text" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span class="text-xs">نص ومقال</span>
                </button>

                <button
                  type="button"
                  :class="[
                    'p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all',
                    lessonForm.type === 'pdf'
                      ? 'border-primary-500 bg-primary-50/60 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  ]"
                  @click="lessonForm.type = 'pdf'; lessonForm.typeLabel = 'ملف PDF'"
                >
                  <UIcon name="i-lucide-file-down" class="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span class="text-xs">ملف PDF</span>
                </button>

                <button
                  type="button"
                  :class="[
                    'p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all',
                    lessonForm.type === 'quiz'
                      ? 'border-primary-500 bg-primary-50/60 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  ]"
                  @click="lessonForm.type = 'quiz'; lessonForm.typeLabel = 'اختبار'"
                >
                  <UIcon name="i-lucide-help-circle" class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span class="text-xs">اختبار تقييمي</span>
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

            <!-- Duration / Pages / Questions -->
            <UFormField
              :label="
                lessonForm.type === 'video'
                  ? 'مدة الفيديو'
                  : lessonForm.type === 'text'
                    ? 'وقت القراءة المتوقع'
                    : lessonForm.type === 'pdf'
                      ? 'عدد الصفحات'
                      : 'عدد الأسئلة'
              "
              class="font-bold text-slate-700 dark:text-slate-300"
            >
              <UInput
                v-model="lessonForm.duration"
                :placeholder="
                  lessonForm.type === 'video'
                    ? 'مثال: 15:30 دقيقة'
                    : lessonForm.type === 'text'
                      ? 'مثال: 5 دقائق قراءة'
                      : lessonForm.type === 'pdf'
                        ? 'مثال: 8 صفحات'
                        : 'مثال: 10 أسئلة'
                "
                size="md"
                class="w-full"
              />
            </UFormField>

            <!-- ============================================== -->
            <!-- TYPE 1: VIDEO LESSON FIELDS                   -->
            <!-- ============================================== -->
            <div v-if="lessonForm.type === 'video'" class="flex flex-col gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <UIcon name="i-lucide-video" class="w-4 h-4 text-blue-600" />
                ملف الفيديو المحلي
              </span>

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
                <div class="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
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
                      @click="triggerVideoUpload"
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
                @click="triggerVideoUpload"
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
                <UButton
                  type="button"
                  variant="outline"
                  color="neutral"
                  size="xs"
                  class="font-bold rounded-lg mt-1"
                  @click.stop="triggerVideoUpload"
                >
                  اختر ملف فيديو
                </UButton>
              </div>

              <!-- Video Description -->
              <UFormField label="وصف وملاحظات الفيديو" class="font-bold text-slate-700 dark:text-slate-300">
                <UTextarea
                  v-model="lessonForm.videoDescription"
                  placeholder="أدخل ملخصاً أو توجيهات للطلاب حول ما يشاهده في هذا الفيديو..."
                  :rows="3"
                  size="md"
                  class="w-full"
                />
              </UFormField>
            </div>

            <!-- ============================================== -->
            <!-- TYPE 2: TEXT LESSON FIELDS (Rich Text Editor) -->
            <!-- ============================================== -->
            <div v-if="lessonForm.type === 'text'" class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <UIcon name="i-lucide-pen-tool" class="w-4 h-4 text-purple-600" />
                  محتوى المقال والشرح النصي (Rich Text Editor)
                </span>
                <span class="text-[11px] text-slate-400">يدعم التنسيقات الكاملة، العناوين، القوائم والأكواد</span>
              </div>

              <ClientOnly>
                <RichTextEditor
                  v-model="lessonForm.content"
                  placeholder="اكتب تفاصيل ومحتوى الدرس كاملاً هنا..."
                  min-height="240px"
                />
                <template #fallback>
                  <div class="p-8 text-center text-xs text-slate-400 border border-slate-200 dark:border-slate-800 rounded-xl">
                    جاري تحميل المحرر المنسق...
                  </div>
                </template>
              </ClientOnly>
            </div>

            <!-- ============================================== -->
            <!-- TYPE 3: PDF LESSON FIELDS                      -->
            <!-- ============================================== -->
            <div v-if="lessonForm.type === 'pdf'" class="flex flex-col gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <UIcon name="i-lucide-file-text" class="w-4 h-4 text-amber-600" />
                ملف المستند (PDF)
              </span>
              <div class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 text-center flex flex-col items-center gap-2">
                <UIcon name="i-lucide-file-up" class="w-8 h-8 text-amber-600" />
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">
                  ارفع ملف التمارين أو المذكرة بصيغة PDF
                </span>
                <UInput
                  v-model="lessonForm.pdfFileName"
                  placeholder="اسم الملف (مثال: ملخص_الوحدة_الأولى.pdf)"
                  size="sm"
                  class="w-full max-w-sm mt-1"
                />
              </div>
            </div>

            <!-- ============================================== -->
            <!-- TYPE 4: QUIZ LESSON FIELDS                     -->
            <!-- ============================================== -->
            <div v-if="lessonForm.type === 'quiz'" class="flex flex-col gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <UIcon name="i-lucide-help-circle" class="w-4 h-4 text-emerald-600" />
                إعدادات الاختبار التقييمي
              </span>
              <p class="text-xs text-slate-500 dark:text-slate-400 m-0 leading-relaxed">
                سيتمكن الطالب من أداء هذا الاختبار إلكترونياً والحصول على نتيجته فور الانتهاء وفق عدد الأسئلة والمدة المحددة.
              </p>
            </div>

            <!-- Footer Buttons -->
            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                class="font-bold rounded-xl"
                @click="isLessonModalOpen = false"
              >
                إلغاء
              </UButton>
              <UButton
                color="primary"
                variant="solid"
                size="md"
                icon="i-lucide-check"
                class="font-bold rounded-xl"
                :disabled="!lessonForm.title.trim() || !lessonForm.sectionId"
                @click="saveLesson"
              >
                {{ lessonModalMode === 'add' ? 'إضافة الدرس للقسم' : 'حفظ التعديلات' }}
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>
  </div>
</template>
