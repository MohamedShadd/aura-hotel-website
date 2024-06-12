"use client";

import SignOutButton from "@/components/SignOutButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks: {
  name: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const active =
    navLinks.find((nav) => nav.href === pathname)?.name || "Navigation";
  return (
    <>
      <nav className="min-[1px]:border-b min-[1150px]:border-r border-primary-900">
        <ul className="min-[1px]:hidden min-[1150px]:flex flex-col gap-2 h-full text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                  pathname === link.href ? "bg-primary-900" : ""
                }`}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}

          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
        <div className="min-[1px]:block min-[1150px]:hidden">
          <Drawer>
            <DrawerTrigger className="bg-primary-900 w-full border border-primary-500 p-2 text-xl rounded-lg ">
              {active}
            </DrawerTrigger>
            <DrawerContent>
              {navLinks.map((link) => (
                <li key={link.name} className="block">
                  <Link className={`w-full`} href={link.href}>
                    <DrawerClose
                      className={`w-full py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </DrawerClose>
                  </Link>
                </li>
              ))}
              <li className="mt-auto block">
                <SignOutButton />
              </li>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </>
  );
}

export default SideNavigation;
