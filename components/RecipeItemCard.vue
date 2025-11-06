<template>
  <div
    :data-categoria="category"
    class="recipe-item flex items-center bg-fuchsia-100 p-4 rounded-lg shadow-md mb-4 hover:shadow-xl transition-all duration-300 ease-in-out"
  >
    <img
      :src="imageUrl"
      :alt="altText"
      class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover mr-4"
    >
    <div class="text-gray-700 text-base sm:text-lg">{{ recipeName }}</div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
</script>
