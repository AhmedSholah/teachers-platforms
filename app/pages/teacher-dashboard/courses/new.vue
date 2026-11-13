<script setup lang="ts">
const route = useRoute()

useHead({
  title: 'دورة جديدة - لوحة التحكم'
})

const {
  stages,
  classroomOptions,
  ensureLoaded,
  addClassroom,
  addCourse
} = useClassrooms()

await ensureLoaded()

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
  coverImage: null,
  isFree: false,
  price: '250',
  issueCertificate: true,
  allowReviews: true,
  publishImmediately: true
})

import type { SectionItem } from '~/composables/useClassrooms'

// Step 2: Course Sections & Lessons
const sections = ref<SectionItem[]>([])

const totalLessonsCount = computed(() => {
  return sections.value.reduce((acc, s) => acc + (s.lessons?.length || 0), 0)
})

// Classroom On-The-Fly Creation
const isCreateClassModalOpen = ref(false)
const newClassName = ref('')
const newClassStageId = ref(stages.value[0]?.id || '')
watch(stages, (list) => {
  if (!newClassStageId.value && list[0]?.id) {
    newClassStageId.value = list[0].id
  }
}, { immediate: true })
const selectedClassColor = ref('bg-blue-600')
const isCreatingClass = ref(false)
const toast = useToast()
const colorPalette = [
  { name: 'أزرق', class: 'bg-blue-600' },
  { name: 'كهرماني', class: 'bg-amber-500' },
  { name: 'أخضر زمردي', class: 'bg-emerald-600' },
  { name: 'بنفسجي', class: 'bg-purple-600' },
  { name: 'وردي', class: 'bg-rose-500' },
  { name: 'سماوي', class: 'bg-cyan-600' }
]

async function handleCreateClassroomOnTheFly() {
  const name = newClassName.value.trim()
  if (!name || isCreatingClass.value) return

  isCreatingClass.value = true
  try {
    await addClassroom(name, selectedClassColor.value, newClassStageId.value || undefined)
    form.value.classroom = name
    newClassName.value = ''
    isCreateClassModalOpen.value = false
    triggerSuccess(`تم إنشاء «${name}» وتعيينه لهذه الدورة بنجاح!`)
  } catch (err: unknown) {
    const fetchErr = err as { data?: { statusMessage?: string }; statusMessage?: string }
    toast.add({
      title: 'تعذر إنشاء الصف الدراسي',
      description: fetchErr?.data?.statusMessage || fetchErr?.statusMessage || 'حدث خطأ غير متوقع.',
      color: 'error'
    })
  } finally {
    isCreatingClass.value = false
  }
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

async function handleFinalSubmit(publish: boolean) {
  if (!form.value.title.trim()) {
    currentStep.value = 0
    titleError.value = 'يرجى إدخال عنوان الدورة أولاً'
    return
  }

  isSubmitting.value = true
  const coursePrice = form.value.isFree ? 0 : (form.value.price || 0)

  try {
    await addCourse({
      title: form.value.title.trim(),
      classroom: form.value.classroom,
      price: coursePrice,
      status: publish ? 'published' : 'draft',
      lessonsCount: totalLessonsCount.value,
      description: form.value.description.trim() || undefined,
      sections: JSON.parse(JSON.stringify(sections.value))
    })

    triggerSuccess(publish ? 'تم إنشاء ونشر الدورة بنجاح!' : 'تم حفظ الدورة كمسودة بنجاح!')
    await navigateTo('/teacher-dashboard/courses')
  } catch (err: unknown) {
    const fetchErr = err as { data?: { statusMessage?: string }; statusMessage?: string }
    toast.add({
      title: 'تعذر حفظ الدورة',
      description: fetchErr?.data?.statusMessage || fetchErr?.statusMessage || 'حدث خطأ أثناء حفظ الدورة.',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
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
          </div>

          <!-- Cover Image Card -->
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
                class="w-full h-48 sm:h-64 object-cover"
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
    <!-- STEP 2: Course Sections & Lessons              -->
    <!-- ============================================== -->
    <div v-if="currentStep === 1" class="flex flex-col gap-6">
      <CourseCurriculumManager v-model="sections" />

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
            <UFormField v-if="stages.length > 0" label="المرحلة الدراسية" class="font-bold text-slate-700 dark:text-slate-300">
              <USelect
                v-model="newClassStageId"
                :items="stages.map(s => ({ label: s.name, value: s.id }))"
                size="md"
                class="w-full"
              />
            </UFormField>

            <UFormField label="اسم الصف الدراسي" required class="font-bold text-slate-700 dark:text-slate-300">
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
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300">لون التمييز للصف:</span>
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
                type="submit"
                color="primary"
                variant="solid"
                size="md"
                icon="i-lucide-check"
                class="font-bold rounded-xl"
                :disabled="!newClassName.trim() || isCreatingClass"
                :loading="isCreatingClass"
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
