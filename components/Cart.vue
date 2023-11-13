<template>
    <Modal v-if="items.length" @closeModal="closeModal">
        <template #header>
            <h3 class="modal-title">Корзина</h3>
            <button @click="closeModal" class="close">&times;</button>
        </template>
        <template #body>
            <div v-for="item in items" :key="item.id" class="food-row">
                <span class="food-name">{{ item.name }}</span>
                <strong class="food-price">{{ item.price }} ₽</strong>
                <div class="food-counter">
                    <button :disabled="item.counter < 1" @click="decrease(item.id)" class="counter-button">-</button>
                    <span class="counter">{{ item.counter }}</span>
                    <button @click="increase(item.id)" class="counter-button">+</button>
                </div>
            </div>
            <p v-if="invalidAddress" class="invalidAddress">Адрес доставки не введён</p>
        </template>
        <template #footer>
            <span class="modal-pricetag">{{ sumPrice }} ₽</span>
            <div class="footer-buttons">
                <button @click="placeOrder" class="button button-primary">Оформить заказ</button>
                <button @click="cancelOrder" class="button clear-cart">Отмена</button>
            </div>
        </template>
    </Modal>
    <Modal v-else @closeModal="closeModal">
        <template #header>
            <h3 class="modal-title">Корзина</h3>
            <button @click="closeModal" class="close">&times;</button>
        </template>
        <template #body>
            <span>{{ cartMessage }}</span>
        </template>
    </Modal>
</template>

<script lang="ts">
    import Modal from "../layouts/Modal.vue";
    import {mapStores} from "pinia";
    import {useCartStore} from "~/store/cartStore";
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: 'Cart',
        components: {Modal},

        data() {
            return {
                invalidAddress: false,
                orderReceived: false
            }
        },

        methods: {
            placeOrder() {
                if (this.cartStore.deliveryAddress.length) {
                    this.cartStore.cart = []
                    this.orderReceived = true
                    this.cartStore.deliveryAddress = ''
                } else {
                    this.invalidAddress = true
                }
            },

            cancelOrder() {
                this.cartStore.cart = []
                this.orderReceived = false
            },

            closeModal() {
                this.cartStore.hideCart()
                this.orderReceived = false
            },

            decrease(id: string) {
                this.cartStore.decrease(id)
            },

            increase(id: string) {
                this.cartStore.increase(id)
            }
        },

        computed: {
            cartMessage(): string {
                return this.orderReceived ? 'Заказ оформлен' : 'Корзина пуста'
            },

            sumPrice() {
                return this.cartStore.sum
            },

            items() {
                return this.cartStore.cart
            },

            ...mapStores(useCartStore),
        }
    })
</script>
<style>
.invalidAddress {
    color: red;
    text-align: center;
}
</style>