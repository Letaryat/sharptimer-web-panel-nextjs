import { Separator } from "@/components/ui/separator";
import Nav from "./navigationmenu";

export default function Header() {
  return (
    <header className="flex h-5 items-center space-x-4 text-sm">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Sharptimer
      </h3>
      <Separator orientation="vertical" className="bg-zinc-800" />
      <Nav/>
    </header>
  );
}
