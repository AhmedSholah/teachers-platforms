<template>
  <section id="cta" class="bg-white py-20 pb-24 sm:py-24 lg:pb-28">
    <UContainer>
      <div
        v-reveal
        class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-brand-600 to-brand-700 px-6 py-14 text-center shadow-2xl shadow-brand-600/25 sm:px-12 sm:py-18"
      >
        <!-- Decorations -->
        <div aria-hidden="true" class="bg-grid-light absolute inset-0" />
        <div aria-hidden="true" class="absolute -top-24 left-[12%] size-64 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden="true" class="absolute -bottom-32 right-[8%] size-72 rounded-full bg-brand-400/40 blur-2xl" />
        <div aria-hidden="true" class="absolute -bottom-24 left-1/2 h-40 w-[34rem] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-white/15 to-transparent blur-2xl" />

        <div class="relative mx-auto max-w-2xl">
          <h2 class="text-3xl font-extrabold text-balance text-white sm:text-4xl xl:text-[2.75rem]">
            جاهز تبني منصتك التعليمية؟
          </h2>

          <p class="mt-4 text-[17px] leading-8 text-white/80 sm:text-lg">
            ابدأ اليوم وأنشئ منصتك الخاصة خلال دقائق.
          </p>

          <div class="mt-9 flex justify-center">
            <UButton
              to="#"
              size="xl"
              trailing-icon="i-lucide-arrow-left"
              class="h-12 bg-white px-8 text-brand-700 shadow-lg shadow-brand-950/25 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-50 active:translate-y-0"
            >
              أنشئ منصتي مجانًا
            </UButton>
          </div>

          <p class="mt-5 text-[13px] text-white/60">
            بدون برمجة — بدون بطاقة ائتمانية.
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>
