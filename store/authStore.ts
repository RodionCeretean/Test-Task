import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            user: '' as string | null,
            modal: false,
            loading: true
        }
    },

    actions: {
        showAuthModal() {
            this.modal = true
        },

        hideAuthModal() {
            this.modal = false
        }
    }
})