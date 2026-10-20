<template>
  <div>
    <HeaderContainer>
      <template #title>
        <h1 class="w-full text-4xl font-normal">Students</h1>
      </template>

      <template #subtitle>
        <h2 class="my-4 w-full text-base font-light">
          Build your future with us — internships, university graduate roles,
          and early career programs.
        </h2>
      </template>
    </HeaderContainer>

    <section class="mx-auto max-w-6xl px-8 py-12">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div
          v-for="program in studentPrograms"
          :key="program.title"
          class="flex flex-col justify-between rounded-lg border border-solid border-brand-gray-1 bg-white p-6 transition-shadow hover:shadow-gray"
        >
          <div>
            <span
              class="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand-blue-1"
            >
              {{ program.badge }}
            </span>
            <h3 class="text-xl font-medium text-gray-900">
              {{ program.title }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-gray-600">
              {{ program.description }}
            </p>
          </div>

          <button
            type="button"
            class="mt-6 self-start text-sm font-medium text-brand-blue-1 hover:underline"
            @click="applyStudentFilter(program)"
          >
            {{ program.cta }} &rarr;
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import { getActivePinia } from "pinia";
import { useRouter } from "vue-router";

import HeaderContainer from "@/components/shared/HeaderContainer.vue";
import { useUserStore } from "@/stores/user";

const instance = getCurrentInstance();
const vueRouter = useRouter();
const userStore = getActivePinia() ? useUserStore() : null;

const studentPrograms = [
  {
    title: "Technical & Business Internships",
    badge: "Internships",
    description:
      "Work alongside experienced engineers and product managers on real production systems during a 12-to-14 week paid internship.",
    cta: "Browse Internships",
    filterType: "jobType",
    filterValue: ["Intern"],
  },
  {
    title: "Currently Pursuing a Degree",
    badge: "Students",
    description:
      "Opportunities designed specifically for students actively pursuing their undergraduate or graduate studies.",
    cta: "View Student Roles",
    filterType: "degree",
    filterValue: ["Pursuing Degree", "Associate"],
  },
  {
    title: "University Graduates (Bachelor's)",
    badge: "Early Career",
    description:
      "Launch your full-time career with mentorship, onboarding bootcamps, and rotational engineering or business tracks.",
    cta: "Explore Bachelor's Roles",
    filterType: "degree",
    filterValue: ["Bachelor's"],
  },
  {
    title: "Master's & Ph.D. Opportunities",
    badge: "Advanced Degrees",
    description:
      "Push the boundaries of research, distributed systems, and product innovation with specialized roles for graduate degree holders.",
    cta: "Explore Graduate Roles",
    filterType: "degree",
    filterValue: ["Master's", "Ph.D."],
  },
];

const applyStudentFilter = (program) => {
  if (userStore) {
    userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();
    if (program.filterType === "jobType") {
      userStore.ADD_SELECTED_JOB_TYPES(program.filterValue);
    } else if (program.filterType === "degree") {
      userStore.ADD_SELECTED_DEGREES(program.filterValue);
    }
  }
  const router = vueRouter || instance?.proxy?.$router;
  if (router) {
    router.push({ name: "JobResults" });
  }
};
</script>
