import { getDb, listClassrooms } from '../../utils/db'

const COLOR_PALETTE = [
  'bg-blue-600',
  'bg-amber-500',
  'bg-emerald-600',
  'bg-purple-600',
  'bg-rose-500',
  'bg-cyan-600',
  'bg-indigo-600'
]

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string
    stageId?: string
    colorClass?: string
    description?: string
  }>(event)

  const name = body?.name?.trim()
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'يرجى كتابة اسم الصف الدراسي.' })
  }

  const db = getDb()
  const duplicate = db.prepare(`SELECT id FROM classrooms WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))`).get(name)
  if (duplicate) {
    throw createError({ statusCode: 409, statusMessage: `الصف «${name}» موجود بالفعل.` })
  }

  let resolvedStageId = body?.stageId
  if (resolvedStageId) {
    const stageExists = db.prepare(`SELECT id FROM academic_stages WHERE id = ?`).get(resolvedStageId)
    if (!stageExists) {
      throw createError({ statusCode: 404, statusMessage: 'المرحلة الدراسية المحددة غير موجودة.' })
    }
  } else {
    const firstStage = db.prepare(`SELECT id FROM academic_stages ORDER BY sort_order ASC, created_at ASC LIMIT 1`).get() as { id: string } | undefined
    if (firstStage) {
      resolvedStageId = firstStage.id
    } else {
      resolvedStageId = `stage-${Date.now()}`
      db.prepare(`
        INSERT INTO academic_stages (id, name, description, color_class, sort_order, created_at)
        VALUES (?, 'المرحلة العامة', NULL, 'bg-blue-600', 1, ?)
      `).run(resolvedStageId, new Date().toISOString())
    }
  }

  const maxOrderRow = db.prepare(`SELECT COALESCE(MAX(sort_order), 0) AS max_order FROM classrooms WHERE stage_id = ?`).get(resolvedStageId) as { max_order: number }
  const countRow = db.prepare(`SELECT COUNT(*) AS count FROM classrooms`).get() as { count: number }

  const id = `class-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
  const colorClass = body?.colorClass || COLOR_PALETTE[countRow.count % COLOR_PALETTE.length] || 'bg-blue-600'
  const description = body?.description?.trim() || null
  const now = new Date().toISOString()

  db.prepare(`
    INSERT INTO classrooms (id, stage_id, name, description, color_class, sort_order, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, resolvedStageId, name, description, colorClass, Number(maxOrderRow.max_order) + 1, now)

  setResponseStatus(event, 201)
  const classroom = listClassrooms(db).find(c => c.id === id)
  return { classroom }
})
