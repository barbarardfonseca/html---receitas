<template>
<div class="bg-purple-100 min-h-screen pb-10">
  <div class="recipe-detail">
    <h1 class="font-cursive text-4xl font-bold text-center text-purple-800 mt-8 mb-6">{{ recipe?.name }}</h1>
    <div class="recipe-image">
      <img :src="recipe?.imageUrl" alt="Bolo de Chocolate">
    </div>
    <div class="recipe-info">
      <p><strong>Tempo de Preparo:</strong> {{ recipe?.cookingTime ? recipe?.cookingTime : "-" }}</p>
      <p><strong>Porção:</strong> {{recipe?.servings}}</p>
    </div>
    <div class="recipe-content">
      <div class="ingredients">
        <h2>Ingredientes</h2>
        <div class="prose max-w-none" v-html="recipe?.ingredients"/>
      </div>
      <div class="instructions">
        <h2>Modo de Preparo</h2>
        <div class="prose max-w-none" v-html="recipe?.instructions"/>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { doc, getDoc, } from "firebase/firestore";
import Recipe, { type RecipeProps, } from "~/composables/entity/Recipe";

const id = useRoute().params.id as string;

const { db } = useFirebase();
const recipe = ref<Recipe>();
const isLoading = ref(true);

async function fetchRecipe(){
  const docRef = doc(db, "recipes", id);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()){
    recipe.value = Recipe.create({ ...docSnap.data(), id: docSnap.id } as RecipeProps);
  }
}

onMounted(() => {
  fetchRecipe()
    .finally(() => isLoading.value = false);
});

</script>

<style scoped>
.recipe-detail {
  max-width: 1100px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.recipe-image {
  text-align: center;
  margin-bottom: 20px;
}
.recipe-image img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 400px;
  height: auto;
  border-radius: 8px;
  border: 1px solid #eee; /* Borda sutil para acabamento */
  box-shadow: 4px 6px 12px rgba(0, 0, 0, 0.3); /* Sombra suave para profundidade */
}
.recipe-info {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  font-size: 1.125rem; /* Aumenta a fonte das informações */
}
.recipe-content {
  display: flex;
  gap: 40px; /* Espaço entre as colunas */
  align-items: flex-start;
}
.recipe-content > div {
  flex: 1; /* Faz com que ambas as colunas ocupem o mesmo espaço */
}
.ingredients,
.instructions {
  margin-bottom: 20px;
}
h1, h2 {
  border-bottom: 2px solid #d8b4fe; /* Cor lilás (purple-300) para a divisória */
  padding-bottom: 10px;
  margin-bottom: 20px;
}
h2 {
  color: #333;
  font-size: 1.75rem; /* Aumenta a fonte dos subtítulos */
}
.ingredients ul,
.instructions ol {
  list-style: none;
  padding-left: 5px;
}
.ingredients li,
.instructions li {
  position: relative;
  padding-left: 25px; /* Espaço para o ícone */
}
.ingredients li::before,
.instructions li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em; /* Alinha o ícone verticalmente com o texto */
  width: 10px;
  height: 10px;
  background-color: #ad46ff; /* Tom de roxo para o ícone */
  border-radius: 50%;
}
li {
  font-size: 1.125rem; /* Aumenta a fonte do texto principal */
  margin-bottom: 8px;
  line-height: 1.6;
}

@media (max-width: 860px) {
  .recipe-content {
    flex-direction: column;
    gap: 0;
  }
}
</style>