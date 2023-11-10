import {defineStore} from 'pinia'

export const useCartStore = defineStore('cart', {
    state() {
        return {
            cart: [] as { id: string, name: string, price: number, counter: number, added?: boolean }[],
            modal: false
        }
    },

    getters: {
        sum(): number {
            return this.cart.reduce((acc, val) => {
                return acc + (val.price * val.counter)
            }, 0)
        }
    },

    actions: {
        addItem(payload: { id: string, name: string, price: number, counter: number, added?: boolean }): void {
            this.cart.push(payload)
        },

        increase(id: string) {
            const currentItem = this.cart.find(item => item.id === id)
            if (currentItem) currentItem.counter++
        },

        decrease(id: string) {
            const currentItem = this.cart.find(item => item.id === id)
            if (currentItem) currentItem.counter--
        },

        showCart() {
            this.modal = true
        },

        hideCart() {
            this.modal = false
        }
    },
})