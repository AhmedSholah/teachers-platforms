<script setup lang="ts">
definePageMeta({
  alias: ['/teacher-dashboard/settings/platform', '/settings/platform', '/settings']
})

const route = useRoute()
const router = useRouter()

type TabKey = 'general' | 'domain' | 'design'

const currentTab = ref<TabKey>(
  route.query.tab === 'design'
    ? 'design'
    : route.query.tab === 'domain'
      ? 'domain'
      : 'general'
)

watch(() => route.query.tab, (newTab) => {
  if (newTab === 'design') {
    currentTab.value = 'design'
  } else if (newTab === 'domain') {
    currentTab.value = 'domain'
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
      tab: tab === 'general' ? undefined : tab
    }
  })
}

useHead({
  title: computed(() => {
    if (currentTab.value === 'design') return 'تصميم المنصة - إعدادات المنصة'
    if (currentTab.value === 'domain') return 'عنوان المنصة (النطاق) - إعدادات المنصة'
    return 'إعدادات المنصة - معلومات عامة'
  })
})

const tabItems = [
  { label: 'معلومات عامة', icon: 'i-lucide-monitor', value: 'general' },
  { label: 'عنوان المنصة (النطاق)', icon: 'i-lucide-globe', value: 'domain' },
  { label: 'تصميم المنصة', icon: 'i-lucide-palette', value: 'design' }
]

// General Form State
const generalForm = ref({
  platformName: 'أكاديمية أحمد',
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

// Domain Form State
const domainForm = ref({
  subdomain: 'ahmed',
  customDomain: 'ahmed-academy.com',
  useCustomDomain: true
})

const copiedSubdomain = ref(false)
const copiedRecord = ref<string | null>(null)
const isVerifyingDns = ref(false)
const isDnsVerified = ref(true)

function copySubdomain() {
  navigator.clipboard.writeText(`https://${domainForm.value.subdomain}.mydomain.com`)
  copiedSubdomain.value = true
  setTimeout(() => {
    copiedSubdomain.value = false
  }, 2000)
}

function copyRecordText(key: string, val: string) {
  navigator.clipboard.writeText(val)
  copiedRecord.value = key
  setTimeout(() => {
    copiedRecord.value = null
  }, 2000)
}

function verifyDns() {
  isVerifyingDns.value = true
  setTimeout(() => {
    isVerifyingDns.value = false
    isDnsVerified.value = true
    savedMessage.value = 'تم التحقق من ربط النطاق وسجلات DNS بنجاح! النطاق يعمل بشكل صحيح.'
    savedNotification.value = true
    setTimeout(() => {
      savedNotification.value = false
    }, 4000)
  }, 1200)
}

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

function saveDomainSettings() {
  savedMessage.value = 'تم حفظ إعدادات عنوان المنصة (النطاق) بنجاح!'
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
  <div class="flex flex-col min-h-full">
    <div class="h-14 shrink-0" aria-hidden="true" />
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
            <span class="text-sm text-slate-500">إعدادات الهوية العامة لاسم منصتك والعملة المستخدمة في عمليات البيع.</span>
          </div>
        </template>

        <div class="flex flex-col gap-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="اسم المنصة" class="font-bold text-slate-700">
              <UInput
                v-model="generalForm.platformName"
                icon="i-lucide-building"
                placeholder="اسم المنصة"
                size="md"
                class="w-full"
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

          <!-- Quick link banner to Domain tab -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-globe" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <span class="text-xs text-slate-500 font-medium">عنوان المنصة (النطاق)</span>
                <span class="text-sm font-bold text-slate-800 font-mono dir-ltr text-start">
                  {{ domainForm.useCustomDomain && domainForm.customDomain ? domainForm.customDomain : `${domainForm.subdomain}.mydomain.com` }}
                </span>
              </div>
            </div>
            <UButton
              variant="outline"
              color="primary"
              size="sm"
              icon="i-lucide-arrow-left"
              class="font-bold cursor-pointer"
              @click="setTab('domain')"
            >
              إدارة إعدادات النطاق
            </UButton>
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

    <!-- Tab 2: عنوان المنصة (النطاق) (Platform Domain) -->
    <div v-show="currentTab === 'domain'" class="flex flex-col gap-6">
      <!-- Default Subdomain Card -->
      <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-globe" class="w-5 h-5 shrink-0" />
              </div>
              <div class="flex flex-col">
                <h2 class="m-0 text-xl font-bold text-slate-900">النطاق الافتراضي الممنوح (الرابط الفرعي)</h2>
                <span class="text-sm text-slate-500">رابط وصول مجاني ودائم لمنصتك التعليمية، جاهز ومفعل تلقائياً فور تسجيلك.</span>
              </div>
            </div>
            <UBadge color="success" variant="subtle" size="sm" class="font-bold flex items-center gap-1.5">
              <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
              نطاق نشط ومحمي
            </UBadge>
          </div>
        </template>

        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <span class="text-sm font-bold text-slate-700">رابط المنصة الفرعي المباشر</span>
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div class="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-mono dir-ltr select-all">
                <span class="text-slate-400 select-none">https://</span>
                <span class="font-bold text-blue-600">{{ domainForm.subdomain }}</span>
                <span class="text-slate-500 select-none">.mydomain.com</span>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <UButton
                  :icon="copiedSubdomain ? 'i-lucide-check' : 'i-lucide-copy'"
                  :color="copiedSubdomain ? 'success' : 'neutral'"
                  variant="outline"
                  size="md"
                  class="font-bold cursor-pointer"
                  @click="copySubdomain"
                >
                  {{ copiedSubdomain ? 'تم النسخ' : 'نسخ الرابط' }}
                </UButton>
                <UButton
                  :to="`https://${domainForm.subdomain}.mydomain.com`"
                  target="_blank"
                  icon="i-lucide-external-link"
                  variant="subtle"
                  color="primary"
                  size="md"
                  class="font-bold cursor-pointer"
                >
                  زيارة المنصة
                </UButton>
              </div>
            </div>
          </div>

          <div class="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-sm text-slate-700">
            <UIcon name="i-lucide-info" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span class="leading-relaxed">
              يمكن لطلابك ومتابعيك الدخول إلى متجرك ودوراتك مباشرة من خلال هذا الرابط حتى في حال عدم استخدام نطاق خاص. يتم تشفير الاتصال تلقائياً عبر بروتوكول HTTPS.
            </span>
          </div>
        </div>
      </UCard>

      <!-- Custom Domain Card -->
      <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden">
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-link-2" class="w-5 h-5 shrink-0" />
              </div>
              <div class="flex flex-col">
                <h2 class="m-0 text-xl font-bold text-slate-900">النطاق الخاص (Custom Domain)</h2>
                <span class="text-sm text-slate-500">اربط اسم نطاقك المستقل (مثال: ahmed-academy.com) لتعزيز علامتك التجارية وهويتك أمام طلابك.</span>
              </div>
            </div>
            <UBadge
              v-if="domainForm.useCustomDomain && isDnsVerified"
              color="success"
              variant="subtle"
              size="sm"
              class="font-bold flex items-center gap-1.5"
            >
              <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5" />
              مربوط ومتصل (SSL مفعل)
            </UBadge>
          </div>
        </template>

        <div class="flex flex-col gap-6">
          <!-- Toggle Custom Domain -->
          <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div class="flex flex-col gap-1">
              <span class="font-bold text-slate-900 text-base">تفعيل النطاق الخاص</span>
              <span class="text-sm text-slate-500">توجيه الزوار والطلاب تلقائياً إلى اسم نطاقك المستقل عند زيارة المنصة.</span>
            </div>
            <USwitch v-model="domainForm.useCustomDomain" size="lg" />
          </div>

          <div v-if="domainForm.useCustomDomain" class="flex flex-col gap-6">
            <!-- Custom Domain Input -->
            <UFormField
              label="اسم النطاق الخاص بك"
              description="أدخل اسم النطاق بدون https:// (مثال: ahmed-academy.com أو academy.domain.com)"
              class="font-bold text-slate-700"
            >
              <div class="flex flex-col sm:flex-row gap-3">
                <UInput
                  v-model="domainForm.customDomain"
                  icon="i-lucide-globe"
                  placeholder="ahmed-academy.com"
                  size="md"
                  class="w-full dir-ltr font-mono"
                />
                <UButton
                  color="neutral"
                  variant="outline"
                  size="md"
                  icon="i-lucide-refresh-cw"
                  :loading="isVerifyingDns"
                  class="font-bold shrink-0 cursor-pointer"
                  @click="verifyDns"
                >
                  فحص اتصال DNS
                </UButton>
              </div>
            </UFormField>

            <!-- DNS Configuration Guide -->
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-slate-800">إعدادات وسجلات الـ DNS المطلوبة في مزود النطاق</span>
                <span class="text-xs text-slate-500 font-medium">سجلات مطلوبة لربط النطاق بالخادم</span>
              </div>

              <div class="overflow-x-auto border border-slate-200 rounded-xl bg-slate-50">
                <table class="w-full text-sm text-slate-700 text-start">
                  <thead class="bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-600">
                    <tr>
                      <th class="py-3 px-4 text-start">النوع (Type)</th>
                      <th class="py-3 px-4 text-start">الاسم / المضيف (Host)</th>
                      <th class="py-3 px-4 text-start">القيمة / الموجه إليه (Value)</th>
                      <th class="py-3 px-4 text-start">الحالة</th>
                      <th class="py-3 px-4 text-center">نسخ</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200 font-mono text-xs">
                    <tr class="hover:bg-white transition-colors">
                      <td class="py-3 px-4 font-bold text-blue-600">CNAME</td>
                      <td class="py-3 px-4 text-slate-800">www</td>
                      <td class="py-3 px-4 text-slate-800">domains.mydomain.com</td>
                      <td class="py-3 px-4 font-sans">
                        <UBadge color="success" variant="subtle" size="xs" class="font-bold">
                          متصل
                        </UBadge>
                      </td>
                      <td class="py-3 px-4 text-center">
                        <UButton
                          :icon="copiedRecord === 'cname' ? 'i-lucide-check' : 'i-lucide-copy'"
                          :color="copiedRecord === 'cname' ? 'success' : 'neutral'"
                          variant="ghost"
                          size="xs"
                          class="cursor-pointer"
                          @click="copyRecordText('cname', 'domains.mydomain.com')"
                        />
                      </td>
                    </tr>
                    <tr class="hover:bg-white transition-colors">
                      <td class="py-3 px-4 font-bold text-violet-600">A</td>
                      <td class="py-3 px-4 text-slate-800">@</td>
                      <td class="py-3 px-4 text-slate-800">76.76.21.21</td>
                      <td class="py-3 px-4 font-sans">
                        <UBadge color="success" variant="subtle" size="xs" class="font-bold">
                          متصل
                        </UBadge>
                      </td>
                      <td class="py-3 px-4 text-center">
                        <UButton
                          :icon="copiedRecord === 'a' ? 'i-lucide-check' : 'i-lucide-copy'"
                          :color="copiedRecord === 'a' ? 'success' : 'neutral'"
                          variant="ghost"
                          size="xs"
                          class="cursor-pointer"
                          @click="copyRecordText('a', '76.76.21.21')"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- SSL / HTTPS Banner -->
            <div class="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-sm text-emerald-900">
              <UIcon name="i-lucide-shield-check" class="w-6 h-6 text-emerald-600 shrink-0" />
              <div class="flex flex-col">
                <span class="font-bold">شهادة أمان مجانية (SSL / HTTPS) مفعلة تلقائياً</span>
                <span class="text-xs text-emerald-800 leading-relaxed mt-0.5">
                  بمجرد توجيه سجلات الـ DNS بصورة صحيحة، يتم توليد شهادة تشفير SSL وتجديدها تلقائياً مجاناً لضمان موثوقية وأمان بياناتك وبيانات طلابك.
                </span>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex flex-wrap items-center gap-3">
            <UButton
              color="primary"
              size="md"
              icon="i-lucide-save"
              class="font-bold cursor-pointer"
              @click="saveDomainSettings"
            >
              حفظ إعدادات النطاق
            </UButton>
            <UButton
              to="/teacher-dashboard/settings"
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

    <!-- Tab 3: تصميم المنصة (Platform Design) -->
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
  </div>
</template>
