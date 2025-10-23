import { createWebHistory, createRouter } from "vue-router";
import StandingsView from "@/components/StandingsView.vue";
import TeamScheduleView from "@/components/TeamScheduleView.vue";
import GameView from "@/components/GameView.vue";

const routes = [
  { path: "/", component: StandingsView },
  { path: "/schedule/:team", component: TeamScheduleView },
  { path: "/game/:gameId", component: GameView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
