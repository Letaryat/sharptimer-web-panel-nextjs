import {
    NavigationMenuLink,
    NavigationMenuItem,
    navigationMenuTriggerStyle
  } from "@/components/ui/navigation-menu";
import Link from "next/link"
export function NavItemWithContent(props){
    return(
        <li className="hover:bg-zinc-800 p-2 rounded-sm">
        <NavigationMenuLink asChild>
          <a className="grid gap-1 grid-cols-[.25fr_2fr] flex-col items-center space-x-2 justify-center h-full" href={props.href}>
            {props.icon}
          <div>
            <h3 className="scroll-m-20 text-sm font-semibold tracking-tight">
                {props.heading}
            </h3>
            <p className="text-xs">{props.desc}</p>
          </div>
          </a>
        </NavigationMenuLink>
      </li>
    )
}

export function NavItemNoContent(props){
  return(
    <NavigationMenuItem>
    <Link href={props.href} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        <div className="mr-1">
        {props.icon}
        </div>
        {props.heading}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>

  )
}