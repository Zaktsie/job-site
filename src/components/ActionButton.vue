<template>
  <button :class="buttonClass">{{ text }}</button>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    text: {
      type: String,
      required: false,
      default: "Sign In",
    },
    type: {
      type: String,
      default: "primary",
      required: false,
    },
  },
  computed: {
    buttonClass() {
      return {
        [this.type]: true,
      };
    },
  },
};
</script>

<style scoped>
button {
  @apply rounded border-0 px-5 py-3 font-medium;
}
.primary {
  @apply border-0 bg-brand-blue-1 text-white  hover:shadow-blue;
}
.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}
</style>
