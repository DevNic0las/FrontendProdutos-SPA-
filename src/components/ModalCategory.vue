<template>
  <Transition name="fade-scale">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-700">Criar Categoria</h2>
          <button
            @click="$emit('close')"
            class="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form @submit.prevent="createCategory">
          <input
            v-model="categoryName"
            type="text"
            placeholder="Nome da categoria"
            class="w-full px-4 py-2 border rounded-lg mb-4"
          />
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Criar
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useFetch } from "@/composables/useFetch";
import { ref } from "vue";

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close", "submit"]);
const categoryName = ref("");

function handleSubmit() {
  emit("submit", categoryName.value);
  categoryName.value = "";
  emit("close");
}
const createCategory = async () => {
  const { data } = await useFetch("/category", "POST", {
    categorie_name: categoryName.value,
  });
  emit("close");
  alert("Categoria criada");
};
</script>
