<script setup>
import { useRouter } from "vue-router";

const props = defineProps(["game"]);
const router = useRouter();

const goToGame = () => {
  if (props.game.gameState !== "FUT") {
    console.log("to game: ", props.game.id);
    router.push(`/nhl-explore-js/game/${props.game.id}`);
  }
};
</script>

<template>
  <div
    class="game-grid"
    :class="{
      'future-game': game.gameState === 'FUT',
      'focus-win': game.focusWin && !(game.gameState === 'FUT'),
      'focus-loss': !game.focusWin && !(game.gameState === 'FUT'),
    }"
    @click="goToGame"
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

.game-grid:hover {
  cursor: pointer;
  border: black 2px solid;
}

.logo {
  width: 60px;
  height: 60px;
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
