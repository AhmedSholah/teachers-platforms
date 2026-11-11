export interface Classroom {
  id: string
  name: string
  description?: string
  colorClass: string
  courses: number[]
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
}

const defaultClassrooms: Classroom[] = [
  {
    id: 'class-1',
    name: 'الصف الأول الثانوي',
    colorClass: 'bg-blue-600',
    courses: [1, 2, 6]
  },
  {
    id: 'class-2',
    name: 'الصف الثاني الثانوي',
    colorClass: 'bg-amber-500',
    courses: [3]
  },
  {
    id: 'class-3',
    name: 'الصف الثالث الثانوي',
    colorClass: 'bg-emerald-600',
    courses: [4, 5]
  }
]

const defaultCourses: CourseItem[] = [
  {
    id: 1,
    title: 'أساسيات الجبر والمعادلات الخطية',
    lessonsCount: 12,
    studentsCount: 124,
    classroom: 'الصف الأول الثانوي',
    price: '250 ج.م',
    status: 'published',
    headerBg: 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
    iconColor: 'text-blue-700 dark:text-blue-400',
    rating: 4.9,
    revenue: '31,000 ج.م',
    revenueNumeric: 31000,
    completionRate: 74,
    durationHours: 14,
    quizzesCount: 6,
    updatedAt: 'منذ ساعتين',
    isFeatured: true,
    category: 'رياضيات عامة',
    description: 'كورس شامل يغطي أساسيات الجبر وحل المعادلات والمتطابقات مع تدريبات تطبيقية واختبارات قياسية.'
  },
  {
    id: 2,
    title: 'دورة مكثفة في الهندسة التحليلية',
    lessonsCount: 20,
    studentsCount: 86,
    classroom: 'الصف الأول الثانوي',
    price: '300 ج.م',
    status: 'published',
    headerBg: 'bg-amber-100/80 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400',
    iconColor: 'text-amber-800 dark:text-amber-400',
    rating: 4.8,
    revenue: '25,800 ج.م',
    revenueNumeric: 25800,
    completionRate: 62,
    durationHours: 22,
    quizzesCount: 8,
    updatedAt: 'منذ يومين',
    isFeatured: false,
    category: 'هندسة',
    description: 'شرح متعمق لجميع نظريات ومسائل الهندسة التحليلية والإحداثيات مع حل نماذج الامتحانات الوزارية.'
  },
  {
    id: 3,
    title: 'الإحصاء والاحتمالات المتقدمة',
    lessonsCount: 10,
    studentsCount: 42,
    classroom: 'الصف الثاني الثانوي',
    price: '350 ج.م',
    status: 'published',
    headerBg: 'bg-purple-100/80 text-purple-800 dark:bg-purple-950/50 dark:text-purple-400',
    iconColor: 'text-purple-800 dark:text-purple-400',
    rating: 4.7,
    revenue: '14,700 ج.م',
    revenueNumeric: 14700,
    completionRate: 85,
    durationHours: 12,
    quizzesCount: 4,
    updatedAt: 'منذ 4 أيام',
    isFeatured: false,
    category: 'إحصاء تطبيقي',
    description: 'تغطية تفصيلية لمفاهيم التوزيعات الاحتمالية والانحراف المعياري مع أمثلة عملية من واقع الحياة.'
  },
  {
    id: 4,
    title: 'التفاضل والتكامل للثانوية العامة',
    lessonsCount: 16,
    studentsCount: 0,
    classroom: 'الصف الثالث الثانوي',
    price: '400 ج.م',
    status: 'draft',
    headerBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800/80 dark:text-slate-400',
    iconColor: 'text-slate-600 dark:text-slate-400',
    rating: 0,
    revenue: '0 ج.م',
    revenueNumeric: 0,
    completionRate: 0,
    durationHours: 18,
    quizzesCount: 5,
    updatedAt: 'منذ أسبوع',
    isFeatured: false,
    category: 'رياضيات بحتة',
    description: 'المحتوى قيد المراجعة والإعداد النهائي - يشمل النهايات والاشتقاق وتطبيقات القيم العظمى والصغرى.'
  },
  {
    id: 5,
    title: 'المراجعة النهائية وليلة الامتحان - ميكانيكا',
    lessonsCount: 8,
    studentsCount: 215,
    classroom: 'الصف الثالث الثانوي',
    price: '220 ج.م',
    status: 'published',
    headerBg: 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400',
    iconColor: 'text-emerald-800 dark:text-emerald-400',
    rating: 5.0,
    revenue: '47,300 ج.م',
    revenueNumeric: 47300,
    completionRate: 94,
    durationHours: 10,
    quizzesCount: 10,
    updatedAt: 'منذ 3 ساعات',
    isFeatured: true,
    category: 'ميكانيكا وفيزياء',
    description: 'الكورس الأكثر مبيعاً: ملخصات ذهبية مركزة وحل أكثر من 500 فكرة امتحانية متكررة مع إجابات نموذجية.'
  },
  {
    id: 6,
    title: 'بنك الأسئلة الشامل والاختبارات التفاعلية',
    lessonsCount: 14,
    studentsCount: 98,
    classroom: 'الصف الأول الثانوي',
    price: '180 ج.م',
    status: 'published',
    headerBg: 'bg-cyan-100/80 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-400',
    iconColor: 'text-cyan-800 dark:text-cyan-400',
    rating: 4.9,
    revenue: '17,640 ج.م',
    revenueNumeric: 17640,
    completionRate: 68,
    durationHours: 11,
    quizzesCount: 14,
    updatedAt: 'أمس',
    isFeatured: false,
    category: 'اختبارات وبنوك أسئلة',
    description: 'مجموعة متكاملة من الاختبارات الذاتية المصححة آلياً مع تفسيرات بالفيديو لكل خطوة.'
  }
]

export const useClassrooms = () => {
  const classrooms = useState<Classroom[]>('teacher-classrooms', () => defaultClassrooms)
  const courses = useState<CourseItem[]>('teacher-courses', () => defaultCourses)

  const classroomOptions = computed(() => {
    const list = classrooms.value.map(c => c.name)
    return [...list, 'بدون فصل دراسي']
  })

  function addClassroom(name: string, colorClass?: string): Classroom {
    const trimmed = name.trim()
    const colorPalette = [
      'bg-blue-600',
      'bg-amber-500',
      'bg-emerald-600',
      'bg-purple-600',
      'bg-rose-500',
      'bg-cyan-600',
      'bg-indigo-600'
    ]
    const chosenColor = colorClass || colorPalette[classrooms.value.length % colorPalette.length]
    const newClass: Classroom = {
      id: `class-${Date.now()}`,
      name: trimmed,
      colorClass: chosenColor,
      courses: []
    }
    classrooms.value.push(newClass)
    return newClass
  }

  function updateClassroom(id: string, newName: string) {
    const trimmed = newName.trim()
    const found = classrooms.value.find(c => c.id === id)
    if (found && trimmed) {
      const oldName = found.name
      found.name = trimmed
      courses.value.forEach(c => {
        if (c.classroom === oldName) {
          c.classroom = trimmed
        }
      })
    }
  }

  function deleteClassroom(id: string) {
    const index = classrooms.value.findIndex(c => c.id === id)
    if (index > -1) {
      const removedName = classrooms.value[index].name
      classrooms.value.splice(index, 1)
      courses.value.forEach(c => {
        if (c.classroom === removedName) {
          c.classroom = 'بدون فصل دراسي'
        }
      })
    }
  }

  function toggleCourseInClassroom(classroomId: string, courseId: number) {
    const classroom = classrooms.value.find(c => c.id === classroomId)
    if (!classroom) return

    const idx = classroom.courses.indexOf(courseId)
    const targetCourse = courses.value.find(c => c.id === courseId)

    if (idx > -1) {
      classroom.courses.splice(idx, 1)
      if (targetCourse && targetCourse.classroom === classroom.name) {
        targetCourse.classroom = 'بدون فصل دراسي'
      }
    } else {
      classroom.courses.push(courseId)
      if (targetCourse) {
        targetCourse.classroom = classroom.name
      }
    }
  }

  function updateCourseClassroom(courseId: number, newClassroomName: string) {
    const targetCourse = courses.value.find(c => c.id === courseId)
    if (!targetCourse) return

    const oldClassroom = classrooms.value.find(c => c.name === targetCourse.classroom)
    if (oldClassroom) {
      const idx = oldClassroom.courses.indexOf(courseId)
      if (idx > -1) oldClassroom.courses.splice(idx, 1)
    }

    targetCourse.classroom = newClassroomName

    const newClassroom = classrooms.value.find(c => c.name === newClassroomName)
    if (newClassroom && !newClassroom.courses.includes(courseId)) {
      newClassroom.courses.push(courseId)
    }
  }

  function addCourse(data: {
    title: string
    classroom: string
    price: string | number
    status?: 'published' | 'draft'
    lessonsCount?: number
  }): CourseItem {
    const newId = Date.now()
    const colorThemes = [
      { headerBg: 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400', iconColor: 'text-blue-700 dark:text-blue-400' },
      { headerBg: 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400', iconColor: 'text-emerald-800 dark:text-emerald-400' },
      { headerBg: 'bg-purple-100/80 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400', iconColor: 'text-purple-700 dark:text-purple-400' },
      { headerBg: 'bg-amber-100/80 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400', iconColor: 'text-amber-800 dark:text-amber-400' }
    ]
    const theme = colorThemes[courses.value.length % colorThemes.length]

    let formattedPrice = 'مجانية'
    if (typeof data.price === 'number') {
      formattedPrice = data.price > 0 ? `${data.price} ج.م` : 'مجانية'
    } else if (typeof data.price === 'string') {
      const num = parseFloat(data.price)
      if (!isNaN(num) && num > 0) {
        formattedPrice = `${num} ج.م`
      } else if (data.price.includes('ج.م') || data.price.includes('مجانية')) {
        formattedPrice = data.price
      } else {
        formattedPrice = 'مجانية'
      }
    }

    const newCourse: CourseItem = {
      id: newId,
      title: data.title,
      lessonsCount: data.lessonsCount ?? 0,
      studentsCount: 0,
      classroom: data.classroom || 'بدون فصل دراسي',
      price: formattedPrice,
      status: data.status || 'published',
      headerBg: theme.headerBg,
      iconColor: theme.iconColor
    }

    courses.value.unshift(newCourse)

    if (data.classroom && data.classroom !== 'بدون فصل دراسي') {
      const cls = classrooms.value.find(c => c.name === data.classroom)
      if (cls && !cls.courses.includes(newId)) {
        cls.courses.push(newId)
      }
    }

    return newCourse
  }

  function deleteCourse(courseId: number) {
    const idx = courses.value.findIndex(c => c.id === courseId)
    if (idx > -1) {
      const removedCourse = courses.value[idx]
      courses.value.splice(idx, 1)

      // Also remove from classroom's courses list
      classrooms.value.forEach(cls => {
        const cIdx = cls.courses.indexOf(courseId)
        if (cIdx > -1) {
          cls.courses.splice(cIdx, 1)
        }
      })
    }
  }

  return {
    classrooms,
    courses,
    classroomOptions,
    addClassroom,
    updateClassroom,
    deleteClassroom,
    toggleCourseInClassroom,
    updateCourseClassroom,
    addCourse,
    deleteCourse
  }
}

