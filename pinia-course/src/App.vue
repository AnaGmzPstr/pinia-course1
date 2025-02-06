<script setup>
import TheHeader from "@/components/TheHeader.vue";

import ProductCard from "@/components/ProductCard.vue";

//import products from "@/data/products.json";

import {useProductStore} from "./stores/ProductStores.js";
import {useCartStore} from "./stores/CartStore.js";

import { storeToRefs } from "pinia";

//const {products} = storeToRefs(useProductStore());
const productStore = useProductStore();
const cartStore = useCartStore();

productStore.fill()

/* const addToCart = (count, product) => {
  count=parseInt(count)
  for (let index = 0; index < count; index++) {
    cartStore.items.push(product);
  }
} */

// ho podem agrupar amb
const addToCart = (count, product) => {
  count=parseInt(count)
  cartStore.$patch(state=>{
    for (let index = 0; index < count; index++) {
      state.items.push(product);
    }
  })
} 



//useProductStore();
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
