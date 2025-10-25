<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TeamScheduleGame from "@/components/TeamScheduleGame.vue";
import fetchTeamSchedule from "@/composables/nhl/fetchTeamSchedule.js";

const route = useRoute();
const teamAbbrev = route.params.team || "VGK";
const season = "20252026";

const typeDisplay = ref("regseason");

const preSeasonGames = ref([]);
const regSeasonGames = ref([]);
const focusTeam = ref();

const [startFetch] = fetchTeamSchedule(teamAbbrev, season);

const focusWin = (homeTeam, awayTeam) => {
  let homeWin = homeTeam.score > awayTeam.score;
  let focusHome = homeTeam.abbrev === teamAbbrev;

  return (focusHome && homeWin) || (!focusHome && !homeWin);
};

const mapApiGame = (game) => {
  return {
    id: game.id,
    gameType: game.gameType,
    gameDate: game.gameDate,
    gameState: game.gameState,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    focusWin: focusWin(game.homeTeam, game.awayTeam),
  };
};

onMounted(async () => {
  let scheduleData = await startFetch();

  scheduleData.games.forEach((game) => {
    if (game.gameType === 1) {
      preSeasonGames.value.push(mapApiGame(game));
    }
    if (game.gameType === 2) {
      regSeasonGames.value.push(mapApiGame(game));
    }
  });

  if (preSeasonGames.value[0].homeTeam.abbrev === teamAbbrev) {
    focusTeam.value = JSON.parse(JSON.stringify(preSeasonGames.value[0].homeTeam));
  } else {
    focusTeam.value = JSON.parse(JSON.stringify(preSeasonGames.value[0].awayTeam));
  }
});
</script>

<template>
  <div v-if="focusTeam">
    <div>
      <img :src="focusTeam.logo" alt="logo" class="logo-main" />
    </div>
    <div>
      {{ focusTeam.placeName.default }} {{ focusTeam.commonName.default }} ({{ teamAbbrev }})
    </div>
  </div>

  <div>Displaying {{ typeDisplay }}</div>
  <select v-model="typeDisplay">
    <option value="preseason">Pre-Season</option>
    <option value="regseason">Regular Season</option>
  </select>

  <div v-if="typeDisplay === 'preseason'">
    <TeamScheduleGame v-for="(game, i) in preSeasonGames" :key="'pre' + i" :game="game" />
  </div>
  <div v-if="typeDisplay === 'regseason'">
    <TeamScheduleGame v-for="(game, i) in regSeasonGames" :key="'reg' + i" :game="game" />
  </div>
</template>

<style scoped>
.logo-main {
  width: 300px;
  height: 300px;
  object-fit: contain;
}
</style>
