<template>
  <section :id="letter" class="mb-8 scroll-mt-32 sm:scroll-mt-36">
    <h2 class="font-cursive text-3xl text-fuchsia-700 border-b-2 border-fuchsia-200 pb-1 mb-4">
      {{ letter }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <RecipeItemCard
        v-for="(recipe, index) in recipes"
        :key="recipe.recipeName + '-' + index"
        :image-url="recipe.imageUrl"
        :alt-text="recipe.altText"
        :recipe-name="recipe.recipeName"
        :category="recipe.category"
      />
    </div>
  </section>
</template>

<script setup>
import RecipeItemCard from '~/components/RecipeItemCard.vue'; // Importar se não for global/auto-importado

defineProps({
  letter: String,
  recipes: Array
});
</script>