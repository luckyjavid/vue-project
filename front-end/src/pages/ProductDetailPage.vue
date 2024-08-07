<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import NotFoundPage from './NotFoundPage.vue'

const productId = ref(null)
const products = ref([]) // Define products as a reactive reference
const route = useRoute()

// Fetch products data from API
const fetchProducts = async () => {
  try {
    const response = await axios.get('/api/products') // Adjust the URL to your API endpoint
    products.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

onMounted(async () => {
  // Fetch products when the component is mounted
  await fetchProducts()
  // Access route params
  productId.value = route.params.productId
})

// Use computed property for productDetail
const productDetail = computed(() => {
  if (!productId.value) return null
  return products.value.find((product) => product.id === productId.value)
})

// Define addToCart function
const addToCart = async () => {
  if (productDetail.value) {
    try {
      const userId = '12345' // Replace with the actual user ID
      const response = await axios.post(`/api/users/${userId}/shopping-cart`, {
        id: productId.value
      })
      alert('Item added to cart!')
      console.log('Updated cart:', response.data)
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add item to cart.')
    }
  }
}
</script>

<template>
  <div v-if="productDetail">
    <h1>Product Detail Page</h1>
    <div class="img-wrap">
      <img :src="productDetail.imageUrl" alt="Product Image" />
    </div>
    <div class="product-details">
      <h2>{{ productDetail.name }}</h2>
      <h3 class="price">Price: {{ productDetail.price }}</h3>
      <button class="add-to-cart" @click="addToCart">Add to Cart</button>
    </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>
