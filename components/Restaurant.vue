<template>
    <NuxtLink :to="getNuxtLink(partner['products'])">
        <img :src="partner.image" alt="image" class="card-image"/>
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title">{{ partner.name }}</h3>
                <span class="card-tag tag">{{ partner['time_of_delivery'] }} мин</span>
            </div>
            <div class="card-info">
                <div class="rating">
                    {{ partner.stars }}
                </div>
                <div class="price">От {{ partner['price'] }} ₽</div>
                <div class="category">{{ partner['kitchen'] }}</div>
            </div>
        </div>
    </NuxtLink>
</template>

<script lang="ts">
    import type { PropType } from 'vue';
    import {defineComponent} from 'vue'
    import type { Partner } from '~/types/Partner';

    export default defineComponent({
        name: 'Restaurant',

        props: {
            partner: {
                type: Object as PropType<Partner>,
                default: {}
            }
        },

        methods: {
            getNuxtLink(link: string): string {
                return link.replace('.json', '')
            }
        },
    })
</script>