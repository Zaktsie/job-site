<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-gray-3"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label class="absolute left-0 -top-10">Role</label>
        <text-input
          placeholder="Software Engineer"
          @handle-input="role = $event"
        />
      </div>
      <span
        class="flex h-full items-center border-l border-r border-brand-gray-3 bg-brand-gray-2 px-3"
      >
        in
      </span>
      <div class="relative flex h-full flex-1 items-center pl-3">
        <label class="absolute left-0 -top-10">Location?</label>
        <text-input placeholder="Cape Town" @handle-input="location = $event" />
      </div>
    </div>
    <action-button text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import actionButton from "@/components/ActionButton.vue";
import TextInput from "@/components/shared/TextInput.vue";

export default {
  name: "JobSearchForm",
  components: { TextInput, FontAwesomeIcon, actionButton },
  data() {
    return {
      role: "",
      location: "",
    };
  },
  methods: {},
};
</script>
