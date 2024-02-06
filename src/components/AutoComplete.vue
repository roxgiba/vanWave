<script>
export default {
  data() {
    return {
      inputValue: '',
      results: [],
      showResults: false,
      selectedStation: ''
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
    selectResult(result) {
      this.selectedStation = result

      const apiBooking = `https://605c94c36d85de00170da8b4.mockapi.io/stations/${result.id}/bookings`

      fetch(apiBooking)
        .then((response) => response.json())
        .then((data) => {
          this.bookings = data
        })
        .catch((error) => error)

      this.$emit('result-selected', result)
      this.showResults = false
      this.inputValue = ''
    }
  }
}
</script>

<template>
  <div class="text-center m-5">
    <label>Search for station: </label>
    <input v-model="inputValue" @input="search" class="border-2 rounded border-blue-700" />

    <div v-if="showResults">
      <ul>
        <li v-for="result in results" :key="result.id" @click="selectResult(result)">
          {{ result.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
