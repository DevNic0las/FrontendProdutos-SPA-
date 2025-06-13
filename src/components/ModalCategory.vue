<template>
  <Transition name="fade-scale">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-200">
        <!-- Título e botão de fechar -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold text-gray-800">
            {{ props.isEdit ? "Editar categoria" : "Nova categoria" }}
          </h2>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-red-500 text-xl font-bold transition"
          >
            ×
          </button>
        </div>

        <!-- Formulário de criação -->
        <form v-if="!props.isEdit" @submit.prevent="createCategory">
          <label class="block mb-2 text-sm font-medium text-gray-700">Nome da categoria</label>
          <input
            v-model="categoryName"
            type="text"
            placeholder="Digite o nome"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
          />
          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
          >
            Criar categoria
          </button>
        </form>

        <!-- Formulário de edição -->
        <form v-else @submit.prevent="editCategory">
          <label class="block mb-2 text-sm font-medium text-gray-700">Nome da categoria</label>
          <input
            v-model="categoryEditName"
            type="text"
            placeholder="Digite o novo nome"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
          />
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useFetch } from "@/composables/useFetch";
import { ref } from "vue";

const props = defineProps<{
  isOpen: boolean;
  isEdit: boolean;
  idCategory: number;
}>();
const emit = defineEmits(["close", "submit"]);
const categoryEditName = defineModel<string | null>("categoryEditName");
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
const editCategory = async () => {
  if(categoryEditName.value){
    const { data } = await useFetch(`/category/${props.idCategory}`, "PUT", {
      categorie_name: categoryEditName.value,
    });
    return data
  }

};
</script>
