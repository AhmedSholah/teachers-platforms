<script setup lang="ts">
useHead({
  title: 'الإعدادات - لوحة الطالب'
})

// Profile Form State
const profile = ref({
  firstName: 'سارة',
  lastName: 'علي',
  email: 'sara@example.com',
  phone: '+20 100 000 0000',
  newPassword: '',
  confirmPassword: ''
})

const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Notifications Preferences State
const notifications = ref({
  newLessons: true,
  deadlines: true,
  liveSessions: true,
  emailDigest: false
})

// Avatar State & File Picker
const avatarUrl = ref<string | null>(null)
const fileInputRef = ref<any>(null)

function triggerFileInput() {
  const el = fileInputRef.value
  if (el?.$el?.querySelector) {
    const inputEl = el.$el.querySelector('input[type="file"]') as HTMLInputElement | null
    if (inputEl) {
      inputEl.click()
      return
    }
  }
  if (el?.click) {
    el.click()
  }
}

function handleAvatarUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    avatarUrl.value = URL.createObjectURL(file)
  }
}

function removeAvatar() {
  avatarUrl.value = null
  const el = fileInputRef.value
  if (el?.$el?.querySelector) {
    const inputEl = el.$el.querySelector('input[type="file"]') as HTMLInputElement | null
    if (inputEl) inputEl.value = ''
  }
}

// Saving Handler & Feedback Toast
const isSaving = ref(false)
const savedNotification = ref(false)
const savedMessage = ref('')

function saveSettings() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    savedMessage.value = 'تم حفظ البيانات الشخصية وتفضيلات الإشعارات بنجاح!'
    savedNotification.value = true
    setTimeout(() => {
      savedNotification.value = false
    }, 3500)
  }, 400)
}

function resetSettings() {
  profile.value = {
    firstName: 'سارة',
    lastName: 'علي',
    email: 'sara@example.com',
    phone: '+20 100 000 0000',
    newPassword: '',
    confirmPassword: ''
  }
  notifications.value = {
    newLessons: true,
    deadlines: true,
    liveSessions: true,
    emailDigest: false
  }
  savedMessage.value = 'تم إلغاء التعديلات واستعادة الإعدادات الأصلية.'
  savedNotification.value = true
  setTimeout(() => {
    savedNotification.value = false
  }, 3000)
}
</script>

<template>
  <div class="flex flex-col gap-8 p-6 md:p-10 box-border w-full">
    <!-- Page Header -->
    <div class="flex flex-col gap-1.5">
      <h1 class="m-0 text-3xl font-extrabold text-slate-900 leading-tight">
        الإعدادات
      </h1>
      <span class="text-sm md:text-base text-slate-500">
        أدِر بياناتك الشخصية وتفضيلات الإشعارات.
      </span>
    </div>

    <!-- Feedback Toast / Alert -->
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
        :title="savedMessage"
        class="font-bold rounded-xl"
      />
    </Transition>

    <!-- Personal Information Card -->
    <UCard class="rounded-2xl border border-slate-200 shadow-xs bg-white">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <UIcon name="i-lucide-user" class="w-5 h-5 text-blue-600" />
            <h2 class="m-0 text-xl font-extrabold text-slate-900">
              البيانات الشخصية
            </h2>
          </div>
          <UBadge color="primary" variant="subtle" size="sm" class="font-bold">
            حساب طالب
          </UBadge>
        </div>
      </template>

      <div class="flex flex-col gap-6">
        <!-- Avatar Section -->
        <div class="flex flex-wrap items-center gap-4">
          <UAvatar
            :src="avatarUrl || undefined"
            :text="!avatarUrl ? (profile.firstName ? profile.firstName.charAt(0) : 'س') : undefined"
            size="3xl"
            class="bg-blue-100 text-blue-600 text-2xl font-extrabold ring-4 ring-blue-50 shrink-0"
          />
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center gap-2">
              <UInput
                ref="fileInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAvatarUpload"
              />
              <UButton
                icon="i-lucide-camera"
                color="neutral"
                variant="outline"
                size="sm"
                class="font-bold cursor-pointer rounded-xl"
                @click="triggerFileInput"
              >
                تغيير الصورة
              </UButton>
              <UButton
                v-if="avatarUrl"
                icon="i-lucide-trash"
                color="error"
                variant="ghost"
                size="sm"
                class="cursor-pointer rounded-xl"
                @click="removeAvatar"
              >
                حذف الصورة
              </UButton>
            </div>
            <span class="text-xs text-slate-500">JPG أو PNG أو WebP، الحد الأقصى 2 ميجابايت</span>
          </div>
        </div>

        <!-- Form Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- First Name -->
          <UFormField label="الاسم الأول" name="firstName" class="font-bold text-slate-700">
            <UInput
              id="sfn"
              v-model="profile.firstName"
              type="text"
              placeholder="سارة"
              icon="i-lucide-user"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <!-- Last Name -->
          <UFormField label="الاسم الأخير" name="lastName" class="font-bold text-slate-700">
            <UInput
              id="sln"
              v-model="profile.lastName"
              type="text"
              placeholder="علي"
              icon="i-lucide-user"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <!-- Email -->
          <UFormField label="البريد الإلكتروني" name="email" class="font-bold text-slate-700">
            <UInput
              id="sem"
              v-model="profile.email"
              type="email"
              placeholder="sara@example.com"
              icon="i-lucide-mail"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <!-- Phone -->
          <UFormField label="رقم الهاتف" name="phone" class="font-bold text-slate-700">
            <UInput
              id="sph"
              v-model="profile.phone"
              type="tel"
              placeholder="+20 100 000 0000"
              icon="i-lucide-phone"
              size="lg"
              class="w-full"
            />
          </UFormField>

          <!-- New Password -->
          <UFormField label="كلمة المرور الجديدة" name="newPassword" class="font-bold text-slate-700">
            <UInput
              id="spw"
              v-model="profile.newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="••••••••"
              icon="i-lucide-lock"
              size="lg"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  :icon="showNewPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showNewPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
                  class="cursor-pointer text-slate-400 hover:text-slate-600"
                  @click="showNewPassword = !showNewPassword"
                />
              </template>
            </UInput>
          </UFormField>

          <!-- Confirm Password -->
          <UFormField label="تأكيد كلمة المرور" name="confirmPassword" class="font-bold text-slate-700">
            <UInput
              id="spw2"
              v-model="profile.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="••••••••"
              icon="i-lucide-lock-keyhole"
              size="lg"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showConfirmPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'"
                  class="cursor-pointer text-slate-400 hover:text-slate-600"
                  @click="showConfirmPassword = !showConfirmPassword"
                />
              </template>
            </UInput>
          </UFormField>
        </div>
      </div>
    </UCard>

    <!-- Notifications Preferences Card -->
    <UCard class="rounded-2xl border border-slate-200 shadow-xs bg-white">
      <template #header>
        <div class="flex items-center gap-2.5">
          <UIcon name="i-lucide-bell" class="w-5 h-5 text-blue-600" />
          <h2 class="m-0 text-xl font-extrabold text-slate-900">
            الإشعارات
          </h2>
        </div>
      </template>

      <div class="flex flex-col divide-y divide-slate-100">
        <!-- New Lessons -->
        <div class="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
          <div class="flex flex-col gap-0.5">
            <span class="text-sm md:text-base font-bold text-slate-800">
              دروس جديدة
            </span>
            <span class="text-xs md:text-sm text-slate-500">
              أخبرني عند إضافة دروس جديدة في دوراتي
            </span>
          </div>
          <USwitch
            v-model="notifications.newLessons"
            color="primary"
            size="lg"
            class="cursor-pointer shrink-0"
            aria-label="دروس جديدة"
          />
        </div>

        <!-- Deadlines -->
        <div class="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
          <div class="flex flex-col gap-0.5">
            <span class="text-sm md:text-base font-bold text-slate-800">
              مواعيد التسليم
            </span>
            <span class="text-xs md:text-sm text-slate-500">
              تذكير قبل موعد الواجبات والاختبارات
            </span>
          </div>
          <USwitch
            v-model="notifications.deadlines"
            color="primary"
            size="lg"
            class="cursor-pointer shrink-0"
            aria-label="مواعيد التسليم"
          />
        </div>

        <!-- Live Sessions -->
        <div class="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
          <div class="flex flex-col gap-0.5">
            <span class="text-sm md:text-base font-bold text-slate-800">
              الجلسات المباشرة
            </span>
            <span class="text-xs md:text-sm text-slate-500">
              تذكير قبل بدء الجلسات المباشرة
            </span>
          </div>
          <USwitch
            v-model="notifications.liveSessions"
            color="primary"
            size="lg"
            class="cursor-pointer shrink-0"
            aria-label="الجلسات المباشرة"
          />
        </div>

        <!-- Email Digest -->
        <div class="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
          <div class="flex flex-col gap-0.5">
            <span class="text-sm md:text-base font-bold text-slate-800">
              رسائل البريد الإلكتروني
            </span>
            <span class="text-xs md:text-sm text-slate-500">
              استقبال ملخص أسبوعي على بريدي
            </span>
          </div>
          <USwitch
            v-model="notifications.emailDigest"
            color="primary"
            size="lg"
            class="cursor-pointer shrink-0"
            aria-label="رسائل البريد الإلكتروني"
          />
        </div>
      </div>
    </UCard>

    <!-- Bottom Actions -->
    <div class="flex flex-wrap items-center gap-3">
      <UButton
        color="primary"
        size="lg"
        class="font-bold px-7 py-3 rounded-xl cursor-pointer"
        icon="i-lucide-save"
        :loading="isSaving"
        @click="saveSettings"
      >
        حفظ التغييرات
      </UButton>
      <UButton
        color="neutral"
        variant="outline"
        size="lg"
        class="font-bold px-6 py-3 rounded-xl cursor-pointer"
        icon="i-lucide-rotate-ccw"
        @click="resetSettings"
      >
        إلغاء
      </UButton>
    </div>
  </div>
</template>