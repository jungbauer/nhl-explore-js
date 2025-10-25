import { createWebHistory, createRouter } from "vue-router";
import StandingsView from "@/components/StandingsView.vue";
import TeamScheduleView from "@/components/TeamScheduleView.vue";
import GameView from "@/components/GameView.vue";

const baseUrl = "/nhl-explore-js";

console.log("router test", import.meta.env.BASE_URL);

const routes = [
  { path: `${baseUrl}/`, component: StandingsView },
  { path: `${baseUrl}/schedule/:team`, component: TeamScheduleView },
  { path: `${baseUrl}/game/:gameId`, component: GameView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
