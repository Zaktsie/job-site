<script setup>
import MainNav from "./components/MainNav.vue";
</script>
<template>
  <MainNav />
</template>
<script>
import MainNav from "./components/MainNav.vue";

export default {
  name: "App",
  components: {
    MainNav,
  },
};

</script>

<style scoped>
 h1 {
  color: purple !important;
 }
</style>
