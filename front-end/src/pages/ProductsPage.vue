<script setup>
//import { products } from '../temp-data'
import { ref, onMounted } from 'vue'
import ProductsList from '@/components/ProductsList.vue'
import axios from 'axios'

const products = ref([])

const fetchProducts = async () => {
  try {
    const response = await axios.get('/api/products') // Adjust the URL to your API endpoint
    products.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

onMounted(async () => {
  try {
    await fetchProducts()
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>

<template>
  <h1>Products Page</h1>
  <ProductsList :products="products" />
</template>
