import executeQuery from "../../../lib/dbinfo";
import NoPlayer from "../noplayer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PlayerHeader from "@/app/components/playerheader";
import FetchSteamPlayerInfo from "@/app/api/steamfetch/route";
export default async function PlayerDetails({ params }) {
  const result = await executeQuery(
    'SELECT * FROM playerstats WHERE SteamID = "' + params.playerId + '"',
    []
  );
  const mapresult = await executeQuery(
    'SELECT * FROM playerrecords WHERE SteamID = "' + params.playerId + '"',
    []
  );
  let playerdata = result[0];
  // {playerdata['SteamID']}
  if (result.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <NoPlayer />
      </div>
    );
  }
  let PlayerSteamData = await FetchSteamPlayerInfo(playerdata['SteamID']);

  return (
      <div>
      <PlayerHeader

        pfp={PlayerSteamData.avatarmedium}
        name={playerdata["PlayerName"]}
        steamid={params.playerId}
        created={PlayerSteamData.created}
        lastlogoff={PlayerSteamData.lastlogoff}
        personaname={PlayerSteamData.personaname}
        personastate={PlayerSteamData.personastate}
      />
      <Table className="mt-2">
        <TableHeader>
          <TableRow>
            <TableHead>MapName</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Style</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mapresult.map((d) => (
            <TableRow key={d}>
              <TableCell>{d.MapName}</TableCell>
              <TableCell>{d.FormattedTime}</TableCell>
              <TableCell>{d.Style}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
  );
}
