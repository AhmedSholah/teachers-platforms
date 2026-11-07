<script setup lang="ts">
useHead({
  title: 'تعديل الدورة - لوحة التحكم'
})

interface Lesson {
  id: number
  title: string
  type: 'video' | 'pdf' | 'quiz'
  typeLabel: string
  duration: string
}

// Course reactive state
const course = reactive({
  title: 'أساسيات الجبر',
  category: 'الصف الأول الثانوي',
  price: '250',
  isPublished: true,
  studentsCount: 124
})

// Categories
const categories = [
  'الصف الأول الثانوي',
  'الصف الثاني الثانوي',
  'الصف الثالث الثانوي',
  'بدون تصنيف'
]

// Lessons list
const lessons = ref<Lesson[]>([
  { id: 1, title: 'مقدمة في الجبر', type: 'video', typeLabel: 'فيديو', duration: '12:30' },
  { id: 2, title: 'المتغيرات والثوابت', type: 'video', typeLabel: 'فيديو', duration: '18:05' },
  { id: 3, title: 'ملف تمارين الوحدة الأولى', type: 'pdf', typeLabel: 'ملف PDF', duration: '8 صفحات' },
  { id: 4, title: 'حل المعادلات من الدرجة الأولى', type: 'video', typeLabel: 'فيديو', duration: '22:40' },
  { id: 5, title: 'اختبار الوحدة الأولى', type: 'quiz', typeLabel: 'اختبار', duration: '10 أسئلة' }
])

const isSaving = ref(false)
const showSuccessAlert = ref(false)
const successMessage = ref('')

// Add / Edit Lesson Modal State
const isLessonModalOpen = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const lessonForm = reactive({
  id: 0,
  title: '',
  type: 'video' as 'video' | 'pdf' | 'quiz',
  typeLabel: 'فيديو',
  duration: ''
})

// Delete Modal State
const isDeleteModalOpen = ref(false)
const lessonToDelete = ref<Lesson | null>(null)

// Unpublish Modal State
const isUnpublishModalOpen = ref(false)

function openAddLesson(type: 'video' | 'pdf' | 'quiz') {
  modalMode.value = 'add'
  lessonForm.id = Date.now()
  lessonForm.type = type
  if (type === 'video') {
    lessonForm.typeLabel = 'فيديو'
    lessonForm.title = 'درس فيديو جديد'
    lessonForm.duration = '15:00'
  } else if (type === 'pdf') {
    lessonForm.typeLabel = 'ملف PDF'
    lessonForm.title = 'ملف تمارين جديد'
    lessonForm.duration = '5 صفحات'
  } else {
    lessonForm.typeLabel = 'اختبار'
    lessonForm.title = 'اختبار تجريبي جديد'
    lessonForm.duration = '5 أسئلة'
  }
  isLessonModalOpen.value = true
}

function openEditLesson(lesson: Lesson) {
  modalMode.value = 'edit'
  lessonForm.id = lesson.id
  lessonForm.title = lesson.title
  lessonForm.type = lesson.type
  lessonForm.typeLabel = lesson.typeLabel
  lessonForm.duration = lesson.duration
  isLessonModalOpen.value = true
}

function saveLesson() {
  if (!lessonForm.title.trim()) return

  if (modalMode.value === 'add') {
    lessons.value.push({
      id: lessonForm.id,
      title: lessonForm.title,
      type: lessonForm.type,
      typeLabel: lessonForm.typeLabel,
      duration: lessonForm.duration || (lessonForm.type === 'video' ? '10:00' : lessonForm.type === 'pdf' ? '5 صفحات' : '5 أسئلة')
    })
    triggerAlert('تمت إضافة الدرس بنجاح')
  } else {
    const idx = lessons.value.findIndex(l => l.id === lessonForm.id)
    if (idx !== -1) {
      lessons.value[idx] = {
        ...lessons.value[idx],
        title: lessonForm.title,
        duration: lessonForm.duration
      }
      triggerAlert('تم تحديث بيانات الدرس بنجاح')
    }
  }
  isLessonModalOpen.value = false
}

function confirmDeleteLesson(lesson: Lesson) {
  lessonToDelete.value = lesson
  isDeleteModalOpen.value = true
}

function deleteLesson() {
  if (lessonToDelete.value) {
    lessons.value = lessons.value.filter(l => l.id !== lessonToDelete.value?.id)
    triggerAlert('تم حذف الدرس بنجاح')
  }
  isDeleteModalOpen.value = false
  lessonToDelete.value = null
}

function togglePublishStatus() {
  course.isPublished = !course.isPublished
  isUnpublishModalOpen.value = false
  triggerAlert(course.isPublished ? 'تم نشر الدورة للطلاب بنجاح' : 'تم إلغاء نشر الدورة وحفظها كمسودة')
}

function saveChanges() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    triggerAlert('تم حفظ تعديلات الدورة بنجاح')
  }, 600)
}

function triggerAlert(msg: string) {
  successMessage.value = msg
  showSuccessAlert.value = true
  setTimeout(() => {
    showSuccessAlert.value = false
  }, 4000)
}
</script>

<template>
  <div class="p-6 sm:p-8 lg:p-10 flex flex-col gap-6 max-w-7xl mx-auto w-full">
    <!-- Success Feedback Alert -->
    <UAlert
      v-if="showSuccessAlert"
      color="success"
      variant="subtle"
      icon="i-lucide-check-circle"
      :title="successMessage"
    />

    <!-- Header Actions Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
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
        <div class="flex flex-col gap-0.5">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0">
            تعديل الدورة: {{ course.title }}
          </h1>
          <span class="text-sm text-slate-500 font-medium">
            إدارة دروس الدورة، ترتيبها وضبط إعدادات النشر والتسعير.
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          href="https://ahmed.mydomain.com"
          target="_blank"
          rel="noopener noreferrer"
          color="neutral"
          variant="outline"
          size="md"
          icon="i-lucide-external-link"
          class="font-bold rounded-xl cursor-pointer"
        >
          معاينة
        </UButton>
      </div>
    </div>

    <!-- Main Content Layout (2 Columns) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- Left Column: Lessons (2 cols) -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-book-open" class="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 m-0">
                    دروس الدورة ({{ lessons.length }})
                  </h2>
                </div>
              </div>
              <span class="text-xs sm:text-sm text-slate-500 flex items-center gap-1 font-medium bg-slate-100/70 px-3 py-1 rounded-lg">
                <UIcon name="i-lucide-grip-vertical" class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                اسحب الدروس لإعادة ترتيبها
              </span>
            </div>
          </template>

          <!-- Lessons List -->
          <div class="flex flex-col divide-y divide-slate-100">
            <div
              v-for="(lesson, index) in lessons"
              :key="lesson.id"
              class="flex items-center gap-3 sm:gap-4 py-3.5 px-2 hover:bg-slate-50/80 rounded-xl transition-colors group"
            >
              <!-- Drag Grip Icon -->
              <div class="cursor-grab active:cursor-grabbing text-slate-300 group-hover:text-slate-500 transition-colors shrink-0">
                <UIcon name="i-lucide-grip-vertical" class="w-4 h-4 shrink-0" />
              </div>

              <!-- Index Number -->
              <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0">
                {{ index + 1 }}
              </div>

              <!-- Lesson Title -->
              <div class="flex-1 min-w-0">
                <span class="font-bold text-slate-900 text-sm sm:text-base truncate block">
                  {{ lesson.title }}
                </span>
              </div>

              <!-- Lesson Type Badge -->
              <UBadge
                :color="lesson.type === 'video' ? 'primary' : lesson.type === 'pdf' ? 'warning' : 'success'"
                variant="subtle"
                size="sm"
                class="font-bold shrink-0"
              >
                {{ lesson.typeLabel }}
              </UBadge>

              <!-- Duration / Count -->
              <span class="text-xs sm:text-sm text-slate-500 font-medium shrink-0 min-w-[70px] text-center font-mono">
                {{ lesson.duration }}
              </span>

              <!-- Actions -->
              <div class="flex items-center gap-1 shrink-0">
                <UButton
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  icon="i-lucide-edit-3"
                  aria-label="تعديل"
                  class="rounded-lg cursor-pointer text-slate-600 hover:text-slate-900"
                  @click="openEditLesson(lesson)"
                />
                <UButton
                  variant="ghost"
                  color="error"
                  size="sm"
                  icon="i-lucide-trash-2"
                  aria-label="حذف"
                  class="rounded-lg cursor-pointer"
                  @click="confirmDeleteLesson(lesson)"
                />
              </div>
            </div>

            <!-- Empty state if all lessons deleted -->
            <div
              v-if="lessons.length === 0"
              class="py-12 flex flex-col items-center justify-center gap-2 text-center text-slate-400"
            >
              <UIcon name="i-lucide-book-x" class="w-10 h-10 stroke-1" />
              <span class="text-sm font-medium">لا توجد دروس حالياً في هذه الدورة.</span>
            </div>
          </div>

          <!-- Add New Lesson Dashed Container -->
          <div class="mt-6 border-2 border-dashed border-slate-200 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
            <div class="flex items-center gap-2 text-slate-800 font-extrabold text-sm sm:text-base">
              <UIcon name="i-lucide-plus-circle" class="w-5 h-5 text-blue-600 shrink-0" />
              <span>إضافة درس جديد</span>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <UButton
                variant="outline"
                color="neutral"
                size="sm"
                icon="i-lucide-plus"
                class="font-bold rounded-xl cursor-pointer"
                @click="openAddLesson('video')"
              >
                فيديو
              </UButton>
              <UButton
                variant="outline"
                color="neutral"
                size="sm"
                icon="i-lucide-plus"
                class="font-bold rounded-xl cursor-pointer"
                @click="openAddLesson('pdf')"
              >
                ملف PDF
              </UButton>
              <UButton
                variant="outline"
                color="neutral"
                size="sm"
                icon="i-lucide-plus"
                class="font-bold rounded-xl cursor-pointer"
                @click="openAddLesson('quiz')"
              >
                اختبار
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Right Column: Course Settings (1 col) -->
      <div class="lg:col-span-1 flex flex-col gap-6">
        <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 m-0">
                إعدادات الدورة
              </h2>
              <UBadge
                :color="course.isPublished ? 'success' : 'neutral'"
                variant="subtle"
                size="sm"
                class="font-bold"
              >
                {{ course.isPublished ? 'منشورة' : 'مسودة' }}
              </UBadge>
            </div>
          </template>

          <form class="flex flex-col gap-5" @submit.prevent="saveChanges">
            <!-- Title -->
            <UFormField label="عنوان الدورة" name="title" class="font-bold text-slate-700">
              <UInput
                v-model="course.title"
                size="md"
                class="w-full"
                placeholder="عنوان الدورة"
              />
            </UFormField>

            <!-- Category -->
            <UFormField label="التصنيف" name="category" class="font-bold text-slate-700">
              <USelect
                v-model="course.category"
                :items="categories"
                size="md"
                class="w-full"
              />
            </UFormField>

            <!-- Price -->
            <UFormField label="السعر" name="price" class="font-bold text-slate-700">
              <UInput
                v-model="course.price"
                size="md"
                class="w-full"
                placeholder="0"
              >
                <template #trailing>
                  <span class="text-xs font-bold text-slate-500 pe-1">ج.م</span>
                </template>
              </UInput>
            </UFormField>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-3 pt-1">
              <div class="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span class="text-2xl font-extrabold text-slate-900">{{ course.studentsCount }}</span>
                <span class="text-xs font-bold text-slate-500">طالب</span>
              </div>
              <div class="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span class="text-2xl font-extrabold text-slate-900">{{ lessons.length }}</span>
                <span class="text-xs font-bold text-slate-500">دروس</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-2.5 pt-2">
              <UButton
                type="submit"
                color="primary"
                variant="solid"
                size="lg"
                block
                icon="i-lucide-check"
                :loading="isSaving"
                class="font-bold rounded-xl w-full justify-center cursor-pointer"
              >
                حفظ التغييرات
              </UButton>

              <UButton
                type="button"
                variant="outline"
                :color="course.isPublished ? 'error' : 'neutral'"
                size="md"
                block
                :icon="course.isPublished ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                class="font-bold rounded-xl w-full justify-center cursor-pointer"
                @click="isUnpublishModalOpen = true"
              >
                {{ course.isPublished ? 'إلغاء نشر الدورة' : 'نشر الدورة' }}
              </UButton>
            </div>
          </form>
        </UCard>
      </div>
    </div>

    <!-- Add / Edit Lesson Modal -->
    <UModal v-model:open="isLessonModalOpen">
      <template #content>
        <div class="p-6 flex flex-col gap-5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <UIcon
                  :name="lessonForm.type === 'video' ? 'i-lucide-video' : lessonForm.type === 'pdf' ? 'i-lucide-file-text' : 'i-lucide-help-circle'"
                  class="w-4 h-4"
                />
              </div>
              <h3 class="text-lg font-bold text-slate-900 m-0">
                {{ modalMode === 'add' ? `إضافة درس جديد (${lessonForm.typeLabel})` : 'تعديل بيانات الدرس' }}
              </h3>
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
            <UFormField label="عنوان الدرس" required class="font-bold text-slate-700">
              <UInput
                v-model="lessonForm.title"
                placeholder="أدخل عنوان الدرس..."
                size="md"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="lessonForm.type === 'video' ? 'مدة الفيديو' : lessonForm.type === 'pdf' ? 'عدد الصفحات' : 'عدد الأسئلة'"
              class="font-bold text-slate-700"
            >
              <UInput
                v-model="lessonForm.duration"
                :placeholder="lessonForm.type === 'video' ? 'مثال: 15:30' : lessonForm.type === 'pdf' ? 'مثال: 12 صفحة' : 'مثال: 15 سؤال'"
                size="md"
                class="w-full"
              />
            </UFormField>

            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <UButton
                variant="outline"
                color="neutral"
                size="md"
                class="font-bold rounded-xl cursor-pointer"
                @click="isLessonModalOpen = false"
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
              >
                {{ modalMode === 'add' ? 'إضافة' : 'تحديث' }}
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UModal>

    <!-- Delete Lesson Confirmation Modal -->
    <UModal v-model:open="isDeleteModalOpen">
      <template #content>
        <div class="p-6 flex flex-col gap-4">
          <div class="flex items-center gap-3 text-red-600">
            <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-red-600 shrink-0" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 m-0">تأكيد حذف الدرس</h3>
              <span class="text-xs text-slate-500">لا يمكن التراجع عن هذا الإجراء</span>
            </div>
          </div>
          <p class="text-sm text-slate-600 leading-relaxed m-0">
            هل أنت متأكد من رغبتك في حذف درس «{{ lessonToDelete?.title }}»؟
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
              @click="deleteLesson"
            >
              تأكيد الحذف
            </UButton>
          </div>
        </div>
      </template>
    </UModal>

    <!-- Unpublish / Publish Confirmation Modal -->
    <UModal v-model:open="isUnpublishModalOpen">
      <template #content>
        <div class="p-6 flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              :class="course.isPublished ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'"
            >
              <UIcon
                :name="course.isPublished ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                class="w-5 h-5 shrink-0"
              />
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 m-0">
                {{ course.isPublished ? 'إلغاء نشر الدورة' : 'نشر الدورة' }}
              </h3>
              <span class="text-xs text-slate-500">تغيير حالة ظهور الدورة للطلاب</span>
            </div>
          </div>
          <p class="text-sm text-slate-600 leading-relaxed m-0">
            {{
              course.isPublished
                ? 'عند إلغاء نشر الدورة، ستتحول إلى مسودة ولن تظهر للطلاب الجدد في المنصة، مع بقائها متاحة للطلاب المسجلين سابقاً.'
                : 'عند نشر الدورة، ستظهر لجميع الطلاب وستصبح متاحة للتسجيل والشراء.'
            }}
          </p>
          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <UButton
              color="neutral"
              variant="outline"
              size="md"
              class="rounded-xl font-bold cursor-pointer"
              @click="isUnpublishModalOpen = false"
            >
              إلغاء
            </UButton>
            <UButton
              :color="course.isPublished ? 'warning' : 'primary'"
              variant="solid"
              size="md"
              class="rounded-xl font-bold cursor-pointer"
              @click="togglePublishStatus"
            >
              {{ course.isPublished ? 'تأكيد إلغاء النشر' : 'تأكيد النشر' }}
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>