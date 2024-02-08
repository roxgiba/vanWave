<template>
  <form class="">
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

  <div v-if="loading" class="flex justify-center py-2">Loading...</div>

  <div v-if="showResults && !loading" class="flex justify-center py-2">
    <ul class="w-full md:w-1/5 mt-1 center border border-gray-300 rounded-md bg-white/60">
      <li
        v-for="result in results"
        :key="result.id"
        @click="selectResult(result)"
        class="border-b border-gray-200 text-stone-600 cursor-pointer hover:bg-gray-100 transition-colors"
      >
        {{ result.name }}
      </li>
    </ul>
  </div>
  <div v-if="!loading && showResults && results.length === 0" class="text-black">
    City not found
  </div>
</template>

<script>
import axios from 'axios'

export default {
  emits: ['result-selected'],
  data() {
    return {
      inputValue: '',
      results: [],
      showResults: false,
      loading: false
    }
  },
  methods: {
    search() {
      this.loading = true
      this.cityNotFound = false

      const api = `https://605c94c36d85de00170da8b4.mockapi.io/stations?search=${this.inputValue}`

      axios
        .get(api)
        .then((response) => {
          this.results = response.data
          this.showResults = true
          this.cityNotFound = this.results.length === 0
        })
        .catch((error) => {
          console.error('City not found', error)
          this.cityNotFound = true
        })
        .finally(() => {
          this.loading = false
        })
    },
    selectResult(result) {
      this.$emit('result-selected', result)
      this.showResults = false
      this.inputValue = ''
      console.log('something was selected')
    }
  }
}
</script>

<style></style>
