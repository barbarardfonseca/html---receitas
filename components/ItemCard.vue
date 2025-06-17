<template>
  <div class="mb-4 cursor-pointer">
        <figure>
          <img class="w-full h-auto object-cover rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105" :src="url" :alt="alt">
          <figcaption class="text-center mt-2 text-gray-700"><slot/></figcaption>
        </figure>
      </div>
</template>

<script setup lang="ts">
defineProps<{
  url: string;
  alt?: string;
}>()
</script>