<template>
  <div class="flex items-center justify-between gap-4 mb-4">
    <SearchInput v-model:input="input" class="flex-1" />

    <button
      @click="openProductModal"
      class="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-200"
    >
      Criar Produto
    </button>

    <button
      @click="showAllCategories = true"
      class="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-200"
    >
      Categorias disponives
    </button>
  </div>

  <!-- Modal de Produto -->
  <Modal
    :isOpen="showModalProduct"
    @close="showModalProduct = false"
    :category="arrayListCategories"
  />

  <!-- Modal de Categoria -->
  <ModalCategory
    :isOpen="showModalCategory"
    @close="showModalCategory = false"
    @submit="handleCreateCategory"
  />

  <div v-if="!showAllCategories && arrayListProducts">
    <Products
      @click="showProduct(item.id)"
      class="w-full"
      v-for="item in input.length > 0 ? arraySearchProduct : arrayListProducts"
      :key="item.id"
      :product_name="item.product_name"
      :slug="item.slug"
      :price="item.price"
      :amount="item.amount"
      :id="item.id"
      :categoryName="item.category"
    />
  </div>

  <div v-else-if="showAllCategories">
      <button
    @click="showAllCategories = false"
    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-200 mb-4"
  >
    Voltar para produtos
  </button>
  <button
    @click="openCategoryModal"
    class="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-200"
  >
    Criar Categoria
  </button>
    <div>
      <Categorieslist
        v-for="item in arrayListCategories"
        :key="item.id"
        :category="item"
      />
    </div>
  </div>

  <!-- Estado de carregamento -->
  <div v-else>carregando...</div>
</template>

<script setup lang="ts">
import Categorieslist from "@/components/Categorieslist.vue";
import Modal from "@/components/Modal.vue";
import ModalCategory from "@/components/ModalCategory.vue";
import Products from "@/components/Products.vue";
import SearchInput from "@/components/SearchInput.vue";
import { useFetch } from "@/composables/useFetch";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showModalProduct = ref(false);
const showModalCategory = ref(false);
const showAllCategories = ref(false);
const input = ref("");
const arrayListProducts = ref<any[]>();
const arraySearchProduct = ref();
const arrayListCategories = ref();

const openProductModal = () => {
  showModalProduct.value = true;
};
const openCategoryModal = () => {
  showModalCategory.value = true;
};

const handleCreateCategory = async (name: string) => {
  const { data, error } = await useFetch("/category", "POST", {
    name,
  });
  if (!error.value) {
    // recarrega as categorias após criar
    const { data: categories } = await useFetch("/category", "GET", undefined);
    arrayListCategories.value = categories.value;
  }
};

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
  }
});

const showProduct = async (id: number) => {
  return router.push(`/view/product/${id}`);
};

onMounted(async () => {
  const { data } = await useFetch("/products", "GET");
  arrayListProducts.value = data.value?.data;

  const { data: categories } = await useFetch("/category", "GET");
  arrayListCategories.value = categories.value;
});
</script>
