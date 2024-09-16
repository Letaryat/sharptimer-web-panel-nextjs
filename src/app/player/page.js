import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import executeQuery from "./[playerId]/dbinfo";
import FetchSteamPlayerInfo from "../api/steamfetch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ChangeMap from "./buttons";

export default async function Player() {
  let mapMode = "surf_";
  const mapresult = await executeQuery(
    `SELECT * FROM playerrecords`,
    []
  );
  //console.log(mapresult.filter(obj => obj.MapName.includes("surf_")));
  return (
    <div>
      <ChangeMap/>
      <h3 className="font-semibold text-xl">Records list </h3>
      <Table className="mt-2">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Mapname</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Times finished</TableHead>
            <TableHead>Style</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mapresult.map(async (d, i) => (
            <TableRow key={d}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{d.MapName}</TableCell>
              <TableCell >
                <Link className="flex items-center "  href={`/player/${d.SteamID}`}>
                <Avatar className="md:w-[25px] md:h-[25px] mr-2">
                    <AvatarImage
                      className="object-cover"
                      src={(await FetchSteamPlayerInfo(d.SteamID)).avatar}
                    />
                    <AvatarFallback>{d.PlayerName} </AvatarFallback>
                  </Avatar>
                  {(await FetchSteamPlayerInfo(d.SteamID)).personaname}
                </Link>
              </TableCell>
              <TableCell>{d.FormattedTime}</TableCell>
              <TableCell>{d.TimesFinished}</TableCell>
              <TableCell>{d.Style}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
