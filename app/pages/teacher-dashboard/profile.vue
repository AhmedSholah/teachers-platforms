<script setup lang="ts">
useHead({
  title: 'الملف الشخصي - لوحة المعلم'
})

const toast = useToast()

const profile = ref({
  name: 'أحمد محمد الشناوي',
  title: 'معلم ومحاضر رياضيات متقدمة',
  email: 'ahmed@mydomain.com',
  phone: '+966 50 123 4567',
  bio: 'معلم حاصل على ماجستير في الرياضيات التطبيقية، بخبرة تزيد عن 8 سنوات في التدريس الأكاديمي والجامعي وشرح مناهج الجبر والتفاضل والتكامل.',
  specialties: ['الجبر الخطي', 'التفاضل والتكامل', 'الإحصاء والاحتمالات', 'الرياضيات المتقدمة'],
  website: 'https://ahmed.mydomain.com',
  twitter: '@ahmed_math',
  youtube: 'AhmedMathAcademy'
})

const newSpecialty = ref('')
const isSaving = ref(false)

function addSpecialty() {
  if (newSpecialty.value.trim() && !profile.value.specialties.includes(newSpecialty.value.trim())) {
    profile.value.specialties.push(newSpecialty.value.trim())
    newSpecialty.value = ''
  }
}

function removeSpecialty(item: string) {
  profile.value.specialties = profile.value.specialties.filter(s => s !== item)
}

function saveProfile() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    toast.add({
      title: 'تم حفظ الملف الشخصي',
      description: 'تم تحديث بيانات حسابك بنجاح.',
      color: 'success',
      icon: 'i-lucide-check'
    })
  }, 450)
}
</script>

<template>
  <UDashboardPanel id="teacher-profile" :ui="{ body: 'lg:py-10' }">
    <template #header>
      <UDashboardNavbar title="الملف الشخصي">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <TeacherUserMenu />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UButton
            to="/teacher-dashboard"
            color="neutral"
            variant="outline"
            icon="i-lucide-arrow-right"
            label="العودة للرئيسية"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-6 w-full lg:max-w-3xl mx-auto">
        <UForm :state="profile" @submit="saveProfile">
          <UPageCard
            title="الملف الشخصي"
            description="تظهر هذه المعلومات في صفحة المعلم العامة للطلاب."
            variant="naked"
            orientation="horizontal"
            class="mb-4"
          >
            <UButton
              type="submit"
              label="حفظ التغييرات"
              color="neutral"
              :loading="isSaving"
              class="w-fit lg:ms-auto"
            />
          </UPageCard>

          <UPageCard variant="subtle">
            <UFormField
              label="الصورة الشخصية"
              description="JPG أو PNG بحد أقصى 1MB."
              class="flex max-sm:flex-col justify-between sm:items-center gap-4"
            >
              <div class="flex items-center gap-3">
                <UAvatar
                  text="أ"
                  size="lg"
                  class="bg-primary text-inverted font-bold"
                />
                <UButton label="تغيير الصورة" color="neutral" variant="outline" size="sm" />
              </div>
            </UFormField>

            <USeparator />

            <UFormField
              label="الاسم الكامل"
              description="يظهر على الشهادات وصفحة الدورات."
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput v-model="profile.name" class="w-full sm:w-72" />
            </UFormField>

            <USeparator />

            <UFormField
              label="المسمى الأكاديمي"
              description="وصف مختصر لتخصصك التعليمي."
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput v-model="profile.title" class="w-full sm:w-72" />
            </UFormField>

            <USeparator />

            <UFormField
              label="البريد الإلكتروني"
              description="يُستخدم لتسجيل الدخول والإشعارات."
              required
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput v-model="profile.email" type="email" class="w-full sm:w-72" />
            </UFormField>

            <USeparator />

            <UFormField
              label="رقم الجوال"
              class="flex max-sm:flex-col justify-between items-start gap-4"
            >
              <UInput v-model="profile.phone" type="tel" class="w-full sm:w-72" />
            </UFormField>

            <USeparator />

            <UFormField
              label="النبذة التعريفية"
              description="نبذة موجزة عن خبرتك ومؤهلاتك."
              class="flex max-sm:flex-col justify-between items-start gap-4"
              :ui="{ container: 'w-full sm:w-80' }"
            >
              <UTextarea v-model="profile.bio" :rows="4" autoresize class="w-full" />
            </UFormField>

            <USeparator />

            <UFormField
              label="مجالات التخصص"
              description="المواد والمناهج التي تقوم بتدريسها."
              class="flex max-sm:flex-col justify-between items-start gap-4"
              :ui="{ container: 'w-full sm:w-80' }"
            >
              <div class="flex flex-col gap-2.5 w-full">
                <div class="flex flex-wrap gap-1.5">
                  <UBadge
                    v-for="spec in profile.specialties"
                    :key="spec"
                    color="primary"
                    variant="subtle"
                    class="gap-1"
                  >
                    <span>{{ spec }}</span>
                    <button
                      type="button"
                      class="hover:text-error cursor-pointer"
                      @click="removeSpecialty(spec)"
                    >
                      <UIcon name="i-lucide-x" class="size-3" />
                    </button>
                  </UBadge>
                </div>
                <div class="flex items-center gap-2">
                  <UInput
                    v-model="newSpecialty"
                    placeholder="أضف تخصصاً..."
                    size="sm"
                    class="flex-1"
                    @keydown.enter.prevent="addSpecialty"
                  />
                  <UButton
                    color="neutral"
                    variant="outline"
                    size="sm"
                    icon="i-lucide-plus"
                    label="إضافة"
                    @click="addSpecialty"
                  />
                </div>
              </div>
            </UFormField>

            <USeparator />

            <UFormField
              label="حساب X ويوتيوب والموقع"
              description="روابط التواصل التي تظهر للطلاب."
              class="flex max-sm:flex-col justify-between items-start gap-4"
              :ui="{ container: 'w-full sm:w-80' }"
            >
              <div class="flex flex-col gap-2 w-full">
                <UInput v-model="profile.website" icon="i-lucide-globe" placeholder="https://..." />
                <UInput v-model="profile.twitter" icon="i-lucide-at-sign" placeholder="@username" />
                <UInput v-model="profile.youtube" icon="i-lucide-video" placeholder="ChannelName" />
              </div>
            </UFormField>
          </UPageCard>
        </UForm>
      </div>
    </template>
  </UDashboardPanel>
</template>