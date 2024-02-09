<template>
  <div v-if="selectedStation" class="mt-10 bg-stone-300/80 p-3 rounded-lg">
    <h2 class="text-lg md:text-2xl font-bold pb-2">
      Week View for:
      <span class="text-xl md:text-3xl tracking-wide underline">{{ selectedStation.name }}</span>
    </h2>
    <VCalendar view="weekly" transparent borderless locale="en-US" class="m-3" h-10 />
    <div id="calendar-like">
      <!-- <div class="p-6">
        <button class="text-xs pr-5" @click="prevMonth">&lt; previous</button>
        <span class="font-bold">{{ currentMonthAndYear }}</span>
        <button class="text-xs pl-5" @click="nextMonth">next ></button>
      </div> -->

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
</template>

<script>
export default {
  props: {
    selectedStation: Object,
    weekDays: Array,
    bookings: Array
  },

  data() {
    return {
      selectedBooking: null,
      currentDate: new Date(),
      currentMonthAndYear: ''
    }
  },

  methods: {
    getBookingsForDay(day) {
      // Return the bookings for the selected day
      return this.bookings.filter(
        (booking) => new Date(booking.startDate).getDay() === this.weekDays.indexOf(day)
      )
    },

    openBookingDetails(booking) {
      this.$emit('open-booking-details', booking)
      this.selectedBooking = booking
      console.log('opening modal')
    }

    // updateMonthAndYear() {
    //   const options = { month: 'long', year: 'numeric' }
    //   this.currentMonthAndYear = this.currentDate.toLocaleDateString('en-GB', options)
    // },

    // prevMonth() {
    //   this.currentDate.setMonth(this.currentDate.getMonth() - 1)
    //   this.updateMonthAndYear()
    // },

    // nextMonth() {
    //   this.currentDate.setMonth(this.currentDate.getMonth() + 1)
    //   this.updateMonthAndYear()
    // },
  }
}
</script>
