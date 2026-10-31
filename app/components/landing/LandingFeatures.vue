<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
  url?: string
}

const features: Feature[] = [
  {
    icon: 'i-lucide-book-open',
    title: 'كورساتك',
    description: 'أنشئ كورساتك ونظم الدروس والمحتوى بسهولة.'
  },
  {
    icon: 'i-lucide-users',
    title: 'طلابك',
    description: 'تابع طلابك وتقدمهم من مكان واحد.'
  },
  {
    icon: 'i-lucide-credit-card',
    title: 'مدفوعاتك',
    description: 'بع كورساتك واستقبل المدفوعات بسهولة.'
  },
  {
    icon: 'i-lucide-globe',
    title: 'منصتك الخاصة',
    description: 'احصل على رابط خاص باسمك وشعارك.',
    url: 'ahmed.yourplatform.com'
  }
]
</script>

<template>
  <section id="features" class="relative bg-white py-20 sm:py-24 lg:py-28">
    <UContainer>
      <header v-reveal class="mx-auto max-w-2xl text-center">
        <UBadge
          color="primary"
          variant="soft"
          size="sm"
          class="rounded-full px-3 py-1 text-[13px] font-semibold"
        >
          المميزات
        </UBadge>

        <h2 class="mt-4 text-3xl font-extrabold text-balance text-neutral-900 sm:text-4xl">
          كل ما تحتاجه لتعليم طلابك
        </h2>

        <p class="mt-4 text-[17px] leading-8 text-neutral-600">
          أدوات جاهزة تساعدك على إدارة كورساتك وطلابك ومدفوعاتك — من أول يوم.
        </p>
      </header>

      <ul class="mx-auto mt-12 grid max-w-4xl gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2">
        <li
          v-for="(feature, i) in features"
          :key="feature.title"
          v-reveal="{ delay: i * 90 }"
          class="h-full"
        >
          <UCard
            :ui="{ base: 'm-0 h-full' }"
            class="group rounded-xl border-neutral-200/90 bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42_/_0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_14px_36px_-14px_rgb(49_46_129_/_0.18)] sm:p-7"
          >
            <div
              class="grid size-11 place-items-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100/80 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600"
            >
              <UIcon :name="feature.icon" class="size-[1.35rem]" />
            </div>

            <h3 class="mt-4 text-lg font-bold text-neutral-900">{{ feature.title }}</h3>
            <p class="mt-1.5 text-sm leading-7 text-neutral-600">{{ feature.description }}</p>

            <span
              v-if="feature.url"
              dir="ltr"
              class="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-neutral-50 px-2.5 py-1.5 text-[11px] font-medium text-neutral-500 ring-1 ring-neutral-200/80"
            >
              <UIcon name="i-lucide-lock" class="size-3 text-emerald-500" />
              <span dir="ltr">{{ feature.url }}</span>
            </span>
          </UCard>
        </li>
      </ul>
    </UContainer>
  </section>
</template>
