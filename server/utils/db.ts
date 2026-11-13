import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

export interface StageRecord {
  id: string
  name: string
  description?: string
  colorClass: string
  sortOrder: number
}

export interface ClassroomRecord {
  id: string
  stageId: string
  name: string
  description?: string
  colorClass: string
  sortOrder: number
  courses: number[]
}

export interface CourseRecord {
  id: number
  title: string
  lessonsCount: number
  studentsCount: number
  classroom: string
  price: string
  status: 'published' | 'draft' | 'archived'
  headerBg: string
  iconColor: string
  rating: number
  revenue: string
  revenueNumeric: number
  completionRate: number
  durationHours: number
  quizzesCount: number
  updatedAt: string
  isFeatured: boolean
  category?: string
  description?: string
  sections: unknown[]
}

let dbInstance: DatabaseSync | null = null

const EGYPT_STAGES_SEED = [
  {
    id: 'stage-primary',
    name: 'المرحلة الابتدائية',
    description: 'صفوف التعليم الأساسي - المرحلة الابتدائية في مصر',
    colorClass: 'bg-emerald-600',
    sortOrder: 1,
    grades: [
      { id: 'eg-prim-1', name: 'الصف الأول الابتدائي', colorClass: 'bg-emerald-600' },
      { id: 'eg-prim-2', name: 'الصف الثاني الابتدائي', colorClass: 'bg-teal-600' },
      { id: 'eg-prim-3', name: 'الصف الثالث الابتدائي', colorClass: 'bg-cyan-600' },
      { id: 'eg-prim-4', name: 'الصف الرابع الابتدائي', colorClass: 'bg-blue-600' },
      { id: 'eg-prim-5', name: 'الصف الخامس الابتدائي', colorClass: 'bg-indigo-600' },
      { id: 'eg-prim-6', name: 'الصف السادس الابتدائي', colorClass: 'bg-purple-600' }
    ]
  },
  {
    id: 'stage-preparatory',
    name: 'المرحلة الإعدادية',
    description: 'صفوف المرحلة الإعدادية والشهادة الإعدادية المصرية',
    colorClass: 'bg-amber-500',
    sortOrder: 2,
    grades: [
      { id: 'eg-prep-1', name: 'الصف الأول الإعدادي', colorClass: 'bg-amber-500' },
      { id: 'eg-prep-2', name: 'الصف الثاني الإعدادي', colorClass: 'bg-orange-500' },
      { id: 'eg-prep-3', name: 'الصف الثالث الإعدادي', colorClass: 'bg-rose-500' }
    ]
  },
  {
    id: 'stage-secondary',
    name: 'المرحلة الثانوية',
    description: 'صفوف المرحلة الثانوية العامة المصرية',
    colorClass: 'bg-blue-600',
    sortOrder: 3,
    grades: [
      { id: 'eg-sec-1', name: 'الصف الأول الثانوي', colorClass: 'bg-blue-600' },
      { id: 'eg-sec-2', name: 'الصف الثاني الثانوي', colorClass: 'bg-indigo-600' },
      { id: 'eg-sec-3', name: 'الصف الثالث الثانوي', colorClass: 'bg-emerald-600' }
    ]
  }
]

const EGYPT_COURSES_SEED = [
  {
    title: 'الرياضيات وتأسيس الحساب - المنهج المصري الجديد',
    lessonsCount: 14,
    studentsCount: 64,
    classroom: 'الصف الرابع الابتدائي',
    price: '200 ج.م',
    status: 'published',
    headerBg: 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
    iconColor: 'text-blue-700 dark:text-blue-400',
    rating: 4.9,
    revenue: '12,800 ج.م',
    revenueNumeric: 12800,
    completionRate: 82,
    durationHours: 14,
    quizzesCount: 6,
    updatedAt: 'منذ ساعتين',
    isFeatured: false,
    category: 'رياضيات',
    description: 'شرح مبسط وتدريبات شاملة على الكسور والأعداد العشرية والهندسة وفقاً لمنهج وزارة التربية والتعليم المصرية.'
  },
  {
    title: 'العلوم المتكاملة وتجارب المنهج الجديد',
    lessonsCount: 12,
    studentsCount: 52,
    classroom: 'الصف الخامس الابتدائي',
    price: '220 ج.م',
    status: 'published',
    headerBg: 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400',
    iconColor: 'text-emerald-800 dark:text-emerald-400',
    rating: 4.8,
    revenue: '11,440 ج.م',
    revenueNumeric: 11440,
    completionRate: 78,
    durationHours: 11,
    quizzesCount: 5,
    updatedAt: 'منذ يوم',
    isFeatured: false,
    category: 'علوم',
    description: 'تغطية تفاعلية لجميع مفاهيم العلوم والمشروعات البحثية لطلاب الصف الخامس الابتدائي في مصر.'
  },
  {
    title: 'الرياضيات للشهادة الابتدائية - الترم الأول',
    lessonsCount: 16,
    studentsCount: 88,
    classroom: 'الصف السادس الابتدائي',
    price: '240 ج.م',
    status: 'published',
    headerBg: 'bg-purple-100/80 text-purple-800 dark:bg-purple-950/50 dark:text-purple-400',
    iconColor: 'text-purple-800 dark:text-purple-400',
    rating: 4.9,
    revenue: '21,120 ج.م',
    revenueNumeric: 21120,
    completionRate: 86,
    durationHours: 16,
    quizzesCount: 8,
    updatedAt: 'منذ 3 أيام',
    isFeatured: true,
    category: 'رياضيات',
    description: 'تأسيس قوي لطلاب الشهادة الابتدائية في النسبة والتناسب والهندسة مع نماذج امتحانات المحافظات.'
  },
  {
    title: 'الجبر والهندسة - المرحلة الإعدادية',
    lessonsCount: 15,
    studentsCount: 73,
    classroom: 'الصف الأول الإعدادي',
    price: '230 ج.م',
    status: 'published',
    headerBg: 'bg-amber-100/80 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400',
    iconColor: 'text-amber-800 dark:text-amber-400',
    rating: 4.7,
    revenue: '16,790 ج.م',
    revenueNumeric: 16790,
    completionRate: 74,
    durationHours: 15,
    quizzesCount: 7,
    updatedAt: 'منذ يومين',
    isFeatured: false,
    category: 'رياضيات',
    description: 'شرح متكامل لمفاهيم الجبر والبرهان الهندسي للانتقال السلس من المرحلة الابتدائية إلى الإعدادية.'
  },
  {
    title: 'العلوم والمراجعة الشاملة للصف الثاني الإعدادي',
    lessonsCount: 14,
    studentsCount: 61,
    classroom: 'الصف الثاني الإعدادي',
    price: '250 ج.م',
    status: 'published',
    headerBg: 'bg-cyan-100/80 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-400',
    iconColor: 'text-cyan-800 dark:text-cyan-400',
    rating: 4.8,
    revenue: '15,250 ج.م',
    revenueNumeric: 15250,
    completionRate: 71,
    durationHours: 14,
    quizzesCount: 6,
    updatedAt: 'منذ 4 أيام',
    isFeatured: false,
    category: 'علوم',
    description: 'دراسة الجدول الدوري الحديث والحركة الموجية والصوت والضوء مع تجارب عملية وحل تدريبات كتاب الوزارة.'
  },
  {
    title: 'الشهادة الإعدادية - المراجعة النهائية في الرياضيات',
    lessonsCount: 20,
    studentsCount: 192,
    classroom: 'الصف الثالث الإعدادي',
    price: '280 ج.م',
    status: 'published',
    headerBg: 'bg-rose-100/80 text-rose-800 dark:bg-rose-950/50 dark:text-rose-400',
    iconColor: 'text-rose-800 dark:text-rose-400',
    rating: 5.0,
    revenue: '53,760 ج.م',
    revenueNumeric: 53760,
    completionRate: 92,
    durationHours: 22,
    quizzesCount: 12,
    updatedAt: 'منذ 3 ساعات',
    isFeatured: true,
    category: 'رياضيات',
    description: 'حل جميع امتحانات المحافظات السابقة في الجبر وحساب المثلثات والهندسة التحليلية لطلاب الشهادة الإعدادية.'
  },
  {
    title: 'أساسيات الجبر والمعادلات - نظام الثانوية الحديثة',
    lessonsCount: 18,
    studentsCount: 124,
    classroom: 'الصف الأول الثانوي',
    price: '260 ج.م',
    status: 'published',
    headerBg: 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
    iconColor: 'text-blue-700 dark:text-blue-400',
    rating: 4.9,
    revenue: '32,240 ج.م',
    revenueNumeric: 32240,
    completionRate: 79,
    durationHours: 18,
    quizzesCount: 9,
    updatedAt: 'منذ 5 ساعات',
    isFeatured: true,
    category: 'رياضيات عامة',
    description: 'شرح متكامل لموضوعات الجبر والمصفوفات وحساب المثلثات وفقاً لنظام التقييم الجديد بالمرحلة الثانوية.'
  },
  {
    title: 'اللغة العربية - النحو والبلاغة الكاملة',
    lessonsCount: 22,
    studentsCount: 145,
    classroom: 'الصف الثاني الثانوي',
    price: '280 ج.م',
    status: 'published',
    headerBg: 'bg-amber-100/80 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400',
    iconColor: 'text-amber-800 dark:text-amber-400',
    rating: 4.9,
    revenue: '40,600 ج.م',
    revenueNumeric: 40600,
    completionRate: 84,
    durationHours: 24,
    quizzesCount: 14,
    updatedAt: 'أمس',
    isFeatured: true,
    category: 'لغة عربية',
    description: 'تدريبات نحوية وبلاغية متدرجة وأدب العصور الإسلامية والأندلسية بنظام أسئلة الاختيار من متعدد.'
  },
  {
    title: 'التفاضل والتكامل للثانوية العامة',
    lessonsCount: 24,
    studentsCount: 230,
    classroom: 'الصف الثالث الثانوي',
    price: '400 ج.م',
    status: 'published',
    headerBg: 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400',
    iconColor: 'text-emerald-800 dark:text-emerald-400',
    rating: 5.0,
    revenue: '92,000 ج.م',
    revenueNumeric: 92000,
    completionRate: 91,
    durationHours: 28,
    quizzesCount: 15,
    updatedAt: 'منذ ساعة',
    isFeatured: true,
    category: 'رياضيات بحتة',
    description: 'تغطية شاملة للاشتقاق وتطبيقات القيم العظمى والصغرى والتكامل المحدد وحل امتحانات الثانوية العامة المصرية.'
  },
  {
    title: 'الفيزياء الكهربية والمغناطيسية - الثانوية العامة',
    lessonsCount: 26,
    studentsCount: 275,
    classroom: 'الصف الثالث الثانوي',
    price: '380 ج.م',
    status: 'published',
    headerBg: 'bg-indigo-100/80 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-400',
    iconColor: 'text-indigo-800 dark:text-indigo-400',
    rating: 4.9,
    revenue: '104,500 ج.م',
    revenueNumeric: 104500,
    completionRate: 88,
    durationHours: 30,
    quizzesCount: 16,
    updatedAt: 'منذ ساعتين',
    isFeatured: true,
    category: 'فيزياء',
    description: 'شرح قانون أوم وكيرشوف والحث الكهرومغناطيسي والفيزياء الحديثة مع حل أفكار كتاب الامتحان والنماذج الاسترشادية.'
  },
  {
    title: 'الكيمياء العضوية والكهربية - الثانوية العامة',
    lessonsCount: 22,
    studentsCount: 210,
    classroom: 'الصف الثالث الثانوي',
    price: '360 ج.م',
    status: 'published',
    headerBg: 'bg-rose-100/80 text-rose-800 dark:bg-rose-950/50 dark:text-rose-400',
    iconColor: 'text-rose-800 dark:text-rose-400',
    rating: 4.8,
    revenue: '75,600 ج.م',
    revenueNumeric: 75600,
    completionRate: 85,
    durationHours: 25,
    quizzesCount: 12,
    updatedAt: 'منذ 4 ساعات',
    isFeatured: false,
    category: 'كيمياء',
    description: 'العناصر الانتقالية والتحليل الكيميائي والاتزان والكيمياء الكهربية والعضوية لطلاب الثانوية العامة.'
  },
  {
    title: 'الرياضيات التطبيقية (الميكانيكا) - مراجعة ليلة الامتحان',
    lessonsCount: 12,
    studentsCount: 0,
    classroom: 'الصف الثالث الثانوي',
    price: '220 ج.م',
    status: 'draft',
    headerBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800/80 dark:text-slate-400',
    iconColor: 'text-slate-600 dark:text-slate-400',
    rating: 0,
    revenue: '0 ج.م',
    revenueNumeric: 0,
    completionRate: 0,
    durationHours: 14,
    quizzesCount: 8,
    updatedAt: 'منذ أسبوع',
    isFeatured: false,
    category: 'رياضيات تطبيقية',
    description: 'قيد المراجعة النهائية - مراجعة شاملة على الاستاتيكا والديناميكا وحل أسئلة بنك المعرفة المصري.'
  }
]

export function seedEgyptData(db: DatabaseSync, options?: { includeCourses?: boolean }) {
  const now = new Date().toISOString()

  const insertStage = db.prepare(`
    INSERT OR IGNORE INTO academic_stages (id, name, description, color_class, sort_order, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  const insertClassroom = db.prepare(`
    INSERT OR IGNORE INTO classrooms (id, stage_id, name, description, color_class, sort_order, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  const findStageByName = db.prepare(`SELECT id FROM academic_stages WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))`)
  const findClassroomByName = db.prepare(`SELECT id FROM classrooms WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))`)

  for (const stage of EGYPT_STAGES_SEED) {
    const existingStage = findStageByName.get(stage.name) as { id: string } | undefined
    const targetStageId = existingStage?.id || stage.id

    if (!existingStage) {
      insertStage.run(stage.id, stage.name, stage.description, stage.colorClass, stage.sortOrder, now)
    }

    stage.grades.forEach((grade, idx) => {
      const existingGrade = findClassroomByName.get(grade.name)
      if (!existingGrade) {
        insertClassroom.run(
          grade.id,
          targetStageId,
          grade.name,
          null,
          grade.colorClass,
          idx + 1,
          now
        )
      }
    })
  }

  if (options?.includeCourses) {
    const countRow = db.prepare(`SELECT COUNT(*) AS count FROM courses`).get() as { count: number }
    if (countRow.count === 0) {
      const insertCourse = db.prepare(`
        INSERT INTO courses (
          title, lessons_count, students_count, classroom, price, status,
          header_bg, icon_color, rating, revenue, revenue_numeric,
          completion_rate, duration_hours, quizzes_count, updated_at,
          is_featured, category, description, sections_json, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)

      for (const course of EGYPT_COURSES_SEED) {
        insertCourse.run(
          course.title,
          course.lessonsCount,
          course.studentsCount,
          course.classroom,
          course.price,
          course.status,
          course.headerBg,
          course.iconColor,
          course.rating,
          course.revenue,
          course.revenueNumeric,
          course.completionRate,
          course.durationHours,
          course.quizzesCount,
          course.updatedAt,
          course.isFeatured ? 1 : 0,
          course.category,
          course.description,
          '[]',
          now
        )
      }
    }
  }

  db.prepare(`INSERT OR REPLACE INTO app_meta (key, value) VALUES ('egypt_seeded_v1', '1')`).run()
}

export function getDb(): DatabaseSync {
  if (dbInstance) {
    return dbInstance
  }

  const dataDir = resolve(process.cwd(), '.data')
  mkdirSync(dataDir, { recursive: true })
  const dbPath = resolve(dataDir, 'platform.db')

  const db = new DatabaseSync(dbPath)
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS academic_stages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      color_class TEXT NOT NULL DEFAULT 'bg-blue-600',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS classrooms (
      id TEXT PRIMARY KEY,
      stage_id TEXT NOT NULL,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      color_class TEXT NOT NULL DEFAULT 'bg-blue-600',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY (stage_id) REFERENCES academic_stages(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      lessons_count INTEGER NOT NULL DEFAULT 0,
      students_count INTEGER NOT NULL DEFAULT 0,
      classroom TEXT NOT NULL DEFAULT 'بدون فصل دراسي',
      price TEXT NOT NULL DEFAULT 'مجانية',
      status TEXT NOT NULL DEFAULT 'published',
      header_bg TEXT NOT NULL,
      icon_color TEXT NOT NULL,
      rating REAL NOT NULL DEFAULT 0,
      revenue TEXT NOT NULL DEFAULT '0 ج.م',
      revenue_numeric INTEGER NOT NULL DEFAULT 0,
      completion_rate INTEGER NOT NULL DEFAULT 0,
      duration_hours INTEGER NOT NULL DEFAULT 0,
      quizzes_count INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT 'الآن',
      is_featured INTEGER NOT NULL DEFAULT 0,
      category TEXT,
      description TEXT,
      sections_json TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL
    );
  `)

  const seededRow = db.prepare(`SELECT value FROM app_meta WHERE key = 'egypt_seeded_v1'`).get()
  if (!seededRow) {
    seedEgyptData(db, { includeCourses: true })
  }

  dbInstance = db
  return db
}

export function listStages(db: DatabaseSync): StageRecord[] {
  const rows = db.prepare(`
    SELECT id, name, description, color_class, sort_order
    FROM academic_stages
    ORDER BY sort_order ASC, created_at ASC
  `).all()

  return rows.map(row => ({
    id: String(row.id),
    name: String(row.name),
    description: row.description ? String(row.description) : undefined,
    colorClass: String(row.color_class),
    sortOrder: Number(row.sort_order ?? 0)
  }))
}

export function listClassrooms(db: DatabaseSync): ClassroomRecord[] {
  const rows = db.prepare(`
    SELECT id, stage_id, name, description, color_class, sort_order
    FROM classrooms
    ORDER BY sort_order ASC, created_at ASC
  `).all()

  const courseLinks = db.prepare(`SELECT id, classroom FROM courses`).all()
  const coursesByClassroom = new Map<string, number[]>()
  for (const row of courseLinks) {
    const clsName = String(row.classroom || '')
    if (!coursesByClassroom.has(clsName)) {
      coursesByClassroom.set(clsName, [])
    }
    coursesByClassroom.get(clsName)!.push(Number(row.id))
  }

  return rows.map(row => ({
    id: String(row.id),
    stageId: String(row.stage_id),
    name: String(row.name),
    description: row.description ? String(row.description) : undefined,
    colorClass: String(row.color_class),
    sortOrder: Number(row.sort_order ?? 0),
    courses: coursesByClassroom.get(String(row.name)) || []
  }))
}

export function listCourses(db: DatabaseSync): CourseRecord[] {
  const rows = db.prepare(`
    SELECT
      id, title, lessons_count, students_count, classroom, price, status,
      header_bg, icon_color, rating, revenue, revenue_numeric,
      completion_rate, duration_hours, quizzes_count, updated_at,
      is_featured, category, description, sections_json
    FROM courses
    ORDER BY id DESC
  `).all()

  return rows.map((row) => {
    let parsedSections: unknown[] = []
    try {
      parsedSections = JSON.parse(String(row.sections_json || '[]'))
    } catch {
      parsedSections = []
    }

    return {
      id: Number(row.id),
      title: String(row.title),
      lessonsCount: Number(row.lessons_count ?? 0),
      studentsCount: Number(row.students_count ?? 0),
      classroom: String(row.classroom || 'بدون فصل دراسي'),
      price: String(row.price || 'مجانية'),
      status: (String(row.status || 'published') as CourseRecord['status']),
      headerBg: String(row.header_bg),
      iconColor: String(row.icon_color),
      rating: Number(row.rating ?? 0),
      revenue: String(row.revenue || '0 ج.م'),
      revenueNumeric: Number(row.revenue_numeric ?? 0),
      completionRate: Number(row.completion_rate ?? 0),
      durationHours: Number(row.duration_hours ?? 0),
      quizzesCount: Number(row.quizzes_count ?? 0),
      updatedAt: String(row.updated_at || 'الآن'),
      isFeatured: Boolean(row.is_featured),
      category: row.category ? String(row.category) : undefined,
      description: row.description ? String(row.description) : undefined,
      sections: parsedSections
    }
  })
}
