<template>
  <form @submit.prevent=handleSubmit>
    <input
      v-model="product_name"
      :placeholder="props.isEdit ? 'Edite o nome' : 'crie'"
    />
    <input
      v-model="price"
      type="number"
      :placeholder="props.isEdit ? 'Novo valor' : 'Adicne um valor'"
    />
    <input
      v-model="amount"
      :placeholder="props.isEdit ? 'Nova quantia' : 'Insira uma nova quantia'"
    />
    <button>Enviar</button>
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
   await updateProduct()
  }else{
    await createProduct()
  }
};
</script>
