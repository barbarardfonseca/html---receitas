<template>
  <div>
    <!-- Navbar - Replicated structure for consistency, consider extracting to a component -->
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between">
        <a class="flex items-center no-underline" href="/">
          <img src="/img/livro5.png" alt="Logo" class="h-10"> <!-- Adjusted path assuming img is in public root -->
          <span class="text-4xl text-purple-800 font-cursive font-bold ml-2">Receitas da Babi</span>
        </a>

        <!-- Botão Toggler para Mobile -->
        <button class="md:hidden block text-gray-600 focus:outline-none" id="nav-toggle">
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
          </svg>
        </button>

        <!-- Menu e Busca -->
        <div class="hidden md:flex md:items-center md:w-auto w-full" id="nav-content">
          <!-- Search form can be kept or removed depending on if you want search on this page -->
          <form class="flex items-center mt-4 md:mt-0 md:ml-auto">
            <input class="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-800 mr-2" type="search" placeholder="Buscar receitas">
            <button class="px-4 py-2 bg-purple-800 text-white rounded-full hover:bg-brand-light-purple focus:outline-none focus:ring-2 focus:ring-purple-800" type="submit">Buscar</button>
          </form>

          <!-- Links -->
          <div class="hidden lg:flex lg:items-center lg:space-x-4 ml-3">
             <NuxtLink href="/receitas" class="text-brand-light-purple hover:text-purple-800 px-3 py-2 text-sm no-underline">Todas as Receitas</NuxtLink>
             <NuxtLink href="/nova-receita" class="text-brand-light-purple hover:text-purple-800 px-3 py-2 text-sm no-underline">Salvar uma Receita</NuxtLink>
             <NuxtLink href="/favoritos" class="text-brand-light-purple hover:text-purple-800 px-3 py-2 text-sm no-underline">Favoritos</NuxtLink>
          </div>
          <!-- Mobile Dropdown can also be added here if needed -->
        </div>
      </div>
    </nav>

    <!-- Recipe Form -->
    <div class="container mx-auto px-4 mt-10 mb-10">
      <h2 class="font-cursive text-3xl font-bold text-center text-brand-light-purple mt-8 mb-6">Cadastrar Nova Receita</h2>

      <form class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <!-- Recipe Title -->
        <div class="mb-4">
          <label for="recipe-title" class="block text-gray-700 text-sm font-bold mb-2">Título da Receita:</label>
          <input type="text" id="recipe-title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-800" placeholder="Ex: Bolo de Chocolate Fofinho">
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label for="recipe-description" class="block text-gray-700 text-sm font-bold mb-2">Descrição Curta:</label>
          <textarea id="recipe-description" rows="3" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-800" placeholder="Uma breve descrição da receita..."></textarea>
        </div>

        <!-- Ingredients -->
        <div class="mb-4">
          <label for="recipe-ingredients" class="block text-gray-700 text-sm font-bold mb-2">Ingredientes:</label>
          <textarea id="recipe-ingredients" rows="6" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-800" placeholder="Liste os ingredientes, um por linha..."></textarea>
        </div>

        <!-- Instructions -->
        <div class="mb-4">
          <label for="recipe-instructions" class="block text-gray-700 text-sm font-bold mb-2">Modo de Preparo:</label>
          <textarea id="recipe-instructions" rows="8" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-800" placeholder="Descreva o passo a passo do preparo..."></textarea>
        </div>

        <!-- Category -->
        <div class="mb-4">
          <label for="recipe-category" class="block text-gray-700 text-sm font-bold mb-2">Categoria:</label>
          <select id="recipe-category" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-800">
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

        <!-- Image Upload -->
        <div class="mb-6">
          <label for="recipe-image" class="block text-gray-700 text-sm font-bold mb-2">Imagem da Receita:</label>
          <input type="file" id="recipe-image" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-center">
          <button class="px-6 py-3 bg-purple-800 text-white rounded-full hover:bg-brand-light-purple focus:outline-none focus:ring-2 focus:ring-purple-800 font-bold" type="submit">
            Salvar Receita
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Add script logic here later for form handling, data binding (v-model), and submission
// import { ref } from 'vue';

// Example: Define refs for form fields if using v-model
// const recipeTitle = ref('');
// const recipeDescription = ref('');
// ... etc.

// Function to handle form submission
// const submitRecipe = () => {
//   console.log('Submitting recipe...');
//   // Add logic to send data to backend or state management
// };
</script>