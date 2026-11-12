<script setup lang="ts">
const route = useRoute()

useHead({
  title: 'دورة جديدة - لوحة التحكم'
})

const { classroomOptions, addClassroom, addCourse } = useClassrooms()

// Stepper items for Nuxt UI UStepper
const stepperItems = [
  {
    title: 'معلومات الدورة',
    description: 'العنوان، الفصل والغلاف'
  },
  {
    title: 'دروس الدورة',
    description: 'الفيديوهات، الملفات والاختبارات'
  },
  {
    title: 'السعر والخيارات',
    description: 'التسعير، الشهادات وحالة النشر'
  }
]

// Current Step index in the 3-step wizard (0: info, 1: lessons, 2: price & options)
const currentStep = ref(0)
const titleError = ref('')

// Step 1: Course Info
interface CourseForm {
  title: string
  description: string
  classroom: string
  level: string
  coverImage: File | null
  isFree: boolean
  price: string | number
  issueCertificate: boolean
  allowReviews: boolean
  publishImmediately: boolean
}

const form = ref<CourseForm>({
  title: '',
  description: '',
  classroom: (route.query.classroom as string) || classroomOptions.value[0] || 'الصف الأول الثانوي',
  level: 'مبتدئ',
  coverImage: null,
  isFree: false,
  price: '250',
  issueCertificate: true,
  allowReviews: true,
  publishImmediately: true
})

const levels = [
  { label: 'مبتدئ', value: 'مبتدئ' },
  { label: 'متوسط', value: 'متوسط' },
  { label: 'متقدم', value: 'متقدم' }
]

// Step 2: Course Lessons
export interface LessonItem {
  id: number
  title: string
  type: 'video' | 'pdf' | 'quiz'
  typeLabel: string
  duration: string
}

const lessons = ref<LessonItem[]>([
  {
    id: 1,
    title: 'المقدمة وأهداف الدورة',
    type: 'video',
    typeLabel: 'فيديو',
    duration: '10:00 دقيقة'
  },
  {
    id: 2,
    title: 'ملخص وتمارين تمهيدية',
    type: 'pdf',
    typeLabel: 'ملف PDF',
    duration: '4 صفحات'
  }
])

// Lesson Modal State
const isLessonModalOpen = ref(false)
const lessonModalMode = ref<'add' | 'edit'>('add')
const lessonForm = reactive({
  id: 0,
  title: '',
  type: 'video' as 'video' | 'pdf' | 'quiz',
  typeLabel: 'فيديو',
  duration: ''
})

function openAddLesson(type: 'video' | 'pdf' | 'quiz' = 'video') {
  lessonModalMode.value = 'add'
  lessonForm.id = Date.now()
  lessonForm.type = type
  if (type === 'video') {
    lessonForm.typeLabel = 'فيديو'
    lessonForm.title = ''
    lessonForm.duration = '15:00 دقيقة'
  } else if (type === 'pdf') {
    lessonForm.typeLabel = 'ملف PDF'
    lessonForm.title = ''
    lessonForm.duration = '6 صفحات'
  } else {
    lessonForm.typeLabel = 'اختبار'
    lessonForm.title = ''
    lessonForm.duration = '10 أسئلة'
  }
  isLessonModalOpen.value = true
}

function openEditLesson(lesson: LessonItem) {
  lessonModalMode.value = 'edit'
  lessonForm.id = lesson.id
  lessonForm.title = lesson.title
  lessonForm.type = lesson.type
  lessonForm.typeLabel = lesson.typeLabel
  lessonForm.duration = lesson.duration
  isLessonModalOpen.value = true
}

function saveLesson() {
  if (!lessonForm.title.trim()) return

  if (lessonModalMode.value === 'add') {
    lessons.value.push({
      id: lessonForm.id,
      title: lessonForm.title.trim(),
      type: lessonForm.type,
      typeLabel: lessonForm.typeLabel,
      duration: lessonForm.duration.trim() || (lessonForm.type === 'video' ? '10:00 دقيقة' : lessonForm.type === 'pdf' ? '5 صفحات' : '5 أسئلة')
    })
  } else {
    const idx = lessons.value.findIndex(l => l.id === lessonForm.id)
    if (idx !== -1) {
      lessons.value[idx] = {
        ...lessons.value[idx],
        title: lessonForm.title.trim(),
        duration: lessonForm.duration.trim()
      }
    }
  }
  isLessonModalOpen.value = false
}

function deleteLesson(id: number) {
  lessons.value = lessons.value.filter(l => l.id !== id)
}

function moveLesson(index: number, direction: 'up' | 'down') {
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= lessons.value.length) return
  const temp = lessons.value[index]
  lessons.value[index] = lessons.value[targetIndex]
  lessons.value[targetIndex] = temp
}

// Classroom On-The-Fly Creation
const isCreateClassModalOpen = ref(false)
const newClassName = ref('')
const selectedClassColor = ref('bg-blue-600')
const colorPalette = [
  { name: 'أزرق', class: 'bg-blue-600' },
  { name: 'كهرماني', class: 'bg-amber-500' },
  { name: 'أخضر زمردي', class: 'bg-emerald-600' },
  { name: 'بنفسجي', class: 'bg-purple-600' },
  { name: 'وردي', class: 'bg-rose-500' },
  { name: 'سماوي', class: 'bg-cyan-600' }
]

function handleCreateClassroomOnTheFly() {
  const name = newClassName.value.trim()
  if (!name) return

  addClassroom(name, selectedClassColor.value)
  form.value.classroom = name
  newClassName.value = ''
  isCreateClassModalOpen.value = false
  triggerSuccess(`تم إنشاء «${name}» وتعيينه لهذه الدورة بنجاح!`)
}

// File Upload
const fileInputRef = ref<any>(null)
const previewImage = ref<string | null>(null)

function triggerFileInput() {
  const el = fileInputRef.value
  if (el?.$el?.querySelector) {
    const inputEl = el.$el.querySelector('input[type="file"]') as HTMLInputElement | null
    if (inputEl) {
      inputEl.click()
      return
    }
  }
  if (el?.click) {
    el.click()
  }
}

function handleCoverUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    form.value.coverImage = file
    previewImage.value = URL.createObjectURL(file)
  }
}

function removeCoverImage() {
  form.value.coverImage = null
  previewImage.value = null
  const el = fileInputRef.value
  if (el?.$el?.querySelector) {
    const inputEl = el.$el.querySelector('input[type="file"]') as HTMLInputElement | null
    if (inputEl) inputEl.value = ''
  }
}

// Navigation Between Steps
function goToStep(step: number) {
  if (step > 0 && !form.value.title.trim()) {
    titleError.value = 'يرجى إدخال عنوان الدورة أولاً للمتابعة'
    currentStep.value = 0
    return
  }
  titleError.value = ''
  currentStep.value = step
}

function nextStep() {
  if (currentStep.value === 0) {
    if (!form.value.title.trim()) {
      titleError.value = 'يرجى إدخال عنوان الدورة أولاً للمتابعة'
      return
    }
    titleError.value = ''
    currentStep.value = 1
  } else if (currentStep.value === 1) {
    currentStep.value = 2
  }
}

function prevStep() {
  if (currentStep.value === 2) {
    currentStep.value = 1
  } else if (currentStep.value === 1) {
    currentStep.value = 0
  }
}

// Submission
const isSubmitting = ref(false)
const showSuccessNotification = ref(false)
const notificationMessage = ref('')

function triggerSuccess(msg: string) {
  notificationMessage.value = msg
  showSuccessNotification.value = true
  setTimeout(() => {
    showSuccessNotification.value = false
  }, 3500)
}

function handleFinalSubmit(publish: boolean) {
  if (!form.value.title.trim()) {
    currentStep.value = 0
    titleError.value = 'يرجى إدخال عنوان الدورة أولاً'
    return
  }

  isSubmitting.value = true
  const coursePrice = form.value.isFree ? 0 : (form.value.price || 0)

  addCourse({
    title: form.value.title.trim(),
    classroom: form.value.classroom,
    price: coursePrice,
    status: publish ? 'published' : 'draft',
    lessonsCount: lessons.value.length
  })

  triggerSuccess(publish ? 'تم إنشاء ونشر الدورة بنجاح!' : 'تم حفظ الدورة كمسودة بنجاح!')

  setTimeout(() => {
    isSubmitting.value = false
    navigateTo('/teacher-dashboard/courses')
  }, 500)
}

function saveAsDraftQuick() {
  handleFinalSubmit(false)
}
</script>

<template>
  <div class="flex flex-col min-h-full">
    <!-- Sub-navbar Action Bar -->
    <DashboardActionBar max-width="max-w-5xl" container-class="px-6 md:px-10">
      <UButton
        to="/teacher-dashboard/courses"
        color="neutral"
        variant="outline"
        size="md"
        icon="i-lucide-arrow-right"
        class="font-bold rounded-xl cursor-pointer"
      >
        رجوع إلى دوراتي
      </UButton>
    </DashboardActionBar>

    <div class="flex flex-col gap-8 p-6 md:p-10 box-border w-full max-w-5xl mx-auto">
      <!-- Success Toast Alert -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="showSuccessNotification"
          class="fixed top-20 start-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm"
        >
          <UIcon name="i-lucide-check-circle" class="w-5 h-5 shrink-0" />
          <span>{{ notificationMessage }}</span>
        </div>
      </Transition>

    <!-- Stepper Navigation using Nuxt UI UStepper with numbers -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs">
      <UStepper
        v-model="currentStep"
        :items="stepperItems"
        :linear="false"
        color="primary"
        size="md"
        class="w-full"
        @update:model-value="goToStep"
      />
    </div>

    <!-- ============================================== -->
    <!-- STEP 1: Course Info                            -->
    <!-- ============================================== -->
    <div v-if="currentStep === 0" class="flex flex-col gap-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Main Form (2 cols) -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col gap-5">
            <div class="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-info" class="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h2 class="m-0 text-lg font-bold text-slate-900 dark:text-white">
                  البيانات الأساسية
                </h2>
                <span class="text-xs text-slate-500 dark:text-slate-400">حدد عنوان الدورة، وصفها، ومستواها التعليمي</span>
              </div>
            </div>

            <!-- Course Title -->
            <UFormField
              label="عنوان الدورة"
              required
              :error="titleError"
              class="font-bold text-slate-700 dark:text-slate-300"
            >
              <UInput
                v-model="form.title"
                placeholder="مثال: أساسيات الجبر وحل المعادلات الخطية"
                size="md"
                class="w-full"
                @update:model-value="titleError = ''"
              />
            </UFormField>

            <!-- Course Description -->
            <UFormField label="وصف الدورة" class="font-bold text-slate-700 dark:text-slate-300">
              <UTextarea
                v-model="form.description"
                placeholder="اكتب نبذة شاملة وموجزة عمّا سيتعلمه الطالب في هذه الدورة وأهدافها..."
                :rows="4"
                size="md"
                class="w-full"
              />
            </UFormField>

            <!-- Classroom Selector & Quick Add -->
            <UFormField label="الفصل الدراسي" class="font-bold text-slate-700 dark:text-slate-300">
              <div class="flex flex-col gap-2">
                <USelect
                  v-model="form.classroom"
                  :items="classroomOptions"
                  size="md"
                  class="w-full"
                />
                <div class="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    class="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
                    @click="isCreateClassModalOpen = true"
                  >
                    <UIcon name="i-lucide-plus-circle" class="w-4 h-4 shrink-0" />
                    <span>إنشاء فصل دراسي جديد وربطه بالدورة</span>
                  </button>
                  <NuxtLink
                    to="/teacher-dashboard/classrooms"
                    class="text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium"
                  >
                    إدارة الفصول
                  </NuxtLink>
                </div>
              </div>
            </UFormField>

            <!-- Course Level -->
            <UFormField label="مستوى الدورة" class="font-bold text-slate-700 dark:text-slate-300">
              <URadioGroup
                v-model="form.level"
                :items="levels"
                orientation="horizontal"
                variant="card"
                size="md"
                class="w-full"
                :ui="{
                  fieldset: 'grid grid-cols-3 gap-3 w-full',
                  item: 'justify-center cursor-pointer py-2.5 font-bold text-sm text-center'
                }"
              />
            </UFormField>
          </div>
        </div>

        <!-- Cover Image (1 col) -->
        <div class="flex flex-col gap-6">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col gap-4">
            <div class="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div class="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-image" class="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h2 class="m-0 text-lg font-bold text-slate-900 dark:text-white">
                  غلاف الدورة
                </h2>
                <span class="text-xs text-slate-500 dark:text-slate-400">صورة معبرة تظهر للطلاب</span>
              </div>
            </div>

            <UInput
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleCoverUpload"
            />

            <!-- Preview State -->
            <div v-if="previewImage" class="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <img
                :src="previewImage"
                alt="غلاف الدورة"
                class="w-full h-48 object-cover"
              />
              <div class="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <UButton
                  color="neutral"
                  variant="solid"
                  size="sm"
                  icon="i-lucide-edit"
                  class="font-bold rounded-lg cursor-pointer"
                  @click="triggerFileInput"
                >
                  تغيير
                </UButton>
                <UButton
                  color="error"
                  variant="solid"
                  size="sm"
                  icon="i-lucide-trash-2"
                  class="font-bold rounded-lg cursor-pointer"
                  @click="removeCoverImage"
                >
                  حذف
                </UButton>
              </div>
            </div>

            <!-- Upload Dropzone State -->
            <div
              v-else
              class="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary-400 hover:bg-primary-50/20 dark:hover:bg-primary-950/20 transition-colors rounded-xl p-6 text-center flex flex-col items-center gap-3 cursor-pointer"
              @click="triggerFileInput"
            >
              <div class="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-upload-cloud" class="w-6 h-6 shrink-0" />
              </div>
              <div class="flex flex-col items-center gap-1">
                <span class="text-sm font-bold text-slate-700 dark:text-slate-300">اسحب صورة الغلاف هنا</span>
                <UButton
                  type="button"
                  variant="outline"
                  color="neutral"
                  size="xs"
                  class="font-bold cursor-pointer rounded-lg my-1"
                  @click.stop="triggerFileInput"
                >
                  تصفح الملفات
                </UButton>
                <span class="text-[11px] text-slate-400 mt-1">يُفضل أبعاد 16:9 (1280 × 720)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 1 Footer Actions -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <UButton
            color="primary"
            variant="solid"
            size="lg"
            trailing-icon="i-lucide-arrow-left"
            class="font-bold rounded-xl px-6 cursor-pointer"
            @click="nextStep"
          >
            التالي: إضافة الدروس
          </UButton>
        </div>

        <div class="flex items-center gap-3">
          <UButton
            color="neutral"
            variant="outline"
            size="md"
            icon="i-lucide-file-text"
            class="font-bold rounded-xl px-4 cursor-pointer"
            @click="saveAsDraftQuick"
          >
            حفظ كمسودة
          </UButton>

          <UButton
            to="/teacher-dashboard/courses"
            color="neutral"
            variant="ghost"
            size="md"
            class="font-bold rounded-xl px-4 cursor-pointer"
          >
            إلغاء
          </UButton>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- STEP 2: Course Lessons                         -->
    <!-- ============================================== -->
    <div v-if="currentStep === 1" class="flex flex-col gap-6">
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col gap-5">
        <!-- Step 2 Header Toolbar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-layers" class="w-5 h-5 shrink-0" />
            </div>
            <div>
              <h2 class="m-0 text-lg font-bold text-slate-900 dark:text-white">
                محتوى ودروس الدورة
              </h2>
              <span class="text-xs text-slate-500 dark:text-slate-400">
                إجمالي الدروس المضافة: {{ lessons.length }} دروس
              </span>
            </div>
          </div>

          <!-- Quick Add Buttons -->
          <div class="flex flex-wrap items-center gap-2">
            <UButton
              color="primary"
              variant="subtle"
              size="sm"
              icon="i-lucide-video"
              class="font-bold rounded-xl"
              @click="openAddLesson('video')"
            >
              + فيديو
            </UButton>

            <UButton
              color="neutral"
              variant="subtle"
              size="sm"
              icon="i-lucide-file-text"
              class="font-bold rounded-xl"
              @click="openAddLesson('pdf')"
            >
              + ملف PDF
            </UButton>

            <UButton
              color="neutral"
              variant="subtle"
              size="sm"
              icon="i-lucide-help-circle"
              class="font-bold rounded-xl"
              @click="openAddLesson('quiz')"
            >
              + اختبار
            </UButton>
          </div>
        </div>

        <!-- Lessons List -->
        <div v-if="lessons.length > 0" class="flex flex-col gap-3">
          <div
            v-for="(lesson, index) in lessons"
            :key="lesson.id"
            class="flex items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all group"
          >
            <!-- Left: Order & Info -->
            <div class="flex items-center gap-3 min-w-0">
              <!-- Reorder Buttons -->
              <div class="flex flex-col gap-0.5 opacity-60 group-hover:opacity-100">
                <button
                  type="button"
                  :disabled="index === 0"
                  class="p-0.5 hover:text-primary-600 disabled:opacity-30 disabled:hover:text-inherit cursor-pointer"
                  title="تحريك لأعلى"
                  @click="moveLesson(index, 'up')"
                >
                  <UIcon name="i-lucide-chevron-up" class="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  :disabled="index === lessons.length - 1"
                  class="p-0.5 hover:text-primary-600 disabled:opacity-30 disabled:hover:text-inherit cursor-pointer"
                  title="تحريك لأسفل"
                  @click="moveLesson(index, 'down')"
                >
                  <UIcon name="i-lucide-chevron-down" class="w-3.5 h-3.5" />
                </button>
              </div>

              <!-- Index Badge -->
              <span class="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                {{ index + 1 }}
              </span>

              <!-- Type Icon -->
              <div
                :class="[
                  'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
                  lesson.type === 'video'
                    ? 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400'
                    : lesson.type === 'pdf'
                      ? 'bg-amber-100/80 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                      : 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                ]"
              >
                <UIcon
                  :name="
                    lesson.type === 'video'
                      ? 'i-lucide-play-circle'
                      : lesson.type === 'pdf'
                        ? 'i-lucide-file-text'
                        : 'i-lucide-help-circle'
                  "
                  class="w-5 h-5"
                />
              </div>

              <!-- Title & Duration -->
              <div class="flex flex-col min-w-0">
                <span class="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {{ lesson.title }}
                </span>
                <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <UBadge size="xs" variant="subtle" color="neutral" class="rounded-md">
                    {{ lesson.typeLabel }}
                  </UBadge>
                  <span>{{ lesson.duration }}</span>
                </div>
              </div>
            </div>

            <!-- Right: Actions -->
            <div class="flex items-center gap-1.5 shrink-0">
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
                aria-label="حذف الدرس"
                @click="deleteLesson(lesson.id)"
              />
            </div>
          </div>
        </div>

        <!-- Empty State for Lessons -->
        <div
          v-else
          class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3"
        >
          <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <UIcon name="i-lucide-folder-plus" class="w-6 h-6" />
          </div>
          <div class="flex flex-col items-center gap-1 max-w-sm">
            <h3 class="text-base font-bold text-slate-900 dark:text-white m-0">
              لم تتم إضافة أي دروس حتى الآن
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 m-0">
              يمكنك إضافة دروس فيديو أو ملفات PDF أو اختبارات الآن، أو متابعة الإنشاء وإضافتها لاحقاً من صفحة تعديل الدورة.
            </p>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <UButton
              color="primary"
              variant="solid"
              size="sm"
              icon="i-lucide-plus"
              class="font-bold rounded-xl"
              @click="openAddLesson('video')"
            >
              إضافة أول درس
            </UButton>
          </div>
        </div>
      </div>

      <!-- Step 2 Footer Actions -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <UButton
            color="neutral"
            variant="outline"
            size="lg"
            icon="i-lucide-arrow-right"
            class="font-bold rounded-xl px-5 cursor-pointer"
            @click="prevStep"
          >
            السابق: معلومات الدورة
          </UButton>

          <UButton
            color="primary"
            variant="solid"
            size="lg"
            trailing-icon="i-lucide-arrow-left"
            class="font-bold rounded-xl px-6 cursor-pointer"
            @click="nextStep"
          >
            التالي: السعر والخيارات
          </UButton>
        </div>

        <div class="flex items-center gap-3">
          <UButton
            color="neutral"
            variant="ghost"
            size="md"
            icon="i-lucide-file-text"
            class="font-bold rounded-xl px-4 cursor-pointer"
            @click="saveAsDraftQuick"
          >
            حفظ كمسودة
          </UButton>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- STEP 3: Course Price and Options               -->
    <!-- ============================================== -->
    <div v-if="currentStep === 2" class="flex flex-col gap-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Settings Column (2 cols) -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <!-- Pricing Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col gap-5">
            <div class="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div class="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-badge-percent" class="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h2 class="m-0 text-lg font-bold text-slate-900 dark:text-white">
                  تسعير الدورة
                </h2>
                <span class="text-xs text-slate-500 dark:text-slate-400">حدد ما إذا كانت الدورة مجانية أو مدفوعة وسعرها</span>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <div class="flex flex-col gap-0.5">
                <span class="text-sm font-bold text-slate-900 dark:text-white">دورة مجانية للجميع</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">يمكن لأي طالب التسجيل ومشاهدة المحتوى مجاناً</span>
              </div>
              <USwitch
                v-model="form.isFree"
                color="primary"
                size="md"
                class="cursor-pointer"
                aria-label="دورة مجانية"
              />
            </div>

            <!-- Price Input (if not free) -->
            <div v-if="!form.isFree" class="flex flex-col gap-2">
              <UFormField label="سعر الدورة" required class="font-bold text-slate-700 dark:text-slate-300">
                <UInput
                  v-model="form.price"
                  type="number"
                  placeholder="250"
                  size="md"
                  class="w-full"
                >
                  <template #trailing>
                    <span class="text-xs font-bold text-slate-500 pe-1 select-none">ج.م</span>
                  </template>
                </UInput>
              </UFormField>
              <span class="text-xs text-slate-400 font-medium">سيتم تحصيل هذا المبلغ بالجنيه المصري عند اشتراك الطالب.</span>
            </div>
          </div>

          <!-- Options Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col gap-5">
            <div class="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div class="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-sliders" class="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h2 class="m-0 text-lg font-bold text-slate-900 dark:text-white">
                  خيارات وإعدادات الدورة
                </h2>
                <span class="text-xs text-slate-500 dark:text-slate-400">تخصيص مزايا الشهادات، التقييم، وحالة النشر</span>
              </div>
            </div>

            <div class="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              <!-- Issue Certificate -->
              <div class="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div class="flex flex-col gap-0.5 leading-snug">
                  <span class="text-sm font-bold text-slate-800 dark:text-slate-200">إصدار شهادة إتمام</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">يحصل الطالب على شهادة معتمدة تلقائياً عند إتمام كافة دروس واختبارات الدورة</span>
                </div>
                <USwitch
                  v-model="form.issueCertificate"
                  color="primary"
                  size="md"
                  class="cursor-pointer shrink-0"
                  aria-label="إصدار شهادة إتمام"
                />
              </div>

              <!-- Allow Reviews -->
              <div class="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div class="flex flex-col gap-0.5 leading-snug">
                  <span class="text-sm font-bold text-slate-800 dark:text-slate-200">السماح بتقييمات ومراجعات الطلاب</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">إتاحة كتابة التقييمات والآراء للطلاب المسجلين بالدورة</span>
                </div>
                <USwitch
                  v-model="form.allowReviews"
                  color="primary"
                  size="md"
                  class="cursor-pointer shrink-0"
                  aria-label="السماح بالتقييمات"
                />
              </div>

              <!-- Publish Status -->
              <div class="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div class="flex flex-col gap-0.5 leading-snug">
                  <span class="text-sm font-bold text-slate-800 dark:text-slate-200">نشر الدورة فوراً للطلاب</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">إظهار الدورة فوراً في المنصة أو حفظها كمسودة للمراجعة لاحقاً</span>
                </div>
                <USwitch
                  v-model="form.publishImmediately"
                  color="primary"
                  size="md"
                  class="cursor-pointer shrink-0"
                  aria-label="نشر الدورة فوراً"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Review Summary Sidebar (1 col) -->
        <div class="flex flex-col gap-6">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col gap-4">
            <h3 class="m-0 text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              ملخص مراجعة الدورة
            </h3>

            <!-- Cover Mini Preview -->
            <div v-if="previewImage" class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 h-28">
              <img :src="previewImage" alt="غلاف" class="w-full h-full object-cover" />
            </div>

            <div class="flex flex-col gap-3 text-xs sm:text-sm">
              <div class="flex justify-between items-center py-1">
                <span class="text-slate-500 dark:text-slate-400 font-medium">عنوان الدورة</span>
                <span class="font-bold text-slate-900 dark:text-white max-w-[180px] truncate text-end">
                  {{ form.title || 'بدون عنوان' }}
                </span>
              </div>

              <div class="flex justify-between items-center py-1">
                <span class="text-slate-500 dark:text-slate-400 font-medium">الفصل الدراسي</span>
                <span class="font-bold text-slate-900 dark:text-white truncate">
                  {{ form.classroom }}
                </span>
              </div>

              <div class="flex justify-between items-center py-1">
                <span class="text-slate-500 dark:text-slate-400 font-medium">المستوى</span>
                <UBadge variant="subtle" color="neutral" size="sm" class="font-bold rounded-lg">
                  {{ form.level }}
                </UBadge>
              </div>

              <div class="flex justify-between items-center py-1">
                <span class="text-slate-500 dark:text-slate-400 font-medium">عدد الدروس</span>
                <span class="font-bold text-slate-900 dark:text-white">
                  {{ lessons.length }} دروس
                </span>
              </div>

              <div class="flex justify-between items-center py-1">
                <span class="text-slate-500 dark:text-slate-400 font-medium">السعر</span>
                <span class="font-black text-slate-900 dark:text-white text-base">
                  {{ form.isFree ? 'مجانية' : `${form.price || 0} ج.م` }}
                </span>
              </div>

              <div class="flex justify-between items-center py-1">
                <span class="text-slate-500 dark:text-slate-400 font-medium">حالة الحفظ</span>
                <UBadge
                  :color="form.publishImmediately ? 'success' : 'warning'"
                  variant="subtle"
                  size="sm"
                  class="font-bold rounded-lg"
                >
                  {{ form.publishImmediately ? 'نشر مباشر' : 'مسودة' }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3 Footer Actions -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <UButton
            color="neutral"
            variant="outline"
            size="lg"
            icon="i-lucide-arrow-right"
            class="font-bold rounded-xl px-5 cursor-pointer"
            @click="prevStep"
          >
            السابق: دروس الدورة
          </UButton>

          <UButton
            color="primary"
            variant="solid"
            size="lg"
            :icon="form.publishImmediately ? 'i-lucide-send' : 'i-lucide-save'"
            class="font-bold rounded-xl px-7 cursor-pointer"
            :loading="isSubmitting"
            @click="handleFinalSubmit(form.publishImmediately)"
          >
            {{ form.publishImmediately ? 'إنشاء ونشر الدورة الآن' : 'حفظ وإنشاء كمسودة' }}
          </UButton>
        </div>

        <div class="flex items-center gap-3">
          <UButton
            color="neutral"
            variant="ghost"
            size="md"
            icon="i-lucide-file-text"
            class="font-bold rounded-xl px-4 cursor-pointer"
            :disabled="isSubmitting"
            @click="saveAsDraftQuick"
          >
            حفظ كمسودة
          </UButton>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- Modal: Add / Edit Lesson                       -->
    <!-- ============================================== -->
    <UModal v-model:open="isLessonModalOpen">
      <template #content>
        <div class="p-6 flex flex-col gap-5">
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
                  أدخل تفاصيل الدرس ومدته أو عدد صفحاته
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
            <!-- Lesson Type -->
            <UFormField label="نوع المحتوى" class="font-bold text-slate-700 dark:text-slate-300">
              <div class="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  :class="[
                    'p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all',
                    lessonForm.type === 'video'
                      ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  ]"
                  @click="lessonForm.type = 'video'; lessonForm.typeLabel = 'فيديو'"
                >
                  <UIcon name="i-lucide-video" class="w-5 h-5" />
                  <span class="text-xs">فيديو</span>
                </button>

                <button
                  type="button"
                  :class="[
                    'p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all',
                    lessonForm.type === 'pdf'
                      ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  ]"
                  @click="lessonForm.type = 'pdf'; lessonForm.typeLabel = 'ملف PDF'"
                >
                  <UIcon name="i-lucide-file-text" class="w-5 h-5" />
                  <span class="text-xs">ملف PDF</span>
                </button>

                <button
                  type="button"
                  :class="[
                    'p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all',
                    lessonForm.type === 'quiz'
                      ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  ]"
                  @click="lessonForm.type = 'quiz'; lessonForm.typeLabel = 'اختبار'"
                >
                  <UIcon name="i-lucide-help-circle" class="w-5 h-5" />
                  <span class="text-xs">اختبار</span>
                </button>
              </div>
            </UFormField>

            <!-- Lesson Title -->
            <UFormField label="عنوان الدرس" required class="font-bold text-slate-700 dark:text-slate-300">
              <UInput
                v-model="lessonForm.title"
                placeholder="مثال: مقدمة في حل المعادلات الخطية"
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
                    : lessonForm.type === 'pdf'
                      ? 'مثال: 8 صفحات'
                      : 'مثال: 10 أسئلة'
                "
                size="md"
                class="w-full"
              />
            </UFormField>

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
                :disabled="!lessonForm.title.trim()"
                @click="saveLesson"
              >
                {{ lessonModalMode === 'add' ? 'إضافة الدرس' : 'حفظ التعديلات' }}
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>

    <!-- ============================================== -->
    <!-- Modal: Create Classroom On-The-Fly            -->
    <!-- ============================================== -->
    <UModal v-model:open="isCreateClassModalOpen">
      <template #content>
        <div class="p-6 flex flex-col gap-5">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-school" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white m-0">
                  إنشاء فصل دراسي جديد
                </h3>
                <span class="text-xs text-slate-500 dark:text-slate-400">
                  سيتم ربط هذا الفصل الدراسي بالدورة الحالية تلقائياً
                </span>
              </div>
            </div>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              class="cursor-pointer"
              @click="isCreateClassModalOpen = false"
            />
          </div>

          <form class="flex flex-col gap-4" @submit.prevent="handleCreateClassroomOnTheFly">
            <UFormField label="اسم الفصل الدراسي" required class="font-bold text-slate-700 dark:text-slate-300">
              <UInput
                v-model="newClassName"
                placeholder="مثال: الصف الأول الثانوي، أو الترم الصيفي"
                size="md"
                class="w-full"
                autofocus
              />
            </UFormField>

            <!-- Color Selection -->
            <div class="flex flex-col gap-2">
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300">لون التمييز للفصل:</span>
              <div class="flex items-center gap-2 flex-wrap">
                <button
                  v-for="color in colorPalette"
                  :key="color.class"
                  type="button"
                  class="w-7 h-7 rounded-full transition-transform cursor-pointer"
                  :class="[color.class, selectedClassColor === color.class ? 'ring-2 ring-offset-2 ring-slate-800 scale-110' : 'opacity-80 hover:opacity-100']"
                  :title="color.name"
                  @click="selectedClassColor = color.class"
                />
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
              <UButton
                color="neutral"
                variant="outline"
                size="md"
                class="font-bold rounded-xl"
                @click="isCreateClassModalOpen = false"
              >
                إلغاء
              </UButton>
              <UButton
                color="primary"
                variant="solid"
                size="md"
                icon="i-lucide-check"
                class="font-bold rounded-xl"
                :disabled="!newClassName.trim()"
                @click="handleCreateClassroomOnTheFly"
              >
                إنشاء وربط بالدورة
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>
    </div>
  </div>
</template>
