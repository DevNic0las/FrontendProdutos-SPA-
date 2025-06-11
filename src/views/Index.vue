<template>
  <div>
    <Modal :isOpen="showModal" @close="showModal = false" />
    <button @click="showModal = true">Criar</button>
  </div>
  <div>
    <SearchInput v-model:input="input" />
  </div>
  <div v-if="arrayListProducts">
    <Products
      @click="showProduct(item.id)"
      v-if="arrayListProducts"
      class="w-full"
      v-for="item in input.length > 0 ? arraySearchProduct : arrayListProducts"
      :key="item.id"
      :product_name="item.product_name"
      :slug="item.slug"
      :price="item.price"
      :amount="item.amount"
      :id="item.id"
    />
  </div>
  <div v-else>Carregando...</div>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import Products from "@/components/Products.vue";
import SearchInput from "@/components/SearchInput.vue";
import { useFetch } from "@/composables/useFetch";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const showModal = ref<boolean>(false);
const input = ref("");
const arrayListProducts = ref<any[]>();
const arraySearchProduct = ref();
function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
function buscar(valor: string) {
  console.log("Buscando por:", valor);
}
const debouncedBuscar = debounce(buscar, 500);
watch(input, async (novoValor) => {
  if (input.value.length > 0) {
    debouncedBuscar(novoValor);
    const { data, error } = await useFetch("/products/search", "POST", {
      product_name: novoValor,
    });
    arraySearchProduct.value = data.value;
    console.log(data);
  }
});
const showProduct = async (id: number) => {
  return router.push(`/view/product/${id}`);
};
onMounted(async () => {
  const { data, error } = await useFetch("/products", "GET", undefined);
  arrayListProducts.value = data.value?.data;
  console.log(arrayListProducts.value);
});
</script>
