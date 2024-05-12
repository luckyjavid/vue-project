<script setup>
import ShoppingCartList from '@/components/ShoppingCartList.vue'
import { cartItems } from '../temp-data'
</script>

<template>
  <div>
    <h1>Shopping Cart Page</h1>
    <div v-if="cartItems.length > 0">
      <ShoppingCartList :cartProducts="cartItems" />
      <button class="checkout-button">Proceed to checkout</button>
    </div>
    <div v-else>You currently don't have any items in your cart.</div>
  </div>
</template>
