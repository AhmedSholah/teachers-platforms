<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel } from '@tanstack/vue-table'

useHead({
  title: 'الطلاب - لوحة المعلم'
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

const UAvatar = resolveComponent('UAvatar')
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UCheckbox = resolveComponent('UCheckbox')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const table = useTemplateRef('table')

const students = ref<Student[]>([
  {
    id: 1,
    name: 'سارة علي أحمد',
    email: 'sara@example.com',
    avatar: 'س',
    enrolledCoursesCount: 3,
    totalSpent: '450 ج.م',
    joinDate: '10 يناير 2026',
    status: 'active'
  },
  {
    id: 2,
    name: 'محمد خالد الغامدي',
    email: 'mohammed@example.com',
    avatar: 'م',
    enrolledCoursesCount: 2,
    totalSpent: '300 ج.م',
    joinDate: '5 يناير 2026',
    status: 'active'
  },
  {
    id: 3,
    name: 'عبدالله بن فهد',
    email: 'abdullah@example.com',
    avatar: 'ع',
    enrolledCoursesCount: 1,
    totalSpent: '150 ج.م',
    joinDate: '28 ديسمبر 2025',
    status: 'active'
  },
  {
    id: 4,
    name: 'ريم القحطاني',
    email: 'reem@example.com',
    avatar: 'ر',
    enrolledCoursesCount: 4,
    totalSpent: '600 ج.م',
    joinDate: '15 ديسمبر 2025',
    status: 'inactive'
  },
  {
    id: 5,
    name: 'يوسف إبراهيم',
    email: 'yousef@example.com',
    avatar: 'ي',
    enrolledCoursesCount: 2,
    totalSpent: '280 ج.م',
    joinDate: '1 ديسمبر 2025',
    status: 'active'
  },
  {
    id: 6,
    name: 'مروة حسن عبد العزيز',
    email: 'marwa@example.com',
    avatar: 'م',
    enrolledCoursesCount: 3,
    totalSpent: '520 ج.م',
    joinDate: '20 نوفمبر 2025',
    status: 'active'
  },
  {
    id: 7,
    name: 'عمر سامي فاروق',
    email: 'omar@example.com',
    avatar: 'ع',
    enrolledCoursesCount: 1,
    totalSpent: '200 ج.م',
    joinDate: '14 نوفمبر 2025',
    status: 'active'
  },
  {
    id: 8,
    name: 'نور الهدى طارق',
    email: 'nour@example.com',
    avatar: 'ن',
    enrolledCoursesCount: 2,
    totalSpent: '350 ج.م',
    joinDate: '3 نوفمبر 2025',
    status: 'inactive'
  }
])

const searchQuery = ref('')
const statusFilter = ref<'all' | 'active' | 'inactive'>('all')
const columnVisibility = ref<Record<string, boolean>>({})
const rowSelection = ref<Record<string, boolean>>({})
const pagination = ref({
  pageIndex: 0,
  pageSize: 6
})

const isAddModalOpen = ref(false)
const newStudent = ref({
  name: '',
  email: ''
})

function addStudent() {
  if (!newStudent.value.name.trim() || !newStudent.value.email.trim()) return
  const nextId = (students.value[0]?.id || 0) + students.value.length + 1
  students.value.unshift({
    id: nextId,
    name: newStudent.value.name.trim(),
    email: newStudent.value.email.trim(),
    avatar: newStudent.value.name.trim().charAt(0),
    enrolledCoursesCount: 0,
    totalSpent: '0 ج.م',
    joinDate: 'اليوم',
    status: 'active'
  })
  toast.add({
    title: 'تمت إضافة الطالب',
    description: `تمت إضافة ${newStudent.value.name.trim()} بنجاح.`,
    color: 'success'
  })
  newStudent.value = { name: '', email: '' }
  isAddModalOpen.value = false
}

const filteredStudents = computed(() => {
  return students.value.filter((student) => {
    const q = searchQuery.value.trim().toLowerCase()
    const matchesSearch = !q ||
      student.name.toLowerCase().includes(q) ||
      student.email.toLowerCase().includes(q)
    const matchesStatus = statusFilter.value === 'all' || student.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const selectedCount = computed(() => Object.values(rowSelection.value).filter(Boolean).length)

function deleteSelected() {
  const selectedIds = new Set(
    Object.entries(rowSelection.value)
      .filter(([, checked]) => checked)
      .map(([idx]) => filteredStudents.value[Number(idx)]?.id)
      .filter(Boolean)
  )
  students.value = students.value.filter(s => !selectedIds.has(s.id))
  rowSelection.value = {}
  toast.add({
    title: 'تم حذف الطلاب المحددين',
    color: 'neutral'
  })
}

function getRowItems(student: Student) {
  return [
    [
      {
        type: 'label' as const,
        label: 'إجراءات الطالب'
      },
      {
        label: 'نسخ البريد الإلكتروني',
        icon: 'i-lucide-copy',
        onSelect: () => {
          navigator.clipboard?.writeText(student.email)
          toast.add({ title: 'تم نسخ البريد الإلكتروني', color: 'success' })
        }
      },
      {
        label: student.status === 'active' ? 'تعطيل الحساب' : 'تفعيل الحساب',
        icon: student.status === 'active' ? 'i-lucide-user-x' : 'i-lucide-user-check',
        onSelect: () => {
          student.status = student.status === 'active' ? 'inactive' : 'active'
          toast.add({
            title: student.status === 'active' ? 'تم تفعيل حساب الطالب' : 'تم تعطيل حساب الطالب',
            color: 'neutral'
          })
        }
      }
    ],
    [
      {
        label: 'حذف الطالب',
        icon: 'i-lucide-trash',
        color: 'error' as const,
        onSelect: () => {
          students.value = students.value.filter(s => s.id !== student.id)
          toast.add({ title: 'تم حذف الطالب', color: 'error' })
        }
      }
    ]
  ]
}

const columns: TableColumn<Student>[] = [
  {
    id: 'select',
    header: ({ table: tbl }) => h(UCheckbox, {
      'modelValue': tbl.getIsSomePageRowsSelected() ? 'indeterminate' : tbl.getIsAllPageRowsSelected(),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => tbl.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'تحديد الكل'
    }),
    cell: ({ row }) => h(UCheckbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
      'ariaLabel': 'تحديد الصف'
    })
  },
  {
    accessorKey: 'id',
    header: '#'
  },
  {
    accessorKey: 'name',
    header: 'الطالب',
    cell: ({ row }) => h('div', { class: 'flex items-center gap-3' }, [
      h(UAvatar, { text: row.original.avatar, size: 'md', class: 'bg-primary/10 text-primary font-bold' }),
      h('div', { class: 'min-w-0' }, [
        h('p', { class: 'font-medium text-highlighted truncate' }, row.original.name),
        h('p', { class: 'text-xs text-muted truncate' }, row.original.email)
      ])
    ])
  },
  {
    accessorKey: 'enrolledCoursesCount',
    header: 'الدورات',
    cell: ({ row }) => `${row.original.enrolledCoursesCount} دورات`
  },
  {
    accessorKey: 'totalSpent',
    header: 'المدفوعات',
    cell: ({ row }) => h('span', { class: 'font-medium text-highlighted' }, row.original.totalSpent)
  },
  {
    accessorKey: 'joinDate',
    header: 'تاريخ الانضمام'
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ({ row }) => {
      const isActive = row.original.status === 'active'
      return h(UBadge, {
        variant: 'subtle',
        color: isActive ? 'success' : 'neutral'
      }, () => isActive ? 'نشط' : 'غير نشط')
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'text-end' }, h(UDropdownMenu, {
      content: { align: 'end' },
      items: getRowItems(row.original)
    }, () => h(UButton, {
      icon: 'i-lucide-ellipsis-vertical',
      color: 'neutral',
      variant: 'ghost',
      class: 'ms-auto',
      'aria-label': 'إجراءات'
    })))
  }
]

const columnLabels: Record<string, string> = {
  id: 'الرقم',
  name: 'الطالب',
  enrolledCoursesCount: 'الدورات',
  totalSpent: 'المدفوعات',
  joinDate: 'تاريخ الانضمام',
  status: 'الحالة'
}

const displayColumnItems = computed(() =>
  (table.value?.tableApi?.getAllColumns().filter((col: { getCanHide: () => boolean }) => col.getCanHide()) || [])
    .map((column: { id: string; getIsVisible: () => boolean }) => ({
      label: columnLabels[column.id] || column.id,
      type: 'checkbox' as const,
      checked: column.getIsVisible(),
      onUpdateChecked(checked: boolean) {
        table.value?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
      },
      onSelect(e?: Event) {
        e?.preventDefault()
      }
    }))
)

const statusItems = [
  { label: 'الكل', value: 'all' },
  { label: 'نشط', value: 'active' },
  { label: 'غير نشط', value: 'inactive' }
]
</script>

<template>
  <UDashboardPanel id="teacher-students">
    <template #header>
      <UDashboardNavbar title="الطلاب">
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
            label="إضافة طالب"
            icon="i-lucide-user-plus"
            @click="isAddModalOpen = true"
          />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput
          v-model="searchQuery"
          class="max-w-sm"
          icon="i-lucide-search"
          placeholder="ابحث بالاسم أو البريد الإلكتروني..."
        />

        <div class="flex flex-wrap items-center gap-1.5">
          <UButton
            v-if="selectedCount > 0"
            label="حذف"
            color="error"
            variant="subtle"
            icon="i-lucide-trash"
            @click="deleteSelected"
          >
            <template #trailing>
              <UKbd>
                {{ selectedCount }}
              </UKbd>
            </template>
          </UButton>

          <USelect
            v-model="statusFilter"
            :items="statusItems"
            placeholder="تصفية الحالة"
            class="min-w-28"
          />

          <UDropdownMenu
            :items="displayColumnItems"
            :content="{ align: 'end' }"
          >
            <UButton
              label="الأعمدة"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-settings-2"
            />
          </UDropdownMenu>
        </div>
      </div>

      <UTable
        ref="table"
        v-model:column-visibility="columnVisibility"
        v-model:row-selection="rowSelection"
        v-model:pagination="pagination"
        :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
        class="shrink-0"
        :data="filteredStudents"
        :columns="columns"
        :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e',
          td: 'border-b border-default',
          separator: 'h-0'
        }"
      />

      <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto">
        <div class="text-sm text-muted">
          تم تحديد {{ selectedCount }} من {{ filteredStudents.length }} طالب.
        </div>

        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="filteredStudents.length"
          @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </template>
  </UDashboardPanel>

  <UModal
    v-model:open="isAddModalOpen"
    title="إضافة طالب جديد"
    description="أدخل بيانات الطالب لإضافته إلى منصتك"
  >
    <template #body>
      <form class="flex flex-col gap-4" @submit.prevent="addStudent">
        <UFormField label="الاسم الكامل" required>
          <UInput v-model="newStudent.name" placeholder="مثال: أحمد علي" class="w-full" />
        </UFormField>
        <UFormField label="البريد الإلكتروني" required>
          <UInput v-model="newStudent.email" type="email" placeholder="student@example.com" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2 pt-2">
          <UButton label="إلغاء" color="neutral" variant="ghost" @click="isAddModalOpen = false" />
          <UButton type="submit" label="إضافة الطالب" />
        </div>
      </form>
    </template>
  </UModal>
</template>