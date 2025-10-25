import useFetch from "@/composables/useFetch.js";

const fetchGamePlayByPlay = (gameId) => {
  const [startFetch] = useFetch(`/api/gamecenter/${gameId}/play-by-play`);

  const startFetchGamePlayByPlay = async () => {
    return await startFetch();
  };

  return [startFetchGamePlayByPlay];
};

export default fetchGamePlayByPlay;
