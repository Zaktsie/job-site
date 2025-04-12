

<template>
  <button  class="primary"  >{{actionBtnText}}</button>
</template>

<script>
export default {
  name: "ActionButton",
  props: ["actionBtnText"]

}
</script>

<style scoped>

button {
  @apply rounded border-0 px-5 py-3
}
.primary {
  @apply border-0 bg-brand-blue-1 text-white  hover:shadow-blue
}

.secondary {

}


</style>