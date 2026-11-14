import { getDb, listPayoutMethods } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'معرف وسيلة الاستلام غير صحيح.' })
  }

  const db = getDb()
  const method = listPayoutMethods(db).find(m => m.id === id)
  if (!method) {
    throw createError({ statusCode: 404, statusMessage: 'وسيلة الاستلام غير موجودة.' })
  }

  db.prepare(`DELETE FROM payout_methods WHERE id = ?`).run(id)

  // If the deleted method was the default, promote the newest remaining one.
  if (method.isDefault) {
    const remaining = listPayoutMethods(db)
    if (remaining.length > 0) {
      db.prepare(`UPDATE payout_methods SET is_default = 1 WHERE id = ?`).run(remaining[0]!.id)
    }
  }

  return { ok: true }
})
