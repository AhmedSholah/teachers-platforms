import { getDb } from '../../utils/db'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'معرف المرحلة مطلوب.' })
  }

  const db = getDb()
  const existing = db.prepare(`SELECT id FROM academic_stages WHERE id = ?`).get(id)
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'المرحلة الدراسية غير موجودة.' })
  }

  const gradeRows = db.prepare(`SELECT name FROM classrooms WHERE stage_id = ?`).all(id) as Array<{ name: string }>
  const updateCourse = db.prepare(`UPDATE courses SET classroom = 'بدون فصل دراسي' WHERE classroom = ?`)
  for (const row of gradeRows) {
    updateCourse.run(row.name)
  }

  db.prepare(`DELETE FROM academic_stages WHERE id = ?`).run(id)

  return { success: true }
})
