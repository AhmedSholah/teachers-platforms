<script setup lang="ts">
useHead({
  title: 'إعدادات الإشعارات - الإعدادات'
})

// Reactive notifications state
const notifications = ref({
  newStudents: true,
  newSales: true,
  newReviews: true,
  weeklyDigest: false
})

const isSaving = ref(false)
const savedNotification = ref(false)

function saveNotifications() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    savedNotification.value = true
    setTimeout(() => {
      savedNotification.value = false
    }, 3000)
  }, 350)
}
</script>

<template>
  <div class="flex flex-col gap-8 p-6 md:p-10 box-border w-full">
    <!-- Page Header -->
    <div class="flex flex-col gap-1.5">
      <h1 class="m-0 text-3xl font-extrabold text-slate-900 leading-tight">إعدادات الإشعارات</h1>
      <span class="text-sm md:text-base text-slate-500">تخصيص تفضيلات التنبيهات المباشرة والرسائل البريدية الخاصة بمنصتك التعليمية.</span>
    </div>

    <!-- Success Notification Toast -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <UAlert
        v-if="savedNotification"
        color="success"
        variant="subtle"
        icon="i-lucide-circle-check"
        title="تم حفظ تفضيلات الإشعارات بنجاح!"
        class="font-bold rounded-xl"
      />
    </Transition>

    <!-- Notifications Preferences Card -->
    <UCard class="rounded-2xl border border-slate-200 shadow-xs bg-white overflow-hidden">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-bell" class="w-5 h-5 shrink-0" />
          </div>
          <div class="flex flex-col">
            <h2 class="m-0 text-xl font-bold text-slate-900">تفضيلات الإشعارات والتنبيهات</h2>
            <span class="text-xs md:text-sm text-slate-500">اختر الأحداث التي تود تلقي تنبيهات فورية أو ملخصات دورية عنها</span>
          </div>
        </div>
      </template>

      <div class="divide-y divide-slate-100">
        <!-- New Students -->
        <div
          class="flex items-center justify-between gap-4 py-4 cursor-pointer select-none transition-colors hover:bg-slate-50/60 rounded-xl px-3 -mx-3"
          @click="notifications.newStudents = !notifications.newStudents"
        >
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-user-plus" class="w-5 h-5 shrink-0" />
            </div>
            <div class="flex flex-col text-start">
              <span class="text-sm md:text-base font-bold text-slate-800">طلاب جدد</span>
              <span class="text-xs md:text-sm text-slate-500">أخبرني فور انضمام طالب جديد إلى إحدى دوراتي</span>
            </div>
          </div>
          <USwitch
            v-model="notifications.newStudents"
            color="primary"
            size="lg"
            class="cursor-pointer shrink-0"
            aria-label="طلاب جدد"
            @click.stop
          />
        </div>

        <!-- New Sales -->
        <div
          class="flex items-center justify-between gap-4 py-4 cursor-pointer select-none transition-colors hover:bg-slate-50/60 rounded-xl px-3 -mx-3"
          @click="notifications.newSales = !notifications.newSales"
        >
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-credit-card" class="w-5 h-5 shrink-0" />
            </div>
            <div class="flex flex-col text-start">
              <span class="text-sm md:text-base font-bold text-slate-800">مبيعات جديدة</span>
              <span class="text-xs md:text-sm text-slate-500">إشعار فوري عند كل عملية شراء دورة ناجحة</span>
            </div>
          </div>
          <USwitch
            v-model="notifications.newSales"
            color="primary"
            size="lg"
            class="cursor-pointer shrink-0"
            aria-label="مبيعات جديدة"
            @click.stop
          />
        </div>

        <!-- New Reviews -->
        <div
          class="flex items-center justify-between gap-4 py-4 cursor-pointer select-none transition-colors hover:bg-slate-50/60 rounded-xl px-3 -mx-3"
          @click="notifications.newReviews = !notifications.newReviews"
        >
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-star" class="w-5 h-5 shrink-0" />
            </div>
            <div class="flex flex-col text-start">
              <span class="text-sm md:text-base font-bold text-slate-800">تقييمات جديدة</span>
              <span class="text-xs md:text-sm text-slate-500">إشعار عند إضافة تقييم أو مراجعة على دوراتي</span>
            </div>
          </div>
          <USwitch
            v-model="notifications.newReviews"
            color="primary"
            size="lg"
            class="cursor-pointer shrink-0"
            aria-label="تقييمات جديدة"
            @click.stop
          />
        </div>

        <!-- Weekly Email Digest -->
        <div
          class="flex items-center justify-between gap-4 py-4 cursor-pointer select-none transition-colors hover:bg-slate-50/60 rounded-xl px-3 -mx-3"
          @click="notifications.weeklyDigest = !notifications.weeklyDigest"
        >
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-mail" class="w-5 h-5 shrink-0" />
            </div>
            <div class="flex flex-col text-start">
              <span class="text-sm md:text-base font-bold text-slate-800">ملخص أسبوعي بالبريد الإلكتروني</span>
              <span class="text-xs md:text-sm text-slate-500">استقبال ملخص بأداء الدورات والأرباح كل أسبوع</span>
            </div>
          </div>
          <USwitch
            v-model="notifications.weeklyDigest"
            color="primary"
            size="lg"
            class="cursor-pointer shrink-0"
            aria-label="ملخص أسبوعي بالبريد الإلكتروني"
            @click.stop
          />
        </div>
      </div>
    </UCard>

    <!-- Actions -->
    <div class="flex flex-wrap items-center gap-3">
      <UButton
        type="button"
        color="primary"
        size="lg"
        icon="i-lucide-check"
        class="font-bold px-6 cursor-pointer"
        :loading="isSaving"
        @click="saveNotifications"
      >
        حفظ التغييرات
      </UButton>
      <UButton
        to="/teacher-dashboard/settings"
        variant="outline"
        color="neutral"
        size="lg"
        class="font-bold px-6"
      >
        إلغاء
      </UButton>
    </div>
  </div>
</template>
