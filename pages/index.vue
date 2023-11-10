<template>
    <Promo/>
    <Restaurants :db="db" :partners="partners"/>
</template>

<script lang="ts">
    import { type Partner }  from "@/types/Partner"
    import { type Database }  from "@/types/DB"
    import Restaurants from "../components/Restaurants.vue";
    import Promo from "../components/Promo.vue";

    export default defineNuxtComponent({
        name: "index",
        components: {Restaurants, Promo},
        head: {
            title: ''
        },
        async asyncData() {
            const data = await $fetch('/api/db')
            const db: Database = {...data} 

            const partnersData = await $fetch('/api/partners')
            const partners: Partner[] = [...partnersData]
            return {
                db,
                partners
            }
        },
        data() {
            return {
                db: {} as Database,
                partners: [] as Partner[]
            }
        }
    })
</script>