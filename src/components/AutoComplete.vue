<script>
export default {
  data() {
    return {
      inputValue: '',
      results: []
    }
  },
  methods: {
    search() {
      const api = `https://605c94c36d85de00170da8b4.mockapi.io/stations?search=${this.inputValue}`
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          this.results = data
        })
    }
  }
}
</script>

<template>
  <div class="text-center m-5">
    <label>Search for station: </label>
    <input v-model="inputValue" @input="search" class="border-2 rounded border-blue-700" />
  </div>
  <div>
    <ul>
      <li></li>
    </ul>
  </div>
</template>
