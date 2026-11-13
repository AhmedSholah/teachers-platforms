<script setup lang="ts">
const NO_STAGE_VALUE = '__none__'
const NO_CLASSROOM_VALUE = 'بدون فصل دراسي'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const {
  stages,
  classrooms
} = useClassrooms()

const selectedStageId = ref<string>(NO_STAGE_VALUE)
let lastEmittedClassroom: string | null = null

function syncStageFromClassroom(classroomName: string) {
  const matchedClassroom = classrooms.value.find(c => c.name === classroomName)
  if (matchedClassroom) {
    selectedStageId.value = matchedClassroom.stageId
    return
  }

  if (classroomName === NO_CLASSROOM_VALUE || !classroomName) {
    selectedStageId.value = NO_STAGE_VALUE
    return
  }

  selectedStageId.value = NO_STAGE_VALUE
}

watch(
  [() => props.modelValue, classrooms],
  ([newClassroom]) => {
    if (lastEmittedClassroom !== null && newClassroom === lastEmittedClassroom) {
      lastEmittedClassroom = null
      return
    }
    lastEmittedClassroom = null
    syncStageFromClassroom(newClassroom)
  },
  { immediate: true }
)

const stageItems = computed(() => [
  ...stages.value.map(s => ({
    label: s.name,
    value: s.id
  })),
  { label: 'بدون مرحلة دراسية', value: NO_STAGE_VALUE }
])

const filteredClassrooms = computed(() => {
  if (selectedStageId.value === NO_STAGE_VALUE) return []
  return classrooms.value.filter(c => c.stageId === selectedStageId.value)
})

const hasUnknownLegacyClassroom = computed(() => {
  return Boolean(
    props.modelValue
    && props.modelValue !== NO_CLASSROOM_VALUE
    && selectedStageId.value === NO_STAGE_VALUE
    && !classrooms.value.some(c => c.name === props.modelValue)
  )
})

const classroomItems = computed(() => {
  if (selectedStageId.value === NO_STAGE_VALUE) {
    if (hasUnknownLegacyClassroom.value) {
      return [
        { label: props.modelValue, value: props.modelValue },
        { label: NO_CLASSROOM_VALUE, value: NO_CLASSROOM_VALUE }
      ]
    }
    return [{ label: NO_CLASSROOM_VALUE, value: NO_CLASSROOM_VALUE }]
  }

  if (filteredClassrooms.value.length === 0) {
    return [{ label: 'لا توجد فصول دراسية في هذه المرحلة', value: NO_CLASSROOM_VALUE }]
  }

  return filteredClassrooms.value.map(c => ({
    label: c.name,
    value: c.name
  }))
})

const isClassroomSelectDisabled = computed(() => {
  if (selectedStageId.value === NO_STAGE_VALUE) {
    return !hasUnknownLegacyClassroom.value
  }
  return filteredClassrooms.value.length === 0
})

const selectedClassroomValue = computed(() => {
  if (selectedStageId.value === NO_STAGE_VALUE) {
    return hasUnknownLegacyClassroom.value ? props.modelValue : NO_CLASSROOM_VALUE
  }

  if (filteredClassrooms.value.length === 0) {
    return NO_CLASSROOM_VALUE
  }

  const matched = filteredClassrooms.value.find(c => c.name === props.modelValue)
  return matched ? matched.name : (filteredClassrooms.value[0]?.name || NO_CLASSROOM_VALUE)
})

function handleStageChange(nextStageVal: string | number) {
  const nextStageId = String(nextStageVal)
  selectedStageId.value = nextStageId

  if (nextStageId === NO_STAGE_VALUE) {
    lastEmittedClassroom = NO_CLASSROOM_VALUE
    emit('update:modelValue', NO_CLASSROOM_VALUE)
    return
  }

  const stageClassrooms = classrooms.value.filter(c => c.stageId === nextStageId)
  const currentStillValid = stageClassrooms.some(c => c.name === props.modelValue)
  const nextClassroom = currentStillValid
    ? props.modelValue
    : (stageClassrooms[0]?.name || NO_CLASSROOM_VALUE)

  lastEmittedClassroom = nextClassroom
  emit('update:modelValue', nextClassroom)
}

function handleClassroomChange(nextClassroomVal: string | number) {
  const nextClassroom = String(nextClassroomVal)
  lastEmittedClassroom = nextClassroom
  emit('update:modelValue', nextClassroom)
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Educational Stage Select -->
      <UFormField label="المرحلة التعليمية" class="font-bold text-slate-700 dark:text-slate-300">
        <USelect
          :model-value="selectedStageId"
          :items="stageItems"
          placeholder="اختر المرحلة التعليمية"
          size="md"
          class="w-full"
          @update:model-value="handleStageChange"
        />
      </UFormField>

      <!-- Classroom Select (Filtered by Stage) -->
      <UFormField label="الفصل الدراسي" class="font-bold text-slate-700 dark:text-slate-300">
        <USelect
          :model-value="selectedClassroomValue"
          :items="classroomItems"
          :disabled="isClassroomSelectDisabled"
          placeholder="اختر الفصل الدراسي"
          size="md"
          class="w-full"
          @update:model-value="handleClassroomChange"
        />
      </UFormField>
    </div>
  </div>
</template>
