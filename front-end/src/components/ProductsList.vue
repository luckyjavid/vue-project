<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  products: Array
})
</script>

<template>
  <div class="grid-wrap">
    <div class="product-item" v-for="product in products" :key="product.id">
      <img :src="product.imageName" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <RouterLink :to="'/products/' + product.id"><button>View Details</button></RouterLink>
    </div>
  </div>
</template>
