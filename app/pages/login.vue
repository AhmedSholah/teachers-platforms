<script setup lang="ts">
import { loginSchema, type LoginSubmitEvent } from '~/composables/useAuthValidation'

const router = useRouter()

const state = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const showPassword = ref(false)

useHead({
  title: 'تسجيل الدخول - منصة المعلمين'
})

function handleLogin(_event: LoginSubmitEvent) {
  // Direct to teacher dashboard
  router.push('/teacher-dashboard')
}
</script>

<template>
  <div class="w-full min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900 font-sans">
    <!-- Left Hero/Branding Column -->
    <div class="relative w-full lg:w-5/12 xl:w-5/12 bg-blue-600 text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden shrink-0">
      <!-- Background Ambient Glow & Patterns -->
      <div class="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.22)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none opacity-80" />
      <div class="absolute -bottom-24 -start-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div class="absolute top-1/4 -end-16 w-60 h-60 rounded-full bg-amber-400/25 blur-3xl pointer-events-none" />

      <!-- Floating Decorative Badges -->
      <div class="absolute top-10 start-12 w-14 h-14 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md hidden sm:flex items-center justify-center text-white shadow-lg -rotate-6 pointer-events-none">
        <UIcon name="i-lucide-graduation-cap" class="w-7 h-7" />
      </div>
      <div class="absolute top-1/3 start-6 w-14 h-14 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md hidden sm:flex items-center justify-center text-white shadow-lg rotate-6 pointer-events-none">
        <UIcon name="i-lucide-book-open" class="w-7 h-7" />
      </div>
      <div class="absolute bottom-28 end-8 w-14 h-14 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md hidden sm:flex items-center justify-center text-amber-300 shadow-lg rotate-12 pointer-events-none">
        <UIcon name="i-lucide-sparkles" class="w-7 h-7" />
      </div>

      <!-- Brand Logo Header -->
      <div class="relative z-10 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-md shrink-0">
          <UIcon name="i-lucide-graduation-cap" class="w-6 h-6" />
        </div>
        <NuxtLink to="/" class="text-white font-extrabold text-xl hover:opacity-90 transition-opacity">
          [اسم علامتك]
        </NuxtLink>
      </div>

      <!-- Welcome Banner Message -->
      <div class="relative z-10 my-auto py-10 lg:py-16 flex flex-col gap-4 max-w-md">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          أهلاً بعودتك
        </h1>
        <p class="text-base sm:text-lg text-blue-100 leading-relaxed">
          سجّل دخولك لتتابع دوراتك وطلابك ومبيعاتك من مكان واحد.
        </p>

        <!-- Feature Points -->
        <div class="mt-4 flex flex-col gap-3 pt-2">
          <div class="flex items-center gap-3 text-sm sm:text-base text-blue-50 font-medium">
            <div class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-amber-300">
              <UIcon name="i-lucide-check" class="w-4 h-4" />
            </div>
            <span>لوحة تحكم ذكية وشاملة لإدارة دوراتك</span>
          </div>
          <div class="flex items-center gap-3 text-sm sm:text-base text-blue-50 font-medium">
            <div class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-amber-300">
              <UIcon name="i-lucide-check" class="w-4 h-4" />
            </div>
            <span>متابعة تفاعل الطلاب ونسب الإنجاز فورياً</span>
          </div>
          <div class="flex items-center gap-3 text-sm sm:text-base text-blue-50 font-medium">
            <div class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-amber-300">
              <UIcon name="i-lucide-check" class="w-4 h-4" />
            </div>
            <span>إحصائيات مالية وتقارير مبيعات دقيقة</span>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="relative z-10 text-xs text-blue-200">
        جميع الحقوق محفوظة © {{ new Date().getFullYear() }}
      </div>
    </div>

    <!-- Right Login Form Column -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-slate-50 min-h-[calc(100vh-200px)] lg:min-h-screen">
      <div class="w-full max-w-md">
        <UCard class="rounded-2xl border border-slate-200 shadow-sm bg-white p-2 sm:p-4">
          <!-- Form Header -->
          <div class="flex flex-col gap-1.5 mb-6">
            <div class="lg:hidden flex items-center gap-2.5 mb-3">
              <div class="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <UIcon name="i-lucide-graduation-cap" class="w-5 h-5" />
              </div>
              <span class="font-extrabold text-lg text-slate-900">[اسم علامتك]</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              تسجيل الدخول
            </h2>
            <p class="text-sm sm:text-base text-slate-500">
              أدخل بياناتك للوصول إلى حسابك.
            </p>
          </div>

          <!-- Login Form -->
          <UForm :schema="loginSchema" :state="state" class="flex flex-col gap-5" @submit="handleLogin">
            <!-- Email / Phone Field -->
            <UFormField label="البريد الإلكتروني أو رقم الهاتف" name="email" size="lg" class="w-full font-bold text-slate-700" required>
              <div dir="ltr" class="w-full">
                <UInput
                  id="id"
                  v-model="state.email"
                  type="text"
                  placeholder="name@example.com"
                  autocomplete="username"
                  icon="i-lucide-mail"
                  size="lg"
                  class="w-full"
                />
              </div>
            </UFormField>

            <!-- Password Field -->
            <UFormField label="كلمة المرور" name="password" size="lg" class="w-full font-bold text-slate-700" required>
              <UInput
                id="pw"
                v-model="state.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                icon="i-lucide-lock"
                size="lg"
                class="w-full"
              >
                <template #trailing>
                  <UButton
                    type="button"
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
                    class="cursor-pointer text-slate-400 hover:text-slate-600"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </UInput>
            </UFormField>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between gap-4 text-sm">
              <UCheckbox
                v-model="state.rememberMe"
                label="تذكّرني"
                color="primary"
                class="cursor-pointer font-medium text-slate-700"
              />
              <NuxtLink
                to="#"
                class="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                نسيت كلمة المرور؟
              </NuxtLink>
            </div>

            <!-- Submit Button -->
            <UButton
              type="submit"
              block
              size="xl"
              color="primary"
              class="font-bold cursor-pointer justify-center shadow-sm hover:shadow transition-all"
            >
              <UIcon name="i-lucide-log-in" class="w-5 h-5 ms-1.5" />
              <span>تسجيل الدخول</span>
            </UButton>

            <!-- Register Link -->
            <div class="text-center text-sm text-slate-500 pt-2">
              <span>ليس لديك حساب؟ </span>
              <NuxtLink
                to="/register"
                class="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                أنشئ منصتك الآن
              </NuxtLink>
            </div>
          </UForm>
        </UCard>
      </div>
    </div>
  </div>
</template>
