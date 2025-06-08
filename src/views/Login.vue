<!-- src/views/LoginView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="email"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="password"
            >Senha</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>

      <p v-if="error" class="mt-4 text-red-600 text-sm text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import Cookies from "js-cookie";
import { useStoreUser } from "@/stores/token";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const error = ref<string | null>(null);
const store = useStoreUser();
const router = useRouter();
const handleLogin = async () => {
  await fetch("http://localhost:8000/sanctum/csrf-cookie", {
    credentials: "include",
  });

  const { data, error: loginError } = await useFetch("/login", "POST", {
    email: email.value,
    password: password.value,
  });

  if (data.value && data.value.token) {
    store.setToken(data.value.token);
  } else {
    error.value = loginError.value;
  }
  console.log(data.value);
  router.push("/");
};
</script>
