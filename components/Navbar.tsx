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
            label: "Contact"
        },
        { 
            href: "/login",
            label: "Login"
        }, 
        { 
            href: "/",
            label: "Online Registration"
        }, 

    ];

    return ( 
        <NavigationMenu className="w-full left-217 top-0.5" >
            <NavigationMenuList className="w-full flex justify-between">

                {pages.map((item,key) => ( 
                    <NavigationMenuLink key={key} asChild className ="">
                        <Link href={item.href} className="flex items-center justify-center font-medium pl-5 pr-5">{item.label}</Link>
                    </NavigationMenuLink>
                ))}

            </NavigationMenuList> 
        </NavigationMenu>
    )
}