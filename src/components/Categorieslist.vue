<template>
  <div
    class="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 hover:shadow-lg transition duration-300"
    v-if="category"
    >
    <h2 class="text-lg font-semibold text-gray-800">
      {{ category?.categorie_name }}
    </h2>
    <GroupButtons @uptade="listenEmits" @delete="listenEmits" :isCategoryClass="false"/>
  </div>
  <div v-else>
    Nenhuma categoria
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import GroupButtons from './GroupButtons.vue';

const props = defineProps({
  category: {
    type: Array,
    required: true,
  },
});
const { category } = props;
const listenEmits = async (message:any)=>{
if(message==="update"){
await useFetch(`/category/${category?.id}`, "PUT", {categorie_name: categorie_name.value})
}
await useFetch(`/category/${category?.id}`, "DELETE", undefined)
}
</script>
