<template>
    <Head>
        <Title>{{ metaTitle }}</Title>
    </Head>
    <div>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </div>
</template>

<script lang="ts">
    import db from 'public/db/db.json'
    import {mapStores} from "pinia";
    import {useAuthStore} from "~/store/authStore";
    import {useCartStore} from "~/store/cartStore";

    export default defineNuxtComponent({
        // head() {
        //     return {
        //         title: this.metaTitle
        //     }
        // },

        mounted() {
            window.addEventListener('beforeunload', event => {
                event.preventDefault()
                if (this.cartStore.cart.length) event.returnValue = ''
                else return
            })

            if (localStorage.getItem('user')) this.authStore.user = localStorage.getItem('user')
            this.authStore.loading = false
        },

        data() {
          return {
              titl: 'The first',
              db: db.db
          }
        },

        computed: {
            metaTitle() {
                const currentTitle = this.db['partners'].filter(partner => partner['products'].replace('.json', '') === this.$route['params'].restaurant)[0]
                return currentTitle ? `${currentTitle.name} — доставка еды на дом` : 'Delivery Food — доставка еды на дом'
            },

            ...mapStores(useAuthStore, useCartStore),
        },

        watch: {
            'authStore.user'(newValue) {
                newValue ? localStorage.setItem('user', newValue) : localStorage.removeItem('user')
            }
        }
    })
</script>