<script setup lang="ts">
useHead({
  title: 'المساعدة والدعم - لوحة التحكم'
})

// FAQ Items
const faqSearch = ref('')
const faqItems = [
  {
    label: 'كيف أضيف دورة جديدة؟',
    icon: 'i-lucide-book-open',
    content: 'من قسم «دوراتي» اضغط «دورة جديدة»، أدخل بيانات الدورة ثم أضف الدروس من صفحة تعديل الدورة.'
  },
  {
    label: 'كيف أسحب أرباحي؟',
    icon: 'i-lucide-wallet',
    content: 'من قسم «المدفوعات» اضغط «سحب الأرباح»، اختر المبلغ ثم أكّد العملية.'
  },
  {
    label: 'كيف أغيّر شكل منصتي؟',
    icon: 'i-lucide-palette',
    content: 'من قسم «الإعدادات» اختر تبويب «تصميم المنصة» لتغيير الاسم والشعار والألوان ورسالة الترحيب والمعاينة المباشرة.'
  },
  {
    label: 'كيف أتابع طلابي؟',
    icon: 'i-lucide-users',
    content: 'من قسم «الطلاب» ستجد قائمة بكل الطلاب المسجلين وتقدّمهم في الدورات.'
  },
  {
    label: 'كيف يتم حماية محتوى الفيديوهات؟',
    icon: 'i-lucide-shield-check',
    content: 'توفر المنصة تشفيراً وحماية متقدمة ضد التحميل المباشر مع إضافة علامة مائية ديناميكية مخصصة لكل طالب مسجل.'
  },
  {
    label: 'هل يمكنني تقديم كوبونات خصم لطلابي؟',
    icon: 'i-lucide-tag',
    content: 'نعم، يمكنك إنشاء وتخصيص كوبونات خصم بنسب مئوية أو مبالغ محددة وتحديد فترات صلاحيتها عبر قسم التسويق.'
  }
]

const filteredFaqItems = computed(() => {
  if (!faqSearch.value.trim()) return faqItems
  const query = faqSearch.value.trim().toLowerCase()
  return faqItems.filter(item =>
    item.label.toLowerCase().includes(query) ||
    item.content.toLowerCase().includes(query)
  )
})

// Support Ticket Form State
const subjectOptions = [
  'مشكلة تقنية',
  'المدفوعات والأرباح',
  'استفسار عن الدورات',
  'أخرى'
]

const form = reactive({
  subject: 'مشكلة تقنية',
  title: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitSuccessMessage = ref('')

function handleSubmitTicket() {
  if (!form.message.trim()) return
  isSubmitting.value = true

  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    submitSuccessMessage.value = `تم إرسال تذكرتك بنجاح تحت موضوع "${form.subject}". سيقوم فريق الدعم بالرد عليك قريباً.`
    form.title = ''
    form.message = ''
  }, 700)
}

function resetForm() {
  isSubmitted.value = false
  form.subject = 'مشكلة تقنية'
  form.title = ''
  form.message = ''
}

// Previous tickets list
const previousTickets = [
  {
    id: 'TK-1082',
    subject: 'المدفوعات والأرباح',
    title: 'استفسار حول موعد تحويل الأرباح الأسبوعية',
    date: 'منذ يومين',
    status: 'مكتملة',
    color: 'success' as const
  },
  {
    id: 'TK-1054',
    subject: 'مشكلة تقنية',
    title: 'تعذر رفع ملف بصيغة MP4 أكبر من 500MB',
    date: 'منذ أسبوع',
    status: 'تم الرد',
    color: 'primary' as const
  },
  {
    id: 'TK-1011',
    subject: 'أخرى',
    title: 'تفعيل شهادات إتمام الدورة تلقائياً',
    date: 'منذ 3 أسابيع',
    status: 'مغلقة',
    color: 'neutral' as const
  }
]
</script>

<template>
  <div class="flex flex-col gap-8 p-6 md:p-10 box-border w-full">
    <!-- Page Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-col gap-1.5">
        <h1 class="m-0 text-3xl font-extrabold text-slate-900 leading-tight">المساعدة والدعم</h1>
        <span class="text-sm md:text-base text-slate-500">مركز المساعدة، إجابات الأسئلة الشائعة، وفتح تذاكر الدعم الفني لمساندتك في أي وقت.</span>
      </div>
      <div class="flex items-center gap-3">
        <UButton
          to="#contact-form"
          color="primary"
          size="md"
          icon="i-lucide-send"
          class="font-bold cursor-pointer"
        >
          تواصل معنا
        </UButton>
      </div>
    </div>

    <!-- Quick Help & Channels Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <UCard class="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-mail" class="w-6 h-6" />
          </div>
          <div class="flex flex-col gap-1 flex-1 min-w-0">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wide">البريد الإلكتروني</span>
            <span class="text-base font-bold text-slate-900 truncate">[بريد الدعم]</span>
            <span class="text-xs text-slate-500">الرد السريع خلال ساعات العمل الرسمية</span>
          </div>
        </div>
      </UCard>

      <UCard class="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-phone" class="w-6 h-6" />
          </div>
          <div class="flex flex-col gap-1 flex-1 min-w-0">
            <span class="text-xs font-bold text-emerald-600 uppercase tracking-wide">الهاتف والواتساب</span>
            <span class="text-base font-bold text-slate-900 truncate">[رقم الدعم]</span>
            <span class="text-xs text-slate-500">دعم مباشر للرد على كافة الاستفسارات</span>
          </div>
        </div>
      </UCard>

      <UCard class="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-clock" class="w-6 h-6" />
          </div>
          <div class="flex flex-col gap-1 flex-1 min-w-0">
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wide">ساعات العمل</span>
            <span class="text-base font-bold text-slate-900">طوال أيام الأسبوع</span>
            <span class="text-xs text-slate-500">فريق الدعم الفني جاهز لمساعدتك 24/7</span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Main Content: FAQ & Contact Form -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- FAQ & Previous Tickets Column -->
      <div class="lg:col-span-7 flex flex-col gap-6">
        <!-- FAQ Card -->
        <UCard class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <template #header>
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <UIcon name="i-lucide-help-circle" class="w-5 h-5" />
                  </div>
                  <div>
                    <h2 class="m-0 text-xl font-bold text-slate-900">الأسئلة الشائعة</h2>
                    <span class="text-xs text-slate-500">إجابات سريعة للأسئلة الشائعة حول المنصة</span>
                  </div>
                </div>
                <UBadge color="neutral" variant="subtle" size="sm" class="font-bold">
                  {{ filteredFaqItems.length }} أسئلة
                </UBadge>
              </div>

              <!-- Search in FAQs -->
              <UInput
                v-model="faqSearch"
                placeholder="ابحث في الأسئلة الشائعة..."
                icon="i-lucide-search"
                size="md"
                class="w-full"
              />
            </div>
          </template>

          <!-- Accordion Component -->
          <div v-if="filteredFaqItems.length > 0">
            <UAccordion
              :items="filteredFaqItems"
              type="single"
              collapsible
              default-value="0"
              class="w-full space-y-3"
              :ui="{
                item: 'bg-slate-50/60 rounded-xl border border-slate-200/80 px-4 py-1 transition-colors hover:border-blue-200 hover:bg-blue-50/30',
                trigger: 'text-slate-900 font-bold text-base py-3.5 cursor-pointer hover:no-underline gap-3 justify-between',
                body: 'text-slate-600 text-sm leading-relaxed pb-4 pt-1',
                leadingIcon: 'text-blue-600 w-5 h-5 shrink-0'
              }"
            />
          </div>

          <div v-else class="text-center py-8 text-slate-400 flex flex-col items-center gap-2">
            <UIcon name="i-lucide-search-x" class="w-8 h-8 text-slate-300" />
            <span class="text-sm font-semibold">لم يتم العثور على نتائج تطابق بحثك</span>
          </div>
        </UCard>

        <!-- Previous Tickets Card -->
        <UCard class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <template #header>
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-ticket" class="w-5 h-5" />
                </div>
                <div>
                  <h2 class="m-0 text-lg font-bold text-slate-900">تذاكر الدعم السابقة</h2>
                  <span class="text-xs text-slate-500">متابعة حالة تذاكرك واستفساراتك السابقة</span>
                </div>
              </div>
            </div>
          </template>

          <div class="divide-y divide-slate-100">
            <div
              v-for="ticket in previousTickets"
              :key="ticket.id"
              class="flex flex-wrap items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
            >
              <div class="flex flex-col gap-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {{ ticket.id }}
                  </span>
                  <span class="text-sm font-bold text-slate-800 truncate">
                    {{ ticket.title }}
                  </span>
                </div>
                <div class="flex items-center gap-3 text-xs text-slate-500">
                  <span>{{ ticket.subject }}</span>
                  <span>•</span>
                  <span>{{ ticket.date }}</span>
                </div>
              </div>

              <UBadge :color="ticket.color" variant="subtle" size="sm" class="font-bold">
                {{ ticket.status }}
              </UBadge>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Contact Form Column -->
      <div id="contact-form" class="lg:col-span-5 flex flex-col gap-6">
        <UCard class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <template #header>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-message-square" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <h2 class="m-0 text-xl font-bold text-slate-900">تواصل معنا</h2>
                <span class="text-xs text-slate-500">أرسل استفسارك وسيقوم فريق الدعم بالرد عليك</span>
              </div>
            </div>
          </template>

          <!-- Success Alert when submitted -->
          <div v-if="isSubmitted" class="flex flex-col gap-4 py-2">
            <UAlert
              color="success"
              variant="subtle"
              icon="i-lucide-check-circle"
              title="تم إرسال تذكرتك بنجاح!"
              :description="submitSuccessMessage"
              class="rounded-xl font-medium"
            />
            <UButton
              variant="outline"
              color="neutral"
              size="md"
              icon="i-lucide-plus"
              class="font-bold justify-center cursor-pointer mt-2"
              @click="resetForm"
            >
              إرسال تذكرة أخرى
            </UButton>
          </div>

          <!-- Contact Form -->
          <form v-else class="flex flex-col gap-4" @submit.prevent="handleSubmitTicket">
            <UFormField label="الموضوع" name="subject" required class="font-bold text-slate-700">
              <USelect
                v-model="form.subject"
                :items="subjectOptions"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <UFormField label="عنوان الاستفسار (اختياري)" name="title" class="font-bold text-slate-700">
              <UInput
                v-model="form.title"
                placeholder="عنوان موجز للمشكلة أو الاستفسار"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <UFormField label="رسالتك" name="message" required class="font-bold text-slate-700">
              <UTextarea
                v-model="form.message"
                placeholder="اكتب تفاصيل مشكلتك أو استفسارك"
                :rows="4"
                size="lg"
                class="w-full"
              />
            </UFormField>

            <UButton
              type="submit"
              color="primary"
              size="lg"
              block
              icon="i-lucide-send"
              :loading="isSubmitting"
              :disabled="!form.message.trim()"
              class="font-bold w-full justify-center cursor-pointer shadow-md shadow-blue-500/20 mt-1"
            >
              إرسال
            </UButton>
          </form>

          <template #footer>
            <div class="flex flex-col gap-2.5 text-sm text-slate-600 pt-1">
              <div class="flex items-center justify-between">
                <span class="text-slate-500 flex items-center gap-1.5">
                  <UIcon name="i-lucide-mail" class="w-4 h-4 text-slate-400 shrink-0" />
                  البريد:
                </span>
                <span class="font-bold text-slate-800">[بريد الدعم]</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500 flex items-center gap-1.5">
                  <UIcon name="i-lucide-phone" class="w-4 h-4 text-slate-400 shrink-0" />
                  الهاتف:
                </span>
                <span class="font-bold text-slate-800">[رقم الدعم]</span>
              </div>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>
