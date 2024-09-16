import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div>
      <div className="mx-auto h-5 items-center space-x-3 mt-10 container relative h-max">
        <div className="mx-auto rounded-md border border-zinc-800 p-2 flex w-[350px] space-x-3 items-center">
          <Avatar className="md:w-[50px] md:h-[50px]">
            <AvatarImage
              className="object-cover"
              src="https://i.pinimg.com/736x/76/2f/76/762f76daa5157565d5bb5a6f9d36059c.jpg"
            />
            <AvatarFallback>letek</AvatarFallback>
          </Avatar>
          <Separator orientation="vertical" className="my-4 bg-zinc-600" />
          <div className="flex flex-col">
            <h3 className="scroll-m-20 font-semibold text-lg">Letaryat</h3>
            <p className="m-0 p-0 text-sm">
              Technik informatyk czlowiek orkiestra
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto h-5 items-center space-x-3 mt-2 container relative h-max">
        <div className="mx-auto flex w-[350px] items-center">
          <p className="text-sm">Now working on:</p>
        </div>
      </div>
    </div>
  );
}
