<script setup lang="ts">
useSeoMeta({
  title: 'لوحة التحكم — منصتك',
  description: 'لوحة تحكم المعلم لإدارة الكورسات، الطلاب، والمدفوعات والإعدادات.'
})

const activeTab = ref<'overview' | 'courses' | 'students' | 'payments' | 'settings'>('overview')
const activeSettingsSection = ref<'general' | 'domain' | 'payments' | 'security' | 'notifications'>('general')
const isMobileSidebarOpen = ref(false)
const showSaveSuccess = ref(false)

// Teacher Profile & Settings State
const teacherSettings = ref({
  name: 'أ. أحمد الشافعي',
  email: 'teacher@monasatk.com',
  phone: '01012345678',
  subject: 'الفيزياء للثانوية العامة',
  bio: 'مدرس أول فيزياء معتمد، خبرة ١٥ عاماً في تدريس فيزياء الثانوية العامة واللغات.',
  platformName: 'أكاديمية الشافعي للفيزياء',
  subdomain: 'ahmed',
  customDomain: 'el-shafei.com',
  primaryColor: '#4f46e5',
  vodafoneCashNumber: '01012345678',
  instaPayId: 'ahmed@instapay',
  fawryMerchantCode: 'FWR-984210',
  enableWatermark: true,
  watermarkType: 'phone_and_ip',
  preventScreenRecording: true,
  maxConcurrentDevices: 1,
  whatsappStudentNotify: true,
  whatsappParentNotify: true,
  telegramCommunityLink: 'https://t.me/elshafei_physics'
})

const saveSettings = () => {
  showSaveSuccess.value = true
  setTimeout(() => {
    showSaveSuccess.value = false
  }, 3500)
}

const stats = [
  {
    title: 'إجمالي الطلاب المسجلين',
    value: '١,٨٤٢',
    change: '+١٤% هذا الشهر',
    isPositive: true,
    icon: 'i-lucide-users',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'إيرادات الشهر الحالي',
    value: '٤٨,٢٥٠ ج.م',
    change: '+٢٢% عن الشهر الماضي',
    isPositive: true,
    icon: 'i-lucide-banknote',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    title: 'الكورسات المتاحة',
    value: '٨ كورسات',
    change: '٤٢ محاضرة مسجلة',
    isPositive: true,
    icon: 'i-lucide-book-open',
    color: 'from-brand-500 to-brand-700'
  },
  {
    title: 'نسبة إكمال المحاضرات',
    value: '٨٩%',
    change: 'أعلى من المتوسط بـ ٩%',
    isPositive: true,
    icon: 'i-lucide-award',
    color: 'from-amber-500 to-orange-600'
  }
]

const recentCourses = [
  {
    id: 1,
    title: 'الفيزياء الكهربية للثانوية العامة',
    grade: 'الصف الثالث الثانوي',
    students: '٦٤٠ طالب',
    lessons: '١٦ محاضرة',
    price: '٣٥٠ ج.م',
    status: 'نشط',
    statusColor: 'emerald'
  },
  {
    id: 2,
    title: 'الميكانيكا وقوانين نيوتن',
    grade: 'الصف الثاني الثانوي',
    students: '٤٨٠ طالب',
    lessons: '١٢ محاضرة',
    price: '٢٨٠ ج.م',
    status: 'نشط',
    statusColor: 'emerald'
  },
  {
    id: 3,
    title: 'المراجعة النهائية وليالي الامتحان',
    grade: 'الصف الثالث الثانوي',
    students: '٧٢٢ طالب',
    lessons: '٨ محاضرات مكثفة',
    price: '٢٠٠ ج.م',
    status: 'الأكثر رواجاً',
    statusColor: 'amber'
  }
]

const recentStudents = [
  { name: 'أحمد محمود سليمان', course: 'الفيزياء الكهربية', time: 'منذ ١٢ دقيقة', amount: '٣٥٠ ج.م', method: 'فودافون كاش' },
  { name: 'سارة خالد المنشاوي', course: 'الميكانيكا وقوانين نيوتن', time: 'منذ ٣٤ دقيقة', amount: '٢٨٠ ج.م', method: 'بطاقة فيزا' },
  { name: 'عمر عبد العزيز بدر', course: 'المراجعة النهائية', time: 'منذ ساعتين', amount: '٢٠٠ ج.م', method: 'فوري' },
  { name: 'مريم طارق حسن', course: 'الفيزياء الكهربية', time: 'منذ ٣ ساعات', amount: '٣٥٠ ج.م', method: 'فودافون كاش' }
]

const navItems = [
  { id: 'overview', label: 'الرئيسية (نظرة عامة)', icon: 'i-lucide-layout-dashboard', badge: '' },
  { id: 'courses', label: 'الكورسات والمحاضرات', icon: 'i-lucide-book-open', badge: '٨' },
  { id: 'students', label: 'الطلاب والمجموعات', icon: 'i-lucide-users', badge: '١,٨٤٢' },
  { id: 'payments', label: 'الاشتراكات والمدفوعات', icon: 'i-lucide-credit-card', badge: '' },
  { id: 'settings', label: 'إعدادات المنصة', icon: 'i-lucide-settings', badge: 'جديد' }
]

const settingsSections = [
  { id: 'general', label: 'البيانات الشخصية والأكاديمية', icon: 'i-lucide-user' },
  { id: 'domain', label: 'هوية المنصة والدومين الخاص', icon: 'i-lucide-globe' },
  { id: 'payments', label: 'طرق الدفع والتحصيل', icon: 'i-lucide-wallet' },
  { id: 'security', label: 'حماية الفيديوهات والعلامة المائية', icon: 'i-lucide-shield-check' },
  { id: 'notifications', label: 'إشعارات الواتساب والرسائل', icon: 'i-lucide-bell' }
]

const handleLogout = async () => {
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-neutral-100/60 font-sans text-neutral-900 flex flex-col selection:bg-brand-100 selection:text-brand-950">
    <!-- Top Navigation Bar -->
    <header class="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <!-- Platform Branding & Mobile Menu Toggle -->
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-neutral-600 hover:bg-neutral-100 cursor-pointer"
            aria-label="فتح القائمة الجانبية"
            @click="isMobileSidebarOpen = !isMobileSidebarOpen"
          >
            <UIcon :name="isMobileSidebarOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="size-5" />
          </button>

          <LandingLogo />

          <div class="hidden sm:flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs">
            <span class="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span class="font-medium text-neutral-700 font-mono text-[11px]">{{ teacherSettings.subdomain }}.monasatk.com</span>
            <a
              href="/"
              target="_blank"
              class="text-brand-600 hover:text-brand-700 ps-1 flex items-center gap-1 font-semibold"
              title="عرض المنصة كما يراها الطلاب"
            >
              <span>معاينة</span>
              <UIcon name="i-lucide-external-link" class="size-3" />
            </a>
          </div>
        </div>

        <!-- Right Side: Notifications, Teacher Info & Logout -->
        <div class="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            class="relative rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors cursor-pointer"
            title="الإشعارات"
          >
            <UIcon name="i-lucide-bell" class="size-5" />
            <span class="absolute top-1.5 end-1.5 size-2 rounded-full bg-brand-600" />
          </button>

          <div class="h-6 w-px bg-neutral-200" />

          <!-- Teacher Profile & Logout -->
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="size-9 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-700 text-white font-bold grid place-items-center text-sm shadow-xs shrink-0">
              أ
            </div>
            <div class="hidden md:block text-start leading-tight">
              <div class="text-xs font-bold text-neutral-900">{{ teacherSettings.name }}</div>
              <div class="text-[11px] text-neutral-500">{{ teacherSettings.subject }}</div>
            </div>

            <UButton
              color="neutral"
              variant="outline"
              size="xs"
              class="text-neutral-600 hover:text-red-600 hover:border-red-200 cursor-pointer"
              @click="handleLogout"
            >
              <UIcon name="i-lucide-log-out" class="size-3.5" />
              <span class="hidden sm:inline">خروج</span>
            </UButton>
          </div>

        </div>

      </div>
    </header>

    <!-- Save Success Toast Notification -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-if="showSaveSuccess"
        class="fixed top-20 start-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-xl shadow-emerald-600/30 ring-1 ring-white/20"
      >
        <UIcon name="i-lucide-check-circle-2" class="size-4 shrink-0 text-white" />
        <span>تم حفظ جميع إعدادات المنصة بنجاح!</span>
      </div>
    </Transition>

    <!-- App Body: Main Content + Left/Right Sidebar Navigation Layout -->
    <div class="flex-1 mx-auto w-full max-w-7xl flex flex-col md:flex-row items-stretch">
      
      <!-- Right Sidebar Navigation (RTL Start) -->
      <aside
        class="w-full md:w-64 lg:w-72 bg-white md:bg-white/80 md:backdrop-blur-md p-4 flex flex-col justify-between shrink-0 transition-all z-20 md:order-first border-e border-neutral-200"
        :class="isMobileSidebarOpen ? 'block' : 'hidden md:flex'"
      >
        <!-- Nav Links Group -->
        <div class="space-y-6">
          <!-- Teacher Platform Mini Card inside Sidebar -->
          <div class="rounded-2xl border border-neutral-200/90 bg-neutral-50/80 p-3.5 space-y-2">
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-700 text-white font-black grid place-items-center text-sm shadow-xs shrink-0">
                أ.ش
              </div>
              <div class="min-w-0">
                <h2 class="text-xs font-extrabold text-neutral-900 truncate">{{ teacherSettings.platformName }}</h2>
                <p class="text-[11px] text-neutral-500 font-mono truncate">{{ teacherSettings.subdomain }}.monasatk.com</p>
              </div>
            </div>
            <div class="flex items-center justify-between pt-1 border-t border-neutral-200/60 text-[10px]">
              <span class="inline-flex items-center gap-1 text-emerald-600 font-bold">
                <span class="size-1.5 rounded-full bg-emerald-500" />
                المنصة متصلة
              </span>
              <span class="text-neutral-400">باقة المحاضر Pro</span>
            </div>
          </div>

          <!-- Navigation Menu -->
          <nav class="space-y-1">
            <div class="px-3 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
              قائمة الإدارة
            </div>

            <button
              v-for="item in navItems"
              :key="item.id"
              type="button"
              class="w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer"
              :class="
                activeTab === item.id
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/25 ring-1 ring-brand-700/20'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              "
              @click="activeTab = item.id as any; isMobileSidebarOpen = false"
            >
              <div class="flex items-center gap-2.5">
                <UIcon
                  :name="item.icon"
                  class="size-4 shrink-0"
                  :class="activeTab === item.id ? 'text-white' : 'text-neutral-500'"
                />
                <span>{{ item.label }}</span>
              </div>
              <span
                v-if="item.badge"
                class="rounded-md px-1.5 py-0.5 text-[10px] font-black"
                :class="activeTab === item.id ? 'bg-white/20 text-white' : 'bg-neutral-200/80 text-neutral-700'"
              >
                {{ item.badge }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Sidebar Footer Action (Quick Add + Return to Login) -->
        <div class="pt-6 mt-6 border-t border-neutral-200/70 space-y-2">
          <button
            type="button"
            class="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-50 border border-brand-200/80 py-2.5 px-3 text-xs font-bold text-brand-700 hover:bg-brand-100 hover:border-brand-300 transition-all cursor-pointer"
            @click="activeTab = 'courses'"
          >
            <UIcon name="i-lucide-plus" class="size-4 text-brand-600" />
            <span>إضافة محاضرة جديدة</span>
          </button>

          <NuxtLink
            to="/login"
            class="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-200 py-2 px-3 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <UIcon name="i-lucide-arrow-right" class="size-3.5" />
            <span>شاشة تسجيل الدخول</span>
          </NuxtLink>
        </div>
      </aside>

      <!-- Main Dashboard Content Area -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
        
        <!-- ======================================================== -->
        <!-- TAB 1: OVERVIEW DASHBOARD                                 -->
        <!-- ======================================================== -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          
          <!-- Welcoming Header Banner -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-xl sm:text-2xl font-black text-neutral-900">
                  مرحباً بك، أستاذ أحمد 👋
                </h1>
                <span class="rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-[11px] font-bold px-2 py-0.5">
                  لوحة التحكم
                </span>
              </div>
              <p class="text-xs sm:text-sm text-neutral-500 mt-1">
                إليك نظرة سريعة على أداء منصتك التعليمية والطلاب المشتركين اليوم.
              </p>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <UButton
                color="neutral"
                variant="outline"
                size="sm"
                class="flex-1 sm:flex-initial"
                @click="activeTab = 'settings'"
              >
                <UIcon name="i-lucide-settings" class="size-4" />
                <span>إعدادات المنصة</span>
              </UButton>

              <UButton
                size="sm"
                class="flex-1 sm:flex-initial shadow-xs"
                @click="activeTab = 'courses'"
              >
                <UIcon name="i-lucide-plus" class="size-4" />
                <span>إضافة كورس جديد</span>
              </UButton>
            </div>
          </div>

          <!-- Stats Cards Grid -->
          <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="(item, index) in stats"
              :key="index"
              class="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-neutral-500">{{ item.title }}</span>
                <div :class="['size-9 rounded-xl grid place-items-center text-white bg-gradient-to-br shadow-xs', item.color]">
                  <UIcon :name="item.icon" class="size-4.5" />
                </div>
              </div>

              <div class="mt-3">
                <div class="text-2xl font-black text-neutral-900">{{ item.value }}</div>
                <div class="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <UIcon name="i-lucide-trending-up" class="size-3.5" />
                  <span>{{ item.change }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Two Columns: Recent Courses (8 Cols) & Live Enrollments (4 Cols) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Courses Management Preview (8 Cols) -->
            <section class="lg:col-span-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
              <div class="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <h2 class="text-base font-bold text-neutral-900">الكورسات والمحاضرات النشطة</h2>
                  <p class="text-xs text-neutral-500">إدارة ومتابعة المحتوى التعليمي والدروس المتاحة للطلاب</p>
                </div>
                <UButton size="xs" variant="ghost" color="neutral" @click="activeTab = 'courses'">
                  عرض كل الكورسات
                </UButton>
              </div>

              <div class="divide-y divide-neutral-100 mt-2">
                <div
                  v-for="course in recentCourses"
                  :key="course.id"
                  class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50/70 p-2.5 rounded-xl transition-colors"
                >
                  <div class="flex items-start gap-3.5">
                    <div class="size-11 rounded-xl bg-brand-50 border border-brand-100 text-brand-700 grid place-items-center shrink-0 font-bold">
                      <UIcon name="i-lucide-play-square" class="size-5" />
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-neutral-900">{{ course.title }}</span>
                        <span
                          v-if="course.statusColor === 'emerald'"
                          class="text-[10px] font-bold rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-200"
                        >
                          {{ course.status }}
                        </span>
                        <span
                          v-else
                          class="text-[10px] font-bold rounded-md bg-amber-50 text-amber-700 px-2 py-0.5 border border-amber-200"
                        >
                          {{ course.status }}
                        </span>
                      </div>
                      <div class="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                        <span>{{ course.grade }}</span>
                        <span>•</span>
                        <span>{{ course.lessons }}</span>
                        <span>•</span>
                        <span class="font-bold text-neutral-700">{{ course.price }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between sm:justify-end gap-3 ps-14 sm:ps-0">
                    <span class="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg">
                      {{ course.students }}
                    </span>
                    <UButton size="xs" color="neutral" variant="outline">
                      إدارة الكورس
                    </UButton>
                  </div>
                </div>
              </div>
            </section>

            <!-- Live Enrollments & Activity Feed (4 Cols) -->
            <section class="lg:col-span-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
              <div class="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <h2 class="text-base font-bold text-neutral-900">آخر الاشتراكات</h2>
                  <p class="text-xs text-neutral-500">الطلاب المنضمون حديثاً اليوم</p>
                </div>
                <span class="size-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div class="space-y-4 mt-4">
                <div
                  v-for="(student, idx) in recentStudents"
                  :key="idx"
                  class="rounded-xl border border-neutral-100 bg-neutral-50/60 p-3 text-xs"
                >
                  <div class="flex items-center justify-between font-bold text-neutral-900 mb-1">
                    <span>{{ student.name }}</span>
                    <span class="text-emerald-600 font-extrabold">{{ student.amount }}</span>
                  </div>
                  <div class="text-neutral-500 text-[11px] flex items-center justify-between">
                    <span>{{ student.course }}</span>
                    <span>{{ student.time }}</span>
                  </div>
                  <div class="mt-2 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[10px] text-neutral-400">
                    <span>طريقة الدفع: {{ student.method }}</span>
                    <span class="text-emerald-600 font-semibold flex items-center gap-1">
                      <UIcon name="i-lucide-check-circle" class="size-3" />
                      مكتمل
                    </span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 2: DASHBOARD SETTINGS (Comprehensive Settings Suite) -->
        <!-- ======================================================== -->
        <div v-else-if="activeTab === 'settings'" class="space-y-6">
          
          <!-- Settings Header & Save Button -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
            <div>
              <div class="flex items-center gap-2">
                <div class="grid size-9 place-items-center rounded-xl bg-brand-50 border border-brand-200 text-brand-600">
                  <UIcon name="i-lucide-settings" class="size-5" />
                </div>
                <h1 class="text-xl sm:text-2xl font-black text-neutral-900">
                  إعدادات المنصة والأكاديمية
                </h1>
              </div>
              <p class="text-xs sm:text-sm text-neutral-500 mt-1">
                تحكم في بياناتك الشخصية، الدومين، بوابات الدفع، وحماية فيديوهاتك من مكان واحد.
              </p>
            </div>

            <div class="flex items-center gap-2.5 w-full sm:w-auto">
              <UButton
                color="neutral"
                variant="outline"
                size="sm"
                class="flex-1 sm:flex-initial"
                @click="activeTab = 'overview'"
              >
                <span>إلغاء</span>
              </UButton>

              <UButton
                size="sm"
                class="flex-1 sm:flex-initial shadow-md font-bold"
                @click="saveSettings"
              >
                <UIcon name="i-lucide-save" class="size-4" />
                <span>حفظ التغييرات</span>
              </UButton>
            </div>
          </div>

          <!-- Settings Layout: Sub-navigation Tabs + Content Pane -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- Settings Sub-Navigation Menu (4 cols) -->
            <div class="lg:col-span-4 rounded-3xl border border-neutral-200 bg-white p-3 shadow-xs space-y-1">
              <button
                v-for="sec in settingsSections"
                :key="sec.id"
                type="button"
                class="w-full flex items-center gap-3 rounded-2xl px-3.5 py-3 text-xs font-bold text-right transition-all cursor-pointer"
                :class="
                  activeSettingsSection === sec.id
                    ? 'bg-brand-50 text-brand-700 border border-brand-200/80 shadow-2xs'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border border-transparent'
                "
                @click="activeSettingsSection = sec.id as any"
              >
                <UIcon
                  :name="sec.icon"
                  class="size-4.5 shrink-0"
                  :class="activeSettingsSection === sec.id ? 'text-brand-600' : 'text-neutral-400'"
                />
                <span class="truncate">{{ sec.label }}</span>
              </button>
            </div>

            <!-- Settings Content Pane (8 cols) -->
            <div class="lg:col-span-8 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
              
              <!-- 1. GENERAL PROFILE SETTINGS -->
              <div v-if="activeSettingsSection === 'general'" class="space-y-6">
                <div>
                  <h2 class="text-base font-extrabold text-neutral-900">البيانات الشخصية والأكاديمية</h2>
                  <p class="text-xs text-neutral-500">معلومات المعلم التي تظهر للطلاب في الصفحة الرئيسية للكورسات</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-neutral-700">اسم المعلم / المحاضر</label>
                    <input
                      v-model="teacherSettings.name"
                      type="text"
                      class="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-xs text-neutral-900 focus:bg-white focus:border-brand-600 focus:outline-none"
                    />
                  </div>

                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-neutral-700">المادة والتخصص</label>
                    <input
                      v-model="teacherSettings.subject"
                      type="text"
                      class="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-xs text-neutral-900 focus:bg-white focus:border-brand-600 focus:outline-none"
                    />
                  </div>

                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-neutral-700">البريد الإلكتروني الأساسي</label>
                    <input
                      v-model="teacherSettings.email"
                      type="email"
                      dir="ltr"
                      class="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-xs text-neutral-900 focus:bg-white focus:border-brand-600 focus:outline-none"
                    />
                  </div>

                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-neutral-700">رقم الهاتف للدعم والمساعدين</label>
                    <input
                      v-model="teacherSettings.phone"
                      type="tel"
                      dir="ltr"
                      class="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-xs text-neutral-900 focus:bg-white focus:border-brand-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-bold text-neutral-700">النبذة التعريفية (Bio)</label>
                  <textarea
                    v-model="teacherSettings.bio"
                    rows="3"
                    class="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-xs text-neutral-900 focus:bg-white focus:border-brand-600 focus:outline-none"
                  />
                </div>
              </div>

              <!-- 2. BRANDING & DOMAIN SETTINGS -->
              <div v-else-if="activeSettingsSection === 'domain'" class="space-y-6">
                <div>
                  <h2 class="text-base font-extrabold text-neutral-900">هوية المنصة والدومين الخاص</h2>
                  <p class="text-xs text-neutral-500">تحكم بالرابط وعنوان المنصة الذي يدخل عليه طلابك</p>
                </div>

                <div class="space-y-4">
                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-neutral-700">اسم المنصة التعليمية</label>
                    <input
                      v-model="teacherSettings.platformName"
                      type="text"
                      class="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-xs text-neutral-900 focus:bg-white focus:border-brand-600 focus:outline-none"
                    />
                  </div>

                  <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-neutral-700">رابط المنصة الفرعي المجاني (Subdomain)</label>
                    <div class="flex items-center" dir="ltr">
                      <span class="inline-flex items-center rounded-s-xl border border-e-0 border-neutral-200 bg-neutral-100 px-3 py-2.5 text-xs text-neutral-600 font-mono font-bold">
                        https://
                      </span>
                      <input
                        v-model="teacherSettings.subdomain"
                        type="text"
                        class="w-full border border-neutral-200 bg-neutral-50/50 px-3 py-2.5 text-xs font-mono font-bold text-neutral-900 focus:bg-white focus:border-brand-600 focus:outline-none"
                      />
                      <span class="inline-flex items-center rounded-e-xl border border-s-0 border-neutral-200 bg-neutral-100 px-3 py-2.5 text-xs text-neutral-600 font-mono">
                        .monasatk.com
                      </span>
                    </div>
                  </div>

                  <div class="rounded-2xl border border-brand-200/90 bg-brand-50/40 p-4 space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <UIcon name="i-lucide-globe" class="size-4 text-brand-600" />
                        <span class="text-xs font-bold text-neutral-900">دومين مخصص كامل خاص بك (Custom Domain)</span>
                      </div>
                      <span class="rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5">
                        شهادة SSL نشطة
                      </span>
                    </div>
                    <div class="flex items-center gap-2" dir="ltr">
                      <input
                        v-model="teacherSettings.customDomain"
                        type="text"
                        placeholder="yourdomain.com"
                        class="flex-1 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-mono text-neutral-900"
                      />
                      <button
                        type="button"
                        class="rounded-xl bg-neutral-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                        @click="saveSettings"
                      >
                        تحقق من الربط
                      </button>
                    </div>
                    <p class="text-[11px] text-neutral-500">
                      وجّه سجلات CNAME للدومين الخاص بك إلى <code class="font-mono text-brand-600">cname.monasatk.com</code>
                    </p>
                  </div>
                </div>
              </div>

              <!-- 3. PAYMENT GATEWAYS SETTINGS -->
              <div v-else-if="activeSettingsSection === 'payments'" class="space-y-6">
                <div>
                  <h2 class="text-base font-extrabold text-neutral-900">طرق الدفع والتحصيل المباشر</h2>
                  <p class="text-xs text-neutral-500">تصلك أموال الاشتراكات إلى حسابك فوراً بمجرد دفع الطالب</p>
                </div>

                <div class="space-y-4">
                  <!-- Vodafone Cash -->
                  <div class="rounded-2xl border border-neutral-200 p-4 space-y-2">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="size-3 rounded-full bg-rose-500" />
                        <span class="text-xs font-bold text-neutral-900">فودافون كاش والمحافظ الإلكترونية (Vodafone Cash)</span>
                      </div>
                      <span class="text-[10px] font-bold text-emerald-600">مفعل</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <input
                        v-model="teacherSettings.vodafoneCashNumber"
                        type="tel"
                        dir="ltr"
                        placeholder="010XXXXXXXX"
                        class="flex-1 rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs font-mono font-bold"
                      />
                    </div>
                  </div>

                  <!-- InstaPay -->
                  <div class="rounded-2xl border border-neutral-200 p-4 space-y-2">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="size-3 rounded-full bg-purple-600" />
                        <span class="text-xs font-bold text-neutral-900">معرّف انستا باي (InstaPay Username / IPA)</span>
                      </div>
                      <span class="text-[10px] font-bold text-emerald-600">مفعل</span>
                    </div>
                    <input
                      v-model="teacherSettings.instaPayId"
                      type="text"
                      dir="ltr"
                      placeholder="username@instapay"
                      class="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs font-mono font-bold"
                    />
                  </div>

                  <!-- Fawry -->
                  <div class="rounded-2xl border border-neutral-200 p-4 space-y-2">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="size-3 rounded-full bg-amber-500" />
                        <span class="text-xs font-bold text-neutral-900">كود تاجر فوري (Fawry Pay)</span>
                      </div>
                      <span class="text-[10px] font-bold text-neutral-500">جاهز للربط</span>
                    </div>
                    <input
                      v-model="teacherSettings.fawryMerchantCode"
                      type="text"
                      dir="ltr"
                      placeholder="FWR-XXXXXX"
                      class="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <!-- 4. SECURITY & WATERMARK SETTINGS -->
              <div v-else-if="activeSettingsSection === 'security'" class="space-y-6">
                <div>
                  <h2 class="text-base font-extrabold text-neutral-900">حماية الفيديوهات والعلامة المائية (DRM)</h2>
                  <p class="text-xs text-neutral-500">منع تسريب الحصص وحماية حقوق الشرح بنسبة ١٠٠٪</p>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between rounded-2xl border border-neutral-200 p-4">
                    <div>
                      <div class="text-xs font-bold text-neutral-900">العلامة المائية الديناميكية المتحركة</div>
                      <div class="text-[11px] text-neutral-500">تظهر شاشة الطالب مع رقم هاتفه وعنوان IP الخاص به أثناء المشاهدة لمنع التصوير</div>
                    </div>
                    <input
                      v-model="teacherSettings.enableWatermark"
                      type="checkbox"
                      class="size-4.5 rounded border-neutral-300 text-brand-600 accent-brand-600"
                    />
                  </div>

                  <div class="flex items-center justify-between rounded-2xl border border-neutral-200 p-4">
                    <div>
                      <div class="text-xs font-bold text-neutral-900">منع برامج التقاط وتسجيل الشاشة (Screen Recorders)</div>
                      <div class="text-[11px] text-neutral-500">تتحول الشاشة إلى اللون الأسود فوراً إذا حاول الطالب تشغيل برنامج تصوير</div>
                    </div>
                    <input
                      v-model="teacherSettings.preventScreenRecording"
                      type="checkbox"
                      class="size-4.5 rounded border-neutral-300 text-brand-600 accent-brand-600"
                    />
                  </div>

                  <div class="space-y-1.5 pt-2">
                    <label class="block text-xs font-bold text-neutral-700">عدد الأجهزة المسموح بها لكل طالب</label>
                    <select
                      v-model="teacherSettings.maxConcurrentDevices"
                      class="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-xs text-neutral-900 focus:bg-white focus:outline-none"
                    >
                      <option :value="1">جهاز واحد فقط (موصى به للمنع التام لمشاركة الحساب)</option>
                      <option :value="2">جهازان (هاتف + كمبيوتر الطالب)</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- 5. NOTIFICATIONS SETTINGS -->
              <div v-else-if="activeSettingsSection === 'notifications'" class="space-y-6">
                <div>
                  <h2 class="text-base font-extrabold text-neutral-900">إشعارات الواتساب والرسائل التلقائية</h2>
                  <p class="text-xs text-neutral-500">إرسال نتائج الامتحانات ومواعيد الحصص للطلاب وأولياء الأمور</p>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between rounded-2xl border border-neutral-200 p-4">
                    <div>
                      <div class="text-xs font-bold text-neutral-900">إرسال نتيجة الواجب والامتحان لولي الأمر عبر واتساب</div>
                      <div class="text-[11px] text-neutral-500">يصل تقرير فوري فور انتهاء الطالب من الاختبار الإلكتروني</div>
                    </div>
                    <input
                      v-model="teacherSettings.whatsappParentNotify"
                      type="checkbox"
                      class="size-4.5 rounded border-neutral-300 text-brand-600 accent-brand-600"
                    />
                  </div>

                  <div class="flex items-center justify-between rounded-2xl border border-neutral-200 p-4">
                    <div>
                      <div class="text-xs font-bold text-neutral-900">تذكير الطالب بالحصة الجديدة تلقائياً</div>
                      <div class="text-[11px] text-neutral-500">رسالة تذكير عند نزول محاضرة جديدة في الكورس المشترك به</div>
                    </div>
                    <input
                      v-model="teacherSettings.whatsappStudentNotify"
                      type="checkbox"
                      class="size-4.5 rounded border-neutral-300 text-brand-600 accent-brand-600"
                    />
                  </div>
                </div>
              </div>

              <!-- Bottom Save Button in Settings Content -->
              <div class="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  class="rounded-xl bg-neutral-100 px-4 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
                  @click="activeTab = 'overview'"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  class="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-600/25 hover:bg-brand-700 transition-all cursor-pointer"
                  @click="saveSettings"
                >
                  <UIcon name="i-lucide-save" class="size-4" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        <!-- ======================================================== -->
        <!-- TAB 3: COURSES (Active Courses View)                     -->
        <!-- ======================================================== -->
        <div v-else-if="activeTab === 'courses'" class="space-y-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
            <div>
              <h1 class="text-xl sm:text-2xl font-black text-neutral-900">إدارة الكورسات والمحاضرات</h1>
              <p class="text-xs sm:text-sm text-neutral-500 mt-1">عرض ورفع وتعديل جميع الكورسات وملازم PDF والواجبات</p>
            </div>
            <UButton size="sm" class="shadow-xs font-bold">
              <UIcon name="i-lucide-plus" class="size-4" />
              <span>إضافة كورس جديد</span>
            </UButton>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              v-for="c in recentCourses"
              :key="c.id"
              class="rounded-3xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="rounded-lg bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-1">
                    {{ c.grade }}
                  </span>
                  <span class="text-xs font-bold text-neutral-500">{{ c.lessons }}</span>
                </div>
                <h3 class="text-base font-extrabold text-neutral-900">{{ c.title }}</h3>
                <p class="mt-1 text-xs text-neutral-500">عدد الطلاب المسجلين: {{ c.students }}</p>
              </div>

              <div class="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span class="text-sm font-black text-brand-600">{{ c.price }}</span>
                <UButton size="xs" color="neutral" variant="outline">
                  تعديل المحتوى
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- TAB 4: STUDENTS (Roster View)                            -->
        <!-- ======================================================== -->
        <div v-else-if="activeTab === 'students' || activeTab === 'payments'" class="space-y-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
            <div>
              <h1 class="text-xl sm:text-2xl font-black text-neutral-900">
                {{ activeTab === 'students' ? 'قائمة الطلاب والمجموعات' : 'سجل الاشتراكات والمعاملات' }}
              </h1>
              <p class="text-xs sm:text-sm text-neutral-500 mt-1">متابعة الاشتراكات النشطة وأرقام هواتف أولياء الأمور</p>
            </div>
            <UButton size="sm" color="neutral" variant="outline" @click="activeTab = 'overview'">
              العودة للرئيسية
            </UButton>
          </div>

          <div class="rounded-3xl border border-neutral-200 bg-white p-5 shadow-xs divide-y divide-neutral-100">
            <div
              v-for="(st, idx) in recentStudents"
              :key="idx"
              class="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div class="flex items-center gap-3">
                <div class="size-9 rounded-xl bg-neutral-100 text-neutral-700 font-bold grid place-items-center text-xs">
                  {{ idx + 1 }}
                </div>
                <div>
                  <div class="text-xs font-bold text-neutral-900">{{ st.name }}</div>
                  <div class="text-[11px] text-neutral-500">{{ st.course }} · {{ st.time }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3 ps-12 sm:ps-0">
                <span class="text-xs font-bold text-emerald-600">{{ st.amount }}</span>
                <span class="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
                  {{ st.method }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </main>

    </div>
  </div>
</template>
