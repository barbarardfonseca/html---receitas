<template>
  <div>
    <!-- Recipe Form -->
    <div class="container mx-auto px-4 mt-10 mb-10">
      <h2 class="font-cursive text-3xl font-bold text-center text-brand-light-purple mt-8 mb-6">Cadastrar Nova Receita</h2>

      <form
        class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
        novalidate
        @submit.prevent="onSave"
      >
        <!-- Recipe Title -->
        <div class="mb-4">
          <label for="recipe-title" class="block text-gray-700 text-sm font-bold mb-2">Título da Receita:</label>
          <input
            id="recipe-name"
            v-model="recipe.name"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-800"
            placeholder="Ex: Bolo de Chocolate Fofinho"
            required
          >
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label for="recipe-description" class="block text-gray-700 text-sm font-bold mb-2">Descrição Curta:</label>
          <EditorHTML
            id="recipe-description"
            v-model="recipe.description"
            rows="3"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-800"
            placeholder="Uma breve descrição da receita..."
            required
          />
        </div>

        <!-- Ingredients -->
        <div class="mb-4">
          <label for="recipe-ingredients" class="block text-gray-700 text-sm font-bold mb-2">Ingredientes:</label>
           <EditorHTML
            id="recipe-ingredients"
            v-model="recipe.ingredients"
            rows="6"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-800"
            placeholder="Liste os ingredientes, um por linha..."
            required
            />
        </div>

        <!-- Instructions -->
        <div class="mb-4">
          <label for="recipe-instructions" class="block text-gray-700 text-sm font-bold mb-2">Modo de Preparo:</label>
          <EditorHTML
            id="recipe-instructions"
            v-model="recipe.instructions"
            rows="8"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-800"
            placeholder="Descreva o passo a passo do preparo..."
            required
          />
        </div>

        <!-- Category -->
        <div class="mb-4">
          <label for="recipe-category" class="block text-gray-700 text-sm font-bold mb-2">Categoria:</label>
          <select
            id="recipe-category"
            v-model="recipe.category"
            class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-800"
          >
            <option>Selecione uma categoria</option>
            <option value="bolos-e-tortas">Bolos e Tortas</option>
            <option value="paes">Pães</option>
            <option value="doces-e-sobremesas">Doces e Sobremesas</option>
            <option value="carnes">Carnes</option>
            <option value="verduras-e-legumes">Verduras e Legumes</option>
            <option value="massas">Massas</option>
            <option value="sopas">Sopas</option>
            <option value="bebidas">Bebidas</option>
            <!-- Add more categories as needed -->
          </select>
        </div>

        <!-- Is Favorite Checkbox -->
        <div class="mb-4">
          <label for="recipe-favorite" class="flex items-center cursor-pointer">
            <input
              id="recipe-favorite"
              v-model="recipe.isFavorite"
              type="checkbox"
              class="form-checkbox h-5 w-5 text-purple-800 rounded focus:ring-purple-800"
            >
            <span class="ml-2 text-gray-700 text-sm font-bold">Marcar como favorita</span>
          </label>
        </div>

        <!-- Image Upload -->
        <div class="mb-6">
          <label for="recipe-image" class="block text-gray-700 text-sm font-bold mb-2">Imagem da Receita:</label>
          <input
            id="recipe-image"
            type="file"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
            @change="onFileChange"
          >
        </div>

        <div v-if="recipe.imageUrl" class="mb-4">
          <figure>
            <img
              class="w-full h-auto object-cover rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105"
              :src="recipe.imageUrl"
              :alt="recipe.name"
            >
          </figure>
        </div>

        <div v-if="messageSuccess" class="bg-green-100 border border-green-400 text-red-green px-4 py-3 rounded relative mb-4" role="alert">
          <span class="block sm:inline">{{ messageSuccess }}</span>
        </div>

        <div v-if="messageError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span class="block sm:inline">{{ messageError }}</span>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-center">
          <button
            class="cursor-pointer px-6 py-3 bg-purple-800 text-white rounded-full hover:bg-brand-light-purple focus:outline-none focus:ring-2 focus:ring-purple-800 font-bold"
            type="submit"
            :disabled="isLoading"
          >
            {{isLoading ? "Salvando ..." : "Salvar Receita"}}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { collection, addDoc, serverTimestamp, getDoc, doc, updateDoc, } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import Recipe, { type RecipeProps, } from "~/composables/entity/Recipe";

const user = useNuxtApp().$user;
const { db } = useFirebase();
const route = useRoute();

const id = route.query.id as string | undefined;

const recipe = ref(new Recipe());
const imageFile = ref<File | null>(null);
const messageSuccess = ref("");
const messageError = ref("");
const isLoading = ref(false);

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files[0]) {
    imageFile.value = target.files[0];
  }
}

async function onSave(){
  if (!user.value) {
    return navigateTo("/login");
  }

  messageError.value = "";
  messageSuccess.value = "";

  try {
    const recipesCollection = collection(db, "recipes");

    recipe.value.authorId = user.value.uid;

    if (imageFile.value) {
      const storage = getStorage();
      const imagePath = `recipes/${recipe.value.id}`;
      const imageRef = storageRef(storage, imagePath);
      const uploadTask = uploadBytesResumable(imageRef, imageFile.value);

      await uploadTask;
      recipe.value.imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
    }

    if(id){
      recipe.value.updatedAt = serverTimestamp();
      await updateDoc(doc(db, "recipes", id), recipe.value.toJsonWithoutId());
    }else{
      recipe.value.createdAt = serverTimestamp();
      const docRef = await addDoc(recipesCollection, recipe.value.toJsonWithoutId());

      recipe.value.id = docRef.id;
    }

    console.log("Receita salva com o ID: ", recipe.value.id);
    messageSuccess.value = "Receita salva com sucesso!";

    // await navigateTo(`/recipe/${docRef.id}`); // Redireciona para a página da receita (se existir)
  } catch (e) {
    console.error("Erro ao adicionar o documento: ", e);
    messageError.value = "Ocorreu um erro ao salvar a receita. Tente novamente.";
    messageSuccess.value = "";
  }
}

onMounted(() => {
  if (id) {
    const recipeRef = doc(db, "recipes", id);

    getDoc(recipeRef)
      .then((doc) => {
        if (doc.exists()) {
          recipe.value = Recipe.create({ ...doc.data(), id: doc.id } as RecipeProps);
        }
      });
  }
});

</script>