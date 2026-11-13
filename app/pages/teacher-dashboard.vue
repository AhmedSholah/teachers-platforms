<script setup lang="ts">
const route = useRoute()

definePageMeta({
  alias: ['/teacher', '/dashboard', '/dashboard/teacher']
})

const copiedDomain = ref(false)
function copyDomain() {
  if (import.meta.client && navigator.clipboard) {
    navigator.clipboard.writeText('https://ahmed.mydomain.com')
    copiedDomain.value = true
    setTimeout(() => {
      copiedDomain.value = false
    }, 2000)
  }
}

const isMobileSidebarOpen = ref(false)
function toggleMobileSidebar() {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}
function closeMobileSidebar() {
  isMobileSidebarOpen.value = false
}

const isSettingsRoute = computed(() => {
  return route.path.startsWith('/teacher-dashboard/settings') || route.path.includes('/design')
})

const isSettingsOpen = ref(isSettingsRoute.value)

watch(() => route.path, (newPath) => {
  closeMobileSidebar()
  if (newPath.startsWith('/teacher-dashboard/settings') || newPath.includes('/design')) {
    isSettingsOpen.value = true
  }
})

function toggleSettings() {
  isSettingsOpen.value = !isSettingsOpen.value
}

interface BreadcrumbItem {
  label: string
  to?: string
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const path = route.path.replace(/\/$/, '')
  const query = route.query

  // 1. Settings Routes
  if (path.startsWith('/teacher-dashboard/settings') || path.startsWith('/settings')) {
    if (path.endsWith('/subscription')) {
      return [
        { label: 'الإعدادات', to: '/teacher-dashboard/settings' },
        { label: 'اشتراك المنصة' }
      ]
    }
    if (path.endsWith('/notifications')) {
      return [
        { label: 'الإعدادات', to: '/teacher-dashboard/settings' },
        { label: 'الإشعارات' }
      ]
    }
    const isDesignTab = query.tab === 'design' || path.endsWith('/design')
    const isDomainTab = query.tab === 'domain' || path.endsWith('/domain')
    return [
      { label: 'الإعدادات', to: '/teacher-dashboard/settings' },
      { label: 'إعدادات المنصة', to: '/teacher-dashboard/settings' },
      { label: isDesignTab ? 'تصميم المنصة' : isDomainTab ? 'عنوان المنصة (النطاق)' : 'معلومات عامة' }
    ]
  }

  // 2. Profile
  if (path.includes('/profile')) {
    return [
      { label: 'الملف الشخصي' }
    ]
  }

  // 3. Courses
  if (path.includes('/courses')) {
    if (path.endsWith('/new')) {
      return [
        { label: 'دوراتي', to: '/teacher-dashboard/courses' },
        { label: 'دورة جديدة' }
      ]
    }
    if (path.endsWith('/edit')) {
      return [
        { label: 'دوراتي', to: '/teacher-dashboard/courses' },
        { label: 'تعديل الدورة' }
      ]
    }
    return [
      { label: 'دوراتي' }
    ]
  }

  // 3b. Classrooms (Stages & Grades)
  if (path.includes('/classrooms') || path.includes('/classes')) {
    if (path.endsWith('/new')) {
      return [
        { label: 'المراحل والصفوف الدراسية', to: '/teacher-dashboard/classrooms' },
        { label: 'إضافة صف دراسي جديد' }
      ]
    }
    return [
      { label: 'المراحل والصفوف الدراسية' }
    ]
  }

  // 4. Students
  if (path.includes('/students')) {
    return [
      { label: 'الطلاب' }
    ]
  }

  // 6. Payouts
  if (path.includes('/payouts')) {
    if (path.endsWith('/withdraw')) {
      return [
        { label: 'المدفوعات', to: '/teacher-dashboard/payouts' },
        { label: 'سحب الأرباح' }
      ]
    }
    if (path.endsWith('/methods')) {
      return [
        { label: 'المدفوعات', to: '/teacher-dashboard/payouts' },
        { label: 'طريقة استلام الأرباح' }
      ]
    }
    return [
      { label: 'المدفوعات' }
    ]
  }

  // 7. Notifications
  if (path.includes('/notifications')) {
    return [
      { label: 'الإشعارات' }
    ]
  }

  // 8. Default / Home
  return [
    { label: 'الرئيسية' }
  ]
})

const notifications = [
  {
    id: 1,
    title: 'طالب جديد اشترك في دورة الجبر',
    time: 'منذ 10 دقائق',
    icon: 'i-lucide-user-plus',
    iconBg: 'bg-emerald-50 text-emerald-600',
    unread: true
  },
  {
    id: 2,
    title: 'طلب سحب أرباح جديد قيد المعالجة',
    time: 'منذ ساعتين',
    icon: 'i-lucide-wallet',
    iconBg: 'bg-blue-50 text-blue-600',
    unread: true
  },
  {
    id: 3,
    title: 'تم نشر تقييم 5 نجوم على دورتك',
    time: 'أمس',
    icon: 'i-lucide-star',
    iconBg: 'bg-amber-50 text-amber-600',
    unread: false
  }
]

const userMenuItems = [
  [
    {
      label: 'أحمد محمد',
      description: 'ahmed@example.com',
      avatar: {
        text: 'أ',
        class: 'bg-blue-100 text-blue-600 font-bold'
      },
      type: 'label' as const
    }
  ],
  [
    {
      label: 'الملف الشخصي',
      icon: 'i-lucide-user',
      to: '/teacher-dashboard/profile'
    },
    {
      label: 'إعدادات المنصة',
      icon: 'i-lucide-settings',
      to: '/teacher-dashboard/settings'
    },
    {
      label: 'اشتراك المنصة',
      icon: 'i-lucide-sparkles',
      to: '/teacher-dashboard/settings/subscription'
    }
  ],
  [
    {
      label: 'تسجيل الخروج',
      icon: 'i-lucide-log-out',
      color: 'error' as const,
      to: '/login'
    }
  ]
]
</script>

<template>
  <div class="min-h-screen w-full flex bg-slate-50 text-slate-900 font-sans antialiased">
    <!-- Mobile Backdrop -->
    <div
      v-if="isMobileSidebarOpen"
      class="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
      @click="closeMobileSidebar"
    />

    <!-- Sidebar Navigation -->
    <aside
      class="fixed inset-y-0 start-0 z-50 w-72 max-w-[85vw] bg-white border-e border-slate-200 p-6 flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:w-68 lg:shrink-0 lg:max-w-none lg:translate-x-0 shadow-xl lg:shadow-none"
      :class="isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'"
    >
      <div class="flex flex-col gap-6">
        <!-- Logo Header -->
        <div class="flex items-center justify-between px-2">
          <NuxtLink
            to="/teacher-dashboard"
            class="flex items-center gap-3 group"
            @click="closeMobileSidebar"
          >
            <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-700 transition-colors">
              <UIcon name="i-lucide-graduation-cap" class="w-6 h-6 text-white" />
            </div>
            <span class="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
              منصة المعلم
            </span>
          </NuxtLink>

          <!-- Mobile Close Button -->
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="sm"
            class="lg:hidden"
            aria-label="إغلاق القائمة الجانبية"
            @click="closeMobileSidebar"
          />
        </div>

        <!-- Main Navigation Links -->
        <nav class="flex flex-col gap-1.5" aria-label="روابط لوحة المعلم">
          <!-- 1. الرئيسية -->
          <UButton
            to="/teacher-dashboard"
            icon="i-lucide-home"
            :variant="route.path === '/teacher-dashboard' || route.path === '/teacher' || route.path === '/dashboard' ? 'subtle' : 'ghost'"
            :color="route.path === '/teacher-dashboard' || route.path === '/teacher' || route.path === '/dashboard' ? 'primary' : 'neutral'"
            size="lg"
            class="w-full justify-start gap-3 rounded-xl px-4 py-3 font-bold text-sm transition-all"
            @click="closeMobileSidebar"
          >
            الرئيسية
          </UButton>

          <!-- 2. دوراتي -->
          <UButton
            to="/teacher-dashboard/courses"
            icon="i-lucide-book-open"
            :variant="route.path.includes('/courses') ? 'subtle' : 'ghost'"
            :color="route.path.includes('/courses') ? 'primary' : 'neutral'"
            size="lg"
            class="w-full justify-start gap-3 rounded-xl px-4 py-3 font-bold text-sm transition-all"
            @click="closeMobileSidebar"
          >
            دوراتي
          </UButton>

          <!-- 3. المراحل والصفوف الدراسية -->
          <UButton
            to="/teacher-dashboard/classrooms"
            icon="i-lucide-school"
            :variant="route.path.includes('/classrooms') || route.path.includes('/classes') ? 'subtle' : 'ghost'"
            :color="route.path.includes('/classrooms') || route.path.includes('/classes') ? 'primary' : 'neutral'"
            size="lg"
            class="w-full justify-start gap-3 rounded-xl px-4 py-3 font-bold text-sm transition-all"
            @click="closeMobileSidebar"
          >
            المراحل والصفوف
          </UButton>

          <!-- 4. الطلاب -->
          <UButton
            to="/teacher-dashboard/students"
            icon="i-lucide-users"
            :variant="route.path.includes('/students') ? 'subtle' : 'ghost'"
            :color="route.path.includes('/students') ? 'primary' : 'neutral'"
            size="lg"
            class="w-full justify-start gap-3 rounded-xl px-4 py-3 font-bold text-sm transition-all"
            @click="closeMobileSidebar"
          >
            الطلاب
          </UButton>

          <!-- 5. المدفوعات -->
          <UButton
            to="/teacher-dashboard/payouts"
            icon="i-lucide-wallet"
            :variant="route.path.includes('/payouts') ? 'subtle' : 'ghost'"
            :color="route.path.includes('/payouts') ? 'primary' : 'neutral'"
            size="lg"
            class="w-full justify-start gap-3 rounded-xl px-4 py-3 font-bold text-sm transition-all"
            @click="closeMobileSidebar"
          >
            المدفوعات
          </UButton>

          <!-- 6. الإعدادات (Accordion / Submenu) -->
          <div class="flex flex-col gap-1 mt-1">
            <UButton
              :variant="isSettingsRoute ? 'subtle' : 'ghost'"
              :color="isSettingsRoute ? 'primary' : 'neutral'"
              size="lg"
              class="w-full justify-between rounded-xl px-4 py-3 font-bold text-sm transition-all"
              @click="toggleSettings"
            >
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-settings" class="w-5 h-5 shrink-0" />
                <span>الإعدادات</span>
              </div>
              <UIcon
                name="i-lucide-chevron-down"
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': isSettingsOpen }"
              />
            </UButton>

            <!-- Nested Settings Links -->
            <div
              v-show="isSettingsOpen"
              class="flex flex-col gap-1 ps-6 pe-2 py-1 border-s-2 border-slate-200 ms-4"
            >
              <UButton
                to="/teacher-dashboard/settings"
                variant="ghost"
                :color="route.path === '/teacher-dashboard/settings' && (!route.query.tab || route.query.tab === 'general') ? 'primary' : 'neutral'"
                size="sm"
                class="w-full justify-start rounded-lg font-medium text-xs py-2"
                @click="closeMobileSidebar"
              >
                إعدادات المنصة
              </UButton>
              <UButton
                to="/teacher-dashboard/settings?tab=domain"
                variant="ghost"
                :color="(route.path === '/teacher-dashboard/settings' && route.query.tab === 'domain') || route.path.includes('/settings/domain') ? 'primary' : 'neutral'"
                size="sm"
                class="w-full justify-start rounded-lg font-medium text-xs py-2"
                @click="closeMobileSidebar"
              >
                عنوان المنصة (النطاق)
              </UButton>
              <UButton
                to="/teacher-dashboard/settings?tab=design"
                variant="ghost"
                :color="(route.path === '/teacher-dashboard/settings' && route.query.tab === 'design') || route.path.includes('/design') ? 'primary' : 'neutral'"
                size="sm"
                class="w-full justify-start rounded-lg font-medium text-xs py-2"
                @click="closeMobileSidebar"
              >
                تصميم المنصة
              </UButton>
              <UButton
                to="/teacher-dashboard/settings/subscription"
                variant="ghost"
                :color="route.path.includes('/settings/subscription') ? 'primary' : 'neutral'"
                size="sm"
                class="w-full justify-start rounded-lg font-medium text-xs py-2"
                @click="closeMobileSidebar"
              >
                اشتراك المنصة
              </UButton>
              <UButton
                to="/teacher-dashboard/settings/notifications"
                variant="ghost"
                :color="route.path.includes('/settings/notifications') ? 'primary' : 'neutral'"
                size="sm"
                class="w-full justify-start rounded-lg font-medium text-xs py-2"
                @click="closeMobileSidebar"
              >
                إعدادات الإشعارات
              </UButton>
            </div>
          </div>
        </nav>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 min-w-0 flex flex-col">
      <!-- Sticky Topbar Header -->
      <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-10 py-3.5 flex items-center justify-between gap-4">
        <!-- Start Side: Mobile Toggle & Breadcrumbs -->
        <div class="flex items-center gap-3 min-w-0">
          <UButton
            icon="i-lucide-menu"
            color="neutral"
            variant="outline"
            size="md"
            class="lg:hidden rounded-xl"
            aria-label="تبديل القائمة الجانبية"
            @click="toggleMobileSidebar"
          />

          <!-- Breadcrumbs using UBreadcrumb -->
          <UBreadcrumb :items="breadcrumbs" class="text-sm font-bold truncate" />
        </div>

        <!-- End Side: Domain URL + Notifications + Profile Menu -->
        <div class="flex items-center gap-3">
          <!-- Copy Domain URL Button -->
          <div class="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-mono text-slate-600">
            <span>ahmed.mydomain.com</span>
            <UButton
              :icon="copiedDomain ? 'i-lucide-check' : 'i-lucide-copy'"
              :color="copiedDomain ? 'success' : 'neutral'"
              variant="ghost"
              size="xs"
              class="cursor-pointer"
              @click="copyDomain"
            />
          </div>

          <!-- Notifications Popover -->
          <UPopover :content="{ align: 'end' }">
            <UButton
              color="neutral"
              variant="outline"
              size="md"
              icon="i-lucide-bell"
              aria-label="الإشعارات"
              class="relative rounded-xl w-10 h-10 justify-center p-0"
            >
              <span class="absolute top-2 end-2 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white" />
            </UButton>

            <template #content>
              <div class="w-80 max-w-[90vw] p-0 flex flex-col divide-y divide-slate-100 text-start bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div class="p-3.5 px-4 flex items-center justify-between">
                  <span class="text-sm font-extrabold text-slate-900">الإشعارات</span>
                  <UBadge color="primary" variant="subtle" size="xs" class="font-bold">
                    2 جديدة
                  </UBadge>
                </div>

                <div class="flex flex-col divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  <div
                    v-for="notif in notifications"
                    :key="notif.id"
                    class="flex items-start gap-3 p-3.5 hover:bg-slate-50 transition-colors"
                  >
                    <div
                      class="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      :class="notif.iconBg"
                    >
                      <UIcon :name="notif.icon" class="w-4 h-4" />
                    </div>
                    <div class="flex-1 flex flex-col gap-1 min-w-0">
                      <p class="text-xs font-bold text-slate-800 leading-snug">
                        {{ notif.title }}
                      </p>
                      <span class="text-[11px] text-slate-400">{{ notif.time }}</span>
                    </div>
                    <span
                      v-if="notif.unread"
                      class="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0"
                    />
                  </div>
                </div>

                <div class="p-2 text-center bg-slate-50/50">
                  <UButton
                    to="/teacher-dashboard/notifications"
                    variant="ghost"
                    color="primary"
                    size="sm"
                    block
                    class="font-bold text-xs justify-center"
                  >
                    عرض كل الإشعارات
                  </UButton>
                </div>
              </div>
            </template>
          </UPopover>

          <!-- User Menu Dropdown -->
          <UDropdownMenu :items="userMenuItems" :content="{ align: 'end' }">
            <UButton
              color="neutral"
              variant="outline"
              class="flex items-center gap-2.5 ps-2 pe-3 py-1.5 rounded-xl cursor-pointer"
            >
              <UAvatar
                text="أ"
                size="sm"
                class="bg-blue-100 text-blue-600 font-bold shrink-0"
              />
              <div class="hidden sm:flex flex-col text-start leading-tight">
                <span class="text-xs font-bold text-slate-900">الأستاذ أحمد</span>
                <span class="text-[11px] text-slate-500">معلم</span>
              </div>
              <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-slate-400 shrink-0" />
            </UButton>
          </UDropdownMenu>
        </div>
      </header>

      <!-- Main Nested Page Content Slot -->
      <main class="flex-1 min-w-0">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>