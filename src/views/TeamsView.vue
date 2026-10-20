<template>
  <div>
    <HeaderContainer>
      <template #title>
        <h1 class="w-full text-4xl font-normal">Teams</h1>
      </template>

      <template #subtitle>
        <h2 class="my-4 w-full text-base font-light">
          It's awesome working here. Why don't you come join us?
        </h2>
      </template>
    </HeaderContainer>

    <section class="mx-auto max-w-6xl px-8 py-12">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="team in teams"
          :key="team.name"
          class="flex flex-col justify-between rounded-lg border border-solid border-brand-gray-1 bg-white p-6 transition-shadow hover:shadow-gray"
        >
          <div>
            <div class="mb-2 flex items-center justify-between">
              <h3 class="text-xl font-medium text-gray-900">{{ team.name }}</h3>
              <span
                class="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
              >
                {{ getTeamJobCount(team.name) }} open roles
              </span>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-gray-600">
              {{ team.description }}
            </p>
          </div>

          <button
            type="button"
            class="mt-6 self-start text-sm font-medium text-brand-blue-1 hover:underline"
            @click="exploreTeamJobs(team.name)"
          >
            See available jobs &rarr;
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";
import { getActivePinia } from "pinia";
import { useRouter } from "vue-router";

import HeaderContainer from "@/components/shared/HeaderContainer.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

const instance = getCurrentInstance();
const vueRouter = useRouter();
const jobsStore = getActivePinia() ? useJobsStore() : null;
const userStore = getActivePinia() ? useUserStore() : null;

const teams = [
  {
    name: "VueTube",
    description:
      "Build next-generation video streaming, creator monetization tools, and real-time recommendation engines at global scale.",
  },
  {
    name: "Vue and Me",
    description:
      "Craft consumer applications, personalized user experiences, and accessible interfaces used by millions every day.",
  },
  {
    name: "Vue Can Do It",
    description:
      "Develop cloud infrastructure, distributed systems, and developer productivity platforms that power modern enterprises.",
  },
  {
    name: "Point of Vue",
    description:
      "Advance artificial intelligence, machine learning research, and data analytics to solve complex real-world problems.",
  },
  {
    name: "Et Vue Brute",
    description:
      "Engineer security, privacy, and cryptography systems that keep users and global networks safe around the clock.",
  },
  {
    name: "Vue and a Half Men",
    description:
      "Drive product strategy, growth partnerships, and cross-platform mobile ecosystems for emerging markets.",
  },
];

onMounted(() => {
  if (jobsStore && jobsStore.jobs.length === 0) {
    jobsStore.FETCH_JOBS();
  }
});

const getTeamJobCount = (teamName) => {
  if (!jobsStore) return 0;
  return jobsStore.jobs.filter((job) => job.organization === teamName).length;
};

const exploreTeamJobs = (teamName) => {
  if (userStore) {
    userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();
    userStore.ADD_SELECTED_ORGANIZATIONS([teamName]);
  }
  const router = vueRouter || instance?.proxy?.$router;
  if (router) {
    router.push({ name: "JobResults", query: { organization: teamName } });
  }
};
</script>
