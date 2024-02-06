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
      selectedDay: null
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
      this.$emit('open-booking-details', booking)
    },

    selectResult(result) {
      this.selectedStation = result

      const apiBooking = `https://605c94c36d85de00170da8b4.mockapi.io/stations/${result.id}/bookings`

      fetch(apiBooking)
        .then((response) => response.json())
        .then((data) => {
          this.bookings = data
        })

        // VCalendar possible use

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
      <fieldset class="">
        <legend class="p-2 font-bold text-lg md:text-2xl">Search for station:</legend>
        <label for="input"></label>
        <input
          id="input"
          v-model="inputValue"
          @input="search"
          class="border-2 rounded border-blue-700"
        />
      </fieldset>
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
    <div v-if="selectedStation" class="mt-10">
      <h2 class="text-base md:text-2xl font-bold pb-2">
        Week View for: {{ selectedStation.name }}
      </h2>
      <div id="calendar-like">
        <div>
          <button class="text-xs pr-5">&lt; previous</button>
          <span class="font-bold">month & year</span>
          <button class="text-xs pl-5">next ></button>
        </div>
        <div id="week-view" class="m-8 grid grid-cols-1 md:grid-cols-7 gap-4">
          <div v-for="day in weekDays" :key="day" class="day-tile">
            <h3 className="font-bold text-lg">{{ day }}</h3>
            <ul>
              <li
                v-for="booking in getBookingsForDay(day)"
                :key="booking.id"
                @click="openBookingDetails(booking)"
              >
                {{ booking.customerName }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.week-view {
  display: flex;
  justify-content: space-between;
}

.day-tile {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px;
}

.day-tile h3 {
  text-align: center;
  margin-bottom: 5px;
}

.day-tile ul {
  list-style: none;
  padding: 0;
}

.day-tile li {
  margin-bottom: 5px;
}
</style>
