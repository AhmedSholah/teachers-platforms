import { getDb, listCourses } from '../utils/db'

export default defineEventHandler(() => {
  const db = getDb()
  return {
    courses: listCourses(db)
  }
})
