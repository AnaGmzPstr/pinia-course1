<script setup>
import TheHeader from "@/components/TheHeader.vue";

import ProductCard from "@/components/ProductCard.vue";

//import products from "@/data/products.json";

import { useProductStore } from "./stores/ProductStores.js";
import { useCartStore } from "./stores/CartStore.js";

import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";

//const {products} = storeToRefs(useProductStore());
const productStore = useProductStore();
const cartStore = useCartStore();

const history = reactive([])
const doingHistory = ref(false)
history.push(JSON.stringify(cartStore.$state));

const redo = () => {
  const latestState = future.pop()
  if (!latestState) return;
  doingHistory.value = true;
  history.push(latestState)
  cartStore.$state = JSON.parse(latestState)
  doingHistory.value = false;
}

cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
    //future.splice(0,future.length)
    //no podem resetejar a zero ja que perdriem la reactivitat
  }
})


productStore.fill()

/* const addToCart = (count, product) => {
  count=parseInt(count)
  for (let index = 0; index < count; index++) {
    cartStore.items.push(product);
  }
} */

// ho podem agrupar amb
const addToCart = (count, product) => {
  count = parseInt(count)
  cartStore.$patch(state => {
    for (let index = 0; index < count; index++) {
      state.items.push(product);
    }
  })
}

//rebrà una callback function que rebrà unes opcions
//name: nom de l'acció
//store instace en el nostre cas cartStore
//args : arguments passats a l'action que son count i product
//també afegim un after hook que permet executar qualsevol
//Cosa després que l'acció retorni i resolgui,
//onError hook per saber quan passa una excepció o falla i fer nosaltres alguna acció
cartStore.$onAction(({
  name,
  store,
  args,
  after,
  onError
}) => {
  if (name === 'addItems') {
    after(() => {
      console.log(args[0])
    });
    onError((error) => {
      console.log("Hello error:", error.message);
    });

  }
})

//useProductStore();

// Subscriure's a un estat
cartStore.$subscribe((mutation, state) => {
  console.log({ mutation })
  console.log({ state })
})

const undo = () => {
  if (history.length === 1) return
  doingHistory.value = true
  history.pop()
  cartStore.$state = JSON.parse(history.at(-1))
  doingHistory.value = false
}
cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
  }
})




</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>

    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItems($event, product)" />
    </ul>
  </div>
</template>
