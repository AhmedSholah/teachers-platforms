import { getDb, listCourses } from '../../utils/db'

const COLOR_THEMES = [
  { headerBg: 'bg-blue-100/80 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400', iconColor: 'text-blue-700 dark:text-blue-400' },
  { headerBg: 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400', iconColor: 'text-emerald-800 dark:text-emerald-400' },
  { headerBg: 'bg-purple-100/80 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400', iconColor: 'text-purple-700 dark:text-purple-400' },
  { headerBg: 'bg-amber-100/80 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400', iconColor: 'text-amber-800 dark:text-amber-400' }
]

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    title?: string
    classroom?: string
    price?: string | number
    status?: 'published' | 'draft' | 'archived'
    lessonsCount?: number
    description?: string
    category?: string
    sections?: Array<{ lessons?: unknown[] }>
  }>(event)

  const title = body?.title?.trim()
  if (!title) {
    throw createError({ statusCode: 400, statusMessage: 'يرجى كتابة عنوان الدورة.' })
  }

  const db = getDb()
  const countRow = db.prepare(`SELECT COUNT(*) AS count FROM courses`).get() as { count: number }
  const theme = COLOR_THEMES[countRow.count % COLOR_THEMES.length] || COLOR_THEMES[0]!

  let formattedPrice = 'مجانية'
  if (typeof body.price === 'number') {
    formattedPrice = body.price > 0 ? `${body.price} ج.م` : 'مجانية'
  } else if (typeof body.price === 'string') {
    const num = parseFloat(body.price)
    if (!isNaN(num) && num > 0) {
      formattedPrice = `${num} ج.م`
    } else if (body.price.includes('ج.م') || body.price.includes('مجانية')) {
      formattedPrice = body.price
    }
  }

  const sections = Array.isArray(body.sections) ? body.sections : []
  const lessonsCount = body.lessonsCount !== undefined
    ? body.lessonsCount
    : sections.reduce((acc, s) => acc + (s.lessons?.length || 0), 0)

  const result = db.prepare(`
    INSERT INTO courses (
      title, lessons_count, students_count, classroom, price, status,
      header_bg, icon_color, rating, revenue, revenue_numeric,
      completion_rate, duration_hours, quizzes_count, updated_at,
      is_featured, category, description, sections_json, created_at
    ) VALUES (?, ?, 0, ?, ?, ?, ?, ?, 0, '0 ج.م', 0, 0, 0, 0, 'الآن', 0, ?, ?, ?, ?)
  `).run(
    title,
    lessonsCount,
    body.classroom || 'بدون فصل دراسي',
    formattedPrice,
    body.status || 'published',
    theme.headerBg,
    theme.iconColor,
    body.category || null,
    body.description || null,
    JSON.stringify(sections),
    new Date().toISOString()
  )

  setResponseStatus(event, 201)
  const newId = Number(result.lastInsertRowid)
  const course = listCourses(db).find(c => c.id === newId)
  return { course }
})
