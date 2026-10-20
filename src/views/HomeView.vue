<template>
  <div>
    <TheHero />

    <section class="border-t border-solid border-brand-gray-1 bg-white py-16">
      <div class="mx-auto max-w-6xl px-8">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-normal text-gray-900">
            Life at Zak's Careers
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-base font-light text-gray-600">
            We strive to provide our teams with the flexibility, support, and
            resources needed to thrive both personally and professionally.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="pillar in culturePillars"
            :key="pillar.title"
            class="rounded-lg border border-solid border-brand-gray-1 bg-brand-gray-2 p-6"
          >
            <h3 class="mb-2 text-lg font-medium text-gray-900">
              {{ pillar.title }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-600">
              {{ pillar.description }}
            </p>
          </div>
        </div>

        <div
          class="mt-14 flex flex-col items-center justify-between gap-6 rounded-xl bg-blue-50 p-8 md:flex-row"
        >
          <div>
            <h3 class="text-2xl font-normal text-gray-900">
              Ready to find your next role?
            </h3>
            <p class="mt-1 text-sm text-gray-600">
              Browse open roles across our engineering, product, and design
              organizations worldwide.
            </p>
          </div>
          <div class="flex flex-wrap gap-4">
            <router-link to="/teams">
              <ActionButton text="Explore Teams" type="secondary" />
            </router-link>
            <router-link to="/jobs/results">
              <ActionButton text="View All Jobs" type="primary" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ActionButton from "@/components/shared/ActionButton.vue";
import TheHero from "@/components/JobSearch/TheHero.vue";

const culturePillars = [
  {
    title: "Health & Wellness",
    description:
      "Comprehensive medical coverage, mental health support, wellness stipends, and on-site fitness programs.",
  },
  {
    title: "Flexible Working",
    description:
      "Hybrid work schedules, generous paid time off, parental leave, and global work-from-anywhere weeks.",
  },
  {
    title: "Learning & Growth",
    description:
      "Tuition reimbursement, conference sponsorships, internal tech talks, and dedicated 20% innovation time.",
  },
  {
    title: "Community & Impact",
    description:
      "Employee resource groups, charitable gift matching, and paid volunteer days to support local communities.",
  },
];
</script>
