import { getDb, listClassrooms, listCourses, listStages } from '../utils/db'

export default defineEventHandler(() => {
  const db = getDb()
  return {
    stages: listStages(db),
    classrooms: listClassrooms(db),
    courses: listCourses(db)
  }
})
