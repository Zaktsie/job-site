<template>
  <footer class="border-t border-solid border-brand-gray-1 bg-brand-gray-2 py-12 text-sm text-gray-600">
    <div class="mx-auto max-w-6xl px-8">
      <div class="grid grid-cols-1 gap-8 pb-8 md:grid-cols-4">
        <div>
          <h3 class="mb-3 font-semibold text-gray-900">Zak's Careers</h3>
          <p class="text-xs leading-relaxed text-gray-600">
            Building helpful products and infrastructure for everyone. Explore
            opportunities across engineering, design, research, and business.
          </p>
        </div>

        <div>
          <h4 class="mb-3 font-semibold text-gray-900">Explore</h4>
          <ul class="space-y-2 text-xs">
            <li>
              <router-link to="/teams" class="hover:text-brand-blue-1"
                >Teams</router-link
              >
            </li>
            <li>
              <router-link to="/locations" class="hover:text-brand-blue-1"
                >Locations</router-link
              >
            </li>
            <li>
              <router-link to="/jobs/results" class="hover:text-brand-blue-1"
                >All Jobs</router-link
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-3 font-semibold text-gray-900">Resources</h4>
          <ul class="space-y-2 text-xs">
            <li>
              <router-link to="/hire" class="hover:text-brand-blue-1"
                >How we hire</router-link
              >
            </li>
            <li>
              <router-link to="/students" class="hover:text-brand-blue-1"
                >Students &amp; Internships</router-link
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-3 font-semibold text-gray-900">Equal Opportunity</h4>
          <p class="text-xs leading-relaxed text-gray-600">
            We are proud to be an equal opportunity workplace and are committed
            to inclusion and diversity across all global offices.
          </p>
        </div>
      </div>

      <div
        class="flex flex-col items-center justify-between border-t border-solid border-brand-gray-1 pt-6 text-xs text-brand-gray-3 sm:flex-row"
      >
        <p>&copy; {{ new Date().getFullYear() }} Zak's Careers. All rights reserved.</p>
        <div class="mt-2 flex gap-6 sm:mt-0">
          <router-link to="/hire" class="hover:text-gray-900"
            >Applicant &amp; Candidate Privacy</router-link
          >
          <router-link to="/jobs/results" class="hover:text-gray-900"
            >Search Jobs</router-link
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
