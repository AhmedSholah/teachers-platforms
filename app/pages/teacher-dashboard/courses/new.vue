<script setup lang="ts">
useHead({
  title: 'دورة جديدة - لوحة التحكم'
})

interface CourseForm {
  title: string
  description: string
  category: string
  price: string | number
  level: string
  coverImage: File | null
  issueCertificate: boolean
  allowReviews: boolean
  publishImmediately: boolean
}

const form = ref<CourseForm>({
  title: '',
  description: '',
  category: 'الصف الأول الثانوي',
  price: '',
  level: 'مبتدئ',
  coverImage: null,
  issueCertificate: true,
  allowReviews: true,
  publishImmediately: false
})

const categories = [
  'الصف الأول الثانوي',
  'الصف الثاني الثانوي',
  'الصف الثالث الثانوي',
  'بدون تصنيف'
]

const levels = [
  { label: 'مبتدئ', value: 'مبتدئ' },
  { label: 'متوسط', value: 'متوسط' },
  { label: 'متقدم', value: 'متقدم' }
]

const fileInputRef = ref<any>(null)
const previewImage = ref<string | null>(null)
const isSubmitting = ref(false)

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

function saveAndContinue() {
  if (!form.value.title) {
    alert('يرجى إدخال عنوان الدورة أولاً')
    return
  }
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    navigateTo('/teacher-dashboard/courses/edit')
  }, 400)
}

function saveAsDraft() {
  isSubmitting.value = true
  form.value.publishImmediately = false
  setTimeout(() => {
    isSubmitting.value = false
    navigateTo('/teacher-dashboard/courses')
  }, 400)
}
</script>

<template>
  <div class="flex flex-col gap-8 p-6 md:p-10 box-border w-full max-w-6xl mx-auto">
    <!-- Header with Back Button and Page Title -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex flex-col gap-1.5">
        <h1 class="m-0 text-3xl font-extrabold text-slate-900 leading-tight">
          إنشاء دورة جديدة
        </h1>
        <span class="text-sm md:text-base text-slate-500">
          أدخل بيانات الدورة وحدد خيارات النشر والشهادات للبدء في إعداد المنهج الدراسي.
        </span>
      </div>

      <UButton
        to="/teacher-dashboard/courses"
        color="neutral"
        variant="outline"
        size="md"
        icon="i-lucide-arrow-right"
        class="font-bold rounded-xl cursor-pointer self-start sm:self-auto shrink-0"
      >
        رجوع إلى دوراتي
      </UButton>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- Main Column: Course Details Card (2 cols) -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
          <template #header>
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-book-open" class="w-4 h-4 shrink-0" />
              </div>
              <h2 class="m-0 text-xl font-bold text-slate-900">
                بيانات الدورة
              </h2>
            </div>
          </template>

          <div class="flex flex-col gap-5">
            <!-- Course Title -->
            <UFormField label="عنوان الدورة" required class="font-bold text-slate-700">
              <UInput
                v-model="form.title"
                placeholder="مثال: أساسيات الجبر"
                size="md"
                class="w-full"
              />
            </UFormField>

            <!-- Course Description -->
            <UFormField label="وصف الدورة" class="font-bold text-slate-700">
              <UTextarea
                v-model="form.description"
                placeholder="اكتب نبذة قصيرة عمّا سيتعلّمه الطالب"
                :rows="4"
                size="md"
                class="w-full"
              />
            </UFormField>

            <!-- Category and Price Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Category -->
              <UFormField label="التصنيف" class="font-bold text-slate-700">
                <div class="flex flex-col gap-1.5">
                  <USelect
                    v-model="form.category"
                    :items="categories"
                    size="md"
                    class="w-full"
                  />
                  <NuxtLink
                    to="/teacher-dashboard/courses/categories"
                    class="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer self-start"
                  >
                    <UIcon name="i-lucide-plus" class="w-3.5 h-3.5 shrink-0" />
                    <span>إنشاء تصنيف جديد</span>
                  </NuxtLink>
                </div>
              </UFormField>

              <!-- Price -->
              <UFormField label="السعر" class="font-bold text-slate-700">
                <UInput
                  v-model="form.price"
                  type="number"
                  placeholder="0"
                  size="md"
                  class="w-full"
                >
                  <template #trailing>
                    <span class="text-xs font-bold text-slate-500 pe-1 select-none">ج.م</span>
                  </template>
                </UInput>
              </UFormField>
            </div>

            <!-- Course Level -->
            <UFormField label="مستوى الدورة" class="font-bold text-slate-700">
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
        </UCard>
      </div>

      <!-- Sidebar Column: Cover & Options (1 col) -->
      <div class="flex flex-col gap-6">
        <!-- Cover Image Card -->
        <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
          <template #header>
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-image" class="w-4 h-4 shrink-0" />
              </div>
              <h2 class="m-0 text-xl font-bold text-slate-900">
                غلاف الدورة
              </h2>
            </div>
          </template>

          <UInput
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleCoverUpload"
          />

          <!-- Preview State -->
          <div v-if="previewImage" class="relative group rounded-xl overflow-hidden border border-slate-200">
            <img
              :src="previewImage"
              alt="غلاف الدورة"
              class="w-full h-44 object-cover"
            />
            <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
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
            class="border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-colors rounded-xl p-6 text-center flex flex-col items-center gap-3 cursor-pointer"
            @click="triggerFileInput"
          >
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-upload-cloud" class="w-6 h-6 shrink-0" />
            </div>
            <div class="flex flex-col items-center gap-1">
              <span class="text-sm font-bold text-slate-700">اسحب صورة الغلاف هنا أو</span>
              <UButton
                type="button"
                variant="outline"
                color="neutral"
                size="xs"
                class="font-bold cursor-pointer rounded-lg my-1"
                @click.stop="triggerFileInput"
              >
                اختر صورة
              </UButton>
              <span class="text-xs text-slate-400 mt-1">[الأبعاد والحجم المسموح] (1280 × 720)</span>
            </div>
          </div>
        </UCard>

        <!-- Course Options Card -->
        <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
          <template #header>
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-sliders" class="w-4 h-4 shrink-0" />
              </div>
              <h2 class="m-0 text-xl font-bold text-slate-900">
                خيارات الدورة
              </h2>
            </div>
          </template>

          <div class="flex flex-col divide-y divide-slate-100">
            <!-- Issue Certificate -->
            <div class="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
              <div class="flex flex-col gap-0.5 leading-snug">
                <span class="text-sm font-bold text-slate-800">إصدار شهادة</span>
                <span class="text-xs text-slate-500">يحصل الطالب على شهادة عند إتمام الدورة</span>
              </div>
              <USwitch
                v-model="form.issueCertificate"
                color="primary"
                size="md"
                class="cursor-pointer shrink-0"
                aria-label="إصدار شهادة"
              />
            </div>

            <!-- Allow Reviews -->
            <div class="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
              <div class="flex flex-col gap-0.5 leading-snug">
                <span class="text-sm font-bold text-slate-800">السماح بالتقييمات</span>
                <span class="text-xs text-slate-500">يمكن للطلاب تقييم الدورة</span>
              </div>
              <USwitch
                v-model="form.allowReviews"
                color="primary"
                size="md"
                class="cursor-pointer shrink-0"
                aria-label="السماح بالتقييمات"
              />
            </div>

            <!-- Publish Immediately -->
            <div class="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
              <div class="flex flex-col gap-0.5 leading-snug">
                <span class="text-sm font-bold text-slate-800">نشر الدورة فور الحفظ</span>
                <span class="text-xs text-slate-500">إظهار الدورة لطلابك مباشرة</span>
              </div>
              <USwitch
                v-model="form.publishImmediately"
                color="primary"
                size="md"
                class="cursor-pointer shrink-0"
                aria-label="نشر الدورة فور الحفظ"
              />
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div class="flex flex-wrap items-center gap-3 pt-2">
      <UButton
        color="primary"
        variant="solid"
        size="lg"
        icon="i-lucide-arrow-left"
        trailing
        class="font-bold rounded-xl px-6 cursor-pointer"
        :loading="isSubmitting"
        @click="saveAndContinue"
      >
        حفظ ومتابعة لإضافة الدروس
      </UButton>

      <UButton
        color="neutral"
        variant="outline"
        size="lg"
        icon="i-lucide-file-text"
        class="font-bold rounded-xl px-5 cursor-pointer"
        :disabled="isSubmitting"
        @click="saveAsDraft"
      >
        حفظ كمسودة
      </UButton>

      <UButton
        to="/teacher-dashboard/courses"
        color="neutral"
        variant="ghost"
        size="lg"
        class="font-bold rounded-xl px-5 cursor-pointer"
      >
        إلغاء
      </UButton>
    </div>
  </div>
</template>