import { getDb, listClassrooms, listStages } from '../../utils/db'

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
    description?: string
    colorClass?: string
    grades?: string[]
  }>(event)

  const name = body?.name?.trim()
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'يرجى كتابة اسم المرحلة الدراسية.' })
  }

  const db = getDb()
  const existing = db.prepare(`SELECT id FROM academic_stages WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))`).get(name)
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: `توجد مرحلة دراسية بالفعل باسم «${name}».` })
  }

  const maxOrderRow = db.prepare(`SELECT COALESCE(MAX(sort_order), 0) AS max_order FROM academic_stages`).get() as { max_order: number }
  const countRow = db.prepare(`SELECT COUNT(*) AS count FROM academic_stages`).get() as { count: number }

  const stageId = `stage-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
  const colorClass = body?.colorClass || COLOR_PALETTE[countRow.count % COLOR_PALETTE.length] || 'bg-blue-600'
  const description = body?.description?.trim() || null
  const now = new Date().toISOString()

  db.prepare(`
    INSERT INTO academic_stages (id, name, description, color_class, sort_order, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(stageId, name, description, colorClass, Number(maxOrderRow.max_order) + 1, now)

  const grades = Array.isArray(body?.grades) ? body.grades : []
  const insertGrade = db.prepare(`
    INSERT INTO classrooms (id, stage_id, name, description, color_class, sort_order, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  const findGrade = db.prepare(`SELECT id FROM classrooms WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))`)

  let gradeCount = (db.prepare(`SELECT COUNT(*) AS count FROM classrooms`).get() as { count: number }).count
  grades.forEach((rawName, idx) => {
    const gradeName = typeof rawName === 'string' ? rawName.trim() : ''
    if (!gradeName || findGrade.get(gradeName)) return
    const gradeColor = COLOR_PALETTE[gradeCount % COLOR_PALETTE.length] || 'bg-blue-600'
    insertGrade.run(
      `class-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      stageId,
      gradeName,
      null,
      gradeColor,
      idx + 1,
      now
    )
    gradeCount++
  })

  setResponseStatus(event, 201)
  const stage = listStages(db).find(s => s.id === stageId)
  const stageClassrooms = listClassrooms(db).filter(c => c.stageId === stageId)

  return {
    stage,
    classrooms: stageClassrooms
  }
})
