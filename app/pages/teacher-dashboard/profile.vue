<script setup lang="ts">
useHead({
  title: 'الملف الشخصي - لوحة المعلم'
})

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
    alert('تم حفظ بيانات الملف الشخصي بنجاح!')
  }, 600)
}
</script>

<template>
  <div class="p-6 sm:p-8 lg:p-10 flex flex-col gap-8 max-w-4xl mx-auto w-full">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          الملف الشخصي للمعلم
        </h1>
        <p class="text-sm sm:text-base text-slate-500 font-medium">
          إدارة سيرتك الذاتية وتخصصاتك والروابط التي تظهر للطلاب في صفحة منصتك.
        </p>
      </div>

      <UButton
        to="/teacher-dashboard"
        color="neutral"
        variant="outline"
        size="md"
        class="font-bold rounded-xl"
      >
        معاينة الصفحة العامة
      </UButton>
    </div>

    <!-- Main Profile Form Card -->
    <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
      <!-- Avatar Section -->
      <div class="flex items-center gap-5 p-2 pb-6 border-b border-slate-100">
        <UAvatar
          text="أ"
          size="2xl"
          class="bg-blue-600 text-white font-extrabold text-3xl shrink-0 ring-4 ring-blue-50"
        />
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <UButton
              color="primary"
              variant="subtle"
              size="sm"
              icon="i-lucide-camera"
              class="font-bold rounded-xl"
            >
              تغيير الصورة
            </UButton>
            <UButton
              color="error"
              variant="ghost"
              size="sm"
              class="font-bold rounded-xl"
            >
              حذف
            </UButton>
          </div>
          <span class="text-xs text-slate-400">يُفضل استخدام صورة مربعة واضحة بصيغة PNG أو JPG.</span>
        </div>
      </div>

      <!-- Form Inputs -->
      <form class="flex flex-col gap-6 pt-6" @submit.prevent="saveProfile">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormField label="الاسم الكامل" required>
            <UInput
              v-model="profile.name"
              icon="i-lucide-user"
              placeholder="الاسم الكامل"
              size="md"
              class="w-full"
            />
          </UFormField>

          <UFormField label="المسمى الأكاديمي أو الوظيفي">
            <UInput
              v-model="profile.title"
              icon="i-lucide-briefcase"
              placeholder="مثال: معلم رياضيات أول"
              size="md"
              class="w-full"
            />
          </UFormField>

          <UFormField label="البريد الإلكتروني للعمل" required>
            <UInput
              v-model="profile.email"
              type="email"
              icon="i-lucide-mail"
              placeholder="teacher@example.com"
              size="md"
              class="w-full"
            />
          </UFormField>

          <UFormField label="رقم الجوال">
            <UInput
              v-model="profile.phone"
              type="tel"
              icon="i-lucide-phone"
              placeholder="+966 50 123 4567"
              size="md"
              class="w-full"
            />
          </UFormField>
        </div>

        <!-- Bio -->
        <UFormField label="النبذة التعريفية (Bio)">
          <UTextarea
            v-model="profile.bio"
            placeholder="اكتب نبذة مختصرة عن مؤهلاتك وخبرتك الأكاديمية..."
            rows="4"
            size="md"
            class="w-full"
          />
        </UFormField>

        <!-- Specialties Tags -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-bold text-slate-900">مجالات التخصص والمواد</label>
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <UBadge
              v-for="spec in profile.specialties"
              :key="spec"
              color="primary"
              variant="subtle"
              size="md"
              class="font-bold rounded-lg pe-1.5"
            >
              <span>{{ spec }}</span>
              <UButton
                type="button"
                color="neutral"
                variant="ghost"
                size="xs"
                icon="i-lucide-x"
                class="ms-1.5 p-0 text-slate-500 hover:text-red-500 cursor-pointer"
                @click="removeSpecialty(spec)"
              />
            </UBadge>
          </div>

          <div class="flex items-center gap-2 max-w-md">
            <UInput
              v-model="newSpecialty"
              placeholder="إضافة تخصص جديد..."
              size="sm"
              class="flex-1"
              @keydown.enter.prevent="addSpecialty"
            />
            <UButton
              color="neutral"
              variant="outline"
              size="sm"
              icon="i-lucide-plus"
              class="rounded-xl font-bold"
              @click="addSpecialty"
            >
              إضافة
            </UButton>
          </div>
        </div>

        <!-- Social & Links -->
        <div class="border-t border-slate-100 pt-6 flex flex-col gap-4">
          <h3 class="text-sm font-bold text-slate-900">
            الروابط وحسابات التواصل
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <UFormField label="الموقع الشخصي">
              <UInput
                v-model="profile.website"
                icon="i-lucide-globe"
                placeholder="https://..."
                size="md"
                class="w-full"
              />
            </UFormField>

            <UFormField label="حساب X (تويتر)">
              <UInput
                v-model="profile.twitter"
                icon="i-lucide-at-sign"
                placeholder="@username"
                size="md"
                class="w-full"
              />
            </UFormField>

            <UFormField label="قناة يوتيوب">
              <UInput
                v-model="profile.youtube"
                icon="i-lucide-video"
                placeholder="ChannelName"
                size="md"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>

        <!-- Save Button -->
        <div class="border-t border-slate-100 pt-6 flex justify-end">
          <UButton
            type="submit"
            color="primary"
            variant="solid"
            size="md"
            :loading="isSaving"
            class="font-bold rounded-xl px-8"
          >
            حفظ التغييرات
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>