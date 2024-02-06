<script>
import AutoComplete from './components/AutoComplete.vue'

export default {
  components: {
    AutoComplete
  },
  methods: {
    handleStationSelected(selectedStation) {
      console.log('Selected station:', selectedStation)
    }
  }
}
</script>

<template>
  <header class="text-center bg-[#6bbbae]">
    <h1 class="text-white italic text-3xl font-bold md:text-5xl">vanWave</h1>
    <p class="text-sm md:text-xl">*study case for RoadSurfer</p>
  </header>
  <main>
    <AutoComplete @station-selected="handleStationSelected" />
  </main>
</template>

<style scoped>
* {
  font-family: 'Encode Sans', sans-serif;
}

main {
  background-image: url('@/assets/imgUrl.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 600px; /* Make it cover the entire viewport height */
}
</style>
