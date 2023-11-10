import db from '@/public/db/db.json'
export default defineEventHandler((event) => {
    return db.db
})