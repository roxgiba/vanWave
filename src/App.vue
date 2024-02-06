<script>
import AutoComplete from './components/AutoComplete.vue'

export default {
  components: {
    AutoComplete
  },
  data() {
    return {
      bookings: []
    }
  },
  methods: {
    handleResultSelected(bookings) {
      console.log('handleResultSelected called', bookings)
      // Update the 'bookings' data in the parent component
      this.bookings = bookings
      console.log('Parent component bookings:', this.bookings)
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
    <AutoComplete @result-selected="handleResultSelected" />
    <!-- <VCalendar :events="bookings" expanded view="weekly" /> -->
  </main>
</template>

<style scoped>
* {
  font-family: 'Encode Sans', sans-serif;
}

/* main {
  background-image: url('@/assets/imgUrl.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 600px; /* Make it cover the entire viewport height 
}

*/
</style>
