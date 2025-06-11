<template>
<div>
    <input v-model="input" type="search" class="w-full items-center" placeholder="Busque um produto...">
</div>
</template>

<script setup>
import { defineModel } from 'vue';
const input = defineModel("input")


</script>
