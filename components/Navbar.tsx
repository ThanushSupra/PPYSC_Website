import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
  import Link from "next/link"

export default function Navbar() { 
    const pages = 
    [
        { 
            href: "/",
            label: "Home"
        }, 
        { 
            href: "/",
            label: "About"
        }, 
        { 
            href: "/",
            label: "Gallery"
        }, 
        { 
            href: "/",
            label: "Login"
        }, 
        { 
            href: "/",
            label: "Online Registration"
        }, 

    ];

    return ( 
        <NavigationMenu className="w-full left-240" >
            <NavigationMenuList className="w-full flex justify-between">

                {pages.map((item,key) => ( 
                    <NavigationMenuLink key={key} asChild className ="">
                        <Link href={item.href} className="flex h-12 items-center justify-center font-medium hover:underline transition mr-2.5 ml-2.5 pl-2.5 pr-2.5">{item.label}</Link>
                    </NavigationMenuLink>
                ))}

            </NavigationMenuList> 
        </NavigationMenu>
    )
}