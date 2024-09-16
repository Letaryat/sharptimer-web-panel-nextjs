import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { HomeIcon, PersonIcon, DiscordLogoIcon, InstagramLogoIcon, TwitterLogoIcon, GitHubLogoIcon, LayoutIcon } from "@radix-ui/react-icons";
import { NavItemWithContent, NavItemNoContent } from "@/app/components/navitem";

export default function Nav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
      <NavItemNoContent href="/" icon={<HomeIcon />} heading="Home"/>
      <NavItemNoContent href="/player" icon={<PersonIcon />} heading="Players"/>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Socials</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr] bg-zinc-900 text-white ">
              <NavItemWithContent href="/" icon={<InstagramLogoIcon width="20" height="20"/>} heading="Instagram" desc="Place where I share some stuff about my projects"/>
              <NavItemWithContent href="/" icon={<TwitterLogoIcon width="20" height="20"/>} heading="Twitter" desc="Place where I share some stuff about my projects"/>
              <NavItemWithContent href="/" icon={<GitHubLogoIcon width="20" height="20"/>} heading="Github" desc="Place where I share some stuff about my projects"/>
              <NavItemWithContent href="/" icon={<LayoutIcon width="20" height="20"/>} heading="Behance" desc="Place where I share some stuff about my projects"/>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
