<template>
  <li class="mb-7">
    <router-link
      to="/jobs/results/1"
      class="mw-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="mw-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
        <h2 class="mb-2 text-3xl">
          Technical Program Manager, Perception, Augmented Reality
        </h2>

        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>Zak's Careers</span>
          </div>
          <div>
            <span> Cape town, South africa </span>
          </div>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <h3 class="mt-1 mb-2">Qualifications</h3>
          <div>
            <ul class="list-disc pl-8">
              <li>BTech or equivalent practical experience</li>
              <li>5 years experience in program management.</li>
              <li>
                Experience with analysing data though querying a database such
                as MS SQL /MYSQL and using spreadsheet software & creating
                statistical models
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-2 text-center text-brand-blue-2">
          <router-link to="/jobs/results/1">Expand</router-link>
        </div>
      </div>
    </router-link>
  </li>
</template>
<script>
export default {
  name: "JobListing",
};
</script>

<style scoped></style>
