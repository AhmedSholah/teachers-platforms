<script setup lang="ts">
definePageMeta({
  alias: ['/teacher-dashboard/settings/platform', '/settings/platform', '/settings']
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

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
    if (currentTab.value === 'design') return 'تصميم المنصة - الإعدادات'
    if (currentTab.value === 'domain') return 'عنوان المنصة (النطاق) - الإعدادات'
    return 'معلومات عامة - الإعدادات'
  })
})

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
  navigator.clipboard?.writeText(`https://${domainForm.value.subdomain}.mydomain.com`)
  copiedSubdomain.value = true
  toast.add({ title: 'تم نسخ الرابط الفرعي', color: 'success' })
  setTimeout(() => {
    copiedSubdomain.value = false
  }, 2000)
}

function copyRecordText(key: string, val: string) {
  navigator.clipboard?.writeText(val)
  copiedRecord.value = key
  toast.add({ title: 'تم نسخ السجل', color: 'success' })
  setTimeout(() => {
    copiedRecord.value = null
  }, 2000)
}

function verifyDns() {
  isVerifyingDns.value = true
  setTimeout(() => {
    isVerifyingDns.value = false
    isDnsVerified.value = true
    toast.add({
      title: 'تم التحقق من ربط النطاق بنجاح',
      description: 'سجلات DNS وشهادة الأمان SSL تعملان بشكل صحيح.',
      color: 'success'
    })
  }, 900)
}

const designForm = ref({
  platformName: 'أكاديمية أحمد',
  welcomeMessage: 'أهلاً بك في أكاديمية أحمد، ابدأ رحلتك في تعلّم الرياضيات بطريقة ممتعة ومبسطة.'
})

const selectedColor = ref('#2740E8')
const colors = [
  { name: 'أزرق', value: '#2740E8', bgClass: 'bg-[#2740E8]' },
  { name: 'أخضر', value: '#0E9F6E', bgClass: 'bg-[#0E9F6E]' },
  { name: 'أحمر', value: '#E5484D', bgClass: 'bg-[#E5484D]' },
  { name: 'برتقالي', value: '#F59E0B', bgClass: 'bg-[#F59E0B]' },
  { name: 'بنفسجي', value: '#8B5CF6', bgClass: 'bg-[#8B5CF6]' },
  { name: 'أسود', value: '#0F172A', bgClass: 'bg-[#0F172A]' }
]

const selectedColorObj = computed(() => colors.find(c => c.value === selectedColor.value) ?? colors[0]!)

function saveGeneralSettings() {
  toast.add({
    title: 'تم الحفظ',
    description: 'تم تحديث معلومات المنصة العامة بنجاح.',
    color: 'success',
    icon: 'i-lucide-check'
  })
}

function saveDomainSettings() {
  toast.add({
    title: 'تم الحفظ',
    description: 'تم حفظ إعدادات عنوان المنصة (النطاق) بنجاح.',
    color: 'success',
    icon: 'i-lucide-check'
  })
}

function saveDesignSettings() {
  toast.add({
    title: 'تم النشر',
    description: 'تم حفظ ونشر تصميم المنصة بنجاح.',
    color: 'success',
    icon: 'i-lucide-check'
  })
}
</script>

<template>
  <!-- Tab 1: General -->
  <UForm
    v-if="currentTab === 'general'"
    :state="generalForm"
    @submit="saveGeneralSettings"
  >
    <UPageCard
      title="معلومات المنصة"
      description="البيانات الأساسية لهوية منصتك وعملة البيع ومعلومات التواصل."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        type="submit"
        label="حفظ التغييرات"
        color="neutral"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <UFormField
        name="platformName"
        label="اسم المنصة"
        description="يظهر في رأس الموقع وصفحات الدورات والإيصالات."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="generalForm.platformName"
          class="w-full sm:w-72"
          autocomplete="off"
        />
      </UFormField>

      <USeparator />

      <UFormField
        name="currency"
        label="عملة البيع"
        description="العملة الافتراضية المعتمدة لعرض أسعار الدورات."
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <USelect
          v-model="generalForm.currency"
          :items="currencyOptions"
          class="w-full sm:w-72"
        />
      </UFormField>

      <USeparator />

      <UFormField
        name="email"
        label="بريد الدعم الفني"
        description="يُستخدم لتلقي استفسارات الطلاب وإشعارات النظام."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="generalForm.email"
          type="email"
          class="w-full sm:w-72"
        />
      </UFormField>

      <USeparator />

      <UFormField
        name="phone"
        label="رقم الدعم / واتساب"
        description="رقم التواصل المباشر المعروض للطلاب."
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="generalForm.phone"
          type="tel"
          class="w-full sm:w-72"
        />
      </UFormField>

      <USeparator />

      <UFormField
        name="description"
        label="نبذة عن المنصة"
        description="وصف مختصر يظهر في الصفحة التعريفية لأكاديميتك."
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full sm:w-80' }"
      >
        <UTextarea
          v-model="generalForm.description"
          :rows="4"
          autoresize
          class="w-full"
        />
      </UFormField>
    </UPageCard>
  </UForm>

  <!-- Tab 2: Domain -->
  <div v-else-if="currentTab === 'domain'" class="flex flex-col gap-6">
    <UPageCard
      title="عنوان المنصة (النطاق)"
      description="إدارة الرابط الفرعي المجاني وربط نطاقك الخاص (Custom Domain)."
      variant="naked"
      orientation="horizontal"
    >
      <UButton
        label="حفظ إعدادات النطاق"
        color="neutral"
        class="w-fit lg:ms-auto"
        @click="saveDomainSettings"
      />
    </UPageCard>

    <UPageCard
      title="النطاق الفرعي الافتراضي"
      description="رابط وصول دائم ومجاني لمنصتك، مفعل تلقائياً بشهادة SSL."
      variant="subtle"
    >
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div
          dir="ltr"
          class="flex-1 flex items-center bg-default border border-default rounded-md px-3 py-2 text-sm font-mono select-all"
        >
          <span class="text-muted select-none">https://</span>
          <span class="font-semibold text-primary">{{ domainForm.subdomain }}</span>
          <span class="text-muted select-none">.mydomain.com</span>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <UButton
            :icon="copiedSubdomain ? 'i-lucide-check' : 'i-lucide-copy'"
            :color="copiedSubdomain ? 'success' : 'neutral'"
            variant="outline"
            :label="copiedSubdomain ? 'تم النسخ' : 'نسخ الرابط'"
            @click="copySubdomain"
          />
          <UButton
            :to="`https://${domainForm.subdomain}.mydomain.com`"
            target="_blank"
            icon="i-lucide-external-link"
            variant="subtle"
            label="زيارة"
          />
        </div>
      </div>
    </UPageCard>

    <UPageCard
      title="النطاق الخاص (Custom Domain)"
      description="اربط نطاقك المستقل لتعزيز علامتك التجارية."
      variant="subtle"
    >
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="font-semibold text-highlighted">النطاق الخاص (Custom Domain)</p>
            <p class="text-sm text-muted">اربط نطاقك المستقل مثل ahmed-academy.com</p>
          </div>
          <UBadge
            v-if="domainForm.useCustomDomain && isDnsVerified"
            color="success"
            variant="subtle"
          >
            مربوط (SSL مفعل)
          </UBadge>
        </div>
      </template>

      <UFormField
        label="تفعيل النطاق الخاص"
        description="توجيه الزوار والطلاب تلقائياً إلى اسم نطاقك المستقل."
        class="flex items-center justify-between gap-4"
      >
        <USwitch v-model="domainForm.useCustomDomain" />
      </UFormField>

      <template v-if="domainForm.useCustomDomain">
        <USeparator />

        <UFormField
          label="اسم النطاق"
          description="أدخل اسم النطاق بدون https://"
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <div class="flex items-center gap-2 w-full sm:w-80">
            <UInput
              v-model="domainForm.customDomain"
              placeholder="ahmed-academy.com"
              class="flex-1 font-mono"
            />
            <UButton
              color="neutral"
              variant="outline"
              icon="i-lucide-refresh-cw"
              :loading="isVerifyingDns"
              label="فحص"
              @click="verifyDns"
            />
          </div>
        </UFormField>

        <USeparator />

        <div class="overflow-x-auto border border-default rounded-md bg-default">
          <table class="w-full text-xs text-start">
            <thead class="bg-elevated/50 border-b border-default text-muted">
              <tr>
                <th class="py-2.5 px-3 text-start font-medium">النوع</th>
                <th class="py-2.5 px-3 text-start font-medium">المضيف</th>
                <th class="py-2.5 px-3 text-start font-medium">القيمة</th>
                <th class="py-2.5 px-3 text-start font-medium">الحالة</th>
                <th class="py-2.5 px-3 text-end font-medium">نسخ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-default font-mono">
              <tr>
                <td class="py-2.5 px-3 font-semibold text-primary">CNAME</td>
                <td class="py-2.5 px-3">www</td>
                <td class="py-2.5 px-3">domains.mydomain.com</td>
                <td class="py-2.5 px-3 font-sans">
                  <UBadge color="success" variant="subtle" size="xs">متصل</UBadge>
                </td>
                <td class="py-2.5 px-3 text-end">
                  <UButton
                    :icon="copiedRecord === 'cname' ? 'i-lucide-check' : 'i-lucide-copy'"
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    @click="copyRecordText('cname', 'domains.mydomain.com')"
                  />
                </td>
              </tr>
              <tr>
                <td class="py-2.5 px-3 font-semibold text-primary">A</td>
                <td class="py-2.5 px-3">@</td>
                <td class="py-2.5 px-3">76.76.21.21</td>
                <td class="py-2.5 px-3 font-sans">
                  <UBadge color="success" variant="subtle" size="xs">متصل</UBadge>
                </td>
                <td class="py-2.5 px-3 text-end">
                  <UButton
                    :icon="copiedRecord === 'a' ? 'i-lucide-check' : 'i-lucide-copy'"
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    @click="copyRecordText('a', '76.76.21.21')"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </UPageCard>
  </div>

  <!-- Tab 3: Design -->
  <UForm
    v-else
    :state="designForm"
    @submit="saveDesignSettings"
  >
    <UPageCard
      title="الهوية البصرية والتصميم"
      description="تخصيص الشعار والألوان ورسالة الترحيب التي تظهر للطلاب."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        type="submit"
        label="حفظ ونشر التصميم"
        color="neutral"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <UFormField
        label="اسم المنصة المعروض"
        description="العنوان الرئيسي في واجهة الطالب."
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="designForm.platformName" class="w-full sm:w-72" />
      </UFormField>

      <USeparator />

      <UFormField
        label="الشعار"
        description="يُفضّل PNG أو SVG بخلفية شفافة."
        class="flex max-sm:flex-col justify-between sm:items-center gap-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="size-11 rounded-lg flex items-center justify-center text-white shrink-0"
            :class="selectedColorObj.bgClass"
          >
            <UIcon name="i-lucide-graduation-cap" class="size-6" />
          </div>
          <UButton
            label="رفع شعار جديد"
            color="neutral"
            variant="outline"
            icon="i-lucide-upload"
          />
        </div>
      </UFormField>

      <USeparator />

      <UFormField
        label="اللون الرئيسي للمنصة"
        description="اللون الأساسي للأزرار والعناصر التفاعلية."
        class="flex max-sm:flex-col justify-between sm:items-center gap-4"
      >
        <div class="flex flex-wrap items-center gap-2.5">
          <UButton
            v-for="color in colors"
            :key="color.value"
            :title="color.name"
            :aria-label="color.name"
            variant="ghost"
            class="size-8 rounded-full p-0 flex items-center justify-center"
            :class="[
              color.bgClass,
              selectedColor === color.value ? 'ring-2 ring-offset-2 ring-highlighted' : ''
            ]"
            @click="selectedColor = color.value"
          >
            <UIcon
              v-if="selectedColor === color.value"
              name="i-lucide-check"
              class="size-4 text-white"
            />
          </UButton>
        </div>
      </UFormField>

      <USeparator />

      <UFormField
        label="رسالة الترحيب للطلاب"
        description="تظهر للطلاب في الصفحة الرئيسية لأكاديميتك."
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full sm:w-80' }"
      >
        <UTextarea
          v-model="designForm.welcomeMessage"
          :rows="3"
          autoresize
          class="w-full"
        />
      </UFormField>
    </UPageCard>
  </UForm>
</template>
