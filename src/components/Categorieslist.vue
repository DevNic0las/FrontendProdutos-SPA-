<template>
  <!-- Modal de edição de categoria -->
  <ModalCategory
    :isOpen="isOpen"
    :isEdit="true"
    :idCategory="categoryId"
    v-model:categoryEditName="categoryEditName"
    @close="close"
  />

  <div
    v-if="categoryName"
    class="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-200 hover:shadow-lg transition duration-300"
  >
    <h2 class="text-xl font-semibold text-gray-800 mb-2">
      {{ categoryName }}
    </h2>
    <GroupButtons
      @uptade="listenEmits"
      @delete="listenEmits"
      :isCategoryClass="false"
    />
  </div>

  <!-- Sem categoria -->
  <div v-else class="text-gray-500 italic text-center py-4">
    Nenhuma categoria encontrada.
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import GroupButtons from './GroupButtons.vue';
import ModalCategory from './ModalCategory.vue';
import { ref } from 'vue';
const isOpen = ref<boolean>(false);
const categoryEditName = ref<string|null>(null);
const props = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
  categoryName:{
    type: String,
    required: true
  }
});
const { categoryId, categoryName } = props;
console.log(categoryName);

const listenEmits = async (message:string)=>{
if(message==="update"){
isOpen.value = true;
} if(message==="remove"){
  await useFetch(`/category/${categoryId}`, "DELETE", undefined)
}
}
function close(){
  isOpen.value = false
}
</script>
