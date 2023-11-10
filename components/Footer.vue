<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-block">
                <img src="img/icon/logo.svg" alt="logo" class="logo footer-logo"/>
                <nav class="footer-nav">
                    <NuxtLink v-for="link in links" :key="link" class="footer-link">{{ link }}</NuxtLink>
                </nav>
                <div class="social-links">
                    <NuxtLink v-for="social in socials" :key="social.alt" class="social-link">
                        <img :src="social.image" :alt="social.alt"/>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: "Footer",

        data() {
            return {
                links: ['Ресторанам', 'Курьерам', 'Пресс-центр', 'Контакты'],
                socials: [
                    {
                        image: "img/social/instagram.svg",
                        alt: "instagram"
                    },

                    {
                        image: "img/social/fb.svg",
                        alt: "facebook"
                    },

                    {
                        image: "img/social/vk.svg",
                        alt: "vk"
                    },
                ]
            }
        }
    })
</script>