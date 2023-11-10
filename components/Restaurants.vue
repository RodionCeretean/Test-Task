<template>
    <section class="restaurants">
        <div class="section-heading">
            <h2 class="section-title">{{ search ? 'Поиск по ресторанам' : 'Рестораны'}}</h2>
            <label class="search">
                <input v-model="search" type="text" class="input input-search" placeholder="Поиск блюд и ресторанов"/>
            </label>
        </div>
        <div v-if="searching?.length" class="cards cards-restaurants" :class="{'justifyEvenly': searching.length < 3}">
            <Restaurant
                :partner="partner"
                v-for="partner in searching"
                :key="partner.name"
                class="card card-restaurant"
            />
        </div>
        <div v-else>
            <NoResults />
        </div>
    </section>
    <section v-if="search" class="restaurants">
        <SearchResults title="Поиск по блюдам" :isFew="dishesSearch.length < 3" :notNull="!!dishesSearch.length">
            <Dish :item="item" v-for="item in dishesSearch"/>
        </SearchResults>
        <SearchResults title="Поиск по ингридиентам" :isFew="ingredientsSearch.length < 3" :notNull="!!ingredientsSearch.length">
            <Dish :item="item" v-for="item in ingredientsSearch"/>
        </SearchResults>
    </section>
</template>

<script lang="ts">
    import { type Partner }  from "@/types/Partner"
    import { type Database, type brand }  from "@/types/DB"
    import { type FoodItem }  from "@/types/FoodItem"
    import Restaurant from "~/components/Restaurant.vue";
    import {defineComponent} from 'vue';
    import type { PropType } from "vue";

    export default defineComponent({
        name: "restaurants",
        components: {Restaurant},

        props: {
            db: {
                type: Object as PropType<Database>
            },
            partners: {
                type: Array as PropType<Partner[]>
            }
        },

        data() {
            return {
                search: ''
            }
        },

        computed: {
            searching() {
                if (this.search) return (this.partners as Partner[]).filter(restaurant => restaurant.name.toLowerCase().startsWith(this.search.toLowerCase()))
                else return this.partners
            },

            dishesSearch() {
                const result: FoodItem[] = []
                Object.keys(this.db as Database).forEach(item => {
                    if (item !== 'partners') {
                        ((this.db as Database)[item as brand]).forEach(dish => {
                            if (dish.name.toLowerCase().startsWith(this.search.toLowerCase())) result.push(dish)
                        })
                    }
                })
                return result
            },
            
            ingredientsSearch() {
                const result: FoodItem[] = []
                Object.keys(this.db as Database).forEach(item => {
                    if (item !== 'partners') {
                        ((this.db as Database)[item as brand] as FoodItem[]).forEach(dish => {
                            const dishDescriptionWords = dish.description.split(/\s/).filter(word => word.replace('.', '').length > 2)
                            if (dishDescriptionWords.some(word => word.toLowerCase().startsWith(this.search.toLowerCase()))) result.push(dish)
                        })
                    }
                })
                return result
            }
        }
    })
</script>

<style>
.justifyEvenly {
    justify-content: space-evenly;
}
</style>