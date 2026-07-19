import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobResultsView from "@/views/JobResultsView.vue";
import JobView from "@/views/JobView.vue";
import TeamsView from "@/views/TeamsView.vue";
import LocationView from "@/views/LocationView.vue";
import StudentView from "@/views/StudentView.vue";
import HiringView from "@/views/HiringView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: JobResultsView,
  },
  {
    path: "/jobs/results/:id",
    name: "JobListing",
    component: JobView,
  },
  {
    path: "/teams",
    name: "Teams",
    component: TeamsView,
  },
  {
    path: "/students",
    name: "students",
    component: StudentView,
  },
  {
    path: "/locations",
    name: "locations",
    component: LocationView,
  },
  {
    path: "/hire",
    name: "hire",
    component: HiringView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

export default router;
