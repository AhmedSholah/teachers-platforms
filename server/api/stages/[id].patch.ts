import { getDb, listStages } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'معرف المرحلة مطلوب.' })
  }

  const body = await readBody<{
    name?: string
    description?: string
    colorClass?: string
  }>(event)

  const db = getDb()
  const existing = db.prepare(`SELECT id, name, description, color_class FROM academic_stages WHERE id = ?`).get(id) as {
    id: string
    name: string
    description: string | null
    color_class: string
  } | undefined

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'المرحلة الدراسية غير موجودة.' })
  }

  const nextName = body?.name !== undefined ? body.name.trim() : existing.name
  if (!nextName) {
    throw createError({ statusCode: 400, statusMessage: 'يرجى كتابة اسم المرحلة.' })
  }

  const conflict = db.prepare(`
    SELECT id FROM academic_stages WHERE id != ? AND LOWER(TRIM(name)) = LOWER(TRIM(?))
  `).get(id, nextName)
  if (conflict) {
    throw createError({ statusCode: 409, statusMessage: `توجد مرحلة أخرى بالفعل باسم «${nextName}».` })
  }

  const nextDescription = body?.description !== undefined
    ? (body.description.trim() || null)
    : existing.description
  const nextColor = body?.colorClass || existing.color_class

  db.prepare(`
    UPDATE academic_stages
    SET name = ?, description = ?, color_class = ?
    WHERE id = ?
  `).run(nextName, nextDescription, nextColor, id)

  return {
    stage: listStages(db).find(s => s.id === id)
  }
})
