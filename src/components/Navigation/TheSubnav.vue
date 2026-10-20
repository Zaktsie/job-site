<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center justify-between px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span>
          <span class="font-semibold text-brand-green-1">{{
            FILTERED_JOBS.length
          }}</span>
          jobs matched
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";

import { useJobsStore } from "@/stores/jobs";

const instance = getCurrentInstance();
const jobsStore = useJobsStore();

const onJobResultsPage = computed(
  () => instance?.proxy?.$route?.name === "JobResults"
);

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
</script>
