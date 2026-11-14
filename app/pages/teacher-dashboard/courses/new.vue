<script setup lang="ts">
import type { SectionItem } from '~/composables/useCourses'

useHead({
  title: 'دورة جديدة - لوحة التحكم'
})

const {
  ensureLoaded,
  addCourse
} = useCourses()

await ensureLoaded()

const stepperItems = [
  {
    title: 'معلومات الدورة',
    description: 'العنوان، الوصف والغلاف'
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

const currentStep = ref(0)
const titleError = ref('')

interface CourseForm {
  title: string
  description: string
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
  coverImage: null,
  isFree: false,
  price: '250',
  issueCertificate: true,
  allowReviews: true,
  publishImmediately: true
})

const sections = ref<SectionItem[]>([])

const totalLessonsCount = computed(() => {
  return sections.value.reduce((acc, s) => acc + (s.lessons?.length || 0), 0)
})

const toast = useToast()
const fileInputRef = ref<{ $el?: HTMLElement; click?: () => void } | null>(null)
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
  el?.click?.()
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

const isSubmitting = ref(false)

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
      price: coursePrice,
      status: publish ? 'published' : 'draft',
      lessonsCount: totalLessonsCount.value,
      description: form.value.description.trim() || undefined,
      sections: JSON.parse(JSON.stringify(sections.value))
    })

    toast.add({
      title: publish ? 'تم إنشاء ونشر الدورة بنجاح' : 'تم حفظ الدورة كمسودة',
      color: 'success'
    })
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
  <UDashboardPanel id="teacher-courses-new">
    <template #header>
      <UDashboardNavbar title="إنشاء دورة جديدة">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <TeacherUserMenu />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UButton
            to="/teacher-dashboard/courses"
            color="neutral"
            variant="outline"
            icon="i-lucide-arrow-right"
            label="رجوع إلى دوراتي"
          />
          <UButton
            color="neutral"
            variant="subtle"
            icon="i-lucide-file-text"
            label="حفظ كمسودة"
            :disabled="isSubmitting"
            @click="saveAsDraftQuick"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-6 w-full lg:max-w-4xl mx-auto">
        <UCard>
          <UStepper
            v-model="currentStep"
            :items="stepperItems"
            :linear="false"
            color="primary"
            size="md"
            class="w-full"
            @update:model-value="goToStep"
          />
        </UCard>

        <!-- STEP 1 -->
        <div v-if="currentStep === 0" class="flex flex-col gap-6">
          <UPageCard
            title="البيانات الأساسية"
            description="حدد عنوان الدورة ووصفها."
            variant="subtle"
          >
            <div class="flex flex-col gap-4">
              <UFormField
                label="عنوان الدورة"
                required
                :error="titleError"
              >
                <UInput
                  v-model="form.title"
                  placeholder="مثال: أساسيات الجبر وحل المعادلات الخطية"
                  class="w-full"
                  @update:model-value="titleError = ''"
                />
              </UFormField>

              <UFormField label="وصف الدورة">
                <UTextarea
                  v-model="form.description"
                  placeholder="اكتب نبذة شاملة عمّا سيتعلمه الطالب في هذه الدورة..."
                  :rows="4"
                  class="w-full"
                />
              </UFormField>
            </div>
          </UPageCard>

          <UPageCard
            title="غلاف الدورة"
            description="صورة معبرة تظهر للطلاب (يفضل 1280×720)."
            variant="subtle"
          >
            <UInput
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleCoverUpload"
            />

            <div v-if="previewImage" class="relative group rounded-lg overflow-hidden border border-default">
              <img
                :src="previewImage"
                alt="غلاف الدورة"
                class="w-full h-48 sm:h-64 object-cover"
              >
              <div class="absolute inset-0 bg-default/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <UButton color="neutral" variant="solid" size="sm" icon="i-lucide-edit" label="تغيير" @click="triggerFileInput" />
                <UButton color="error" variant="solid" size="sm" icon="i-lucide-trash-2" label="حذف" @click="removeCoverImage" />
              </div>
            </div>

            <div
              v-else
              class="border-2 border-dashed border-default hover:border-primary transition-colors rounded-lg p-8 text-center flex flex-col items-center gap-2 cursor-pointer bg-default"
              @click="triggerFileInput"
            >
              <UIcon name="i-lucide-upload-cloud" class="size-8 text-primary" />
              <span class="text-sm font-medium text-highlighted">اسحب صورة الغلاف هنا أو اضغط للاختيار</span>
              <span class="text-xs text-muted">PNG أو JPG بنسبة 16:9</span>
            </div>
          </UPageCard>

          <div class="flex items-center justify-between pt-2">
            <UButton
              trailing-icon="i-lucide-arrow-left"
              label="التالي: إضافة الدروس"
              @click="nextStep"
            />
            <UButton
              to="/teacher-dashboard/courses"
              color="neutral"
              variant="ghost"
              label="إلغاء"
            />
          </div>
        </div>

        <!-- STEP 2 -->
        <div v-if="currentStep === 1" class="flex flex-col gap-6">
          <CourseCurriculumManager v-model="sections" />

          <div class="flex items-center justify-between pt-2">
            <div class="flex items-center gap-2">
              <UButton
                color="neutral"
                variant="outline"
                icon="i-lucide-arrow-right"
                label="السابق: معلومات الدورة"
                @click="prevStep"
              />
              <UButton
                trailing-icon="i-lucide-arrow-left"
                label="التالي: السعر والخيارات"
                @click="nextStep"
              />
            </div>
          </div>
        </div>

        <!-- STEP 3 -->
        <div v-if="currentStep === 2" class="flex flex-col gap-6">
          <UPageCard
            title="تسعير الدورة"
            description="حدد ما إذا كانت الدورة مجانية أو مدفوعة وسعرها."
            variant="subtle"
          >
            <div class="flex flex-col gap-4">
              <UFormField
                label="دورة مجانية للجميع"
                description="يمكن لأي طالب التسجيل ومشاهدة المحتوى مجاناً."
                class="flex items-center justify-between gap-4"
              >
                <USwitch v-model="form.isFree" />
              </UFormField>

              <template v-if="!form.isFree">
                <USeparator />
                <UFormField label="سعر الدورة" required>
                  <UInput v-model="form.price" type="number" placeholder="250" class="w-full sm:w-64">
                    <template #trailing>
                      <span class="text-xs text-muted">ج.م</span>
                    </template>
                  </UInput>
                </UFormField>
              </template>
            </div>
          </UPageCard>

          <UPageCard
            title="خيارات وإعدادات الدورة"
            description="تخصيص مزايا الشهادات والتقييم وحالة النشر."
            variant="subtle"
            :ui="{ container: 'divide-y divide-default' }"
          >
            <UFormField
              label="إصدار شهادة إتمام"
              description="يحصل الطالب على شهادة معتمدة تلقائياً عند إتمام الدروس."
              class="flex items-center justify-between gap-4 pb-4"
            >
              <USwitch v-model="form.issueCertificate" />
            </UFormField>

            <UFormField
              label="السماح بتقييمات الطلاب"
              description="إتاحة كتابة التقييمات والآراء للطلاب المسجلين."
              class="flex items-center justify-between gap-4 py-4"
            >
              <USwitch v-model="form.allowReviews" />
            </UFormField>

            <UFormField
              label="نشر الدورة فوراً للطلاب"
              description="إظهار الدورة فوراً في المنصة أو حفظها كمسودة."
              class="flex items-center justify-between gap-4 pt-4"
            >
              <USwitch v-model="form.publishImmediately" />
            </UFormField>
          </UPageCard>

          <div class="flex items-center justify-between pt-2">
            <div class="flex items-center gap-2">
              <UButton
                color="neutral"
                variant="outline"
                icon="i-lucide-arrow-right"
                label="السابق: دروس الدورة"
                @click="prevStep"
              />
              <UButton
                :icon="form.publishImmediately ? 'i-lucide-send' : 'i-lucide-save'"
                :loading="isSubmitting"
                :label="form.publishImmediately ? 'إنشاء ونشر الدورة' : 'حفظ كمسودة'"
                @click="handleFinalSubmit(form.publishImmediately)"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
