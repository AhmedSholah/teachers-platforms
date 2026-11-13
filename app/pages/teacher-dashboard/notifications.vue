<script setup lang="ts">
useHead({
  title: 'الإشعارات - لوحة المعلم'
})

interface NotificationItem {
  id: number
  title: string
  description: string
  time: string
  read: boolean
  type: 'sale' | 'student' | 'system' | 'payout'
  icon: string
  iconBg: string
  iconColor: string
}

const notifications = ref<NotificationItem[]>([
  {
    id: 1,
    title: 'اشتراك طالب جديد في دورتك',
    description: 'انضم الطالب «محمد خالد الغامدي» إلى دورة «أساسيات الجبر والمصفوفات».',
    time: 'منذ 10 دقائق',
    read: false,
    type: 'student',
    icon: 'i-lucide-user-plus',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  },
  {
    id: 2,
    title: 'عملية شراء دورة جديدة',
    description: 'تم شراء دورة «حساب التفاضل والتكامل» بمبلغ 250 ر.س بنجاح.',
    time: 'منذ 45 دقيقة',
    read: false,
    type: 'sale',
    icon: 'i-lucide-credit-card',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    id: 3,
    title: 'طلب سحب الأرباح قيد المعالجة',
    description: 'تم استلام طلبك لسحب مبلغ 3,500 ر.س وجاري التحويل لحسابك البنكي.',
    time: 'منذ ساعتين',
    read: false,
    type: 'payout',
    icon: 'i-lucide-wallet',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    id: 4,
    title: 'تقييم 5 نجوم جديد!',
    description: 'ترك الطالب «عبدالله فهد» تقييماً إيجابياً: «شرح ممتاز وأسلوب مبسط جداً».',
    time: 'أمس 6:30 م',
    read: true,
    type: 'student',
    icon: 'i-lucide-star',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600'
  },
  {
    id: 5,
    title: 'تحديث أمني للمنصة',
    description: 'تم تحديث خوادم حماية الفيديوهات ضد التسجيل وتحسين سرعة التحميل للطلاب.',
    time: 'منذ يومين',
    read: true,
    type: 'system',
    icon: 'i-lucide-shield-check',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600'
  }
])

const activeFilter = ref<'all' | 'unread' | 'sale' | 'student'>('all')

const filteredNotifications = computed(() => {
  return notifications.value.filter(n => {
    if (activeFilter.value === 'unread') return !n.read
    if (activeFilter.value === 'sale') return n.type === 'sale'
    if (activeFilter.value === 'student') return n.type === 'student'
    return true
  })
})

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function markAsRead(id: number) {
  const notif = notifications.value.find(n => n.id === id)
  if (notif) notif.read = true
}

function markAllAsRead() {
  notifications.value.forEach(n => {
    n.read = true
  })
}

function deleteNotification(id: number) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}
</script>

<template>
  <div class="flex flex-col min-h-full">
    <DashboardActionBar v-if="unreadCount > 0" max-width="max-w-none" container-class="px-6 md:px-10">
      <UButton
        icon="i-lucide-check-check"
        color="neutral"
        variant="outline"
        size="md"
        class="font-bold rounded-xl"
        @click="markAllAsRead"
      >
        تحديد الكل كمقروء
      </UButton>

      <UBadge
        color="primary"
        variant="subtle"
        size="md"
        class="font-extrabold rounded-full px-3 py-1"
      >
        {{ unreadCount }} جديدة
      </UBadge>
    </DashboardActionBar>
    <div v-else class="h-14 shrink-0" aria-hidden="true" />

    <div class="p-6 md:p-10 flex flex-col gap-6 w-full box-border">

    <!-- Filter Pills -->
    <div class="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
      <UButton
        :variant="activeFilter === 'all' ? 'solid' : 'ghost'"
        :color="activeFilter === 'all' ? 'primary' : 'neutral'"
        size="sm"
        class="rounded-xl font-bold px-4"
        @click="activeFilter = 'all'"
      >
        الكل ({{ notifications.length }})
      </UButton>
      <UButton
        :variant="activeFilter === 'unread' ? 'solid' : 'ghost'"
        :color="activeFilter === 'unread' ? 'primary' : 'neutral'"
        size="sm"
        class="rounded-xl font-bold px-4"
        @click="activeFilter = 'unread'"
      >
        غير المقروءة ({{ unreadCount }})
      </UButton>
      <UButton
        :variant="activeFilter === 'sale' ? 'solid' : 'ghost'"
        :color="activeFilter === 'sale' ? 'primary' : 'neutral'"
        size="sm"
        class="rounded-xl font-bold px-4"
        @click="activeFilter = 'sale'"
      >
        المبيعات والمدفوعات
      </UButton>
      <UButton
        :variant="activeFilter === 'student' ? 'solid' : 'ghost'"
        :color="activeFilter === 'student' ? 'primary' : 'neutral'"
        size="sm"
        class="rounded-xl font-bold px-4"
        @click="activeFilter = 'student'"
      >
        الطلاب والتقييمات
      </UButton>
    </div>

    <!-- Notifications List Card -->
    <UCard :ui="{ body: 'p-0 sm:p-0 divide-y divide-slate-100' }" class="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
      <div
        v-for="notif in filteredNotifications"
        :key="notif.id"
        class="p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors"
        :class="notif.read ? 'hover:bg-slate-50/60' : 'bg-blue-50/30 hover:bg-blue-50/50'"
      >
        <!-- Icon & Content -->
        <div class="flex items-start gap-4 flex-1 min-w-0">
          <div
            class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            :class="[notif.iconBg, notif.iconColor]"
          >
            <UIcon :name="notif.icon" class="w-5 h-5" />
          </div>

          <div class="flex flex-col gap-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {{ notif.title }}
              </span>
              <span
                v-if="!notif.read"
                class="w-2 h-2 rounded-full bg-blue-600 shrink-0"
              />
            </div>
            <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {{ notif.description }}
            </p>
            <span class="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
              <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
              {{ notif.time }}
            </span>
          </div>
        </div>

        <!-- Item Actions -->
        <div class="flex items-center gap-1 shrink-0 self-center">
          <UButton
            v-if="!notif.read"
            icon="i-lucide-check"
            color="primary"
            variant="ghost"
            size="sm"
            aria-label="تحديد كمقروء"
            @click="markAsRead(notif.id)"
          />
          <UButton
            icon="i-lucide-trash-2"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="حذف الإشعار"
            @click="deleteNotification(notif.id)"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredNotifications.length === 0"
        class="text-center py-16 p-6 flex flex-col items-center justify-center gap-2"
      >
        <UIcon name="i-lucide-bell-off" class="w-8 h-8 text-slate-300" />
        <p class="text-sm font-bold text-slate-700">لا توجد إشعارات حالياً</p>
        <p class="text-xs text-slate-400">ستظهر هنا أي تنبيهات أو أنشطة جديدة في منصتك.</p>
      </div>
    </UCard>
    </div>
  </div>
</template>