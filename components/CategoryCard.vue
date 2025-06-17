<template>
  <div class="mb-4">
    <div class="bg-purple-100 p-6 rounded-lg text-center transition duration-300 hover:bg-purple-300 shadow">
      <h4 class="text-lg font-semibold">
        <NuxtLink :to="categoryLink" class="no-underline text-purple-700 hover:text-purple-800">
          {{ categoryName }}
        </NuxtLink>
      </h4>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categoryName: { type: String, required: true },
  categoryLink: { type: String, required: true }
});
</script>