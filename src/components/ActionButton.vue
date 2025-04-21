

<template>
  <button  :class="{primary: primary }">
  {{ text }}

  </button>
</template>

<script>
export default {
  name: "ActionButton",
  props: ["text"],
  data() {
    return {
      primary: true,
    }
  }

};
</script>

<style scoped>

button {
  @apply rounded border-0 px-5 py-3 font-medium ;
}
.primary {
  @apply border-0 bg-brand-blue-1 text-white hover:shadow-blue;
}
.secondary {
@apply border-0 bg-brand-blue-1 text-white hover:shadow-blue;
}

</style>