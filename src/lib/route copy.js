
export default async function FetchSteamPlayerInfo(sid){
    const key = "";
    let steamid = sid;
    //const sid = "76561198100544780"
    const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamid}`);
    let steamdata;
    if(!response.ok){
        //idk ffs but when hard restart it brokey so idk
        return steamdata = {
            avatar: "--",
            avatarmedium: "--",
            avatarfull: "--",
            created: "--",
            personaname: "--",
            lastlogoff: "--",
            personastate: "--",
            profileurl: "--",
        };
        //throw new Error("Couldn't fetch informations from api");
    }else{
        const data = await response.json();
        steamdata = {
            avatar: data.response.players[0].avatar,
            avatarmedium: data.response.players[0].avatarmedium,
            avatarfull: data.response.players[0].avatarfull,
            created: data.response.players[0].timecreated,
            personaname: data.response.players[0].personaname,
            lastlogoff: data.response.players[0].lastlogoff,
            personastate: data.response.players[0].personastate,
            profileurl: data.response.players[0].profileurl,
        }
        return steamdata;
    }
    //return data.response.players[0].avatarmedium;
}