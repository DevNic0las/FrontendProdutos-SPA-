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

 <div v-else-if="showAllCategories" class="p-4">
  <!-- Botões de ação -->
  <div class="flex flex-wrap gap-4 mb-6">
    <button
      @click="showAllCategories = false"
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-200"
    >
      Voltar para produtos
    </button>
    <button
      @click="openCategoryModal"
      class="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-200"
    >
      Criar Categoria
    </button>
  </div>

  <!-- Lista de categorias -->
  <div class="space-y-4">
    <Categorieslist
      v-for="item in arrayListCategories"
      :key="item.id"
      :categoryId="item.id"
      :categoryName="item.categorie_name"
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
import type { CategoryType, ProductsType } from "@/types/types";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
const router = useRouter();
const showModalProduct = ref(false);
const showModalCategory = ref(false);
const showAllCategories = ref(false);
const input = ref("");
const arrayListProducts = ref<ProductsType[] | null>(null);
const arraySearchProduct = ref<ProductsType[] | null>(null);
const arrayListCategories = ref<CategoryType[] | null>(null);

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
    const { data, error } = await useFetch<{ data: ProductsType[] }>(
      "/products/search",
      "POST",
      {
        product_name: novoValor,
      }
    );
    arraySearchProduct.value = data.value?.data ?? [];
  }
});

const showProduct = async (id: number) => {
  return router.push(`/view/product/${id}`);
};

onMounted(async () => {
  if (!Cookies.get("api-token")) {
    return router.push("/login");
  }
  const { data } = await useFetch<{ data: ProductsType[] }>("/products", "GET");
  if (data.value) {
    arrayListProducts.value = data.value.data;
  }

  const { data: categories } = await useFetch<{ data: CategoryType[] }>(
    "/category",
    "GET"
  );
  arrayListCategories.value = categories.value ?? [];
  console.log(arrayListCategories.value);
  console.log(categories.value);
});
</script>
