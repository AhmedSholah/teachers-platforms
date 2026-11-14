import { getDb, listPayoutMethods } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    type?: 'wallet' | 'instapay'
    phone?: string
    phoneConfirm?: string
    isDefault?: boolean
  }>(event)

  const type = body?.type
  if (!type || !['wallet', 'instapay'].includes(type)) {
    throw createError({ statusCode: 400, statusMessage: 'نوع وسيلة الاستلام غير صحيح.' })
  }

  const phone = body?.phone?.replace(/\s+/g, '')
  const phoneConfirm = body?.phoneConfirm?.replace(/\s+/g, '')

  if (!phone || !/^01[0-9]{9}$/.test(phone)) {
    throw createError({ statusCode: 400, statusMessage: 'يرجى إدخال رقم موبايل صحيح مكوّن من 11 رقم يبدأ بـ 01.' })
  }

  if (!phoneConfirm) {
    throw createError({ statusCode: 400, statusMessage: 'يرجى تأكيد الرقم مرة أخرى.' })
  }

  if (phone !== phoneConfirm) {
    throw createError({ statusCode: 400, statusMessage: 'الرقمان غير متطابقين، يرجى التأكد من الرقم.' })
  }

  const db = getDb()
  const countRow = db.prepare(`SELECT COUNT(*) AS count FROM payout_methods`).get() as { count: number }
  const makeDefault = countRow.count === 0 || body?.isDefault === true

  if (makeDefault && countRow.count > 0) {
    db.prepare(`UPDATE payout_methods SET is_default = 0`).run()
  }

  const result = db.prepare(`
    INSERT INTO payout_methods (type, account_name, phone, is_default, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    type,
    phone,
    phone,
    makeDefault ? 1 : 0,
    new Date().toISOString()
  )

  setResponseStatus(event, 201)
  const newId = Number(result.lastInsertRowid)
  const method = listPayoutMethods(db).find(m => m.id === newId)
  return { method }
})
