<script setup lang="ts">
const userMenuItems = [
  [
    {
      type: 'label' as const,
      label: 'الأستاذ أحمد محمد',
      avatar: {
        text: 'أ',
        class: 'bg-primary/10 text-primary font-bold'
      }
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
  <UDropdownMenu
    :items="userMenuItems"
    :content="{ align: 'end', collisionPadding: 12 }"
    :ui="{ content: 'w-52' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      size="md"
      class="data-[state=open]:bg-elevated gap-2"
    >
      <UAvatar
        text="أ"
        size="xs"
        class="bg-primary/10 text-primary font-bold shrink-0"
      />
      <span class="hidden sm:inline truncate text-sm font-medium text-highlighted">
        الأستاذ أحمد
      </span>
      <UIcon
        name="i-lucide-chevron-down"
        class="size-4 text-dimmed shrink-0"
      />
    </UButton>
  </UDropdownMenu>
</template>
