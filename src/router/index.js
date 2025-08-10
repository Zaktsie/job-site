import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobView from "@/views/JobView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    name: "Home",
  },
  {
    path: "/job/results",
    component: JobView,
    name: "JobResults",
  },
];

const route = createRouter({
  history: createWebHistory(),
  routes,
});

export default route;
