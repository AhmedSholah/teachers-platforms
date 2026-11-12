<script setup lang="ts">
definePageMeta({
  alias: ['/teacher-dashboard/settings/platform', '/settings/platform', '/settings']
})

const route = useRoute()
const router = useRouter()

type TabKey = 'general' | 'design'

const currentTab = ref<TabKey>(route.query.tab === 'design' ? 'design' : 'general')

watch(() => route.query.tab, (newTab) => {
  if (newTab === 'design') {
    currentTab.value = 'design'
  } else if (newTab === 'notifications') {
    navigateTo('/teacher-dashboard/settings/notifications', { replace: true })
  } else if (newTab === 'account') {
    navigateTo('/teacher-dashboard/profile', { replace: true })
  } else {
    currentTab.value = 'general'
  }
}, { immediate: true })

function setTab(tab: TabKey) {
  currentTab.value = tab
  router.replace({
    query: {
      ...route.query,
      tab: tab === 'general' ? undefined : 'design'
    }
  })
}

useHead({
  title: computed(() => currentTab.value === 'design' ? 'تصميم المنصة - إعدادات المنصة' : 'إعدادات المنصة - معلومات عامة')
})

const tabItems = [
  { label: 'معلومات عامة', icon: 'i-lucide-monitor', value: 'general' },
  { label: 'تصميم المنصة', icon: 'i-lucide-palette', value: 'design' }
]

// General Form State
const generalForm = ref({
  platformName: 'أكاديمية أحمد',
  platformDomain: 'ahmed.mydomain.com',
  currency: 'جنيه مصري (ج.م)',
  email: 'support@ahmed.mydomain.com',
  phone: '+20 100 000 0000',
  description: 'أكاديمية أحمد - المنصة الرائدة في تعليم وشرح مناهج الرياضيات بأسلوب تفاعلي ومبسط لجميع المراحل الدراسية.'
})

const currencyOptions = [
  'جنيه مصري (ج.م)',
  'ريال سعودي (ر.س)',
  'درهم إماراتي (د.إ)',
  'دولار أمريكي ($)'
]

// Design Form State
const designForm = ref({
  platformName: 'أكاديمية أحمد',
  welcomeMessage: 'أهلاً بك في أكاديمية أحمد، ابدأ رحلتك في تعلّم الرياضيات بطريقة ممتعة ومبسطة.'
})

// Design tab states
const selectedColor = ref('#2740E8')
const colors = [
  { name: 'أزرق', value: '#2740E8', bgClass: 'bg-[#2740E8]' },
  { name: 'أخضر', value: '#0E9F6E', bgClass: 'bg-[#0E9F6E]' },
  { name: 'أحمر', value: '#E5484D', bgClass: 'bg-[#E5484D]' },
  { name: 'برتقالي', value: '#F59E0B', bgClass: 'bg-[#F59E0B]' },
  { name: 'بنفسجي', value: '#8B5CF6', bgClass: 'bg-[#8B5CF6]' },
  { name: 'أسود', value: '#0F172A', bgClass: 'bg-[#0F172A]' }
]

const selectedColorObj = computed(() => colors.find(c => c.value === selectedColor.value) ?? colors[0])

const savedNotification = ref(false)
const savedMessage = ref('')

function saveGeneralSettings() {
  savedMessage.value = 'تم حفظ معلومات المنصة العامة بنجاح!'
  savedNotification.value = true
  setTimeout(() => {
    savedNotification.value = false
  }, 3000)
}

function saveDesignSettings() {
  savedMessage.value = 'تم حفظ ونشر تصميم المنصة بنجاح!'
  savedNotification.value = true
  setTimeout(() => {
    savedNotification.value = false
  }, 3000)
}
</script>

<template>
  <div class="flex flex-col gap-8 p-6 md:p-10 box-border w-full">
    <!-- Success Notification Alert -->
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <UAlert
        v-if="savedNotification"
        color="success"
        variant="subtle"
        icon="i-lucide-check-circle"
        :title="savedMessage"
        class="font-bold"
      />
    </Transition>

    <!-- Inner Tabs with Icons -->
    <div>
      <UTabs
        :items="tabItems"
        :model-value="currentTab"
        :content="false"
        size="md"
        class="w-full sm:w-auto"
        @update:model-value="(val) => setTab(val as TabKey)"
      />
    </div>

    <!-- Tab 1: معلومات عامة (General Info) -->
    <div v-show="currentTab === 'general'" class="flex flex-col gap-6">
      <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
        <template #header>
          <div class="flex flex-col gap-1">
            <h2 class="m-0 text-xl font-bold text-slate-900">البيانات والمعلومات الأساسية</h2>
            <span class="text-sm text-slate-500">إعدادات الهوية العامة لعنوان منصتك والعملة المستخدمة.</span>
          </div>
        </template>

        <div class="flex flex-col gap-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UFormField label="اسم المنصة" class="font-bold text-slate-700">
              <UInput
                v-model="generalForm.platformName"
                icon="i-lucide-building"
                placeholder="اسم المنصة"
                size="md"
                class="w-full"
              />
            </UFormField>

            <UFormField label="عنوان المنصة (النطاق)" class="font-bold text-slate-700">
              <UInput
                v-model="generalForm.platformDomain"
                readonly
                icon="i-lucide-globe"
                size="md"
                class="w-full bg-slate-50 text-slate-600"
              />
            </UFormField>

            <UFormField label="عملة البيع" class="font-bold text-slate-700">
              <USelect
                v-model="generalForm.currency"
                :items="currencyOptions"
                icon="i-lucide-coins"
                size="md"
                class="w-full"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="البريد الإلكتروني للتواصل والدعم" class="font-bold text-slate-700">
              <UInput
                v-model="generalForm.email"
                type="email"
                icon="i-lucide-mail"
                placeholder="support@domain.com"
                size="md"
                class="w-full"
              />
            </UFormField>

            <UFormField label="رقم الدعم الفني / واتساب" class="font-bold text-slate-700">
              <UInput
                v-model="generalForm.phone"
                type="tel"
                icon="i-lucide-phone"
                placeholder="+20 100 000 0000"
                size="md"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField label="نبذة تعريفية عن المنصة" class="font-bold text-slate-700">
            <UTextarea
              v-model="generalForm.description"
              placeholder="اكتب نبذة تعريفية عن منصتك..."
              rows="3"
              size="md"
              class="w-full leading-relaxed"
            />
          </UFormField>
        </div>

        <template #footer>
          <div class="flex flex-wrap items-center gap-3">
            <UButton
              color="primary"
              size="md"
              icon="i-lucide-save"
              class="font-bold cursor-pointer"
              @click="saveGeneralSettings"
            >
              حفظ التغييرات
            </UButton>
            <UButton
              to="/teacher-dashboard"
              variant="outline"
              color="neutral"
              size="md"
              class="font-bold cursor-pointer"
            >
              إلغاء
            </UButton>
          </div>
        </template>
      </UCard>
    </div>

    <!-- Tab 2: تصميم المنصة (Platform Design) -->
    <div v-show="currentTab === 'design'" class="flex flex-col gap-6">
      <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
        <template #header>
          <div class="flex flex-col gap-1">
            <h2 class="m-0 text-xl font-bold text-slate-900">الهوية البصرية وتصميم المنصة</h2>
            <span class="text-sm text-slate-500">تخصيص الشعار، الألوان الرئيسية، ورسالة الترحيب التي تظهر للطلاب.</span>
          </div>
        </template>

        <div class="flex flex-col gap-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <UFormField label="اسم المنصة المعروض" class="font-bold text-slate-700">
              <UInput
                v-model="designForm.platformName"
                icon="i-lucide-building"
                size="md"
                class="w-full"
              />
            </UFormField>

            <div class="flex flex-col gap-2">
              <span class="text-sm font-bold text-slate-700">الشعار</span>
              <div class="flex flex-wrap items-center gap-4">
                <div
                  class="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors duration-200"
                  :class="selectedColorObj.bgClass"
                >
                  <UIcon name="i-lucide-graduation-cap" class="w-7 h-7 text-white" />
                </div>
                <UButton
                  variant="outline"
                  color="neutral"
                  size="md"
                  icon="i-lucide-upload"
                  class="font-bold cursor-pointer"
                >
                  رفع شعار جديد
                </UButton>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2.5">
            <span class="text-sm font-bold text-slate-700">اللون الرئيسي للمنصة</span>
            <div class="flex flex-wrap items-center gap-3 py-1">
              <UButton
                v-for="color in colors"
                :key="color.value"
                :title="color.name"
                :aria-label="color.name"
                variant="ghost"
                class="w-9 h-9 rounded-full p-0 transition-transform duration-150 shrink-0 cursor-pointer flex items-center justify-center"
                :class="[
                  color.bgClass,
                  selectedColor === color.value
                    ? 'ring-2 ring-offset-2 ring-slate-900 scale-110 shadow-sm'
                    : 'hover:scale-105'
                ]"
                @click="selectedColor = color.value"
              >
                <UIcon
                  v-if="selectedColor === color.value"
                  name="i-lucide-check"
                  class="w-4 h-4 text-white"
                />
              </UButton>
            </div>
          </div>

          <UFormField label="رسالة الترحيب للطلاب" class="font-bold text-slate-700">
            <UTextarea
              v-model="designForm.welcomeMessage"
              placeholder="اكتب رسالة ترحيبية تظهر للطلاب في الصفحة الرئيسية..."
              rows="3"
              size="md"
              class="w-full leading-relaxed"
            />
          </UFormField>
        </div>

        <template #footer>
          <div class="flex flex-wrap items-center gap-3">
            <UButton
              color="primary"
              size="md"
              icon="i-lucide-save"
              class="font-bold cursor-pointer"
              @click="saveDesignSettings"
            >
              حفظ ونشر التصميم
            </UButton>
            <UButton
              to="/teacher-dashboard/settings"
              variant="outline"
              color="neutral"
              size="md"
              class="font-bold cursor-pointer"
            >
              إعادة ضبط
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
