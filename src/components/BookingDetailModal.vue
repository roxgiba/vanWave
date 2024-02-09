<template>
  <div
    v-if="selectedBooking"
    class="fixed top-24 left-0 md:top-30 w-full h-full bg-black/50 flex items-center justify-center"
  >
    <div class="bg-white p-5 rounded-md">
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
</template>

<script>
export default {
  props: {
    selectedBooking: Object,
    selectedStation: Object
  },
  methods: {
    calculateDuration(startDate, endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      const durationInMilliseconds = end - start
      const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24)

      return `${Math.floor(durationInDays)} days`
    },
    closeBookingDetails() {
      this.$emit('close-booking-details')
    }
  }
}
</script>
