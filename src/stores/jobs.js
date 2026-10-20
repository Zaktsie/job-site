import { defineStore } from "pinia";

import getJobs from "@/api/getJobs";
import { useUserStore } from "@/stores/user";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
export const UNIQUE_LOCATIONS = "UNIQUE_LOCATIONS";
export const FILTERED_JOBS = "FILTERED_JOBS";

export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";
export const INCLUDE_JOB_BY_DEGREE = "INCLUDE_JOB_BY_DEGREE";
export const INCLUDE_JOB_BY_SKILL = "INCLUDE_JOB_BY_SKILL";
export const INCLUDE_JOB_BY_LOCATION = "INCLUDE_JOB_BY_LOCATION";
export const INCLUDE_JOB_BY_SAVED = "INCLUDE_JOB_BY_SAVED";
export const GET_JOB_BY_ID = "GET_JOB_BY_ID";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganizations = new Set();
      state.jobs.forEach((job) => {
        if (job.organization) {
          uniqueOrganizations.add(job.organization);
        }
      });
      return uniqueOrganizations;
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set();
      state.jobs.forEach((job) => {
        if (job.jobType) {
          uniqueJobTypes.add(job.jobType);
        }
      });
      return uniqueJobTypes;
    },
    [UNIQUE_LOCATIONS](state) {
      const uniqueLocations = new Set();
      state.jobs.forEach((job) => {
        if (Array.isArray(job.locations)) {
          job.locations.forEach((loc) => uniqueLocations.add(loc));
        }
      });
      return uniqueLocations;
    },
    [INCLUDE_JOB_BY_ORGANIZATION]: () => (job) => {
      const userStore = useUserStore();
      if (userStore.selectedOrganizations.length === 0) return true;
      return userStore.selectedOrganizations.includes(job.organization);
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job) => {
      const userStore = useUserStore();
      if (userStore.selectedJobTypes.length === 0) return true;
      return userStore.selectedJobTypes.includes(job.jobType);
    },
    [INCLUDE_JOB_BY_DEGREE]: () => (job) => {
      const userStore = useUserStore();
      if (userStore.selectedDegrees.length === 0) return true;
      return userStore.selectedDegrees.includes(job.degree);
    },
    [INCLUDE_JOB_BY_SKILL]: () => (job) => {
      const userStore = useUserStore();
      const term = (userStore.skillsSearchTerm || "").trim().toLowerCase();
      if (!term) return true;
      return (job.title || "").toLowerCase().includes(term);
    },
    [INCLUDE_JOB_BY_LOCATION]: () => (job) => {
      const userStore = useUserStore();
      const jobLocations = Array.isArray(job.locations) ? job.locations : [];

      if (userStore.selectedLocations.length > 0) {
        const matchesSelected = jobLocations.some((loc) =>
          userStore.selectedLocations.includes(loc)
        );
        if (!matchesSelected) return false;
      }

      const searchTerm = (userStore.locationSearchTerm || "")
        .trim()
        .toLowerCase();
      if (searchTerm) {
        return jobLocations.some((loc) =>
          loc.toLowerCase().includes(searchTerm)
        );
      }

      return true;
    },
    [INCLUDE_JOB_BY_SAVED]: () => (job) => {
      const userStore = useUserStore();
      if (!userStore.onlySavedJobs) return true;
      return userStore.savedJobIds.map(String).includes(String(job.id));
    },
    [FILTERED_JOBS](state) {
      const userStore = useUserStore();
      const filtered = state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_ORGANIZATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job))
        .filter((job) => this.INCLUDE_JOB_BY_DEGREE(job))
        .filter((job) => this.INCLUDE_JOB_BY_SKILL(job))
        .filter((job) => this.INCLUDE_JOB_BY_LOCATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_SAVED(job));

      if (userStore.sortBy === "date") {
        return [...filtered].sort((a, b) =>
          (b.dateAdded || "").localeCompare(a.dateAdded || "")
        );
      }

      return filtered;
    },
    [GET_JOB_BY_ID]: (state) => (id) => {
      return state.jobs.find((job) => String(job.id) === String(id));
    },
  },
});
