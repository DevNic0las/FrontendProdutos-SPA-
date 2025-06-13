<script setup lang="ts">
import ProductForm from "./ProductForm.vue";
import { reactive } from "vue";

const props = defineProps({
  isOpen: Boolean,
  isEdit: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    required: false,
  },
  category: {
    type: Array,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  isCreateCategory: {
    type: Boolean,
    default: false
  }
});
console.log(props.id);

console.log(props.category);

const emit = defineEmits(["close"]);

function confirmarAcao() {
  console.log("Confirmado!");
  emit("close");
}
const formData = reactive({
  product_name: "",
  price: "",
  amount: null,
  categories_id: 0,
});
</script>
<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <Transition name="fade-scale">
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-6 transition-all"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-semibold text-gray-800" >
            {{ props.isEdit ? "Editar Produto" : "Criar Produto"  }}
          </h2 class="text-2xl font-semibold text-gray-800">
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div>
          <ProductForm
            v-model:product_name="formData.product_name"
            v-model:price="formData.price"
            v-model:amount="formData.amount"
            v-model:categories_id="formData.categories_id"
            :categoryName="props.categoryName"
            :isEdit="props.isEdit"
            :category="props.category"
            :id="props.id"
            @close="$emit('close')"
          />
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t">
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            @click="confirmarAcao"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
