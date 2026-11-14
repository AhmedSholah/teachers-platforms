<script setup lang="ts">
import type { TeacherNotification } from '~/composables/useTeacherDashboard'

useHead({
  title: 'الإشعارات - لوحة المعلم'
})

const {
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = useTeacherDashboard()

const tabItems = [
  { label: 'الكل', value: 'all' },
  { label: 'غير مقروء', value: 'unread' }
]

const selectedTab = ref<'all' | 'unread'>('all')

const filteredNotifications = computed(() => {
  if (selectedTab.value === 'unread') {
    return notifications.value.filter(n => !n.read)
  }
  return notifications.value
})

const selectedNotification = ref<TeacherNotification | null>(notifications.value[0] || null)
const isMobile = ref(false)
const isMobileSheetOpen = ref(false)

onMounted(() => {
  const mql = window.matchMedia('(max-width: 1023px)')
  isMobile.value = mql.matches
  const onChange = (e: MediaQueryListEvent) => {
    isMobile.value = e.matches
    if (!e.matches) {
      isMobileSheetOpen.value = false
    }
  }
  mql.addEventListener('change', onChange)
  onUnmounted(() => mql.removeEventListener('change', onChange))
})

watch(filteredNotifications, () => {
  if (selectedNotification.value && !filteredNotifications.value.some(n => n.id === selectedNotification.value?.id)) {
    selectedNotification.value = filteredNotifications.value[0] || null
  }
})

function selectItem(item: TeacherNotification) {
  selectedNotification.value = item
  markAsRead(item.id)
  if (isMobile.value) {
    isMobileSheetOpen.value = true
  }
}

function handleDeleteSelected() {
  if (!selectedNotification.value) return
  const deletedId = selectedNotification.value.id
  deleteNotification(deletedId)
  selectedNotification.value = filteredNotifications.value[0] || null
  if (!selectedNotification.value) {
    isMobileSheetOpen.value = false
  }
}

const isDetailPanelOpen = computed({
  get: () => !!selectedNotification.value,
  set: (val: boolean) => {
    if (!val) {
      selectedNotification.value = null
      isMobileSheetOpen.value = false
    }
  }
})
</script>

<template>
  <UDashboardPanel
    id="teacher-notifications-1"
    :default-size="30"
    :min-size="22"
    :max-size="40"
    resizable
  >
    <template #header>
      <UDashboardNavbar title="الإشعارات">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #trailing>
          <UBadge variant="subtle" color="neutral">
            {{ filteredNotifications.length }}
          </UBadge>
        </template>

        <template #right>
          <UTabs
            v-model="selectedTab"
            :items="tabItems"
            :content="false"
            size="xs"
          />
          <TeacherUserMenu class="lg:hidden" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar v-if="unreadCount > 0">
        <template #left>
          <span class="text-xs text-muted">
            لديك {{ unreadCount }} إشعارات غير مقروءة
          </span>
        </template>
        <template #right>
          <UButton
            color="neutral"
            variant="ghost"
            size="xs"
            icon="i-lucide-check-check"
            label="تحديد الكل كمقروء"
            @click="markAllAsRead"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div v-if="filteredNotifications.length === 0" class="flex flex-col items-center justify-center py-16 text-center gap-2">
        <UIcon name="i-lucide-inbox" class="size-8 text-dimmed" />
        <p class="text-sm font-medium text-highlighted">
          لا توجد إشعارات
        </p>
        <p class="text-xs text-muted">
          ستظهر هنا جميع تنبيهات المنصة والاشتراكات الجديدة.
        </p>
      </div>

      <div v-else class="overflow-y-auto divide-y divide-default -m-4 sm:-m-6">
        <button
          v-for="item in filteredNotifications"
          :key="item.id"
          type="button"
          class="w-full p-4 sm:px-6 text-sm text-start cursor-pointer border-s-2 transition-colors flex flex-col gap-1"
          :class="[
            !item.read ? 'text-highlighted' : 'text-toned',
            selectedNotification?.id === item.id
              ? 'border-primary bg-primary/5'
              : 'border-transparent hover:bg-elevated/50'
          ]"
          @click="selectItem(item)"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="font-semibold truncate">{{ item.sender.name }}</span>
              <UChip v-if="!item.read" color="primary" size="xs" />
            </div>
            <span class="text-xs text-muted shrink-0">{{ item.time }}</span>
          </div>

          <p class="truncate text-highlighted" :class="[!item.read && 'font-semibold']">
            {{ item.title }}
          </p>

          <p class="text-xs text-dimmed line-clamp-1">
            {{ item.description }}
          </p>
        </button>
      </div>
    </template>
  </UDashboardPanel>

  <UDashboardPanel
    v-if="selectedNotification"
    id="teacher-notifications-2"
    class="hidden lg:flex"
  >
    <template #header>
      <UDashboardNavbar :title="selectedNotification.title" :toggle="false">
        <template #leading>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            class="-ms-1.5 lg:hidden"
            aria-label="إغلاق"
            @click="isDetailPanelOpen = false"
          />
        </template>

        <template #right>
          <UTooltip v-if="!selectedNotification.read" text="تحديد كمقروء">
            <UButton
              icon="i-lucide-check"
              color="neutral"
              variant="ghost"
              aria-label="تحديد كمقروء"
              @click="markAsRead(selectedNotification.id)"
            />
          </UTooltip>
          <UTooltip text="حذف الإشعار">
            <UButton
              icon="i-lucide-trash-2"
              color="neutral"
              variant="ghost"
              aria-label="حذف الإشعار"
              @click="handleDeleteSelected"
            />
          </UTooltip>
          <TeacherUserMenu />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col sm:flex-row justify-between gap-2 pb-4 border-b border-default">
        <div class="flex items-center gap-3">
          <UAvatar
            :text="selectedNotification.sender.initials"
            size="lg"
            class="bg-primary/10 text-primary font-bold"
          />
          <div>
            <p class="font-semibold text-highlighted">
              {{ selectedNotification.sender.name }}
            </p>
            <p class="text-xs text-muted">
              {{ selectedNotification.time }}
            </p>
          </div>
        </div>

        <UBadge
          :color="selectedNotification.read ? 'neutral' : 'primary'"
          variant="subtle"
          class="self-start"
        >
          {{ selectedNotification.read ? 'مقروء' : 'جديد' }}
        </UBadge>
      </div>

      <div class="py-4 text-sm text-default leading-relaxed">
        {{ selectedNotification.description }}
      </div>

      <div v-if="selectedNotification.actionTo" class="pt-4 border-t border-default flex">
        <UButton
          :to="selectedNotification.actionTo"
          :label="selectedNotification.actionLabel || 'عرض التفاصيل'"
          icon="i-lucide-arrow-up-left"
          variant="outline"
          color="neutral"
        />
      </div>
    </template>
  </UDashboardPanel>

  <UDashboardPanel v-else id="teacher-notifications-empty" class="hidden lg:flex">
    <template #header>
      <UDashboardNavbar :toggle="false">
        <template #right>
          <TeacherUserMenu />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-1 items-center justify-center h-full">
        <UIcon name="i-lucide-inbox" class="size-24 text-dimmed/40" />
      </div>
    </template>
  </UDashboardPanel>

  <USlideover
    v-if="isMobile && selectedNotification"
    v-model:open="isMobileSheetOpen"
    side="left"
    :title="selectedNotification.title"
    :description="selectedNotification.sender.name"
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between gap-3 pb-4 border-b border-default">
          <div class="flex items-center gap-3">
            <UAvatar
              :text="selectedNotification.sender.initials"
              size="md"
              class="bg-primary/10 text-primary font-bold"
            />
            <div>
              <p class="font-semibold text-highlighted text-sm">
                {{ selectedNotification.sender.name }}
              </p>
              <p class="text-xs text-muted">
                {{ selectedNotification.time }}
              </p>
            </div>
          </div>
          <UBadge :color="selectedNotification.read ? 'neutral' : 'primary'" variant="subtle" size="sm">
            {{ selectedNotification.read ? 'مقروء' : 'جديد' }}
          </UBadge>
        </div>

        <p class="text-sm text-default leading-relaxed">
          {{ selectedNotification.description }}
        </p>

        <div class="flex items-center justify-between gap-2 pt-3 border-t border-default">
          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
            size="sm"
            label="حذف"
            @click="handleDeleteSelected"
          />
          <UButton
            v-if="selectedNotification.actionTo"
            :to="selectedNotification.actionTo"
            :label="selectedNotification.actionLabel || 'عرض التفاصيل'"
            icon="i-lucide-arrow-up-left"
            variant="outline"
            color="neutral"
            size="sm"
            @click="isMobileSheetOpen = false"
          />
        </div>
      </div>
    </template>
  </USlideover>
</template>