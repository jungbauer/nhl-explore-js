import useFetch from "@/composables/useFetch.js";

const fetchTeamSchedule = (teamAbbrev, season) => {
  const [startFetch] = useFetch(
    `${import.meta.env.VITE_API_URL}/nhl/club-schedule?team=${teamAbbrev}&season=${season}`,
  );

  const startFetchTeamSchedule = async () => {
    return await startFetch();
  };

  return [startFetchTeamSchedule];
};

export default fetchTeamSchedule;
