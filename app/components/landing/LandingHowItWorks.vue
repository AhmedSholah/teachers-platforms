<script setup lang="ts">
interface Step {
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'أنشئ حسابك',
    description: 'سجل خلال دقائق واختر اسم منصتك.'
  },
  {
    number: '02',
    title: 'أضف محتواك',
    description: 'أضف الكورسات والدروس والطلاب.'
  },
  {
    number: '03',
    title: 'شارك منصتك',
    description: 'احصل على رابطك الخاص وابدأ استقبال طلابك.'
  }
]
</script>

<template>
  <section id="how-it-works" class="relative bg-neutral-50/80 py-20 sm:py-24 lg:py-28">
    <UContainer>
      <header v-reveal class="mx-auto max-w-2xl text-center">
        <UBadge
          color="primary"
          variant="soft"
          size="sm"
          class="rounded-full px-3 py-1 text-[13px] font-semibold"
        >
          كيف تعمل؟
        </UBadge>

        <h2 class="mt-4 text-3xl font-extrabold text-balance text-neutral-900 sm:text-4xl">
          ابدأ في 3 خطوات
        </h2>

        <p class="mt-4 text-[17px] leading-8 text-neutral-600">
          من الفكرة إلى منصة يعمل عليها طلابك — خلال دقائق.
        </p>
      </header>

      <!-- Steps with a subtle connecting line -->
      <ol
        class="relative mt-14 grid gap-10 sm:mt-16 lg:grid-cols-3 lg:gap-8"
        aria-label="خطوات إنشاء منصتك"
      >
        <div
          aria-hidden="true"
          class="hidden absolute top-6 h-px start-[17%] end-[17%] bg-gradient-to-l from-brand-200/0 via-brand-300 to-brand-200/0 lg:block"
        />
        <div
          aria-hidden="true"
          class="absolute top-3 bottom-3 right-6 w-px bg-gradient-to-b from-brand-200/0 via-brand-300 to-brand-200/0 lg:hidden"
        />

        <li
          v-for="(step, i) in steps"
          :key="step.number"
          v-reveal="{ delay: i * 110 }"
          class="relative flex items-start gap-4 lg:flex-col lg:items-center lg:gap-0"
        >
          <div
            class="relative z-10 grid size-12 shrink-0 place-items-center rounded-lg bg-white text-[15px] font-extrabold text-brand-700 shadow-[0_2px_10px_rgb(49_46_129_/_0.10)] ring-1 ring-brand-200/90"
          >
            {{ step.number }}
          </div>

          <div class="lg:mt-5 lg:text-center">
            <h3 class="text-lg font-bold text-neutral-900">{{ step.title }}</h3>
            <p class="mt-1 text-sm leading-7 text-neutral-600 lg:mx-auto lg:max-w-[16.5rem]">
              {{ step.description }}
            </p>
          </div>
        </li>
      </ol>
    </UContainer>
  </section>
</template>
