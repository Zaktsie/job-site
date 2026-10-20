<template>
  <CollapsibleAccordion header="Locations">
    <div class="mt-4">
      <input
        v-model.trim="locationSearchTerm"
        type="text"
        class="mb-4 h-10 w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
        placeholder="Filter by city (e.g. Lisbon, Tokyo)"
      />
      <fieldset>
        <ul class="flex max-h-48 flex-row flex-wrap overflow-y-auto">
          <li
            v-for="location in displayedLocations"
            :key="location"
            class="h-8 w-1/2 pr-2"
          >
            <input
              :id="`loc-${location}`"
              v-model="selectedLocations"
              :value="location"
              type="checkbox"
              class="mr-2"
              @change="selectLocation"
            />
            <label :for="`loc-${location}`" class="truncate text-xs">
              {{ location }}
            </label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";
import { useJobsStore } from "@/stores/jobs";
import {
  useUserStore,
  CLEAR_USER_JOB_FILTER_SELECTIONS,
} from "@/stores/user";

const router = useRouter();
const jobsStore = useJobsStore();
const userStore = useUserStore();

const selectedLocations = ref([...userStore.selectedLocations]);

const locationSearchTerm = computed({
  get() {
    return userStore.locationSearchTerm;
  },
  set(value) {
    userStore.UPDATE_LOCATION_SEARCH_TERM(value);
  },
});

const displayedLocations = computed(() =>
  Array.from(jobsStore.UNIQUE_LOCATIONS).sort()
);

const selectLocation = () => {
  userStore.ADD_SELECTED_LOCATIONS(selectedLocations.value);
  router.push({ name: "JobResults" });
};

userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_JOB_FILTER_SELECTIONS) {
      selectedLocations.value = [];
    }
  });
});
</script>
