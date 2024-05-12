<script setup>
import { products } from '../temp-data'
import ProductsList from '@/components/ProductsList.vue'
</script>

<template>
  <h1>Products Page</h1>
  <ProductsList :products="products" />
</template>
