<template>
  <MainNav />
  <TheHero />
</template>
<script>
import MainNav from "./components/Navigation/MainNav.vue";
import TheHero from "./components/TheHero.vue";

export default {
  name: "App",
  components: {
    MainNav,
    TheHero,
  },
};
</script>

<style scoped>
h1 {
  color: purple !important;
}
</style>
