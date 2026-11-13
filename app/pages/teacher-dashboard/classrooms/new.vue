<script setup lang="ts">
definePageMeta({
  alias: [
    '/teacher-dashboard/classrooms/add',
    '/teacher-dashboard/classes/new',
    '/teacher-dashboard/classes/add'
  ]
})

const route = useRoute()

// Redirect to /teacher-dashboard/classrooms with add modal opened
await navigateTo({
  path: '/teacher-dashboard/classrooms',
  query: {
    ...route.query,
    add: 'classroom'
  },
  replace: true
})
</script>

<template>
  <div class="p-10 flex flex-col items-center justify-center min-h-[300px] text-slate-500 gap-3">
    <UIcon name="i-lucide-loader-2" class="w-6 h-6 animate-spin text-blue-600" />
    <span class="text-sm font-semibold">جارٍ فتح نافذة إضافة الفصل الدراسي...</span>
  </div>
</template>
