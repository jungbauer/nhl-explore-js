import useFetch from "@/composables/useFetch.js";

const fetchStandings = () => {
  const getDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`; // formatted date
  };

  const standingsUrl = `/api/standings/${getDate()}`;
  const [startFetch] = useFetch(standingsUrl);

  const startFetchStandings = async () => {
    return await startFetch();
  };
  return [startFetchStandings];
};
export default fetchStandings;
