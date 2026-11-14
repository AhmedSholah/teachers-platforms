<script setup lang="ts">
const {
  isNotificationsSlideoverOpen,
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead
} = useTeacherDashboard()

function handleSelectNotification(id: number, to?: string) {
  markAsRead(id)
  if (to) {
    isNotificationsSlideoverOpen.value = false
    navigateTo(to)
  }
}
</script>

<template>
  <USlideover
    v-model:open="isNotificationsSlideoverOpen"
    title="الإشعارات"
    side="left"
  >
    <template #actions>
      <UButton
        v-if="unreadCount > 0"
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-check-check"
        label="تحديد الكل كمقروء"
        @click="markAllAsRead"
      />
    </template>

    <template #body>
      <div v-if="notifications.length === 0" class="flex flex-col items-center justify-center py-12 text-center gap-3">
        <div class="size-12 rounded-full bg-elevated flex items-center justify-center text-dimmed">
          <UIcon name="i-lucide-bell-off" class="size-6" />
        </div>
        <p class="text-sm font-medium text-muted">
          لا توجد إشعارات حالياً
        </p>
      </div>

      <div v-else class="flex flex-col gap-1">
        <button
          v-for="notification in notifications"
          :key="notification.id"
          type="button"
          class="px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-start gap-3 relative -mx-3 transition-colors text-start cursor-pointer"
          @click="handleSelectNotification(notification.id, notification.actionTo)"
        >
          <UChip
            color="primary"
            :show="!notification.read"
            inset
          >
            <UAvatar
              :text="notification.sender.initials"
              size="md"
              class="bg-primary/10 text-primary font-bold"
            />
          </UChip>

          <div class="text-sm flex-1 min-w-0">
            <p class="flex items-center justify-between gap-2">
              <span class="font-medium text-highlighted truncate">{{ notification.title }}</span>
              <time class="text-muted text-xs shrink-0">{{ notification.time }}</time>
            </p>
            <p class="text-dimmed text-xs mt-0.5 line-clamp-2 leading-relaxed">
              {{ notification.description }}
            </p>
          </div>
        </button>
      </div>
    </template>

    <template #footer>
      <UButton
        to="/teacher-dashboard/notifications"
        color="neutral"
        variant="outline"
        block
        icon="i-lucide-inbox"
        label="عرض جميع الإشعارات"
        @click="isNotificationsSlideoverOpen = false"
      />
    </template>
  </USlideover>
</template>
