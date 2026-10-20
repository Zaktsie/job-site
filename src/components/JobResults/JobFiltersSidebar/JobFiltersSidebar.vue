<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <JobFiltersSidebarPrompt />
      <JobFiltersSidebarSkills />

      <JobFiltersSidebarDegrees />
      <JobFiltersSidebarJobTypes />
      <JobFiltersSidebarOrganizations />
      <JobFiltersSidebarLocations />
    </section>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";

import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarLocations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarLocations.vue";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";
import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";
import { useUserStore } from "@/stores/user";

const instance = getCurrentInstance();
const userStore = useUserStore();

const parseQueryFilters = () => {
  const route = instance?.proxy?.$route;
  if (!route?.query) return;

  const role = route.query.role || "";
  if (role) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(role);
  }
  const location = route.query.location || "";
  if (location) {
    userStore.UPDATE_LOCATION_SEARCH_TERM(location);
  }
  const organization = route.query.organization;
  if (organization) {
    const orgs = Array.isArray(organization) ? organization : [organization];
    userStore.ADD_SELECTED_ORGANIZATIONS(orgs);
  }
  const jobType = route.query.jobType;
  if (jobType) {
    const types = Array.isArray(jobType) ? jobType : [jobType];
    userStore.ADD_SELECTED_JOB_TYPES(types);
  }
  const degree = route.query.degree;
  if (degree) {
    const degrees = Array.isArray(degree) ? degree : [degree];
    userStore.ADD_SELECTED_DEGREES(degrees);
  }
  if (route.query.saved === "true") {
    userStore.SET_ONLY_SAVED_JOBS(true);
  }
};

onMounted(parseQueryFilters);
</script>
