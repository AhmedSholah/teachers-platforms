export interface AcademicStage {
  id: string
  name: string
  description?: string
  colorClass: string
  sortOrder?: number
}

export interface Classroom {
  id: string
  stageId: string
  name: string
  description?: string
  colorClass: string
  sortOrder?: number
  courses: number[]
}

export interface LessonItem {
  id: number
  sectionId: number
  title: string
  type: 'video' | 'text' | 'pdf' | 'quiz'
  typeLabel: string
  duration?: string
  videoFile?: File | null
  videoFileName?: string
  videoFileSize?: string
  videoUrl?: string
  videoDescription?: string
  content?: string
  pdfFileName?: string
  pagesCount?: string
  questionsCount?: string
}

export interface SectionItem {
  id: number
  title: string
  order: number
  isCollapsed?: boolean
  lessons: LessonItem[]
}

export interface CourseItem {
  id: number
  title: string
  lessonsCount: number
  studentsCount: number
  classroom: string
  price: string
  status: 'published' | 'draft' | 'archived'
  headerBg: string
  iconColor: string
  rating?: number
  revenue?: string
  revenueNumeric?: number
  completionRate?: number
  durationHours?: number
  quizzesCount?: number
  updatedAt?: string
  isFeatured?: boolean
  category?: string
  description?: string
  sections?: SectionItem[]
}

let inFlightLoad: Promise<void> | null = null

export const useClassrooms = () => {
  const requestFetch = useRequestFetch()
  const stages = useState<AcademicStage[]>('teacher-academic-stages', () => [])
  const classrooms = useState<Classroom[]>('teacher-classrooms', () => [])
  const courses = useState<CourseItem[]>('teacher-courses', () => [])
  const hasLoaded = useState<boolean>('teacher-platform-loaded', () => false)
  const isLoading = useState<boolean>('teacher-platform-loading', () => false)

  async function fetchAll(force = false): Promise<void> {
    if (hasLoaded.value && !force) return
    if (inFlightLoad && !force) return inFlightLoad

    isLoading.value = true
    const run = async () => {
      try {
        const data = await requestFetch<{
          stages: AcademicStage[]
          classrooms: Classroom[]
          courses: CourseItem[]
        }>('/api/bootstrap')
        stages.value = data.stages
        classrooms.value = data.classrooms
        courses.value = data.courses
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

  if (import.meta.client && !hasLoaded.value && !isLoading.value) {
    void fetchAll(false)
  }

  const classroomOptions = computed(() => {
    const list = classrooms.value.map(c => c.name)
    return [...list, 'بدون فصل دراسي']
  })

  async function seedEgyptDefaults(includeCourses = false): Promise<void> {
    const data = await $fetch<{
      stages: AcademicStage[]
      classrooms: Classroom[]
      courses: CourseItem[]
    }>('/api/seed/egypt', {
      method: 'POST',
      body: { includeCourses }
    })
    stages.value = data.stages
    classrooms.value = data.classrooms
    courses.value = data.courses
    hasLoaded.value = true
  }

  async function addStage(
    name: string,
    colorClass?: string,
    description?: string,
    grades?: string[]
  ): Promise<AcademicStage> {
    const res = await $fetch<{
      stage: AcademicStage
      classrooms: Classroom[]
    }>('/api/stages', {
      method: 'POST',
      body: { name, colorClass, description, grades }
    })

    if (res.stage) {
      stages.value.push(res.stage)
    }
    if (res.classrooms?.length) {
      classrooms.value.push(...res.classrooms)
    }
    return res.stage
  }

  async function updateStage(
    id: string,
    data: { name?: string; colorClass?: string; description?: string }
  ): Promise<void> {
    const res = await $fetch<{ stage: AcademicStage }>(`/api/stages/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: data
    })
    const idx = stages.value.findIndex(s => s.id === id)
    if (idx > -1 && res.stage) {
      stages.value[idx] = res.stage
    }
  }

  async function deleteStage(id: string): Promise<void> {
    await $fetch(`/api/stages/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    })

    const removedNames = new Set(
      classrooms.value.filter(c => c.stageId === id).map(c => c.name)
    )
    stages.value = stages.value.filter(s => s.id !== id)
    classrooms.value = classrooms.value.filter(c => c.stageId !== id)
    courses.value.forEach((c) => {
      if (removedNames.has(c.classroom)) {
        c.classroom = 'بدون فصل دراسي'
      }
    })
  }

  async function addClassroom(
    name: string,
    colorClass?: string,
    stageId?: string,
    description?: string
  ): Promise<Classroom> {
    const res = await $fetch<{ classroom: Classroom }>('/api/classrooms', {
      method: 'POST',
      body: { name, colorClass, stageId, description }
    })
    if (res.classroom) {
      classrooms.value.push(res.classroom)
    }
    return res.classroom
  }

  async function updateClassroom(
    id: string,
    newName: string,
    updates?: { colorClass?: string; stageId?: string; description?: string }
  ): Promise<void> {
    const prev = classrooms.value.find(c => c.id === id)
    const oldName = prev?.name

    const res = await $fetch<{ classroom: Classroom }>(`/api/classrooms/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: {
        name: newName,
        colorClass: updates?.colorClass,
        stageId: updates?.stageId,
        description: updates?.description
      }
    })

    const idx = classrooms.value.findIndex(c => c.id === id)
    if (idx > -1 && res.classroom) {
      classrooms.value[idx] = res.classroom
    }

    if (oldName && res.classroom && oldName !== res.classroom.name) {
      courses.value.forEach((c) => {
        if (c.classroom === oldName) {
          c.classroom = res.classroom.name
        }
      })
    }
  }

  async function deleteClassroom(id: string): Promise<void> {
    const target = classrooms.value.find(c => c.id === id)
    await $fetch(`/api/classrooms/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    })

    classrooms.value = classrooms.value.filter(c => c.id !== id)
    if (target) {
      courses.value.forEach((c) => {
        if (c.classroom === target.name) {
          c.classroom = 'بدون فصل دراسي'
        }
      })
    }
  }

  async function toggleCourseInClassroom(classroomId: string, courseId: number): Promise<void> {
    const classroom = classrooms.value.find(c => c.id === classroomId)
    if (!classroom) return

    const isInClass = classroom.courses.includes(courseId)
    const nextClassroomName = isInClass ? 'بدون فصل دراسي' : classroom.name
    await updateCourseClassroom(courseId, nextClassroomName)
  }

  async function updateCourseClassroom(courseId: number, newClassroomName: string): Promise<void> {
    const res = await $fetch<{ course: CourseItem }>(`/api/courses/${courseId}`, {
      method: 'PATCH',
      body: { classroom: newClassroomName }
    })

    const targetCourse = courses.value.find(c => c.id === courseId)
    if (targetCourse) {
      const oldClassroom = classrooms.value.find(c => c.name === targetCourse.classroom)
      if (oldClassroom) {
        const idx = oldClassroom.courses.indexOf(courseId)
        if (idx > -1) oldClassroom.courses.splice(idx, 1)
      }

      targetCourse.classroom = res.course?.classroom || newClassroomName

      const newClassroom = classrooms.value.find(c => c.name === targetCourse.classroom)
      if (newClassroom && !newClassroom.courses.includes(courseId)) {
        newClassroom.courses.push(courseId)
      }
    }
  }

  async function addCourse(data: {
    title: string
    classroom: string
    price: string | number
    status?: 'published' | 'draft'
    lessonsCount?: number
    description?: string
    category?: string
    sections?: SectionItem[]
  }): Promise<CourseItem> {
    const res = await $fetch<{ course: CourseItem }>('/api/courses', {
      method: 'POST',
      body: data
    })

    if (res.course) {
      courses.value.unshift(res.course)
      if (res.course.classroom && res.course.classroom !== 'بدون فصل دراسي') {
        const cls = classrooms.value.find(c => c.name === res.course.classroom)
        if (cls && !cls.courses.includes(res.course.id)) {
          cls.courses.push(res.course.id)
        }
      }
    }
    return res.course
  }

  async function updateCourse(courseId: number, data: Partial<CourseItem>): Promise<void> {
    const idx = courses.value.findIndex(c => c.id === courseId)
    const oldClassroomName = idx > -1 ? courses.value[idx]?.classroom : undefined

    const res = await $fetch<{ course: CourseItem }>(`/api/courses/${courseId}`, {
      method: 'PATCH',
      body: data
    })

    if (idx > -1 && res.course) {
      courses.value[idx] = res.course
      const newClassroomName = res.course.classroom
      if (oldClassroomName !== newClassroomName) {
        if (oldClassroomName) {
          const oldCls = classrooms.value.find(c => c.name === oldClassroomName)
          if (oldCls) {
            const cIdx = oldCls.courses.indexOf(courseId)
            if (cIdx > -1) oldCls.courses.splice(cIdx, 1)
          }
        }
        if (newClassroomName && newClassroomName !== 'بدون فصل دراسي') {
          const newCls = classrooms.value.find(c => c.name === newClassroomName)
          if (newCls && !newCls.courses.includes(courseId)) {
            newCls.courses.push(courseId)
          }
        }
      }
    }
  }

  async function deleteCourse(courseId: number): Promise<void> {
    await $fetch(`/api/courses/${courseId}`, {
      method: 'DELETE'
    })

    courses.value = courses.value.filter(c => c.id !== courseId)
    classrooms.value.forEach((cls) => {
      const cIdx = cls.courses.indexOf(courseId)
      if (cIdx > -1) {
        cls.courses.splice(cIdx, 1)
      }
    })
  }

  return {
    stages,
    classrooms,
    courses,
    isLoading,
    hasLoaded,
    classroomOptions,
    ensureLoaded,
    fetchAll,
    seedEgyptDefaults,
    addStage,
    updateStage,
    deleteStage,
    addClassroom,
    updateClassroom,
    deleteClassroom,
    toggleCourseInClassroom,
    updateCourseClassroom,
    addCourse,
    updateCourse,
    deleteCourse
  }
}
