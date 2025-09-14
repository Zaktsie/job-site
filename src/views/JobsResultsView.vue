<template>
  <div class="flex flex-row flex-nowrap">
    <job-filter-sidebar />
    <JobListings></JobListings>
  </div>
</template>

<script>
import JobFilterSidebar from "../components/JobResults/JobFilterSidebar/JobFilterSideBar.vue";
import JobListings from "../components/JobResults/JobListings.vue";

export default {
  name: "JobsResultsView",
  components: {
    JobListings,
    JobFilterSidebar,
  },
};
</script>
