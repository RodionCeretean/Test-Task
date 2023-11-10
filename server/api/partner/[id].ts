import db from '@/public/db/db.json'
export default defineEventHandler((event) => {
    const restaurant = event.context.params?.id
    const partner = db.db.partners.find(partner => partner.products.replace(".json", '') === restaurant)
    return partner
  })