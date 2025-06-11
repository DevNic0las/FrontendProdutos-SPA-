<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-md mx-auto"
  >
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Nome do Produto</label
      >
      <input
        v-model="product_name"
        :placeholder="props.isEdit ? 'Edite o nome' : 'Crie'"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Preço</label>
      <input
        v-model="price"
        type="number"
        :placeholder="props.isEdit ? 'Novo valor' : 'Adicione um valor'"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Quantidade</label
      >
      <input
        v-model="amount"
        :placeholder="props.isEdit ? 'Nova quantia' : 'Insira uma quantia'"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      {{ props.isEdit ? "Atualizar" : "Criar" }}
    </button>
  </form>
</template>
<script setup>
import { useFetch } from "@/composables/useFetch";

const product_name = defineModel("product_name");
const price = defineModel("price");
const amount = defineModel("amount");
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    required: true,
  },
});

const updateProduct = async () => {
  const form = {
    product_name: product_name.value,
    price: price.value,
    amount: amount.value,
  };
  const { data, error } = await useFetch(`/products/${props.id}`, "PUT", form);
  console.log(data.value);
  return data;
};

const createProduct = async () => {
  const form = {
    product_name: product_name.value,
    price: price.value,
    amount: amount.value,
  };
  const { data, error } = await useFetch("/products", "POST", form);
  console.log(data);

  return data;
};
const handleSubmit = async () => {
  if (props.isEdit) {
    await updateProduct();
  } else {
    await createProduct();
  }
};
</script>
