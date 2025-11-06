<template>
  <div>
    <!-- Destaques / Favoritos -->
    <div class="container mx-auto px-4 mt-10">
      <h2 class="font-cursive text-3xl font-bold text-center text-purple-800 mt-8 mb-6">Receitas Favoritas</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <ItemCard
          v-for="recipe of recipes"
          :key="recipe.id"
          :url="recipe.imageUrl"
          :alt="recipe.name"
          :recipe="recipe"
        />
      </div>
    </div>

    <!-- Categorias -->
    <div class="container mx-auto px-4 mt-10">
      <h2 class="font-cursive text-3xl font-bold text-center text-purple-800 mt-8 mb-6">Categorias</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <CategoryCard category-name="Bolos e Tortas" category-link="/recipe?categoria=bolos-e-tortas" />
        <CategoryCard category-name="Pães" category-link="/recipe?categoria=paes" />
        <CategoryCard category-name="Doces e Sobremesas" category-link="/recipe?categoria=doces-e-sobremesas" />
        <CategoryCard category-name="Carnes" category-link="/recipe?categoria=carnes" />
        <CategoryCard category-name="Verduras e Legumes" category-link="/recipe?categoria=verduras-e-legumes" />
        <CategoryCard category-name="Massas" category-link="/recipe?categoria=massas" />
        <CategoryCard category-name="Sopas" category-link="/recipe?categoria=sopas" />
        <CategoryCard category-name="Bebidas" category-link="/recipe?categoria=bebidas" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { collection, getDocs, } from "firebase/firestore";
import Recipe, { type RecipeProps, } from "~/composables/entity/Recipe";

const { db } = useFirebase();
const recipes = ref<Recipe[]>([]);
const isLoading = ref(true);

async function fetchAllRecipes(){
  const recipesCollection = collection(db, "recipes");
  const snap = await getDocs(recipesCollection);

  snap.forEach((doc) => {
    recipes.value.push(Recipe.create({ ...doc.data(), id: doc.id } as RecipeProps));
  });

  isLoading.value = false;
}

onMounted(() => {
  fetchAllRecipes();
});

</script>