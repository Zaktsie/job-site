<template>
  <div class="min-h-screen bg-brand-gray-2 pb-16 pt-8">
    <div class="mx-auto max-w-5xl px-8">
      <div class="mb-6">
        <router-link
          :to="{ name: 'JobResults' }"
          class="text-sm font-medium text-brand-blue-1 hover:underline"
        >
          &larr; Back to job results
        </router-link>
      </div>

      <div
        v-if="job"
        class="rounded-lg border border-solid border-brand-gray-1 bg-white p-8 shadow-sm"
      >
        <div
          class="flex flex-col justify-between gap-4 border-b border-solid border-brand-gray-1 pb-6 md:flex-row md:items-start"
        >
          <div>
            <h1 class="mb-3 text-3xl font-normal text-gray-900">
              {{ job.title }}
            </h1>
            <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span class="font-semibold text-gray-800">{{
                job.organization
              }}</span>
              <span>&bull;</span>
              <span>{{ job.locations.join(", ") }}</span>
              <span v-if="job.jobType">&bull;</span>
              <span
                v-if="job.jobType"
                class="rounded-full bg-brand-gray-2 px-3 py-0.5 text-xs font-medium text-gray-700"
              >
                {{ job.jobType }}
              </span>
              <span
                v-if="job.degree"
                class="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-brand-blue-1"
              >
                {{ job.degree }}
              </span>
            </div>
            <p v-if="job.dateAdded" class="mt-2 text-xs text-brand-gray-3">
              Posted on {{ job.dateAdded }} &bull; Job ID: {{ currentJobId }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <ActionButton
              :text="copiedLink ? 'Link copied!' : 'Share'"
              type="secondary"
              @click="shareJob"
            />
            <ActionButton
              :text="isSaved ? 'Saved ★' : 'Save job'"
              type="secondary"
              @click="toggleSaveJob"
            />
            <ActionButton
              :text="isApplied ? 'Applied ✓' : 'Apply'"
              type="primary"
              @click="openApplyModal"
            />
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 class="mb-3 text-lg font-medium text-gray-900">
              Minimum qualifications:
            </h2>
            <ul class="list-disc space-y-2 pl-5 text-sm text-gray-700">
              <li
                v-for="qualification in job.minimumQualifications"
                :key="qualification"
              >
                {{ qualification }}
              </li>
            </ul>
          </div>

          <div v-if="job.preferredQualifications?.length">
            <h2 class="mb-3 text-lg font-medium text-gray-900">
              Preferred qualifications:
            </h2>
            <ul class="list-disc space-y-2 pl-5 text-sm text-gray-700">
              <li
                v-for="qualification in job.preferredQualifications"
                :key="qualification"
              >
                {{ qualification }}
              </li>
            </ul>
          </div>
        </div>

        <div
          v-if="job.description?.length"
          class="mt-8 border-t border-solid border-brand-gray-1 pt-6"
        >
          <h2 class="mb-4 text-lg font-medium text-gray-900">About the job</h2>
          <div class="space-y-4 text-sm leading-relaxed text-gray-700">
            <p v-for="(paragraph, index) in job.description" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-else
        class="rounded-lg border border-solid border-brand-gray-1 bg-white p-8 text-center"
      >
        <h1 class="text-xl font-medium text-gray-800">
          Job Page for job {{ currentJobId }}
        </h1>
        <p class="mt-2 text-sm text-brand-gray-3">
          Select a job from the results page to view full details.
        </p>
      </div>

      <div v-if="relatedJobs.length > 0" class="mt-10">
        <h2 class="mb-4 text-xl font-normal text-gray-900">
          Similar jobs at {{ job?.organization }}
        </h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <router-link
            v-for="related in relatedJobs"
            :key="related.id"
            :to="`/jobs/results/${related.id}`"
            class="block rounded-lg border border-solid border-brand-gray-1 bg-white p-5 transition-shadow hover:shadow-gray"
          >
            <h3 class="font-medium text-brand-blue-1">{{ related.title }}</h3>
            <p class="mt-1 text-xs text-gray-600">
              {{ related.organization }} &bull;
              {{ related.locations?.join(", ") }}
            </p>
            <span
              class="mt-3 inline-block rounded-full bg-brand-gray-2 px-2.5 py-0.5 text-xs text-gray-700"
            >
              {{ related.jobType }}
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showApplyModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 class="mb-2 text-xl font-medium text-gray-900">
            Apply for {{ job?.title }}
          </h2>
          <p class="mb-4 text-xs text-gray-600">
            {{ job?.organization }} &bull; {{ job?.locations?.join(", ") }}
          </p>

          <form class="space-y-4" @submit.prevent="submitApplication">
            <div>
              <label
                for="applicant-name"
                class="mb-1 block text-xs font-medium text-gray-700"
                >Full Name</label
              >
              <input
                id="applicant-name"
                v-model="applicantName"
                required
                type="text"
                class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label
                for="applicant-email"
                class="mb-1 block text-xs font-medium text-gray-700"
                >Email Address</label
              >
              <input
                id="applicant-email"
                v-model="applicantEmail"
                required
                type="email"
                class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label
                for="applicant-note"
                class="mb-1 block text-xs font-medium text-gray-700"
                >Cover Note / Portfolio Link</label
              >
              <textarea
                id="applicant-note"
                v-model="applicantNote"
                rows="3"
                class="w-full rounded border border-solid border-brand-gray-1 p-2.5 text-sm focus:border-brand-blue-1 focus:outline-none"
                placeholder="Tell us why you're excited about this role..."
              ></textarea>
            </div>

            <div class="flex justify-end gap-3 pt-2">
              <ActionButton
                text="Cancel"
                type="secondary"
                @click="showApplyModal = false"
              />
              <ActionButton text="Submit Application" type="primary" />
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { getActivePinia } from "pinia";
import { useRoute } from "vue-router";

import ActionButton from "@/components/shared/ActionButton.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const instance = getCurrentInstance();
const vueRoute = useRoute();

const currentJobId = computed(() => {
  const activeRoute = vueRoute || instance?.proxy?.$route;
  return activeRoute?.params?.id;
});

const jobsStore = getActivePinia() ? useJobsStore() : null;
const userStore = getActivePinia() ? useUserStore() : null;

onMounted(() => {
  if (jobsStore && jobsStore.jobs.length === 0) {
    jobsStore.FETCH_JOBS();
  }
});

const job = computed(() => {
  if (!jobsStore) return null;
  return jobsStore.GET_JOB_BY_ID(currentJobId.value);
});

const relatedJobs = computed(() => {
  if (!jobsStore || !job.value) return [];
  return jobsStore.jobs
    .filter(
      (item) =>
        item.organization === job.value.organization &&
        String(item.id) !== String(job.value.id)
    )
    .slice(0, 3);
});

const isSaved = computed(() =>
  userStore ? userStore.isJobSaved(currentJobId.value) : false
);
const isApplied = computed(() =>
  userStore ? userStore.isJobApplied(currentJobId.value) : false
);

const toggleSaveJob = () => {
  if (userStore) {
    userStore.TOGGLE_SAVED_JOB(currentJobId.value);
  }
};

const copiedLink = ref(false);
const shareJob = () => {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
  }
  copiedLink.value = true;
  setTimeout(() => {
    copiedLink.value = false;
  }, 2000);
};

const showApplyModal = ref(false);
const applicantName = ref("");
const applicantEmail = ref("");
const applicantNote = ref("");

const openApplyModal = () => {
  if (!isApplied.value) {
    if (userStore?.isLoggedIn && userStore.userProfile) {
      applicantName.value = applicantName.value || userStore.userProfile.name || "";
      applicantEmail.value = applicantEmail.value || userStore.userProfile.email || "";
      applicantNote.value =
        applicantNote.value || userStore.userProfile.portfolioUrl || "";
    }
    showApplyModal.value = true;
  }
};

const submitApplication = () => {
  if (userStore) {
    userStore.APPLY_TO_JOB(currentJobId.value);
  }
  showApplyModal.value = false;
};
</script>
