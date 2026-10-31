<script setup lang="ts">
const subdomain = useSubdomain()

useSeoMeta({
  title: () =>
    subdomain.value
      ? `منصة ${subdomain.value} التعليمية`
      : 'منصتك — منصتك التعليمية، باسمك',
  description: () =>
    subdomain.value
      ? `المنصة التعليمية الرسمية لـ ${subdomain.value}، اشترك الآن في أحدث الكورسات والمحاضرات.`
      : 'أنشئ منصتك التعليمية الخاصة خلال دقائق، وابدأ في تقديم كورساتك وإدارة طلابك من مكان واحد — على رابط خاص باسمك.'
})
</script>

<template>
  <div>
    <!-- Subdomain View: Shows the Teacher/Tenant Platform -->
    <TenantPortalHome
      v-if="subdomain"
      :subdomain="subdomain"
    />

    <!-- Root Domain View: Main Platform Landing Page -->
    <template v-else>
      <LandingNavbar />

      <main class="bg-white">
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingPricing />
        <LandingCta />
      </main>

      <LandingFooter />
    </template>
  </div>
</template>
