<template>
  <h1 class="text-6xl font-bold">Job Results Page</h1>
  <button @click="goToHome">Go to home</button>
</template>

<script>
export default {
  name: "JobsResultsView",
  methods: {
    goToHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
