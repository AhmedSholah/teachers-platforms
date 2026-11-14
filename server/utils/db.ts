import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

export interface CourseRecord {
  id: number
  title: string
  lessonsCount: number
  studentsCount: number
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

const DEFAULT_COURSES_SEED = [
  {
    title: 'الرياضيات وتأسيس الحساب - المنهج المصري الجديد',
    lessonsCount: 14,
    studentsCount: 64,
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
    description: 'شرح مبسط وتدريبات شاملة على الكسور والأعداد العشرية والهندسة.'
  },
  {
    title: 'العلوم المتكاملة وتجارب المنهج الجديد',
    lessonsCount: 12,
    studentsCount: 52,
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
    description: 'تغطية تفاعلية لجميع مفاهيم العلوم والمشروعات البحثية.'
  },
  {
    title: 'الرياضيات المتقدمة - الترم الأول',
    lessonsCount: 16,
    studentsCount: 88,
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
    description: 'تأسيس قوي في النسبة والتناسب والهندسة مع نماذج امتحانات شاملة.'
  },
  {
    title: 'الجبر والهندسة التحليلية',
    lessonsCount: 15,
    studentsCount: 73,
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
    description: 'شرح متكامل لمفاهيم الجبر والبرهان الهندسي.'
  },
  {
    title: 'العلوم والمراجعة الشاملة',
    lessonsCount: 14,
    studentsCount: 61,
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
    description: 'دراسة الجدول الدوري الحديث والحركة الموجية والصوت والضوء مع تجارب عملية.'
  },
  {
    title: 'المراجعة النهائية في الرياضيات',
    lessonsCount: 20,
    studentsCount: 192,
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
    description: 'حل جميع الامتحانات السابقة في الجبر وحساب المثلثات والهندسة التحليلية.'
  },
  {
    title: 'أساسيات الجبر والمعادلات',
    lessonsCount: 18,
    studentsCount: 124,
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
    description: 'شرح متكامل لموضوعات الجبر والمصفوفات وحساب المثلثات.'
  },
  {
    title: 'اللغة العربية - النحو والبلاغة الكاملة',
    lessonsCount: 22,
    studentsCount: 145,
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
    description: 'تدريبات نحوية وبلاغية متدرجة وأدب العصور الإسلامية والأندلسية.'
  },
  {
    title: 'التفاضل والتكامل المتقدم',
    lessonsCount: 24,
    studentsCount: 230,
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
    description: 'تغطية شاملة للاشتقاق وتطبيقات القيم العظمى والصغرى والتكامل المحدد.'
  },
  {
    title: 'الفيزياء الكهربية والمغناطيسية',
    lessonsCount: 26,
    studentsCount: 275,
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
    description: 'شرح قانون أوم وكيرشوف والحث الكهرومغناطيسي والفيزياء الحديثة.'
  },
  {
    title: 'الكيمياء العضوية والكهربية',
    lessonsCount: 22,
    studentsCount: 210,
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
    description: 'العناصر الانتقالية والتحليل الكيميائي والاتزان والكيمياء الكهربية والعضوية.'
  },
  {
    title: 'الرياضيات التطبيقية (الميكانيكا) - مراجعة ليلة الامتحان',
    lessonsCount: 12,
    studentsCount: 0,
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
    description: 'قيد المراجعة النهائية - مراجعة شاملة على الاستاتيكا والديناميكا.'
  }
]

function seedDefaultCourses(db: DatabaseSync) {
  const countRow = db.prepare(`SELECT COUNT(*) AS count FROM courses`).get() as { count: number }
  if (countRow.count > 0) return

  const now = new Date().toISOString()
  const insertCourse = db.prepare(`
    INSERT INTO courses (
      title, lessons_count, students_count, price, status,
      header_bg, icon_color, rating, revenue, revenue_numeric,
      completion_rate, duration_hours, quizzes_count, updated_at,
      is_featured, category, description, sections_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const course of DEFAULT_COURSES_SEED) {
    insertCourse.run(
      course.title,
      course.lessonsCount,
      course.studentsCount,
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

  db.prepare(`INSERT OR REPLACE INTO app_meta (key, value) VALUES ('courses_seeded_v1', '1')`).run()
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

    DROP TABLE IF EXISTS classrooms;
    DROP TABLE IF EXISTS academic_stages;

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      lessons_count INTEGER NOT NULL DEFAULT 0,
      students_count INTEGER NOT NULL DEFAULT 0,
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

  const columns = db.prepare(`PRAGMA table_info(courses)`).all() as Array<{ name: string }>
  if (columns.some(col => col.name === 'classroom')) {
    db.exec(`ALTER TABLE courses DROP COLUMN classroom`)
  }

  const seededRow = db.prepare(`SELECT value FROM app_meta WHERE key = 'courses_seeded_v1'`).get()
  const legacySeededRow = db.prepare(`SELECT value FROM app_meta WHERE key = 'egypt_seeded_v1'`).get()
  if (!seededRow && !legacySeededRow) {
    seedDefaultCourses(db)
  } else if (legacySeededRow) {
    db.prepare(`DELETE FROM app_meta WHERE key = 'egypt_seeded_v1'`).run()
    db.prepare(`INSERT OR REPLACE INTO app_meta (key, value) VALUES ('courses_seeded_v1', '1')`).run()
  }

  dbInstance = db
  return db
}

export function listCourses(db: DatabaseSync): CourseRecord[] {
  const rows = db.prepare(`
    SELECT
      id, title, lessons_count, students_count, price, status,
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
