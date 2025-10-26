import useFetch from "@/composables/useFetch.js";

const fetchGamePlayByPlay = (gameId) => {
  const [startFetch] = useFetch(
    `${import.meta.env.VITE_API_URL}/nhl/gamecenter-playbyplay?gameId=${gameId}`,
  );

  const startFetchGamePlayByPlay = async () => {
    return await startFetch();
  };

  return [startFetchGamePlayByPlay];
};

export default fetchGamePlayByPlay;
