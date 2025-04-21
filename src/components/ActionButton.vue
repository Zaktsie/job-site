

<template>
  <button  :class=" buttonClass"  >{{actionBtnText}}</button>
</template>

<script>
export default {
  name: "ActionButton",
  props: ["actionBtnText"],
  data() {
    return {
      primary: true,
    };
  },
  computed:  {
    buttonClass() {
      return { primary: this.primary, secondary: !this.primary}
    }
  }
}
</script>

<style scoped>

button {
  @apply rounded border-0 px-5 py-3 font-medium
}
.primary {
  @apply border-0 bg-brand-blue-1 text-white  hover:shadow-blue
}
.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white

}


</style>