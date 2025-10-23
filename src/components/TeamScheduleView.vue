<script setup>
import useFetch from "@/composables/useFetch.js";
import { onMounted, ref } from "vue";

const props = defineProps(["teamAbrev"]);
const teamAbrev = props.teamAbrev || "VGK";
const season = "20252026";

const allGames = ref([]);
// const preSeasonGames = ref([]);
// const regSeasonGames = ref([]);
const focusTeam = ref();

const [startFetch] = useFetch(`/nhl/club-schedule-season/${teamAbrev}/${season}`);

const focusWin = (homeTeam, awayTeam) => {
  let homeWin = homeTeam.score > awayTeam.score;
  let focusHome = homeTeam.abbrev === teamAbrev;

  return (focusHome && homeWin) || (!focusHome && !homeWin);
};

onMounted(async () => {
  let scheduleData = await startFetch();

  allGames.value = scheduleData.games.map((game) => {
    return {
      id: game.id,
      gameType: game.gameType,
      gameDate: game.gameDate,
      gameState: game.gameState,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      focusWin: focusWin(game.homeTeam, game.awayTeam),
    };
  });

  if (allGames.value[0].homeTeam.abbrev === teamAbrev) {
    focusTeam.value = JSON.parse(JSON.stringify(allGames.value[0].homeTeam));
  } else {
    focusTeam.value = JSON.parse(JSON.stringify(allGames.value[0].awayTeam));
  }
});
</script>

<template>
  <div v-if="focusTeam">
    <div>
      <img :src="focusTeam.logo" alt="logo" class="logo-main" />
    </div>
    <div>
      {{ focusTeam.placeName.default }} {{ focusTeam.commonName.default }} ({{ teamAbrev }})
    </div>
  </div>

  <div
    v-for="(game, i) in allGames"
    :key="i"
    class="game-grid"
    :class="{
      'future-game': game.gameState === 'FUT',
      'focus-win': game.focusWin && !(game.gameState === 'FUT'),
      'focus-loss': !game.focusWin && !(game.gameState === 'FUT'),
    }"
  >
    <div>
      <div>{{ game.gameDate }}</div>
      <div>{{ game.gameState }}</div>
    </div>
    <div>
      <div>
        <img :src="game.homeTeam.logo" alt="logo" class="logo" />
      </div>
      <!--      <div>{{ game.homeTeam.abbrev }}</div>-->
      <div>{{ game.homeTeam.score }}</div>
    </div>
    <div>VS</div>
    <div>
      <div>
        <img :src="game.awayTeam.logo" alt="logo" class="logo" />
      </div>
      <!--      <div>{{ game.awayTeam.abbrev }}</div>-->
      <div>{{ game.awayTeam.score }}</div>
    </div>
  </div>
</template>

<style scoped>
.game-grid {
  display: grid;
  grid-template-columns: auto auto auto auto;
  column-gap: 4px;
  row-gap: 4px;
  justify-content: start;
  align-items: center;
}

.logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.logo-main {
  width: 300px;
  height: 300px;
  object-fit: contain;
}

.future-game {
  background-color: darkgray;
}

.focus-win {
  background-color: #8fc138;
}

.focus-loss {
  background-color: #f3a4a4;
}
</style>
