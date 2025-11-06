<template>
  <div>
    <AlphabeticalNavigation :alphabet="availableLetters" />

    <!-- Container Principal das Receitas -->
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32 sm:pt-36">
      <RecipeLetterSection
        v-for="(recipes, letter) in recipesByLetter"
        :key="letter"
        :letter="letter"
        :recipes="recipes"
      />
      <!-- Adicione uma mensagem caso não haja receitas -->
      <div v-if="!hasRecipes" class="text-center text-gray-500 mt-10">
        Nenhuma receita encontrada.
      </div>
    </main>
  </div>
</template>

<script setup>
// Dados mockados. Idealmente, isso viria de uma API.
const allRecipes = ref([
  { imageUrl: "img/comidas.jpg", altText: "Arroz de forno", recipeName: "Arroz de forno", category: "massas" },
  { imageUrl: "img/comidas.jpg", altText: "Arroz primavera", recipeName: "Arroz primavera", category: "massas" },
  { imageUrl: "img/comidas.jpg", altText: "Batata assada", recipeName: "Batata assada", category: "verduras-e-legumes" },
  { imageUrl: "img/comidas.jpg", altText: "Berinjela recheada", recipeName: "Berinjela recheada", category: "verduras-e-legumes" },
  { imageUrl: "img/comidas.jpg", altText: "Bolo de banana sem açúcar", recipeName: "Bolo de banana sem açúcar", category: "bolos-e-tortas" },
  { imageUrl: "img/comidas.jpg", altText: "Bolo de cenoura com cobertura de chocolate", recipeName: "Bolo de cenoura com cobertura de chocolate", category: "bolos-e-tortas" },
  { imageUrl: "img/comidas.jpg", altText: "Canja de galinha", recipeName: "Canja de galinha", category: "sopas" },
  { imageUrl: "img/comidas.jpg", altText: "Carne moída refogada", recipeName: "Carne moída refogada", category: "carnes" },
  { imageUrl: "img/comidas.jpg", altText: "Carne de panela", recipeName: "Carne de panela", category: "carnes" },
  { imageUrl: "img/comidas.jpg", altText: "Couve-flor gratinada", recipeName: "Couve-flor gratinada", category: "verduras-e-legumes" },
  { imageUrl: "img/comidas.jpg", altText: "Creme de milho", recipeName: "Creme de milho", category: "verduras-e-legumes" },
  { imageUrl: "img/comidas.jpg", altText: "Salada de batata com maionese", recipeName: "Salada de batata com maionese", category: "verduras-e-legumes" },
  { imageUrl: "img/comidas.jpg", altText: "Salada de grão-de-bico", recipeName: "Salada de grão-de-bico", category: "verduras-e-legumes" },
  { imageUrl: "img/comidas.jpg", altText: "Pão caseiro fitness", recipeName: "Pão caseiro fitness", category: "pães" },
  { imageUrl: "img/comidas.jpg", altText: "Sequilhos com Polvilho Doce ou Amido", recipeName: "Sequilhos com Polvilho Doce ou Amido", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Mousse de maracujá sem açúcar", recipeName: "Mousse de maracujá sem açúcar", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Recheio de chocolate para bolos e sobremesas", recipeName: "Recheio de chocolate para bolos e sobremesas", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Picolé sem açúcar", recipeName: "Picolé sem açúcar", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Smoothie abacaxi", recipeName: "Smoothie abacaxi", category: "bebidas" },
  { imageUrl: "img/comidas.jpg", altText: "Bolo de aniversário", recipeName: "Bolo de aniversário", category: "bolos-e-tortas" },
  { imageUrl: "img/comidas.jpg", altText: "Leite condensado de leite de coco", recipeName: "Leite condensado de leite de coco", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Bolo frutas dia das mães", recipeName: "Bolo frutas dia das mães", category: "bolos-e-tortas" },
  { imageUrl: "img/comidas.jpg", altText: "Peito de frango light", recipeName: "Peito de frango light", category: "carnes" },
  { imageUrl: "img/comidas.jpg", altText: "Recheio-compota de morango", recipeName: "Recheio-compota de morango", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Bolo fit de nozes", recipeName: "Bolo fit de nozes", category: "bolos-e-tortas" },
  { imageUrl: "img/comidas.jpg", altText: "Ingredientes - petit gateau low carb", recipeName: "Ingredientes - petit gateau low carb", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Modo de fazer - petit gateau low carb", recipeName: "Modo de fazer - petit gateau low carb", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Geleia de tomate com pimenta", recipeName: "Geleia de tomate com pimenta", category: "acompanhamentos" },
  { imageUrl: "img/comidas.jpg", altText: "Cream cheese sem açúcar", recipeName: "Cream cheese sem açúcar", category: "acompanhamentos" },
  { imageUrl: "img/comidas.jpg", altText: "Bolo de cenoura com recheio e cobertura", recipeName: "Bolo de cenoura com recheio e cobertura", category: "bolos-e-tortas" },
  { imageUrl: "img/comidas.jpg", altText: "Bolo de cacau com castanhas", recipeName: "Bolo de cacau com castanhas", category: "bolos-e-tortas" },
  { imageUrl: "img/comidas.jpg", altText: "Bolo de cenoura com nozes", recipeName: "Bolo de cenoura com nozes", category: "bolos-e-tortas" },
  { imageUrl: "img/comidas.jpg", altText: "Bolo banana com aveia", recipeName: "Bolo banana com aveia", category: "bolos-e-tortas" },
  { imageUrl: "img/comidas.jpg", altText: "Cocada cremosa recheio bolo", recipeName: "Cocada cremosa recheio bolo", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Bolo de banana e cacau com ganache", recipeName: "Bolo de banana e cacau com ganache", category: "bolos-e-tortas" },
  { imageUrl: "img/comidas.jpg", altText: "Gelatina de uva saudável", recipeName: "Gelatina de uva saudável", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Brigadeiro fit", recipeName: "Brigadeiro fit", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Sorvete caseiro", recipeName: "Sorvete caseiro", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Gelatina saudável", recipeName: "Gelatina saudável", category: "doces" },
  { imageUrl: "img/comidas.jpg", altText: "Patê com creme de ricota", recipeName: "Patê com creme de ricota", category: "acompanhamentos" },
  { imageUrl: "img/comidas.jpg", altText: "Crepioca", recipeName: "Crepioca", category: "café-da-manhã" },
  { imageUrl: "img/comidas.jpg", altText: "caldinho de feijão", recipeName: "Caldinho de Feijão", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "canja de galinha", recipeName: "Canja de Galinha", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "creme de abobrinha com curry", recipeName: "Creme de Abobrinha com Curry", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "creme de brócolis", recipeName: "Creme de Brócolis", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "creme de cebola", recipeName: "Creme de Cebola", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "creme de ervilha com bacon", recipeName: "Creme de Ervilha com Bacon", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "creme de milho verde", recipeName: "Creme de Milho Verde", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "creme de tomate com carne moída", recipeName: "Creme de Tomate com Carne Moída", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "sopa de beterraba", recipeName: "Sopa de Beterraba", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "sopa de cenoura e batata doce", recipeName: "Sopa de Cenoura e Batata Doce", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "sopa de frango com batata doce", recipeName: "Sopa de Frango com Batata Doce", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "sopa de lentilha", recipeName: "Sopa de Lentilha", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "sopa de mandioquinha com frango", recipeName: "Sopa de Mandioquinha com Frango", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "sopa de quinoa com legumes", recipeName: "Sopa de Quinoa com Legumes", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "sopa de tomate e cenoura", recipeName: "Sopa de Tomate e Cenoura", category: "sopas e cremes fit" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de ovos", recipeName: "Caldo de Ovos", category: "sopas e cremes low carb" },
  { imageUrl: "img/comidas.jpg", altText: "creme de abóbora com gengibre", recipeName: "Creme de Abóbora com Gengibre", category: "sopas e cremes low carb" },
  { imageUrl: "img/comidas.jpg", altText: "creme de abóbora com gorgonzola", recipeName: "Creme de Abóbora com Gorgonzola", category: "sopas e cremes low carb" },
  { imageUrl: "img/comidas.jpg", altText: "creme de chuchu com bacon", recipeName: "Creme de Chuchu com Bacon", category: "sopas e cremes low carb" },
  { imageUrl: "img/comidas.jpg", altText: "creme de cogumelos", recipeName: "Creme de Cogumelos", category: "sopas e cremes low carb" },
  { imageUrl: "img/comidas.jpg", altText: "creme de couve-flor com cebola", recipeName: "Creme de Couve-flor com Cebola", category: "sopas e cremes low carb" },
  { imageUrl: "img/comidas.jpg", altText: "creme de legumes", recipeName: "Creme de Legumes", category: "sopas e cremes low carb" },
  { imageUrl: "img/comidas.jpg", altText: "creme de palmito", recipeName: "Creme de Palmito", category: "sopas e cremes low carb" },
  { imageUrl: "img/comidas.jpg", altText: "creme de tomate", recipeName: "Creme de Tomate", category: "sopas e cremes low carb" },
  { imageUrl: "img/comidas.jpg", altText: "sopa de legumes com frango", recipeName: "Sopa de Legumes com Frango", category: "sopas e cremes low carb" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de mandioquinha", recipeName: "Caldo de Mandioquinha", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de ervilhas", recipeName: "Caldo de Ervilhas", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo verde", recipeName: "Caldo Verde", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de milho", recipeName: "Caldo de Milho", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de abóbora", recipeName: "Caldo de Abóbora", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de feijão", recipeName: "Caldo de Feijão", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de palmito", recipeName: "Caldo de Palmito", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de frango", recipeName: "Caldo de Frango", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de mandioca", recipeName: "Caldo de Mandioca", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de carne", recipeName: "Caldo de Carne", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo chica doida", recipeName: "Caldo Chica Doida", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de vaca atolada", recipeName: "Caldo de Vaca Atolada", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "caldo de mocotó", recipeName: "Caldo de Mocotó", category: "caldos" },
  { imageUrl: "img/comidas.jpg", altText: "arroz integral", recipeName: "Arroz Integral", category: "acompanhamientos" },
  { imageUrl: "img/comidas.jpg", altText: "legumes no vapor", recipeName: "Legumes no Vapor", category: "acompanhamientos" },
  { imageUrl: "img/comidas.jpg", altText: "feijão", recipeName: "Feijão", category: "acompanhamientos" },
  { imageUrl: "img/comidas.jpg", altText: "inhame", recipeName: "Inhame", category: "acompanhamientos" },
  { imageUrl: "img/comidas.jpg", altText: "carne seca desfiada", recipeName: "Carne Seca Desfiada", category: "acompanhamientos" },
  { imageUrl: "img/comidas.jpg", altText: "macarrão integral", recipeName: "Macarrão Integral", category: "acompanhamientos" },
  { imageUrl: "img/comidas.jpg", altText: "frango desfiado", recipeName: "Frango Desfiado", category: "acompanhamientos" },
  { imageUrl: "img/comidas.jpg", altText: "carne de patinho", recipeName: "Carne de Patinho", category: "acompanhamientos" },
  { imageUrl: "img/comidas.jpg", altText: "purê de abóbora", recipeName: "Purê de Abóbora", category: "acompanhamientos" },
  { imageUrl: "img/comidas.jpg", altText: "purê de mandioquinha", recipeName: "Purê de Mandioquinha", category: "acompanhamientos" },
  { imageUrl: "img/comidas.jpg", altText: "carne de panela", recipeName: "Carne de Panela", category: "tradicionais" },
  { imageUrl: "img/comidas.jpg", altText: "filé de frango", recipeName: "Filé de Frango", category: "tradicionais" },
  { imageUrl: "img/comidas.jpg", altText: "carré", recipeName: "Carré", category: "tradicionais" },
  { imageUrl: "img/comidas.jpg", altText: "carne moída", recipeName: "Carne Moída", category: "tradicionais" },
  { imageUrl: "img/comidas.jpg", altText: "strogonoff de carne", recipeName: "Strogonoff de Carne", category: "tradicionais" },
  { imageUrl: "img/comidas.jpg", altText: "panqueca de carne", recipeName: "Panqueca de Carne", category: "tradicionais" },
  { imageUrl: "img/comidas.jpg", altText: "kibe de carne", recipeName: "Kibe de Carne", category: "tradicionais" },
  { imageUrl: "img/comidas.jpg", altText: "jardineira de frango", recipeName: "Jardineira de Frango", category: "tradicionais" },
  { imageUrl: "img/comidas.jpg", altText: "lasanha à bolonhesa", recipeName: "Lasanha à Bolonhesa", category: "tradicionais" },
  { imageUrl: "img/comidas.jpg", altText: "frango empanado", recipeName: "Frango Empanado", category: "tradicionais" },

  { imageUrl: "img/comidas.jpg", altText: "rocambole de carne", recipeName: "Rocambole de Carne", category: "fitness" },
  { imageUrl: "img/comidas.jpg", altText: "brajola bovina", recipeName: "Brajola Bovina", category: "fitness" },
  { imageUrl: "img/comidas.jpg", altText: "lasanha light", recipeName: "Lasanha Light", category: "fitness" },
  { imageUrl: "img/comidas.jpg", altText: "panqueca de frango", recipeName: "Panqueca de Frango", category: "fitness" },
  { imageUrl: "img/comidas.jpg", altText: "moqueca fitness", recipeName: "Moqueca Fitness", category: "fitness" },
  { imageUrl: "img/comidas.jpg", altText: "almôndegas de carne", recipeName: "Almôndegas de Carne", category: "fitness" },
  { imageUrl: "img/comidas.jpg", altText: "escondidinho de batata doce", recipeName: "Escondidinho de Batata Doce", category: "fitness" },
  { imageUrl: "img/comidas.jpg", altText: "frango xadrez", recipeName: "Frango Xadrez", category: "fitness" },
  { imageUrl: "img/comidas.jpg", altText: "tilápia ao molho de ervas", recipeName: "Tilápia ao Molho de Ervas", category: "fitness" },
  { imageUrl: "img/comidas.jpg", altText: "contra filé com cogumelos", recipeName: "Contra Filé com Cogumelos", category: "fitness" },
  { imageUrl: "img/comidas.jpg", altText: "lasanha de espinafre", recipeName: "Lasanha de Espinafre", category: "vegetarianas" },
  { imageUrl: "img/comidas.jpg", altText: "hambúrguer de lentilhas", recipeName: "Hambúrguer de Lentilhas", category: "vegetarianas" },
  { imageUrl: "img/comidas.jpg", altText: "bolinho de grão de bico", recipeName: "Bolinho de Grão de Bico", category: "vegetarianas" },
  { imageUrl: "img/comidas.jpg", altText: "macarrão com molho pesto", recipeName: "Macarrão com Molho Pesto", category: "vegetarianas" },
  { imageUrl: "img/comidas.jpg", altText: "strogonoff de abobrinha", recipeName: "Strogonoff de Abobrinha", category: "vegetarianas" },
  { imageUrl: "img/comidas.jpg", altText: "feijoada vegetariana", recipeName: "Feijoada Vegetariana", category: "vegetarianas" },
  { imageUrl: "img/comidas.jpg", altText: "lasanha de berinjela", recipeName: "Lasanha de Berinjela", category: "vegetarianas" },
  { imageUrl: "img/comidas.jpg", altText: "risoto vegetariano", recipeName: "Risoto Vegetariano", category: "vegetarianas" },
  { imageUrl: "img/comidas.jpg", altText: "nhoque de mandioquinha", recipeName: "Nhoque de Mandioquinha", category: "vegetarianas" },
  { imageUrl: "img/comidas.jpg", altText: "bolinho de batata doce", recipeName: "Bolinho de Batata Doce", category: "vegetarianas" },

  { imageUrl: "img/comidas.jpg", altText: "fritada de abobrinha", recipeName: "Fritada de Abobrinha", category: "low carb" },
  { imageUrl: "img/comidas.jpg", altText: "suflê de couve-flor", recipeName: "Suflê de Couve-flor", category: "low carb" },
  { imageUrl: "img/comidas.jpg", altText: "berinjela assada", recipeName: "Berinjela Assada", category: "low carb" },
  { imageUrl: "img/comidas.jpg", altText: "arroz de couve-flor", recipeName: "Arroz de Couve-flor", category: "low carb" },
  { imageUrl: "img/comidas.jpg", altText: "escondidinho de frango e espinafre", recipeName: "Escondidinho de Frango e Espinafre", category: "low carb" },
  { imageUrl: "img/comidas.jpg", altText: "strogonoff low carb", recipeName: "Strogonoff Low Carb", category: "low carb" },
  { imageUrl: "img/comidas.jpg", altText: "lasanha de repolho", recipeName: "Lasanha de Repolho", category: "low carb" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de atum com maionese e pepino", recipeName: "Sanduíche de Atum com Maionese e Pepino", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de queijo grelhado com tomate e manjericão", recipeName: "Sanduíche de Queijo Grelhado com Tomate e Manjericão", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de ovo com espinafre e queijo", recipeName: "Sanduíche de Ovo com Espinafre e Queijo", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de frango com mostarda dijon e rúcula", recipeName: "Sanduíche de Frango com Mostarda Dijon e Rúcula", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de abacate com ovo e bacon", recipeName: "Sanduíche de Abacate com Ovo e Bacon", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de mussarela de búfala com tomate seco e manjericão", recipeName: "Sanduíche de Mussarela de Búfala com Tomate Seco e Manjericão", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de salmão defumado com cream cheese e cebolinha", recipeName: "Sanduíche de Salmão Defumado com Cream Cheese e Cebolinha", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de frango com abacate, queijo e tomate", recipeName: "Sanduíche de Frango com Abacate, Queijo e Tomate", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de frango com molho de iogurte e pepino", recipeName: "Sanduíche de Frango com Molho de Iogurte e Pepino", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de queijo quente com alho e azeitona", recipeName: "Sanduíche de Queijo Quente com Alho e Azeitona", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de atum com azeite, alho e limão", recipeName: "Sanduíche de Atum com Azeite, Alho e Limão", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de frango com abacate, alface e tomate", recipeName: "Sanduíche de Frango com Abacate, Alface e Tomate", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de ovo com queijo e presunto", recipeName: "Sanduíche de Ovo com Queijo e Presunto", category: "sanduíches naturais" },
  { imageUrl: "img/comidas.jpg", altText: "sanduíche de peito de peru com mostarda e rúcula", recipeName: "Sanduíche de Peito de Peru com Mostarda e Rúcula", category: "sanduíches naturais" },

  { imageUrl: "img/comidas.jpg", altText: "patê de salmão defumado com cream cheese e ervas finas", recipeName: "Patê de Salmão Defumado com Cream Cheese e Ervas Finas", category: "patês" },
  { imageUrl: "img/comidas.jpg", altText: "patê de gorgonzola com nozes e mel", recipeName: "Patê de Gorgonzola com Nozes e Mel", category: "patês" },
  { imageUrl: "img/comidas.jpg", altText: "patê de frutas secas com queijo brie e mel", recipeName: "Patê de Frutas Secas com Queijo Brie e Mel", category: "patês" },
  { imageUrl: "img/comidas.jpg", altText: "patê de frango com cream cheese e ervas", recipeName: "Patê de Frango com Cream Cheese e Ervas", category: "patês" },
  { imageUrl: "img/comidas.jpg", altText: "patê de frango defumado", recipeName: "Patê de Frango Defumado", category: "patês" },
  { imageUrl: "img/comidas.jpg", altText: "salada 01 - alface, tomate, cenoura, brócolis e milho", recipeName: "Salada 01 - Alface, Tomate, Cenoura, Brócolis e Milho", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 02 - alface, tomate, beterraba, brócolis e milho", recipeName: "Salada 02 - Alface, Tomate, Beterraba, Brócolis e Milho", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 03 - tomate, beterraba, cenoura, milho, ovo", recipeName: "Salada 03 - Tomate, Beterraba, Cenoura, Milho, Ovo", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 04 - alface, tomate, pepino, berinjela, grão de bico", recipeName: "Salada 04 - Alface, Tomate, Pepino, Berinjela, Grão de Bico", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 05 - alface, tomate, repolho, cenoura e ovo cozido", recipeName: "Salada 05 - Alface, Tomate, Repolho, Cenoura e Ovo Cozido", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 06 - alface, tomate, cenoura, couve-flor e ervilha", recipeName: "Salada 06 - Alface, Tomate, Cenoura, Couve-Flor e Ervilha", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 07 - rúcula, frango desfiado, tomate cereja, ervilha", recipeName: "Salada 07 - Rúcula, Frango Desfiado, Tomate Cereja, Ervilha", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 08 - alface, tomate, beterraba, cenoura, espinafre, frango", recipeName: "Salada 08 - Alface, Tomate, Beterraba, Cenoura, Espinafre, Frango", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 09 - alface, tomate, couve, cenoura e tofu", recipeName: "Salada 09 - Alface, Tomate, Couve, Cenoura e Tofu", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 10 - beterraba, brócolis, carne moída, tomate e alface", recipeName: "Salada 10 - Beterraba, Brócolis, Carne Moída, Tomate e Alface", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 11 - alface, tomate, abobrinha, beterraba, ovos", recipeName: "Salada 11 - Alface, Tomate, Abobrinha, Beterraba, Ovos", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 12 - alface, tomate cereja, cebola roxa, pimentões, rúcula, brócolis, frango e pão de forma", recipeName: "Salada 12 - Alface, Tomate Cereja, Cebola Roxa, Pimentões, Rúcula, Brócolis, Frango e Pão de Forma", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 13 - alface, tomate, palmito, cenoura, beterraba, macarrão e ovo de codorna", recipeName: "Salada 13 - Alface, Tomate, Palmito, Cenoura, Beterraba, Macarrão e Ovo de Codorna", category: "saladas de pote" },
  { imageUrl: "img/comidas.jpg", altText: "salada 14 - alface, tomate, palmito, cenoura, beterraba, milho e ervilha", recipeName: "Salada 14 - Alface, Tomate, Palmito, Cenoura, Beterraba, Milho e Ervilha", category: "saladas de pote" },

  { imageUrl: "img/comidas.jpg", altText: "molho branco", recipeName: "Molho Branco", category: "molhos" },
  { imageUrl: "img/comidas.jpg", altText: "molho de iogurte", recipeName: "Molho de Iogurte", category: "molhos" },
  { imageUrl: "img/comidas.jpg", altText: "molho caesar", recipeName: "Molho Caesar", category: "molhos" },
  { imageUrl: "img/comidas.jpg", altText: "molho de balsâmico e mel", recipeName: "Molho de Balsâmico e Mel", category: "molhos" },
  { imageUrl: "img/comidas.jpg", altText: "molho de ervas finas", recipeName: "Molho de Ervas Finas", category: "molhos" },

  // ... adicione mais receitas para outras letras
]);

// Agrupa as receitas por letra inicial
const recipesByLetter = computed(() => {
  const grouped = {};

  allRecipes.value
    .slice() // Cria uma cópia para não modificar o array original ao ordenar
    .sort((a, b) => a.recipeName.localeCompare(b.recipeName)) // Ordena alfabeticamente pelo nome da receita
    .forEach(recipe => {
      const firstLetter = recipe.recipeName.charAt(0).toUpperCase();

      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(recipe);
    });

  return grouped;
});

// Gera a lista de letras que têm receitas, para a navegação
const availableLetters = computed(() => {
  return Object.keys(recipesByLetter.value).sort();
});

const hasRecipes = computed(() => availableLetters.value.length > 0);

// TheNavbar e RecipeItemCard são esperados serem globalmente registrados ou auto-importados pelo Nuxt.
// Se RecipeItemCard não for, ele já foi importado em RecipeLetterSection.vue.
</script>