import useFetch from "@/composables/useFetch.js";

const fetchStandings = () => {
    const standingsUrl = "https://api-web.nhle.com/v1/standings/now";
    const [startFetch] = useFetch(standingsUrl);
    let teams;

    const startFetchStandings = async () => {
        const data = await startFetch();
        console.log("fetch data: ", data);
        teams = data.map(function(elem) {
            return {
                teamName: elem.teamName.default,
                teamLogo: elem.teamLogo,
                points: elem.points
            };
        });

        console.log("fetch teams: ", teams)

        return teams;
    }
    return [startFetchStandings];
}
export default fetchStandings;