<script setup>
import ShoppingCartList from '@/components/ShoppingCartList.vue'
import { ref, onMounted } from 'vue'
//import { useRoute } from 'vue-router'
import axios from 'axios'
import NotFoundPage from './NotFoundPage.vue'

const cartItems = ref([])
//const route = useRoute()

const fetchCartItems = async () => {
  try {
    const response = await axios.get('/api/users/12345/shopping-cart') // Adjust the URL to your API endpoint
    cartItems.value = response.data
  } catch (error) {
    console.error('Error fetching cart items:', error)
  }
}

onMounted(async () => {
  // Fetch products when the component is mounted
  await fetchCartItems()
  // Access route params
})

const removeFromCart = async (productId) => {
  const response = await axios.delete(`/api/users/12345/shopping-cart/${productId}`)
  const updatedCart = response.data
  cartItems.value = updatedCart
}
</script>

<template>
  <div v-if="cartItems">
    <h1>Shopping Cart Page</h1>
    <div v-if="cartItems.length > 0">
      <ShoppingCartList @remove-from-cart="removeFromCart($event)" :cartProducts="cartItems" />
      <button class="checkout-button">Proceed to checkout</button>
    </div>
    <div v-else>You currently don't have any items in your cart.</div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>
