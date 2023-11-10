<template>
    <Auth v-if="authModal"></Auth>
    <Cart v-if="showCart"></Cart>
    <Header/>
    <main class="main">
        <div class="container">
            <slot></slot>
        </div>
    </main>
    <Footer/>
</template>

<script lang="ts">
    import Header from "../components/Header.vue";
    import Footer from "../components/Footer.vue";
    import Cart from "~/components/Cart.vue";
    import Auth from "~/components/Auth.vue";
    import {mapStores} from "pinia";
    import {useCartStore} from "~/store/cartStore";
    import {useAuthStore} from "~/store/authStore";
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: "default",
        components: {Header, Footer, Cart, Auth},

        computed: {
            ...mapStores(useCartStore, useAuthStore),

            authModal() {
                return this.authStore.modal
            },

            showCart(): boolean {
                return this.cartStore.modal
            }
        }
    })
</script>