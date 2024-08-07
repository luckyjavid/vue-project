<!-- eslint-disable no-unused-vars -->
<script setup>
const props = defineProps({
  cartProducts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="product-container" v-for="product in cartProducts" :key="product.id">
    <img :src="product.imageUrl" alt="" class="product-image" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}</p>
    </div>
    <button @click="$emit('remove-from-cart', product.id)" class="remove-button">
      Remove from Cart
    </button>
  </div>
</template>
