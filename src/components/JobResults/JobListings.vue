<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <div
      class="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-solid border-brand-gray-1 pb-4"
    >
      <div class="flex flex-wrap items-center gap-2">
        <span
          v-if="userStore.skillsSearchTerm"
          class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
        >
          Role: {{ userStore.skillsSearchTerm }}
          <button
            type="button"
            class="ml-1 font-bold hover:text-gray-900"
            @click="userStore.UPDATE_SKILLS_SEARCH_TERM('')"
          >
            &times;
          </button>
        </span>

        <span
          v-if="userStore.locationSearchTerm"
          class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
        >
          City: {{ userStore.locationSearchTerm }}
          <button
            type="button"
            class="ml-1 font-bold hover:text-gray-900"
            @click="userStore.UPDATE_LOCATION_SEARCH_TERM('')"
          >
            &times;
          </button>
        </span>

        <span
          v-for="org in userStore.selectedOrganizations"
          :key="`org-${org}`"
          class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
        >
          {{ org }}
          <button
            type="button"
            class="ml-1 font-bold hover:text-gray-900"
            @click="removeOrganization(org)"
          >
            &times;
          </button>
        </span>

        <span
          v-for="type in userStore.selectedJobTypes"
          :key="`type-${type}`"
          class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
        >
          {{ type }}
          <button
            type="button"
            class="ml-1 font-bold hover:text-gray-900"
            @click="removeJobType(type)"
          >
            &times;
          </button>
        </span>

        <span
          v-for="deg in userStore.selectedDegrees"
          :key="`deg-${deg}`"
          class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
        >
          {{ deg }}
          <button
            type="button"
            class="ml-1 font-bold hover:text-gray-900"
            @click="removeDegree(deg)"
          >
            &times;
          </button>
        </span>

        <span
          v-for="loc in userStore.selectedLocations"
          :key="`loc-${loc}`"
          class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
        >
          {{ loc }}
          <button
            type="button"
            class="ml-1 font-bold hover:text-gray-900"
            @click="removeLocation(loc)"
          >
            &times;
          </button>
        </span>

        <span
          v-if="userStore.onlySavedJobs"
          class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
        >
          Saved jobs only
          <button
            type="button"
            class="ml-1 font-bold hover:text-gray-900"
            @click="userStore.SET_ONLY_SAVED_JOBS(false)"
          >
            &times;
          </button>
        </span>
      </div>

      <div class="ml-auto flex items-center gap-2 text-xs text-gray-600">
        <label for="sort-jobs" class="font-medium">Sort by:</label>
        <select
          id="sort-jobs"
          :value="userStore.sortBy"
          class="rounded border border-solid border-brand-gray-1 bg-white px-2.5 py-1.5 text-xs text-gray-800 focus:border-brand-blue-1 focus:outline-none"
          @change="userStore.UPDATE_SORT_BY($event.target.value)"
        >
          <option value="relevance">Relevance</option>
          <option value="date">Date added (Newest)</option>
        </select>
      </div>
    </div>

    <div
      v-if="FILTERED_JOBS.length === 0 && jobsStore.jobs.length > 0"
      class="mx-auto my-12 max-w-lg rounded-lg border border-solid border-brand-gray-1 bg-white p-8 text-center shadow-sm"
    >
      <h2 class="mb-2 text-xl font-medium text-gray-800">
        No matching jobs found
      </h2>
      <p class="mb-6 text-sm text-brand-gray-3">
        Try adjusting your search terms or clearing active filters to see more
        opportunities.
      </p>
      <ActionButton
        text="Clear Filters"
        type="primary"
        @click="userStore.CLEAR_USER_JOB_FILTER_SELECTIONS"
      />
    </div>

    <ol>
      <JobListing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted } from "vue";

import ActionButton from "@/components/shared/ActionButton.vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { useDegreesStore } from "@/stores/degrees";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

const jobsStore = useJobsStore();
const degreesStore = useDegreesStore();
const userStore = useUserStore();

onMounted(() => {
  jobsStore.FETCH_JOBS();
  degreesStore.FETCH_DEGREES();
});

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

const instance = getCurrentInstance();
const currentPage = computed(() =>
  Number.parseInt(instance?.proxy?.$route?.query?.page || "1")
);
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage
);

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});

const removeOrganization = (org) => {
  userStore.ADD_SELECTED_ORGANIZATIONS(
    userStore.selectedOrganizations.filter((item) => item !== org)
  );
};

const removeJobType = (type) => {
  userStore.ADD_SELECTED_JOB_TYPES(
    userStore.selectedJobTypes.filter((item) => item !== type)
  );
};

const removeDegree = (deg) => {
  userStore.ADD_SELECTED_DEGREES(
    userStore.selectedDegrees.filter((item) => item !== deg)
  );
};

const removeLocation = (loc) => {
  userStore.ADD_SELECTED_LOCATIONS(
    userStore.selectedLocations.filter((item) => item !== loc)
  );
};
</script>
