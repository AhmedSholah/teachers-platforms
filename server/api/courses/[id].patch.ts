import { getDb, listCourses } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')
  const courseId = Number(idParam)
  if (!idParam || isNaN(courseId)) {
    throw createError({ statusCode: 400, statusMessage: 'معرف الدورة غير صالح.' })
  }

  const body = await readBody<{
    title?: string
    price?: string
    status?: 'published' | 'draft' | 'archived'
    lessonsCount?: number
    description?: string
    sections?: unknown[]
  }>(event)

  const db = getDb()
  const existing = listCourses(db).find(c => c.id === courseId)
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'الدورة غير موجودة.' })
  }

  const nextTitle = body?.title !== undefined ? body.title.trim() : existing.title
  const nextPrice = body?.price !== undefined ? body.price : existing.price
  const nextStatus = body?.status !== undefined ? body.status : existing.status
  const nextLessonsCount = body?.lessonsCount !== undefined ? body.lessonsCount : existing.lessonsCount
  const nextDescription = body?.description !== undefined ? body.description : existing.description
  const nextSections = body?.sections !== undefined ? body.sections : existing.sections

  db.prepare(`
    UPDATE courses
    SET title = ?, price = ?, status = ?, lessons_count = ?, description = ?, sections_json = ?, updated_at = 'الآن'
    WHERE id = ?
  `).run(
    nextTitle,
    nextPrice,
    nextStatus,
    nextLessonsCount,
    nextDescription || null,
    JSON.stringify(nextSections || []),
    courseId
  )

  return {
    course: listCourses(db).find(c => c.id === courseId)
  }
})
