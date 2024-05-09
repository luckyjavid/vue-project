<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <div class="page-wrap"> 
    <HelloWorld msg="Two Trees Olive Oil" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/products">Products</RouterLink>
        <RouterLink to="/shopping-cart">Shopping Cart</RouterLink>
        <RouterLink to="/about">About us</RouterLink>
        <RouterLink to="/contact">Contact us</RouterLink>
      </nav>
    <RouterView />
  </div>
  
</template>
