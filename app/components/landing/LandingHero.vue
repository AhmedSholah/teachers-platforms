<template>
  <section id="hero" class="relative overflow-hidden">
    <!-- Decorative backdrop: soft brand glow + masked dot pattern -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute -top-56 start-[-14rem] size-[36rem] rounded-full bg-brand-200/45 blur-3xl" />
      <div class="absolute -top-40 end-[-10rem] size-[30rem] rounded-full bg-brand-100/70 blur-3xl" />
      <div class="bg-dots absolute inset-x-0 top-0 h-[30rem] opacity-25 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>

    <UContainer class="relative">
      <div class="grid items-center gap-14 pb-16 pt-12 sm:pb-20 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-24">
        <!-- Copy -->
        <div class="mx-auto max-w-2xl text-center lg:col-span-5 lg:mx-0 lg:text-start">
          <div class="animate-hero-in">
            <UBadge
              color="primary"
              variant="soft"
              size="sm"
              icon="i-lucide-sparkles"
              :ui="{ icon: 'size-4' }"
              class="rounded-full px-3 py-1 text-[13px] font-semibold"
            >
              أطلق منصتك في دقائق
            </UBadge>
          </div>

          <h1
            class="animate-hero-in mt-6 text-4xl font-extrabold text-balance text-neutral-900 [animation-delay:80ms] sm:text-5xl xl:text-[3.375rem] xl:leading-[1.25]"
          >
            منصتك التعليمية،
            <span class="bg-gradient-to-b from-brand-500 to-brand-700 bg-clip-text text-transparent">باسمك.</span>
          </h1>

          <p class="animate-hero-in mx-auto mt-5 max-w-lg text-lg leading-8 text-neutral-600 [animation-delay:160ms] lg:mx-0">
            أنشئ منصتك التعليمية الخاصة خلال دقائق، وابدأ في تقديم كورساتك وإدارة طلابك من مكان واحد.
          </p>

          <div
            class="animate-hero-in mt-9 flex flex-col items-center justify-center gap-3.5 [animation-delay:240ms] sm:flex-row lg:justify-start"
          >
            <UButton
              to="#pricing"
              size="xl"
              trailing-icon="i-lucide-arrow-left"
              class="w-full transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
            >
              ابدأ مجانًا
            </UButton>

            <UButton
              to="#how-it-works"
              size="xl"
              color="neutral"
              variant="outline"
              icon="i-lucide-play"
              :ui="{ leadingIcon: 'size-5' }"
              class="w-full bg-white ring-neutral-200 hover:ring-brand-300 sm:w-auto"
            >
              شاهد كيف تعمل
            </UButton>
          </div>

          <p
            class="animate-hero-in mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[13px] text-neutral-500 [animation-delay:320ms] lg:justify-start"
          >
            <span class="inline-flex items-center gap-1.5">
              <UIcon name="i-lucide-check" class="size-4 text-brand-600" />
              مجانية للبدء
            </span>
            <span class="inline-flex items-center gap-1.5">
              <UIcon name="i-lucide-check" class="size-4 text-brand-600" />
              بدون بطاقة ائتمانية
            </span>
          </p>
        </div>

        <!-- Product mockup -->
        <div class="lg:col-span-7">
          <LandingHeroMockup />
        </div>
      </div>
    </UContainer>
  </section>
</template>
