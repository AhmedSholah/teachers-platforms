import { getDb } from '../../utils/db'

export default defineEventHandler((event) => {
  const idParam = getRouterParam(event, 'id')
  const courseId = Number(idParam)
  if (!idParam || isNaN(courseId)) {
    throw createError({ statusCode: 400, statusMessage: 'معرف الدورة غير صالح.' })
  }

  const db = getDb()
  const existing = db.prepare(`SELECT id FROM courses WHERE id = ?`).get(courseId)
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'الدورة غير موجودة.' })
  }

  db.prepare(`DELETE FROM courses WHERE id = ?`).run(courseId)
  return { success: true }
})
