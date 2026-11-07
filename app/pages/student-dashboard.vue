<script setup lang="ts">
const route = useRoute()

definePageMeta({
  alias: ['/student', '/student/dashboard', '/dashboard/student']
})

const isMobileSidebarOpen = ref(false)

function toggleMobileSidebar() {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

function closeMobileSidebar() {
  isMobileSidebarOpen.value = false
}

// Close mobile sidebar on route change
watch(() => route.path, () => {
  closeMobileSidebar()
})

const isHomeActive = computed(() => {
  return route.path === '/student-dashboard' || route.path === '/student' || route.path === '/student/dashboard' || route.path === '/dashboard/student'
})
const isCoursesActive = computed(() => route.path.startsWith('/student-dashboard/courses'))
const isAssignmentsActive = computed(() => route.path.startsWith('/student-dashboard/assignments'))
const isCertificatesActive = computed(() => route.path.startsWith('/student-dashboard/certificates'))
const isMessagesActive = computed(() => route.path.startsWith('/student-dashboard/messages'))
const isSettingsActive = computed(() => route.path.startsWith('/student-dashboard/settings'))

const navLinks = computed(() => [
  {
    label: 'الرئيسية',
    to: '/student-dashboard',
    icon: 'i-lucide-home',
    active: isHomeActive.value
  },
  {
    label: 'دوراتي',
    to: '/student-dashboard/courses',
    icon: 'i-lucide-book-open',
    active: isCoursesActive.value
  },
  {
    label: 'الواجبات والاختبارات',
    to: '/student-dashboard/assignments',
    icon: 'i-lucide-clipboard-check',
    active: isAssignmentsActive.value
  },
  {
    label: 'الشهادات',
    to: '/student-dashboard/certificates',
    icon: 'i-lucide-award',
    active: isCertificatesActive.value
  },
  {
    label: 'الرسائل',
    to: '/student-dashboard/messages',
    icon: 'i-lucide-message-square',
    active: isMessagesActive.value
  },
  {
    label: 'الإعدادات',
    to: '/student-dashboard/settings',
    icon: 'i-lucide-settings',
    active: isSettingsActive.value
  }
])

const notifications = [
  {
    id: 1,
    title: 'أضاف الأستاذ أحمد درساً جديداً في «أساسيات الجبر»',
    time: 'منذ ساعة',
    icon: 'i-lucide-book-open',
    iconBg: 'bg-blue-50 text-blue-600',
    unread: true
  },
  {
    id: 2,
    title: 'تم تصحيح واجبك: 18 من 20',
    time: 'أمس',
    icon: 'i-lucide-check-circle-2',
    iconBg: 'bg-emerald-50 text-emerald-600',
    unread: true
  },
  {
    id: 3,
    title: 'تذكير: جلسة مباشرة يوم السبت الساعة 8 مساءً',
    time: 'أمس',
    icon: 'i-lucide-video',
    iconBg: 'bg-amber-50 text-amber-600',
    unread: false
  }
]

const userMenuItems = [
  [
    {
      label: 'سارة علي',
      description: 'sara@example.com',
      avatar: {
        text: 'س',
        class: 'bg-blue-100 text-blue-600 font-bold'
      },
      type: 'label' as const
    }
  ],
  [
    {
      label: 'ملفي الشخصي',
      icon: 'i-lucide-user',
      to: '/student-dashboard/settings'
    },
    {
      label: 'إعدادات الحساب',
      icon: 'i-lucide-settings',
      to: '/student-dashboard/settings'
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
    <!-- Mobile Sidebar Backdrop Overlay -->
    <div
      v-if="isMobileSidebarOpen"
      class="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
      @click="closeMobileSidebar"
    />

    <!-- Sidebar Navigation -->
    <aside
      class="fixed inset-y-0 start-0 z-50 w-72 max-w-[85vw] bg-white border-e border-slate-200 p-6 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-68 lg:shrink-0 lg:max-w-none lg:overflow-y-visible lg:translate-x-0 shadow-xl lg:shadow-none min-h-screen"
      :class="isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'"
    >
      <div class="flex flex-col gap-6">
        <!-- Logo / Brand Header -->
        <div class="flex items-center justify-between px-2">
          <NuxtLink
            to="/"
            class="flex items-center gap-3 group"
            @click="closeMobileSidebar"
          >
            <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-700 transition-colors">
              <UIcon name="i-lucide-graduation-cap" class="w-6 h-6 text-white" />
            </div>
            <span class="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
              أكاديمية أحمد
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

        <!-- Navigation Links -->
        <nav class="flex flex-col gap-1.5" aria-label="روابط لوحة الطالب">
          <UButton
            v-for="item in navLinks"
            :key="item.to"
            :to="item.to"
            :icon="item.icon"
            :variant="item.active ? 'subtle' : 'ghost'"
            :color="item.active ? 'primary' : 'neutral'"
            size="lg"
            class="w-full justify-start gap-3 rounded-xl px-4 py-3 font-bold text-sm transition-all"
            @click="closeMobileSidebar"
          >
            {{ item.label }}
          </UButton>
        </nav>
      </div>

      <!-- Student Profile Pill in Sidebar bottom -->
      <div class="pt-4 border-t border-slate-100">
        <div class="flex items-center gap-3 p-3 border border-slate-200 rounded-2xl bg-slate-50/60">
          <UAvatar
            text="س"
            size="md"
            class="bg-blue-100 text-blue-600 font-extrabold shrink-0"
          />
          <div class="flex flex-col min-w-0">
            <span class="text-sm font-bold text-slate-900 truncate">سارة علي</span>
            <span class="text-xs text-slate-500">طالبة</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 min-w-0 flex flex-col">
      <!-- Sticky Topbar Header -->
      <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-10 py-3.5 flex items-center justify-between gap-4">
        <!-- Start Side: Mobile Toggle & Browse Courses Button -->
        <div class="flex items-center gap-3">
          <UButton
            icon="i-lucide-menu"
            color="neutral"
            variant="outline"
            size="md"
            class="lg:hidden rounded-xl"
            aria-label="تبديل القائمة الجانبية"
            @click="toggleMobileSidebar"
          />

          <UButton
            to="/student-dashboard/courses"
            icon="i-lucide-search"
            variant="ghost"
            color="primary"
            size="md"
            class="font-bold rounded-xl hidden sm:inline-flex"
          >
            تصفّح كل الدورات
          </UButton>
        </div>

        <!-- End Side: Notifications & User Profile -->
        <div class="flex items-center gap-3">
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
                    3 جديدة
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
                    to="/student-dashboard/messages"
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

          <!-- User Profile Dropdown Menu -->
          <UDropdownMenu :items="userMenuItems" :content="{ align: 'end' }">
            <UButton
              color="neutral"
              variant="outline"
              class="flex items-center gap-2.5 ps-2 pe-3 py-1.5 rounded-xl cursor-pointer"
            >
              <UAvatar
                text="س"
                size="sm"
                class="bg-blue-100 text-blue-600 font-bold shrink-0"
              />
              <div class="hidden sm:flex flex-col text-start leading-tight">
                <span class="text-xs font-bold text-slate-900">سارة علي</span>
                <span class="text-[11px] text-slate-500">طالبة</span>
              </div>
              <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-slate-400 shrink-0" />
            </UButton>
          </UDropdownMenu>
        </div>
      </header>

      <!-- Nested Page Content Slot -->
      <main class="flex-1 min-w-0">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
