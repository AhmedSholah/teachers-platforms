import { getDb, listClassrooms } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'معرف الصف الدراسي مطلوب.' })
  }

  const body = await readBody<{
    name?: string
    stageId?: string
    colorClass?: string
    description?: string
  }>(event)

  const db = getDb()
  const existing = db.prepare(`
    SELECT id, stage_id, name, description, color_class
    FROM classrooms
    WHERE id = ?
  `).get(id) as {
    id: string
    stage_id: string
    name: string
    description: string | null
    color_class: string
  } | undefined

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'الصف الدراسي غير موجود.' })
  }

  const nextName = body?.name !== undefined ? body.name.trim() : existing.name
  if (!nextName) {
    throw createError({ statusCode: 400, statusMessage: 'يرجى كتابة اسم الصف الدراسي.' })
  }

  const conflict = db.prepare(`
    SELECT id FROM classrooms WHERE id != ? AND LOWER(TRIM(name)) = LOWER(TRIM(?))
  `).get(id, nextName)
  if (conflict) {
    throw createError({ statusCode: 409, statusMessage: `يوجد صف آخر بالفعل باسم «${nextName}».` })
  }

  const nextStageId = body?.stageId || existing.stage_id
  if (body?.stageId) {
    const stageExists = db.prepare(`SELECT id FROM academic_stages WHERE id = ?`).get(nextStageId)
    if (!stageExists) {
      throw createError({ statusCode: 404, statusMessage: 'المرحلة الدراسية المحددة غير موجودة.' })
    }
  }

  const nextColor = body?.colorClass || existing.color_class
  const nextDescription = body?.description !== undefined
    ? (body.description.trim() || null)
    : existing.description

  db.prepare(`
    UPDATE classrooms
    SET name = ?, stage_id = ?, color_class = ?, description = ?
    WHERE id = ?
  `).run(nextName, nextStageId, nextColor, nextDescription, id)

  if (nextName !== existing.name) {
    db.prepare(`UPDATE courses SET classroom = ? WHERE classroom = ?`).run(nextName, existing.name)
  }

  return {
    classroom: listClassrooms(db).find(c => c.id === id)
  }
})
