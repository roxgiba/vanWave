<script>
export default {
  data() {
    return {
      inputValue: '',
      results: [],
      showResults: false,
      selectedStation: '',
      bookings: [],
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      selectedDay: null,
      selectedBooking: null
    }
  },
  methods: {
    search() {
      const api = `https://605c94c36d85de00170da8b4.mockapi.io/stations?search=${this.inputValue}`
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          this.results = data
          this.showResults = true
        })
    },
    getBookingsForDay(day) {
      // Return the bookings for the selected day
      return this.bookings.filter(
        (booking) => new Date(booking.startDate).getDay() === this.weekDays.indexOf(day)
      )
    },

    openBookingDetails(booking) {
      this.selectedBooking = booking
    },
    closeBookingDetails() {
      this.selectedBooking = null
    },

    calculateDuration(startDate, endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      const durationInMilliseconds = end - start
      const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24)

      return `${Math.floor(durationInDays)} days`
    },

    selectResult(result) {
      this.selectedStation = result

      const apiBooking = `https://605c94c36d85de00170da8b4.mockapi.io/stations/${result.id}/bookings`

      fetch(apiBooking)
        .then((response) => response.json())
        .then((data) => {
          this.bookings = data
        })

        // ** VCalendar possible use

        // .then((data) => {
        //   const bookings = data.map((booking) => ({
        //     title: result.name,
        //     startDate: new Date(booking.startDate),
        //     endDate: new Date(booking.endDate)
        //   }))
        //   this.$emit('result-selected', bookings)
        // })
        .catch((error) => {
          console.log('Error fetching booking:', error)
        })

      this.$emit('result-selected', result)
      this.showResults = false
      this.inputValue = ''
    }
  }
}
</script>

<template>
  <div class="text-center m-5">
    <form>
      <label for="input" class="p-2 font-bold text-lg md:text-2xl">
        Search for station:
        <input
          id="input"
          v-model="inputValue"
          @input="search"
          class="font-normal border-2 rounded border-blue-700"
        />
      </label>
    </form>
    <div v-if="showResults" class="flex justify-center py-2">
      <ul class="w-full md:w-1/5 mt-1 center border border-gray-300 rounded-md bg-white/60">
        <li
          v-for="result in results"
          :key="result.id"
          @click="selectResult(result)"
          class="border-b border-gray-200 text-stone-600cursor-pointer hover:bg-gray-100 transition-colors"
        >
          {{ result.name }}
        </li>
      </ul>
    </div>
    <!-- WEEK VIEW -->
    <div v-if="selectedStation" class="mt-10 bg-stone-300/80 p-3 rounded-lg">
      <h2 class="text-xl md:text-2xl font-bold pb-2">Week View for: {{ selectedStation.name }}</h2>
      <div id="calendar-like">
        <div>
          <button class="text-xs pr-5">&lt; previous</button>
          <span class="font-bold">month & year</span>
          <button class="text-xs pl-5">next ></button>
        </div>
        <div id="week-view" class="m-8 grid grid-cols-1 md:grid-cols-7 gap-4">
          <div v-for="day in weekDays" :key="day" class="day-tile rounded-md">
            <h3 className="font-bold text-lg bg-white/50 ">{{ day }}</h3>
            <ul>
              <li
                v-for="booking in getBookingsForDay(day)"
                :key="booking.id"
                @click="openBookingDetails(booking)"
                class="cursor-pointer text-blue-600 hover:bg-gray-100/50 rounded transition-colors"
              >
                {{ booking.customerName }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Booking Details -->
    <div
      v-if="selectedBooking"
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-8 rounded-md">
        <h2 class="text-lg font-bold mb-4">Customer's Booking Details</h2>
        <p><strong>Full Name: </strong>{{ selectedBooking.customerName }}</p>
        <p><strong>Start Date: </strong> {{ selectedBooking.startDate.slice(0, 10) }}</p>
        <p><strong>End Date: </strong> {{ selectedBooking.endDate.slice(0, 10) }}</p>
        <p>
          <strong>Duration: </strong
          >{{ calculateDuration(selectedBooking.startDate, selectedBooking.endDate) }}
        </p>
        <p><strong>Return Station: </strong>{{ selectedStation.name }}</p>

        <button @click="closeBookingDetails" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
