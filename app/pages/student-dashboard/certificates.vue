<script setup lang="ts">
useHead({
  title: 'الشهادات - لوحة الطالب'
})

interface EarnedCertificate {
  id: string
  title: string
  recipient: string
  instructor: string
  date: string
  status: string
  description: string
}

interface UpcomingCertificate {
  id: string
  title: string
  description: string
  progress: number
  icon: string
}

const earnedCertificates = ref<EarnedCertificate[]>([
  {
    id: 'cert-1',
    title: 'اللغة الإنجليزية: القواعد',
    recipient: 'سارة علي',
    instructor: 'الأستاذ أحمد محمد',
    date: 'أكتوبر 2026',
    status: 'حصلت عليها',
    description: 'يمكنك تنزيل الشهادة أو مشاركتها على حساباتك.'
  }
])

const upcomingCertificates = ref<UpcomingCertificate[]>([
  {
    id: 'up-1',
    title: 'أساسيات الجبر',
    description: 'أكمل الدورة لتحصل على الشهادة',
    progress: 65,
    icon: 'i-lucide-lock'
  },
  {
    id: 'up-2',
    title: 'دورة مكثفة في الهندسة',
    description: 'أكمل الدورة لتحصل على الشهادة',
    progress: 30,
    icon: 'i-lucide-lock'
  }
])

const isDownloading = ref(false)
const isSharing = ref(false)

function downloadCertificate(cert: EarnedCertificate) {
  isDownloading.value = true
  setTimeout(() => {
    isDownloading.value = false
  }, 1000)
}

function shareCertificate(cert: EarnedCertificate) {
  isSharing.value = true
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator.share({
      title: cert.title,
      text: `شهادة إتمام: ${cert.title} - ${cert.recipient}`
    }).catch(() => {})
  }
  setTimeout(() => {
    isSharing.value = false
  }, 1000)
}
</script>

<template>
  <div class="space-y-8 p-6 md:p-10 w-full box-border">
    <!-- Header -->
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">الشهادات</h1>
      <p class="text-sm sm:text-base text-slate-500">الشهادات التي حصلت عليها والتي تعمل على الحصول عليها.</p>
    </div>

    <!-- Earned Certificates List -->
    <div class="space-y-6">
      <UCard
        v-for="cert in earnedCertificates"
        :key="cert.id"
        class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden"
      >
        <div class="flex flex-col lg:flex-row items-center gap-7 sm:gap-8">
          <!-- Diploma Preview Card -->
          <div class="w-full lg:w-96 shrink-0 border-2 border-blue-100 bg-gradient-to-b from-blue-50/60 to-indigo-50/40 rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center gap-2.5 text-blue-600 shadow-inner">
            <UIcon name="i-lucide-award" class="w-10 h-10 text-blue-600 shrink-0" />
            <span class="text-xl sm:text-2xl font-extrabold text-slate-900">شهادة إتمام</span>
            <span class="text-xs sm:text-sm text-slate-500">تُمنح إلى</span>
            <span class="text-lg sm:text-xl font-extrabold text-slate-900">{{ cert.recipient }}</span>
            <span class="text-xs sm:text-sm text-slate-500">لإتمامها دورة «{{ cert.title }}»</span>
            <span class="text-xs text-slate-400 mt-2 font-medium">{{ cert.instructor }} · {{ cert.date }}</span>
          </div>

          <!-- Certificate Information & Actions -->
          <div class="flex-1 flex flex-col gap-3.5 w-full">
            <UBadge color="success" variant="subtle" size="sm" class="self-start font-bold">
              {{ cert.status }}
            </UBadge>

            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {{ cert.title }}
            </h2>

            <p class="text-sm text-slate-500 leading-relaxed">
              {{ cert.description }}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <UButton
                color="primary"
                size="lg"
                icon="i-lucide-download"
                class="font-bold cursor-pointer rounded-xl px-6"
                :loading="isDownloading"
                @click="downloadCertificate(cert)"
              >
                تنزيل PDF
              </UButton>

              <UButton
                color="neutral"
                variant="outline"
                size="lg"
                icon="i-lucide-share-2"
                class="font-bold cursor-pointer rounded-xl px-5"
                :loading="isSharing"
                @click="shareCertificate(cert)"
              >
                مشاركة
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Upcoming Certificates Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-extrabold text-slate-900">شهادات قادمة</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <UCard
          v-for="item in upcomingCertificates"
          :key="item.id"
          class="rounded-2xl border border-slate-200 shadow-sm bg-white hover:border-slate-300 transition-all"
        >
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <UIcon :name="item.icon" class="w-5 h-5 shrink-0" />
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-base font-extrabold text-slate-900 truncate">{{ item.title }}</span>
                <span class="text-xs sm:text-sm text-slate-500">{{ item.description }}</span>
              </div>
            </div>

            <div class="flex flex-col gap-2 pt-1">
              <div class="flex items-center justify-between text-xs sm:text-sm">
                <span class="text-slate-500 font-medium">نسبة الإنجاز</span>
                <span class="font-extrabold text-slate-900">{{ item.progress }}%</span>
              </div>
              <UProgress :model-value="item.progress" color="primary" size="md" />
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
