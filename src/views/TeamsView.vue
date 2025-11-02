<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-semibold">Teams</h1>
    </template>

    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">
        Its great working here, why dont you join us?
      </h2>
    </template>
  </header-container>
</template>
<script>
import HeaderContainer from "../components/shared/headerContainer.vue";
export default {
  name: "TeamsView",
  components: { HeaderContainer },
};
</script>
<style scoped></style>
