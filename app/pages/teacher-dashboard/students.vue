<script setup lang="ts">
useHead({
  title: 'إدارة الطلاب - لوحة المعلم'
})

interface Student {
  id: number
  name: string
  email: string
  avatar: string
  enrolledCoursesCount: number
  totalSpent: string
  joinDate: string
  status: 'active' | 'inactive'
}

const students = ref<Student[]>([
  {
    id: 1,
    name: 'سارة علي أحمد',
    email: 'sara@example.com',
    avatar: 'س',
    enrolledCoursesCount: 3,
    totalSpent: '450 ر.س',
    joinDate: '10 يناير 2025',
    status: 'active'
  },
  {
    id: 2,
    name: 'محمد خالد الغامدي',
    email: 'mohammed@example.com',
    avatar: 'م',
    enrolledCoursesCount: 2,
    totalSpent: '300 ر.س',
    joinDate: '5 يناير 2025',
    status: 'active'
  },
  {
    id: 3,
    name: 'عبدالله بن فهد',
    email: 'abdullah@example.com',
    avatar: 'ع',
    enrolledCoursesCount: 1,
    totalSpent: '150 ر.س',
    joinDate: '28 ديسمبر 2024',
    status: 'active'
  },
  {
    id: 4,
    name: 'ريم القحطاني',
    email: 'reem@example.com',
    avatar: 'ر',
    enrolledCoursesCount: 4,
    totalSpent: '600 ر.س',
    joinDate: '15 ديسمبر 2024',
    status: 'inactive'
  },
  {
    id: 5,
    name: 'يوسف إبراهيم',
    email: 'yousef@example.com',
    avatar: 'ي',
    enrolledCoursesCount: 2,
    totalSpent: '280 ر.س',
    joinDate: '1 ديسمبر 2024',
    status: 'active'
  }
])

const searchQuery = ref('')
const filterStatus = ref<'all' | 'active' | 'inactive'>('all')

const filteredStudents = computed(() => {
  return students.value.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus =
      filterStatus.value === 'all' || student.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

function getStudentActions(student: Student) {
  return [
    [
      {
        label: 'عرض الملف',
        icon: 'i-lucide-user',
        click: () => alert(`عرض ملف الطالب: ${student.name}`)
      },
      {
        label: 'مراسلة الطالب',
        icon: 'i-lucide-mail',
        click: () => alert(`إرسال رسالة إلى: ${student.email}`)
      }
    ],
    [
      {
        label: 'تجميد الحساب',
        icon: 'i-lucide-slash',
        color: 'error' as const,
        click: () => alert(`تجميد حساب: ${student.name}`)
      }
    ]
  ]
}
</script>

<template>
  <div class="flex flex-col min-h-full">
    <!-- Sub-navbar Action Bar -->
    <DashboardActionBar max-width="max-w-none" container-class="px-6 md:px-10">
      <UButton
        icon="i-lucide-user-plus"
        color="primary"
        variant="solid"
        size="md"
        class="font-bold rounded-xl"
      >
        إضافة طالب
      </UButton>
      <UButton
        icon="i-lucide-download"
        color="neutral"
        variant="outline"
        size="md"
        class="font-bold rounded-xl"
      >
        تصدير CSV
      </UButton>
    </DashboardActionBar>

    <div class="p-6 md:p-10 flex flex-col gap-6 w-full box-border">

    <!-- Quick Stats Summary -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-users" class="w-6 h-6" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500">إجمالي الطلاب</span>
            <span class="text-2xl font-extrabold text-slate-900">128 طالب</span>
          </div>
        </div>
      </UCard>

      <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-user-check" class="w-6 h-6" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500">الطلاب النشطون</span>
            <span class="text-2xl font-extrabold text-slate-900">114 طالب</span>
          </div>
        </div>
      </UCard>

      <UCard class="border border-slate-200 shadow-sm rounded-2xl bg-white">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-graduation-cap" class="w-6 h-6" />
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500">إجمالي التسجيلات</span>
            <span class="text-2xl font-extrabold text-slate-900">242 دورة</span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Filters & Table Card -->
    <UCard :ui="{ body: 'p-0 sm:p-0' }" class="border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
      <!-- Search & Filters Toolbar -->
      <div class="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
        <div class="w-full sm:w-80">
          <UInput
            v-model="searchQuery"
            icon="i-lucide-search"
            placeholder="بحث بالاسم أو البريد الإلكتروني..."
            size="md"
            class="w-full"
          />
        </div>

        <div class="flex items-center gap-2 self-start sm:self-auto">
          <UButton
            :variant="filterStatus === 'all' ? 'solid' : 'ghost'"
            :color="filterStatus === 'all' ? 'primary' : 'neutral'"
            size="sm"
            class="rounded-xl font-bold px-3.5"
            @click="filterStatus = 'all'"
          >
            الكل
          </UButton>
          <UButton
            :variant="filterStatus === 'active' ? 'solid' : 'ghost'"
            :color="filterStatus === 'active' ? 'primary' : 'neutral'"
            size="sm"
            class="rounded-xl font-bold px-3.5"
            @click="filterStatus = 'active'"
          >
            نشط
          </UButton>
          <UButton
            :variant="filterStatus === 'inactive' ? 'solid' : 'ghost'"
            :color="filterStatus === 'inactive' ? 'primary' : 'neutral'"
            size="sm"
            class="rounded-xl font-bold px-3.5"
            @click="filterStatus = 'inactive'"
          >
            غير نشط
          </UButton>
        </div>
      </div>

      <!-- Students Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-start border-collapse">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/80 text-xs font-bold text-slate-500">
              <th class="p-4 ps-6 text-start">الطالب</th>
              <th class="p-4 text-start">الدورات المسجلة</th>
              <th class="p-4 text-start">إجمالي المدفوعات</th>
              <th class="p-4 text-start">تاريخ الانضمام</th>
              <th class="p-4 text-start">الحالة</th>
              <th class="p-4 pe-6 text-end">إجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr
              v-for="student in filteredStudents"
              :key="student.id"
              class="hover:bg-slate-50/70 transition-colors"
            >
              <!-- Student Info -->
              <td class="p-4 ps-6">
                <div class="flex items-center gap-3">
                  <UAvatar
                    :text="student.avatar"
                    size="md"
                    class="bg-blue-100 text-blue-600 font-bold shrink-0"
                  />
                  <div class="flex flex-col min-w-0">
                    <span class="font-bold text-slate-900 truncate">{{ student.name }}</span>
                    <span class="text-xs text-slate-400 font-mono truncate">{{ student.email }}</span>
                  </div>
                </div>
              </td>

              <!-- Enrolled Courses -->
              <td class="p-4">
                <span class="font-bold text-slate-800">{{ student.enrolledCoursesCount }} دورات</span>
              </td>

              <!-- Total Spent -->
              <td class="p-4">
                <span class="font-bold text-emerald-600">{{ student.totalSpent }}</span>
              </td>

              <!-- Join Date -->
              <td class="p-4 text-slate-500 text-xs">
                {{ student.joinDate }}
              </td>

              <!-- Status -->
              <td class="p-4">
                <UBadge
                  :color="student.status === 'active' ? 'success' : 'neutral'"
                  variant="subtle"
                  size="sm"
                  class="font-bold"
                >
                  {{ student.status === 'active' ? 'نشط' : 'غير نشط' }}
                </UBadge>
              </td>

              <!-- Actions Dropdown -->
              <td class="p-4 pe-6 text-end">
                <UDropdownMenu :items="getStudentActions(student)">
                  <UButton
                    icon="i-lucide-more-vertical"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    aria-label="إجراءات"
                  />
                </UDropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredStudents.length === 0"
        class="text-center py-12 p-6 flex flex-col items-center justify-center gap-2"
      >
        <UIcon name="i-lucide-users" class="w-8 h-8 text-slate-300" />
        <p class="text-sm font-bold text-slate-700">لم يتم العثور على أي طلاب</p>
        <p class="text-xs text-slate-400">جرّب البحث بكلمة أخرى أو تغيير الفلتر.</p>
      </div>
    </UCard>
    </div>
  </div>
</template>