<template>
  <div>
    <input
      v-model="input"
      type="search"
      placeholder="Busque um produto..."
      class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script setup>
const input = defineModel("input");
</script>