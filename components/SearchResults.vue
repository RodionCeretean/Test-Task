<template>
        <div class="section-heading">
            <h2 class="section-title">{{ title }}</h2>
        </div>
        <div v-if="notNull" class="cards cards-restaurants">
            <div class="cards cards-menu" :class="{'justifyEvenly': isFew}">
                <slot></slot>
            </div>
        </div>
        <div v-else>
            <NoResults />
        </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';

    export default defineComponent({
        name: "searchResults",
        props: {
            title: {type: String, default: ''},
            isFew: {type: Boolean, default: true},
            notNull: {type: Boolean, default: false},
        },
    })
</script>

<style>
.justifyEvenly {
    justify-content: space-evenly;
}
</style>