<script setup lang="ts">
useSeoMeta({
  title: 'تسجيل الدخول — منصتك',
  description: 'سجّل دخولك إلى لوحة تحكم منصتك التعليمية لإدارة كورساتك وطلابك بكل سهولة.'
})

const email = ref('teacher@monasatk.com')
const password = ref('password123')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const previewTab = ref<'student' | 'exams' | 'codes'>('student')

const fillDemoAccount = () => {
  email.value = 'teacher@monasatk.com'
  password.value = 'teacher123456'
  errorMessage.value = ''
}

const handleLogin = async () => {
  if (!email.value) {
    errorMessage.value = 'يرجى إدخال البريد الإلكتروني'
    return
  }
  if (!password.value) {
    errorMessage.value = 'يرجى إدخال كلمة المرور'
    return
  }

  errorMessage.value = ''
  isLoading.value = true

  setTimeout(async () => {
    isLoading.value = false
    await navigateTo('/dashboard')
  }, 450)
}
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-neutral-900 grid grid-cols-1 lg:grid-cols-12 selection:bg-brand-100 selection:text-brand-950">
    
    <!-- Right Pane (6 cols): Pure White Editorial Login Form -->
    <div class="lg:col-span-6 flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
      <!-- Top Header inside Pane -->
      <div class="flex items-center justify-between">
        <LandingLogo />
        <div class="flex items-center gap-2.5">
          <NuxtLink
            to="/#pricing"
            class="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200/90 px-3.5 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-100 hover:border-brand-300 transition-all shadow-2xs"
          >
            <UIcon name="i-lucide-user-plus" class="size-3.5 text-brand-600" />
            <span>حساب جديد</span>
          </NuxtLink>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 transition-all"
          >
            <span>الرئيسية</span>
            <UIcon name="i-lucide-arrow-left" class="size-3.5" />
          </NuxtLink>
        </div>
      </div>

      <!-- Form Section -->
      <div class="my-auto py-10 max-w-md w-full mx-auto">
        <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950">
          سجّل دخولك لبدء حصتك القادمة.
        </h1>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mt-6 flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-bold text-red-700"
        >
          <UIcon name="i-lucide-alert-circle" class="size-4 shrink-0 text-red-600" />
          <span>{{ errorMessage }}</span>
        </div>

        <form class="mt-7 space-y-5" @submit.prevent="handleLogin">
          <!-- Email Input -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="email" class="text-xs font-extrabold text-neutral-800">
                البريد الإلكتروني
              </label>
              <button
                type="button"
                class="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 cursor-pointer"
                @click="fillDemoAccount"
              >
                <UIcon name="i-lucide-wand-sparkles" class="size-3.5" />
                <span>تعبئة حساب تجريبي</span>
              </button>
            </div>
            <input
              id="email"
              v-model="email"
              type="email"
              dir="ltr"
              required
              autocomplete="email"
              placeholder="teacher@monasatk.com"
              class="w-full rounded-xl border-2 border-neutral-200/90 bg-white px-4 py-3 text-left text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-brand-600 focus:outline-none transition-colors"
            />
          </div>

          <!-- Password Input -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="text-xs font-extrabold text-neutral-800">
                كلمة المرور
              </label>
              <a
                href="#forgot"
                class="text-xs font-semibold text-neutral-400 hover:text-brand-600 transition-colors"
                @click.prevent="errorMessage = 'تم إرسال رسالة استعادة كلمة المرور لبريدك.'"
              >
                نسيت كلمة المرور؟
              </a>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                dir="ltr"
                required
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full rounded-xl border-2 border-neutral-200/90 bg-white ps-11 pe-4 py-3 text-left text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:border-brand-600 focus:outline-none transition-colors"
              />
              <button
                type="button"
                class="absolute inset-y-0 start-0 flex items-center ps-3.5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                :title="showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
                @click="showPassword = !showPassword"
              >
                <UIcon :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="size-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="group w-full flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 py-3.5 px-6 text-sm font-extrabold text-white shadow-xl shadow-brand-600/20 hover:bg-brand-700 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60"
          >
            <template v-if="isLoading">
              <UIcon name="i-lucide-loader-2" class="size-4.5 animate-spin" />
              <span>جارٍ تسجيل الدخول...</span>
            </template>
            <template v-else>
              <span>تسجيل الدخول</span>
              <UIcon name="i-lucide-arrow-left" class="size-4 transition-transform group-hover:-translate-x-1" />
            </template>
          </button>

          <!-- Divider -->
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-neutral-200" />
            </div>
            <div class="relative flex justify-center text-xs">
              <span class="bg-white px-3 text-neutral-400 font-medium">أو</span>
            </div>
          </div>

          <!-- Normal Google Button -->
          <button
            type="button"
            class="w-full flex items-center justify-center gap-2.5 rounded-xl border-2 border-neutral-200/90 bg-white py-3 px-4 text-sm font-bold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100 transition-all cursor-pointer shadow-xs"
            @click="handleLogin"
          >
            <svg class="size-4.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>المتابعة باستخدام Google</span>
          </button>

          <!-- Obvious Register / Create Account Button -->
          <div class="pt-5 mt-5 border-t border-neutral-100 text-center">
            <p class="text-xs text-neutral-500 mb-2.5">
              ليس لديك حساب على المنصة بعد؟
            </p>
            <NuxtLink
              to="/#pricing"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-50 border-2 border-brand-200/90 py-3 px-4 text-xs sm:text-sm font-bold text-brand-700 hover:bg-brand-100 hover:border-brand-300 active:scale-[0.99] transition-all shadow-xs"
            >
              <UIcon name="i-lucide-user-plus" class="size-4 text-brand-600" />
              <span>إنشاء حساب جديد (أنشئ منصتك مجاناً)</span>
              <UIcon name="i-lucide-arrow-left" class="size-3.5" />
            </NuxtLink>
          </div>
        </form>
      </div>

      <!-- Footer inside Right Pane -->
      <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
        <span>© {{ new Date().getFullYear() }} منصتك — جميع الحقوق محفوظة</span>
        <NuxtLink to="/#pricing" class="font-bold text-brand-600 hover:underline">
          ليس لديك حساب؟ أنشئ منصتك الآن
        </NuxtLink>
      </div>
    </div>

    <!-- Left Pane (6 cols): Full-Bleed Interactive Product Sandbox -->
    <div class="lg:col-span-6 relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-slate-950 p-6 sm:p-12 lg:p-16 flex flex-col justify-center text-white">
      <div class="bg-grid-light absolute inset-0 opacity-30 pointer-events-none" />
      <div class="absolute -top-28 -left-28 size-96 rounded-full bg-brand-400/20 blur-3xl pointer-events-none" />
      <div class="absolute -bottom-28 -right-28 size-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

      <div class="relative z-10 max-w-xl mx-auto w-full space-y-6">
        <!-- Interactive Feature Switcher Header -->
        <div class="space-y-2">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-bold text-brand-200">
            <UIcon name="i-lucide-mouse-pointer-click" class="size-3.5" />
            معاينة تفاعلية: اضغط للتبديل بين مميزات منصتك
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold leading-snug">
            شاهد كيف تبدو منصتك للطلاب وللمساعدين
          </h2>
        </div>

        <!-- Interactive Tabs -->
        <div class="grid grid-cols-3 gap-2 rounded-2xl bg-black/25 p-1.5 border border-white/10 backdrop-blur-md">
          <button
            type="button"
            class="flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-bold transition-all cursor-pointer"
            :class="previewTab === 'student' ? 'bg-white text-neutral-950 shadow-md' : 'text-brand-100 hover:bg-white/10'"
            @click="previewTab = 'student'"
          >
            <UIcon name="i-lucide-play-circle" class="size-4" />
            <span>واجهة الطالب</span>
          </button>
          <button
            type="button"
            class="flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-bold transition-all cursor-pointer"
            :class="previewTab === 'exams' ? 'bg-white text-neutral-950 shadow-md' : 'text-brand-100 hover:bg-white/10'"
            @click="previewTab = 'exams'"
          >
            <UIcon name="i-lucide-file-check-2" class="size-4" />
            <span>الاختبارات الذكية</span>
          </button>
          <button
            type="button"
            class="flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 text-xs font-bold transition-all cursor-pointer"
            :class="previewTab === 'codes' ? 'bg-white text-neutral-950 shadow-md' : 'text-brand-100 hover:bg-white/10'"
            @click="previewTab = 'codes'"
          >
            <UIcon name="i-lucide-qr-code" class="size-4" />
            <span>أكواد السنتر</span>
          </button>
        </div>

        <!-- Mockup Window Frame -->
        <div class="rounded-3xl bg-white text-neutral-900 shadow-2xl overflow-hidden border border-white/20">
          <!-- Browser Bar -->
          <div dir="ltr" class="flex items-center justify-between border-b border-neutral-100 bg-neutral-50 px-4 py-3">
            <div class="flex items-center gap-1.5">
              <span class="size-2.5 rounded-full bg-rose-400" />
              <span class="size-2.5 rounded-full bg-amber-400" />
              <span class="size-2.5 rounded-full bg-emerald-400" />
            </div>
            <div class="flex items-center gap-1.5 rounded-lg bg-white border border-neutral-200 px-3 py-1 text-[11px] font-bold text-neutral-600">
              <UIcon name="i-lucide-lock" class="size-3 text-emerald-500" />
              <span>academy.monasatk.com</span>
            </div>
            <span class="text-[10px] font-bold text-brand-600">LIVE</span>
          </div>

          <!-- Tab 1: Student Portal Preview -->
          <div v-if="previewTab === 'student'" class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="grid size-11 place-items-center rounded-xl bg-brand-600 text-white font-black">
                  أ.م
                </div>
                <div>
                  <h3 class="text-sm font-extrabold text-neutral-900">منصة أ. محمود عبد الرحمن</h3>
                  <p class="text-xs text-neutral-500">فيزياء الثانوية العامة · دفعة ٢٠٢٦</p>
                </div>
              </div>
              <span class="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold">
                مشترك نشط
              </span>
            </div>

            <div class="rounded-2xl bg-neutral-900 p-4 text-white relative overflow-hidden">
              <div class="flex items-center justify-between">
                <div>
                  <span class="rounded-md bg-brand-500/30 px-2 py-0.5 text-[10px] font-bold text-brand-200">
                    المحاضرة الرابعة · جاري المشاهدة
                  </span>
                  <h4 class="mt-1.5 text-sm font-bold">قانون كيرشوف الأول والثاني — حل مسائل المستويات العليا</h4>
                  <p class="mt-1 text-[11px] text-neutral-400">علامة مائية: 01012345678 · جودة 1080p</p>
                </div>
                <span class="grid size-11 shrink-0 place-items-center rounded-full bg-brand-600 text-white shadow-lg">
                  <UIcon name="i-lucide-play" class="size-5 fill-white" />
                </span>
              </div>
              <div class="mt-3 h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                <div class="h-full w-3/4 rounded-full bg-brand-400" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="rounded-xl border border-neutral-200 p-3 flex items-center gap-2.5">
                <UIcon name="i-lucide-file-text" class="size-5 text-brand-600" />
                <div>
                  <p class="font-bold">ملزمة الحصة PDF</p>
                  <p class="text-[11px] text-neutral-500">محمية باسم الطالب</p>
                </div>
              </div>
              <div class="rounded-xl border border-neutral-200 p-3 flex items-center gap-2.5">
                <UIcon name="i-lucide-check-circle-2" class="size-5 text-emerald-600" />
                <div>
                  <p class="font-bold">واجب المحاضرة</p>
                  <p class="text-[11px] text-neutral-500">تم التسليم · ١٩/٢٠</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 2: Smart Exams Preview -->
          <div v-else-if="previewTab === 'exams'" class="p-6 space-y-4">
            <div class="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span class="text-[11px] font-bold text-brand-600">شرط فتح المحاضرة التالية</span>
                <h3 class="text-sm font-extrabold text-neutral-900">امتحان إلكتروني: الفصل الأول (التيار الكهربي)</h3>
              </div>
              <span class="inline-flex items-center gap-1 rounded-xl bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800">
                <UIcon name="i-lucide-timer" class="size-3.5" />
                ١٤:٢٠ دقيقة
              </span>
            </div>

            <div class="rounded-2xl bg-neutral-50 border border-neutral-200/80 p-4 space-y-3 text-xs">
              <p class="font-bold text-neutral-900">
                س٣: عند زيادة طول موصل للضعف ونقص مساحة مقطعه للنصف، فإن مقاومته النوعية:
              </p>
              <div class="space-y-2">
                <div class="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutral-600">أ) تزداد إلى أربعة أمثالها</div>
                <div class="rounded-xl border-2 border-emerald-500 bg-emerald-50/60 px-3 py-2 font-bold text-emerald-900 flex items-center justify-between">
                  <span>ب) تظل ثابتة لأنها خاصية فيزيائية للمادة</span>
                  <UIcon name="i-lucide-check-circle-2" class="size-4 text-emerald-600" />
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between text-xs text-neutral-500">
              <span>تصحيح تلقائي فوري + إرسال النتيجة لولي الأمر عبر واتساب</span>
              <span class="font-bold text-brand-600">بنك أسئلة ذكي</span>
            </div>
          </div>

          <!-- Tab 3: Center QR & Activation Codes Preview -->
          <div v-else class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-extrabold text-neutral-900">توليد أكواد وكروت شحن السنتر</h3>
                <p class="text-xs text-neutral-500">بيع كروت الشحن في السنتر أو المكتبات بضغطة زر</p>
              </div>
              <span class="rounded-xl bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                ١,٠٠٠ كود جاهز للطباعة
              </span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40 p-3.5 text-center space-y-1">
                <p class="text-[10px] font-bold text-brand-600">كارت شحن محاضرة</p>
                <p class="font-mono text-sm font-black tracking-widest text-neutral-900">MNS-9842-KL</p>
                <p class="text-[11px] text-neutral-500">القيمة: ١٢٠ ج.م · غير مستخدم</p>
              </div>
              <div class="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 p-3.5 text-center space-y-1">
                <p class="text-[10px] font-bold text-emerald-600">كارت شحن شهر كامل</p>
                <p class="font-mono text-sm font-black tracking-widest text-neutral-900">MNS-3310-XP</p>
                <p class="text-[11px] text-neutral-500">القيمة: ٣٥٠ ج.م · تم التفعيل</p>
              </div>
            </div>

            <div class="rounded-xl bg-neutral-100 p-3 text-xs text-neutral-700 flex items-center justify-between">
              <span>تصدير ملف PDF جاهز للطباعة بشعار المعلم</span>
              <span class="font-bold text-brand-600">طباعة فورية</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
