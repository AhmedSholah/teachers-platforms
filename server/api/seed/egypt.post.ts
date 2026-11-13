import { getDb, listClassrooms, listCourses, listStages, seedEgyptData } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ includeCourses?: boolean }>(event).catch(() => ({}))
  const db = getDb()
  seedEgyptData(db, { includeCourses: body?.includeCourses ?? true })

  return {
    stages: listStages(db),
    classrooms: listClassrooms(db),
    courses: listCourses(db)
  }
})
