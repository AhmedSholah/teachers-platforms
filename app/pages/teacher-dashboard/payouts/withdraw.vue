<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { PayoutMethodType } from '~/composables/usePayoutMethods'
import {
  PAYOUT_METHOD_TYPES,
  getPayoutMethodTypeMeta,
  getPayoutMethodLabel,
  usePayoutMethods
} from '~/composables/usePayoutMethods'

useHead({
  title: 'سحب الأرباح - لوحة التحكم'
})

const toast = useToast()
const { methods, defaultMethod, isLoading, ensureLoaded, addMethod, removeMethod } = usePayoutMethods()

void ensureLoaded()

const availableBalance = '8,200 ج.م'
const amount = ref('5,000')

const selectedMethodId = ref<number | null>(null)

watch(methods, (list) => {
  if (selectedMethodId.value === null && list.length > 0) {
    selectedMethodId.value = (defaultMethod.value || list[0]).id
  }
}, { immediate: true })

const selectedMethod = computed(() =>
  methods.value.find(m => m.id === selectedMethodId.value) || null
)

type MethodMenuItem = DropdownMenuItem & { methodId?: number }

const methodMenuItems = computed<MethodMenuItem[]>(() => [
  ...methods.value.map(m => ({
    label: `${getPayoutMethodLabel(m)} — ${m.phone}`,
    icon: getPayoutMethodTypeMeta(m.type).icon,
    type: 'checkbox' as const,
    checked: m.id === selectedMethodId.value,
    methodId: m.id,
    onSelect: () => {
      selectedMethodId.value = m.id
    }
  })),
  ...(methods.value.length > 0 ? [{ type: 'separator' as const }] : []),
  {
    label: 'إضافة طريقة سحب جديدة',
    icon: 'i-lucide-plus',
    onSelect: () => {
      openAddModal()
    }
  }
])

// --- Delete (with confirmation modal) ---
const isMenuOpen = ref(false)
const pendingDelete = ref<{ id: number, label: string } | null>(null)
const isDeleting = ref(false)

function openDeleteConfirm(methodId: number) {
  const method = methods.value.find(m => m.id === methodId)
  if (!method) return
  isMenuOpen.value = false
  pendingDelete.value = {
    id: method.id,
    label: `${getPayoutMethodLabel(method)} — ${method.phone}`
  }
}

async function confirmDelete() {
  if (!pendingDelete.value) return
  isDeleting.value = true
  try {
    await removeMethod(pendingDelete.value.id)
    if (selectedMethodId.value === pendingDelete.value.id) {
      const remaining = methods.value
      selectedMethodId.value = remaining.length > 0 ? remaining[0]!.id : null
    }
    toast.add({
      title: 'تم حذف طريقة الاستلام',
      color: 'success'
    })
    pendingDelete.value = null
  } catch {
    toast.add({
      title: 'تعذر حذف الطريقة',
      color: 'error'
    })
  } finally {
    isDeleting.value = false
  }
}

// --- Add method modal ---
const isAddModalOpen = ref(false)
const selectedType = ref<PayoutMethodType>('wallet')

function openAddModal() {
  selectedType.value = 'wallet'
  form.value = { phone: '', phoneConfirm: '' }
  isAddModalOpen.value = true
}

const form = ref({
  phone: '',
  phoneConfirm: ''
})

const isSaving = ref(false)

async function saveMethod() {
  const phone = form.value.phone.replace(/\s+/g, '')
  const phoneConfirm = form.value.phoneConfirm.replace(/\s+/g, '')

  if (!phone) {
    toast.add({
      title: 'بيانات ناقصة',
      description: 'يرجى إدخال رقم الموبايل.',
      color: 'error'
    })
    return
  }
  if (phone !== phoneConfirm) {
    toast.add({
      title: 'الرقمان غير متطابقين',
      description: 'يرجى إدخال نفس الرقم في خانتي الرقم والتأكيد.',
      color: 'error'
    })
    return
  }

  isSaving.value = true
  try {
    const method = await addMethod({
      type: selectedType.value,
      phone,
      phoneConfirm
    })
    selectedMethodId.value = method.id
    toast.add({
      title: 'تم إضافة طريقة السحب',
      description: method.isDefault
        ? 'تم تعيينها كطريقة افتراضية للسحب.'
        : 'يمكنك الآن استخدامها عند طلب سحب الأرباح.',
      color: 'success'
    })
    isAddModalOpen.value = false
    form.value = { phone: '', phoneConfirm: '' }
  } catch (err: unknown) {
    const message = (err as { data?: { statusMessage?: string } })?.data?.statusMessage
    toast.add({
      title: 'تعذر حفظ الطريقة',
      description: message || 'يرجى التحقق من البيانات المدخلة والمحاولة مرة أخرى.',
      color: 'error'
    })
  } finally {
    isSaving.value = false
  }
}

const isSubmitting = ref(false)

function handleConfirm() {
  if (!selectedMethod.value) {
    toast.add({
      title: 'لا توجد طريقة دفع',
      description: 'أضف طريقة دفع أولاً لطلب سحب الأرباح.',
      color: 'error'
    })
    return
  }

  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    toast.add({
      title: 'تم إرسال طلب السحب',
      description: `سيتم تحويل مبلغ ${amount.value || '5,000'} ج.م إلى ${getPayoutMethodLabel(selectedMethod.value!)} خلال 2-3 أيام عمل.`,
      color: 'success'
    })
    navigateTo('/teacher-dashboard/payouts')
  }, 500)
}
</script>

<template>
  <UDashboardPanel id="teacher-payouts-withdraw" :ui="{ body: 'lg:py-10' }">
    <template #header>
      <UDashboardNavbar title="سحب الأرباح">
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
            to="/teacher-dashboard/payouts"
            color="neutral"
            variant="outline"
            icon="i-lucide-arrow-right"
            label="رجوع إلى المدفوعات"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="w-full lg:max-w-2xl mx-auto">
        <UPageCard
          title="طلب سحب أرباح"
          description="حدد المبلغ المطلوب سحبه واختر طريقة السحب."
          variant="subtle"
        >
          <div class="flex flex-col gap-5">
            <div class="flex items-center justify-between p-4 rounded-lg bg-default border border-default">
              <div class="flex items-center gap-2.5">
                <UIcon name="i-lucide-wallet" class="size-5 text-primary" />
                <span class="text-sm text-muted">الرصيد المتاح للسحب</span>
              </div>
              <span class="text-xl font-bold text-highlighted">{{ availableBalance }}</span>
            </div>

            <UFormField label="المبلغ المراد سحبه" name="amount">
              <UInput
                v-model="amount"
                type="text"
                placeholder="0"
                size="lg"
                class="w-full"
              >
                <template #trailing>
                  <span class="text-xs font-semibold text-muted">ج.م</span>
                </template>
              </UInput>
            </UFormField>

            <!-- Payout method selection -->
            <UFormField label="طريقة السحب" name="payout-method">
              <USkeleton
                v-if="isLoading && methods.length === 0"
                class="h-10 w-full rounded-md"
              />

              <UDropdownMenu
                v-else
                v-model:open="isMenuOpen"
                :items="methodMenuItems"
                :content="{ align: 'start' }"
                :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-0' }"
                class="w-full"
              >
                <UButton
                  block
                  size="lg"
                  color="neutral"
                  variant="outline"
                  trailing-icon="i-lucide-chevron-down"
                  class="justify-between font-normal"
                  :class="selectedMethod ? 'text-highlighted' : 'text-muted'"
                >
                  <span class="flex items-center gap-2 truncate">
                    <UIcon
                      v-if="selectedMethod"
                      :name="getPayoutMethodTypeMeta(selectedMethod.type).icon"
                      class="size-5 shrink-0"
                    />
                    <span class="truncate">
                      {{ selectedMethod ? `${getPayoutMethodLabel(selectedMethod)} — ${selectedMethod.phone}` : 'اختر طريقة السحب' }}
                    </span>
                  </span>
                </UButton>

                <template #item-trailing="{ item }">
                  <UButton
                    v-if="(item as MethodMenuItem).methodId"
                    icon="i-lucide-trash-2"
                    color="error"
                    variant="ghost"
                    size="xs"
                    aria-label="حذف الطريقة"
                    class="size-6 p-0"
                    @click.stop="openDeleteConfirm((item as MethodMenuItem).methodId!)"
                  />
                </template>
              </UDropdownMenu>
            </UFormField>

            <div class="rounded-lg bg-default border border-default p-4 flex flex-col gap-2.5 text-sm">
              <div class="flex items-center justify-between text-muted">
                <span>المبلغ المطلوب</span>
                <span class="font-medium text-highlighted">{{ amount ? `${amount} ج.م` : '5,000 ج.م' }}</span>
              </div>
              <div class="flex items-center justify-between text-muted">
                <span>رسوم التحويل</span>
                <span>0 ج.م</span>
              </div>
              <USeparator />
              <div class="flex items-center justify-between font-semibold text-highlighted">
                <span>الصافي المستلم</span>
                <span class="text-primary">{{ amount ? `${amount} ج.م` : '5,000 ج.م' }}</span>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-2">
              <UButton
                :loading="isSubmitting"
                :disabled="!selectedMethod"
                icon="i-lucide-check"
                label="تأكيد السحب"
                @click="handleConfirm"
              />
              <UButton
                to="/teacher-dashboard/payouts"
                color="neutral"
                variant="outline"
                label="إلغاء"
              />
            </div>
          </div>
        </UPageCard>
      </div>

      <!-- Add method modal -->
      <UModal
        v-model:open="isAddModalOpen"
        title="إضافة طريقة سحب"
        description="اختر نوع الطريقة وأدخل رقم الموبايل لاستخدامها في عمليات السحب."
        :ui="{ footer: 'justify-start' }"
      >
        <template #body>
          <form id="add-payout-method" class="flex flex-col gap-5" @submit.prevent="saveMethod">
            <URadioGroup
              v-model="selectedType"
              :items="PAYOUT_METHOD_TYPES"
              variant="card"
              color="primary"
              class="w-full"
            />

            <USeparator />

            <UFormField
              label="رقم الموبايل"
              :description="selectedType === 'instapay' ? 'الرقم المسجل عليه حسابك في إنستاباي.' : 'رقم المحفظة الإلكترونية مثل: فودافون كاش، أورنج كاش، اتصالات كاش، وي باي.'"
              required
            >
              <UInput
                v-model="form.phone"
                type="tel"
                inputmode="numeric"
                placeholder="01012345678"
                class="w-full font-mono"
              />
            </UFormField>

            <UFormField
              label="تأكيد رقم الموبايل"
              description="أعد إدخال نفس الرقم للتأكد من صحته."
              required
            >
              <UInput
                v-model="form.phoneConfirm"
                type="tel"
                inputmode="numeric"
                placeholder="01012345678"
                class="w-full font-mono"
              />
            </UFormField>
          </form>
        </template>

        <template #footer>
          <UButton
            type="submit"
            form="add-payout-method"
            icon="i-lucide-check"
            label="حفظ الطريقة"
            :loading="isSaving"
          />
          <UButton
            color="neutral"
            variant="outline"
            label="إلغاء"
            @click="isAddModalOpen = false"
          />
        </template>
      </UModal>

      <!-- Delete confirmation modal -->
      <UModal
        :open="!!pendingDelete"
        title="حذف طريقة السحب"
        :ui="{ footer: 'justify-start' }"
        @update:open="value => !value && (pendingDelete = null)"
      >
        <template #body>
          <div class="flex flex-col gap-2 text-sm">
            <p class="text-default">
              هل أنت متأكد من حذف «{{ pendingDelete?.label }}»؟
            </p>
            <p class="text-muted">
              سيتم سحب الأرباح لاحقاً عبر الطريقة الافتراضية المتبقية.
            </p>
          </div>
        </template>

        <template #footer>
          <UButton
            color="error"
            icon="i-lucide-trash-2"
            label="حذف"
            :loading="isDeleting"
            @click="confirmDelete"
          />
          <UButton
            color="neutral"
            variant="outline"
            label="إلغاء"
            @click="pendingDelete = null"
          />
        </template>
      </UModal>
    </template>
  </UDashboardPanel>
</template>
