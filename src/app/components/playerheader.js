import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
export default function PlayerHeader(props){
    return(
        <div className="rounded-md border border-zinc-800 p-2 mt-2 flex w-full h-[75px] space-x-3 items-center">
          <Avatar className="md:w-[50px] md:h-[50px]">
            <AvatarImage
              className="object-cover"
              src={props.pfp}
            />
            <AvatarFallback>{props.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="scroll-m-20 font-semibold text-lg">{props.name}</h3>
            <p className="m-0 p-0 text-sm">
              {props.steamid}
            </p>
          </div>
          <Separator orientation="vertical" className="my-4 bg-zinc-800" />
          <div>
          <Link href={`https://steamcommunity.com/profiles/${props.steamid}`}>
                <Button className="steam-button"> 
                    <HomeIcon className="mr-1"width={15}/> Steam profile
                </Button>
            </Link>

          </div>
        </div>
    )
}