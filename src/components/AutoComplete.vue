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
        .catch((error) => {
          error
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
  </div>
</template>

<style></style>
