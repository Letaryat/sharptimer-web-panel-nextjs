import fs from 'fs';
import fetch from 'node-fetch';
const savePath = 'public/cache/avatar';

async function DownloadSteamPFP(avatarResponse, savePath, sid){
  console.log("Unloko, profile picture has to be downloaded");
  const writer = fs.createWriteStream(`${savePath}/${sid}.jpg`);
  await new Promise((resolve, reject) => {
      avatarResponse.body.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
}

export default async function SteamAvatarSaver(sid){
  const key = process.env.STEAM_API_KEY;
  let steamid = sid;
  const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamid}`);
  let steamdata;
  if(!response.ok){
      //idk ffs but when hard restart it brokey so idk
      return steamdata = {
          avatar: "--",
          avatarmedium: "--",
          avatarfull: "--",
      };
      //throw new Error("Couldn't fetch informations from api");
  }else{
      const data = await response.json();
      const player = data.response.players[0];
      steamdata = {
          avatar: data.response.players[0].avatar,
          avatarmedium: data.response.players[0].avatarmedium,
          avatarfull: data.response.players[0].avatarfull,
      }
      const avatarResponse = await fetch(player.avatar);
      const avatarResponse2 = await fetch(player.avatar);
      if(avatarResponse.ok){
        if(fs.existsSync(`${savePath}/${sid}.jpg`)){
          console.log("Profile picture has been already downloaded. Checking if basecode is the same");
          //console.log(fs.readFileSync(`${savePath}/${sid}.jpg`));
          const buffer = await avatarResponse2.arrayBuffer();
          var a_base = fs.readFileSync(`${savePath}/${sid}.jpg`);
          var b_base = Buffer.from(buffer).toString();
          if(a_base == b_base){ console.log("Profile pictures are the same. Ending task."); return;}
          console.log("Profile picture is different. Downloading a new one.");
          fs.rm(`${savePath}/${sid}.jpg`, (err) => {
            if(err){
              console.log(err);
              return;
            }
          })
          setTimeout(()=>{
            DownloadSteamPFP(avatarResponse, savePath, sid);
          },1000)
          return;
        }
        console.log("No profile picture for this player. Downloading.");
        DownloadSteamPFP(avatarResponse, savePath, sid)
        /*
        if(fs.existsSync(`${savePath}/${sid}.json`)){ return; }
        const writer = fs.createWriteStream(`${savePath}/${sid}.json`);
        var json = JSON.stringify(steamdata);
        fs.writeFile(`${savePath}/${sid}.json`, json, 'utf8', function test(err, data){
          if(err){
            console.log(err);
          }
        });
        */
      }
  }
}