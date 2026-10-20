<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-gray-3 bg-white"
    @submit.prevent="searchForJobs"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />

    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="role" class="absolute -top-10 left-0 font-normal"
          >Role</label
        >
        <TextInput id="role" v-model="role" placeholder="Software engineer" />
      </div>

      <span
        class="flex h-full items-center border-l border-r border-brand-gray-3 bg-brand-gray-2 px-3"
      >
        in
      </span>

      <div class="relative flex h-full flex-1 items-center pl-3">
        <label for="location" class="absolute -top-10 left-0 font-normal"
          >Where?</label
        >
        <TextInput id="location" v-model="location" placeholder="Cape Town" />
      </div>
    </div>

    <ActionButton text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { getActivePinia } from "pinia";

import ActionButton from "@/components/shared/ActionButton.vue";
import TextInput from "@/components/shared/TextInput.vue";
import { useUserStore } from "@/stores/user";

const role = ref("");
const location = ref("");

const instance = getCurrentInstance();

const searchForJobs = () => {
  if (getActivePinia()) {
    const userStore = useUserStore();
    userStore.UPDATE_SKILLS_SEARCH_TERM(role.value);
    userStore.UPDATE_LOCATION_SEARCH_TERM(location.value);
  }

  instance?.proxy?.$router?.push({
    name: "JobResults",
    query: { role: role.value, location: location.value },
  });
};
</script>
