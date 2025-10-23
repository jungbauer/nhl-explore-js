import { createWebHistory, createRouter } from "vue-router";
import StandingsView from "@/components/StandingsView.vue";
import TeamScheduleView from "@/components/TeamScheduleView.vue";

const routes = [
  { path: "/", component: StandingsView },
  { path: "/schedule/:team", component: TeamScheduleView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
