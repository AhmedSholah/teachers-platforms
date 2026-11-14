export interface PayoutMethod {
  id: number
  type: 'wallet' | 'instapay'
  phone?: string
  isDefault: boolean
  createdAt: string
}

export type PayoutMethodType = PayoutMethod['type']

export const PAYOUT_METHOD_TYPES: Array<{
  value: PayoutMethodType
  label: string
  description: string
  icon: string
}> = [
  {
    value: 'wallet',
    label: 'محفظة إلكترونية',
    description: 'استلام الأرباح على محفظتك الإلكترونية مثل فودافون كاش',
    icon: 'i-lucide-smartphone'
  },
  {
    value: 'instapay',
    label: 'إنستاباي (InstaPay)',
    description: 'استلام الأرباح عبر رقمك على إنستاباي',
    icon: 'i-lucide-zap'
  }
]

export function getPayoutMethodTypeMeta(type: PayoutMethodType) {
  return PAYOUT_METHOD_TYPES.find(t => t.value === type) || PAYOUT_METHOD_TYPES[0]!
}

export function getPayoutMethodLabel(method: PayoutMethod): string {
  return method.type === 'instapay' ? 'إنستاباي (InstaPay)' : 'محفظة إلكترونية'
}

export function getPayoutMethodSubtitle(method: PayoutMethod): string {
  return method.phone ? `•••• ${method.phone.slice(-4)}` : ''
}

let inFlightLoad: Promise<void> | null = null

export const usePayoutMethods = () => {
  const methods = useState<PayoutMethod[]>('teacher-payout-methods', () => [])
  const hasLoaded = useState<boolean>('teacher-payout-methods-loaded', () => false)
  const isLoading = useState<boolean>('teacher-payout-methods-loading', () => false)

  const defaultMethod = computed(() =>
    methods.value.find(m => m.isDefault) || methods.value[0] || null
  )

  async function fetchAll(force = false): Promise<void> {
    if (hasLoaded.value && !force) return
    if (inFlightLoad && !force) return inFlightLoad

    isLoading.value = true
    const run = async () => {
      try {
        const data = await $fetch<{ methods: PayoutMethod[] }>('/api/payout-methods')
        methods.value = data.methods
        hasLoaded.value = true
      } finally {
        isLoading.value = false
        inFlightLoad = null
      }
    }

    inFlightLoad = run()
    return inFlightLoad
  }

  async function ensureLoaded(): Promise<void> {
    await fetchAll(false)
  }

  async function addMethod(data: {
    type: PayoutMethodType
    phone: string
    phoneConfirm: string
    isDefault?: boolean
  }): Promise<PayoutMethod> {
    const res = await $fetch<{ method: PayoutMethod }>('/api/payout-methods', {
      method: 'POST',
      body: data
    })

    if (res.method) {
      if (res.method.isDefault) {
        methods.value = methods.value.map(m => ({ ...m, isDefault: false }))
      }
      methods.value.unshift(res.method)
    }
    return res.method
  }

  async function setDefault(methodId: number): Promise<void> {
    await $fetch(`/api/payout-methods/${methodId}`, {
      method: 'PATCH',
      body: { isDefault: true }
    })

    methods.value = methods.value.map(m => ({ ...m, isDefault: m.id === methodId }))
  }

  async function removeMethod(methodId: number): Promise<void> {
    await $fetch(`/api/payout-methods/${methodId}`, {
      method: 'DELETE'
    })

    const remaining = methods.value.filter(m => m.id !== methodId)
    if (methods.value.find(m => m.id === methodId)?.isDefault && remaining.length > 0) {
      remaining[0]!.isDefault = true
    }
    methods.value = remaining
  }

  return {
    methods,
    defaultMethod,
    isLoading,
    hasLoaded,
    ensureLoaded,
    fetchAll,
    addMethod,
    setDefault,
    removeMethod
  }
}
