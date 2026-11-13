import { getDb } from '../../utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'معرف الصف الدراسي مطلوب.' })
  }

  const db = getDb()
  const existing = db.prepare(`SELECT id, name FROM classrooms WHERE id = ?`).get(id) as { id: string; name: string } | undefined
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'الصف الدراسي غير موجود.' })
  }

  db.prepare(`UPDATE courses SET classroom = 'بدون فصل دراسي' WHERE classroom = ?`).run(existing.name)
  db.prepare(`DELETE FROM classrooms WHERE id = ?`).run(id)

  return { success: true }
})
