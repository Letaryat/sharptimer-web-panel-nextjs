import fs from 'fs';
import fetch from 'node-fetch';

export default async function SteamAvatarSaver(sid){
  const key = "";
  let steamid = sid;
  const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamid}`);
  let steamdata;

  const savePath = 'src/cache/avatar/';

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
      const player = data.response.players[0];
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
      const avatarResponse = await fetch(player.avatarmedium);
      if(avatarResponse.ok){
        if(!fs.existsSync(`${savePath}/${sid}.jpg`)){
            const writer = fs.createWriteStream(`${savePath}/${sid}.jpg`);
            await new Promise((resolve, reject) => {
                avatarResponse.body.pipe(writer);
                writer.on('finish', resolve);
                writer.on('error', reject);
              });
              console.log("Unloko, profile picture has to be downloaded");
        }
        console.log("Profile picture has been already downloaded");
      }
      return steamdata;
  }
}