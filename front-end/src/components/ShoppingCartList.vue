<!-- eslint-disable no-unused-vars -->
<script setup>
const props = defineProps({
  cartProducts: Array
})
</script>

<template>
  <div class="product-container" v-for="product in cartProducts" :key="product.id">
    <img :src="product.imageName" alt="" class="product-image" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}</p>
    </div>
    <button class="remove-button">Remove from Cart</button>
  </div>
</template>
