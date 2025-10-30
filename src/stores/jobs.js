import { defineStore } from "pinia";
import getJobs from "../api/getJobs.js";

export const FETCH_JOBS = "FETCH_JOBS";
export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async [FETCH_JOBS]() {
      this.jobs = await getJobs();
      this.jobs = this.jobs;
    },
  },
});
