<template>
  <div>
    <TheNavbar />

    <!-- Destaques / Favoritos -->
    <div class="container mx-auto px-4 mt-10">
      <h2 class="font-cursive text-3xl font-bold text-center text-purple-800 mt-8 mb-6">Receitas Favoritas</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <ItemCard url="img/bolo-chocolate.jpg" alt="Bolo de Chocolate">Bolo de Chocolate</ItemCard>
        <ItemCard url="img/canjiquinha.jpg" alt="Canjiquinha">Canjiquinha</ItemCard>
        <ItemCard url="img/pao-caseiro.jpg" alt="Pão Caseiro">Pão Caseiro</ItemCard>
        <ItemCard url="img/bolo-de-banana.jpg" alt="Bolo de banana">Bolo de banana</ItemCard>
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