<script setup>
  import { cartItems } from '../temp-data'; // Corrected the variable name to cartItems
</script>

<template>
  <div>
    <h1>Shopping Cart Page</h1>
    <div v-if="cartItems.length > 0">
      <div class="product-container" v-for="product in cartItems" :key="product.id">
        <img :src="product.imageName" alt="" class="product-image">
        <div class="details-wrap">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}</p>
        </div>
        <button class="remove-button">Remove from Cart</button>
      </div>
      <button class="checkout-button">Proceed to checkout</button>
    </div>
    <div v-else>
      You currently don't have any items in your cart.
    </div>
  </div>
</template>
