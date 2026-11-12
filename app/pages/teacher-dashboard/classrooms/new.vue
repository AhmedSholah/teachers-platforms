<script setup lang="ts">
useHead({
  title: 'إضافة فصل دراسي جديد - لوحة التحكم'
})

const router = useRouter()

const {
  classrooms,
  courses,
  addClassroom
} = useClassrooms()

// Form state
const name = ref('')
const description = ref('')
const selectedColor = ref('bg-blue-600')
const selectedCourseIds = ref<number[]>([])

// Feedback states
const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

// Color palette options
const colorOptions = [
  { label: 'أزرق', class: 'bg-blue-600', ring: 'ring-blue-600' },
  { label: 'أخضر زمردي', class: 'bg-emerald-600', ring: 'ring-emerald-600' },
  { label: 'كهرماني / برتقالي', class: 'bg-amber-500', ring: 'ring-amber-500' },
  { label: 'بنفسجي', class: 'bg-purple-600', ring: 'ring-purple-600' },
  { label: 'وردي', class: 'bg-rose-500', ring: 'ring-rose-500' },
  { label: 'سماوي', class: 'bg-cyan-600', ring: 'ring-cyan-600' },
  { label: 'نيلي', class: 'bg-indigo-600', ring: 'ring-indigo-600' }
]

function isClassroomExisting(val: string): boolean {
  const normalized = val.trim().toLowerCase()
  return classrooms.value.some(c => c.name.trim().toLowerCase() === normalized)
}

function validateForm(): boolean {
  errorMessage.value = ''
  const trimmed = name.value.trim()
  if (!trimmed) {
    errorMessage.value = 'يرجى كتابة اسم الفصل الدراسي أولاً.'
    return false
  }
  if (isClassroomExisting(trimmed)) {
    errorMessage.value = `فصل «${trimmed}» موجود بالفعل في قائمتك. يرجى اختيار اسم مختلف.`
    return false
  }
  return true
}

function toggleCourseSelection(id: number) {
  const idx = selectedCourseIds.value.indexOf(id)
  if (idx > -1) {
    selectedCourseIds.value.splice(idx, 1)
  } else {
    selectedCourseIds.value.push(id)
  }
}

async function handleSave(stayOnPage = false) {
  if (!validateForm()) return

  isSubmitting.value = true
  const trimmed = name.value.trim()

  try {
    // Add classroom
    const created = addClassroom(trimmed, selectedColor.value)
    if (created && description.value.trim()) {
      created.description = description.value.trim()
    }

    // Link selected courses if any
    if (selectedCourseIds.value.length > 0) {
      courses.value.forEach(c => {
        if (selectedCourseIds.value.includes(c.id)) {
          c.classroom = trimmed
        }
      })
      if (created) {
        created.courses = [...selectedCourseIds.value]
      }
    }

    if (stayOnPage) {
      // Reset form and notify
      name.value = ''
      description.value = ''
      selectedCourseIds.value = []
      successMessage.value = `تمت إضافة فصل «${trimmed}» بنجاح! يمكنك إضافة فصل آخر الآن.`
      errorMessage.value = ''
      setTimeout(() => {
        successMessage.value = ''
      }, 4000)
    } else {
      await router.push({
        path: '/teacher-dashboard/classrooms',
        query: { created: trimmed }
      })
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="flex flex-col min-h-full">
    <!-- Sub-navbar Action Bar -->
    <DashboardActionBar max-width="max-w-6xl" container-class="px-6 md:px-10">
      <UButton
        to="/teacher-dashboard/classrooms"
        color="neutral"
        variant="outline"
        size="md"
        icon="i-lucide-arrow-right"
        class="font-bold rounded-xl cursor-pointer"
      >
        رجوع إلى الفصول الدراسية
      </UButton>
    </DashboardActionBar>

    <div class="flex flex-col gap-6 p-6 sm:p-8 lg:p-10 max-w-6xl mx-auto w-full box-border">
      <!-- Success/Error Alerts -->
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

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Form Section (2 columns) -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <UCard class="border border-slate-200 shadow-xs rounded-2xl bg-white overflow-hidden">
            <template #header>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-school" class="w-5 h-5" />
                </div>
                <div>
                  <h1 class="text-lg sm:text-xl font-bold text-slate-900 m-0">
                    إضافة فصل دراسي جديد
                  </h1>
                  <p class="text-xs sm:text-sm text-slate-500 m-0">
                    أنشئ فصلاً دراسياً لتنظيم وتصنيف دوراتك التعليمية للطلاب
                  </p>
                </div>
              </div>
            </template>

            <form class="flex flex-col gap-6" @submit.prevent="handleSave(false)">
              <!-- Classroom Name -->
              <UFormField
                label="اسم الفصل الدراسي"
                required
                help="اختر اسماً يعبر عن الصف أو المستوى (مثال: الصف الأول الثانوي، الثالث الإعدادي، مادة الأحياء متقدم)"
                class="font-bold text-slate-700"
              >
                <UInput
                  v-model="name"
                  icon="i-lucide-graduation-cap"
                  placeholder="اكتب اسم الفصل الدراسي هنا..."
                  size="lg"
                  class="w-full"
                  autofocus
                  @update:model-value="errorMessage = ''"
                  @keydown.enter.prevent="handleSave(false)"
                />
              </UFormField>

              <!-- Description -->
              <UFormField
                label="وصف الفصل (اختياري)"
                help="ملاحظات أو نبذة مختصرة عن هذا الفصل الدراسي أو المرحلة التعليمية"
                class="font-bold text-slate-700"
              >
                <UTextarea
                  v-model="description"
                  placeholder="مثال: يختص هذا الفصل بطلاب الثانوية العامة للعام الدراسي الحالي..."
                  :rows="3"
                  size="md"
                  class="w-full"
                />
              </UFormField>

              <!-- Color Palette -->
              <div class="flex flex-col gap-2.5">
                <label class="text-sm font-bold text-slate-700">
                  لون وشعار الفصل الدراسي
                </label>
                <p class="text-xs text-slate-500 m-0">
                  سيظهر هذا اللون كنقطة تعريفية وشارة لتمييز دورات هذا الفصل عن غيره
                </p>

                <div class="flex items-center gap-3 flex-wrap pt-1">
                  <button
                    v-for="c in colorOptions"
                    :key="c.class"
                    type="button"
                    class="w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border-2"
                    :class="[
                      c.class,
                      selectedColor === c.class
                        ? 'ring-4 ring-offset-2 ring-blue-500 border-white scale-110 shadow-md'
                        : 'border-transparent hover:scale-105 opacity-80 hover:opacity-100'
                    ]"
                    :title="c.label"
                    @click="selectedColor = c.class"
                  >
                    <UIcon
                      v-if="selectedColor === c.class"
                      name="i-lucide-check"
                      class="w-4 h-4 text-white font-bold"
                    />
                  </button>
                </div>
              </div>

              <!-- Link existing courses (optional) -->
              <div v-if="courses.length > 0" class="flex flex-col gap-2.5 pt-4 border-t border-slate-100">
                <div class="flex items-center justify-between">
                  <label class="text-sm font-bold text-slate-700">
                    ربط دورات قائمة بهذا الفصل (اختياري)
                  </label>
                  <span class="text-xs text-slate-400">
                    {{ selectedCourseIds.length }} دورات محددة
                  </span>
                </div>
                <p class="text-xs text-slate-500 m-0">
                  يمكنك نقل بعض الدورات الحالية فوراً لتنضم إلى هذا الفصل الدراسي الجديد
                </p>

                <div class="max-h-56 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 bg-slate-50/50 p-1">
                  <div
                    v-for="crs in courses"
                    :key="crs.id"
                    class="flex items-center justify-between p-3 rounded-lg hover:bg-white transition-colors cursor-pointer"
                    @click="toggleCourseSelection(crs.id)"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <UCheckbox
                        :model-value="selectedCourseIds.includes(crs.id)"
                        class="pointer-events-none"
                      />
                      <div class="flex flex-col min-w-0">
                        <span class="text-sm font-bold text-slate-800 truncate">{{ crs.title }}</span>
                        <span class="text-xs text-slate-400">الفصل الحالي: {{ crs.classroom || 'بدون فصل' }}</span>
                      </div>
                    </div>
                    <UBadge
                      :color="crs.status === 'published' ? 'success' : 'neutral'"
                      variant="subtle"
                      size="xs"
                    >
                      {{ crs.status === 'published' ? 'منشورة' : 'مسودة' }}
                    </UBadge>
                  </div>
                </div>
              </div>

              <!-- Buttons Row -->
              <div class="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <UButton
                  to="/teacher-dashboard/classrooms"
                  color="neutral"
                  variant="outline"
                  size="lg"
                  class="font-bold rounded-xl justify-center cursor-pointer"
                >
                  إلغاء
                </UButton>

                <UButton
                  type="button"
                  color="neutral"
                  variant="subtle"
                  size="lg"
                  icon="i-lucide-plus"
                  class="font-bold rounded-xl justify-center cursor-pointer"
                  :disabled="!name.trim() || isSubmitting"
                  @click="handleSave(true)"
                >
                  حفظ وإضافة آخر
                </UButton>

                <UButton
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="lg"
                  icon="i-lucide-check"
                  class="font-bold rounded-xl justify-center cursor-pointer shadow-sm shadow-blue-500/20"
                  :disabled="!name.trim() || isSubmitting"
                  :loading="isSubmitting"
                >
                  حفظ وإنشاء الفصل
                </UButton>
              </div>
            </form>
          </UCard>
        </div>

        <!-- Sidebar / Live Preview (1 column) -->
        <div class="flex flex-col gap-6">
          <!-- Live Preview Card -->
          <UCard class="border border-slate-200 shadow-xs rounded-2xl bg-white overflow-hidden">
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-eye" class="w-4 h-4 text-blue-600" />
                <h3 class="text-sm font-bold text-slate-900 m-0">معاينة بطاقة الفصل</h3>
              </div>
            </template>

            <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-3">
              <div class="flex items-center gap-2.5">
                <span class="w-4 h-4 rounded-full shrink-0 shadow-xs" :class="selectedColor" />
                <h4 class="text-base font-bold text-slate-900 m-0 truncate">
                  {{ name.trim() || 'اسم الفصل الدراسي' }}
                </h4>
              </div>

              <p class="text-xs text-slate-500 line-clamp-2 m-0">
                {{ description.trim() || 'لا يوجد وصف مضاف لهذا الفصل الدراسي.' }}
              </p>

              <div class="flex items-center gap-4 py-2 border-y border-slate-200/60 text-xs font-semibold text-slate-600">
                <div class="flex items-center gap-1.5">
                  <UIcon name="i-lucide-book-open" class="w-4 h-4 text-blue-600" />
                  <span>{{ selectedCourseIds.length }} دورات</span>
                </div>
                <span class="text-slate-300">•</span>
                <div class="flex items-center gap-1.5">
                  <UIcon name="i-lucide-users" class="w-4 h-4 text-emerald-600" />
                  <span>0 طالب</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-1">
                <span class="text-[11px] text-slate-400 font-medium">معاينة حية للمظهر</span>
                <UBadge color="primary" variant="subtle" size="xs">
                  جديد
                </UBadge>
              </div>
            </div>
          </UCard>

          <!-- Tips Card -->
          <div class="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col gap-3">
            <div class="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <UIcon name="i-lucide-lightbulb" class="w-4 h-4" />
              <span>نصائح مفيدة</span>
            </div>
            <ul class="text-xs text-slate-600 space-y-2 ps-4 list-disc m-0">
              <li>تساعد الفصول الدراسية في تنظيم الدورات وتسهيل عثور الطلاب على المحتوى المناسب لصفهم الدراسي.</li>
              <li>يمكنك في أي وقت لاحق تعديل اسم الفصل أو حذفه دون التأثير على الدورات المربوطة به.</li>
              <li>يمكنك ربط أي دورة جديدة بهذا الفصل مباشرة عند إنشائها من صفحة "دورة جديدة".</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
