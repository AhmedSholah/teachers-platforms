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
  pdfFile?: File | null
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

export const useCourses = () => {
  const requestFetch = useRequestFetch()
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
          courses: CourseItem[]
        }>('/api/bootstrap')
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

  async function addCourse(data: {
    title: string
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
    }
    return res.course
  }

  async function updateCourse(courseId: number, data: Partial<CourseItem>): Promise<void> {
    const idx = courses.value.findIndex(c => c.id === courseId)

    const res = await $fetch<{ course: CourseItem }>(`/api/courses/${courseId}`, {
      method: 'PATCH',
      body: data
    })

    if (idx > -1 && res.course) {
      courses.value[idx] = res.course
    }
  }

  async function deleteCourse(courseId: number): Promise<void> {
    await $fetch(`/api/courses/${courseId}`, {
      method: 'DELETE'
    })

    courses.value = courses.value.filter(c => c.id !== courseId)
  }

  return {
    courses,
    isLoading,
    hasLoaded,
    ensureLoaded,
    fetchAll,
    addCourse,
    updateCourse,
    deleteCourse
  }
}
