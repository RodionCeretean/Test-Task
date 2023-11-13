<template>
    <div class="container">
        <header class="header">
            <NuxtLink to="/" class="logo">
                <img src="img/icon/logo.svg" alt="Logo"/>
            </NuxtLink>
            <label class="address">
                <input :value="deliveryAddress" @input="setDeliveryAddress($event.target.value)" type="text" class="input input-address" placeholder="Адрес доставки"/>
            </label>
            <div class="buttons" style="position: relative">
                <span class="user-name">{{ user }}</span>
                <button v-if="!user && !isLoading" @click="openAuthModal" class="button button-primary button-auth">
                    <span class="button-auth-svg"></span>
                    <span class="button-text">Войти</span>
                </button>
                <button v-if="user" @click="showCart" class="button button-cart" id="cart-button">
                    <span v-if="cartItems" class="badge">{{ cartItems }}</span>
                    <span class="button-cart-svg"></span>
                    <span class="button-text">Корзина</span>
                </button>
                <button v-if="user" @click="logout" class="button button-primary button-out">
                    <span class="button-text">Выйти</span>
                    <span class="button-out-svg"></span>
                </button>
            </div>
        </header>
    </div>
</template>

<script lang="ts">
    import {mapStores} from "pinia";
    import {useCartStore} from "~/store/cartStore";
    import {useAuthStore} from "~/store/authStore";
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: "Header",

        methods: {
            setDeliveryAddress(address: string) {
                this.cartStore.setDeliveryAddress(address)
            },

            logout() {
                this.authStore.user = ''
                this.cartStore.cart = []
            },

            openAuthModal() {
                this.authStore.showAuthModal()
            },

            showCart() {
                this.cartStore.showCart()
            }
        },

        computed: {
            deliveryAddress() {
                return this.cartStore.deliveryAddress
            },

            isLoading() {
                return this.authStore.loading
            },

            user() {
                return this.authStore.user
            },

            cartItems() {
                return this.cartStore.cart.length
            },

            ...mapStores(useCartStore, useAuthStore),
        }
    })
</script>

<style>
.badge {
    background-color: blanchedalmond;
    padding: 0 8px;
    border-radius: 50%;
}
</style>