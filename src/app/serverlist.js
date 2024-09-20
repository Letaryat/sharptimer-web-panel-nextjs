import { GameDig } from "gamedig";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChartNoAxesColumnIncreasing, Play, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StateMapChecker } from "./components/statemap";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator"
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
    {
      type: "counterstrike2",
      host: "15.204.51.25",
      port: 27015,
    },
      ];
      console.log(servers.length % 2 == 0);
  return (

    <div className="w-full">
      <h3 className="text-2xl font-semibold">Server list</h3>
      <ul className={
      `grid 
      ${servers.length % 2 == 0 ? 'grid-cols-2' : 'grid-cols-1'}
        gap-2`}>
        {servers.map((d, i) => {
          return GameDig.query({
            type: servers[i]["type"],
            host: servers[i]["host"],
            port: servers[i]["port"], // lets us explicitly specify the query port of this server
            givenPortOnly: true, // the library will attempt multiple ports in order to ensure success, to avoid this pass this option
          })
            .then((state) => {

              return (
                <li className="relative rounded border h-max p-1 text-card-foreground shadow hover:bg-zinc-900 object-fit">
                  <div className={
                    `flex ${state['ping'] > 150 ? 'text-red-300' : 'text-green-300'}`
                  }> <ChartNoAxesColumnIncreasing/> {state['ping']}</div>

                  <h3 className="text-md font-semibold">{state["name"]}</h3>
                  <p>{state['connect']}</p>
                  <p>{state['map']}</p>

                  <p>
                    Players: {`${state["numplayers"]} / ${state["maxplayers"]}`}
                  </p>
                  
                  <div className="absolute right-0 top-0 flex flex-col h-full justify-center mr-2">
                  <Link className="" href={`steam://connect/${state["connect"]}`}>
                    <Button className="bg-accent text-green-400 font-semibold w-[50px] mb-2">
                      <Play width={16} height={16} />
                      </Button>
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                    <Button className="bg-accent font-semibold text-green-400 w-[50px]">
                    <Users width={16} height={16} /></Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-950">
                      <DialogHeader>Server Info</DialogHeader>
                      <DialogDescription>
                        <div className="relative rounded-md mb-2 flex items-center " style={{width:"100%", height: "100px"}}>
                        <div className="flex justify-center items-center"> 
                        <Separator className='h-12 w-1 rounded-lg mr-2 ml-2 bg-zinc-950 z-10' orientation="vertical"/>
                        <div>
                        <p className="font-semibold text-xs text-teal-300 z-10 relative">Now playing:</p>
                        <p className="font-bold text-sm relative z-10 text-center text-white uppercase">{state['map']}</p>
                        </div>

                        </div>
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
                      <div className="relative flex gap-2">
                        <Button className="w-full">
                         Copy IP
                        </Button>
                        <Button className="w-full">
                          Join
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  </div>
 
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
