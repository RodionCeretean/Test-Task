<template>
    <div @click="closeModal" :class="rootDivClasses">
        <div @click.stop class="modal-dialog" :class="{'modal-dialog-auth': auth}">
            <slot></slot>
            <template v-if="$slots.header">
                <div class="modal-header">
                    <slot name="header"></slot>
                </div>
            </template>
            <template v-if="$slots.body">
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
            </template>
            <template v-if="$slots.footer">
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import {mapStores} from "pinia";
    import {useAuthStore} from "~/store/authStore";
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: "Modal",
        emits: ['closeModal'],
        props: {
            auth: {
                Boolean,
                default() {
                    return false
                }
            }
        },

        methods: {
            closeModal() {
                this.$emit('closeModal')
            }
        },

        computed: {
            ...mapStores(useAuthStore),

            rootDivClasses(): string {
                return this.auth ? 'modal-auth' : 'modal modal-cart'
            }
        }
    })
</script>