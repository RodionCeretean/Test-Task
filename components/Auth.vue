<template>
    <Modal @closeModal="closeModal" auth>
        <button @click="closeModal" class="close-auth">&times;</button>
        <form @submit.prevent="login" id="logInForm">
            <fieldset class="modal-body">
                <legend class="modal-title">Авторизация</legend>
                <label class="label-auth">
                    <span>Логин</span>
                    <input
                        @input="name.valid !== null ? validate() : ''"
                        :class="{invalid: name.valid === false}"
                        v-model="name.value"
                        id="login"
                        type="text"
                    >
                    <span v-if="name.valid === false" class="error">Поле заполнено неверно</span>
                </label>
                <label class="label-auth">
                    <span>Пароль</span>
                    <input
                        @input="password.valid !== null ? validate() : ''"
                        :class="{invalid: password.valid === false}"
                        v-model="password.value"
                        id="password"
                        type="password"
                    >
                    <span v-if="password.valid === false" class="error">Поле заполнено неверно</span>
                </label>
            </fieldset>
            <div class="modal-footer">
                <div class="footer-buttons">
                    <button class="button button-primary button-login" type="submit">Войти</button>
                </div>
            </div>
        </form>
    </Modal>
</template>

<script lang="ts">
    import Modal from "~/layouts/Modal.vue";
    import {mapStores} from "pinia";
    import {useAuthStore} from "~/store/authStore";
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: 'Auth',
        components: {Modal},

        data() {
            return {
                name: {
                    value: '',
                    valid: null as null | boolean
                },
                password: {
                    value: '',
                    valid: null as null | boolean
                }
            }
        },

        methods: {
            closeModal() {
                this.authStore.hideAuthModal()
            },

            validate() {
                if (this.name.value.length < 1) this.name.valid = false
                else this.name.valid = true

                if (this.password.value.length < 6) this.password.valid = false
                else this.password.valid = true
            },

            login() {
                this.validate()
                if (this.name.valid && this.password.valid) {
                    this.authStore.user = this.name.value
                    this.name = {value: '', valid: null}
                    this.password = {value: '', valid: null}
                    this.authStore.hideAuthModal()
                }
            }
        },

        computed: {
            ...mapStores(useAuthStore),
        }
    })
</script>

<style scoped>
.error {
    color: rgba(255, 0, 0, 0.5);
    position: absolute;
    left: 80px;
    bottom: -21px;
    width: 100%;
    font-size: 14px;
}

.invalid, .invalid:focus, .invalid:active {
    color: rgba(255, 0, 0, 0.5);
    border: 2px solid rgba(255, 0, 0, 0.5);
    outline: none;
    box-shadow: none;
}
</style>