<template>
  <main-nav />
  <the-subnav />
  <router-view />
</template>
<script>
import MainNav from "@/components/Navigation/MainNav.vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";
export default {
  name: "App",
  components: {
    MainNav,
    TheSubnav,
  },
};
</script>

<style scoped>
h1 {
  color: purple !important;
}
</style>
