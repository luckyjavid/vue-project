<script setup>
import { products } from '../temp-data'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NotFoundPage from './NotFoundPage.vue'

const productId = ref(null)
const route = useRoute()

onMounted(() => {
  // Access route params in beforeRouteEnter guard
  productId.value = route.params.productId
})

// Use computed property for productDetail
const productDetail = computed(() => {
  if (!productId.value) return null
  return products.find((product) => product.id === productId.value)
})
</script>

<template>
  <div v-if="productDetail">
    <h1>Product Detail Page</h1>
    <div class="img-wrap">
      <img v-if="productDetail" :src="productDetail.imageName" alt="" />
    </div>
    <div v-if="productDetail">
      <div class="product-details">
        <h2>{{ productDetail.name }}</h2>
        <h3 class="price">Price: {{ productDetail.price }}</h3>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
    <div v-else>
      <p>Product Not found</p>
    </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>
