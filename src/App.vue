<script setup>
import AutoComplete from './components/AutoComplete.vue'
</script>

<template>
  <header class="text-center bg-[#6bbbae]">
    <h1 class="text-white italic text-3xl font-bold md:text-5xl">vanWave</h1>
    <p class="text-sm md:text-xl">*study case for RoadSurfer</p>
  </header>
  <main>
    <AutoComplete />
  </main>
</template>

<style scoped>
* {
  font-family: 'Encode Sans', sans-serif;
}
</style>
