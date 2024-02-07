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
  <header class="w-full text-center bg-[#6bbbae]">
    <h1 class="text-white italic text-3xl font-bold md:text-5xl">vanWave</h1>
    <p class="text-sm md:text-xl">*study case for RoadSurfer</p>
  </header>
  <main>
    <AutoComplete @result-selected="handleResultSelected" />
    <!-- <VCalendar :events="bookings" expanded view="weekly" /> -->
  </main>
</template>

<style></style>
