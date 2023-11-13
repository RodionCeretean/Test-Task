import {defineStore} from 'pinia'

export const useCartStore = defineStore('cart', {
    state() {
        return {
            cart: [] as { id: string, name: string, price: number, counter: number, added?: boolean }[],
            modal: false,
            deliveryAddress: ''
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
        setDeliveryAddress(payload: string) {
            this.deliveryAddress = payload
        },

        addItem(payload: { id: string, name: string, price: number, counter: number, added?: boolean }): void {
            this.cart.push(payload)
        },

        increase(id: string) {
            const currentItem = this.cart.find(item => item.id === id)
            if (currentItem) currentItem.counter++
        },

        decrease(id: string) {
            const currentItem = this.cart.find(item => item.id === id)
            if (currentItem && currentItem.counter === 1) this.cart = this.cart.filter(item => item.id !== id)
            else {
                if (currentItem) currentItem.counter--
            }
        },

        showCart() {
            this.modal = true
        },

        hideCart() {
            this.modal = false
        }
    },
})