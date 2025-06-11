<template>
  <Modal :isOpen="showModal" :isEdit="true" @close="showModal = false" :id="props.id" />

   <div class="p-6 space-y-2">
    <!-- Cabeçalho -->
    <div class="grid grid-cols-5 font-semibold text-gray-700 border-b pb-2">
      <span>Produto</span>
      <span>Slug</span>
      <span>Preço</span>
      <span>Estoque</span>
      <span>Ações</span>
    </div>

    <!-- Linha de produto -->
    <div
      class=" grid grid-cols-5 items-center bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition duration-200"
    >
      <span class="text-gray-800">{{ product_name }}</span>
      <span class="text-gray-500 text-sm">{{ slug }}</span>
      <span class="text-gray-600 font-medium">R$ {{ price }}</span>
      <span class="text-gray-600">{{ amount }}</span>
      <GroupButtons @delete="listenEmit" @uptade="listenEmit" @show="listenEmit" />
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
});
const { product_name, slug, price, amount, id } = props;

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
