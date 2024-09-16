import executeQuery from "./dbinfo";

export default async function PlayerDetails( {params} ){
    const result = await executeQuery('SELECT * FROM playerstats WHERE SteamID = "'+ params.playerId + '"', []);
    let playerdata = result[0];
    //if(result.length = 0) return;

    return(
        <div>
            Gracz o numerze id: {params.playerId}<br/> xD
            {result.length ? playerdata['SteamID'] : "puste"}
        </div>
    )
}