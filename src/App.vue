<template>
  <header class="w-full text-center bg-[#6bbbae] p-2 flex justify-between">
    <h1 className="text-4xl font-bold md:text-6xl p-5 italic">VanWave</h1>

    <button
      class="font-semibold text-lg pl-2 pr-2 md:2xl cursor-pointer hover:text-blue-800 bg-slate-200 h-8 place-self-center md:mr-20 rounded"
      @click="resetPage"
    >
      Home
    </button>
  </header>

  <main>
    <div class="text-center m-5">
      <AutoComplete @result-selected="selectResult" />
      <div v-if="loading" class="text-2xl text-gray-500">Loading...</div>
      <WeekView
        v-else
        :selectedStation="selectedStation"
        :weekDays="weekDays"
        :bookings="bookings"
        @open-booking-details="openBookingDetails"
      />
      <BookingDetailModal
        :selectedBooking="selectedBooking"
        :selectedStation="selectedStation"
        :bookings="bookings"
        @close-booking-details="closeBookingDetails"
      />
    </div>
  </main>
</template>

<script>
import AutoComplete from './components/AutoComplete.vue'
import WeekView from './components/WeekView.vue'
import BookingDetailModal from './components/BookingDetailModal.vue'

import axios from 'axios'

export default {
  components: {
    AutoComplete,
    WeekView,
    BookingDetailModal
  },
  data() {
    return {
      inputValue: '',
      results: [],
      showResults: false,
      selectedStation: null,
      bookings: [],
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      selectedDay: null,
      selectedBooking: null,
      loading: false
    }
  },

  methods: {
    selectResult(result) {
      this.selectedStation = result
      this.loading = true

      const apiBooking = `https://605c94c36d85de00170da8b4.mockapi.io/stations/${result.id}/bookings`

      axios
        .get(apiBooking)
        .then((response) => {
          this.bookings = response.data
        })
        .catch((error) => {
          console.log('Error fetching booking:', error)
        })
        .finally(() => {
          this.loading = false
        })

      this.$emit('result-selected', result)
      this.showResults = false
      this.inputValue = ''
    },
    openBookingDetails(booking) {
      this.selectedBooking = booking
    },

    closeBookingDetails() {
      this.selectedBooking = null
    },
    resetPage() {
      ;(this.inputValue = ''),
        (this.results = []),
        (this.showResults = false),
        (this.selectedStation = null),
        (this.bookings = []),
        (this.weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']),
        (this.selectedDay = null),
        (this.selectedBooking = null),
        (this.loading = false)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Encode+Sans:wght@300;400;700&display=swap');
</style>
