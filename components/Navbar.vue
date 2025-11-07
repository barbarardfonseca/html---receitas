<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between">
      <NuxtLink to="/" class="flex items-center no-underline">
        <img src="/img/livro5.png" alt="Logo" class="h-10"> <!-- Assumindo que livro5.png está em public/img -->
        <span class="text-4xl text-purple-800 font-cursive font-bold ml-2">Receitas da Babi</span>
      </NuxtLink>

      <!-- Botão Toggler para Mobile -->
      <button
        class="md:hidden block text-gray-600 focus:outline-none"
        aria-label="Toggle navigation"
        @click="toggleMobileMenu"
      >
        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
        </svg>
      </button>

      <!-- Menu e Busca -->
      <div
        :class="{'hidden': !isMobileMenuOpen}"
        class="md:flex md:items-center md:w-auto w-full"
      >
        <form class="flex items-center mt-4 md:mt-0 md:ml-auto">
          <input class="border border-gray-200 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-700 mr-2" type="search" placeholder="Buscar receitas">
          <button class="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-700" type="submit">Buscar</button>
        </form>

        <!-- Dropdown Menu para telas médias (lg:hidden) -->
        <div class="relative inline-block text-left ml-3 mt-4 md:mt-0 lg:hidden">
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-700"
            aria-expanded="isDropdownOpen"
            aria-haspopup="true"
            @click="toggleDropdown"
          >
            Menu
            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <div
            v-show="isDropdownOpen"
            class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            <div class="py-1" role="none">
              <!-- <NuxtLink to="/recipe" class="text-purple-800 hover:text-purple-700 block px-4 py-2 text-sm no-underline" role="menuitem" tabindex="-1" @click="closeMenus">Todas as Receitas</NuxtLink>
              <NuxtLink to="/favoritos" class="text-purple-800 hover:text-purple-700 block px-4 py-2 text-sm no-underline" role="menuitem" tabindex="-1" @click="closeMenus">Favoritos</NuxtLink> -->

              <!-- Links Condicionais -->
              <template v-if="user">
                <NuxtLink to="/new-recipe" class="text-purple-800 hover:text-purple-700 px-3 py-2 text-sm no-underline" tabindex="-1" @click="closeMenus">Nova Receita</NuxtLink>
                <NuxtLink to="/" class="text-purple-800 hover:text-purple-700 px-3 py-2 text-sm no-underline" @click="onLogout">Sair</NuxtLink>
              </template>
            </div>
          </div>
        </div>

        <!-- Menu para telas grandes (hidden lg:flex) -->
        <div class="hidden lg:flex lg:items-center lg:space-x-4 ml-3">
          <NuxtLink to="/recipe" class="text-purple-800 hover:text-purple-700 px-3 py-2 text-sm no-underline">Todas as Receitas</NuxtLink>
          <!-- <NuxtLink to="/favoritos" class="text-purple-800 hover:text-purple-700 px-3 py-2 text-sm no-underline">Favoritos</NuxtLink> -->

          <!-- Links Condicionais -->
          <template v-if="user">
            <NuxtLink to="/new-recipe" class="text-purple-800 hover:text-purple-700 px-3 py-2 text-sm no-underline">Nova Receita</NuxtLink>
            <NuxtLink to="/" class="text-purple-800 hover:text-purple-700 px-3 py-2 text-sm no-underline" @click="onLogout">Sair</NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const user = useNuxtApp().$user;
const onLogout = useNuxtApp().$onLogout;

const isMobileMenuOpen = ref(false);
const isDropdownOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeMenus = () => {
  isMobileMenuOpen.value = false;
  isDropdownOpen.value = false;
};

</script>