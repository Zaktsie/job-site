<template>
  <div>
    <HeaderContainer>
      <template #title>
        <h1 class="w-full text-4xl font-normal">How we hire</h1>
      </template>

      <template #subtitle>
        <h2 class="my-4 w-full text-base font-light">
          We believe that hiring is a two-way street — it's as much about you
          finding a place where you can thrive as it is about us finding great
          talent.
        </h2>
      </template>
    </HeaderContainer>

    <section class="mx-auto max-w-5xl px-8 py-12">
      <h2 class="mb-8 text-2xl font-normal text-gray-900">
        Our hiring process
      </h2>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(step, index) in hiringSteps"
          :key="step.title"
          class="rounded-lg border border-solid border-brand-gray-1 bg-white p-6"
        >
          <span
            class="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue-1 text-sm font-semibold text-white"
          >
            {{ index + 1 }}
          </span>
          <h3 class="mb-2 text-lg font-medium text-gray-900">
            {{ step.title }}
          </h3>
          <p class="text-sm leading-relaxed text-gray-600">
            {{ step.description }}
          </p>
        </div>
      </div>

      <div class="mt-14">
        <h2 class="mb-4 text-2xl font-normal text-gray-900">
          Frequently asked questions
        </h2>
        <div class="rounded-lg border border-solid border-brand-gray-1 bg-white px-6">
          <CollapsibleAccordion
            v-for="faq in faqs"
            :key="faq.question"
            :header="faq.question"
          >
            <p class="text-sm leading-relaxed text-gray-600">
              {{ faq.answer }}
            </p>
          </CollapsibleAccordion>
        </div>
      </div>

      <div class="mt-12 text-center">
        <router-link :to="{ name: 'JobResults' }">
          <ActionButton text="Explore open roles" type="primary" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import ActionButton from "@/components/shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";
import HeaderContainer from "@/components/shared/HeaderContainer.vue";

const hiringSteps = [
  {
    title: "Self-reflection",
    description:
      "Think about the problems you love solving, the impact you want to make, and the team culture where you do your best work.",
  },
  {
    title: "Job searching",
    description:
      "Use our job search filters by role, skills, degree, job type, and location to find roles tailored to your strengths.",
  },
  {
    title: "Your resume",
    description:
      "Highlight measurable outcomes, projects you have built, and how your skills align with the minimum and preferred qualifications.",
  },
  {
    title: "Apply online",
    description:
      "Submit your application directly on any job listing page. Keep track of saved and applied roles from your navigation bar.",
  },
  {
    title: "Interviews",
    description:
      "Meet with peers and hiring managers through structured technical and behavioral discussions focused on problem-solving.",
  },
  {
    title: "Decision and offer",
    description:
      "Our hiring committee reviews feedback holistically and extends an offer to welcome you to the team.",
  },
];

const faqs = [
  {
    question: "How many jobs can I apply to at once?",
    answer:
      "We recommend applying to up to 3 roles within a 30-day window that best match your skills and experience.",
  },
  {
    question: "Do I need a computer science degree to apply?",
    answer:
      "No! Many of our roles accept equivalent practical experience or degrees across diverse fields, from Associate and Bachelor's to Master's and Ph.D.",
  },
  {
    question: "How should I prepare for technical interviews?",
    answer:
      "Practice communicating your thought process clearly, reviewing core data structures and algorithms, and discussing trade-offs in system design.",
  },
];
</script>
