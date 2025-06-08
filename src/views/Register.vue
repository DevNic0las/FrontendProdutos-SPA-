<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Registro
      </h2>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="name"
            >Nome</label
          >
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
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

        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
            for="password"
            >Confirme a senha</label
          >
          <input
            id="password_confirmation"
            v-model="password_confirmation"
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
import { useFetch } from "@/composables/useFetch";
import { ref } from "vue";
const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const password_confirmation = ref<string>("");
const error = ref("");
const handleRegister = async () => {
  const form: Object = {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  };
  const { data, error } = await useFetch("/register", "POST", form);
  if (data.value) {
    console.log(data.value);
  }
  if (error.value) {
    console.log(error.value);
    
    error.value = error.value;
  }
};
</script>
