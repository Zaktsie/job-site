<template>
  <main class="flex min-h-screen flex-col">
    <section class="pb-20 pt-10">
      <div class="grid grid-cols-12">
        <div class="col-span-1 col-start-1"></div>

        <div class="col-span-5 col-start-2">
          <TheHeadline />
          <JobSearchForm />
        </div>

        <div class="col-span-5 col-start-7 self-center justify-self-center">
          <img
            class="h-80 w-80 object-contain"
            src="../../assets/logo.png"
            alt="Zak's Careers hero illustration"
          />
        </div>

        <div class="col-span-1 col-start-12"></div>
      </div>
    </section>

    <SpotLight class="flex flex-row justify-center pb-16">
      <template #default="{ img, title, description }">
        <router-link
          to="/jobs/results"
          class="mx-5 flex h-96 w-72 flex-col rounded-lg border bg-brand-gray-2 transition-shadow hover:shadow-gray"
        >
          <img :src="img" class="h-40 w-full rounded-t-lg object-cover" alt="" />

          <div class="mt-3 h-48 px-6 py-4">
            <h3 class="text-lg font-medium">
              {{ title }}
            </h3>

            <p class="mt-3 text-sm">
              {{ description }}
            </p>
          </div>

          <span class="px-6 pb-4 text-sm font-medium text-brand-blue-1">
            See available jobs
          </span>
        </router-link>
      </template>
    </SpotLight>
  </main>
</template>

<script setup>
import TheHeadline from "@/components/JobSearch/TheHeadline.vue";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";
import SpotLight from "@/components/JobSearch/SpotLight.vue";
</script>
