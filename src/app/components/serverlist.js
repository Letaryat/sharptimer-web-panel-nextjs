import { GameDig } from "gamedig";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StateMapChecker } from "./statemap";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ServerList() {
  const servers = [
    {
      type: "counterstrike2",
      host: "193.33.177.108",
      port: 27015,
    },
    {
      type: "counterstrike2",
      host: "145.239.24.88",
      port: 27015,
    },
    {
      type: "counterstrike2",
      host: "91.224.117.106",
      port: 27015,
    },
  ];
  
  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold">Server list</h3>
      <ul className="grid grid-cols-2  gap-2 ">
        {servers.map((d, i) => {
          return GameDig.query({
            type: servers[i]["type"],
            host: servers[i]["host"],
            port: servers[i]["port"], // lets us explicitly specify the query port of this server
            givenPortOnly: true, // the library will attempt multiple ports in order to ensure success, to avoid this pass this option
          })
            .then((state) => {
              return (
                <li className="rounded border h-32 p-1 bg-zinc-900 hover:bg-zinc-900 object-fit">
                  <h3 className="text-md font-semibold">{state["name"]}</h3>
                  <p>
                    Players: {`${state["numplayers"]} / ${state["maxplayers"]}`}
                  </p>
                  <Link className="mr-2 mt-2" href={`steam://connect/${state["connect"]}`}>
                    <Button className="bg-teal-600 hover:bg-teal-800 font-semibold text-white">Join</Button>
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-cyan-600 hover:bg-cyan-800 font-semibold text-white">Players</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-950">
                      <DialogHeader>Server Info</DialogHeader>
                      <DialogDescription>
                        <div className="relative rounded-md mb-2" style={{width:"100%", height: "100px"}}>
                        <StateMapChecker map={`https://rank.pierdolnik.eu/storage/cache/img/maps/730/${state['map']}.jpg`}/>
                        </div>
                        <p>
                          Online :{" "}
                          {`${state["numplayers"]} / ${state["maxplayers"]}`}
                        </p>
                        <p>Ping : {state["ping"]}</p>
                        <ScrollArea className="h-[350px]">
                          <Table>
                            <TableHeader>
                              {state["players"].length ? (
                                <TableRow>
                                  <TableHead> # </TableHead>
                                  <TableHead> Player Name </TableHead>
                                  <TableHead> Score </TableHead>
                                  <TableHead> Time </TableHead>
                                </TableRow>
                              ) : (
                                <></>
                              )}
                            </TableHeader>
                            <TableBody>
                              {state["players"].length ? (
                                state["players"].map((d, i) => {
                                  return (
                                    <TableRow key={d}>
                                      <TableCell>{i + 1}</TableCell>
                                      <TableCell>
                                        {state["players"][i]["name"]}
                                      </TableCell>
                                      <TableCell>
                                        {state["players"][i]["raw"]["score"]}
                                      </TableCell>
                                      <TableCell>
                                        {Math.trunc(
                                          state["players"][i]["raw"]["time"] /
                                            60
                                        ) + " minutes"}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })
                              ) : (
                                <TableRow>
                                  <TableCell className="w-[100%] text-center font-bold text-xl">
                                    No Players online
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </li>
              );
            })
            .catch((error) => {
              console.log(`Server is offline, error: ${error}`);
            });
        })}
      </ul>
    </div>
  );
}
