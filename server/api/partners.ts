import partners from '@/public/db/partners.json'
export default defineEventHandler((event) => {
    return partners
})