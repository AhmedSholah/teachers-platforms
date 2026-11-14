import { getDb, listPayoutMethods } from '../../utils/db'

export default defineEventHandler(() => {
  const db = getDb()
  return {
    methods: listPayoutMethods(db)
  }
})
