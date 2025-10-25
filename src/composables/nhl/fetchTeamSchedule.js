import useFetch from "@/composables/useFetch.js";

const fetchTeamSchedule = (teamAbbrev, season) => {
  const [startFetch] = useFetch(`/api/club-schedule-season/${teamAbbrev}/${season}`);

  const startFetchTeamSchedule = async () => {
    return await startFetch();
  };

  return [startFetchTeamSchedule];
};

export default fetchTeamSchedule;
