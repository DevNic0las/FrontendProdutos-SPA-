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

    <div v-if="!props.isEdit">
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Categoria</label
      >
      <select
        v-model.number="category_id"
        id="category"
        name="category"
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700"
      >
        <option disabled selected value="">Selecione uma categoria</option>
        <option v-for="item in props.category" :key="item.id" :value="item.id">
          {{ item.categorie_name }}
        </option>
      </select>
    </div>

    <div v-else>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Categoria</label
      >
      <input
        :value="props.categoryName"
        disabled
        class="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
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
const category_id = defineModel("category_id");
const emit = defineEmits(['close'])
const closeModel = ()=>{
  emit("close");
}
const props = defineProps({
  isEdit: { type: Boolean, default: false },
  id: { type: Number, required: true },
  category: { type: Array, required: true },
  categoryName: { type: String, required: true },
});

const updateProduct = async () => {
  const form = {
    product_name: product_name.value,
    price: price.value,
    amount: amount.value,
    categories_id: category_id.value,
  };
  const { data } = await useFetch(`/products/${props.id}`, "PUT", form);
  return data;
};

const createProduct = async () => {
  const form = {
    product_name: product_name.value,
    price: price.value,
    amount: amount.value,
    categories_id: category_id.value,
  };
  const { data } = await useFetch("/products", "POST", form);
 
  return data;
};

const handleSubmit = async () => {
  if (props.isEdit) {
    await updateProduct();
    closeModel()
  } else {
    await createProduct();
  }
};
</script>
