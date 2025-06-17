<template>
  <nav class="text-center py-4 px-2 bg-white shadow-sm sticky top-[68px] z-10">
    <a
      v-for="letter in alphabet"
      :key="letter"
      :href="`#${letter}`"
      class="font-generic-cursive text-fuchsia-700 hover:text-purple-800 no-underline mx-1 text-2xl font-bold transition-colors duration-200"
    >
      {{ letter }}
    </a>
  </nav>
</template>

<script setup>
defineProps({
  alphabet: {
    type: Array,
    default: () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
  }
});
</script>