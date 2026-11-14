import { getDb, listPayoutMethods } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'معرف وسيلة الاستلام غير صحيح.' })
  }

  const body = await readBody<{ isDefault?: boolean }>(event)

  const db = getDb()
  const method = listPayoutMethods(db).find(m => m.id === id)
  if (!method) {
    throw createError({ statusCode: 404, statusMessage: 'وسيلة الاستلام غير موجودة.' })
  }

  if (body?.isDefault === true) {
    db.prepare(`UPDATE payout_methods SET is_default = 0`).run()
    db.prepare(`UPDATE payout_methods SET is_default = 1 WHERE id = ?`).run(id)
  }

  return { method: listPayoutMethods(db).find(m => m.id === id) }
})
