import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserHeading(props){
    return(
        <div className="mx-auto h-5 items-center space-x-3 mt-10 container relative h-max">
        <div className="mx-auto rounded-md border border-zinc-800 p-2 flex w-[350px] space-x-3 items-center">
          <Avatar className="md:w-[50px] md:h-[50px]">
            <AvatarImage
              className="object-cover"
              src={props.pfp}
            />
            <AvatarFallback>{props.name}</AvatarFallback>
          </Avatar>
          <Separator orientation="vertical" className="my-4 bg-zinc-600" />
          <div className="flex flex-col">
            <h3 className="scroll-m-20 font-semibold text-lg">{props.name}</h3>
            <p className="m-0 p-0 text-sm">
              {props.steamid}
            </p>
          </div>
        </div>
      </div>
    )
}