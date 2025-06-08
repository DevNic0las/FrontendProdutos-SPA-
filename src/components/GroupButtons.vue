<template>
  <div class="flex space-x-2">
    <button
      @click="uptadeProduct"
      class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
    >
      Editar
    </button>
    <button
      @click="deleteProduct"
      class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
      Deletar
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["delete", "uptade"]);
const uptadeProduct = ()=>{
    emit("uptade", "update")
}
const deleteProduct = ()=>{
    emit("delete", "remove")
}
</script>
