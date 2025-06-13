<template>
  <Modal
    :isOpen="showModal"
    :isEdit="true"
    @close="showModal = false"
    :id="props.id"
    :categoryName="props.categoryName"
  />

  <div class="p-6 space-y-4">
    <!-- Cabeçalho -->
    <div class="grid grid-cols-6 items-center bg-gray-100 rounded-lg px-4 py-3 font-semibold text-gray-700 shadow-sm">
      <span>Produto</span>
      <span>Slug</span>
      <span>Preço</span>
      <span>Estoque</span>
      <span>Categoria</span>
      <span class="text-center">Ações</span>
    </div>

    <div
      class="grid grid-cols-6 items-center bg-white rounded-xl shadow p-4 hover:shadow-lg transition duration-200 border border-gray-100"
    >
      <span class="text-gray-900 font-medium">{{ product_name }}</span>
      <span class="text-gray-500 text-sm truncate">{{ slug }}</span>
      <span class="text-green-600 font-semibold">R$ {{ price }}</span>
      <span class="text-gray-700 font-medium">{{ amount }}</span>
      <span class="text-indigo-600 font-semibold">{{ categoryName }}</span>
      <div class="flex justify-center gap-2">
        <GroupButtons @delete="listenEmit" @uptade="listenEmit" @show="listenEmit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import GroupButtons from "./GroupButtons.vue";
import { useFetch } from "@/composables/useFetch";
import Modal from "./Modal.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
const showModal = ref(false);
const router = useRouter();
const props = defineProps({
  product_name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  categoryName:{
    type: String,
    required: true
  }
});
const { product_name, slug, price, amount, id,categoryName } = props;

const deleteProduct = async () => {
  const { data, error } = await useFetch(
    `/products/${id}`,
    "DELETE",
    undefined
  );
  console.log(data.value);
  return data.value;
};

const listenEmit = async (message: string) => {
  if (message === "remove") {
    return await deleteProduct();
  }
  if (message === "update") {
    showModal.value = true;
  }
  if(message==="show"){
   return router.push(`/view/product/${id}`)
  }
  console.log(message);
};
</script>
