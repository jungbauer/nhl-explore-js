<script setup>
import { useRouter } from "vue-router";

const props = defineProps(["team"]);
const router = useRouter();

const goToSchedule = () => {
  router.push(`/nhl-explore-js/schedule/${props.team.teamAbbrev}`);
};
</script>

<template>
  <div class="parent">
    <div class="team-logo" @click="goToSchedule">
      <img :src="team.teamLogo" alt="logo" class="logo" />
    </div>
    <div class="team">
      <div>{{ team.teamName }}</div>
      <div>({{ team.wins }}-{{ team.losses }}-{{ team.otLosses }})</div>
    </div>
    <div class="points">
      {{ team.points }}
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  background-color: white;
}

.parent {
  display: grid;
  grid-template-columns: 66px auto 50px;
  grid-template-rows: 66px;
  grid-column-gap: 5px;
  background-color: #cccccc;
  margin-bottom: 8px;
  padding: 4px;
}

.team {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.points {
  font-size: 24px;
  background-color: white;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.team-logo {
  background-color: white;
  display: grid;
  place-items: center;
}

.team-logo:hover {
  cursor: pointer;
  border: black 3px solid;
}
</style>
