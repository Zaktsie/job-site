<template>
  <li class="mb-7">
    <router-link
      :to="jobPageLink"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white transition-shadow hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pb-2 pt-5">
        <div class="flex items-start justify-between">
          <h2 class="mb-2 text-2xl font-medium text-gray-900">
            {{ job.title }}
          </h2>
          <div class="flex items-center gap-2">
            <span
              v-if="isApplied"
              class="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-brand-green-1"
            >
              Applied ✓
            </span>
            <span
              v-if="job.jobType"
              class="rounded-full bg-brand-gray-2 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {{ job.jobType }}
            </span>
            <span
              v-if="job.degree"
              class="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
            >
              {{ job.degree }}
            </span>
            <button
              v-if="userStore && job.id"
              type="button"
              class="ml-1 rounded px-2 py-1 text-xs font-medium text-brand-blue-1 hover:bg-blue-50"
              @click.prevent="userStore.TOGGLE_SAVED_JOB(job.id)"
            >
              {{ isSaved ? "Saved ★" : "Save ☆" }}
            </button>
          </div>
        </div>

        <div class="flex flex-row align-middle text-sm text-gray-600">
          <div class="mr-5 font-medium text-gray-800">
            <span>{{ job.organization }}</span>
          </div>

          <div>
            <ul>
              <li
                v-for="location in job.locations"
                :key="location"
                class="mr-5 inline-block"
              >
                <span>{{ location }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <h3 class="mb-2 mt-1 font-medium">Qualifications:</h3>
          <div>
            <ul class="list-disc pl-8 text-sm text-gray-700">
              <li
                v-for="qualification in job.minimumQualifications"
                :key="qualification"
              >
                {{ qualification }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-2 text-center">
          <span class="text-sm font-medium text-brand-blue-1 hover:underline">
            Expand
          </span>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script setup>
import { computed } from "vue";
import { getActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});

const userStore = getActivePinia() ? useUserStore() : null;

const jobPageLink = computed(() => `/jobs/results/${props.job.id}`);
const isSaved = computed(() =>
  userStore && props.job.id ? userStore.isJobSaved(props.job.id) : false
);
const isApplied = computed(() =>
  userStore && props.job.id ? userStore.isJobApplied(props.job.id) : false
);
</script>
