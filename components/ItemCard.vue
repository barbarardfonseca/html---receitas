<template>
  <div class="mb-4 cursor-pointer">
    <button
      v-if="user"
      class="flex items-center justify-center mt-2 w-full px-6 py-3 bg-purple-800 text-white hover:bg-brand-light-purple focus:outline-none focus:ring-2 focus:ring-purple-800 font-bold"
      @click="navigateTo(`/edit-recipe?id=${recipe.id}`)"
    >
      <PencilSquareIcon class="mr-2 h-5 w-5 text-white" title="Editar Receita"/>Editar
    </button>

    <figure>
      <img
        class="w-full h-auto object-cover rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105"
        :src="recipe.imageUrl"
        :alt="recipe.name"
        @click="navigateTo(`/recipe/${recipe.id}`)"
      >
        <figcaption class="text-center mt-2 text-gray-700">{{ recipe.name }}</figcaption>
    </figure>
  </div>
</template>

<script setup lang="ts">
import type Recipe from "~/composables/entity/Recipe";
import { PencilSquareIcon, } from "@heroicons/vue/24/outline";

defineProps<{
  recipe: Recipe;
}>();

const user = useNuxtApp().$user;

</script>