<template>
    <section class="menu">
        <div class="section-heading">
            <h2 class="section-title restaurant-title">{{ restaurant?.name }}</h2>
            <div class="card-info">
                <div class="rating">
                    {{ restaurant?.stars }}
                </div>
                <div class="price">От {{ restaurant?.price }} ₽</div>
                <div class="category">{{ restaurant?.kitchen }}</div>
            </div>
        </div>

        <div>
            <label for="sort">Сортировка</label>
            <select v-model="sort" name="sort" id="sort">
                <option value=""></option>
                <option value="expensive">Сначала дорогие</option>
                <option value="cheap">Сначала дешевые</option>
            </select>

        </div>

        <div class="cards cards-menu">
            <Dish :item="item" v-for="item in sortedMenu" :key="item.id"/>
        </div>
    </section>
</template>

<script lang="ts">
    import Dish from "~/components/Dish.vue";
    import type { FoodItem } from "~/types/FoodItem";
    import type { Partner } from "~/types/Partner";

    export default defineNuxtComponent({
        name: "Restaurant",
        components: {Dish},
        data() {
            return {
                sort: '',
                restaurant: {} as Partner,
                menu: [] as FoodItem[]
            }
        },
        async mounted() {
            // this part of code was in asyncData, but in nuxt3 optional api doesn't work correctly, so asyncData didn't work the way I expected
            const restaurant = await $fetch(`/api/partner/${this.$route.params.restaurant}`)
            
            const menu = await $fetch(`/api/menu/${restaurant.products}`)
            this.restaurant = restaurant
            this.menu = menu
        },
        computed: {
            sortedMenu() {
                if (this.sort === 'expensive') return this.menu.slice().sort((a, b) => b.price - a.price)
                else if (this.sort === 'cheap') return this.menu.slice().sort((a, b) => a.price - b.price)
                else return this.menu
            }
        }
    })
</script>

<style>
select {
    padding: 4px;
    margin: 8px;
}
</style>