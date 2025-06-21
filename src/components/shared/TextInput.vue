<template>
  <input
    type="text"
    :value="value"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>
<script>
export default {
  name: "TextInput",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  emits: ["handleInput"],
  methods: {
    handleInput($event) {
      this.$emit("handleInput", $event.target.value);
    },
  },
};
</script>
