<template>
  <div>
    <HeaderContainer>
      <template #title>
        <h1 class="w-full text-4xl font-normal">Locations</h1>
      </template>

      <template #subtitle>
        <h2 class="my-4 w-full text-base font-light">
          Our large — and growing — engineering and business hubs around the
          world.
        </h2>
      </template>
    </HeaderContainer>

    <section class="mx-auto max-w-6xl px-8 py-12">
      <div class="mx-auto mb-8 max-w-md">
        <input
          v-model.trim="searchQuery"
          type="text"
          class="h-12 w-full rounded-3xl border border-solid border-brand-gray-3 px-5 text-sm focus:border-brand-blue-1 focus:outline-none"
          placeholder="Search locations (e.g. London, Tokyo, San Francisco)"
        />
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <button
          v-for="loc in filteredLocations"
          :key="loc.name"
          type="button"
          class="flex flex-col items-start justify-between rounded-lg border border-solid border-brand-gray-1 bg-white p-5 text-left transition-shadow hover:shadow-gray"
          @click="viewJobsInLocation(loc.name)"
        >
          <h3 class="text-lg font-medium text-gray-900">{{ loc.name }}</h3>
          <p class="mt-2 text-sm text-brand-blue-1">
            {{ loc.count }} {{ loc.count === 1 ? "job" : "jobs" }} available
            &rarr;
          </p>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { getActivePinia } from "pinia";
import { useRouter } from "vue-router";

import HeaderContainer from "@/components/shared/HeaderContainer.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const instance = getCurrentInstance();
const vueRouter = useRouter();
const jobsStore = getActivePinia() ? useJobsStore() : null;
const userStore = getActivePinia() ? useUserStore() : null;

const searchQuery = ref("");

const defaultLocations = [
  "San Francisco",
  "New York",
  "London",
  "Tokyo",
  "Lisbon",
  "Berlin",
  "Zürich",
  "Toronto",
  "Sydney",
  "Singapore",
  "São Paulo",
  "Bangalore",
];

onMounted(() => {
  if (jobsStore && jobsStore.jobs.length === 0) {
    jobsStore.FETCH_JOBS();
  }
});

const allLocationsWithCounts = computed(() => {
  const counts = new Map();
  if (jobsStore && jobsStore.jobs.length > 0) {
    jobsStore.jobs.forEach((job) => {
      (job.locations || []).forEach((city) => {
        counts.set(city, (counts.get(city) || 0) + 1);
      });
    });
  } else {
    defaultLocations.forEach((city) => counts.set(city, 1));
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
});

const filteredLocations = computed(() => {
  const q = searchQuery.value.toLowerCase();
  if (!q) return allLocationsWithCounts.value;
  return allLocationsWithCounts.value.filter((loc) =>
    loc.name.toLowerCase().includes(q)
  );
});

const viewJobsInLocation = (city) => {
  if (userStore) {
    userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();
    userStore.UPDATE_LOCATION_SEARCH_TERM(city);
  }
  const router = vueRouter || instance?.proxy?.$router;
  if (router) {
    router.push({ name: "JobResults", query: { location: city } });
  }
};
</script>
