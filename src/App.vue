<template>
  <MainNav />
  <router-view />
  <TheFooter />
</template>

<script setup>
import MainNav from "@/components/Navigation/MainNav.vue";
import TheFooter from "@/components/Navigation/TheFooter.vue";
</script>
