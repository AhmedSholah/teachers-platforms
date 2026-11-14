<script setup lang="ts">
import {
  registerStep1Schema,
  registerSchema
} from '~/composables/useAuthValidation'

const router = useRouter()

useHead({
  title: 'إنشاء حساب - منصة المعلمين'
})

// Current Step (1: Personal & Security Details, 2: Platform Details)
const currentStep = ref(1)
const formRef = useTemplateRef('registerForm')

// Form State
const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '+20' as '+20' | '+966',
  phone: '',
  gender: 'male' as 'male' | 'female',
  password: '',
  confirmPassword: '',
  subdomain: '',
  agreeTerms: false
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const currentSchema = computed(() =>
  currentStep.value === 1 ? registerStep1Schema : registerSchema
)

const countryOptions: Array<{
  code: '+20' | '+966'
  name: string
  flag: string
  placeholder: string
}> = [
  {
    code: '+20',
    name: 'مصر',
    flag: '🇪🇬',
    placeholder: '1012345678'
  },
  {
    code: '+966',
    name: 'السعودية',
    flag: '🇸🇦',
    placeholder: '501234567'
  }
]

const selectedCountry = computed(
  () =>
    countryOptions.find((c) => c.code === state.countryCode) ||
    countryOptions[0]
)

const countryMenuItems = computed(() => [
  countryOptions.map((c) => ({
    label: `${c.flag} ${c.name} (${c.code})`,
    onSelect: () => {
      state.countryCode = c.code
      if (state.phone.trim()) {
        formRef.value?.validate({ name: 'phone', silent: true })
      }
    }
  }))
])

const genderOptions = [
  { label: 'ذكر', value: 'male' },
  { label: 'أنثى', value: 'female' }
]

async function nextStep() {
  const valid = await formRef.value?.validate({ silent: true })
  if (valid) {
    currentStep.value = 2
  }
}

function prevStep() {
  currentStep.value = 1
}

async function handleRegister() {
  if (currentStep.value === 1) {
    await nextStep()
    return
  }
  router.push('/teacher-dashboard')
}
</script>

<template>
  <div
    class="w-full min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans"
  >
    <div class="flex-1 flex flex-col lg:flex-row">
      <!-- Brand Showcase Section (Side Banner) -->
      <div
        class="hidden lg:flex lg:w-[460px] xl:w-[520px] shrink-0 bg-blue-600 text-white relative overflow-hidden p-8 sm:p-12 lg:p-14 flex-col justify-between gap-10"
      >
        <!-- Decorative Background Glows -->
        <div
          class="absolute -bottom-24 -start-24 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none"
        />
        <div
          class="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none"
        />
        <div
          class="absolute top-1/2 -end-16 w-60 h-60 rounded-full bg-amber-400/20 blur-2xl pointer-events-none"
        />

        <!-- Floating Feature Badges -->
        <div
          class="hidden sm:flex absolute top-12 end-10 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white -rotate-6 shadow-lg shadow-blue-950/20"
        >
          <UIcon name="i-lucide-graduation-cap" class="w-7 h-7" />
        </div>
        <div
          class="hidden sm:flex absolute top-1/3 start-8 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white rotate-12 shadow-lg shadow-blue-950/20"
        >
          <UIcon name="i-lucide-book-open" class="w-7 h-7" />
        </div>
        <div
          class="hidden sm:flex absolute bottom-44 start-10 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white -rotate-12 shadow-lg shadow-blue-950/20"
        >
          <UIcon name="i-lucide-lightbulb" class="w-7 h-7" />
        </div>
        <div
          class="hidden sm:flex absolute bottom-16 end-8 w-14 h-14 rounded-2xl bg-amber-400/20 backdrop-blur-md border border-amber-300/40 items-center justify-center text-amber-300 rotate-6 shadow-lg shadow-amber-950/20"
        >
          <UIcon name="i-lucide-sparkles" class="w-7 h-7" />
        </div>

        <!-- Top Brand Header -->
        <div class="relative z-10 flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-md"
          >
            <UIcon name="i-lucide-graduation-cap" class="w-6 h-6" />
          </div>
          <NuxtLink
            to="/"
            class="text-xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            [اسم علامتك]
          </NuxtLink>
        </div>

        <!-- Main Showcase Content -->
        <div class="relative z-10 flex flex-col gap-4">
          <h1
            class="text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight text-white m-0"
          >
            ابدأ مدرستك على الإنترنت في دقائق
          </h1>
          <p
            class="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-md m-0"
          >
            أنشئ حسابك واختر اسم منصتك، ثم ابدأ برفع دوراتك واستقبال طلابك.
          </p>
        </div>

        <!-- Value Proposition List -->
        <div
          class="relative z-10 flex flex-col gap-3.5 text-sm sm:text-base font-bold"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30"
            >
              <UIcon name="i-lucide-check" class="w-4 h-4" />
            </div>
            <span>ارفع دوراتك ونظِّمها بسهولة</span>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30"
            >
              <UIcon name="i-lucide-check" class="w-4 h-4" />
            </div>
            <span>استقبل مدفوعات طلابك مباشرة</span>
          </div>
          <div class="flex items-center gap-3">
            <div
              class="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30"
            >
              <UIcon name="i-lucide-check" class="w-4 h-4" />
            </div>
            <span>تحكّم كامل بهويتك ومنصتك</span>
          </div>
        </div>
      </div>

      <!-- Registration Form Section -->
      <div class="flex-1 flex items-center justify-center p-4 sm:p-10 lg:p-14 bg-slate-50">
        <div class="w-full max-w-lg">
          <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white p-2 sm:p-4">
            <div class="flex flex-col gap-6">

        <!-- Step Progress Indicator -->
        <div class="flex items-center gap-3">
          <!-- Step 1 item -->
          <div
            class="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
            @click="prevStep"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              :class="
                currentStep >= 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500 border border-slate-300'
              "
            >
              <UIcon
                v-if="currentStep > 1"
                name="i-lucide-check"
                class="w-4 h-4 shrink-0"
              />
              <span v-else>1</span>
            </div>
            <span
              class="text-sm font-bold whitespace-nowrap transition-colors"
              :class="
                currentStep === 1
                  ? 'text-slate-900 font-extrabold'
                  : 'text-slate-500'
              "
            >
              بياناتك
            </span>
          </div>

          <!-- Connecting Divider Line -->
          <div class="flex-1 h-0.5 rounded-full overflow-hidden bg-slate-200">
            <div
              class="h-full bg-blue-600 transition-all duration-300"
              :class="currentStep >= 2 ? 'w-full' : 'w-0'"
            />
          </div>

          <!-- Step 2 item -->
          <div
            class="flex items-center gap-2.5 select-none cursor-pointer shrink-0"
            :class="currentStep >= 2 ? '' : 'opacity-70'"
            @click="nextStep"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              :class="
                currentStep >= 2
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-400 border-2 border-slate-200'
              "
            >
              <span>2</span>
            </div>
            <span
              class="text-sm font-bold whitespace-nowrap transition-colors"
              :class="
                currentStep === 2
                  ? 'text-slate-900 font-extrabold'
                  : 'text-slate-500'
              "
            >
              حساب منصتك
            </span>
          </div>
        </div>

        <!-- Form Title & Step Subtitle -->
        <div class="flex flex-col gap-1.5">
          <h2 class="m-0 text-2xl sm:text-3xl font-extrabold text-slate-900">
            إنشاء حساب جديد
          </h2>
          <p
            v-if="currentStep === 1"
            class="m-0 text-sm sm:text-base text-slate-500"
          >
            الخطوة 1 من 2: بياناتك الشخصية وكلمة المرور.
          </p>
          <p v-else class="m-0 text-sm sm:text-base text-slate-500">
            الخطوة 2 من 2: إعدادات اسم منصتك.
          </p>
        </div>

        <UForm
          ref="registerForm"
          :schema="currentSchema"
          :state="state"
          class="flex flex-col gap-5"
          @submit="handleRegister"
        >
          <!-- Step 1: Personal Details -->
          <div v-show="currentStep === 1" class="flex flex-col gap-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="الاسم الأول" name="firstName" required>
                <UInput
                  v-model="state.firstName"
                  type="text"
                  placeholder="أحمد"
                  autocomplete="given-name"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="الاسم الأخير" name="lastName" required>
                <UInput
                  v-model="state.lastName"
                  type="text"
                  placeholder="محمد"
                  autocomplete="family-name"
                  size="lg"
                  class="w-full"
                />
              </UFormField>
            </div>

            <UFormField label="البريد الإلكتروني" name="email" required>
              <div dir="ltr" class="w-full">
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="name@example.com"
                  autocomplete="email"
                  size="lg"
                  icon="i-lucide-mail"
                  class="w-full"
                />
              </div>
            </UFormField>

            <UFormField label="رقم الهاتف" name="phone">
              <template #default="{ error }">
                <div
                  dir="ltr"
                  class="flex items-center w-full rounded-xl border bg-white shadow-2xs transition-all overflow-hidden"
                  :class="
                    error
                      ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
                      : 'border-slate-300 hover:border-slate-400 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/20'
                  "
                >
                  <!-- Country Dropdown (Flag + Chevron) -->
                  <UDropdownMenu
                    :items="countryMenuItems"
                    :content="{ align: 'start' }"
                  >
                    <button
                      type="button"
                      class="flex items-center gap-1.5 px-3 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer select-none focus:outline-hidden shrink-0"
                    >
                      <!-- Crisp rectangular flag matching design -->
                      <span
                        class="inline-flex items-center justify-center w-6 h-4 overflow-hidden rounded-xs border border-slate-200/80 shadow-2xs shrink-0"
                      >
                        <svg
                          v-if="selectedCountry.code === '+20'"
                          class="w-full h-full object-cover"
                          viewBox="0 0 640 480"
                        >
                          <path fill="#c8102e" d="M0 0h640v160H0z" />
                          <path fill="#ffffff" d="M0 160h640v160H0z" />
                          <path fill="#000000" d="M0 320h640v160H0z" />
                          <circle cx="320" cy="240" r="28" fill="#c09300" />
                        </svg>
                        <svg
                          v-else
                          class="w-full h-full object-cover"
                          viewBox="0 0 640 480"
                        >
                          <path fill="#006c35" d="M0 0h640v480H0z" />
                          <path
                            fill="#ffffff"
                            d="M190 285h260v10H190zm20-5c-6 0-10 4-10 10s4 10 10 10 10-4 10-10-4-10-10-10zm25 0h190v4H235zm-20-40c20-10 50-10 70 0v5c-20-8-50-8-70 0zm80 0c20-10 50-10 70 0v5c-20-8-50-8-70 0zm80 0c20-10 50-10 70 0v5c-20-8-50-8-70 0z"
                          />
                        </svg>
                      </span>
                      <UIcon
                        name="i-lucide-chevron-down"
                        class="w-3.5 h-3.5 text-slate-400"
                      />
                    </button>
                  </UDropdownMenu>

                  <!-- Vertical Divider -->
                  <div class="h-5 w-px bg-slate-200 shrink-0" />

                  <!-- Code Prefix & Phone Input -->
                  <div class="flex items-center flex-1 min-w-0 ps-3 pe-2">
                    <span
                      class="text-slate-500 font-medium select-none text-base"
                    >
                      {{ state.countryCode }}
                    </span>
                    <UInput
                      v-model="state.phone"
                      type="text"
                      :placeholder="selectedCountry.placeholder"
                      autocomplete="tel-national"
                      variant="none"
                      size="lg"
                      class="flex-1 min-w-0"
                      :ui="{
                        base: 'px-2 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-hidden font-normal text-base'
                      }"
                    />
                  </div>
                </div>
              </template>
            </UFormField>

            <UFormField label="النوع" name="gender">
              <URadioGroup
                v-model="state.gender"
                :items="genderOptions"
                orientation="horizontal"
                variant="card"
                size="lg"
                class="w-full"
                :ui="{
                  fieldset: 'grid grid-cols-2 gap-3 w-full',
                  item: 'justify-center cursor-pointer py-3'
                }"
              />
            </UFormField>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField
                label="كلمة المرور"
                name="password"
                help="استخدم 8 أحرف على الأقل."
                required
              >
                <UInput
                  v-model="state.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  autocomplete="new-password"
                  size="lg"
                  icon="i-lucide-lock"
                  class="w-full"
                >
                  <template #trailing>
                    <UButton
                      type="button"
                      variant="ghost"
                      color="neutral"
                      size="xs"
                      :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                      class="cursor-pointer"
                      tabindex="-1"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </UInput>
              </UFormField>

              <UFormField
                label="تأكيد كلمة المرور"
                name="confirmPassword"
                required
              >
                <UInput
                  v-model="state.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  autocomplete="new-password"
                  size="lg"
                  icon="i-lucide-lock"
                  class="w-full"
                >
                  <template #trailing>
                    <UButton
                      type="button"
                      variant="ghost"
                      color="neutral"
                      size="xs"
                      :icon="
                        showConfirmPassword
                          ? 'i-lucide-eye-off'
                          : 'i-lucide-eye'
                      "
                      class="cursor-pointer"
                      tabindex="-1"
                      @click="showConfirmPassword = !showConfirmPassword"
                    />
                  </template>
                </UInput>
              </UFormField>
            </div>

            <UButton
              type="button"
              color="primary"
              size="xl"
              block
              class="font-bold w-full justify-center cursor-pointer shadow-md shadow-blue-500/20 mt-2"
              trailing-icon="i-lucide-arrow-left"
              @click="nextStep"
            >
              التالي
            </UButton>
          </div>

          <!-- Step 2: Platform Details -->
          <div v-show="currentStep === 2" class="flex flex-col gap-5">
            <UFormField
              label="اسم منصتك"
              name="subdomain"
              help="هذا هو عنوان منصتك. استخدم أحرفاً إنجليزية وأرقاماً فقط."
              required
            >
              <div dir="ltr" class="w-full">
                <UInput
                  v-model="state.subdomain"
                  type="text"
                  placeholder="ahmed"
                  autocomplete="off"
                  size="lg"
                  icon="i-lucide-globe"
                  class="w-full"
                >
                  <template #trailing>
                    <span
                      class="text-xs sm:text-sm font-semibold text-slate-400 select-none pe-2"
                    >
                      .mydomain.com
                    </span>
                  </template>
                </UInput>
              </div>
            </UFormField>

            <UFormField name="agreeTerms">
              <UCheckbox v-model="state.agreeTerms" size="lg" color="primary">
                <template #label>
                  <span class="text-sm text-slate-700 select-none">
                    أوافق على
                    <NuxtLink
                      to="/terms"
                      class="text-blue-600 font-bold hover:underline"
                      >الشروط</NuxtLink
                    >
                    و
                    <NuxtLink
                      to="/privacy"
                      class="text-blue-600 font-bold hover:underline"
                      >سياسة الخصوصية</NuxtLink
                    >
                  </span>
                </template>
              </UCheckbox>
            </UFormField>

            <div class="flex items-center gap-3 pt-2">
              <UButton
                type="button"
                variant="outline"
                color="neutral"
                size="xl"
                class="font-bold px-6 cursor-pointer"
                icon="i-lucide-arrow-right"
                @click="prevStep"
              >
                رجوع
              </UButton>
              <UButton
                type="submit"
                color="primary"
                size="xl"
                class="flex-1 font-bold justify-center cursor-pointer shadow-md shadow-blue-500/20"
                trailing-icon="i-lucide-sparkles"
              >
                أنشئ منصتي
              </UButton>
            </div>
          </div>
        </UForm>

        <!-- Login Redirect Link -->
        <div class="text-center text-sm text-slate-500 pt-2">
          <span>لديك حساب بالفعل؟ </span>
          <NuxtLink to="/login" class="text-blue-600 font-bold hover:underline">
            تسجيل الدخول
          </NuxtLink>
        </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
