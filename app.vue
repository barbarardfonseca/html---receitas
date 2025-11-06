<template>
  <Navbar />
  <NuxtPage />
</template>

<script lang="ts" setup>
const { $fetchLogin } = useNuxtApp();

onMounted(() => {
  $fetchLogin();
});

</script>