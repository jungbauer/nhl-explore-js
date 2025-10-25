<script setup>
import { onMounted, ref } from "vue";
import StandingsTeam from "@/components/StandingsTeam.vue";
import fetchStandings from "@/composables/nhl/fetchStandings.js";

const standingsDisplay = ref("league");
const teams = ref([]);
const westernConference = ref([]);
const easternConference = ref([]);
const atlanticDivision = ref([]);
const metropolitanDivision = ref([]);
const centralDivision = ref([]);
const pacificDivision = ref([]);

const [startFetch] = fetchStandings();

onMounted(async () => {
  let teamsData = await startFetch();

  teams.value = teamsData.standings.map(function (elem) {
    return {
      teamName: elem.teamName.default,
      teamLogo: elem.teamLogo,
      points: elem.points,
      wins: elem.wins,
      losses: elem.losses,
      otLosses: elem.otLosses,
      gamesPlayed: elem.gamesPlayed,
      conference: elem.conferenceName,
      division: elem.divisionName,
      teamAbbrev: elem.teamAbbrev.default,
    };
  });

  westernConference.value = teams.value.filter((team) => team.conference === "Western");
  easternConference.value = teams.value.filter((team) => team.conference === "Eastern");

  atlanticDivision.value = teams.value.filter((team) => team.division === "Atlantic");
  metropolitanDivision.value = teams.value.filter((team) => team.division === "Metropolitan");
  centralDivision.value = teams.value.filter((team) => team.division === "Central");
  pacificDivision.value = teams.value.filter((team) => team.division === "Pacific");
});
</script>

<template>
  <div>Displaying {{ standingsDisplay }}</div>
  <select v-model="standingsDisplay">
    <option value="league">League</option>
    <option value="conference">Conference</option>
    <option value="division">Division</option>
  </select>

  <div v-if="standingsDisplay === 'league'" class="flex-container">
    <div class="flex-items">
      <div><h1>League Standings</h1></div>
      <StandingsTeam v-for="(team, i) in teams" :key="'l' + i" :team="team" />
    </div>
  </div>

  <div v-if="standingsDisplay === 'conference'" class="flex-container-conference">
    <div class="flex-items-conference">
      <div><h1>Western Standings</h1></div>
      <StandingsTeam v-for="(team, i) in westernConference" :key="'wc' + i" :team="team" />
    </div>
    <div class="flex-items-conference">
      <div><h1>Eastern Standings</h1></div>
      <StandingsTeam v-for="(team, i) in easternConference" :key="'wc' + i" :team="team" />
    </div>
  </div>

  <div v-if="standingsDisplay === 'division'" class="divisions">
    <div>
      <h1>Central</h1>
      <StandingsTeam v-for="(team, i) in centralDivision" :key="'cd' + i" :team="team" />
    </div>
    <div>
      <h1>Atlantic</h1>
      <StandingsTeam v-for="(team, i) in atlanticDivision" :key="'ad' + i" :team="team" />
    </div>
    <div>
      <h1>Pacific</h1>
      <StandingsTeam v-for="(team, i) in pacificDivision" :key="'pd' + i" :team="team" />
    </div>
    <div>
      <h1>Metropolitan</h1>
      <StandingsTeam v-for="(team, i) in metropolitanDivision" :key="'md' + i" :team="team" />
    </div>
  </div>
</template>

<style scoped>
.flex-container-conference {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: normal;
  align-content: normal;
}

.flex-items-conference {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
}

.flex-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: normal;
}

.flex-items {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
}

.divisions {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  column-gap: 4px;
}
</style>
