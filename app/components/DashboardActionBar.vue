<script setup lang="ts">
interface Props {
  maxWidth?: string
  containerClass?: string
}

withDefaults(defineProps<Props>(), {
  maxWidth: 'max-w-7xl',
  containerClass: 'px-6 sm:px-8 lg:px-10'
})
</script>

<template>
  <div class="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-[65px] z-20 shadow-2xs">
    <div
      class="mx-auto w-full py-2.5 flex items-center justify-between gap-3 box-border"
      :class="[maxWidth, containerClass]"
    >
      <!-- Buttons on the right (start in RTL) -->
      <div class="flex items-center gap-2.5 flex-wrap">
        <slot />
      </div>

      <!-- Optional end slot on the left (end in RTL) -->
      <div v-if="$slots.end" class="flex items-center gap-2.5 ms-auto flex-wrap">
        <slot name="end" />
      </div>
    </div>
  </div>
</template>
