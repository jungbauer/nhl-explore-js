import { createWebHistory, createRouter } from "vue-router";
import StandingsView from "@/components/StandingsView.vue";
import TeamScheduleView from "@/components/TeamScheduleView.vue";
import GameView from "@/components/GameView.vue";

const routes = [
  { path: `${import.meta.env.BASE_URL}`, component: StandingsView },
  { path: `${import.meta.env.BASE_URL}schedule/:team`, component: TeamScheduleView },
  { path: `${import.meta.env.BASE_URL}game/:gameId`, component: GameView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
