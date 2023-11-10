import db from '@/public/db/db.json'
import { Database, brand } from '~/types/DB'
export default defineEventHandler((event) => {
    if (event.context.params?.id) {
      const menuTitle: brand = (event.context.params?.id.replace('.json', '') as brand)
      const menu = (db.db as Database)[menuTitle]
      return menu
    }
    return 
  })