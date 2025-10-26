import useFetch from "@/composables/useFetch.js";

const fetchStandings = () => {
  const standingsUrl = `${import.meta.env.VITE_API_URL}/nhl/standings`;
  const [startFetch] = useFetch(standingsUrl);

  const startFetchStandings = async () => {
    return await startFetch();
  };
  return [startFetchStandings];
};
export default fetchStandings;
