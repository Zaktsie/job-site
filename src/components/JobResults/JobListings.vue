<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing />
      <JobListing />
      <JobListing />
      <JobListing />
      <JobListing />
      <JobListing />
      <JobListing />
      <JobListing />
      <JobListing />
    </ol>
  </main>
</template>
<script>
import JobListing from "./JobListing.vue";

export default {
  name: "JobListings",
  components: { JobListing },
};
</script>
<style scoped></style>
