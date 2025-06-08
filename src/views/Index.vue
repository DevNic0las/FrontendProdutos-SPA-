<template>
  <div>
    <Modal :isOpen="showModal" @close="showModal = false" />
    <button @click="showModal = true">Criar</button>
  </div>
  <div>
    <Products
      v-for="item in arrayListProducts"
      :key="item.id"
      :product_name="item.product_name"
      :slug="item.slug"
      :price="item.price"
      :amount="item.amount"
      :id="item.id"
    />
  </div>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import Products from "@/components/Products.vue";
import { useFetch } from "@/composables/useFetch";
import { onMounted, ref } from "vue";
const showModal = ref<boolean>(false);
const arrayListProducts = ref();
onMounted(async () => {
  const { data, error } = await useFetch("/products", "GET", undefined);
  arrayListProducts.value = data.value?.data;
  console.log(arrayListProducts.value);
});
</script>
