<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div
      v-if="productFind"
      class="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-2xl transition-all"
    >
      <h1 class="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        {{ productFind.product_name }}
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-lg">
        <p>
          <span class="font-semibold text-gray-800">💰 Preço:</span><br />
          R$ {{ productFind.price }}
        </p>
        <p>
          <span class="font-semibold text-gray-800">📦 Quantidade:</span><br />
          {{ productFind.amount }}
        </p>
        <p>
          <span class="font-semibold text-gray-800">🔗 Slug:</span><br />
          {{ productFind.slug }}
        </p>
        <p>
          <span class="font-semibold text-gray-800">🆔 UUID:</span><br />
          {{ productFind.uuid }}
        </p>
      </div>

      <div class="mt-8 text-center">
        <button
          class="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          🛒 Adicionar ao Carrinho
        </button>
      </div>
    </div>

    <div v-else class="flex justify-center items-center h-64">
      <span class="text-gray-500 text-lg animate-pulse"
        >Carregando produto...</span
      >
    </div>
  </div>
</template>

<script setup>
import { useFetch } from "@/composables/useFetch";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.params.id;
const productFind = ref(null);

onMounted(async () => {
  const { data, error } = await useFetch(`/products/${id}`, "GET", undefined);
  productFind.value = data.value.data;
  console.log(productFind);
});
</script>
