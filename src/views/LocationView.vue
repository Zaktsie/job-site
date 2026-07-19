<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Locations</h1>
    </template>

    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">
        More locations coming soon!
      </h2>
    </template>
  </header-container>
</template>

<script>
import HeaderContainer from "@/components/shared/headerContainer.vue";

export default {
  name: "LocationView",
  components: { HeaderContainer },
};
</script>
