<script setup>
import logo from '@/assets/images/logo-hexagon.svg'
</script>

<template>
  <div class="nav-bar">
    <div class="logo-wrap">
      <RouterLink to="/products"><img :src="logo" /></RouterLink>
    </div>
    <nav>
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/products" class="nav-link">Products</RouterLink>
      <RouterLink to="/about" class="nav-link">About us</RouterLink>
      <RouterLink to="/contact" class="nav-link">Contact us</RouterLink>
    </nav>
    <RouterLink to="/shopping-cart"><button class="cart-button">Shopping Cart</button></RouterLink>
  </div>
</template>

<style>
.nav-link {
  display: inline-block;
  margin-right: 1rem;
  color: #333;
  text-decoration: none;
  padding: 0.5rem;
}

.nav-link:hover {
  background-color: #f0f0f0;
}

.page-wrap {
  padding-top: 8rem; /* Adjust as needed */
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
}

.logo-wrap img {
  max-width: 200px; /* Adjust as needed */
  max-height: 80px; /* Adjust as needed */
}

.cart-button {
  background-color: #b3292e;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.cart-button:hover {
  background-color: #0056b3;
}
</style>
