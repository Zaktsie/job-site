import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobView from "@/views/JobView.vue";
import jobsResultsView from "@/views/JobsResultsView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    name: "Home",
  },
  {
    path: "/job/results",
    component: jobsResultsView,
    name: "JobResults",
  },
  {
    path: "/job/results/:id",
    name: "JobListing",
    component: JobView,
  },
];

const route = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

export default route;
