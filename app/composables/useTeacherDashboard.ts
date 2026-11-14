export type DashboardPeriod = 'daily' | 'weekly' | 'monthly'

export interface DashboardDateRange {
  start: Date
  end: Date
}

export interface TeacherNotification {
  id: number
  title: string
  description: string
  time: string
  read: boolean
  type: 'sale' | 'student' | 'system' | 'payout'
  icon: string
  sender: {
    name: string
    avatar?: string
    initials: string
  }
  actionTo?: string
  actionLabel?: string
}

export interface TeacherSaleRecord {
  id: string
  date: string
  status: 'paid' | 'pending' | 'refunded'
  studentName: string
  email: string
  courseTitle: string
  amount: number
}

const initialNotifications: TeacherNotification[] = [
  {
    id: 1,
    title: 'اشتراك طالب جديد في دورتك',
    description: 'انضم الطالب «محمد خالد الغامدي» إلى دورة «أساسيات الجبر والمصفوفات» وبدأ مشاهدة الدرس الأول.',
    time: 'منذ 10 دقائق',
    read: false,
    type: 'student',
    icon: 'i-lucide-user-plus',
    sender: { name: 'محمد خالد الغامدي', initials: 'م' },
    actionTo: '/teacher-dashboard/students',
    actionLabel: 'عرض الطلاب'
  },
  {
    id: 2,
    title: 'عملية شراء دورة جديدة',
    description: 'تم شراء دورة «حساب التفاضل والتكامل المتقدم» بمبلغ 250 ج.م بنجاح عبر بطاقة الدفع.',
    time: 'منذ 45 دقيقة',
    read: false,
    type: 'sale',
    icon: 'i-lucide-credit-card',
    sender: { name: 'سارة علي أحمد', initials: 'س' },
    actionTo: '/teacher-dashboard/payouts',
    actionLabel: 'عرض المعاملات'
  },
  {
    id: 3,
    title: 'طلب سحب الأرباح قيد المعالجة',
    description: 'تم استلام طلبك لسحب مبلغ 3,500 ج.م وجارٍ التحويل لحسابك البنكي في البنك الأهلي المصري.',
    time: 'منذ ساعتين',
    read: false,
    type: 'payout',
    icon: 'i-lucide-wallet',
    sender: { name: 'النظام المالي', initials: 'م' },
    actionTo: '/teacher-dashboard/payouts',
    actionLabel: 'متابعة السحب'
  },
  {
    id: 4,
    title: 'تقييم 5 نجوم جديد!',
    description: 'ترك الطالب «عبدالله بن فهد» تقييماً إيجابياً على دورة الميكانيكا: «شرح ممتاز وأسلوب مبسط جداً».',
    time: 'أمس 6:30 م',
    read: true,
    type: 'student',
    icon: 'i-lucide-star',
    sender: { name: 'عبدالله بن فهد', initials: 'ع' },
    actionTo: '/teacher-dashboard/courses',
    actionLabel: 'إدارة الدورات'
  },
  {
    id: 5,
    title: 'تحديث أمني للمنصة',
    description: 'تم تحديث خوادم حماية الفيديوهات ضد التسجيل وتحسين سرعة التحميل للطلاب على جميع الأجهزة.',
    time: 'منذ يومين',
    read: true,
    type: 'system',
    icon: 'i-lucide-shield-check',
    sender: { name: 'فريق المنصة', initials: 'ف' },
    actionTo: '/teacher-dashboard/settings',
    actionLabel: 'إعدادات المنصة'
  }
]

export function useTeacherDashboard() {
  const isNotificationsSlideoverOpen = useState<boolean>('teacher-notifications-slideover-open', () => false)

  const notifications = useState<TeacherNotification[]>('teacher-dashboard-notifications', () =>
    initialNotifications.map(item => ({ ...item, sender: { ...item.sender } }))
  )

  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

  function markAsRead(id: number) {
    const item = notifications.value.find(n => n.id === id)
    if (item) {
      item.read = true
    }
  }

  function markAllAsRead() {
    notifications.value.forEach((n) => {
      n.read = true
    })
  }

  function deleteNotification(id: number) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  function formatCurrency(value: number): string {
    return `${new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0
    }).format(value)} ج.م`
  }

  function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return {
    isNotificationsSlideoverOpen,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    formatCurrency,
    formatNumber
  }
}
