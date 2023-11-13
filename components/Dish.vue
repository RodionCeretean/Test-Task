<template>
    <div class="card" :class="{addedToCart: isAddedToCart}">
        <img :src="item.image" alt="image" class="card-image"/>
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">{{ item.name }}</h3>
            </div>
            <div class="card-info">
                <div class="ingredients">{{ item.description }}</div>
            </div>
            <div class="card-buttons">
                <button v-if="isAuthenticated" :disabled="isAddedToCart" @click="addToCart(item)" class="button button-primary button-add-cart">
                    <span class="button-card-text">{{ isAddedToCart ? 'Добавлено' : 'В корзину' }}</span>
                    <span class="button-cart-svg"></span>
                    <span v-if="spinner" class="loader"></span>
                </button>
                <strong class="card-price-bold">{{ item['price'] }} ₽</strong>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {mapStores} from "pinia";
    import {useCartStore} from "~/store/cartStore";
    import {defineComponent} from 'vue'
    import type { PropType } from "vue";
    import type { FoodItem } from "~/types/FoodItem";
    import {useAuthStore} from "~/store/authStore";

    export default defineComponent({
        name: 'Dish',

        mounted() {
            this.isAddedToCart = this.cartStore.cart.find(item => item.id === this.item.id)?.added === true
        },

        props: {
            item: {
                type: Object as PropType<FoodItem>,
                default: {}
            }
        },

        data() {
            return {
                isAddedToCart: false,
                spinner: false
            }
        },

        methods: {
            addToCart(item: {
                "id": string,
                "name": string,
                "description": string,
                "price": number,
                "image": string
            }): void {
                this.isAddedToCart = true
                this.spinner = true
                setTimeout(() => this.spinner = false,500)
                this.cartStore.addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    counter: 1,
                    added: true
                })
            }
        },

        computed: {
            isAuthenticated() {
                return this.authStore.user
            },

            ...mapStores(useCartStore, useAuthStore),
        },

        watch: {
            'cartStore.cart': {
                deep: true,
                handler(value) {
                    if (!value.length) this.isAddedToCart = false
                    else {
                        if (!this.cartStore.cart.find(item => item.id === this.item.id)) this.isAddedToCart = false
                    }
                }
            }
        }
    })
</script>

<style>
.addedToCart {
    filter: brightness(50%);
}

.loader {
    width: 20px;
    height: 20px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>