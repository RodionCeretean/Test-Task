<template>
    <div>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </div>
</template>

<script lang="ts">
    import {mapStores} from "pinia";
    import {useAuthStore} from "~/store/authStore";
    import {useCartStore} from "~/store/cartStore";

    export default defineNuxtComponent({
        mounted() {
            window.addEventListener('beforeunload', event => {
                event.preventDefault()
                if (this.cartStore.cart.length) event.returnValue = ''
                else return
            })

            if (localStorage.getItem('user')) this.authStore.user = localStorage.getItem('user')
            this.authStore.loading = false
        },

        computed: {
            ...mapStores(useAuthStore, useCartStore),
        },

        watch: {
            'authStore.user'(newValue) {
                newValue ? localStorage.setItem('user', newValue) : localStorage.removeItem('user')
            }
        }
    })
</script>