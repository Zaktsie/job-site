<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>

    <div class="me-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            >Previous</router-link
          >

          <router-link
            v-if="nextPage"
            role="link"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import JobListing from "./JobListing.vue";
import axios from "axios";

export default {
  name: "JobListings",
  components: { JobListing },
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page) || 1;
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = previousPage - 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const lastPage = Math.ceil(this.jobs.length / 10);
      return nextPage <= lastPage ? nextPage : undefined;
    },
    displayedJobs() {
      const pageNumber = this.currentPage;
      const firsJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10;
      return this.jobs.slice(firsJobIndex, lastJobIndex);
    },
  },
  async mounted() {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    console.log("baseUrl", baseUrl);
    const response = await axios.get(`${baseUrl}/jobs`);
    this.jobs = response.data;
  },
};
</script>
<style scoped></style>
